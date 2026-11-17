# COM30 Taller 07 — Búsqueda reactiva de reservas

Aplicación Angular para el escenario E3 de reserva de espacios universitarios. Amplía el
Taller 06 con 12 reservas iniciales y un buscador por responsable o espacio que ignora
tildes, mayúsculas y espacios en los extremos. El formulario permite registrar solicitudes
con horario, asistentes y recursos, y cambiar su estado desde el listado.

## Ejecutar

Con Node.js compatible con Angular 22 y npm, ejecuta desde la raíz del repositorio:

```bash
npm ci
npm start
```

Abre [http://localhost:4200](http://localhost:4200).

## Probar la búsqueda

- Escribe al menos dos caracteres. La búsqueda espera 300 ms de pausa y simula un
  retardo de `max(150, 1500 − 300 × longitud)` ms.
- Prueba `sala`, `SÁRA` o `laboratorio`. Usa `zzzx` para ver el estado sin coincidencias.
- Cambia el filtro de estado y comprueba que el contador de llamadas permanece igual.
- Para ver la cancelación, escribe `sa`, espera 400 ms y completa `salon` en menos de
  300 ms. La tabla final contiene solo los tres salones.

## Compilar

```bash
npx ng build
```
