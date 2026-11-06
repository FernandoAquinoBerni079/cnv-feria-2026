"use strict";
// Desafío Sweet Charm: 10 preguntas con corrección inmediata.
const questions = [
 {q:"¿Cuál de estos productos es una torta con chocolate?", opts:["Torta de chocolate","Cookies","Cheesecake","Cupcakes"], right:0, why:"La torta de chocolate es uno de nuestros productos destacados."},
 {q:"¿Qué producto suele presentarse en pequeñas porciones decoradas?", opts:["Cookies","Cupcakes","Brownies","Cheesecake"], right:1, why:"Los cupcakes son pequeños pastelitos individuales."},
 {q:"¿Qué producto aparece en el catálogo con un precio ilustrativo de 18.000 Gs.?", opts:["Red Velvet","Cheesecake","Brownies","Cupcakes"], right:2, why:"El catálogo original indica 18.000 Gs. para los brownies."},
 {q:"¿Cuál de los productos del catálogo es una galletita?", opts:["Torta de chocolate","Cookies","Cheesecake","Red Velvet"], right:1, why:"Cookies es el nombre en inglés de las galletitas."},
 {q:"¿Qué postre se caracteriza por su textura cremosa?", opts:["Cookies","Brownies","Cupcakes","Cheesecake"], right:3, why:"El cheesecake es conocido por su textura suave y cremosa."},
 {q:"¿Qué tecnología utilizamos para organizar el contenido de una página web?", opts:["CSS","HTML","JavaScript","Un buscador"], right:1, why:"HTML crea la estructura de títulos, imágenes, enlaces y secciones."},
 {q:"¿Qué tecnología se ocupa principalmente de colores, tamaños y distribución visual?", opts:["CSS","HTML","JavaScript","Correo electrónico"], right:0, why:"CSS define el aspecto visual de la página."},
 {q:"¿Qué lenguaje permite que los juegos respondan a los clics del visitante?", opts:["HTML","CSS","JavaScript","Un editor de imágenes"], right:2, why:"JavaScript administra la lógica y las interacciones de los juegos."},
 {q:"¿Qué ocurre al usar el formulario de contacto de Sweet Charm?", opts:["Se cobra una compra","Se envía un correo real","Se guarda el mensaje en un servidor","Se muestra una simulación sin envío"], right:3, why:"El formulario es una demostración, por lo que no envía ni almacena datos."},
 {q:"¿Para qué se creó el sitio Sweet Charm?", opts:["Para vender en línea con pagos reales","Como proyecto escolar de desarrollo web","Como red social","Para descargar videojuegos"], right:1, why:"Sweet Charm es una práctica educativa de 1.º BTI para la feria."}
];
const get=(id)=>document.getElementById(id);
let current=0, score=0, chosen=false;
function showQuestion(){
  chosen=false;
  const q=questions[current];
  get("quiz-counter").textContent=`Pregunta ${current+1} de ${questions.length}`;
  get("quiz-score").textContent=`Puntaje: ${score}`;
  get("quiz-progress").style.width=`${(current/questions.length)*100}%`;
  get("quiz-question").textContent=q.q;
  get("quiz-feedback").textContent="";
  get("quiz-feedback").className="feedback";
  get("quiz-next").hidden=true;
  get("quiz-answers").replaceChildren();
  q.opts.forEach((option,index)=>{
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="answer-button";
    btn.textContent=option;
    btn.addEventListener("click",()=>choose(index));
    get("quiz-answers").append(btn);
  });
}
function choose(index){
  if(chosen) return;
  chosen=true;
  const q=questions[current];
  const correct=index===q.right;
  if(correct) score++;
  Array.from(get("quiz-answers").children).forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.right)btn.classList.add("correct");
    else if(i===index)btn.classList.add("incorrect");
  });
  const feedback=get("quiz-feedback");
  feedback.classList.add(correct?"is-correct":"is-incorrect");
  feedback.textContent=(correct?"¡Correcto! ":"No es correcto. ")+q.why;
  get("quiz-score").textContent=`Puntaje: ${score}`;
  get("quiz-next").hidden=false;
  get("quiz-next").textContent=current===questions.length-1?"Ver resultado →":"Siguiente pregunta →";
}
function nextQuestion(){
  if(!chosen)return;
  current++;
  if(current<questions.length){showQuestion();return;}
  get("quiz-screen").hidden=true;
  get("quiz-result").hidden=false;
  get("quiz-counter").textContent="Desafío completado";
  get("quiz-progress").style.width="100%";
  get("quiz-final-score").textContent=`${score} de ${questions.length} puntos`;
  get("quiz-final-message").textContent=score===10?"¡Excelente! Dominás todo el recorrido de Sweet Charm.":score>=7?"¡Muy bien! Conocés bastante sobre nuestro proyecto.":"¡Buen intento! Explorá el sitio y volvé a participar.";
  get("quiz-restart").focus();
}
function restart(){current=0;score=0;get("quiz-result").hidden=true;get("quiz-screen").hidden=false;showQuestion();}
get("quiz-next").addEventListener("click",nextQuestion);
get("quiz-restart").addEventListener("click",restart);
showQuestion();
