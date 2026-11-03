"use strict";
// Recuperación del juego extra recibido incompleto; incluye las afirmaciones identificables en la entrega.
const afirmaciones=[
{p:"Separar materiales facilita su recuperación.",v:true,e:"La separación evita mezclar materiales recuperables con residuos no aptos."},
{p:"Quemar basura no contamina.",v:false,e:"El humo de la quema de basura puede contaminar el aire."},
{p:"La energía solar es renovable.",v:true,e:"La energía solar se obtiene de la radiación del Sol."},
{p:"Las pilas se pueden tirar en cualquier lugar.",v:false,e:"Las pilas requieren un sistema de recolección apropiado."},
{p:"Cerrar la canilla mientras nos cepillamos ayuda a ahorrar agua.",v:true,e:"Cerrar la canilla evita desperdiciar agua."},
{p:"Tirar residuos en los arroyos ayuda a proteger a los peces.",v:false,e:"Los residuos pueden dañar a los organismos acuáticos."}
];
let i=0,score=0,respondido=false;
const botones=[...document.querySelectorAll("[data-respuesta]")],texto=document.getElementById("vf-afirmacion"),msg=document.getElementById("vf-mensaje"),contador=document.getElementById("vf-contador"),puntos=document.getElementById("vf-puntos"),next=document.getElementById("vf-siguiente");
function mostrar(){respondido=false;botones.forEach(b=>b.disabled=false);next.hidden=true;texto.textContent=afirmaciones[i].p;contador.textContent=`Afirmación ${i+1} de ${afirmaciones.length}`;puntos.textContent=`Puntos: ${score}/${afirmaciones.length}`;msg.textContent="";msg.className="feedback";}
function contestar(v){if(respondido)return;respondido=true;botones.forEach(b=>b.disabled=true);const q=afirmaciones[i],ok=v===q.v;if(ok)score++;puntos.textContent=`Puntos: ${score}/${afirmaciones.length}`;msg.className=`feedback ${ok?"good":"bad"}`;msg.textContent=(ok?"¡Correcto! ":"No es correcto. ")+q.e;if(i===afirmaciones.length-1){contador.textContent="¡Juego completado!";msg.textContent+=` Resultado final: ${score} de ${afirmaciones.length}.`;}else{next.hidden=false;}}
botones.forEach(b=>b.addEventListener("click",()=>contestar(b.dataset.respuesta==="true")));next.addEventListener("click",()=>{if(!respondido||i>=afirmaciones.length-1)return;i++;mostrar();});document.getElementById("vf-reiniciar").addEventListener("click",()=>{i=0;score=0;mostrar();});mostrar();
