import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink],
  template: `
    <section class="card">
      <h2>404 · Página no encontrada</h2>
      <p>
        Dirección solicitada: <code>{{ direccion() }}</code>
      </p>
      <a routerLink="/reservas">Volver al listado</a>
    </section>
  `,
})
export class NoEncontrada {
  private readonly router = inject(Router);
  protected readonly direccion = computed(
    () => this.router.lastSuccessfulNavigation()?.finalUrl?.toString() ?? this.router.url,
  );
}
