/* ==========================================================
  Villarrica: Historia y Patrimonio – js/juegos.js
  Juego educativo: «Preguntas de Villarrica»
   ----------------------------------------------------------
   El juego NO guarda datos (no usa localStorage ni cookies),
   NO envía nada por internet y NO pide datos personales.
   ========================================================== */

"use strict";

/* ----------------------------------------------------------
   1. PREGUNTAS
   Cada pregunta es un objeto con:
     texto       -> lo que se pregunta
     opciones    -> arreglo de 3 textos; la PRIMERA es la correcta
                    (el juego las mezcla antes de mostrarlas)
     explicacion -> se muestra después de responder
   Las preguntas se basan en index.html y cronologia.html.
   ---------------------------------------------------------- */
const PREGUNTAS = [
  {
    texto: "¿En qué fecha se fundó Villarrica?",
    opciones: [
      "14 de mayo de 1570",
      "14 de mayo de 1670",
      "Diciembre de 1889"
    ],
    explicacion: "La cronología indica que Ruy Díaz de Melgarejo fundó la ciudad el 14 de mayo de 1570."
  },
  {
    texto: "¿Quién fue el fundador de Villarrica?",
    opciones: [
      "Ruy Díaz de Melgarejo",
      "Manuel Ortiz Guerrero",
      "Maestro Fermín López"
    ],
    explicacion: "La página identifica a Ruy Díaz de Melgarejo como fundador de la ciudad."
  },
  {
    texto: "¿Con cuántos hombres y caballos partió Ruy Díaz de Melgarejo en busca de las minas de oro?",
    opciones: [
      "40 hombres y 53 caballos",
      "53 hombres y 40 caballos",
      "40 hombres y 35 caballos"
    ],
    explicacion: "El texto de la cronología menciona que partió con 40 hombres y 53 caballos buscando minas de oro."
  },
  {
    texto: "¿Qué provocó los traslados de la antigua Villarrica?",
    opciones: [
      "Las invasiones de los bandeirantes",
      "La llegada del ferrocarril",
      "La construcción de la Catedral"
    ],
    explicacion: "La cronología explica que las invasiones de los bandeirantes obligaron a la ciudad a trasladarse varias veces."
  },
  {
    texto: "¿Cuándo comenzó la Catedral como oratorio franciscano?",
    opciones: [
      "En 1683",
      "En 1570",
      "En 1889"
    ],
    explicacion: "La página de inicio dice que la Catedral comenzó como un oratorio de los franciscanos en 1683 y fue concluida en 1891."
  },
  {
    texto: "¿En qué mes y año llegó el ferrocarril a Villarrica?",
    opciones: [
      "Diciembre de 1889",
      "Mayo de 1570",
      "Mayo de 1970"
    ],
    explicacion: "La cronología señala que el ferrocarril llegó a Villarrica en diciembre de 1889."
  },
  {
    texto: "¿Qué centro cultural se habilitó en la antigua estación ferroviaria de Villarrica en 2012?",
    opciones: [
      "El Centro Cultural Comunitario «La Estación de Villarrica»",
      "El Museo Municipal Maestro Fermín López",
      "Un mercado de abastos"
    ],
    explicacion: "La Secretaría Nacional de Cultura informó sobre la habilitación del Centro Cultural Comunitario «La Estación de Villarrica» en 2012."
  },
  {
    texto: "¿Cuál de estos lugares aparece como patrimonio material de Villarrica?",
    opciones: [
      "El Museo Municipal Maestro Fermín López",
      "El Festival de la Raza",
      "La Fiesta de San Juan"
    ],
    explicacion: "El Museo Municipal Maestro Fermín López figura en la lista de patrimonio material. El Festival de la Raza y la Fiesta de San Juan aparecen como patrimonio inmaterial."
  },
  {
    texto: "¿Cuál de estas expresiones se incluye como patrimonio inmaterial de Villarrica?",
    opciones: [
      "Festival de la Raza",
      "Estación de ferrocarril",
      "Palacete municipal"
    ],
    explicacion: "La página de inicio enumera el Festival de la Raza entre las expresiones de patrimonio inmaterial."
  },
  {
    texto: "¿Dónde está ubicada la Plaza de los Héroes?",
    opciones: [
      "En el centro de Villarrica",
      "Junto a las minas de oro",
      "En la estación de ferrocarril"
    ],
    explicacion: "La página describe la Plaza de los Héroes como un lugar emblemático ubicado en el centro de Villarrica."
  }
];

