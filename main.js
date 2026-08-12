/* main.js — FITUT */

/* ---- COMPTE À REBOURS vers la prochaine édition ---- */
(function initCountdown() {
  const bloc = document.getElementById('countdown');
  if (!bloc) return;

  const cible = new Date(bloc.dataset.target).getTime();
  if (isNaN(cible)) return;

  const champs = {
    jours: bloc.querySelector('[data-unit="jours"]'),
    heures: bloc.querySelector('[data-unit="heures"]'),
    minutes: bloc.querySelector('[data-unit="minutes"]'),
    secondes: bloc.querySelector('[data-unit="secondes"]')
  };

  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const reste = cible - Date.now();
    if (reste <= 0) {
      bloc.classList.add('is-live');
      Object.values(champs).forEach(el => { if (el) el.textContent = '00'; });
      const note = document.querySelector('.countdown-note');
      if (note) note.textContent = 'Le festival est en cours \u2014 rendez-vous \u00e0 Tanger !';
      clearInterval(intervalle);
      return;
    }
    const j = Math.floor(reste / 86400000);
    const h = Math.floor((reste % 86400000) / 3600000);
    const m = Math.floor((reste % 3600000) / 60000);
    const sec = Math.floor((reste % 60000) / 1000);
    if (champs.jours) champs.jours.textContent = j;
    if (champs.heures) champs.heures.textContent = pad(h);
    if (champs.minutes) champs.minutes.textContent = pad(m);
    if (champs.secondes) champs.secondes.textContent = pad(sec);
  }

  tick();
  const intervalle = setInterval(tick, 1000);
})();

/* ---- BANDEAU PRESSE : duplication du contenu pour un défilement continu ---- */
(function initPressMarquee() {
  const piste = document.getElementById('pressTrack');
  if (!piste) return;
  piste.innerHTML += piste.innerHTML;
  piste.setAttribute('aria-hidden', 'false');
})();

// Burger menu (breakpoint aligné sur style.css @media max-width: 1100px)
const NAV_MOBILE_MQ = window.matchMedia('(max-width: 1100px)');

const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks) {
  const setBurgerExpanded = (open) => {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  setBurgerExpanded(false);

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    setBurgerExpanded(open);
  });

  const closeMobileNav = () => {
    navLinks.classList.remove('open');
    setBurgerExpanded(false);
  };

  NAV_MOBILE_MQ.addEventListener('change', e => {
    if (!e.matches) closeMobileNav();
  });
}

// Scroll reveal (ré-applicable au contenu injecté dynamiquement)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

function observeReveals(root = document) {
  root.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}
observeReveals();

// Count-up for stats
const countObserverInit = () => {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffixe = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString('fr-FR') + (current >= target ? suffixe : '');
          if (current >= target) clearInterval(timer);
        }, 24);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-number[data-target]').forEach(el => countObserver.observe(el));
};
countObserverInit();

// Le contenu des pages « Nos Éditions » est injecté après le chargement :
// on relance alors les animations sur les nouveaux éléments.
document.addEventListener('fitut:content-ready', () => {
  observeReveals();
  countObserverInit();
});
