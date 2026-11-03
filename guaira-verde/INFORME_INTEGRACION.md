# INFORME DE INTEGRACIÓN Y CORRECCIÓN — GUAIRÁ VERDE V08

**Proyecto:** Guairá Verde — Educación ambiental interactiva · Grupo 4 · 1.º BTI · Feria de Informática 2026.

**Equipo:** Micaela, Milagros y Maily. **Responsable de esta integración:** revisión técnica docente asistida. **Origen:** `Proyect_GRUPO3BTI.zip`. **Estado:** listo para revisión final y despliegue, con el permiso de publicación de las imágenes por confirmar.

## 1. Diagnóstico sobre la entrega

El ZIP contenía tres estructuras diferentes: raíz con `index.html 1`, `juegos.html.js` y archivos de estilo mezclados con HTML; `Guaira_Verde_proyecto/Guaira_Verde/` con cinco páginas ordenadas; y `DOC-20261031-WA0165/` con tres actividades extra, dos archivos truncados. Las imágenes estaban en la carpeta `img/` externa a la carpeta organizada.

## 2. Decisiones realizadas

1. Se utiliza `Guaira_Verde_proyecto/Guaira_Verde/` como base educativa y visual. Se mantienen las secciones de energía, reciclaje, agua y árboles, la tabla ambiental, el formulario demostrativo y la paleta verde.
2. Se integran los archivos `energia.jpg`, `reciclaje.jpg` y `agua.jpg` **sin modificar ni recomprimir los binarios**. Se agregan al Inicio con rutas locales y textos alternativos.
3. `juegos.html` muestra seis tarjetas y enlaces accesibles, cada actividad en su propia página. No se incluyen varias versiones ni archivos mal nombrados.
4. **Trivia:** se rescataron preguntas del paquete original y del juego combinado; se completó una partida de diez con explicaciones, puntuación, prevención de respuestas repetidas y reinicio.
5. **Sopa de letras:** se rescataron las cinco palabras originales y se reparó el algoritmo para asegurar todas las palabras en el tablero y exigir casillas contiguas en línea recta. Incluye reinicio y borrado de selección.
6. **Memoria:** se conservaron las cuatro parejas de símbolos del proyecto y se reparó la lógica de bloqueo, parejas encontradas, contador e interrupción de la animación al reiniciar.
7. **Clasificación:** se conservaron los seis ejemplos originales, agregando confirmación por respuesta, explicación, puntaje y avance manual para evitar doble puntuación.
8. **Verdadero o falso:** el archivo original estaba truncado; se recuperaron sus afirmaciones identificables y se reconstruyó una actividad de seis preguntas con respuesta, explicación, resultado y reinicio.
9. **Desafío ecológico:** se recuperaron los ocho hábitos del original y se reconstruyó la selección de buenas prácticas, con puntuación y correcciones visuales.
10. Se añade la regla CSS `[hidden]{display:none!important}` para que los botones que dependen del estado del juego permanezcan efectivamente ocultos.
11. Todo el JavaScript se almacena separado en `js/`; las páginas comparten `css/styles.css`, menú, navegación de vuelta al catálogo y diseño para computadoras/celulares.
12. No se incorporan bibliotecas de terceros, redes sociales, formularios con envío, bases de datos ni servicios externos.

## 3. Resultados de pruebas independientes

Las comprobaciones se realizaron en Chromium con contenido HTML/CSS/JS local incorporado en memoria. El navegador del entorno bloquea por políticas la apertura directa de `http://127.0.0.1`, por lo que **no son pruebas de un despliegue real de GitHub Pages**. Se hizo validación de recursos y rutas de forma independiente.

- Archivos HTML: 9 páginas válidas a nivel de estructura y recursos locales.
- 4 anchos revisados en todas las páginas: 360, 390, 768 y 1366 píxeles; ninguno presentó desbordamiento horizontal.
- Portada: carga de las 3 imágenes comprobada.
- Catálogo: 6 accesos comprobados y rutas existentes.
- Formulario: confirma compromiso y restablece campos sin enviar solicitudes.
- Trivia: se comprobó partida de 10/10, 0/10, doble selección bloqueada y reinicio.
- Sopa: 5/5 y reinicio en 5 tableros generados de forma independiente.
- Memoria: 4/4 parejas y reinicio.
- Clasificación: 6/6 y 0/6, con reinicio.
- Verdadero o falso: 6/6 y 0/6, con reinicio.
- Desafío ecológico: 8/8 y reinicio.
- JavaScript: `node --check` sin errores de sintaxis; consola de Chromium sin errores de ejecución en estas pruebas.
- **144 verificaciones automáticas aprobadas**. El archivo interno `PRUEBAS_V08.md` explica el alcance.

## 4. Integridad de imágenes

- `agua.jpg`: SHA-256 `c8f10bbd4887af366b3d78b3e5bd4a411de33dd9dd80b3c8cd07f79fe396cd0d` — idéntico al original.
- `energia.jpg`: SHA-256 `d718902986357780ad055bd587049c3291bd504f18ad3ccd58297203b7f953f5` — idéntico al original.
- `reciclaje.jpg`: SHA-256 `16d559496f8f2525e796cbe671bc544cac7333af4f63f9c5bdc0048297149453` — idéntico al original.

## 5. Observaciones anteriores a publicación pública

- Confirmar con el grupo la **procedencia y permiso de difusión** de las tres imágenes: el ZIP recibido no incluía sus créditos. Esto no es un fallo funcional.
- Comprobar el sitio desde la URL pública, especialmente todos los enlaces, carga de recursos, un juego completo y diseño móvil en dispositivo real.
- El contenido ambiental es divulgativo para una feria; los servicios de reciclaje y los residuos aceptados pueden variar según la comunidad.

## 6. Límites de la intervención

Las seis actividades combinan elementos rescatados del material estudiantil con código reparado o reconstruido porque algunos archivos venían truncados. El grupo debe revisar y comprender las modificaciones antes de defenderlas públicamente. No se reemplazó la temática ni las imágenes originales.
