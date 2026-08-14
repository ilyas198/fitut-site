# FITUT — Site officiel

Site du **Festival International du Théâtre Universitaire de Tanger**.
Site statique en HTML / CSS / JavaScript, sans framework ni étape de build.

---

## Démarrer le projet

> ⚠️ **Ne pas ouvrir les fichiers par double-clic.** La page « Nos Éditions » charge
> `data/editions.json` via `fetch()`, ce qui est bloqué par le protocole `file://`.
> Il faut passer par un petit serveur local.

**Méthode recommandée — extension Live Server**

1. Ouvrir le dossier du projet dans VS Code
2. Installer l'extension **Live Server** (VS Code la propose automatiquement)
3. Clic droit sur `index.html` → **Open with Live Server**
4. Le site s'ouvre sur `http://127.0.0.1:5500`

**Alternative en ligne de commande**

```bash
python3 -m http.server 5500     # puis http://localhost:5500
# ou
npx serve .
```

---

## Structure

```
fitut/
├── index.html              Accueil : hero, compte à rebours, chiffres, presse
├── qui-sommes-nous.html    L'ASAU, valeurs, équipe
├── le-festival.html        Participants, lieux, prix, ateliers
├── le-carnaval.html        Parcours, galerie, chiffres
├── nos-editions.html       Bande horizontale d'affiches, les 19 éditions
├── edition.html            Fiche d'une édition (edition.html?n=18)
│
├── style.css               Feuille de style unique
├── main.js                 Hero, compte à rebours, menu, animations
├── partials.js             Header, footer et barre sociale (source unique)
├── assets/js/editions.js   Moteur de la section « Nos Éditions »
│
├── data/editions.json      ★ Toutes les données des éditions
├── media/                  Images (voir media/README.md)
├── pdfs/                   Documents téléchargeables
│
├── sitemap.xml             Plan du site pour Google
├── robots.txt              Directives d'indexation
└── .htaccess               Redirections 301, compression, cache
```

---

## Ajouter ou modifier une édition

Tout se passe dans **`data/editions.json`**. Aucun code à toucher.

```json
{
  "numero": 20,
  "annee": 2027,
  "dates": "25 – 29 octobre 2027",
  "ville": "Tanger",
  "statut": "a_venir",
  "theme": "",
  "affiche": "media/editions/20/affiche.jpg",
  "resume": "Texte de présentation…",
  "chiffres":  [{ "label": "Pays représentés", "valeur": "12" }],
  "hommages":  [{ "nom": "", "portrait": "", "bio": "" }],
  "selection": [{ "piece": "", "troupe": "", "universite": "", "pays": "", "synopsis": "" }],
  "palmares":  [{ "prix": "Grand Prix du Festival", "laureat": "" }],
  "galerie":   ["media/editions/20/photo-1.jpg"],
  "documents": [{ "titre": "Dossier de presse", "url": "pdfs/dp-2027.pdf" }]
}
```

**Les blocs vides disparaissent automatiquement** de la page : un tableau `[]` ou une
chaîne `""` ne génère aucune section. Il n'est donc pas nécessaire de tout remplir.

Après ajout, pensez à régénérer le `sitemap.xml` (une ligne `<url>` par édition).

---

## Modifier le menu ou le pied de page

Ils sont générés une seule fois dans **`partials.js`** et injectés dans toutes les pages.
Une modification ici se répercute partout.

---

## Appliquer la nouvelle charte graphique

Les couleurs sont centralisées en haut de `style.css` :

```css
:root {
  --cream:      #f7f3ec;   /* fond clair    */
  --charcoal:   #1c1c1c;   /* fond sombre   */
  --gold:       #b8922a;   /* couleur accent */
  --gold-light: #d4a843;   /* accent clair  */
  --warm-grey:  #6b6558;   /* texte secondaire */
}
```

Remplacer ces cinq valeurs par celles du rebranding suffit à changer l'apparence
de l'ensemble du site. Les polices se changent dans la règle `body` et `h1, h2, h3, h4`.

---

## SEO — ce qui est déjà en place

- Balises `title`, `description`, `canonical` et Open Graph sur chaque page
- Données structurées **JSON-LD** de type `Festival` (accueil et fiches d'édition)
- `sitemap.xml` et `robots.txt`
- Palmarès en **texte indexable** plutôt qu'en image
- Attributs `alt` descriptifs, `width`/`height` sur les images, `loading="lazy"`
- Redirections 301 des anciennes pages dans `.htaccess`

**Restant à faire au déploiement** : soumettre le sitemap à Google Search Console,
et remplacer `https://www.fitut.ma/` si le domaine change.

---

## Optimisation mobile et tablette

- Feuilles de style écrites **mobile-first**, points de rupture à 480 / 768 / 1024 px
- Cibles tactiles de 48 px minimum sur les boutons
- Effets de survol neutralisés sur écran tactile (`@media (hover: none)`)
- Respect de `prefers-reduced-motion`
- Diaporama mis en pause quand l'onglet passe en arrière-plan

---

## Points en attente du comité d'organisation

| Élément | Où il sera branché |
|---|---|
| Charte graphique et logos | `:root` dans `style.css`, `media/logos/` |
| Affiches des éditions | champ `affiche` de `data/editions.json` |
| Palmarès de la 18ᵉ édition (2025) | champ `palmares` de l'édition 18 |
| Portraits et fonctions de l'équipe | `qui-sommes-nous.html`, `media/equipe/` |
| Détail des ateliers | section `#ateliers` de `le-festival.html` |
| E-mail et téléphone officiels | `partials.js` (pied de page) |

Les emplacements marqués `[à confirmer]` dans le code signalent les informations
en attente de validation.
