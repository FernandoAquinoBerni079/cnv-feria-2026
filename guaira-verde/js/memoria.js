"use strict";
// Parejas originalmente ideadas por el grupo (árbol, agua, reciclaje y sol).
const iconos=["🌳","💧","♻️","☀️"];
let baraja=[],eleccion=[],movimientos=0,parejas=0,bloqueado=false,espera=null;
const tablero=document.getElementById("memoria-tablero"),mov=document.getElementById("memoria-movimientos"),par=document.getElementById("memoria-parejas"),mensaje=document.getElementById("memoria-mensaje");
function mezclar(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function iniciarMemoria(){if(espera!==null){clearTimeout(espera);espera=null;}baraja=mezclar([...iconos,...iconos]);eleccion=[];movimientos=0;parejas=0;bloqueado=false;mov.textContent="Movimientos: 0";par.textContent="Parejas: 0/4";mensaje.textContent="¡Encontrá las cuatro parejas!";mensaje.className="feedback";tablero.innerHTML="";
baraja.forEach((icono,i)=>{const b=document.createElement("button");b.type="button";b.className="memory-card";b.textContent="?";b.setAttribute("aria-label",`Tarjeta ${i+1} oculta`);b.addEventListener("click",()=>descubrir(i,b));tablero.appendChild(b);});}
function descubrir(i,b){if(bloqueado||b.classList.contains("matched")||eleccion.some(x=>x.i===i))return;b.textContent=baraja[i];b.classList.add("open");b.setAttribute("aria-label",`Tarjeta ${i+1}: ${baraja[i]}`);eleccion.push({i,b});if(eleccion.length!==2)return;
 movimientos++;mov.textContent=`Movimientos: ${movimientos}`;const [a,c]=eleccion;if(baraja[a.i]===baraja[c.i]){a.b.classList.add("matched");c.b.classList.add("matched");a.b.disabled=c.b.disabled=true;eleccion=[];parejas++;par.textContent=`Parejas: ${parejas}/4`;mensaje.textContent=parejas===4?`¡Felicitaciones! Completaste las cuatro parejas en ${movimientos} movimientos.`:"¡Pareja encontrada!";mensaje.className="feedback good";}
 else{bloqueado=true;mensaje.textContent="No coinciden. Observá las tarjetas y volvé a intentar.";mensaje.className="feedback bad";espera=setTimeout(()=>{[a,c].forEach(x=>{x.b.textContent="?";x.b.classList.remove("open");x.b.setAttribute("aria-label",`Tarjeta ${x.i+1} oculta`);});eleccion=[];bloqueado=false;espera=null;},700);}}
document.getElementById("memoria-reiniciar").addEventListener("click",iniciarMemoria);iniciarMemoria();
