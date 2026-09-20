
// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]:not(.popup-trigger)').forEach(a=>{
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

// RavenWare custom menu
const logoButton=document.getElementById('logoButton');
const ravenMenu=document.getElementById('ravenMenu');

logoButton.addEventListener('click',e=>{
  e.stopPropagation();
  ravenMenu.classList.toggle('open');
});

ravenMenu.addEventListener('click',e=>{
  e.stopPropagation();
});

// Popup elements
const popupOverlay=document.getElementById('popupOverlay');

function openPopup(id){
  const popup=document.getElementById(id);

  if(!popup){
    return;
  }

  ravenMenu.classList.remove('open');

  document.querySelectorAll('.popup-window.active').forEach(window=>{
    window.classList.remove('active');
  });

  popup.classList.add('active');
  popupOverlay.classList.add('open');
  popupOverlay.setAttribute('aria-hidden','false');
  document.body.classList.add('popup-open');
}

function closePopup(){
  popupOverlay.classList.remove('open');
  popupOverlay.setAttribute('aria-hidden','true');

  document.querySelectorAll('.popup-window.active').forEach(window=>{
    window.classList.remove('active');
  });

  document.body.classList.remove('popup-open');
}

// Open popup buttons
document.querySelectorAll('.popup-trigger').forEach(trigger=>{
  trigger.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();

    openPopup(trigger.dataset.popup);
  });
});

// Close when clicking the darkened area
popupOverlay.addEventListener('click',e=>{
  if(e.target===popupOverlay){
    closePopup();
  }
});

// Close buttons
popupOverlay.querySelectorAll('.popup-close').forEach(button=>{
  button.addEventListener('click',e=>{
    e.stopPropagation();
    closePopup();
  });
});

// Close menus and popups with Escape
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    ravenMenu.classList.remove('open');

    if(popupOverlay.classList.contains('open')){
      closePopup();
    }
  }
});

// Close RavenWare menu when clicking elsewhere
document.addEventListener('click',()=>{
  ravenMenu.classList.remove('open');
});

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
