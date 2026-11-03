"use strict";
(()=>{
const buttons=[...document.querySelectorAll('.filter-btn')];
const cards=[...document.querySelectorAll('.gallery-card')];
buttons.forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 buttons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 cards.forEach(c=>{c.hidden=filter!=='todos'&&c.dataset.categoria!==filter;});
}));
const dialog=document.querySelector('#visor-imagen');const image=document.querySelector('#visor-foto');
if(!dialog||!image)return;
document.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{
 image.referrerPolicy='no-referrer';image.src=button.dataset.src;image.alt=button.dataset.alt||'';
 document.querySelector('#visor-titulo').textContent=button.dataset.caption||'Fotografía';
 document.querySelector('#visor-caption').textContent=button.dataset.alt||'';
 if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
}));
document.querySelector('#visor-cerrar').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
})();
