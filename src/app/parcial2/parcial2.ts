import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
