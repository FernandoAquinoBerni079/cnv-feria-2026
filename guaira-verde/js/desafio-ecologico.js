"use strict";
// Se recuperan los ocho hábitos del archivo incompleto entregado por el grupo.
const habitos=[
{p:"Apagar las luces que no usamos.",ok:true},
{p:"Dejar correr el agua al cepillarnos.",ok:false},
{p:"Separar residuos limpios para reciclar.",ok:true},
{p:"Tirar basura en los arroyos.",ok:false},
{p:"Usar una botella reutilizable.",ok:true},
{p:"Quemar plásticos.",ok:false},
{p:"Reutilizar papel cuando sea posible.",ok:true},
{p:"Caminar o usar bicicleta en trayectos cortos y seguros.",ok:true}
];
const contenedor=document.getElementById("habitos"),msg=document.getElementById("desafio-mensaje");
function dibujar(){contenedor.innerHTML="";habitos.forEach((h,i)=>{const label=document.createElement("label");label.className="habit";const check=document.createElement("input");check.type="checkbox";check.id=`habito-${i}`;const nombre=document.createElement("span");nombre.textContent=h.p;label.append(check,nombre);contenedor.appendChild(label);});msg.className="feedback";msg.textContent="Elegí las acciones positivas y presioná Comprobar.";}
function comprobar(){let score=0;habitos.forEach((h,i)=>{const b=document.getElementById(`habito-${i}`),label=b.parentElement;const acierto=b.checked===h.ok;if(acierto)score++;label.classList.toggle("good",acierto);label.classList.toggle("bad",!acierto);let icon=label.querySelector(".habit-check");if(!icon){icon=document.createElement("span");icon.className="habit-check";label.appendChild(icon);}icon.textContent=acierto?"✓":"✕";});msg.className=`feedback ${score===habitos.length?"good":"bad"}`;msg.textContent=`Resultado: ${score} de ${habitos.length}. `+(score===habitos.length?"¡Excelente! Elegiste correctamente los ocho hábitos.":"Revisá las acciones marcadas con ✕. Elegí solo los hábitos que ayudan al ambiente.");}
contenedor.addEventListener("change",e=>{if(e.target.matches('input')){const label=e.target.parentElement;label.classList.remove("good","bad");label.querySelector(".habit-check")?.remove();msg.className="feedback";msg.textContent="Modificaste tu selección. Comprobá otra vez.";}});
document.getElementById("desafio-comprobar").addEventListener("click",comprobar);document.getElementById("desafio-reiniciar").addEventListener("click",dibujar);dibujar();
