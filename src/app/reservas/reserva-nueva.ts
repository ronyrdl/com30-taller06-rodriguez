import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { codigoReserva } from '../models/registro.model';
import { RegistroService } from '../services/registro.service';
import { horarioPosterior, minimoItems, textoNoVacio } from '../validators/reserva.validators';

type RecursoForm = FormGroup<{ recurso: FormControl<string>; cantidad: FormControl<number> }>;

@Component({
  selector: 'app-reserva-nueva',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reserva-nueva.html',
})
export class ReservaNueva {
  private readonly fb = inject(FormBuilder).nonNullable;
  readonly registros = inject(RegistroService);
  private readonly router = inject(Router);

  readonly form = this.fb.group(
    {
      responsable: ['', [Validators.required, textoNoVacio]],
      espacio: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      asistentes: [1, [Validators.required, Validators.min(1)]],
      recursos: this.fb.array([this.nuevoRecurso()], { validators: [minimoItems(1)] }),
    },
    { validators: [horarioPosterior] },
  );

  get recursos(): FormArray<RecursoForm> {
    return this.form.controls.recursos;
  }

  nuevoRecurso() {
    return this.fb.group({
      recurso: ['', [Validators.required, Validators.minLength(2)]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });
  }

  agregarRecurso(): void {
    this.recursos.push(this.nuevoRecurso());
  }

  quitarRecurso(indice: number): void {
    this.recursos.removeAt(indice);
    this.recursos.markAsDirty();
    this.recursos.markAsTouched();
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const reserva = this.registros.agregar(this.form.getRawValue());
    void this.router.navigate(['/reservas', codigoReserva(reserva.id)]);
  }
}
