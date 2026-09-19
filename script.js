// Theme Toggle
const body=document.body;const themeBtn=document.getElementById('theme-toggle');
themeBtn.addEventListener('click',()=>{
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
  themeBtn.textContent=body.classList.contains('dark-theme')?'??':'??';
});

// Smooth scroll for nav
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href'); const el=document.querySelector(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'});}
  });
});

// Section minimize with springy feel
document.querySelectorAll('.content-section').forEach(sec=>{
  const btn=sec.querySelector('.minimize-btn'); const body=sec.querySelector('.section-body');
  body.style.maxHeight=body.scrollHeight+'px'; body.style.opacity=1;
  btn.addEventListener('click',()=>{
    if(body.style.maxHeight && parseInt(body.style.maxHeight)>0){
      body.style.maxHeight='0px'; body.style.opacity=0; btn.textContent='+';
    } else {
      body.style.maxHeight=body.scrollHeight+'px'; body.style.opacity=1; btn.textContent='-';
    }
  });
});

// Reveal on scroll
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target);} });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Ripple click animation (links, buttons)
document.querySelectorAll('.ripple').forEach(el=>{
  el.addEventListener('click',function(e){
    const rect=this.getBoundingClientRect();
    const d=Math.max(rect.width, rect.height);
    const x=e.clientX-rect.left-d/2; const y=e.clientY-rect.top-d/2;
    this.style.setProperty('--ripple-x', x+'px');
    this.style.setProperty('--ripple-y', y+'px');
    this.style.setProperty('--ripple-d', d+'px');
    const after=this; after.classList.remove('active'); void this.offsetWidth; after.classList.add('active');
  });
});

// Position ripple via CSS variables
const style=document.createElement('style');
style.textContent='.ripple::after{left:var(--ripple-x);top:var(--ripple-y);width:var(--ripple-d);height:var(--ripple-d);}';
document.head.appendChild(style);

/* ===== Settings Panel / Theme Variants / Save ===== */
const settingsBtn=document.getElementById('settings-btn');
const settingsPanel=document.getElementById('settings-panel');
const settingsClose=document.getElementById('settings-close');
let currentTheme=null;
settingsBtn.addEventListener('click',()=>{ settingsPanel.classList.toggle('active'); settingsPanel.setAttribute('aria-hidden', !settingsPanel.classList.contains('active')); });
settingsClose.addEventListener('click',()=>{ settingsPanel.classList.remove('active'); settingsPanel.setAttribute('aria-hidden','true'); });

document.querySelectorAll('.theme-choice').forEach(btn=>{
  btn.addEventListener('click',()=>{ currentTheme=btn.dataset.theme; document.querySelectorAll('.theme-choice').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); applyTheme(currentTheme, false); });
});

document.getElementById('randomize-theme').addEventListener('click',()=>{
  if(!currentTheme){ alert('Please select a theme first'); return; }
  applyTheme(currentTheme, true);
});

// Save current (downloads HTML/CSS/JS)
document.getElementById('save-site').addEventListener('click',()=>{
  // Download outerHTML of index (basic save). For full fidelity, you might want server-side bundling.
  const html = '<!doctype html>\n' + document.documentElement.outerHTML;
  const css = fetchCSS();
  const js = fetchJS();
  saveFile('index.html', html);
  saveFile('style.css', css);
  saveFile('script.js', js);
});

function saveFile(name, content){
  const blob = new Blob([content], {type: 'text/plain'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function fetchCSS(){
  // If style.css was loaded as external file
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  // If site uses external CSS file, attempt to fetch text via inline style tag fallback
  const styleEl = Array.from(document.querySelectorAll('style')).map(s => s.textContent).join('\n');
  // We cannot fetch external files via JS without CORS; return inline + fallback note
  return '/* style.css exported from client. Some external resources may not be included. */\n' + styleEl;
}

function fetchJS(){
  // Combine inline script code (if any) and provide placeholder for external script
  return '// script.js exported from client (may differ). \n// Please use the original generator for full fidelity.';
}

// Theme application logic with multiple variants per theme
function applyTheme(name, randomize){
  const rootStyle = document.documentElement.style;
  if(name === 'winter'){
    const variants = [ ['#f0f8ff','#e6f2ff','#5b7cfa','rgba(91,124,250,0.35)'], ['#eef8ff','#eaf6ff','#60a5fa','rgba(96,165,250,0.28)'] ];
    const v = variants[randomize ? Math.floor(Math.random()*variants.length) : 0];
    document.body.style.background = `linear-gradient(135deg, ${v[0]}, ${v[1]})`;
    rootStyle.setProperty('--accent', v[2]); rootStyle.setProperty('--glow', v[3]);
  } else if(name === 'spring'){
    const variants = [ ['#e8f5e9','#ffffff','#47e6a1','rgba(71,230,161,0.35)'], ['#f0fff4','#eafff0','#34d399','rgba(52,211,153,0.28)'] ];
    const v = variants[randomize ? Math.floor(Math.random()*variants.length) : 0];
    document.body.style.background = `linear-gradient(135deg, ${v[0]}, ${v[1]})`;
    rootStyle.setProperty('--accent', v[2]); rootStyle.setProperty('--glow', v[3]);
  } else if(name === 'cyber'){
    const variants = [ ['#030304','#0b0b10','#00e6ff','rgba(0,230,255,0.22)'], ['#050510','#081227','#9bff00','rgba(155,255,0,0.18)'] ];
    const v = variants[randomize ? Math.floor(Math.random()*variants.length) : 0];
    document.body.style.background = `linear-gradient(135deg, ${v[0]}, ${v[1]})`;
    rootStyle.setProperty('--accent', v[2]); rootStyle.setProperty('--glow', v[3]);
  } else if(name === 'pastel'){
    const variants = [ ['#fff1f2','#fef3c7','#ff6fb5','rgba(255,111,181,0.25)'], ['#f3f0ff','#fff7ed','#b47aea','rgba(180,122,234,0.22)'] ];
    const v = variants[randomize ? Math.floor(Math.random()*variants.length) : 0];
    document.body.style.background = `linear-gradient(135deg, ${v[0]}, ${v[1]})`;
    rootStyle.setProperty('--accent', v[2]); rootStyle.setProperty('--glow', v[3]);
  }
}
