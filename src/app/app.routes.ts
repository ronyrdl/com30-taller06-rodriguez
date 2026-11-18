import { Parcial2 } from './parcial2/parcial2';
import { DetalleParcial } from './parcial2/detalle';
import { Routes } from '@angular/router';
import { NoEncontrada } from './no-encontrada';
import { ReservaDetalle } from './reservas/reserva-detalle';
import { ReservaNueva } from './reservas/reserva-nueva';
import { ReservasListado } from './reservas/reservas-listado';

export const routes: Routes = [
  { path: '', redirectTo: 'reservas', pathMatch: 'full', title: 'Inicio' },
  { path: 'reservas', component: ReservasListado, title: 'Reservas universitarias' },
  { path: 'reservas/nueva', component: ReservaNueva, title: 'Nueva reserva' },
  { path: 'reservas/:id', component: ReservaDetalle, title: 'Detalle de la reserva' },
  {
    path: 'estadisticas',
    title: 'Estadísticas de reservas',
    loadComponent: () => import('./reservas/estadisticas').then((modulo) => modulo.Estadisticas),
  },
  { path: 'parcial2', component: Parcial2, title: 'Solicitud validada' },
  { path: 'parcial2/detalle/:codigo', component: DetalleParcial, title: 'Detalle de solicitud' },
  { path: '**', component: NoEncontrada, title: 'Página no encontrada' },
];
