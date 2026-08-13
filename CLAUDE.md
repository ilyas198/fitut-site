# CLAUDE.md — Contexte du projet FITUT

Site du **Festival International du Théâtre Universitaire de Tanger** (FITUT),
organisé par l'Association de l'Action Universitaire (ASAU).

Ce fichier est le point d'entrée : lis-le avant toute modification.
Voir aussi @README.md pour la documentation destinée aux humains.

> ### ⚠️ Hiérarchie des skills
> `fitut-design` = **source de vérité** (identité, direction artistique, couleurs,
> typographie, images, mouvement, composants, anti-patterns).
> `frontend-design` = **source de méthode** (processus, exploration de composition,
> architecture des composants, qualité d'exécution).
> Ordre : `fitut-design` → direction arrêtée → `frontend-design` → architecture →
> implémentation → contrôle avant livraison.
> **En cas de conflit, `fitut-design` l'emporte toujours.** Voir sa section 0.
>
> ### ⚠️ Toute décision visuelle passe par la skill `fitut-design`
> Avant de créer ou de modifier une page, un composant, une couleur, une police, un
> espacement, une grille, un traitement d'image ou une animation : consulter
> **`.claude/skills/fitut-design/SKILL.md`**. Elle fait autorité et l'emporte sur les
> réflexes par défaut. La section **DO NOT** et le **contrôle avant livraison** sont
> à respecter systématiquement.

---

## 1. Nature du projet

Site **statique** : HTML + CSS + JavaScript natif. **Aucun framework, aucune étape de build,
aucun gestionnaire de paquets.** Ne pas introduire React, Vue, Tailwind, Vite ou npm
sans validation explicite de l'utilisateur.

Langue du site et du code : **français**. Commentaires, noms de variables et messages
d'interface en français.

### Lancer le site en local

```bash
python3 -m http.server 5500     # http://localhost:5500
```

Un serveur est **obligatoire** : `nos-editions.html` charge `data/editions.json`
via `fetch()`, ce que le protocole `file://` bloque.

---

## 2. Architecture

```
index.html            Accueil : hero (fil d'annonces), chiffres, explorer, presse
qui-sommes-nous.html  ASAU, valeurs, équipe
le-festival.html      Participants, lieux, prix, ateliers
le-carnaval.html      Parcours, galerie, chiffres
nos-editions.html     Frise verticale de toutes les éditions
edition.html          Fiche d'une édition — edition.html?n=18

style.css             Feuille de style unique de tout le site
main.js               Menu burger, animations au défilement, compteurs (pages non migrées)
partials.js           Header + footer + barre sociale (source unique)
assets/js/editions.js Moteur de rendu de « Nos Éditions »
assets/js/annonces.js Moteur du fil d'annonces du hero (accueil)
data/editions.json    ★ Toutes les données des éditions
data/annonces.json    ★ Annonces du hero de l'accueil (fitut-design §16)
```

### Règles structurelles à respecter

- **Le header et le footer vivent uniquement dans `partials.js`.** Ne jamais les
  écrire en dur dans une page HTML.
- **Le contenu des éditions vit uniquement dans `data/editions.json`.** Ne jamais
  coder en dur un palmarès ou une liste de troupes dans le HTML.
- Dans `editions.js`, les blocs dont la donnée est vide (`""` ou `[]`) sont
  **masqués automatiquement**. Conserver ce comportement en ajoutant des sections.
- Toute sortie HTML issue du JSON passe par la fonction `esc()` d'`editions.js`.

---

## 3. Historique des décisions déjà prises

Refonte demandée par le client, **déjà appliquée** — ne pas revenir en arrière :

| Décision | État |
|---|---|
| Page « Espace Presse » supprimée | fait — logos migrés sur l'accueil, contact dans le footer |
| Pages « Hommages » et « Palmarès » supprimées | fait — contenu absorbé dans les fiches d'édition |
| Menu « Archives » remplacé par « Nos Éditions » | fait |
| Citation de Fatima Ouchay retirée de l'accueil | fait — remplacée par un compte à rebours, lui-même retiré au LOT 4 phase B (§36 : vocabulaire de lancement de produit) |
| Section « Vous voulez nous rejoindre » du Carnaval retirée | fait |
| Photos et « Mot du Fondateur » retirés de Qui Sommes Nous | fait |
| Slider à translation `-33.333%` remplacé | fait — fondu-croisé piloté par le DOM |
| Doublon « Meilleure Actrice » corrigé | fait — devenu « Meilleur Acteur » |

Redirections 301 des trois pages supprimées : dans `.htaccess`.

---

## 3 bis. ⚠️ Bug hérité découvert pendant la refonte — le hero n'a jamais rendu ce qu'il devait

Trouvaille la plus importante du LOT 2a (nettoyage CSS), à connaître avant de juger
l'ancien rendu de l'accueil.

Le commit « Refonte du hero : panneau de texte fixe + bande de visuels en défilement
vertical » (`649c3df`) a bien livré la structure `.hero-text` / `.hero-visual` prévue —
mais `style.css` contenait encore, plus haut dans le fichier, un **bloc `.hero`/`.hero-title`
de l'ère précédente (le carrousel `hero-slider`)** que personne n'avait supprimé. En CSS,
à spécificité égale, une propriété non réécrite par la règle la plus récente reste héritée
de la règle la plus ancienne — et ce bloc ancien n'a jamais été explicitement remplacé.

**Conséquence concrète : le hero affiché en production n'a jamais eu le rendu prévu par la
refonte.** Le titre s'affichait silencieusement en `Cormorant Garamond`, **en capitales**,
avec un `letter-spacing` négatif et une `text-shadow` — et le conteneur héritait d'un
`align-items: center; justify-content: center;` centrant tout le panneau de texte — alors
que la refonte prévoyait un titre aligné à gauche, dans la police courante, sans ombre.
Ce défaut existait **depuis le commit initial du projet** (`37ace43`, vérifié via
`git show`), donc avant même la refonte du hero — la refonte a changé la structure HTML
sans jamais toucher à l'ancien bloc CSS qui continuait de peser dessus.

**Si le rendu de l'accueil semblait ne pas convenir avant cette refonte-là, c'est
potentiellement pourquoi** : ce qui était visible à l'écran n'a jamais correspondu à ce que
le code du hero actuel était censé produire.

Corrigé au LOT 2a (`b5934a4`) : l'ancien bloc `.hero`/`.hero-title` (et toute la section
hero-slider morte qui l'entourait) a été supprimé. Le même défaut existait aussi sur
`.team-grid`/`.team-member img` (grille équipe) et sur `.venue-card`/`.venues-grid`
(cartes de lieux, celui-ci fusionné par calcul de cascade plutôt que par suppression —
voir le message du commit `b5934a4`).

---

## 4. Contraintes permanentes

### SEO — à ne jamais casser
- Chaque page a `title`, `meta description`, `canonical` et balises Open Graph.
- Données structurées **JSON-LD `Festival`** sur l'accueil et sur chaque fiche d'édition.
- Le palmarès doit rester en **texte indexable**, jamais en image.
- Images : attribut `alt` descriptif, `width` et `height` explicites, `loading="lazy"`.
- Après ajout d'une page ou d'une édition, mettre à jour `sitemap.xml`.
- Domaine canonique utilisé partout : `https://www.fitut.ma/`.

### Mobile et tablette
- CSS **mobile-first**. Points de rupture : 480 / 768 / 1024 px.
- Cibles tactiles de **48 px minimum**.
- Neutraliser les effets de survol via `@media (hover: none)`.
- Respecter `prefers-reduced-motion` pour toute animation ajoutée.

### Style de code
- Indentation 2 espaces, encodage UTF-8, fin de ligne LF.
- Pas de styles `style="..."` en ligne dans les nouvelles sections : créer une classe
  dans `style.css`. (L'ancien code en contient encore ; les nettoyer au fil des passages.)
- Couleurs : utiliser **exclusivement** les variables CSS de `:root`, jamais une
  valeur hexadécimale en dur.

---

## 5. Rebranding en attente

Les couleurs sont centralisées en haut de `style.css` :

```css
:root {
  --cream:      #f7f3ec;
  --charcoal:   #1c1c1c;
  --gold:       #b8922a;
  --gold-light: #d4a843;
  --warm-grey:  #6b6558;
}
```

Quand la charte graphique arrivera, remplacer ces valeurs suffira à rebrander le site.
Les polices se changent dans les règles `body` et `h1, h2, h3, h4`.

---

## 6. Données de référence (sources officielles)

Extraites du *Guide 2025* et de la *Proposition de sponsoring FITUT 2026*.
**Ne pas inventer de chiffres** : si une donnée manque, laisser `[à confirmer]`.

- **19ᵉ édition** : 26 – 30 octobre 2026, Tanger
- **18ᵉ édition** : 3 – 7 novembre 2025, thème du 50ᵉ anniversaire de la Marche Verte
- Chiffres 2025 : 9 pays, 12 spectacles, 130 festivaliers, 5 000+ spectateurs,
  100 bénévoles, 840 nuitées, 1 M+ vues, 100 k+ interactions
- Historique : 19 éditions depuis 2007, 20+ pays, 200+ troupes, 10 prix décernés
- ASAU fondée en **2005**, premier festival en **2007**
- Carnaval : Place du 9 Avril (Cinéma Rif) → Place des Nations-Unies, 5 000+ spectateurs
- Lieux : Palais des Arts et de la Culture, Espace Beckett (Institut Français),
  University of New England, ENCG Tanger
- Contact affiché actuellement : `fitutanger@gmail.com` / +212 (0)6 62 66 63 38
  Route de l'aéroport, BP 1255, 90000 Tanger Principal — ENCG Tanger

`data/editions.json` contient **141 prix archivés** couvrant les éditions 1 à 17.

---

## 7. Points ouverts

À signaler à l'utilisateur plutôt qu'à trancher seul :

1. **Deux jeux de contacts contradictoires** dans les documents sources :
   `fitutanger@gmail.com` / +212 6 62 66 63 38 (Guide) contre
   `fitutanger@uae.ac.ma` / +212 661 799 931 (Sponsoring). Le premier est affiché.
2. **Palmarès de la 18ᵉ édition (2025)** : absent des documents fournis, champ vide.
3. **Multilingue** (arabe / anglais) : non tranché. Le site est monolingue français.
4. **Fonctions des membres de l'équipe** : marquées `[Fonction à confirmer]`.
5. **Contenu des ateliers** : cartes de gabarit avec crochets dans `le-festival.html`.
6. **Images** : encore chargées depuis l'ancien WordPress `fitut.ma`. Les dossiers
   `media/` sont prêts à recevoir les fichiers haute définition.
7. **Titres et dates des 12 parutions presse** (accueil, section « Presse ») : seuls le
   nom du média et le lien sont confirmés. `fitut-design` §27 attend média + titre +
   date + lien ; en l'absence de titre et de date vérifiés, la section n'affiche que
   média + lien (LOT 4 phase B) plutôt que d'inventer les deux champs manquants (§35).
8. **Traductions arabes candidates non validées** : titre bilingue de la section
   « Chiffres » sur l'accueil (`index.html`) et titre bilingue « Nos Éditions »
   (`nos-editions.html`). Proposées par l'IA, non relues par un locuteur natif —
   marquées `[traduction à valider]` dans le code. À faire valider par le comité
   avant toute mise en production. Les éditions individuelles (`edition.html`)
   n'ont volontairement **pas** de titre bilingue : générer 19 traductions arabes
   d'ordinaux (« 19ᵉ édition », « 18ᵉ édition »…) sans relecture aurait été fabriquer
   19 données non vérifiées plutôt qu'une seule — voir LOT 5.
9. **Champs manquants dans `selection`** (édition, spectacles) : `fitut-design` §15/§20
   prévoit langue, durée, lieu et horaire pour `.entree-programme` ; `data/editions.json`
   ne fournit que `piece`, `troupe`, `universite`, `pays`, `synopsis`. Les métadonnées
   absentes sont masquées, jamais inventées (LOT 5) — à compléter dans le JSON si le
   comité fournit ces informations.
10. **Portraits d'hommages** (édition 18, et toute édition future) : `hommages[].portrait`
    est vide dans `data/editions.json` — `edition.html` affiche `[portrait à confirmer]`
    en attendant les fichiers réels.

Rechercher `[à confirmer]` dans le projet pour retrouver tous les emplacements en attente.

---

## 8. Prochaines étapes envisagées

- Section **Partenaires / Sponsors** (absente du site, présente dans le dossier de sponsoring)
- Page **Programme** de l'édition en cours
- Remplacement des images hotlinkées par les fichiers locaux
- Nettoyage des styles en ligne restants dans les anciennes pages
- Favicon et images Open Graph (`media/og/`)

---

## 9. Dette technique — refonte à trois registres (encre / rideau / papier)

Suivi des écarts assumés temporairement pendant la refonte pilotée par
`.claude/skills/fitut-design/SKILL.md` (voir aussi `.claude/skills/frontend-design/SKILL.md`).

- **Polices en CDN, pas encore auto-hébergées.** `fitut-design` §32 exige des `.woff2`
  auto-hébergés. Le temps du développement, les 3 familles (`Readex Pro` variable,
  latin + arabe dans un seul fichier ; `Literata` ; `IBM Plex Mono`) sont chargées via
  Google Fonts : `preconnect` vers `fonts.googleapis.com` et `fonts.gstatic.com`, un seul
  lien regroupant les 3 familles, `display=swap`. `Archivo`, `Newsreader` et
  `IBM Plex Sans Arabic` (LOT 1 initial) sont abandonnées suite à la révision de la skill —
  `Readex Pro` couvre le latin et l'arabe dans un seul dessin (§9). Ajouté au `<head>` de
  chaque page au moment de sa migration vers le nouveau système.
  **À solder au LOT 8** : bascule vers des `.woff2` auto-hébergés dans `assets/fonts/`.
