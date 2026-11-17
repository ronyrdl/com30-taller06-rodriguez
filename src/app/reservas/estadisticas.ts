import { Component, inject } from '@angular/core';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-estadisticas',
  template: `
    <section class="card" aria-labelledby="estadisticas-titulo">
      <h2 id="estadisticas-titulo">Estadísticas de reservas</h2>
      <div class="summary-grid" aria-live="polite">
        <p>
          <strong>{{ registros.total() }}</strong
          ><span>Total de reservas</span>
        </p>
        <p>
          <strong>{{ registros.pendientes() }}</strong
          ><span>Pendientes</span>
        </p>
        <p>
          <strong>{{ registros.aprobadas() }}</strong
          ><span>Aprobadas</span>
        </p>
        <p>
          <strong>{{ registros.rechazadas() }}</strong
          ><span>Rechazadas</span>
        </p>
      </div>
    </section>
  `,
})
export class Estadisticas {
  protected readonly registros = inject(RegistroService);
}
