// Client-side guards for order form: max 5 files, 1MB each; simple honeypot; basic validation.
(function(){ 
  const form = document.getElementById('orderForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    // honeypot
    const hp = form.querySelector('.hp input');
    if (hp && hp.value.trim() !== '') { e.preventDefault(); alert('Bot detection triggered.'); return; }

    // files
    const fileInputs = form.querySelectorAll('input[type=file]');
    let files = [];
    fileInputs.forEach(i => { if(i.files) files = files.concat(Array.from(i.files)); });
    if (files.length > 5) { e.preventDefault(); alert('Attach up to 5 files.'); return; }
    if (files.some(f => f.size > 1024*1024)) { e.preventDefault(); alert('Each file must be ≤ 1 MB.'); return; }

    // basic fields
    const email = form.querySelector('input[name=email]');
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { e.preventDefault(); alert('Enter a valid email.'); }
  });
})();
