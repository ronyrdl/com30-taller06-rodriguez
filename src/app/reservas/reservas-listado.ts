import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Busqueda } from '../busqueda/busqueda';
import { codigoReserva, EstadoReserva } from '../models/registro.model';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-reservas-listado',
  imports: [RouterLink, Busqueda],
  templateUrl: './reservas-listado.html',
})
export class ReservasListado {
  private readonly registros = inject(RegistroService);
  readonly estado = input<string>();
  readonly estados: EstadoReserva[] = ['Pendiente', 'Aprobada', 'Rechazada'];
  protected readonly codigoReserva = codigoReserva;

  readonly visibles = computed(() => {
    const estado = this.estado();
    const reservas = this.registros.reservas();
    return estado === undefined
      ? reservas
      : reservas.filter((reserva) => reserva.estado === estado);
  });
}
