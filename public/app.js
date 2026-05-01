document.addEventListener('DOMContentLoaded', ()=>{
  const out = document.getElementById('demoOut');
  const btn = document.getElementById('healthBtn');
  if(btn){
    btn.addEventListener('click', async ()=>{
      out.textContent = 'Checking...';
      try{
        const res = await fetch('/api/health');
        const j = await res.json();
        out.textContent = JSON.stringify(j, null, 2);
      }catch(e){out.textContent = 'Error: '+e.message}
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
});
