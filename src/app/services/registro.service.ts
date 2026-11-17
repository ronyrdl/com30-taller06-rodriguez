import { Injectable, computed, signal } from '@angular/core';
import { defer, delay, Observable, of } from 'rxjs';
import { EstadoReserva, NuevaReserva, Reserva } from '../models/registro.model';
import { reservasIniciales } from './reservas-iniciales';

function normalizar(texto: string): string {
  return texto.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

@Injectable({ providedIn: 'root' })
export class RegistroService {
  private readonly _reservas = signal<Reserva[]>(reservasIniciales);
  readonly reservas = this._reservas.asReadonly();
  readonly total = computed(() => this._reservas().length);
  readonly pendientes = computed(() => this._reservas().filter((r) => r.estado === 'Pendiente').length);
  readonly aprobadas = computed(() => this._reservas().filter((r) => r.estado === 'Aprobada').length);
  readonly rechazadas = computed(() => this._reservas().filter((r) => r.estado === 'Rechazada').length);
  private readonly _llamadas = signal(0);
  readonly llamadas = this._llamadas.asReadonly();
  private siguienteId = reservasIniciales.length + 1;

  buscar(texto: string): Observable<Reserva[]> {
    const consulta = texto.trim();
    const termino = normalizar(consulta);
    const retardo = Math.max(150, 1500 - 300 * consulta.length);

    return defer(() => {
      this._llamadas.update((total) => total + 1);
      const coincidencias = this._reservas().filter(
        ({ responsable, espacio }) =>
          normalizar(responsable).includes(termino) || normalizar(espacio).includes(termino),
      );
      return of(coincidencias).pipe(delay(retardo));
    });
  }

  agregar(datos: NuevaReserva): Reserva {
    const reserva: Reserva = { ...datos, id: this.siguienteId++, estado: 'Pendiente' };
    this._reservas.update((actuales) => [...actuales, reserva]);
    return reserva;
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
