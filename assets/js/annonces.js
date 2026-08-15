/* annonces.js — FITUT
   Lit data/annonces.json et rend le hero de l'accueil en fil d'annonces
   (fitut-design §16). Le nombre de vues vient uniquement des données :
   0 annonce active -> hero vide (rien affiché), 1 -> vue fixe sans
   navigation, 2+ -> diaporama fondu-croisé avec navigation par filets.
   prefers-reduced-motion : les annonces s'empilent, sans diaporama. */

const ANNONCES_URL = 'data/annonces.json';

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const estUrlExterne = (href) => /^https?:\/\//i.test(href || '');

function rendreVisuel(a, index) {
  return a.visuel
    ? `<img src="${esc(a.visuel)}" alt="${esc(a.alt || '')}" loading="${index === 0 ? 'eager' : 'lazy'}">`
    : `<div class="hero-visuel-cadre" role="img" aria-label="${esc(a.alt || 'Visuel à venir')}">[visuel à confirmer]</div>`;
}

function attributsLien(a) {
  return estUrlExterne(a.lien) ? ' target="_blank" rel="noopener"' : '';
}

/* ---------- prefers-reduced-motion : empilement statique, sans diaporama ---------- */
function rendreEmpile(mount, annonces) {
  mount.innerHTML = `
    <div class="hero-grille hero-grille--empilee">
      <div class="marge-regie"></div>
      <div class="hero-contenu">
        ${annonces.map((a, i) => `
          <article class="hero-vue-empilee">
            <div class="hero-visuel">${rendreVisuel(a, i)}</div>
            <p class="surtitre">${esc(a.surtitre || '')}</p>
            ${i === 0
              ? `<h1 class="hero-titre">${esc(a.titre)}</h1>`
              : `<h2 class="hero-titre">${esc(a.titre)}</h2>`}
            <p class="hero-description">${esc(a.description || '')}</p>
            <a class="bouton bouton--principal" href="${esc(a.lien)}"${attributsLien(a)}>${esc(a.libelleLien || 'En savoir plus')}</a>
          </article>`).join('')}
      </div>
    </div>
  `;
}

/* ---------- Rendu interactif (diaporama) ---------- */
function construireSquelette(mount, total) {
  mount.innerHTML = `
    <div class="hero-grille">
      <div class="marge-regie">
        ${total > 1 ? '<p class="hero-date surtitre" id="heroDate"></p>' : ''}
      </div>
      <div class="hero-visuel" id="heroVisuel"></div>
      <div class="hero-contenu">
        <div class="hero-texte" id="heroTexte" aria-live="polite">
          <p class="surtitre" id="heroSurtitre"></p>
          <h1 class="hero-titre" id="heroTitre"></h1>
          <p class="hero-description" id="heroDescription"></p>
          <a class="bouton bouton--principal" id="heroLien" href="#"></a>
        </div>
        ${total > 1 ? '<div class="hero-nav" id="heroNav" aria-label="Annonces"></div>' : ''}
      </div>
    </div>
    <button type="button" class="fleche-nav fleche-nav--gauche" id="heroFlecheGauche" aria-label="Annonce précédente">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
    <button type="button" class="fleche-nav fleche-nav--droite" id="heroFlecheDroite" aria-label="Annonce suivante">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
    </button>
  `;
}

function rendreCoucheVisuel(a, index, actif) {
  return `<div class="hero-visuel-couche${actif ? ' is-active' : ''}" aria-hidden="${actif ? 'false' : 'true'}">${rendreVisuel(a, index)}</div>`;
}