/* ----------------------------------------------------------
   2. ESTADO DEL JUEGO (variables que cambian mientras se juega)
   ---------------------------------------------------------- */
let indice = 0;          // número de la pregunta actual (0 = la primera)
let puntaje = 0;         // respuestas correctas hasta ahora
let respondida = false;  // ¿ya se contestó la pregunta actual?
let opcionesActuales = [];   // las 3 opciones mezcladas de la pregunta actual

/* ----------------------------------------------------------
   3. FUNCIONES AUXILIARES
   ---------------------------------------------------------- */

// Mezcla un arreglo (algoritmo de Fisher-Yates) sin modificar el original.
function mezclar(arreglo) {
  const copia = arreglo.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const guardado = copia[i];
    copia[i] = copia[j];
    copia[j] = guardado;
  }
  return copia;
}

// Devuelve un mensaje final según el puntaje.
function mensajeFinal(puntos) {
  if (puntos >= 9) {
    return "¡Excelente! Conocés muy bien la historia y el patrimonio de Villarrica.";
  } else if (puntos >= 7) {
    return "¡Muy bien! Conocés muchos datos. Repasá las explicaciones de las preguntas que fallaste.";
  } else if (puntos >= 5) {
    return "Buen intento. Repasá la historia y el patrimonio, y volvé a jugar.";
  } else {
    return "Todavía hay que practicar. Leé las explicaciones y volvé a jugar.";
  }
}

/* ----------------------------------------------------------
   4. JUEGO
   ---------------------------------------------------------- */
