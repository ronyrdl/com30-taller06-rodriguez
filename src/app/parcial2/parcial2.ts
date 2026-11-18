import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, scan } from 'rxjs';
import { RegistroService } from '../services/registro.service';
import { Router } from '@angular/router';
import { hastaMayor, M, PATRON_CODIGO, TOPE, multiplo } from './validadores';

@Component({
  selector: 'app-parcial2',
  imports: [ReactiveFormsModule],
  templateUrl: './parcial2.html',
})
export class Parcial2 {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly router = inject(Router);
  private readonly registros = inject(RegistroService);
  readonly buscar = new FormControl('', { nonNullable: true });
  readonly emision = toSignal(this.buscar.valueChanges.pipe(
    map((texto) => texto.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    scan((anterior, valor) => ({ valor, total: anterior.total + 1 }), { valor: '', total: 0 }),
  ), { initialValue: { valor: '', total: 0 } });
  readonly visibles = computed(() => {
    const texto = this.emision().valor.toLocaleLowerCase();
    return this.registros.reservas().filter((reserva) =>
      reserva.responsable.toLocaleLowerCase().includes(texto) ||
      reserva.espacio.toLocaleLowerCase().includes(texto),
    );
  });
  readonly m = M;
  readonly tope = TOPE;
  enviado = false;
  readonly form = this.fb.group({
    codigo: ['', [Validators.required, Validators.pattern(PATRON_CODIGO)]],
    cantidad: [0, [Validators.required, Validators.min(1), Validators.max(TOPE), multiplo(M)]],
    desde: [7, Validators.required],
    hasta: [8, Validators.required],
  }, { validators: hastaMayor });

  guardar(): void {
    this.enviado = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { codigo, cantidad } = this.form.getRawValue();
    void this.router.navigate(['/parcial2/detalle', codigo], { queryParams: { cantidad } });
  }
}
