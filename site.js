'use strict';
document.documentElement.classList.replace('no-js','js');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');};
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
window.matchMedia('(min-width:801px)').addEventListener('change',closeMenu);
const search=document.querySelector('#publication-search');
const topic=document.querySelector('#publication-topic');
if(search){const entries=[...document.querySelectorAll('[data-publication]')];const update=()=>{const query=search.value.trim().toLowerCase();let n=0;for(const entry of entries){entry.hidden=!(entry.textContent.toLowerCase().includes(query)&&(topic.value==='all'||entry.dataset.topic===topic.value));if(!entry.hidden)n++;}document.querySelector('#publication-count').textContent=`${n} of ${entries.length} publications`;document.querySelector('#publication-empty').hidden=n!==0;};search.addEventListener('input',update);topic.addEventListener('change',update);update();}
const figureLinks=[...document.querySelectorAll('[data-figure]')];
if(figureLinks.length&&typeof HTMLDialogElement!=='undefined'){
 const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.setAttribute('aria-label','Expanded research figure');
 const bar=document.createElement('div');bar.className='lightbox-top';
 const full=document.createElement('a');full.textContent='Open full-size figure';full.target='_blank';full.rel='noopener';
 const close=document.createElement('button');close.type='button';close.className='lightbox-close';close.textContent='Close ×';
 const frame=document.createElement('div');frame.className='lightbox-figure';const img=document.createElement('img');frame.append(img);
 const caption=document.createElement('p');caption.className='lightbox-caption';bar.append(full,close);dialog.append(bar,frame,caption);document.body.append(dialog);
 let opener=null;for(const link of figureLinks)link.addEventListener('click',event=>{event.preventDefault();opener=link;const selected=link.querySelector('img');img.src=selected?.currentSrc||link.href;img.alt=selected?.alt||'Research figure';caption.textContent=link.dataset.caption||link.closest('figure')?.querySelector('figcaption')?.textContent||'';full.href=img.src;dialog.showModal();close.focus();});
 close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});dialog.addEventListener('close',()=>opener?.focus());
}
