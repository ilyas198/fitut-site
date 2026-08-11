/* main.js — FITUT */

/* ---- HERO : panneau de texte fixe + bande de visuels en défilement vertical ----
   Le nombre de visuels est lu depuis le DOM : ajouter ou retirer une
   .hero-visual-slide dans le HTML suffit, aucune valeur codée en dur ici. */
(function initHero() {
  const hero = document.getElementById('hero');
  const visual = document.getElementById('heroVisual');
  const progress = document.getElementById('heroProgress');
  const btnPrev = document.getElementById('heroPrev');
  const btnNext = document.getElementById('heroNext');
  if (!hero || !visual) return;

  const slides = Array.from(visual.querySelectorAll('.hero-visual-slide'));
  if (slides.length === 0) return;

  const DUREE = 6000;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const peutSurvoler = window.matchMedia('(hover: hover)').matches;
  let index = 0;
  let timer = null;
  let depart = 0;
  let restant = DUREE;
  let enPause = false;

  // Génère une puce de progression (minuteur) par visuel
  const puces = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hero-dot';
    b.setAttribute('aria-label', `Aller au visuel ${i + 1} sur ${slides.length}`);
    const remplissage = document.createElement('span');
    remplissage.className = 'hero-dot-fill';
    b.appendChild(remplissage);
    b.addEventListener('click', () => aller(i));
    progress && progress.appendChild(b);
    return { bouton: b, remplissage };
  });

  // Anime (ou fixe) la largeur du minuteur d'une puce.
  function positionnerRemplissage(i, largeur, dureeMs) {
    const { remplissage } = puces[i];
    remplissage.classList.remove('is-filling');
    remplissage.style.transitionDuration = '0s';
    remplissage.style.width = largeur;
    if (!dureeMs) return;
    void remplissage.offsetWidth; // force le recalcul avant de relancer la transition
    requestAnimationFrame(() => {
      remplissage.style.transitionDuration = dureeMs + 'ms';
      remplissage.classList.add('is-filling');
      remplissage.style.width = '100%';
    });
  }

  // Place chaque visuel au-dessus, à sa place ou en dessous de la fenêtre visible :
  // un défilement vertical par translation franche, jamais un fondu.
  function positionnerVisuels() {
    slides.forEach((s, i) => {
      const actif = i === index;
      s.style.transform = `translateY(${(i - index) * 100}%)`;
      s.classList.toggle('is-active', actif);
      s.setAttribute('aria-hidden', actif ? 'false' : 'true');
      s.toggleAttribute('inert', !actif);
    });
  }

  function aller(n) {
    clearTimeout(timer);
    index = (n + slides.length) % slides.length;
    positionnerVisuels();

    puces.forEach((p, i) => {
      const actif = i === index;
      p.bouton.classList.toggle('is-active', actif);
      p.bouton.setAttribute('aria-current', actif ? 'true' : 'false');
      if (!actif) positionnerRemplissage(i, '0%', 0);
    });

    restant = DUREE;
    if (reduit) positionnerRemplissage(index, '100%', 0);
    else positionnerRemplissage(index, '0%', DUREE);
    relancer();
  }

  function relancer() {
    clearTimeout(timer);
    if (reduit || slides.length < 2 || enPause) return;
    depart = Date.now();
    timer = setTimeout(() => aller(index + 1), restant);
  }

  // Pause au survol (desktop) et au focus clavier : le temps de lire ou de cliquer un lien.
  function pauser() {
    if (reduit || enPause || slides.length < 2) return;
    enPause = true;
    clearTimeout(timer);
    restant = Math.max(DUREE - (Date.now() - depart), 200);
    const largeurActuelle = getComputedStyle(puces[index].remplissage).width;
    positionnerRemplissage(index, largeurActuelle, 0);
  }

  function reprendre() {
    if (reduit || !enPause) return;
    enPause = false;
    const largeurActuelle = getComputedStyle(puces[index].remplissage).width;
    positionnerRemplissage(index, largeurActuelle, restant);
    relancer();
  }

  if (btnPrev) btnPrev.addEventListener('click', () => aller(index - 1));
  if (btnNext) btnNext.addEventListener('click', () => aller(index + 1));

  if (peutSurvoler) {
    hero.addEventListener('mouseenter', pauser);
    hero.addEventListener('mouseleave', reprendre);
  }
  hero.addEventListener('focusin', pauser);
  hero.addEventListener('focusout', (e) => {
    if (!hero.contains(e.relatedTarget)) reprendre();
  });

  // Balayage tactile vertical, cohérent avec le sens du défilement
  let yDepart = null;
  visual.addEventListener('touchstart', (e) => { yDepart = e.touches[0].clientY; }, { passive: true });
  visual.addEventListener('touchend', (e) => {
    if (yDepart === null) return;
    const delta = e.changedTouches[0].clientY - yDepart;
    if (Math.abs(delta) > 40) aller(index + (delta < 0 ? 1 : -1));
    yDepart = null;
  }, { passive: true });

  // Met en pause quand l'onglet n'est pas visible (économie de batterie mobile)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTimeout(timer);
    else if (!enPause) relancer();
  });

  aller(0);
})();

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

// Navbar scroll shadow
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

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

  document.querySelectorAll('.dropdown > a').forEach(a => {
    a.addEventListener('click', e => {
      if (NAV_MOBILE_MQ.matches) {
        e.preventDefault();
        a.parentElement.classList.toggle('open');
      }
    });
  });

  const closeMobileNav = () => {
    navLinks.classList.remove('open');
    setBurgerExpanded(false);
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  };

  NAV_MOBILE_MQ.addEventListener('change', e => {
    if (!e.matches) closeMobileNav();
  });
}

// Barre sociale fixe : reste centrée entre la navbar (--nav-h) et le haut du footer
const SOCIAL_SIDEBAR_HIDE_MQ = window.matchMedia('(max-width: 900px)');
(function initSocialSidebarClamp() {
  const sidebar = document.querySelector('.social-sidebar');
  const footer = document.querySelector('.site-footer');
  if (!sidebar || !footer) return;

  let raf = 0;
  const margin = 14;

  function update() {
    if (SOCIAL_SIDEBAR_HIDE_MQ.matches) {
      sidebar.style.removeProperty('top');
      sidebar.style.removeProperty('transform');
      return;
    }

    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 60;
    const vh = window.innerHeight;
    const footerTop = footer.getBoundingClientRect().top;
    const half = sidebar.offsetHeight / 2;

    const ideal = vh * 0.5;
    const maxCenter = footerTop - margin - half;
    const minCenter = navH + margin + half;

    let center = Math.min(ideal, maxCenter);
    center = Math.max(center, minCenter);
    if (minCenter > maxCenter) {
      center = (minCenter + maxCenter) / 2;
    }

    sidebar.style.top = `${center}px`;
    sidebar.style.transform = 'translateY(-50%)';
  }

  function requestUpdate() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      update();
    });
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  SOCIAL_SIDEBAR_HIDE_MQ.addEventListener('change', requestUpdate);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(requestUpdate).observe(footer);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(requestUpdate).catch(() => requestUpdate());
  } else {
    requestUpdate();
  }
})();

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
