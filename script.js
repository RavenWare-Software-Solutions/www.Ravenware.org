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
