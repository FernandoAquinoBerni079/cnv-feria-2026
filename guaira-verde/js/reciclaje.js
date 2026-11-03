"use strict";
const residuos=[
{item:"🍌 Cáscara de banana",tipo:"organico",exp:"Los restos de fruta pueden usarse en compostaje cuando se realiza adecuadamente."},
{item:"🥬 Hojas de verduras",tipo:"organico",exp:"Los restos vegetales son materia orgánica y pueden destinarse a compost."},
{item:"📰 Diario limpio y seco",tipo:"reciclable",exp:"El papel limpio y seco puede recuperarse según la recolección local."},
{item:"🥫 Lata de aluminio limpia",tipo:"reciclable",exp:"El aluminio limpio es un material reciclable."},
{item:"🧻 Papel higiénico usado",tipo:"rechazo",exp:"Por razones sanitarias no corresponde mezclar papel higiénico usado con reciclables limpios."},
{item:"🍬 Envoltorio muy sucio",tipo:"rechazo",exp:"Si está contaminado y no puede limpiarse, no se mezcla con los materiales reciclables de este ejercicio."}];
let indice=0,correctas=0,resuelto=false;
const bins=[...document.querySelectorAll(".bins button")],obj=document.getElementById("reciclaje-objeto"),msg=document.getElementById("reciclaje-mensaje"),avance=document.getElementById("reciclaje-avance"),puntos=document.getElementById("reciclaje-puntos"),next=document.getElementById("reciclaje-siguiente");
function mostrarResiduo(){resuelto=false;bins.forEach(b=>b.disabled=false);msg.textContent="";msg.className="feedback";next.hidden=true;obj.textContent=residuos[indice].item;avance.textContent=`Residuo ${indice+1} de ${residuos.length}`;puntos.textContent=`Correctas: ${correctas}/${residuos.length}`;}
function responder(tipo){if(resuelto)return;resuelto=true;bins.forEach(b=>b.disabled=true);const q=residuos[indice],ok=tipo===q.tipo;if(ok)correctas++;puntos.textContent=`Correctas: ${correctas}/${residuos.length}`;msg.className=`feedback ${ok?"good":"bad"}`;msg.textContent=(ok?"¡Correcto! ":`No es correcto. La categoría es ${q.tipo==="rechazo"?"no reciclable":q.tipo}. `)+q.exp;
if(indice===residuos.length-1){avance.textContent="¡Clasificación completada!";obj.textContent=`Resultado final: ${correctas} de ${residuos.length}. 🌱`;}else{next.hidden=false;}}
bins.forEach(b=>b.addEventListener("click",()=>responder(b.dataset.tipo)));next.addEventListener("click",()=>{if(!resuelto||indice>=residuos.length-1)return;indice++;mostrarResiduo();});document.getElementById("reciclaje-reiniciar").addEventListener("click",()=>{indice=0;correctas=0;mostrarResiduo();});mostrarResiduo();
