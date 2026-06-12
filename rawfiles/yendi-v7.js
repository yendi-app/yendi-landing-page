/* ============================================================
   Yendi v7 — controller
   · rAF-driven reveals + active panel (no IntersectionObserver —
     callbacks are unreliable in some embeds; rect checks are not)
   · loops the active step's in-screen micro-animations
   · keyboard stepping on desktop (snap handles the rest)
   · finale email capture
   ============================================================ */
(function () {
  document.documentElement.classList.add('js');

  var DESKTOP = window.matchMedia('(min-width:861px)');
  var hero = document.querySelector('.hero');
  var intro = document.querySelector('.how-intro');
  var allSteps = [].slice.call(document.querySelectorAll('.step'));
  var steps = allSteps.filter(function (s) { return !s.classList.contains('finale'); });
  var dots = [].slice.call(document.querySelectorAll('.vrail .rd'));

  /* ---- one-shot reveal (entrance), then mark settled ---- */
  function reveal(el) {
    if (!el || el._vis) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.82 && r.bottom > 0) {
      el._vis = true;
      el.classList.add('vis');
      setTimeout(function () { el.classList.add('settled'); }, 1000);
    }
  }

  /* ---- active step = the one holding the viewport midline ---- */
  var current = -1;
  function setActive(i) {
    if (i === current) return;
    current = i;
    steps.forEach(function (s, n) { s.classList.toggle('active', n === i); });
    dots.forEach(function (d, n) { d.classList.toggle('on', n === i); });
    document.body.classList.toggle('in-steps', i >= 0);
  }

  function frame() {
    reveal(intro);
    allSteps.forEach(reveal);
    var mid = window.innerHeight / 2, found = -1;
    for (var n = 0; n < steps.length; n++) {
      var r = steps[n].getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) { found = n; break; }
    }
    setActive(found);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---- loop the active step's micro-animations (settled guard
     in yendi-v7.css keeps copy/device from re-fading) ---- */
  setInterval(function () {
    if (document.hidden || current < 0) return;
    var s = steps[current];
    if (!s || !s.classList.contains('settled')) return;
    s.classList.remove('vis');
    void s.offsetWidth;               /* reflow → restart CSS animations */
    s.classList.add('vis');
  }, 6500);

  /* ---- desktop keyboard stepping ---- */
  var sections = [hero, intro].concat(allSteps).filter(Boolean);
  document.addEventListener('keydown', function (e) {
    if (!DESKTOP.matches) return;
    var tag = (document.activeElement || {}).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    var dir = 0;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') dir = 1;
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') dir = -1;
    else return;
    e.preventDefault();
    var mid = window.innerHeight / 2, idx = 0, bd = Infinity;
    sections.forEach(function (s, n) {
      var r = s.getBoundingClientRect();
      var d = Math.abs((r.top + r.height / 2) - mid);
      if (d < bd) { bd = d; idx = n; }
    });
    var t = sections[Math.max(0, Math.min(sections.length - 1, idx + dir))];
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
  });

  /* ---- finale email capture ---- */
  var form = document.getElementById('form2');
  if (form) {
    var email = document.getElementById('email2'), hint = document.getElementById('hint2');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var v = email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        hint.textContent = "Ingresa un correo válido."; hint.classList.remove('ok'); email.focus(); return;
      }
      hint.textContent = "¡Listo! Te avisamos pronto. ✦"; hint.classList.add('ok');
      email.value = ""; email.blur();
    });
  }
})();
