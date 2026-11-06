"use strict";
// Memoria Dulce: 6 parejas, 12 cartas, movimientos y cronómetro.
const symbols=["🍰","🧁","🍪","🍫","🍓","🍮"];
const board=document.getElementById("memory-board");
const movesText=document.getElementById("memory-moves");
const matchesText=document.getElementById("memory-matches");
const timeText=document.getElementById("memory-time");
const statusText=document.getElementById("memory-status");
let cards=[],first=null,second=null,locked=false,moves=0,matches=0,seconds=0,timerId=null,flipTimeout=null;
function shuffle(items){
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
function fmtTime(t){return `${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;}
function updateStats(){movesText.textContent=String(moves);matchesText.textContent=`${matches} / 6`;timeText.textContent=fmtTime(seconds);}
function startTimer(){if(timerId!==null)return;timerId=window.setInterval(()=>{seconds++;updateStats();},1000);}
function stopTimer(){if(timerId!==null){window.clearInterval(timerId);timerId=null;}}
function flip(card){card.classList.add("revealed");card.textContent=card.dataset.symbol;card.setAttribute("aria-label",`Carta ${Number(card.dataset.index)+1}: ${card.dataset.symbol}`);}
function conceal(card){card.classList.remove("revealed");card.textContent="?";card.setAttribute("aria-label",`Carta ${Number(card.dataset.index)+1}: oculta`);}
function handle(card){
  if(locked||card===first||card.classList.contains("matched"))return;
  startTimer();flip(card);
  if(first===null){first=card;statusText.textContent="Elegí otra carta para buscar la pareja.";return;}
  second=card;moves++;updateStats();
  if(first.dataset.symbol===second.dataset.symbol){
    first.classList.add("matched");second.classList.add("matched");
    first.disabled=true;second.disabled=true;
    matches++;updateStats();
    statusText.textContent=`¡Pareja encontrada! ${matches} de 6.`;
    first=null;second=null;
    if(matches===6){stopTimer();statusText.textContent="¡Felicitaciones! Encontraste todas las parejas.";document.getElementById("memory-result").hidden=false;document.getElementById("memory-final").textContent=`Completaste el tablero en ${moves} movimientos y ${fmtTime(seconds)}.`;}
    return;
  }
  locked=true;statusText.textContent="No coinciden. Mirá bien las cartas...";
  flipTimeout=window.setTimeout(()=>{conceal(first);conceal(second);first=null;second=null;locked=false;flipTimeout=null;statusText.textContent="Probá con otra pareja.";},900);
}
function resetGame(){
  stopTimer();if(flipTimeout!==null){window.clearTimeout(flipTimeout);flipTimeout=null;}
  first=null;second=null;locked=false;moves=0;matches=0;seconds=0;
  updateStats();statusText.textContent="Elegí la primera carta para comenzar.";
  document.getElementById("memory-result").hidden=true;
  board.replaceChildren();
  cards=shuffle([...symbols,...symbols]);
  cards.forEach((symbol,index)=>{
    const btn=document.createElement("button");
    btn.type="button";btn.className="memory-card";btn.dataset.symbol=symbol;btn.dataset.index=String(index);btn.textContent="?";
    btn.setAttribute("aria-label",`Carta ${index+1}: oculta`);
    btn.addEventListener("click",()=>handle(btn));
    board.append(btn);
  });
}
document.getElementById("memory-restart").addEventListener("click",resetGame);
document.getElementById("memory-play-again").addEventListener("click",resetGame);
window.addEventListener("pagehide",stopTimer);
resetGame();
