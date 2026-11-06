"use strict";
// Formulario académico: nunca envía ni guarda información.
const form = document.getElementById("contact-form");
if (form) {
  const feedback = document.getElementById("form-feedback");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.reset();
    feedback.hidden = false;
    feedback.textContent = "✓ Simulación completada. Tu mensaje NO fue enviado ni guardado. ¡Gracias por probar la página!";
  });
  form.addEventListener("reset", () => {
    feedback.hidden = true;
    feedback.textContent = "";
  });
}
