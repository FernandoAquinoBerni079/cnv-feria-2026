(()=>{'use strict';const challenge=[
 ['Día 1','Separar los residuos en casa o en la escuela','Identificá al menos dos categorías y mantené limpios los recuperables.'],
 ['Día 2','Evitar un producto descartable','Elegí una alternativa reutilizable cuando sea segura y esté disponible.'],
 ['Día 3','Cuidar el agua','Cerrá la canilla cuando no haga falta y avisá si hay fugas.'],
 ['Día 4','Apagar luces y equipos innecesarios','Usá la luz natural cuando sea posible.'],
 ['Día 5','Dar una segunda vida a un material','Reutilizá una caja o recipiente limpio y seguro.'],
 ['Día 6','Cuidar una planta o un árbol','Observá sus necesidades y evitá dañarlo.'],
 ['Día 7','Compartir un consejo verde','Contale a alguien un hábito ambiental que aprendiste.']
 ];const key='gv_v09_desafio_7';let done=[];try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))done=saved.filter(x=>Number.isInteger(x)&&x>=0&&x<7);}catch(e){}
 const list=document.getElementById('challenge-items');if(!list)return;
 const progress=document.getElementById('challenge-progress'),count=document.getElementById('challenge-count'),message=document.getElementById('challenge-message');
 function save(){try{localStorage.setItem(key,JSON.stringify(done))}catch(e){}}
 function render(){list.innerHTML='';challenge.forEach(([day,title,desc],i)=>{const label=document.createElement('label');label.className='challenge-item'+(done.includes(i)?' completado':'');const cb=document.createElement('input');cb.type='checkbox';cb.checked=done.includes(i);cb.setAttribute('aria-label',day+' '+title);cb.addEventListener('change',()=>{done=cb.checked?[...new Set([...done,i])]:done.filter(x=>x!==i);save();render()});const content=document.createElement('span');const b=document.createElement('strong');b.textContent=day+' · '+title;const small=document.createElement('small');small.textContent=desc;content.append(b,small);label.append(cb,content);list.append(label)});count.textContent=done.length+' de 7';progress.value=done.length;message.textContent=done.length===7?'¡Completaste los siete desafíos! Ahora intentá sostener estos hábitos.':done.length===0?'Empezá con el primer desafío. ¡Cada hábito suma!':'¡Buen avance! Ya realizaste '+done.length+' de los 7 desafíos.';}
 document.getElementById('challenge-reset').addEventListener('click',()=>{done=[];save();render()});render();
})();