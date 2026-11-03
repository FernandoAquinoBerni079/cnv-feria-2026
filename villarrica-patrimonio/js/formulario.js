/* Formulario demostrativo: NO envía ni guarda nada.
   Evita que lo escrito viaje en la URL y muestra un aviso. */
"use strict";
(function () {
  var form = document.getElementById("form-demo");
  var estado = document.getElementById("form-estado");
  if (!form || !estado) { return; }
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    form.reset();
    estado.textContent = "Demostración: no se envió ni se guardó nada.";
  });
})();
