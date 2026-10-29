import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoReserva, Recurso } from './models/registro.model';
import { RegistroService } from './services/registro.service';
import { horarioPosterior, minimoItems, textoNoVacio } from './validators/reserva.validators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly fb = inject(FormBuilder).nonNullable;
  readonly registros = inject(RegistroService);
  readonly estados: EstadoReserva[] = ['Pendiente', 'Aprobada', 'Rechazada'];

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

  get recursos(): FormArray {
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
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.registros.agregar({ ...value, recursos: value.recursos as Recurso[] });
    this.form.reset({
      responsable: '', espacio: '', fecha: '', horaInicio: '', horaFin: '', asistentes: 1,
      recursos: [{ recurso: '', cantidad: 1 }],
    });
  }

  cambiarEstado(id: number, value: string): void {
    this.registros.cambiarEstado(id, value as EstadoReserva);
  }
}
