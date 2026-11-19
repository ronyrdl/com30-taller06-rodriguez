import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const M = 3;
export const TOPE = 12;
export const PATRON_CODIGO = /^[A-Z]{2}[0-9]{3}$/;

export function multiplo(m: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const texto = String(control.value).trim();
    const valor = Number(control.value);
    if (control.value === '') return null;
    return texto === '' || !Number.isFinite(valor) || valor % m !== 0
      ? { multiplo: { m } }
      : null;
  };
}

export const hastaMayor: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const desde: unknown = grupo.get('desde')?.value;
  const hasta: unknown = grupo.get('hasta')?.value;
  if (desde === '' || hasta === '' || desde == null || hasta == null) return null;
  return Number(hasta) > Number(desde) ? null : { hastaMayor: true };
};
