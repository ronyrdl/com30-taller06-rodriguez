import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { M, PATRON_CODIGO, TOPE } from './validadores';

@Component({
  selector: 'app-parcial-detalle',
  imports: [RouterLink],
  template: `
    <section class="card">
      <h2>Detalle de solicitud</h2>
      @if (codigoValido()) {
        <dl class="detalle-reserva">
          <div><dt>Código</dt><dd id="detalle-codigo">{{ codigo() }}</dd></div>
          <div><dt>Cantidad</dt><dd id="detalle-cantidad">{{ cantidad() }}</dd></div>
          <div><dt>Bloques</dt><dd id="detalle-bloques">{{ bloques() }}</dd></div>
          <div><dt>Margen</dt><dd id="detalle-margen">{{ margen() }}</dd></div>
        </dl>
        @if (!cantidadValida()) { <p>La cantidad debe ser un múltiplo de {{ m }} entre 1 y {{ tope }}.</p> }
      } @else {
        <p role="alert">Código inválido</p>
      }
      <a routerLink="/parcial2">Volver a la solicitud</a>
    </section>
  `,
})
export class DetalleParcial {
  readonly m = M;
  readonly tope = TOPE;
  readonly codigo = input.required<string>();
  readonly cantidad = input(0, { transform: (valor: unknown) => Number(valor) });
  readonly codigoValido = computed(() => PATRON_CODIGO.test(this.codigo()));
  readonly cantidadValida = computed(() =>
    Number.isFinite(this.cantidad()) && this.cantidad() >= 1 &&
    this.cantidad() <= TOPE && this.cantidad() % M === 0,
  );
  readonly bloques = computed(() => this.cantidad() / M);
  readonly margen = computed(() => TOPE - this.cantidad());
}