/* ---------- Amorçage ---------- */
(async function initAnnonces() {
  const mount = document.getElementById('heroFil');
  if (!mount) return;

  let annonces;
  try {
    const res = await fetch(ANNONCES_URL);
    if (!res.ok) throw new Error('Chargement des annonces impossible');
    const data = await res.json();
    annonces = (data.annonces || []).filter(a => a.actif);
  } catch (err) {
    console.error(err);
    return; // le hero reste vide plutôt que d'afficher un message d'erreur intrusif
  }

  if (annonces.length === 0) return; // aucune annonce réelle : pas de hero forcé

  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduit) { rendreEmpile(mount, annonces); return; }

  const total = annonces.length;
  construireSquelette(mount, total);

  // Flèches desktop (§16) : désactivées d'emblée si une seule annonce,
  // même si le diaporama (filets, minuteur…) ne se met pas en place du
  // tout dans ce cas — le bouton reste dans le DOM, juste inerte.
  const flecheGauche = document.getElementById('heroFlecheGauche');
  const flecheDroite = document.getElementById('heroFlecheDroite');
  if (total <= 1) {
    [flecheGauche, flecheDroite].forEach(f => {
      f.disabled = true;
      f.setAttribute('aria-disabled', 'true');
    });
  }

  const visuelPile = document.getElementById('heroVisuel');
  visuelPile.innerHTML = annonces.map((a, i) => rendreCoucheVisuel(a, i, i === 0)).join('');
  const couchesVisuel = Array.from(visuelPile.querySelectorAll('.hero-visuel-couche'));

  const elTexte = document.getElementById('heroTexte');
  const elSurtitre = document.getElementById('heroSurtitre');
  const elTitre = document.getElementById('heroTitre');
  const elDescription = document.getElementById('heroDescription');
  const elLien = document.getElementById('heroLien');

  function appliquerContenu(a) {
    elSurtitre.textContent = a.surtitre || '';
    elTitre.textContent = a.titre;
    elDescription.textContent = a.description || '';
    elLien.href = a.lien;
    elLien.textContent = a.libelleLien || 'En savoir plus';
    if (estUrlExterne(a.lien)) {
      elLien.setAttribute('target', '_blank');
      elLien.setAttribute('rel', 'noopener');
    } else {
      elLien.removeAttribute('target');
      elLien.removeAttribute('rel');
    }
  }

  appliquerContenu(annonces[0]);

  // Vue unique : contenu statique, pas de diaporama, pas de navigation.
  if (total === 1) return;

  const DUREE = 7000;
  let index = 0;
  let timer = null;
  let depart = 0;
  let restant = DUREE;
  let enPause = false;

  const dateEl = document.getElementById('heroDate');
  const nav = document.getElementById('heroNav');

  const filets = annonces.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hero-filet';
    b.setAttribute('aria-label', `Aller à l'annonce ${i + 1} sur ${total}`);
    const remplissage = document.createElement('span');
    remplissage.className = 'hero-filet-remplissage';
    b.appendChild(remplissage);
    b.addEventListener('click', () => aller(i));
    nav.appendChild(b);
    return { bouton: b, remplissage };
  });

  function maj(i) {
    dateEl.textContent = annonces[i].date || '';
    filets.forEach((f, fi) => {
      const actif = fi === i;
      f.bouton.classList.toggle('is-active', actif);
      f.bouton.setAttribute('aria-current', actif ? 'true' : 'false');
    });
    couchesVisuel.forEach((c, ci) => {
      const actif = ci === i;
      c.classList.toggle('is-active', actif);
      c.setAttribute('aria-hidden', actif ? 'false' : 'true');
    });
  }

  function positionnerRemplissage(i, largeur, dureeMs) {
    const { remplissage } = filets[i];
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

  function aller(n) {
    clearTimeout(timer);
    index = (n + total) % total;
    maj(index);

    filets.forEach((_, i) => { if (i !== index) positionnerRemplissage(i, '0%', 0); });
    restant = DUREE;

    // Le texte suit le visuel avec 200ms de retard, fondu + légère montée.
    elTexte.classList.add('est-sortant');
    setTimeout(() => {
      appliquerContenu(annonces[index]);
      elTexte.classList.remove('est-sortant');
    }, 200);
    positionnerRemplissage(index, '0%', DUREE);
    relancer();
  }

  function relancer() {
    clearTimeout(timer);
    if (enPause) return;
    depart = Date.now();
    timer = setTimeout(() => aller(index + 1), restant);
  }

  function pauser() {
    if (enPause) return;
    enPause = true;
    clearTimeout(timer);
    restant = Math.max(DUREE - (Date.now() - depart), 200);
    const largeurActuelle = getComputedStyle(filets[index].remplissage).width;
    positionnerRemplissage(index, largeurActuelle, 0);
  }

  function reprendre() {
    if (!enPause) return;
    enPause = false;
    const largeurActuelle = getComputedStyle(filets[index].remplissage).width;
    positionnerRemplissage(index, largeurActuelle, restant);
    relancer();
  }

  // Flèches (§16) : suspendent le défilement automatique et le relancent
  // après 10s, indépendamment de la pause au survol/focus — reprendre()
  // est sans effet si un survol tient déjà la pause, et inversement un
  // départ de survol pendant les 10s ne relance pas deux fois (reprendre
  // vérifie enPause avant d'agir).
  let timerFleche = null;
  function naviguerParFleche(n) {
    aller(n);
    clearTimeout(timerFleche);
    pauser();
    timerFleche = setTimeout(reprendre, 10000);
  }
  flecheGauche.addEventListener('click', () => naviguerParFleche(index - 1));
  flecheDroite.addEventListener('click', () => naviguerParFleche(index + 1));

  const hero = document.getElementById('hero');
  const peutSurvoler = window.matchMedia('(hover: hover)').matches;
  if (peutSurvoler) {
    hero.addEventListener('mouseenter', pauser);
    hero.addEventListener('mouseleave', reprendre);
  }
  hero.addEventListener('focusin', pauser);
  hero.addEventListener('focusout', (e) => {
    if (!hero.contains(e.relatedTarget)) reprendre();
  });

  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); aller(index + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); aller(index - 1); }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTimeout(timer);
    else if (!enPause) relancer();
  });

  maj(0);
  positionnerRemplissage(0, '0%', DUREE);
  relancer();
})();
