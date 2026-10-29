import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const textoNoVacio: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.trim().length === 0
    ? { soloEspacios: true }
    : null;

export const horarioPosterior: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const inicio = group.get('horaInicio')?.value as string | null;
  const fin = group.get('horaFin')?.value as string | null;
  if (!inicio || !fin) return null;
  return fin > inicio ? null : { rangoHorario: true };
};

export const minimoItems = (minimo: number): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const cantidad = Array.isArray(control.value) ? control.value.length : 0;
    return cantidad >= minimo ? null : { minimoItems: { minimo, actual: cantidad } };
  };
