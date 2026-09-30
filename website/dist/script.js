const menu=document.querySelector('.menu');
const navigation=document.getElementById('navigation');
if(menu&&navigation){
 const close=()=>{navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');};
 menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
 navigation.addEventListener('click',event=>{if(event.target.closest('a'))close();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){close();menu.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('header'))close();});
}
