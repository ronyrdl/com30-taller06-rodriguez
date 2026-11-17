import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { codigoReserva, EstadoReserva } from '../models/registro.model';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-reserva-detalle',
  imports: [RouterLink],
  templateUrl: './reserva-detalle.html',
})
export class ReservaDetalle {
  private readonly registros = inject(RegistroService);
  private readonly router = inject(Router);
  readonly id = input.required<string>();
  readonly estados: EstadoReserva[] = ['Pendiente', 'Aprobada', 'Rechazada'];
  readonly reserva = computed(() => {
    const codigo = this.id();
    return this.registros.reservas().find((reserva) => codigoReserva(reserva.id) === codigo);
  });

  cambiarEstado(id: number, estado: string): void {
    const nuevo = this.estados.find((opcion) => opcion === estado);
    if (nuevo) this.registros.cambiarEstado(id, nuevo);
  }

  eliminar(id: number): void {
    this.registros.eliminar(id);
    void this.router.navigate(['/reservas']);
  }
}
