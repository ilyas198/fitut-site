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

/* ---------- Vue : grille ---------- */
function renderGrid(editions, mount) {
  const cards = editions.map(e => {
    const aVenir = e.statut === 'a_venir';
    const visuel = has(e.affiche)
      ? `<img src="${esc(e.affiche)}" alt="Affiche de la ${ordinalTxt(e.numero)} édition du FITUT, ${e.annee}" loading="lazy" width="600" height="850">`
      : `<div class="edition-card-fallback" aria-hidden="true"><span>${e.numero}</span></div>`;

    const meta = [
      has(e.palmares) ? `${e.palmares.length} prix` : '',
      has(e.selection) ? `${e.selection.length} spectacles` : '',
      has(e.hommages) ? `${e.hommages.length} hommage${e.hommages.length > 1 ? 's' : ''}` : ''
    ].filter(Boolean).join(' · ');

    return `
      <a class="edition-card${aVenir ? ' edition-card--next' : ''}" href="edition.html?n=${e.numero}">
        <div class="edition-card-visual">
          ${visuel}
          ${aVenir ? '<span class="edition-badge">Prochaine édition</span>' : ''}
        </div>
        <div class="edition-card-body">
          <h2>${ordinal(e.numero)} édition</h2>
          <p class="edition-card-date">${esc(e.dates)}</p>
          ${has(e.theme) ? `<p class="edition-card-theme">${esc(e.theme)}</p>` : ''}
          ${meta ? `<p class="edition-card-meta">${meta}</p>` : ''}
        </div>
      </a>`;
  }).join('');

  mount.innerHTML = `<div class="editions-grid">${cards}</div>`;

  injectJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Éditions du Festival International du Théâtre Universitaire de Tanger',
    numberOfItems: editions.length,
    itemListElement: editions.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${ordinalTxt(e.numero)} édition du FITUT — ${e.annee}`,
      url: `${SITE_URL}/edition.html?n=${e.numero}`
    }))
  });
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

  /* En-tête */
  sections.push(`
    <header class="edition-hero">
      <div class="container">
        <a class="edition-back" href="nos-editions.html">← Toutes les éditions</a>
        <h1>${ordinal(e.numero)} édition</h1>
        <p class="edition-hero-date">${esc(e.dates)}${e.ville ? ' · ' + esc(e.ville) : ''}</p>
        ${has(e.theme) ? `<p class="edition-hero-theme">${esc(e.theme)}</p>` : ''}
      </div>
    </header>`);

  /* Résumé + affiche */
  if (has(e.resume) || has(e.affiche)) {
    sections.push(`
      <section class="edition-intro">
        <div class="container">
          <div class="edition-intro-grid${has(e.affiche) ? '' : ' edition-intro-grid--noimg'}">
            ${has(e.affiche) ? `<img class="edition-affiche" src="${esc(e.affiche)}" alt="Affiche officielle de la ${ordinalTxt(e.numero)} édition du FITUT" width="600" height="850">` : ''}
            ${has(e.resume) ? `<div class="edition-resume"><p>${esc(e.resume)}</p></div>` : ''}
          </div>
        </div>
      </section>`);
  }

  /* Chiffres clés */
  if (has(e.chiffres)) {
    sections.push(`
      <section class="edition-chiffres">
        <div class="container">
          <h2 class="section-title">L'édition en chiffres</h2>
          <div class="chiffres-grid">
            ${e.chiffres.map(c => `
              <div class="chiffre-item">
                <span class="chiffre-valeur">${esc(c.valeur)}</span>
                <span class="chiffre-label">${esc(c.label)}</span>
              </div>`).join('')}
          </div>
        </div>
      </section>`);
  }

  /* Palmarès */
  if (has(e.palmares)) {
    sections.push(`
      <section class="edition-palmares">
        <div class="container">
          <h2 class="section-title">Palmarès</h2>
          <dl class="palmares-list">
            ${e.palmares.map(p => `
              <div class="palmares-row">
                <dt>${esc(p.prix)}</dt>
                <dd>${esc(p.laureat)}</dd>
              </div>`).join('')}
          </dl>
        </div>
      </section>`);
  }

  /* Sélection officielle */
  if (has(e.selection)) {
    sections.push(`
      <section class="edition-selection">
        <div class="container">
          <h2 class="section-title">Sélection officielle</h2>
          <div class="selection-grid">
            ${e.selection.map(s => `
              <article class="selection-card">
                <h3>${esc(s.piece)}</h3>
                <p class="selection-troupe">${esc(s.troupe)}</p>
                <p class="selection-univ">${esc(s.universite)}${s.pays ? ` — <strong>${esc(s.pays)}</strong>` : ''}</p>
                ${has(s.synopsis) ? `<p class="selection-synopsis">${esc(s.synopsis)}</p>` : ''}
              </article>`).join('')}
          </div>
        </div>
      </section>`);
  }

  /* Hommages */
  if (has(e.hommages)) {
    sections.push(`
      <section class="edition-hommages">
        <div class="container">
          <h2 class="section-title">Hommages</h2>
          ${e.hommages.map(h => `
            <article class="hommage-block">
              ${has(h.portrait) ? `<img src="${esc(h.portrait)}" alt="Portrait de ${esc(h.nom)}" loading="lazy" width="400" height="500">` : ''}
              <div>
                <h3>${esc(h.nom)}</h3>
                <p>${esc(h.bio)}</p>
              </div>
            </article>`).join('')}
        </div>
      </section>`);
  }

  /* Table ronde */
  const tr = e.tableRonde;
  if (tr && has(tr.titre)) {
    sections.push(`
      <section class="edition-tableronde">
        <div class="container">
          <h2 class="section-title">Table ronde</h2>
          <div class="tableronde-block">
            <h3 lang="ar" dir="rtl">${esc(tr.titre)}</h3>
            ${has(tr.titreFr) ? `<p class="tableronde-fr">${esc(tr.titreFr)}</p>` : ''}
            <ul class="tableronde-meta">
              ${has(tr.date) ? `<li><strong>Date</strong> ${esc(tr.date)}</li>` : ''}
              ${has(tr.lieu) ? `<li><strong>Lieu</strong> ${esc(tr.lieu)}</li>` : ''}
              ${has(tr.encadrant) ? `<li><strong>Encadrement</strong> ${esc(tr.encadrant)}</li>` : ''}
              ${has(tr.participants) ? `<li><strong>Participants</strong> ${tr.participants.map(esc).join(', ')}</li>` : ''}
              ${has(tr.organisateur) ? `<li><strong>Partenariat</strong> ${esc(tr.organisateur)}</li>` : ''}
            </ul>
          </div>
        </div>
      </section>`);
  }

  /* Galerie */
  if (has(e.galerie)) {
    sections.push(`
      <section class="edition-galerie">
        <div class="container">
          <h2 class="section-title">Galerie</h2>
          <div class="photo-grid">
            ${e.galerie.map((g, i) => `<img src="${esc(g)}" alt="Photo ${i + 1} de la ${ordinalTxt(e.numero)} édition du FITUT" loading="lazy">`).join('')}
          </div>
        </div>
      </section>`);
  }

  /* Documents */
  if (has(e.documents)) {
    sections.push(`
      <section class="edition-documents">
        <div class="container">
          <h2 class="section-title">Documents</h2>
          <ul class="file-list">
            ${e.documents.map(d => `<li><a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.titre)}</a></li>`).join('')}
          </ul>
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
      renderGrid(editions, gridMount);
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
    mount.innerHTML = `
      <div class="container" style="text-align:center; padding:4rem 0;">
        <p>Le contenu des éditions n'a pas pu être chargé.</p>
        <p><a href="index.html">Retour à l'accueil</a></p>
      </div>`;
    console.error(err);
  }
})();
