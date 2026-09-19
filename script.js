// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    const el=document.querySelector(id);

    if(el){
      e.preventDefault();
      el.scrollIntoView({
        behavior:'smooth',
        block:'start'
      });
    }
  });
});

// Header visibility
const header=document.querySelector('.glass-header');

window.addEventListener('scroll',()=>{
  if(window.scrollY<=40){
    header.classList.remove('header-hidden');
  }else{
    header.classList.add('header-hidden');
  }
},{passive:true});

// Section minimize
document.querySelectorAll('.content-section').forEach(sec=>{
  const btn=sec.querySelector('.minimize-btn');
  const sectionBody=sec.querySelector('.section-body');

  sectionBody.style.maxHeight=sectionBody.scrollHeight+'px';
  sectionBody.style.opacity='1';

  btn.addEventListener('click',()=>{
    if(sectionBody.style.maxHeight &&
       parseInt(sectionBody.style.maxHeight)>0){

      sectionBody.style.maxHeight='0px';
      sectionBody.style.opacity='0';
      btn.textContent='+';

    }else{
      sectionBody.style.maxHeight=sectionBody.scrollHeight+'px';
      sectionBody.style.opacity='1';
      btn.textContent='-';
    }
  });
});

// Ripple click animation
document.querySelectorAll('.ripple').forEach(el=>{
  el.addEventListener('click',function(e){
    const rect=this.getBoundingClientRect();
    const d=Math.max(rect.width,rect.height);
    const x=e.clientX-rect.left-d/2;
    const y=e.clientY-rect.top-d/2;

    this.style.setProperty('--ripple-x',x+'px');
    this.style.setProperty('--ripple-y',y+'px');
    this.style.setProperty('--ripple-d',d+'px');

    this.classList.remove('active');
    void this.offsetWidth;
    this.classList.add('active');
  });
});

// Position ripple using CSS variables
const style=document.createElement('style');

style.textContent=
  '.ripple::after{left:var(--ripple-x);top:var(--ripple-y);width:var(--ripple-d);height:var(--ripple-d);}';

document.head.appendChild(style);

/* ===== Settings / Save ===== */

const settingsBtn=document.getElementById('settings-btn');
const settingsPanel=document.getElementById('settings-panel');
const settingsClose=document.getElementById('settings-close');

settingsBtn.addEventListener('click',()=>{
  settingsPanel.classList.toggle('active');

  settingsPanel.setAttribute(
    'aria-hidden',
    !settingsPanel.classList.contains('active')
  );
});

settingsClose.addEventListener('click',()=>{
  settingsPanel.classList.remove('active');
  settingsPanel.setAttribute('aria-hidden','true');
});

// Save current site
document.getElementById('save-site').addEventListener('click',()=>{
  const html='<!doctype html>\n'+document.documentElement.outerHTML;
  const css=fetchCSS();
  const js=fetchJS();

  saveFile('index.html',html);
  saveFile('style.css',css);
  saveFile('script.js',js);
});

function saveFile(name,content){
  const blob=new Blob([content],{type:'text/plain'});
  const link=document.createElement('a');

  link.href=URL.createObjectURL(blob);
  link.download=name;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(()=>{
    URL.revokeObjectURL(link.href);
  },1000);
}

function fetchCSS(){
  const styleEl=Array.from(
    document.querySelectorAll('style')
  ).map(s=>s.textContent).join('\n');

  return '/* style.css exported from client. */\n'+styleEl;
}

function fetchJS(){
  return '// script.js exported from client. Use the original source for full fidelity.';
}
