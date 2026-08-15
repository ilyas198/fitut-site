/* editions.js — FITUT
   Lit data/editions.json et génère :
   - la grille de toutes les éditions (nos-editions.html)
   - la fiche détaillée d'une édition (edition.html?n=18)
   Les blocs vides sont automatiquement masqués. */

const DATA_URL = 'data/editions.json';
const SITE_URL = 'https://www.fitut.ma';

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ordinal = (n) => n === 1 ? '1<sup>re</sup>' : n + '<sup>e</sup>';
const ordinalTxt = (n) => n === 1 ? '1re' : n + 'e';

const has = (v) => Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim());

/* ---------- Arabe imbriqué dans du texte mixte (§5, LOT 5) ----------
   editions.json contient des titres et des palmarès où le français et
   l'arabe se mélangent dans le même champ (« Bonnes — الخادمات »,
   « مسرحية Zucco » — Institut..., etc.) — jamais un champ dédié par
   langue. Un dir="rtl" posé sur tout le champ inverserait aussi la
   partie latine ; il faut isoler les passages réellement arabes.
   Deux formes couvrent tout le jeu de données réel (vérifié) :
   1) un titre entre guillemets français contenant de l'arabe (palmarès) —
      tout le segment « … » devient un seul bloc RTL, l'algorithme bidi
      Unicode replace correctement un mot latin isolé à l'intérieur
      (« مسرحية Zucco » reste lisible tel quel) ;
   2) un séparateur « Latin — Arabe » ou l'inverse (sélection) — seul le
      côté qui contient de l'arabe passe en RTL.
   Le reste (chaîne entièrement arabe, sans guillemet ni tiret) est
   couvert en dernier recours. */
const AR_CHARS = /[؀-ۿݐ-ݿ]/;

function marquerArabe(texte) {
  let s = esc(texte);
  s = s.replace(/«[^»]*»/g, (seg) => AR_CHARS.test(seg) ? `<span lang="ar" dir="rtl">${seg}</span>` : seg);
  s = s.replace(/([^—<>]*)—([^—<>]*)/g, (m, a, b) => {
    const aAr = AR_CHARS.test(a), bAr = AR_CHARS.test(b);
    if (aAr === bAr) return m; // les deux ou aucun des deux côtés : rien à isoler ici
    return aAr
      ? `<span lang="ar" dir="rtl">${a.trim()}</span> —${b}`
      : `${a}— <span lang="ar" dir="rtl">${b.trim()}</span>`;
  });
  if (!/<span/.test(s) && AR_CHARS.test(s)) {
    s = `<span lang="ar" dir="rtl">${s}</span>`;
  }
  return s;
}

/* ---------- Injection SEO ---------- */
function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectJsonLd(obj) {
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(obj);
  document.head.appendChild(s);
}

/* ---------- Chargement ---------- */
async function loadEditions() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error('Chargement des éditions impossible');
  const data = await res.json();
  return data.editions || [];
}

/* ---------- Vue : bande horizontale d'affiches (nos-editions.html, §24) ----------
   Plus de 6 entrées : bande horizontale plutôt qu'une frise verticale,
   qui enterrait les éditions anciennes sous le défilement. « La bande
   commence sur l'édition la plus récente » : tri explicite par numéro
   décroissant, sans dépendre de l'ordre du JSON. Aucun panneau ni
   modale : chaque entrée est un lien entier vers sa fiche complète
   (edition.html), déjà indexable — la dupliquer ici la rendrait
   invisible aux moteurs. */
