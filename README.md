# COM30 Taller 08 — Rutas y navegación de reservas

Aplicación Angular para la reserva de espacios universitarios. Continúa el Taller 07
con cinco vistas y conserva las 12 reservas de ejemplo, el servicio con signals y la
búsqueda reactiva por responsable o espacio en el listado.

## Ejecutar

Con Node.js y npm instalados, ejecuta `npm ci` y `npm start` en la raíz del proyecto.
Abre [http://localhost:4200](http://localhost:4200).

## Rutas

| Ruta | Vista | Parámetro o carga |
| --- | --- | --- |
| `/` | Redirección al listado | Coincidencia completa |
| `/reservas` | Listado de reservas | `?estado=Pendiente\|Aprobada\|Rechazada` |
| `/reservas/nueva` | Alta de reserva | Formulario reactivo |
| `/reservas/:id` | Detalle de reserva | Código, por ejemplo `R05` |
| `/estadisticas` | Estadísticas de reservas | Carga diferida con `loadComponent` |
| Cualquier otra ruta | Página 404 | Muestra la dirección solicitada |

Prueba `/reservas?estado=Aprobada` y recarga. El filtro se conserva en la URL.
Al guardar una reserva válida, la aplicación abre su detalle. Las altas y los cambios
viven en memoria durante la sesión y una recarga restaura los datos de ejemplo.

Para comprobar la carga diferida, abre **F12 → Red → JS** en el listado y pulsa
**Estadísticas**. El navegador solicita su chunk la primera vez. Si vuelves al listado
y entras de nuevo en la misma sesión, no lo descarga otra vez.

## Compilar

```bash
npx ng build
```

El flujo de GitHub Pages usa una copia de `index.html` como `404.html` para que Angular
pueda atender enlaces directos y recargas en las rutas del sitio.
