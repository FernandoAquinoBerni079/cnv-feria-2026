# Comprobaciones de Huerta Digital V05

## Resultado
**193 de 193 comprobaciones aprobadas.**

## Metodología y límites
El navegador Chromium del entorno bloqueó la apertura directa de `file://`, por lo que la inspección visual/funcional se hizo cargando temporalmente HTML, CSS y JS en memoria. Las fotografías originales se incorporaron como `data:` solo en el **entorno de pruebas**; los archivos de la entrega usan rutas locales normales. Estas pruebas no equivalen a un despliegue en GitHub Pages.

## Verificaciones
- Seis páginas, cuatro anchos: 360, 390, 768 y 1366 píxeles.
- Sin desbordamientos horizontales, errores JavaScript ni fotografías rotas cuando se fuerzan a cargar las imágenes `loading=lazy`.
- Trivia (10 preguntas): acierto 10/10; error 0/10; botones y reinicio.
- Decisiones (6 casos): acierto 6/6; error 0/6; botones y reinicio.
- Buscador: coincidencia sin tildes, filtro por estación y espacio, contador y estado vacío.
- Desafío semanal: marcado, progreso 7/7 y reinicio, con simulación de almacenamiento local en las pruebas.
- JavaScript: sintaxis revisada con `node --check`.
- HTML: archivos relativos y menú de las seis páginas verificados.

## Pendientes docentes
- Verificar derechos de uso de las siete fotografías originales antes de publicación abierta.
- Probar las páginas y juegos desde GitHub Pages en un celular real antes de entregar el QR.
- Revisar con el grupo la comprensión de HTML, CSS, JavaScript y la corrección de recomendaciones agrícolas.
