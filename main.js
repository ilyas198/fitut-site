/* main.js — FITUT */

// Burger menu (breakpoint aligné sur style.css @media min-width: 1024px —
// corrigé : le seuil est passé de 1100 à 1024px au commit « Navigation »,
// cette constante était restée à l'ancienne valeur)
const NAV_MOBILE_MQ = window.matchMedia('(max-width: 1023px)');

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
// .reveal (ancien système, translateY) a disparu avec le-carnaval.html,
// la dernière page qui en dépendait (LOT 6c) — .apparition et le groupe
// ci-dessous sont désormais le seul mécanisme, tous deux marqués
// « est-visible ».
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('est-visible');
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
  '.edition-hommages .hommage',
  '.parcours-liste > .route-etape'
].join(', ');

function observeReveals(root = document) {
  root.querySelectorAll('.apparition:not(.est-visible)').forEach(el => revealObserver.observe(el));
  root.querySelectorAll(SELECTEUR_APPARITION_GROUPE).forEach(el => {
    if (!el.classList.contains('est-visible')) revealObserver.observe(el);
  });
}
observeReveals();

/* ---------- Compteurs animés (§23) ----------
   La valeur finale est déjà le texte de l'élément (« 5 000+ », « 20+ »,
   « 130 »…) — pas seulement une donnée en data-target : sans JavaScript,
   ou si l'animation est court-circuitée, le chiffre exact reste dans le
   HTML, lisible et indexable. Le nombre initial (les chiffres et
   espaces en tête) fixe la cible ; le reste (« + », « M+ », « k+ »…)
   est le suffixe, qui n'apparaît qu'à l'arrivée. */
function analyserCompteur(texte) {
  const m = texte.match(/^(\d[\d\s]*)(.*)$/s);
  if (!m) return null;
  const valeur = parseInt(m[1].replace(/\s/g, ''), 10);
  if (Number.isNaN(valeur)) return null;
  return { valeur, texteFinal: texte };
}

/* Solveur de cubic-bezier (méthode de Newton, la même technique que les
   moteurs de rendu utilisent en interne) plutôt qu'une courbe approchée
   à la main : les 4 points sont ceux de --courbe-sortie dans style.css,
   à tenir synchronisés si le token change. */
function cubicBezier(x1, y1, x2, y2) {
  const a = (u, v) => 1 - 3 * v + 3 * u;
  const b = (u, v) => 3 * v - 6 * u;
  const c = (u) => 3 * u;
  const bezierX = (t) => ((a(x1, x2) * t + b(x1, x2)) * t + c(x1)) * t;
  const bezierY = (t) => ((a(y1, y2) * t + b(y1, y2)) * t + c(y1)) * t;
  const derivativeX = (t) => 3 * a(x1, x2) * t * t + 2 * b(x1, x2) * t + c(x1);
  function solveT(x) {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const dx = bezierX(t) - x;
      if (Math.abs(dx) < 1e-6) return t;
      const d = derivativeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    return t;
  }
  return (x) => bezierY(solveT(x));
}
const COURBE_SORTIE = cubicBezier(0.22, 1, 0.36, 1);
const DUREE_COMPTEUR = 900;

const compteursDemarres = new WeakSet();

function animerCompteur(el) {
  if (compteursDemarres.has(el)) return; // une seule fois par session, jamais rejoué
  compteursDemarres.add(el);

  const info = analyserCompteur(el.textContent.trim());
  if (!info) return; // texte non numérique : laissé tel quel

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = info.texteFinal; // déjà la valeur affichée, aucun décompte
    return;
  }

  const { valeur, texteFinal } = info;
  el.textContent = '0';
  const depart = performance.now();

  function image(t) {
    const avance = Math.min((t - depart) / DUREE_COMPTEUR, 1);
    const actuel = Math.round(COURBE_SORTIE(avance) * valeur);
    if (avance < 1) {
      el.textContent = String(actuel);
      requestAnimationFrame(image);
    } else {
      el.textContent = texteFinal; // le suffixe n'apparaît qu'ici, à l'arrivée
    }
  }
  requestAnimationFrame(image);
}

const compteurObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animerCompteur(entry.target);
      compteurObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

function observeCompteurs(root = document) {
  root.querySelectorAll('.compteur').forEach(el => {
    if (!compteursDemarres.has(el)) compteurObserver.observe(el);
  });
}
observeCompteurs();

// Le contenu des pages « Nos Éditions » est injecté après le chargement :
// on relance alors les animations sur les nouveaux éléments.
document.addEventListener('fitut:content-ready', () => {
  observeReveals();
  observeCompteurs();
});
