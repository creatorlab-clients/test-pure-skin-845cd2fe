/* ═══════════════════════════════════════════════════════════════
   template-estetica-002 — Pure Skin — script.js
   wellness-zen scroll · single-page · pt-BR
   ═══════════════════════════════════════════════════════════════ */

// ── Scroll animation — frame config ──────────────────────────
var FRAME_PATH   = 'https://8ispuxmgjxgu2r5q.public.blob.vercel-storage.com/templates/estetica-002/frames/';
var FRAME_PREFIX = 'frame_';
var FRAME_PAD    = 4;
var FRAME_EXT    = '.webp';
var FRAME_COUNT  = 151;  // wellness-zen — HARD

// ── Image fallback ────────────────────────────────────────────
window.__imgFallback = function (img, label) {
  var w = img.naturalWidth || 800;
  var h = img.naturalHeight || 600;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">'
    + '<rect width="100%" height="100%" fill="#E8E4DC"/>'
    + '<text x="50%" y="50%" font-family="\'Cormorant Garamond\',Georgia,serif" font-size="18" font-style="italic" fill="#8E8A82" text-anchor="middle" dominant-baseline="middle">'
    + (label || 'imagem em breve')
    + '</text></svg>';
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  img.onerror = null;
};

// ── Phosphor Light icons — injected via data-icon ─────────────
var PHOSPHOR_ICONS = {
  'Flask': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><path d="M173.54,210.63A16,16,0,0,1,160,216H96a16,16,0,0,1-13.85-24L112,128V72H144v56Z"/><line x1="88" y1="216" x2="168" y2="216"/><line x1="96" y1="72" x2="160" y2="72"/><line x1="100" y1="152" x2="156" y2="152"/></svg>',
  'Leaf': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><path d="M213.37,42.63a8,8,0,0,0-7.94-.44C164.49,62.17,60.37,104.14,40,176a56.07,56.07,0,0,0,55.43,70C136,243.47,210,191,213.93,50.57A8,8,0,0,0,213.37,42.63Z"/><line x1="40" y1="216" x2="116" y2="140"/></svg>',
  'ClipboardText': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><path d="M160,40H200a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96"/><path d="M88,64H168"/><path d="M96,40a32,32,0,0,1,64,0Z"/><line x1="96" y1="128" x2="160" y2="128"/><line x1="96" y1="160" x2="160" y2="160"/><line x1="96" y1="104" x2="136" y2="104"/></svg>',
  'UsersThree': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><circle cx="128" cy="96" r="48"/><path d="M22,202a112,112,0,0,1,212,0"/><circle cx="212" cy="96" r="32"/><path d="M212,128a64.06,64.06,0,0,1,42,74"/><circle cx="44" cy="96" r="32"/><path d="M2,202a64.06,64.06,0,0,1,42-74"/></svg>',
  'Sparkle': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><path d="M208,144H144l48,48-48-48V80l48,48L144,80V16l-16,64L64,96l64,16-16,64,48-48L112,176l48,48V160l48,48Z"/><path d="M128,32,108,96,32,128,108,160,128,224,148,160,224,128,148,96Z"/></svg>',
  'MagnifyingGlass': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><circle cx="112" cy="112" r="80"/><line x1="168.57" y1="168.57" x2="224" y2="224"/></svg>',
  'Diamond': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><path d="M16,100l112,128L240,100,200,40H56Z"/><line x1="16" y1="100" x2="240" y2="100"/><line x1="56" y1="40" x2="128" y2="100"/><line x1="200" y1="40" x2="128" y2="100"/></svg>'
};

(function () {
  'use strict';

  // ── Inject Phosphor icons ──────────────────────────────────
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    var name = el.getAttribute('data-icon');
    var svg  = PHOSPHOR_ICONS[name];
    if (svg) el.innerHTML = svg;
  });

  // ── Footer year ────────────────────────────────────────────
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Navbar scroll class ────────────────────────────────────
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile nav toggle ──────────────────────────────────────
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-mobile-open', !expanded);
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-mobile-open');
      });
    });
  }

  // ── Hero Text Reveal ───────────────────────────────────────
  // Immediate trigger (hero is above fold)
  setTimeout(function () {
    document.querySelectorAll('.clip-line').forEach(function (el) {
      el.classList.add('visible');
    });
  }, 250);

  // ── IntersectionObserver — Fade Up & Stagger Cards ─────────
  if ('IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    document.querySelectorAll('.fade-up, .stagger-card').forEach(function (el) {
      animObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.fade-up, .stagger-card').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Parallax — ambiente flagship ──────────────────────────
  function updateParallax() {
    document.querySelectorAll('[data-parallax]').forEach(function (el) {
      var offset = parseFloat(el.getAttribute('data-parallax')) || 200;
      var wrap   = el.parentElement;
      if (!wrap) return;
      var rect   = wrap.getBoundingClientRect();
      var vh     = window.innerHeight;
      // progress 0 = element top at viewport bottom; 1 = element bottom at viewport top
      var progress = (vh - rect.top) / (vh + rect.height);
      var clamp    = Math.max(0, Math.min(1, progress));
      var ty       = (clamp - 0.5) * offset * 2;
      el.style.transform = 'translateY(' + ty.toFixed(1) + 'px)';
    });
  }
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // ── Scroll animation — canvas ─────────────────────────────
  var section = document.getElementById('scroll-anim');
  var canvas  = document.getElementById('scroll-canvas');
  if (!section || !canvas) return;

  var ctx    = canvas.getContext('2d');
  var images = [];
  var loaded = 0;
  var currentFrame = 0;
  var pinEl  = section.querySelector('.scroll-anim-pin');
  var DPR    = Math.min(window.devicePixelRatio || 1, 2);

  function setupCanvas() {
    var w = pinEl.clientWidth;
    var h = pinEl.clientHeight;
    canvas.width  = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function renderFrame(img) {
    var cw = pinEl.clientWidth;
    var ch = pinEl.clientHeight;
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    if (!iw || !ih) return;
    var scale = Math.max(cw / iw, ch / ih);
    var sw = iw * scale;
    var sh = ih * scale;
    var sx = (cw - sw) / 2;
    var sy = (ch - sh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  function drawFrame(index) {
    var img = images[index];
    if (img && img.complete && img.naturalWidth) {
      renderFrame(img);
      currentFrame = index;
    }
  }

  function onScroll() {
    var rect    = section.getBoundingClientRect();
    var total   = section.offsetHeight - window.innerHeight;
    var scrolled = Math.max(0, -rect.top);
    var progress = Math.min(1, scrolled / total);
    var frameIdx = Math.round(progress * (FRAME_COUNT - 1));
    if (frameIdx !== currentFrame) drawFrame(frameIdx);
  }

  // Preload all frames
  for (var i = 0; i < FRAME_COUNT; i++) {
    (function (idx) {
      var img = new Image();
      img.onload = function () {
        loaded++;
        if (idx === 0 || loaded === 1) {
          setupCanvas();
          renderFrame(img);
          currentFrame = 0;
        }
      };
      img.src = FRAME_PATH + FRAME_PREFIX + String(idx + 1).padStart(FRAME_PAD, '0') + FRAME_EXT;
      images[idx] = img;
    })(i);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { setupCanvas(); drawFrame(currentFrame); }, { passive: true });
  setupCanvas();

})();
