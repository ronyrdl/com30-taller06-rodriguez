import { EstadoReserva, Reserva } from '../models/registro.model';

const solicitudes: [string, string, EstadoReserva][] = [
  ['Camila Torres', 'Sala Norte', 'Pendiente'],
  ['Mateo Díaz', 'Sala Sur', 'Aprobada'],
  ['Lucía Mendoza', 'Salón Ámbar', 'Pendiente'],
  ['Nicolás Herrera', 'Sala Norte', 'Rechazada'],
  ['Sara Villalba', 'Laboratorio de Redes', 'Aprobada'],
  ['Andrés Vargas', 'Sala Sur', 'Pendiente'],
  ['Valeria Ríos', 'Salón Azul', 'Aprobada'],
  ['Sara Navarro', 'Biblioteca Central', 'Pendiente'],
  ['Martín Pacheco', 'Sala Este', 'Aprobada'],
  ['Sofía Beltrán', 'Auditorio Principal', 'Rechazada'],
  ['Daniel Luna', 'Salón Verde', 'Rechazada'],
  ['Sara Gómez', 'Laboratorio de Física', 'Rechazada'],
];

export const reservasIniciales: Reserva[] = solicitudes.map(([responsable, espacio, estado], indice) => ({
  id: indice + 1,
  responsable,
  espacio,
  fecha: '2026-11-30',
  horaInicio: '09:00',
  horaFin: '10:00',
  asistentes: 12,
  recursos: [{ recurso: 'Proyector', cantidad: 1 }],
  estado,
}));