function renderBande(editions, mount) {
  const triees = [...editions].sort((a, b) => b.numero - a.numero);

  const entrees = triees.map(e => {
    const aVenir = e.statut === 'a_venir';
    /* Remplacement typographique tant qu'aucune affiche réelle n'existe
       (vérifié sur les 19 éditions) — aria-hidden : la légende sous
       l'affiche répète déjà année et numéro, un second rôle "img"
       ferait entendre deux fois la même information. */
    const visuel = has(e.affiche)
      ? `<img src="${esc(e.affiche)}" alt="" loading="lazy" width="600" height="850">`
      : `<div class="affiche-entree-cadre-vide" aria-hidden="true">
           <span class="affiche-entree-cadre-annee">${e.annee}</span>
           <span class="affiche-entree-cadre-numero">Éd. ${e.numero}</span>
         </div>`;

    return `
      <li class="affiche-entree">
        <a class="affiche-entree-lien" href="edition.html?n=${e.numero}">
          <div class="affiche-entree-cadre">${visuel}</div>
          <p class="affiche-entree-legende">
            ${aVenir ? '<span class="surtitre affiche-entree-prochaine">Prochaine édition</span>' : ''}
            <span class="affiche-entree-ordinal">${ordinal(e.numero)} édition</span>
            <span class="affiche-entree-annee">${e.annee}</span>
          </p>
        </a>
      </li>`;
  }).join('');

  /* <ul>/<li> plutôt que des <div> : un lecteur d'écran annonce
     « liste de 19 éléments », l'information réelle ici (nombre
     d'éditions), pas seulement une suite de liens sans relation.
     Flèches (§24 commit « flèches + mise en avant centrale ») : même
     composant que le hero (.fleche-nav, §16) — desktop uniquement,
     ancrées sur .bande-conteneur pour rester au centre vertical des
     vignettes seules, pas de la bande + son filet de progression. */
  mount.innerHTML = `
    <div class="bande-conteneur">
      <ul class="bande-defilement" id="bandeDefilement" role="list" aria-label="Chronologie des éditions, défilement horizontal">${entrees}</ul>
      <button type="button" class="fleche-nav fleche-nav--gauche" id="bandeFlecheGauche" aria-label="Édition précédente">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button type="button" class="fleche-nav fleche-nav--droite" id="bandeFlecheDroite" aria-label="Édition suivante">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
      </button>
    </div>
    <div class="bande-progression"><span class="bande-progression-remplissage" id="bandeProgression"></span></div>`;

  initBandeProgression();
  initBandeFleches();
  initBandeEmphase();

  injectJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Éditions du Festival International du Théâtre Universitaire de Tanger',
    numberOfItems: triees.length,
    itemListElement: triees.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${ordinalTxt(e.numero)} édition du FITUT — ${e.annee}`,
      url: `${SITE_URL}/edition.html?n=${e.numero}`
    }))
  });
}

/* ---------- Filet de progression sous la bande ----------
   Lit la position de défilement (scrollLeft/scrollWidth), ne la pilote
   jamais : la bande reste un overflow-x natif, y compris au clavier
   (le focus sur un lien fait défiler le conteneur — comportement natif
   du navigateur, rien à coder). requestAnimationFrame évite d'empiler
   des mises à jour pendant un défilement rapide. */
function initBandeProgression() {
  const bande = document.getElementById('bandeDefilement');
  const remplissage = document.getElementById('bandeProgression');
  if (!bande || !remplissage) return;

  let planifie = false;
  function majProgression() {
    planifie = false;
    const { scrollLeft, scrollWidth, clientWidth } = bande;
    if (scrollWidth <= clientWidth) {
      remplissage.style.setProperty('--rp-largeur', '100%');
      remplissage.style.setProperty('--rp-gauche', '0%');
      return;
    }
    const largeur = clientWidth / scrollWidth;
    const espaceDefilable = scrollWidth - clientWidth;
    const gauche = (scrollLeft / espaceDefilable) * (1 - largeur);
    remplissage.style.setProperty('--rp-largeur', (largeur * 100) + '%');
    remplissage.style.setProperty('--rp-gauche', (gauche * 100) + '%');
  }

  bande.addEventListener('scroll', () => {
    if (planifie) return;
    planifie = true;
    requestAnimationFrame(majProgression);
  }, { passive: true });

  window.addEventListener('resize', majProgression);
  majProgression();
}

/* ---------- Vue : fiche d'une édition ---------- */
function renderDetail(e, mount) {
  const titre = `${ordinalTxt(e.numero)} édition du FITUT — ${e.annee}`;
  document.title = `${titre} | Festival International du Théâtre Universitaire de Tanger`;

  const desc = has(e.resume)
    ? e.resume.slice(0, 155)
    : `Palmarès, sélection officielle et temps forts de la ${titre}, à Tanger.`;
  setMeta('description', desc);
  setMeta('og:title', titre, 'property');
  setMeta('og:description', desc, 'property');
  setMeta('og:type', 'article', 'property');
  setMeta('og:url', `${SITE_URL}/edition.html?n=${e.numero}`, 'property');
  if (has(e.affiche)) setMeta('og:image', `${SITE_URL}/${e.affiche}`, 'property');
  setCanonical(`${SITE_URL}/edition.html?n=${e.numero}`);

  const sections = [];
  const aVenir = e.statut === 'a_venir';

  /* ---- En-tête : affiche, dates, thème (§24, registre encre) ---- */
  const visuelEntete = has(e.affiche)
    ? `<img class="edition-affiche" src="${esc(e.affiche)}" alt="Affiche officielle de la ${ordinalTxt(e.numero)} édition du FITUT" width="600" height="850">`
    : `<div class="edition-affiche-cadre" role="img" aria-label="Affiche de la ${ordinalTxt(e.numero)} édition à confirmer">[affiche à confirmer]</div>`;

  sections.push(`
    <section class="edition-entete registre-encre">
      <div class="grille-regie">
        <div class="marge-regie"><p class="surtitre">${esc(e.dates)}${e.ville ? ' · ' + esc(e.ville) : ''}</p></div>
        <div class="contenu-regie apparition">
          <a class="edition-retour" href="nos-editions.html">← Toutes les éditions</a>
          <h1 class="edition-titre">${ordinal(e.numero)} édition${aVenir ? ' <span class="edition-badge-texte">— à venir</span>' : ''}</h1>
          ${has(e.theme) ? `<p class="edition-theme">${marquerArabe(e.theme)}</p>` : ''}
          ${visuelEntete}
          ${has(e.resume) ? `<p class="edition-resume">${marquerArabe(e.resume)}</p>` : ''}
        </div>
      </div>
    </section>`);

  /* ---- Chiffres (§23 : compteurs animés — registre rideau) ---- */
  if (has(e.chiffres)) {
    const releve = e.chiffres.map(c => `<span class="compteur">${esc(c.valeur)}</span> ${esc(c.label)}`).join(' · ');
    sections.push(`
      <section class="edition-chiffres registre-rideau">
        <div class="grille-regie">
          <div class="marge-regie"><p class="surtitre">En chiffres</p></div>
          <div class="contenu-regie apparition">
            <p class="releve-chiffres">${releve}</p>
          </div>
        </div>
      </section>`);
  }

  /* ---- Sélection officielle (§15, §20 : .entree-programme, registre encre) ----
     Champs réellement présents dans editions.json : piece, troupe,
     universite, pays, synopsis. langue/durée/lieu/horaire, prévus par le
     composant, sont absents de la donnée — masqués, jamais inventés
     (CLAUDE.md §7). */
  if (has(e.selection)) {
    sections.push(`
      <section class="edition-selection registre-encre">
        <div class="grille-regie">
          <div class="marge-regie"><p class="surtitre">${e.selection.length} spectacle${e.selection.length > 1 ? 's' : ''}</p></div>
          <div class="contenu-regie apparition">
            <h2 class="titre-section">Sélection officielle</h2>
            ${e.selection.map(s => {
              const meta = [s.troupe, s.universite, s.pays].filter(has).map(marquerArabe);
              return `
              <article class="entree-programme">
                <h3 class="entree-programme-titre">${marquerArabe(s.piece)}</h3>
                ${meta.length ? `<p class="entree-programme-meta">${meta.map(m => `<span>${m}</span>`).join('')}</p>` : ''}
                ${has(s.synopsis) ? `<p class="entree-programme-synopsis">${marquerArabe(s.synopsis)}</p>` : ''}
              </article>`;
            }).join('')}
          </div>
        </div>
      </section>`);
  }

  /* ---- Palmarès (§15, §26 : .distribution, registre papier) ---- */
  if (has(e.palmares)) {
    sections.push(`
      <section class="edition-palmares registre-papier">
        <div class="grille-regie">
          <div class="marge-regie"><p class="surtitre">${e.palmares.length} prix</p></div>
          <div class="contenu-regie apparition">
            <h2 class="titre-section">Palmarès</h2>
            <dl class="distribution">
              ${e.palmares.map(p => {
                const grandPrix = /grand prix/i.test(p.prix || '');
                return `
                <div class="distribution-ligne${grandPrix ? ' distribution-ligne--grand-prix' : ''}">
                  <dt>${esc(p.prix)}</dt>
                  <dd>${marquerArabe(p.laureat)}</dd>
                </div>`;
              }).join('')}
            </dl>
          </div>
        </div>
      </section>`);
  }

  /* ---- Hommages (§6 : registre rideau — pas un des 8 composants, voir style.css) ---- */
  if (has(e.hommages)) {
    sections.push(`
      <section class="edition-hommages registre-rideau">
        <div class="grille-regie">
          <div class="marge-regie"><p class="surtitre">${e.hommages.length} hommage${e.hommages.length > 1 ? 's' : ''}</p></div>
          <div class="contenu-regie apparition">
            <h2 class="titre-section">Hommages</h2>
            ${e.hommages.map(h => `
              <article class="hommage">
                ${has(h.portrait)
                  ? `<img class="hommage-portrait" src="${esc(h.portrait)}" alt="Portrait de ${esc(h.nom)}" loading="lazy" width="400" height="400">`
                  : `<div class="hommage-portrait-cadre" role="img" aria-label="Portrait de ${esc(h.nom)} à confirmer">[portrait à confirmer]</div>`}
                <div>
                  <h3 class="hommage-nom">${esc(h.nom)}</h3>
                  ${has(h.bio) ? `<p class="hommage-bio">${marquerArabe(h.bio)}</p>` : ''}
                </div>
              </article>`).join('')}
          </div>
        </div>
      </section>`);
  }

  /* ---- Table ronde (registre papier — pas un des 8 composants, voir style.css) ---- */
  const tr = e.tableRonde;
  if (tr && has(tr.titre)) {
    sections.push(`
      <section class="edition-tableronde registre-papier">
        <div class="grille-regie">
          <div class="marge-regie"><p class="surtitre">Table ronde</p></div>
          <div class="contenu-regie apparition">
            <h3 class="table-ronde-titre" lang="ar" dir="rtl">${esc(tr.titre)}</h3>
            ${has(tr.titreFr) ? `<p class="table-ronde-titre-fr">${esc(tr.titreFr)}</p>` : ''}
            <dl class="table-ronde-faits">
              ${has(tr.date) ? `<dt>Date</dt><dd>${esc(tr.date)}</dd>` : ''}
              ${has(tr.lieu) ? `<dt>Lieu</dt><dd>${esc(tr.lieu)}</dd>` : ''}
              ${has(tr.encadrant) ? `<dt>Encadrement</dt><dd>${esc(tr.encadrant)}</dd>` : ''}
              ${has(tr.participants) ? `<dt>Participants</dt><dd>${tr.participants.map(esc).join(', ')}</dd>` : ''}
              ${has(tr.organisateur) ? `<dt>Partenariat</dt><dd>${esc(tr.organisateur)}</dd>` : ''}
            </dl>
          </div>
        </div>
      </section>`);
  }

  /* ---- Galerie (§6 : registre encre) ---- */
  if (has(e.galerie)) {
    sections.push(`
      <section class="edition-galerie registre-encre">
        <div class="grille-regie">
          <div class="marge-regie"><p class="surtitre">${e.galerie.length} photo${e.galerie.length > 1 ? 's' : ''}</p></div>
          <div class="contenu-regie apparition">
            <h2 class="titre-section">Galerie</h2>
            <div class="galerie-grille">
              ${e.galerie.map((g, i) => `<img src="${esc(g)}" alt="Photo ${i + 1} de la ${ordinalTxt(e.numero)} édition du FITUT" loading="lazy" width="600" height="600">`).join('')}
            </div>
          </div>
        </div>
      </section>`);
  }

  /* ---- Documents (registre papier, même forme que la presse — accueil §27) ---- */
  if (has(e.documents)) {
    sections.push(`
      <section class="edition-documents registre-papier">
        <div class="grille-regie">
          <div class="marge-regie"><p class="surtitre">${e.documents.length} document${e.documents.length > 1 ? 's' : ''}</p></div>
          <div class="contenu-regie apparition">
            <h2 class="titre-section">Documents</h2>
            <ul class="liste-documents">
              ${e.documents.map(d => `<li><a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.titre)} <span class="liste-documents-fleche" aria-hidden="true">→</span></a></li>`).join('')}
            </ul>
          </div>
        </div>
      </section>`);
  }

  mount.innerHTML = sections.join('');

  injectJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Festival',
    name: `${titre}`,
    startDate: e.annee + '-01-01',
    description: has(e.resume) ? e.resume : titre,
    location: {
      '@type': 'Place',
      name: e.ville || 'Tanger',
      address: { '@type': 'PostalAddress', addressLocality: 'Tanger', addressCountry: 'MA' }
    },
    organizer: {
      '@type': 'Organization',
      name: "Association de l'Action Universitaire (ASAU)",
      url: SITE_URL
    },
    url: `${SITE_URL}/edition.html?n=${e.numero}`
  });
}

/* ---------- Amorçage ---------- */
(async function initEditions() {
  const gridMount = document.getElementById('editions-grid');
  const detailMount = document.getElementById('edition-detail');
  if (!gridMount && !detailMount) return;

  const mount = gridMount || detailMount;
  try {
    const editions = await loadEditions();

    if (gridMount) {
      renderBande(editions, gridMount);
    } else {
      const params = new URLSearchParams(location.search);
      const n = parseInt(params.get('n'), 10);
      const edition = editions.find(x => x.numero === n) || editions[0];
      if (!edition) throw new Error('Édition introuvable');
      renderDetail(edition, detailMount);
    }

    /* Réactive les animations sur le contenu fraîchement injecté */
    document.dispatchEvent(new CustomEvent('fitut:content-ready'));
  } catch (err) {
    /* Pas de style="..." en ligne (CLAUDE.md §4) : réutilise la classe
       déjà posée sur le conteneur de chargement initial de chaque page. */
    mount.innerHTML = `
      <div class="container chargement-page">
        <p>Le contenu des éditions n'a pas pu être chargé.</p>
        <p><a href="index.html">Retour à l'accueil</a></p>
      </div>`;
    console.error(err);
  }
})();
