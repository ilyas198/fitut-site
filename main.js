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
// .reveal (ancien système, translateY) et .apparition + le groupe
// ci-dessous (système à trois registres, opacité seule — §34) coexistent
// le temps de la migration ; chacun reçoit son propre nom d'état plutôt
// que d'unifier prématurément. .reveal est le seul cas qui reçoit
// « visible » — tout le reste (marqué .apparition ou membre du groupe)
// reçoit « est-visible », d'où le test sur .reveal plutôt que sur
// .apparition : un élément du groupe n'a pas la classe .apparition mais
// doit tout de même recevoir « est-visible ».
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add(e.target.classList.contains('reveal') ? 'visible' : 'est-visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// Éléments répétés d'une grille ou d'une liste (§34, point 1) : ciblés par
// sélecteur plutôt que par une classe posée à la main sur chaque élément —
// certaines galeries comptent une douzaine d'images sans classe commune,
// un marquage un par un serait fragile et facile à oublier sur un ajout
// futur. Le décalage de 60 ms plafonné à 4 paliers est en CSS
// (transition-delay, nth-of-type), rien à calculer ici.
const SELECTEUR_APPARITION_GROUPE = [
  '.galerie-grille > img',
  '.valeurs-grille > .valeur',
  '.lieux-grille > .fiche-adresse',
  '.ateliers-grille > .atelier',
  '.generique-liste > .generique',
  '.index-liens > li',
  '.liste-presse > li',
  '.liste-documents > li',
  '.distribution > .distribution-ligne',
  '.edition-selection .entree-programme',
  '.edition-hommages .hommage'
].join(', ');

function observeReveals(root = document) {
  root.querySelectorAll('.reveal:not(.visible), .apparition:not(.est-visible)').forEach(el => revealObserver.observe(el));
  root.querySelectorAll(SELECTEUR_APPARITION_GROUPE).forEach(el => {
    if (!el.classList.contains('est-visible')) revealObserver.observe(el);
  });
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
