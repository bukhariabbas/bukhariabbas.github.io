'use strict';
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (menu && nav) {
  const closeMenu = () => { menu.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open); });
  document.addEventListener('keydown', event => { if(event.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();} });
  nav.addEventListener('click', event => { if(event.target.closest('a')) closeMenu(); });
  window.matchMedia('(min-width: 1101px)').addEventListener('change',closeMenu);
}
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-project]');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed',String(item===button)));
  let count = 0;
  projects.forEach(card => { const show = category==='all' || card.dataset.project.split(' ').includes(category); card.hidden=!show; if(show) count++; });
  const report = document.querySelector('#project-count');
  if(report) report.textContent=`${count} ${count===1?'case study':'case studies'} shown`;
}));
const search = document.querySelector('#publication-search');
if(search){
  const entries = [...document.querySelectorAll('[data-publication]')];
  const update = () => {
    const query=search.value.trim().toLocaleLowerCase();let count=0;
    entries.forEach(item=>{ const show=item.textContent.toLocaleLowerCase().includes(query);item.hidden=!show;if(show)count++; });
    document.querySelector('#publication-count').textContent=`${count} of ${entries.length} publications shown`;
    document.querySelector('#publication-empty').hidden=count!==0;
    document.querySelectorAll('[data-publication-group]').forEach(group=>{group.hidden=![...group.querySelectorAll('[data-publication]')].some(entry=>!entry.hidden);});
  };
  search.addEventListener('input',update);
  document.querySelector('#clear-search').addEventListener('click',()=>{search.value='';update();search.focus();});
}
const imageLinks=[...document.querySelectorAll('[data-figure]')];
if(imageLinks.length && typeof HTMLDialogElement!=='undefined'){
  const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.setAttribute('aria-label','Research figure');
  const bar=document.createElement('div');bar.className='lightbox-top';
  const full=document.createElement('a');full.textContent='Open full-size image';full.target='_blank';full.rel='noopener';
  const close=document.createElement('button');close.className='lightbox-close';close.textContent='Close ×';close.type='button';
  bar.append(full,close);const frame=document.createElement('div');frame.className='lightbox-figure';
  const img=document.createElement('img');frame.append(img);const caption=document.createElement('p');caption.className='lightbox-caption';
  dialog.append(bar,frame,caption);document.body.append(dialog);let opener=null;
  imageLinks.forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();opener=link;img.src=link.href;img.alt=link.querySelector('img')?.alt || 'Research figure';full.href=link.href;caption.textContent=link.dataset.caption || '';dialog.showModal();close.focus();
  }));
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>opener?.focus());
}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  const code=document.getElementById(button.dataset.copy);
  try{await navigator.clipboard.writeText(code.textContent);button.textContent='Copied';setTimeout(()=>button.textContent='Copy code',1800);}
  catch{button.textContent='Select code to copy';const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(code);selection.removeAllRanges();selection.addRange(range);}
}));
