/* main.js — FITUT */

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

// Scroll reveal (ré-applicable au contenu injecté dynamiquement).
// .reveal (ancien système, translateY) et .apparition (système à trois
// registres, opacité seule — §34) coexistent le temps de la migration ;
// chacun reçoit son propre nom d'état plutôt que d'unifier prématurément.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add(e.target.classList.contains('apparition') ? 'est-visible' : 'visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

function observeReveals(root = document) {
  root.querySelectorAll('.reveal:not(.visible), .apparition:not(.est-visible)').forEach(el => revealObserver.observe(el));
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
