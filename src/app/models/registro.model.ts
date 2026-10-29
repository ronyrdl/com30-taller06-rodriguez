export interface Recurso {
  recurso: string;
  cantidad: number;
}

export type EstadoReserva = 'Pendiente' | 'Aprobada' | 'Rechazada';

export interface Reserva {
  id: number;
  responsable: string;
  espacio: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  asistentes: number;
  recursos: Recurso[];
  estado: EstadoReserva;
}

export type NuevaReserva = Omit<Reserva, 'id' | 'estado'>;
