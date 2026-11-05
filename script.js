/* EmprendeFest 2026 | Sitio estático listo para GitHub Pages. */
'use strict';

// Elementos decorativos discretos. No sustituyen ni cubren los PNG originales.
(function initSnow() {
  const layer = document.getElementById('snowLayer');
  if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const fragment = document.createDocumentFragment();
  for (let n = 0; n < 25; n++) {
    const dot = document.createElement('span');
    dot.className = 'snow-dot';
    dot.style.setProperty('--x', `${((n * 31.7) % 97).toFixed(1)}%`);
    dot.style.setProperty('--size', `${2 + ((n * 7) % 5)}px`);
    dot.style.setProperty('--opacity', `${(.27 + ((n * 13) % 8) * .06).toFixed(2)}`);
    dot.style.setProperty('--duration', `${12 + ((n * 5) % 11)}s`);
    dot.style.setProperty('--delay', `${-n * .82}s`);
    fragment.appendChild(dot);
  }
  layer.appendChild(fragment);
})();

// Aparición sutil al entrar en pantalla; accesibilidad primero.
(function initReveals() {
  const nodes = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach(node => node.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -35px 0px', threshold: .08 });
  nodes.forEach(node => observer.observe(node));
})();

// Menú móvil accesible.
(function initMenu() {
  const toggle = document.getElementById('mobileMenuBtn');
  const links = document.getElementById('menu-principal');
  if (!toggle || !links) return;
  function setOpen(isOpen) {
    links.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    toggle.querySelector('i').className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
  }
  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  document.addEventListener('click', event => {
    if (links.classList.contains('open') && !event.target.closest('.nav-wrap')) setOpen(false);
  });
})();

// Cuenta regresiva fijada a la zona horaria de Guatemala (UTC-6; no DST).
(function initCountdown() {
  const targetTime = new Date(CONFIG.eventoUTC).getTime();
  const endOfEvent = new Date('2026-11-22T06:00:00Z').getTime();
  const heading = document.getElementById('countdownHeading');
  const fields = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  function update() {
    const now = Date.now();
    if (now >= targetTime) {
      heading.textContent = now < endOfEvent ? '¡Llegó la noche más mágica!' : '¡Gracias por ser parte de esta magia!';
      fields.forEach(field => { if (field) field.textContent = '00'; });
      return false;
    }
    let remaining = Math.floor((targetTime - now) / 1000);
    const values = [Math.floor(remaining / 86400)]; remaining %= 86400;
    values.push(Math.floor(remaining / 3600)); remaining %= 3600;
    values.push(Math.floor(remaining / 60), remaining % 60);
    fields.forEach((field, index) => { if (field) field.textContent = String(values[index]).padStart(2, '0'); });
    return true;
  }
  update();
  const interval = setInterval(() => { if (!update()) clearInterval(interval); }, 1000);
})();

// Galería del tren: 4 partes con su ancho/alto real, desplazamiento manual.
(function initTrain() {
  const viewport = document.getElementById('trainViewport');
  const prev = document.getElementById('trainPrev');
  const next = document.getElementById('trainNext');
  const progress = document.getElementById('trainProgress');
  if (!viewport || !prev || !next || !progress) return;
  function maxScroll() { return Math.max(0, viewport.scrollWidth - viewport.clientWidth); }
  function refresh() {
    const max = maxScroll();
    const percentage = max > 0 ? Math.round(viewport.scrollLeft / max * 100) : 100;
    progress.querySelector('span').style.width = `${percentage}%`;
    progress.setAttribute('aria-valuenow', String(percentage));
    prev.disabled = viewport.scrollLeft < 5;
    next.disabled = viewport.scrollLeft > max - 5;
  }
  function move(direction) {
    const item = viewport.querySelector('.train-item');
    if (!item) return;
    const gap = 12;
    viewport.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  viewport.addEventListener('scroll', refresh, { passive: true });
  window.addEventListener('resize', refresh);
  viewport.querySelectorAll('img').forEach(img => img.addEventListener('load', refresh));
  refresh();
})();

// Lista de logos completamente editable por el propietario.
(function initCollaborators() {
  const grid = document.getElementById('sponsorsGrid');
  if (!grid) return;
  const entries = (typeof COLABORADORES !== 'undefined' && Array.isArray(COLABORADORES)) ? COLABORADORES : [];
  if (!entries.length) {
    for (let index = 0; index < 4; index++) {
      const placeholder = document.createElement('div');
      placeholder.className = 'sponsor-placeholder';
      placeholder.innerHTML = '<i class="bi bi-stars" aria-hidden="true"></i><span>Tu marca puede estar aquí</span>';
      grid.appendChild(placeholder);
    }
    return;
  }
  for (const item of entries) {
    if (!item || !item.nombre || !item.logo) continue;
    const box = document.createElement(item.enlace && /^https:\/\//i.test(item.enlace) ? 'a' : 'div');
    box.className = 'sponsor-card';
    if (box.tagName.toLowerCase() === 'a') {
      box.href = item.enlace;
      box.target = '_blank';
      box.rel = 'noopener noreferrer';
      box.setAttribute('aria-label', `Visitar el sitio de ${item.nombre}`);
    }
    const logo = document.createElement('img');
    logo.src = item.logo;
    logo.alt = `Logo de ${item.nombre}`;
    logo.loading = 'lazy';
    const label = document.createElement('span');
    label.textContent = item.nombre;
    logo.addEventListener('error', () => {
      logo.remove();
      label.textContent = `${item.nombre} (logo no encontrado)`;
    });
    box.append(logo, label);
    grid.appendChild(box);
  }
})();

// Crédito de autor: muestra el PNG agregado por el propietario; si no existe, mantiene el texto.
(function initDesignerLogo() {
  const image = document.getElementById('creatiguateLogo');
  const fallback = document.getElementById('creatiguateText');
  if (!image || !fallback) return;
  image.addEventListener('load', () => { image.hidden = false; fallback.hidden = true; });
  image.addEventListener('error', () => { image.hidden = true; fallback.hidden = false; });
  if (image.complete && image.naturalWidth > 0) { image.hidden = false; fallback.hidden = true; }
})();

// Preinscripción por WhatsApp: sin base de datos y sin envío silencioso.
(function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  const fields = {
    business: document.getElementById('businessName'),
    contact: document.getElementById('contactName'),
    phone: document.getElementById('contactPhone'),
    type: document.getElementById('businessType'),
    notes: document.getElementById('message'),
    confirm: document.getElementById('confirmation')
  };
  function notify(title, message, icon = 'warning') {
    if (window.Swal) return Swal.fire({ title, text: message, icon, confirmButtonText: 'Entendido', confirmButtonColor: '#d94843', background: '#fffaf0' });
    alert(`${title}\n${message}`);
    return Promise.resolve();
  }
  function invalid(field, message) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    field.focus();
    notify('Revisemos un dato', message);
  }
  [fields.business, fields.contact, fields.phone, fields.type, fields.notes].forEach(field => {
    field.addEventListener('input', () => { field.classList.remove('is-invalid'); field.removeAttribute('aria-invalid'); });
    field.addEventListener('change', () => { field.classList.remove('is-invalid'); field.removeAttribute('aria-invalid'); });
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const business = fields.business.value.trim();
    const contact = fields.contact.value.trim();
    const rawPhone = fields.phone.value.trim();
    const phoneDigits = rawPhone.replace(/\D/g, '');
    const phone = phoneDigits.startsWith('502') && phoneDigits.length === 11 ? phoneDigits.slice(3) : phoneDigits;
    const type = fields.type.value;
    const notes = fields.notes.value.trim();
    if (business.length < 2) return invalid(fields.business, 'Escribí el nombre de tu emprendimiento.');
    if (contact.length < 3) return invalid(fields.contact, 'Necesitamos tu nombre para poder dirigirnos a vos.');
    if (!/^[0-9]{8}$/.test(phone)) return invalid(fields.phone, 'Ingresá un número de Guatemala de 8 dígitos, con o sin +502.');
    if (!type) return invalid(fields.type, 'Seleccioná la actividad principal de tu negocio.');
    if (!fields.confirm.checked) { fields.confirm.focus(); return notify('Confirmación necesaria', 'Marcá la casilla para confirmar que entendés cómo se coordina la participación.'); }
    const message = [
      '¡Hola! 🎄 Quiero participar en EmprendeFest 2026.',
      '',
      `🏷️ Emprendimiento: ${business}`,
      `👤 Contacto: ${contact}`,
      `📱 Teléfono: ${phone}`,
      `🛍️ Actividad: ${type}`,
      ...(notes ? [`💬 Consulta: ${notes}`] : []),
      '',
      'Conozco que la colaboración es de Q200 como mínimo en víveres y que debo presentar la factura de compra para acreditar la inscripción.',
      '¿Me pueden orientar con los siguientes pasos? ¡Gracias!'
    ].join('\n');
    const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    if (window.Swal) {
      const { isConfirmed } = await Swal.fire({
        title: '¡Tu marca puede brillar!',
        html: `<p class="mb-2">Ahora abriremos WhatsApp para enviar tu solicitud de participación.</p><small style="color:#647468">Recordá: la inscripción se acredita con la factura de los víveres.</small>`,
        icon: 'success',
        confirmButtonText: 'Abrir WhatsApp',
        cancelButtonText: 'Seguir editando',
        showCancelButton: true,
        confirmButtonColor: '#188949',
        cancelButtonColor: '#6c7d70',
        background: '#fffaf0',
        reverseButtons: true
      });
      if (!isConfirmed) return;
    } else if (!confirm('Se abrirá WhatsApp con tu solicitud. ¿Continuar?')) {
      return;
    }
    // Mismo tab: evita bloqueos de ventanas emergentes en móviles y navegadores.
    window.location.assign(whatsappUrl);
  });
})();

// Música: intentar reproducción automática, y desbloquearla cuando el navegador
// exige una interacción. En móviles Safari/Chrome el audio con sonido puede
// bloquearse hasta el primer clic/toque/tecla: esta política no se puede eludir.
(function initChristmasMusic() {
  const audio = document.getElementById('christmasMusic');
  const toggle = document.getElementById('musicToggle');
  const label = document.getElementById('musicButtonText');
  if (!audio || !toggle || !label) return;
  audio.volume = 0.32;
  let userPaused = false;
  function updateButton() {
    const playing = !audio.paused;
    toggle.classList.toggle('is-playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pausar música navideña' : 'Reproducir música navideña');
    label.textContent = playing ? 'Pausar música' : 'Activar música';
    const icon = toggle.querySelector('i');
    if (icon) icon.className = playing ? 'bi bi-volume-up-fill' : 'bi bi-music-note-beamed';
  }
  async function startPlayback() {
    if (userPaused || !audio.paused) return;
    try { await audio.play(); } catch { /* Bloqueo de autoplay: se reintenta al interactuar. */ }
    updateButton();
  }
  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  toggle.addEventListener('click', () => {
    if (!audio.paused) { userPaused = true; audio.pause(); }
    else { userPaused = false; startPlayback(); }
    updateButton();
  });
  ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'].forEach(eventName => {
    document.addEventListener(eventName, event => {
      if (event.target.closest && event.target.closest('#musicToggle')) return;
      if (!userPaused && audio.paused) startPlayback();
    }, { passive: true });
  });
  updateButton();
  // El navegador puede permitir autoplay cuando la página ya está en confianza.
  startPlayback();
  window.addEventListener('load', () => { if (!userPaused) startPlayback(); }, { once: true });
})();
