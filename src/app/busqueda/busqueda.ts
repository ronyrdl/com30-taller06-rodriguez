import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  share,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { EstadoReserva, Reserva } from '../models/registro.model';
import { RegistroService } from '../services/registro.service';

@Component({
  selector: 'app-busqueda',
  imports: [ReactiveFormsModule],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {
  private readonly servicio = inject(RegistroService);
  readonly llamadas = this.servicio.llamadas;
  readonly busqueda = new FormControl('', { nonNullable: true });
  readonly estados: EstadoReserva[] = ['Pendiente', 'Aprobada', 'Rechazada'];
  readonly filtro = signal<EstadoReserva | 'Todos'>('Todos');
  readonly historial = signal<string[]>([]);
  readonly buscando = signal(false);
  readonly texto = signal('');

  private readonly consultas$ = this.busqueda.valueChanges.pipe(
    map((texto) => texto.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    share(),
  );

  private readonly resultado$ = this.consultas$.pipe(
    switchMap((texto) => {
      this.texto.set(texto);
      this.buscando.set(texto.length >= 2);
      if (texto.length < 2) return of([] as Reserva[]);

      return this.servicio.buscar(texto).pipe(
        tap(() => this.buscando.set(false)),
        startWith([] as Reserva[]),
      );
    }),
  );
  readonly resultados = toSignal(this.resultado$, { initialValue: [] });
  readonly visibles = computed(() => {
    const filtro = this.filtro();
    return filtro === 'Todos'
      ? this.resultados()
      : this.resultados().filter((reserva) => reserva.estado === filtro);
  });
  readonly total = computed(() => this.visibles().length);
  readonly conteo = computed(() => {
    const conteo: Record<EstadoReserva, number> = { Pendiente: 0, Aprobada: 0, Rechazada: 0 };
    for (const reserva of this.visibles()) conteo[reserva.estado]++;
    return conteo;
  });

  constructor() {
    this.consultas$
      .pipe(
        filter((texto) => texto.length >= 2),
        takeUntilDestroyed(),
      )
      .subscribe((texto) => {
        this.historial.update((anteriores) => [texto, ...anteriores].slice(0, 5));
      });
  }
}
