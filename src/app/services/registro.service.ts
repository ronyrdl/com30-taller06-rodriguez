import { Injectable, computed, signal } from '@angular/core';
import { EstadoReserva, NuevaReserva, Reserva } from '../models/registro.model';

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private readonly _reservas = signal<Reserva[]>([]);
  readonly reservas = this._reservas.asReadonly();
  readonly total = computed(() => this._reservas().length);
  readonly pendientes = computed(() => this._reservas().filter((r) => r.estado === 'Pendiente').length);
  private siguienteId = 1;

  agregar(datos: NuevaReserva): void {
    const reserva: Reserva = { ...datos, id: this.siguienteId++, estado: 'Pendiente' };
    this._reservas.update((actuales) => [...actuales, reserva]);
  }

  cambiarEstado(id: number, estado: EstadoReserva): void {
    this._reservas.update((actuales) =>
      actuales.map((reserva) => (reserva.id === id ? { ...reserva, estado } : reserva)),
    );
  }

  eliminar(id: number): void {
    this._reservas.update((actuales) => actuales.filter((reserva) => reserva.id !== id));
  }
}
