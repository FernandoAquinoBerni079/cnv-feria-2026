"use strict";
const palabras=["AGUA","SOL","ARBOL","VERDE","FLORA"],N=10;
let tablero=[],ubicaciones={},encontradas=new Set(),seleccion=[];
const grid=document.getElementById("grid-sopa"),mensaje=document.getElementById("mensaje-sopa"),avance=document.getElementById("avance-sopa");
function iniciarSopa(){tablero=Array.from({length:N},()=>Array(N).fill(""));ubicaciones={};encontradas=new Set();seleccion=[];
 // Cada palabra ocupa su propia fila o columna: evita que una palabra sobrescriba otra.
 const filas=[0,2,4,6,8].sort(()=>Math.random()-.5);
 palabras.forEach((w,i)=>{const horizontal=i%2===0;const f=horizontal?filas[i]:Math.floor(Math.random()*(N-w.length+1));const c=horizontal?Math.floor(Math.random()*(N-w.length+1)):filas[i];const coord=[];
 for(let j=0;j<w.length;j++){const r=horizontal?f:f+j,k=horizontal?c+j:c;tablero[r][k]=w[j];coord.push([r,k]);}ubicaciones[w]=coord;});
 // No permitir sobreescrituras accidentales: si hubo cruce, reconstruimos mediante algoritmo alternativo.
 if(!palabras.every(w=>ubicaciones[w].every(([r,c],i)=>tablero[r][c]===w[i]))){
 tablero=Array.from({length:N},()=>Array(N).fill(""));ubicaciones={};palabras.forEach((w,i)=>{const coord=[];for(let j=0;j<w.length;j++){const r=i*2,c=j;tablero[r][c]=w[j];coord.push([r,c]);}ubicaciones[w]=coord;});}
 const letras="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";tablero=tablero.map(row=>row.map(ch=>ch||letras[Math.floor(Math.random()*letras.length)]));dibujar();mostrarPalabras();mensaje.textContent="¡Encontrá las cinco palabras!";mensaje.className="feedback";avance.textContent="Encontradas: 0/5";}
function dibujar(){grid.innerHTML="";tablero.forEach((fila,r)=>fila.forEach((letra,c)=>{const b=document.createElement("button");b.className="celda-sopa";b.type="button";b.textContent=letra;b.setAttribute("aria-label",`Fila ${r+1}, columna ${c+1}: ${letra}`);b.dataset.r=r;b.dataset.c=c;b.addEventListener("click",()=>elegir(r,c,b));grid.appendChild(b);}));}
function limpiar(){seleccion.forEach(x=>x.b.classList.remove("seleccionada"));seleccion=[];}
function elegir(r,c,b){if(b.classList.contains("encontrada"))return;const i=seleccion.findIndex(x=>x.r===r&&x.c===c);if(i>=0){if(i===seleccion.length-1){seleccion.pop();b.classList.remove("seleccionada");}else{limpiar();}return;}
 if(seleccion.length){const first=seleccion[0],last=seleccion[seleccion.length-1];const dr=r-last.r,dc=c-last.c;if(Math.abs(dr)+Math.abs(dc)!==1){mensaje.textContent="Elegí una casilla vecina de la anterior.";mensaje.className="feedback bad";return;}
 if(seleccion.length>=2){const d0r=seleccion[1].r-first.r,d0c=seleccion[1].c-first.c;if(dr!==d0r||dc!==d0c){mensaje.textContent="Seguí en línea recta para formar la palabra.";mensaje.className="feedback bad";return;}}}
 seleccion.push({r,c,b});b.classList.add("seleccionada");const text=seleccion.map(x=>tablero[x.r][x.c]).join("");const reversed=[...text].reverse().join("");const w=palabras.find(x=>!encontradas.has(x)&&(text===x||reversed===x)&&seleccion.every(s=>ubicaciones[x].some(([rr,cc])=>rr===s.r&&cc===s.c)));
 if(w){encontradas.add(w);seleccion.forEach(x=>{x.b.classList.remove("seleccionada");x.b.classList.add("encontrada");x.b.disabled=true;});seleccion=[];mostrarPalabras();avance.textContent=`Encontradas: ${encontradas.size}/5`;mensaje.textContent=encontradas.size===5?"¡Felicitaciones! Encontraste las cinco palabras. 🌱":`¡Encontraste ${w}! Seguimos buscando.`;mensaje.className="feedback good";}
 else if(seleccion.length>=Math.max(...palabras.map(x=>x.length))){limpiar();mensaje.textContent="Esa secuencia no forma ninguna de las palabras buscadas. Intentá otra vez.";mensaje.className="feedback bad";}}
function mostrarPalabras(){document.getElementById("palabras").innerHTML=palabras.map(w=>`<span class="palabra ${encontradas.has(w)?"encontrada":""}">${w}</span>`).join("");}
document.getElementById("reiniciar-sopa").addEventListener("click",iniciarSopa);document.getElementById("limpiar-sopa").addEventListener("click",()=>{limpiar();mensaje.textContent="Selección borrada. Probá otra palabra.";mensaje.className="feedback";});iniciarSopa();