function iniciarJuego() {

  /* ----- Elementos de la página (DOM) ----- */
  const pantallaInicio = document.getElementById("pantalla-inicio");
  const pantallaPregunta = document.getElementById("pantalla-pregunta");
  const pantallaResultado = document.getElementById("pantalla-resultado");

  const textoProgreso = document.getElementById("juego-progreso-texto");
  const textoPuntaje = document.getElementById("juego-puntaje");
  const barra = document.getElementById("barra");
  const barraRelleno = document.getElementById("barra-relleno");
  const textoPregunta = document.getElementById("juego-pregunta");
  const contenedorRespuestas = document.getElementById("juego-respuestas");
  const retroalimentacion = document.getElementById("juego-feedback");
  const fbTitulo = document.getElementById("fb-titulo");
  const fbExplicacion = document.getElementById("fb-explicacion");
  const botonSiguiente = document.getElementById("btn-siguiente");

  const textoResultado = document.getElementById("resultado-puntaje");
  const textoMensaje = document.getElementById("resultado-mensaje");

  const LETRAS = ["A", "B", "C"];

  /* ----- Pantallas ----- */
  function mostrarPantalla(pantalla) {
    pantallaInicio.hidden = true;
    pantallaPregunta.hidden = true;
    pantallaResultado.hidden = true;
    pantalla.hidden = false;
  }

  // Actualiza "Pregunta 3 de 10", el puntaje y la barra de progreso.
  function actualizarProgreso() {
    const total = PREGUNTAS.length;
    const completadas = respondida ? indice + 1 : indice;
    textoProgreso.textContent = "Pregunta " + (indice + 1) + " de " + total;
    textoPuntaje.textContent = puntaje;
    barraRelleno.style.width = (completadas / total) * 100 + "%";
    barra.setAttribute("aria-valuenow", completadas);
  }

  /* ----- Mostrar una pregunta ----- */
  function mostrarPregunta() {
    const pregunta = PREGUNTAS[indice];
    respondida = false;

    // La primera opción es la correcta: se marca antes de mezclar.
    const conMarca = pregunta.opciones.map(function (texto, posicion) {
      return { texto: texto, esCorrecta: posicion === 0 };
    });
    opcionesActuales = mezclar(conMarca);

    textoPregunta.textContent = pregunta.texto;
    contenedorRespuestas.innerHTML = "";

    opcionesActuales.forEach(function (opcion, posicion) {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "respuesta";
      boton.dataset.posicion = posicion;

      const letra = document.createElement("span");
      letra.className = "letra";
      letra.textContent = LETRAS[posicion];

      const texto = document.createElement("span");
      texto.textContent = opcion.texto;

      boton.appendChild(letra);
      boton.appendChild(texto);
      contenedorRespuestas.appendChild(boton);
    });

    // Limpia la retroalimentación anterior
    retroalimentacion.className = "feedback";
    fbTitulo.textContent = "";
    fbExplicacion.textContent = "";
    botonSiguiente.hidden = true;

    actualizarProgreso();
    mostrarPantalla(pantallaPregunta);
    textoPregunta.focus();   // el lector de pantalla lee la nueva pregunta
  }

  /* ----- Responder ----- */
  function responder(posicionElegida) {
    if (respondida) {
      return;                       // evita contestar dos veces
    }
    respondida = true;

    const pregunta = PREGUNTAS[indice];
    const elegida = opcionesActuales[posicionElegida];
    const botones = contenedorRespuestas.querySelectorAll("button");

    // Bloquea los botones y marca cuál es la correcta y cuál la elegida.
    botones.forEach(function (boton, posicion) {
      boton.disabled = true;
      if (opcionesActuales[posicion].esCorrecta) {
        boton.classList.add("correcta");
        boton.querySelector(".letra").textContent = "✔";
      } else if (posicion === posicionElegida) {
        boton.classList.add("incorrecta");
        boton.querySelector(".letra").textContent = "✖";
      }
    });

    // Condicional: ¿acertó o no?
    if (elegida.esCorrecta) {
      puntaje = puntaje + 1;
      retroalimentacion.className = "feedback visible acierto";
      fbTitulo.textContent = "¡Correcto!";
    } else {
      retroalimentacion.className = "feedback visible error";
      fbTitulo.textContent = "Incorrecto. La respuesta correcta está marcada con ✔.";
    }
    fbExplicacion.textContent = pregunta.explicacion;

    // El último botón dice "Ver resultado"
    if (indice === PREGUNTAS.length - 1) {
      botonSiguiente.textContent = "Ver resultado";
    } else {
      botonSiguiente.textContent = "Siguiente pregunta";
    }
    botonSiguiente.hidden = false;

    actualizarProgreso();
    botonSiguiente.focus();
  }

  /* ----- Resultado final ----- */
  function mostrarResultado() {
    textoResultado.textContent = puntaje + " de " + PREGUNTAS.length;
    textoMensaje.textContent = mensajeFinal(puntaje);
    mostrarPantalla(pantallaResultado);
    document.getElementById("resultado-titulo").focus();
  }

  /* ----- Empezar o volver a jugar ----- */
  function empezar() {
    indice = 0;
    puntaje = 0;
    mostrarPregunta();
  }

  /* ----- EVENTOS ----- */
  document.getElementById("btn-comenzar").addEventListener("click", empezar);
  document.getElementById("btn-reiniciar").addEventListener("click", empezar);

  // Un solo oyente para los tres botones de respuesta.
  contenedorRespuestas.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button");
    if (boton) {
      responder(Number(boton.dataset.posicion));
    }
  });

  botonSiguiente.addEventListener("click", function () {
    if (indice < PREGUNTAS.length - 1) {
      indice = indice + 1;
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  });

  /* ----- Arranque: se ve la pantalla de inicio ----- */
  barra.setAttribute("aria-valuemax", PREGUNTAS.length);
  mostrarPantalla(pantallaInicio);
}

if (document.getElementById("juego-app")) {
  iniciarJuego();
}
