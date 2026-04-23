# Centro de Operaciones de Crédito

## Contexto

Estás trabajando sobre una herramienta interna usada por el equipo de originación para revisar solicitudes de crédito de pequeños comercios.

El repositorio ya incluye:

- un frontend en Angular + Ionic + TypeScript
- un backend en Node.js + TypeScript
- datos mockeados y flujos parcialmente implementados

La aplicación está intencionalmente incompleta. La idea es que trabajes sobre la base existente, no que rehagas todo desde cero.

## Qué Queremos Evaluar

- lectura y comprensión de código existente
- modelado de datos y diseño de API
- manejo de estados y errores
- calidad de componentes Angular/Ionic
- endpoints y validaciones en backend
- capacidad de priorizar y documentar trade-offs

## Tiempo Sugerido

4 a 6 horas

## Escenario

La aplicación permite que los operadores:

- revisen una lista de solicitudes de crédito
- vean el detalle de cada solicitud
- consulten el estado de negocio de cada caso
- revisen un score simple y una explicación resumida

Estados de negocio:

- `pending`
- `in_review`
- `approved`
- `rejected`

## Prioridad Esperada

Este challenge está pensado para que priorices.

Orden sugerido:

1. corregir el bug existente
2. implementar `Asignar a analista`
3. si te queda tiempo, abordar mejoras opcionales

No esperamos que completes todo.
Priorizamos una solución correcta y clara en las tareas obligatorias por encima de una solución más grande pero incompleta.

## Tareas Obligatorias

### 1. Corregir el bug existente

La aplicación actual tiene inconsistencias entre la lista de solicitudes y el detalle.

Síntoma principal:

- después de cambiar una solicitud en la pantalla de detalle y volver a la lista, la lista puede seguir mostrando datos viejos

Síntoma secundario:

- al navegar rápido entre solicitudes dentro del detalle, la información cargada puede quedar desalineada con la ruta actual

Esperamos que el comportamiento final sea:

- lista y detalle permanecen consistentes después de actualizar estados
- al volver del detalle a la lista, la lista refleja los cambios sin requerir refresh manual
- navegar rápido entre solicitudes desde el detalle no mezcla datos
- el estado visible se mantiene coherente sin necesidad de hard refresh

Importante:

- la lista forma parte de un flujo de navegación de Ionic
- la pantalla de detalle incluye navegación rápida entre solicitudes para ayudar a reproducir la inconsistencia
- el detalle muestra el id de la ruta actual y el id realmente cargado para facilitar el análisis
- el bug de respuestas fuera de orden se reproduce más fácil alternando `Anterior` y `Siguiente` rápido, en lugar de moverse en una sola dirección
- esperamos que consideres lifecycle de páginas en Ionic, no solo inicialización de componentes Angular

El bug no está aislado a una sola línea ni a un solo componente. Esperamos que razones ownership del estado, timing de requests y lifecycle de página en conjunto.

Nos interesa más el razonamiento detrás de la solución que un parche que solo esconda el síntoma.

### 2. Implementar `Asignar a analista`

La pantalla de detalle ya expone parte de la UI para asignar un analista, pero el flujo no está completo.

Implementá la feature end to end:

- completar el endpoint de backend
- validar el input
- conectar la acción en frontend
- mostrar loading y errores cuando corresponda
- mantener lista y detalle consistentes después de guardar

## Tareas Opcionales

Podés implementar una o más si te da el tiempo. No hace falta completar todas.

### 1. Filtrar solicitudes por analista

Agregá un filtro por analista en la lista de solicitudes y conectalo con la API o el estado que corresponda.

### 2. Agregar tests útiles

Sumá tests donde creas que aportan más valor. Nos interesa más la calidad y la elección de cobertura que la cantidad.

### 3. Mejorar loading, empty o error states

Mejorá la experiencia cuando la app está cargando, cuando no hay resultados o cuando ocurre un error.

### 4. Ajustar visualmente la lista usando una referencia guiada

Referencia visual:

- `docs/references/applications-list-reference.png`

Íconos de apoyo ya disponibles en:

- `frontend/src/assets/reference-icons/score.svg`
- `frontend/src/assets/reference-icons/analyst.svg`
- `frontend/src/assets/reference-icons/calendar.svg`
- `frontend/src/assets/reference-icons/last-updated.svg`

### 5. Ajustar visualmente el detalle usando una referencia guiada

Referencia visual:

- `docs/references/application-detail-reference.png`

Íconos de apoyo ya disponibles en:

- `frontend/src/assets/reference-icons/route-current.svg`
- `frontend/src/assets/reference-icons/loaded-data.svg`
- `frontend/src/assets/reference-icons/refreshing-application.svg`
- `frontend/src/assets/reference-icons/score.svg`
- `frontend/src/assets/reference-icons/analyst.svg`

## Reglas

- Mantené la solución simple.
- Priorizá corrección y claridad sobre agregar más features.
- Si encontrás problemas que decidís no resolver, documentalos.
- Podés usar herramientas de AI. Si las usás, indicá brevemente cuál y para qué.

## Entrega

Incluí:

- código fuente
- instrucciones para correr frontend y backend
- una nota breve explicando decisiones y trade-offs
- cualquier issue, limitación o mejora no resuelta que hayas detectado

## Notas

- No hace falta agregar autenticación.
- No hace falta agregar una base de datos real.
- Si decidís no resolver algo, documentalo brevemente y explicá por qué.
