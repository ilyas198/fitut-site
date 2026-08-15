---
name: fitut-design
description: Système de design et direction artistique du site du Festival International du Théâtre Universitaire de Tanger (FITUT). À consulter OBLIGATOIREMENT avant toute création ou modification d'interface : nouvelle page, nouveau composant, nouvelle section, refonte de hero, changement de couleur, de police, d'espacement, de grille, de traitement d'image ou d'animation. Se déclenche aussi pour toute question de style, de mise en page, de responsive, d'accessibilité visuelle ou de cohérence graphique sur ce projet.
---

# FITUT — Design System & Art Direction

**Cette skill fait autorité sur toute décision visuelle du projet.**
En cas de conflit avec une habitude, un réflexe ou un framework, cette skill l'emporte.
Seule une instruction explicite de l'utilisateur, dans la conversation en cours, peut la
surpasser — et dans ce cas, signaler l'écart avant de coder.

## 0. Hiérarchie avec `frontend-design`

Le projet contient deux skills. Elles ne sont pas au même niveau.

| Skill | Rôle | Autorité |
|---|---|---|
| **`fitut-design`** (celle-ci) | **Source de vérité** — identité, direction artistique, couleurs, typographie, images, mouvement, composants, anti-patterns | Décide **quoi** |
| **`frontend-design`** | **Source de méthode** — processus de conception, exploration de mise en page, architecture des composants, qualité d'exécution | Décide **comment** |

**Ordre d'exécution obligatoire :**

```
fitut-design  →  direction artistique et UX arrêtées
      ↓
frontend-design  →  exploration de composition, architecture des composants
      ↓
implémentation
      ↓
validation visuelle et UX  →  §Contrôle avant livraison
```

**Règle d'arbitrage : en cas de conflit, `fitut-design` gagne toujours.**
`frontend-design` s'adapte à `fitut-design`, jamais l'inverse.

### Axes verrouillés / axes libres

`frontend-design` demande d'explorer et de proposer plusieurs directions. Cette
exploration s'applique **uniquement aux axes libres**.

| Axes **verrouillés** — ne pas explorer, appliquer | Axes **libres** — explorer, proposer des options |
|---|---|
| Palette et rôles de couleur (§10) | Composition interne d'une section |
| Familles et échelle typographiques (§9) | Répartition dans la grille 12 colonnes |
| Bascule encre ↔ rideau ↔ papier (§6) | Ordre et densité des blocs |
| Ligne bilingue + surtitrage (§6) | Architecture et découpage des composants |
| Traitement photo (§13) | Hiérarchie interne d'une fiche |
| Échelle d'espacement (§12) | Points d'entrée et parcours de lecture |
| Motion : un seul moment orchestré (§34) | Chorégraphie interne du lever de rideau |
| Anti-patterns et DO NOT (§36) | — |

Quand `frontend-design` demande de proposer plusieurs directions visuelles, proposer
plusieurs **compositions** — jamais plusieurs palettes ni plusieurs couples typographiques.

### Garde-fous issus de la calibration `frontend-design`

`frontend-design` identifie trois esthétiques génératives par défaut. `fitut-design` en
écarte une explicitement et **frôle les deux autres** : ces garde-fous sont ce qui sépare
la direction du défaut.

| Défaut signalé | Position du FITUT | Garde-fou |
|---|---|---|
| ① crème + serif à fort contraste + terracotta | **rejeté** (§10, DO NOT) | — |
| ② fond quasi noir + un accent vif unique | **proximité réelle** | Le site n'est **jamais intégralement sombre** : le registre *papier* occupe au minimum 30 % de chaque page, et le *rideau* interrompt l'encre. La base n'est pas un noir neutre mais un bleu encre, et l'accent corail vient du logo officiel — ce n'est pas un accent choisi pour trancher. |
| ③ mise en page broadsheet, filets fins, angles vifs, colonnes denses | **proximité réelle** | Interdiction du pastiche de journal : **pas de texte en colonnes multiples**, pas de filet qui ne sépare rien, pas de manchette. Un filet n'apparaît que s'il sépare deux blocs de nature différente. Ce qui distingue le FITUT du broadsheet est la bascule à trois registres et la ligne bilingue — si ces éléments disparaissent d'une page, la page tombe dans le défaut ③. |

Test à s'appliquer avant de livrer une page : *si je retirais la ligne bilingue, le
surtitrage et la bascule de registres, resterait-il quelque chose de spécifique au FITUT ?*
Si la réponse est non, la page n'est pas terminée.

---

## AVANT D'ÉCRIRE LA MOINDRE LIGNE

Répondre à ces cinq questions. Si une réponse manque, la poser à l'utilisateur.

1. **Registre** — ce bloc est-il *encre* (base, on regarde), *rideau* (interruption rare)
   ou *papier* (on lit) ? → §6
2. **Surtitre** — quel fait réel porte l'annotation en marge ? Si aucun fait réel
   n'existe, **il n'y a pas de surtitre**. → §6
3. **Forme juste** — le contenu est-il une distribution, une entrée de programme, une
   fiche d'archive, un texte de revue ? **Par défaut, ce n'est pas une carte.** → §15
4. **Composition** — où est l'asymétrie ? Un bloc centré doit être justifié. → §7
5. **Mobile** — à quoi ressemble ce bloc à 375 px ? On le conçoit là d'abord. → §30
---

## 1. Identité du FITUT

Festival International du Théâtre Universitaire de Tanger. Créé en 2007, organisé par
l'**Association de l'Action Universitaire (ASAU)**, fondée en 2005 à l'ENCG Tanger.
Placé sous le Haut Patronage de Sa Majesté le Roi Mohammed VI.

Dix-neuf éditions, plus de 200 troupes, plus de 20 pays, 141 prix décernés.
19ᵉ édition : 26 – 30 octobre 2026.

**Ce que le FITUT n'est pas** : une startup, un SaaS, une agence, une marque commerciale,
un festival de musique, une conférence tech. Aucun code visuel emprunté à ces univers
n'a sa place ici.

**Ce que le FITUT est** : une institution culturelle étudiante avec dix-neuf ans d'archives.

## 2. Positionnement culturel

Une **archive vivante**. Le site n'annonce pas seulement une édition : il tient la mémoire
de dix-neuf ans de théâtre universitaire. C'est l'actif que ne possède aucun autre festival
comparable au Maroc.

Conséquence opérationnelle : **le passé n'est jamais relégué**. Les éditions antérieures
ne sont pas un sous-menu ni une page « archives » de bas de site. Elles sont un contenu
de premier plan, traité avec le même soin que l'édition à venir.

## 3. Positionnement institutionnel

Le Haut Patronage Royal se traite avec la sobriété d'une mention officielle : composition
sobre, pas de badge, pas d'encadré doré, pas d'animation. Il n'est jamais un argument
marketing.

La crédibilité institutionnelle se prouve par la **rigueur** — contrastes tenus, données
exactes, sources citées, crédits photo visibles — jamais par les effets.

**Ne jamais inventer un chiffre.** Si une donnée manque, écrire `[à confirmer]` et le
signaler à l'utilisateur.

## 4. Positionnement universitaire

Les participants sont des **étudiants**, pas des professionnels. Les troupes sont
rattachées à des universités nommées (ISADAC Rabat, Ain Shams, Universidade da Beira
Interior, Vilnius University…).

Conséquence : chaque œuvre est toujours reliée à son **université** et à son **pays**.
Cette triade œuvre / université / pays est l'unité d'information de base du site.

## 5. Dimension internationale

Neuf pays en 2025, plus de vingt depuis 2007. Les spectacles se jouent en portugais,
polonais, italien, espagnol, français, lituanien, monténégrin, arabe et anglais.

**L'arabe est traité à parité avec le latin.** Tout titre arabe reçoit `lang="ar"` et
`dir="rtl"`, et s'affiche dans la police arabe du projet — jamais en police de repli
système. C'est une exigence non négociable, autant technique qu'éthique.

Le site est actuellement monolingue français. Si le multilingue est activé un jour,
prévenir : c'est une décision structurelle, pas un ajout.

## 6. Direction artistique

### Le principe : trois registres

Le site n'a pas deux états mais trois, qui se relaient. Chacun a un fond, un rôle et
une posture de lecture.

| Registre | Fond | Contenu | Posture |
|---|---|---|---|
| **L'encre** | `--encre-nuit` | base majoritaire : hero, spectacles, archives, galeries, navigation | on regarde |
| **Le rideau** | `--rideau` | moments d'interruption : chiffres clés, hommages, appel à candidature, Grand Prix | on s'arrête |
| **Le papier** | `--papier` | institution et lecture : ASAU, textes longs, palmarès, informations pratiques, contact | on lit |

**La bascule d'un registre à l'autre est l'événement rythmique du site** — c'est elle qui
remplace le centrage et les séparateurs décoratifs. Elle ne coûte aucune animation.

Règles de rythme :
- **Aucune page n'est composée d'un seul registre.** Toute page comporte au minimum une
  bascule. Une page monorégistre n'a pas de rythme : elle empile.
- L'encre est **majoritaire**. Le rideau est **rare** : au maximum deux blocs par page,
  jamais deux consécutifs. Sa force vient de sa rareté.
- Le papier occupe au minimum **30 %** de la hauteur de chaque page. Une page entièrement
  sombre tombe dans le défaut ② (voir §0).
- Toute bascule de registre est précédée de `--esp-8`.
- **Le pied de page fait exception.** Il est en registre rideau sur toutes les pages :
  c'est le rideau qui tombe, la clôture. Élément persistant et non section de contenu,
  il ne compte pas dans la limite de deux blocs rideau par page.

### Rayons et ombres

> **UI Fiteat (commit « rayons et ombres »)** — remplace l'échelle 4/8/12px posée au
> commit « barres translucides », jamais appliquée en CSS (seulement documentée).
> Celle-ci l'est, sur tout élément déjà bordé, rempli ou cadré (§10, §15) : `.bouton`,
> `.social-icon-footer`, les cadres d'affiche et de portrait, la ligne Grand Prix, toute
> photographie de galerie. Les filets de séparation et les barres fixes (§17) n'en
> reçoivent pas — ce sont des lignes, pas des boîtes.

```css
--rayon-s: 16px;      /* boutons, étiquettes */
--rayon-m: 22px;      /* blocs, fiches, cartes */
--rayon-l: 32px;      /* grands conteneurs, visuels */
--rayon-plein: 50%;   /* avatars, puces — actuellement sans emploi réel : les portraits
  restent carrés (interdit ci-dessous), et le site n'a pas de puce ronde (§16 l'interdit
  explicitement pour la navigation du hero) */
```

Jamais de valeur en dur : toujours un token.

```css
--ombre-bloc:   0 16px 40px rgba(38, 26, 24, 0.20);   /* grands visuels — hero, affiche d'édition */
--ombre-accent: 0 6px 20px rgba(255, 82, 38, 0.45);   /* boutons pleins en --corail */
```

Appliquées avec retenue, pas partout où un rayon existe : `--ombre-bloc` seulement aux
quelques visuels à l'échelle d'un hero (pas à chaque vignette), `--ombre-accent`
seulement aux boutons à fond plein.

### L'élément signature : la ligne bilingue

Le logotype du FITUT est bilingue par construction — les tracés du mot « fitut » se lisent
simultanément en latin et en arabe, et les deux baselines, française et arabe, sont
justifiées à la même largeur exacte.

**Le site reprend ce geste comme signature.** Tout titre majeur porte sa contrepartie
arabe, à parité typographique, jamais en note ni en repli.

```html
<h1 class="titre-bilingue">
  <span lang="fr">Le théâtre universitaire rassemble le monde</span>
  <span lang="ar" dir="rtl">المسرح الجامعي يجمع العالم</span>
</h1>
```

Le second élément signature est le **surtitre** : une ligne fine en monospace, capitales
espacées, alignée dans la marge de régie.

```html
<p class="surtitre">Éd. 19 — Tanger — 26.10 › 30.10.2026</p>
```

```css
.surtitre {
  font-family: var(--police-donnees);
  font-size: var(--pas-xs);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--corail);      /* registre encre */
  /* registre rideau : --corail-clair — le corail plein n'y fait que 4,39:1 */
  /* registre papier : --rideau — le corail y est illisible (2,72:1) */
}
```

**Règle absolue : un surtitre porte toujours un fait vérifiable.** Édition, année, pays,
langue de représentation, durée, lieu, nombre. Jamais un mot d'ambiance (« Découvrez »,
« Notre univers », « L'expérience »).

Le surtitre remplace partout : les eyebrows décoratifs, la numérotation 01/02/03, les
sous-titres centrés, les petites lignes dorées.

**Ces deux éléments sont les seules audaces du site.** Tout le reste est discipliné.
Ne pas en ajouter un troisième.

### La dimension marocaine

Elle passe par quatre canaux et **jamais par le motif** :

1. **La bilingualité** — l'arabe à parité, dans le même dessin de caractère que le latin
2. **Les couleurs de la marque** — bordeaux et corail viennent du logo, pas d'un cliché
3. **Le registre institutionnel** — la sobriété d'un document officiel
4. **La lumière** — contraste dur du détroit dans le traitement photo (§13)
**Interdits absolus** : zellige, arabesque, moucharabieh, main de Fatma, calligraphie
décorative, motif géométrique « oriental », dégradé « couchant marocain », palmier,
babouche, théière.

## 7. Principes UI

1. **Rien n'est décoratif.** Chaque trait, label et chiffre porte une information.
2. **La composition remplace l'ornement.** Asymétrie, échelle, blanc.
3. **Aligné à gauche par défaut.** Un bloc centré doit se justifier ; le centrage est
   réservé aux citations et aux blocs de moins de trois lignes.
4. **Les angles sont doux mais mesurés.** Tout élément bordé, rempli ou cadré porte un
   rayon de l'échelle `--rayon-*` (§6). Jamais au-delà de `--rayon-l` (32 px), sauf
   `--rayon-plein` pour un avatar ou une puce — inexistants pour l'instant sur ce site
   (§6). Les filets de séparation et les barres fixes n'ont pas de rayon.
5. **Ombre limitée à deux tokens.** `--ombre-bloc` sur les grands visuels, `--ombre-accent`
   sur les boutons à fond plein (§6) — jamais une valeur en dur, jamais ailleurs. La
   séparation entre blocs reste d'abord le filet de 1 px ou le changement de registre.
6. **Une seule couleur d'accent visible à la fois** dans le champ de vision.
7. **Le filet de 1 px est le seul séparateur autorisé.**
## 8. Principes UX

1. **Le contenu est déjà remarquable ; l'interface s'efface.**
2. **Un chemin par intention** — candidater, consulter le programme, chercher une édition,
   contacter. Chacun atteignable en deux gestes depuis l'accueil.
3. **Pendant le festival, le programme du jour est atteignable en un geste.**
4. **Tout état filtré est une URL.** Les filtres modifient l'URL, restent partageables
   et indexables.
5. **Les blocs vides disparaissent.** Une donnée absente ne produit jamais une section
   vide ni un « à venir ». Comportement déjà en place dans `editions.js`, à étendre.
6. **Jamais de vocabulaire commercial.** Pas de « Découvrez », « Rejoignez-nous »,
   « Ne manquez pas », « Réservez votre place ».
## 9. Typographie

> **UI Fiteat (commit « polices »).** Outfit remplace Readex Pro / Literata / IBM Plex
> Mono pour les trois rôles latins — Fiteat n'a qu'une seule famille, différenciée par
> graisse et `letter-spacing` au point d'usage, pas par un dessin différent par rôle.
> Readex Pro reste seule pour l'arabe : Outfit n'en a pas.
>
> **Conséquence à faire remonter au comité, pas tranchée seule ici** : la ligne bilingue
> (§6) ne partage plus un même dessin entre français et arabe — c'était la décision
> structurelle du système précédent (« le latin et l'arabe partagent un même dessin, une
> même graisse, un même rythme », §5). Outfit et Readex Pro sont maintenant deux familles
> distinctes ; la parité reste de traitement (même échelle, même emplacement, même
> importance), mais plus visuelle.
>
> **PAS Paris2024** — la fonte officielle de Fiteat, chargée depuis un site de
> redistribution non autorisée. C'est la police propriétaire des Jeux de Paris 2024 :
> risque juridique réel sur un site placé sous le Haut Patronage Royal. Outfit, déjà le
> repli déclaré dans Fiteat, est libre (OFL) et sur Google Fonts.

| Rôle | Famille | Usage |
|---|---|---|
| **Affiche + interface** | `Outfit` | titres, navigation, texte courant |
| **Lecture longue** | `Outfit` | synopsis, biographies, textes institutionnels |
| **Données / surtitres** | `Outfit` | surtitres, chiffres, intitulés de prix, métadonnées, crédits |
| **Arabe** | `Readex Pro` | seul rôle qui en a encore besoin — Outfit n'a pas de jeu arabe |

```css
--police-affiche: 'Outfit', system-ui, sans-serif;
--police-revue:   'Outfit', system-ui, sans-serif;
--police-donnees: 'Outfit', system-ui, sans-serif;
--police-arabe:   'Readex Pro', 'Noto Naskh Arabic', sans-serif;
```

**Échelle — ratio 1,333 (quarte juste), la proportion d'un format d'affiche 3:4. Inchangée.**

```css
--pas-xs:   0.750rem;   /* surtitres, crédits */
--pas-s:    0.875rem;   /* métadonnées */
--pas-base: 1rem;       /* texte courant */
--pas-m:    1.333rem;   /* chapeaux */
--pas-l:    1.777rem;   /* titres de section */
--pas-xl:   2.369rem;   /* titres de page */
--pas-2xl:  clamp(3rem, 9vw, 6.313rem);    /* affiche */
--pas-3xl:  clamp(4rem, 16vw, 11.22rem);   /* hero */
```

**Règles de composition**
- Titres d'affiche : `Outfit` 500, `letter-spacing: -0.03em`, `line-height: 1.04`
- Contrepartie arabe d'un titre : `Readex Pro`, `--pas` immédiatement inférieur, en `--corail`
  sur fond sombre ou `--rideau` sur papier
- Texte de revue : `Outfit`, `line-height: 1.65`, **68 caractères maximum** par ligne
- Surtitres : `Outfit` 500, capitales, `letter-spacing: 0.18em` — la graisse et l'espacement
  des lettres tiennent le rôle que jouait la police à part entière
- Titres de pièces : italique, toujours — Outfit n'a pas d'italique dessiné, l'oblique
  synthétique du navigateur est acceptée ici (pas d'alternative sans réintroduire une
  seconde famille)
- Pas de lettrine (§18)
**Interdits** : Montserrat, Cormorant Garamond, Poppins, Inter, Lato, Open Sans, Playfair
Display, Raleway, Archivo, Newsreader, **Paris2024** (propriétaire, voir plus haut).
Ne jamais introduire une police hors de ce tableau sans validation.

## 10. Couleurs

> **La palette est dérivée de l'UI Fiteat, validée par le comité** (commit « ui-fiteat »)
> — plus du seul logo officiel, qui prévalait jusqu'ici. Les noms des tokens ne changent
> pas : seules leurs valeurs sont remplacées. Chaque contraste ci-dessous est recalculé à
> la formule WCAG, pas repris tel quel de Fiteat — deux valeurs de départ y échouaient
> (`--texte-tiers`, `--papier-tiers`) et ont été corrigées avant d'entrer ici.

```css
:root {
  /* — Primaire : l'encre — */
  --encre-nuit:     #261A18;  /* brun sombre Fiteat — base majoritaire du site */
  --encre-coulisse: #2D2523;  /* surfaces secondaires sur fond sombre */

  /* — Secondaire : les surfaces — */
  --rideau:         #352B2D;  /* brun moyen des sections Fiteat — blocs d'interruption */
  --rideau-profond: #221B1D;  /* variante pour aplats denses, dérivée ~65% */
  --papier:         #FFF6ED;  /* crème chaud Fiteat — registre de lecture */
  --papier-ombre:   #FAF4EE;  /* aplats secondaires sur papier */

  /* — Accent : le corail — */
  --corail:         #FF6238;  /* corail Fiteat — fond sombre UNIQUEMENT */
  --corail-clair:   #FF8A63;  /* inchangé — encore lisible sur le nouveau --rideau */

  /* — Accents secondaires Fiteat — */
  --jaune:          #FFF199;  /* accent secondaire, blocs d'exploration */
  --degrade-corail: linear-gradient(135deg, #FF6638 0%, #FF5226 100%); /* boutons principaux uniquement, §36 */

  /* — Texte sur papier — */
  --texte:          #261A18;  /* texte sur papier */
  --texte-tiers:    #595350;  /* assombri depuis #7E7572 (Fiteat, 4,21:1, échec) jusqu'à AAA */

  /* — Texte secondaire sur fond sombre — */
  --papier-tiers:   #C4BAB6;  /* recalculé — AAA sur encre (8,88:1) ET sur rideau (7,2:1) */

  /* — Filets — */
  --filet-sombre:   rgba(255, 246, 237, 0.16);
  --filet-clair:    rgba(38, 26, 24, 0.14);
}
```

### Les trois règles d'emploi

**1. Le corail n'existe que sur fond sombre.**
Sur `--papier` il tombe à 2,79:1 — échec total, vérifié comme pour l'ancien corail. Sur
`--encre-nuit` il atteint 5,68:1. C'est l'accent des registres encre et rideau, jamais du
registre papier. Sur papier, l'accent est `--rideau`.

**2. Le brun rideau est une surface, et peut aussi porter du texte sur papier.**
Sur `--papier`, `--rideau` en couleur de texte atteint 12,81:1, AAA — c'est l'accent
interactif du registre papier (voir règle 4).

**3. La hiérarchie du texte dépend aussi du registre.**

| Registre | Texte principal | Texte secondaire |
|---|---|---|
| **Encre** | `--papier` (15,81:1) | `--papier-tiers` (8,88:1) |
| **Rideau** | `--papier` (12,81:1) | `--papier-tiers` (7,2:1) |
| **Papier** | `--texte` (15,81:1) | `--texte-tiers` (7,08:1) |

`--papier-tiers` est le seul moyen d'obtenir une hiérarchie de texte sur fond sombre,
puisque `opacity` est interdit. Métadonnées, crédits photo, attributions de citation,
mentions secondaires.

**4. La couleur interactive dépend du registre.**

| Registre | Lien / survol / focus |
|---|---|
| **Encre** | `--corail` (5,68:1) |
| **Rideau** | `--corail-clair` (5,91:1) |
| **Papier** | `--rideau` (12,81:1) |

Le focus est toujours un `outline` de 2 px, décalé de 3 px, dans la couleur du registre.

### Contrastes vérifiés

| Fond | Texte | Ratio | Niveau |
|---|---|---|---|
| `--encre-nuit` | `--papier` | 15,81:1 | AAA |
| `--encre-nuit` | `--corail` | 5,68:1 | AA |
| `--encre-nuit` | `--papier-tiers` | 8,88:1 | AAA |
| `--rideau` | `--papier` | 12,81:1 | AAA |
| `--rideau` | `--corail-clair` | 5,91:1 | AA |
| `--rideau` | `--papier-tiers` | 7,2:1 | AAA |
| `--papier` | `--texte` | 15,81:1 | AAA |
| `--papier` | `--rideau` | 12,81:1 | AAA |
| `--papier` | `--texte-tiers` | 7,08:1 | AAA |
| `--papier-ombre` | `--texte-tiers` | 6,93:1 | AA (comme l'ancien système, déjà sous AAA à cet emplacement précis) |

`--texte-tiers` est réservé aux surtitres, crédits et métadonnées. Interdit pour du texte
courant long.

**Règles générales**
- **Toute couleur passe par une variable.** Aucune valeur hexadécimale en dur.
- Aucune information portée par la couleur seule : le corail est toujours doublé d'un
  libellé ou d'une position.
- **Ne jamais appliquer `opacity` à du texte** — l'opacité réduit le contraste réel, pas
  seulement l'apparence. Utiliser une couleur explicite.
**Interdits** : `linear-gradient` en fond de section ou de texte, couleurs d'accent
multiples dans un même écran, transparences empilées (glassmorphism) ailleurs que sur les
deux barres fixes (§17), crème + or. `--degrade-corail` est la seule exception au dégradé
décoratif — boutons principaux uniquement (§36), jamais un fond de section.

## 11. Grilles

**Douze colonnes avec marge de régie.** La colonne 1 est réservée en permanence aux
surtitres, années et numéros. Le contenu occupe les colonnes 2 à 12. Cette asymétrie
constante est la signature de mise en page du site.

```
mobile (< 600)        tablette (600–1023)      desktop (≥ 1024)
┌──────────┐          ┌───┬──────────┐         ┌──┬─────────────────┐
│ surtitre │          │sur│          │         │  │                 │
├──────────┤          │tit│  contenu │         │ⓢ│    contenu      │
│ contenu  │          │re │          │         │  │                 │
└──────────┘          └───┴──────────┘         └──┴─────────────────┘
1 colonne             marge de régie 88px      marge de régie 140px
surtitre au-dessus
```

**Trois largeurs de contenu selon le registre**

```css
--largeur-revue:   680px;   /* lecture longue */
--largeur-archive: 1040px;  /* listes, tableaux, programme */
--largeur-affiche: 100%;    /* pleine largeur, sans marge */
```

## 12. Espacements

Base 8, avec des sauts francs — le rythme d'un programme imprimé, pas d'une interface.

```css
--esp-1: 8px;    --esp-5: 64px;
--esp-2: 16px;   --esp-6: 96px;
--esp-3: 24px;   --esp-7: 144px;  /* entre sections */
--esp-4: 40px;   --esp-8: 216px;  /* bascule encre ↔ rideau ↔ papier */
```

**Règle : plus la bascule de registre est forte, plus l'espace qui la précède est grand.**
L'espace blanc signale au lecteur qu'il change de mode de lecture.

Aucune valeur d'espacement en dur. Toujours une variable.

## 13. Photographie

**Traitement unique appliqué à toutes les photographies** — c'est ce qui résout
l'hétérogénéité du fonds actuel.

```css
.photo {
  filter: saturate(0.75) contrast(1.08);
  border-radius: 0;
  box-shadow: none;
}
```

- Contraste dur, noirs profonds, hautes lumières préservées
- Désaturation partielle de 25 %, **jamais le noir et blanc total**
- **Aucun coin arrondi, aucune ombre portée**
- Formats : **3:4** pour les affiches, **3:2** pour la scène, **1:1 carré** pour les
  portraits — jamais de portrait rond
- Chaque image porte un **crédit photographique visible** en `Plex Mono` sous l'image
- Toujours `alt` descriptif, `width`, `height` explicites, `loading="lazy"` sauf le hero
**L'affiche officielle ne se recadre jamais et ne sert jamais de fond avec du texte
par-dessus.** C'est l'objet du festival, on la présente entière.

**Interdits** : photos de banque d'images, illustrations vectorielles génériques, mockups,
personnages 3D, filtres colorés, duotone.

## 14. Iconographie

**Le site n'utilise pratiquement pas d'icônes.** L'information passe par le mot.

Seules exceptions autorisées : les logos de réseaux sociaux du pied de page, une
flèche `→` typographique pour les liens sortants, et les chevrons de navigation du hero
et de la bande d'éditions (§16, §24 — desktop uniquement) : un SVG dessiné à la main,
comme les logos sociaux, jamais une bibliothèque.

**Interdits** : bibliothèques d'icônes (Lucide, Feather, Font Awesome, Heroicons),
icônes décoratives en tête de section, pictogrammes pour illustrer une valeur, emoji.

## 15. Composants

**Sortir de la carte.** Une carte convient quand des objets équivalents sont
interchangeables — ce n'est presque jamais le cas ici.

| Contenu | Forme juste |
|---|---|
| Palmarès | **distribution** — intitulé à gauche, lauréat à droite, filet de conduite |
| Spectacle | **entrée de programme** — titre, pays, université, langue, durée, lieu |
| Édition | **entrée de frise** — année en marge de régie, affiche et résumé en contenu |
| Lieu | **fiche d'adresse** — nom, adresse, capacité, plan statique |
| Membre d'équipe | **ligne de générique** — portrait carré, nom, fonction |
| Chiffre | **compteur animé** (§23) — monospace, `tabular-nums` |
| Référence presse | **ligne de liste** — média, titre, date, lien |
| Texte long | **colonne de revue** à 680 px |

**Composants du système — huit, pas davantage :**
`.surtitre` · `.distribution` · `.entree-programme` · `.fiche-archive` · `.citation` ·
`.filet-section` · `.bouton` · `.fiche-adresse`

Avant de créer un neuvième composant, vérifier qu'aucun des huit ne convient, et le
justifier à l'utilisateur.

**Relevé de chiffres** (page d'accueil, LOT 4 phase B) : pas un neuvième composant —
réutilise le format déjà prescrit au §23 (ligne mono à séparateurs `·`, sans balisage
dédié), désormais en compteur animé comme le reste du site plutôt qu'en valeur statique.

### Spécification des huit composants

Chaque composant est décrit par : registre autorisé, structure, typographie, séparation.
Aucun n'utilise d'arrondi, d'ombre ni de fond coloré.

| Composant | Registre | Structure | Typographie |
|---|---|---|---|
| `.surtitre` | les deux | ligne unique en marge de régie, ou au-dessus sur mobile | `--police-donnees`, `--pas-xs`, caps, `0.18em` |
| `.distribution` | encre | `dl` — `dt` intitulé, `dd` lauréat, filet de conduite entre les deux ≥ 1024 px | `dt` mono caps, `dd` revue, titres d'œuvre en italique |
| `.entree-programme` | encre | titre original, titre traduit, troupe, université, pays, langue, durée, lieu, horaire — les métadonnées sur une ligne séparée par `·` | titre en affiche, traduction en revue italique, métadonnées en mono |
| `.fiche-archive` | encre | année en marge de régie à `--pas-2xl`, affiche + résumé en contenu | année en affiche, corps en revue |
| `.citation` | les deux | texte en revue italique, attribution en mono sur la ligne suivante, filet vertical 1 px à gauche | revue italique `--pas-m` |
| `.filet-section` | les deux | `1px` de `--filet-clair` ou `--filet-sombre`, largeur du conteneur | — |
| `.bouton` | les deux | rectangle, hauteur min 48 px, padding `--esp-2` / `--esp-4` | mono caps `--pas-s`, `0.12em` |
| `.fiche-adresse` | papier | nom, adresse, capacité, plan statique — en liste de définition | nom en revue, données en mono |

**États d'interaction — identiques pour tous les composants cliquables :**

```css
/* ─── Registre ENCRE ─── */
.registre-encre a,
.registre-encre .bouton {
  color: var(--papier);
  border-color: var(--filet-sombre);
}
.registre-encre a:hover,
.registre-encre .bouton:hover  { color: var(--corail); border-color: var(--corail); }
.registre-encre a:focus-visible { outline: 2px solid var(--corail); outline-offset: 3px; }

/* ─── Registre RIDEAU ─── le corail plein n'y passe qu'en AA large */
.registre-rideau a:hover,
.registre-rideau .bouton:hover { color: var(--corail-clair); border-color: var(--corail-clair); }
.registre-rideau a:focus-visible { outline: 2px solid var(--corail-clair); outline-offset: 3px; }

/* ─── Registre PAPIER ─── le corail y est ILLISIBLE (2,72:1) */
.registre-papier a,
.registre-papier .bouton {
  color: var(--texte);
  border-color: var(--filet-clair);
}
.registre-papier a:hover,
.registre-papier .bouton:hover { color: var(--rideau); border-color: var(--rideau); }
.registre-papier a:focus-visible { outline: 2px solid var(--rideau); outline-offset: 3px; }

/* ─── État désactivé : dépend du registre, comme tout le reste ─── */
.registre-encre  :is(a, .bouton)[aria-disabled="true"],
.registre-rideau :is(a, .bouton)[aria-disabled="true"] { color: var(--papier-tiers); }
.registre-papier :is(a, .bouton)[aria-disabled="true"] { color: var(--texte-tiers); }

/* ─── Communs aux trois registres ─── */
:is(a, .bouton):active { border-width: 2px; }
:is(a, .bouton)[aria-disabled="true"] { cursor: not-allowed; border-style: dashed; }
```

### Exemple — la distribution

```html
<dl class="distribution">
  <div class="distribution-ligne">
    <dt>Grand Prix du Festival</dt>
    <dd><em>Zucco</em> — ISADAC, Rabat</dd>
  </div>
</dl>
```

Intitulé en `Plex Mono` capitales, lauréat en `Literata` avec le titre de pièce en
italique, filet de conduite pointillé entre les deux sur écran large.

## 16. Hero sections

Le hero est un **fil d'annonces** : 3 à 4 vues, chacune portant une actualité réelle et
distincte du festival, avec sa propre image, son propre titre et son propre lien.

**Ce n'est pas un carrousel décoratif.** La distinction est stricte :

| Interdit | Requis |
|---|---|
| Le même message décliné en 3 visuels | 3 actualités **différentes** |
| Des slides « ambiance » sans information | Une information datée par slide |
| Un slide sans lien ni destination | Chaque slide mène quelque part |
| Des slides ajoutés pour remplir | Moins d'annonces = moins de slides |

S'il n'existe qu'une seule annonce réelle, **le hero n'a qu'une vue** et le diaporama ne
s'active pas. Ne jamais inventer une annonce pour atteindre trois.

### Structure d'une vue

Registre encre. Quatre éléments, pas davantage :

1. **Surtitre** — la date ou la nature de l'annonce, en `Plex Mono` (§6)
2. **Titre court et frappant** — 4 à 8 mots, `--pas-2xl`, jamais une phrase complète
3. **Description brève** — 1 à 2 phrases, 30 mots maximum
4. **Un seul lien** — « En savoir plus », « Télécharger le communiqué », « Postuler »
L'**affiche ou le visuel de l'annonce** occupe la droite sur desktop, le dessus sur mobile.
Entière, jamais recadrée, cernée d'un filet 1 px (§13).

```
┌─────────────────────────────────────────────────────────┐
│ 0  15 JUIN 2026                        ┌──────────────┐ │
│ 1                                      │              │ │
│    Appel à                             │   VISUEL     │ │
│    candidatures                        │  DE L'ANNONCE│ │
│    ouvert                              │              │ │
│                                        │              │ │
│    Les troupes universitaires du monde └──────────────┘ │
│    entier peuvent déposer leur dossier                  │
│    jusqu'au 31 juillet.                                 │
│                                                         │
│    En savoir plus →                                     │
│                                              ──  ─  ─   │
└─────────────────────────────────────────────────────────┘
```

**Interdit dans un hero** : plus d'un lien par vue, texte sur image sans voile suffisant,
chevron animé, vidéo de fond sans propos, listes de faits, distribution complète.
Les faits pratiques du festival appartiennent aux sections suivantes, pas au hero.

### Source des annonces

Les annonces vivent dans **`data/annonces.json`**, jamais en dur dans le HTML :

```json
{
  "annonces": [
    {
      "surtitre": "15 juin 2026",
      "titre": "Appel à candidatures ouvert",
      "description": "Les troupes universitaires du monde entier peuvent déposer leur dossier jusqu'au 31 juillet.",
      "visuel": "media/annonces/appel-2026.jpg",
      "alt": "",
      "lien": "https://…",
      "libelleLien": "En savoir plus",
      "actif": true
    }
  ]
}
```

`actif: false` retire une annonce sans la supprimer. Le comité ajoute et retire des
annonces en éditant ce seul fichier, sans toucher au code.

### Transition et navigation

**Fondu-croisé uniquement.** Jamais de glissement horizontal, jamais de rebond.

- Le visuel entre en fondu avec un très léger zoom arrière (1,04 → 1), 1200 ms
- Le texte suit avec 200 ms de retard, en fondu et légère montée (12 px maximum)
- Défilement automatique toutes les 7 secondes, **suspendu au survol**, au focus clavier
  et quand l'onglet passe en arrière-plan
- Navigation par **filets horizontaux**, un par annonce, le filet actif se remplissant
  progressivement pour indiquer le temps restant — pas de puces rondes

> **Flèches, exception desktop (commit « hauteur + flèches »).** L'interdit valait pour
> le mobile et le tactile, où le balayage suffit. Dès 1024 px, deux `<button>`
> (`aria-label` « Annonce précédente »/« Annonce suivante ») dans les marges latérales,
> jamais par-dessus le texte ni le visuel — fond `--voile-barre`, `--rayon-plein`, flèche
> `--corail`, filet 1 px. Elles s'ajoutent aux filets, ne les remplacent pas : les filets
> restent la seule source de la position dans le fil. Un clic suspend le défilement
> automatique et le relance après 10 s. Désactivées et `aria-disabled` si une seule
> annonce est active — restent dans le DOM plutôt que d'en disparaître.
- Flèches gauche/droite au clavier, `aria-live="polite"` sur la zone de texte
- `prefers-reduced-motion` : aucune transition, aucun défilement automatique, les annonces
  s'empilent verticalement
Le nombre de vues est **lu depuis les données**, jamais codé en dur dans le JavaScript.

## 17. Navigation

### Barre translucide superposée

La navigation et le bandeau du Haut Patronage se **superposent au hero**, en translucide,
sans occuper de hauteur propre : le visuel commence en haut de l'écran et passe dessous.

```css
--voile-barre: rgba(10, 20, 40, 0.82);   /* --encre-nuit à 82 % */

.bandeau-patronage, #navbar {
  position: fixed;
  background: var(--voile-barre);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border-bottom: 1px solid var(--filet-sombre);
  box-shadow: none;
}

/* Repli obligatoire : sans backdrop-filter, on monte l'opacité */
@supports not (backdrop-filter: blur(1px)) {
  .bandeau-patronage, #navbar { background: rgba(10, 20, 40, 0.94); }
}
```

**L'opacité de 82 % n'est pas un choix esthétique, c'est un plancher calculé.** Dans le
pire cas — une image de fond entièrement blanche — le composite donne encore 9,4:1 avec
`--papier`. Sous 75 %, le texte passe en dessous du seuil AAA et devient illisible sur
les photos claires. Ne jamais descendre sous 0,80.

Au défilement, la barre **se densifie légèrement** : opacité de 0,82 à 0,92, flou de 14 px
à 20 px, sur `--duree-ui`. C'est le seul changement autorisé — pas d'ombre, pas de
réduction de hauteur, pas de disparition au défilement.

Le hero prévoit un **espace libre en haut** égal à la hauteur cumulée des deux barres,
pour qu'aucun contenu ne passe dessous.

Cinq entrées plus l'action de candidature en bouton plein. La page active est signalée
par un **filet sous le libellé**, jamais par une couleur seule.

Sur mobile, le menu s'ouvre en **plein écran, fond `--encre-nuit`**, entrées à l'échelle
de l'affiche. Le menu est lui-même un moment de design.

**Pas de numérotation des entrées** : un menu n'est pas une séquence, un numéro n'y porte
aucune information. La marge de régie reste vide dans le menu.

**La barre sociale latérale flottante est supprimée** — tic d'agence, gêne le défilement,
duplique le pied de page. Ne pas la réintroduire.

Le header et le footer vivent **uniquement** dans `partials.js`. Ne jamais les écrire en
dur dans une page.

## 18. Sections éditoriales

Chaque section commence par un **surtitre en marge** et un **titre aligné à gauche**.
**Jamais de titre de section centré.**

Les textes longs passent en `Literata`, colonne de 680 px. Pas de lettrine : ce serait un
troisième geste signature là où le §6 n'en autorise que deux (surtitre, ligne bilingue) —
le texte institutionnel se distingue déjà par son registre et sa colonne de lecture, il
n'a pas besoin d'un troisième signal.

**Une énumération de 4 à 6 éléments courts se compose en grille, jamais en empilement
vertical.** L'empilement convient au texte qui se lit dans l'ordre ; une énumération se
parcourt, elle a besoin d'une surface. Asymétrie possible et bienvenue — un élément plus
large ou plus haut que les autres (le premier, le plus important) casse la monotonie
d'une grille régulière sans retomber dans la carte : filet, échelle et numérotation réelle
(jamais décorative, §36) suffisent à porter la hiérarchie.

## 19. Programme du festival

Page prioritaire, absente aujourd'hui.

**Grille jour × lieu** : cinq colonnes de jours, les lieux en lignes. Chaque case est une
entrée de programme. Filtres par jour, lieu et pays, **reflétés dans l'URL**
(`?jour=2&lieu=beckett`), avec canonique vers la page non filtrée.

Sur mobile, la matrice devient une **liste chronologique** avec ancres par jour. Le jour
courant est ouvert par défaut pendant le festival.

## 20. Spectacles

Unité d'information : **titre original · titre traduit · troupe · université · pays ·
langue · durée · lieu · horaire**.

Le titre original s'affiche dans sa langue et son sens de lecture. Un titre arabe se
compose en arabe, en RTL, dans `--police-arabe`. Le titre traduit vient dessous, en
`Literata` italique.

Le synopsis est un texte de revue, pas un texte de carte : il a droit à sa colonne.

## 21. Artistes

Une pièce est une **fiche d'œuvre**, pas une carte. Chaque fiche relie l'œuvre à son
université, son pays et son édition. Ces liens transforment le site en réseau consultable
plutôt qu'en suite de pages isolées.

Pas de portraits ronds, pas de « meet the team ». Les personnes apparaissent en ligne de
générique : portrait carré, nom, fonction.

## 22. Universités

Page à créer. Plus de 200 troupes en dix-neuf ans, plus de 20 pays : c'est l'argument de
crédibilité le plus fort auprès des partenaires comme des troupes candidates.

**Index alphabétique par pays**, en composition d'archive : pays, université, ville,
éditions de participation. Dense, factuel, sobre. **Pas de carte du monde animée**, pas
de compteur global, pas de drapeaux en émoji.

## 23. Participants

Festivaliers, bénévoles, jury, intervenants. Registre archive. Toujours reliés à une
édition. Les chiffres se présentent en **compteurs animés** (ci-dessous), à leur valeur
finale :

```
9 pays · 12 spectacles · 130 festivaliers · 100 bénévoles · 840 nuitées
```

### Les compteurs animés

Les chiffres clés se comptent de 0 jusqu'à leur valeur à l'apparition, sur tout le site.

Encadrement obligatoire, sinon l'effet bascule dans le registre commercial :

- **Une seule fois par session.** Déclenché à la première apparition dans le champ de
  vision, jamais rejoué, même si l'on remonte.
- **900 ms, `--courbe-sortie`**, jamais linéaire : le décompte ralentit en fin de course.
- **`font-variant-numeric: tabular-nums`** obligatoire, sinon la largeur du bloc tressaute
  à chaque incrément.
- **Le suffixe n'apparaît qu'à l'arrivée** : `200+` ne s'affiche qu'une fois 200 atteint.
- **La valeur finale est écrite dans le HTML**, pas seulement en `data-target` : sans
  JavaScript, le chiffre reste lisible et indexable.
- **`prefers-reduced-motion` : valeur finale affichée immédiatement**, sans décompte.
- Aucun autre élément de la page n'est animé pendant le décompte.

## 24. Éditions précédentes

Jamais une grille de cartes. La forme dépend du nombre d'entrées :

- **6 entrées ou moins** — frise verticale. L'année occupe la marge de régie en très
  grande échelle ; l'affiche et le résumé occupent le contenu. On descend dans le temps,
  du présent au passé. Le passage est un mouvement, pas une pagination.
- **Plus de 6 entrées** — bande horizontale d'affiches (§30, `nos-editions.html`, LOT 5
  révisé). Une frise verticale uniforme, appliquée sans limite, enterre le contenu
  ancien sous le défilement : au-delà de 6 entrées, la profondeur du site doit rester
  parcourable d'un geste, pas d'un défilement sans fin. Chaque entrée : affiche en 3:4,
  ordinal et année en dessous, lien entier vers la fiche complète (jamais un panneau ni
  une modale — dupliquer la fiche la rendrait invisible aux moteurs). `scroll-snap-type:
  x mandatory`, jamais de scroll détourné en JavaScript. Un filet de progression sous la
  bande plutôt que des pastilles — même esprit que la navigation du hero (§16), lecture
  continue plutôt que pagination.
  Affiches manquantes : remplacement typographique (fond `--encre-coulisse`, année à
  `--pas-2xl`, numéro d'édition en `--police-donnees`), au même ratio 3:4 qu'une vraie
  affiche — pas un cadre vide répété, et rien à changer dans la mise en page le jour où
  les vraies affiches arrivent.

> **Flèches, exception desktop (commit « flèches + mise en avant centrale »).** Même
> amendement qu'au hero (§16), même composant (`.fleche-nav`) : dès 1024 px, deux
> `<button>` (`aria-label` « Édition précédente »/« Édition suivante ») dans les marges
> latérales de la bande, jamais par-dessus les vignettes — fond `--voile-barre`,
> `--rayon-plein`, flèche `--corail`, filet 1 px. Elles s'ajoutent au filet de
> progression, ne le remplacent pas. Un clic fait défiler d'une vignette,
> `scroll-behavior: smooth`. Désactivée et `aria-disabled` en bout de bande — jamais
> retirée du DOM. La barre de défilement native est masquée (`scrollbar-width`,
> `::-webkit-scrollbar`), jamais le défilement lui-même : balayage tactile, trackpad et
> clavier continuent de fonctionner sans changement.
>
> **Mise en avant centrale (même commit).** L'édition au centre de la bande porte
> l'échelle 1 (sa taille normale — l'échelle ne dépasse jamais 1, rien ne grossit
> au-delà de la taille propre de la vignette, ce qui réserve sa place dès le départ et
> évite tout tressautement de page), ses deux voisines immédiates 0,94, le reste au
> repos à 0,86 (opacité assortie, encore AA sur `--encre-nuit` — vérifié au calcul).
> Transition sur `--duree-contenu`/`--courbe-sortie`. Détection par
> `IntersectionObserver` sur le conteneur de la bande, jamais par un calcul de
> `scrollLeft` à chaque frame. `scroll-snap-align: center` (et non `start`) ; le
> padding latéral du conteneur vaut la moitié de sa largeur visible moins la moitié
> d'une vignette, pour que la première et la dernière puissent elles aussi atteindre le
> centre. L'édition active porte un surtitre visible : son année passe en `--corail`.
> Effet strictement décoratif — année et numéro d'édition restent lisibles à toute
> échelle, y compris au repos ; aucune information n'est portée par la mise à l'échelle
> elle-même. Sur mobile et sous `prefers-reduced-motion` : aucune mise à l'échelle,
> toutes les vignettes à taille égale, l'observateur n'est même pas créé.

Sur la fiche d'une édition, l'ordre suit celui d'un programme imprimé :
**affiche → dates → thème → chiffres → sélection → palmarès → hommages → galerie →
documents**.

## 25. Archives

Toutes les données d'édition vivent **uniquement** dans `data/editions.json`. Ne jamais
coder en dur un palmarès, une sélection ou une liste de troupes dans le HTML.

Le rendu masque automatiquement tout bloc dont la donnée est vide (`""` ou `[]`).
Conserver ce comportement dans toute nouvelle section. Toute sortie HTML issue du JSON
passe par la fonction `esc()`.

## 26. Palmarès

141 prix : l'actif documentaire du festival. Composition en **distribution** (§15).

**Deux lectures obligatoires :**
- **par édition** — chronologique, dans la fiche d'édition
- **par prix** — « tous les Grands Prix depuis 2007 », une histoire que le site actuel
  ne permet pas de lire
Intitulés de prix en `Plex Mono`, titres de pièces en `Literata` italique.

**Le Grand Prix est le seul élément distingué**, et la manière dépend du registre :
- en registre **papier**, il porte `--rideau` en couleur de texte (11,92:1)
- en registre **encre ou rideau**, `--rideau` serait illisible en texte (1,4:1) : la ligne
  devient alors un **bloc de fond `--rideau`** avec le texte en `--papier` dessus
Le palmarès reste **du texte indexable**, jamais une image.

## 27. Actualités

Format éditorial : date en surtitre, titre en `Readex Pro`, chapeau en `Literata`.

**À ne créer que si le comité s'engage sur un rythme de publication.** Une section
d'actualités vide nuit davantage qu'elle n'aide. Le signaler à l'utilisateur avant de la
construire.

## 28. Pages institutionnelles

ASAU, patronage, partenaires, dossier de partenariat. **Registre papier intégralement** :
`--papier`, `Literata`, colonne de lecture de 680 px, aucune image décorative.

La page Partenaires manque aujourd'hui alors que le dossier de sponsoring existe. Logos
en grille sobre, par niveau de partenariat, **sans défilement ni animation**.

## 29. Contact

Une page, pas un formulaire générique. **Trois entrées distinctes selon le besoin réel** :
candidature de troupe, demande presse, partenariat — chacune avec son destinataire.

Adresse physique en composition d'archive, avec **plan statique**. Pas de carte
interactive tierce qui charge des centaines de kilooctets de JavaScript.

⚠️ Deux jeux de contacts contradictoires existent dans les sources. Ne pas trancher seul,
demander à l'utilisateur.

## 30. Responsive design

**Conçu pour mobile, pas corrigé après coup.** Le trafic est majoritairement mobile, et
quasi exclusivement mobile pendant les cinq jours du festival.

```css
/* Trois points de rupture, en min-width uniquement */
@media (min-width: 600px)  { }   /* tablette */
@media (min-width: 1024px) { }   /* desktop */
@media (min-width: 1440px) { }   /* large */
```

- **Aucune règle `max-width`** dans le nouveau code
- Le surtitre passe au-dessus du contenu ; la marge de régie disparaît sans que la
  hiérarchie s'effondre
- Le titre de hero conserve son échelle maximale sur mobile
- Cibles tactiles de **48 px minimum**, zone de clic élargie sur les éléments fins
- **Aucune information ni action dépendante du survol**
- `@media (hover: none)` neutralise tous les effets de survol
## 31. Accessibilité

- **Contrastes** : AAA pour tout texte courant ; le corail et le corail-clair sont en AA
  (6,01:1 et 5,79:1), acceptable pour titres, accents et libellés. Vérifier tout nouveau
  couple par calcul WCAG, jamais à l'estime.
- **Ne jamais appliquer `opacity` à du texte** : l'opacité réduit le contraste réel.
- `lang` et `dir` corrects sur tout contenu non français, police adaptée
- Focus visible : `--corail`, 2 px, décalage 3 px, jamais supprimé
- Hiérarchie de titres stricte, **un seul `h1` par page**
- `prefers-reduced-motion` : le lever de rideau devient une apparition instantanée
- Filtres utilisables au clavier, changements annoncés en `aria-live`
- Aucune information portée par la couleur seule
- Conserver le `skip-link`
## 32. Performance

Public au Maroc, souvent en 4G.

- Images rapatriées en local, **AVIF/WebP** avec `srcset`
- Le hero est le **seul** élément préchargé ; tout le reste en `loading="lazy"`
- Polices `woff2` **auto-hébergées**, sous-ensembles latin + arabe, `font-display: swap`
- **Aucune librairie tierce, aucun framework, aucun build.** HTML/CSS/JS natif.
- Cible : moins de **200 ko** à la première vue hors images
- Ne jamais minifier : le projet doit rester lisible et éditable à la main
## 33. SEO

Le contenu est un gisement de longue traîne inexploité.

- Conserver le JSON-LD `Festival` ; ajouter `TheaterEvent` par spectacle,
  `CreativeWork` par pièce, `Organization` par université
- Une URL propre par édition et par spectacle plutôt que `?n=18`
- Filtres reflétés dans l'URL, canonique vers la page non filtrée
- `title`, `meta description`, `canonical` et Open Graph **rédigés par page**, jamais
  générés par gabarit
- Titres arabes indexés en arabe avec `lang`
- Palmarès en texte, jamais en image
- Maintenir les redirections 301 existantes
- Mettre à jour `sitemap.xml` après tout ajout de page ou d'édition
## 34. Motion design

**Un seul moment orchestré, puis le silence.**

**Le lever de rideau** — au chargement de l'accueil : le noir de salle occupe l'écran,
le surtitre s'inscrit ligne à ligne comme un surtitrage réel, le titre monte, l'image
apparaît en dernier en fondu lent. Deux secondes. Une seule fois. Jamais rejoué.

Partout ailleurs, quatre comportements couvrent tout le site — reproductibles, pas
réinventés page par page :

**1. Apparition au défilement.** Opacité seule, 400 ms (`--duree-contenu`), aucune
translation. S'applique au contenu de chaque section (`.contenu-regie`), jamais à la
section elle-même : le fond de registre est déjà peint par la section, seul son contenu
entre en fondu — faire l'inverse laisserait voir le fond de page pendant la transition.
Dans une grille ou une liste répétée (galerie, fiches de lieu, générique d'équipe,
distribution, entrées de programme…), un décalage de 60 ms sépare chaque élément —
**jamais davantage : plafonné à 4 paliers (0, 60, 120, 180 ms), le reste à 240 ms**, sinon
l'apparition traîne au lieu d'accompagner l'œil.

**2. Survol des éléments cliquables.** Tout élément cliquable qui porte un filet
(fiche, entrée de bande d'affiches…) change la couleur de ce filet vers l'accent
du registre au survol ; son texte fait de même. `--duree-ui` (200 ms). Un élément non
cliquable ne réagit jamais au survol.

> **Exception UI Fiteat (commit « interactions »), comité validé.** Ce point excluait
> jusqu'ici tout `transform: scale` et toute ombre au survol — la règle reste la
> position par défaut, mais `.bouton`, `.nav-links .btn-apply` et `.affiche-entree-lien`
> (les boutons et les cartes cliquables compactes) en sortent explicitement :
> `translateY(-2px) scale(1.04)` au survol, `scale(0.96)` à l'appui, 200 ms
> (`--duree-ui`), neutralisés sous `@media (hover: none)` et `prefers-reduced-motion`.
> Ne pas étendre au-delà de ces trois sélecteurs sans le signaler : les liens de texte
> pleine largeur (index de liens, presse, distribution…) gardent le seul changement de
> couleur — Fiteat lui-même ne met pas ses lignes de commande à l'échelle, seulement ses
> boutons et ses cartes.

**3. Images.** Au survol d'une entrée cliquable, la photographie passe de
`saturate(0.75)` (état de repos, §13) à `saturate(1)`, sur `--duree-contenu`. C'est le
**seul** effet d'image autorisé — jamais de zoom, jamais d'assombrissement.

**4. Liens de texte.** Un filet se déploie de gauche à droite sous le texte au survol,
200 ms (`--duree-ui`). Implémenté en **largeur** (`width: 0 → 100%`), jamais en
`transform: scaleX` : l'interdit « jamais de mise à l'échelle » vise l'agrandissement
d'un élément déjà visible (carte, image, icône), pas un filet qui n'existe pas avant le
survol et se construit sous le mot.

Exception distincte, propre aux deux barres fixes (§17) : leur densité (opacité, flou)
répond à la position de défilement en continu — ce n'est ni une apparition ni un survol,
et §17 en fixe seul l'encadrement.

`prefers-reduced-motion` respecté systématiquement — sans exception pour ces quatre
comportements, ni pour les compteurs animés du §23 (qui affichent leur valeur finale
d'emblée, sans décompte).

**Tokens de mouvement — aucune durée ni courbe en dur :**

```css
--duree-ui:      200ms;   /* survol, focus, ouverture de menu */
--duree-contenu: 400ms;   /* apparition au défilement */
--duree-hero:   1200ms;   /* lever de rideau */

--courbe-sortie: cubic-bezier(0.22, 1, 0.36, 1);   /* apparitions */
--courbe-entree: cubic-bezier(0.65, 0, 0.35, 1);   /* disparitions */
```

Une seule courbe par type de mouvement. Ne pas introduire de ressort ni de rebond.

Le mouvement le plus fort du site reste la bascule encre ↔ rideau ↔ papier au défilement.

**Interdits** : parallaxe, machine à écrire, rebond, `transform: scale`
au survol, apparitions en cascade, curseur personnalisé, défilement détourné,
animation qui ne sert pas le sujet.

« Apparitions en cascade » désigne un défilé long et démonstratif (nombreux éléments,
délais croissants sans plafond) — pas le décalage de 60 ms plafonné à 4 paliers du point 1
ci-dessus, qui accompagne une grille plutôt que de la mettre en scène.

## 35. Règles de contenu visuel

- **Aucun chiffre inventé.** Sources : `data/editions.json`, Guide 2025, dossier de
  sponsoring 2026. À défaut, `[à confirmer]`.
- **Aucun faux contenu** de remplissage. Un gabarit vide se signale par des crochets.
- **Crédits photographiques visibles** sous chaque image.
- **Le nom des œuvres, troupes et universités est écrit exactement** comme dans la source.
- Registre d'écriture : **factuel, direct, phrase courte**. Voix active. Pas de
  superlatif, pas de « unique », « inoubliable », « exceptionnel ».
- Les libellés d'action décrivent ce qui se passe : « Déposer une candidature », pas
  « Cliquez ici » ni « Postuler maintenant ».
## 35 bis. Convention de code CSS

- **Toute section porte sa classe de registre** : `.registre-encre`, `.registre-rideau`
  ou `.registre-papier`. Elle n'est pas décorative — elle pilote le fond, la couleur de
  texte et les états d'interaction accessibles. Un composant ne définit jamais ses propres
  couleurs d'état : il hérite de son registre.
- **Noms de classes en français**, en minuscules, mots séparés par un tiret :
  `.entree-programme`, `.fiche-archive`, `.marge-regie`
- Variante d'un composant : suffixe `--` → `.bouton--primaire`, `.fiche-archive--a-venir`
- Élément interne : suffixe `-` → `.distribution-ligne`, `.entree-programme-meta`
- État : préfixe `est-` → `.est-actif`, `.est-ouvert`
- **Un seul niveau d'imbrication** de sélecteur au maximum
- Ordre des déclarations : positionnement → boîte → typographie → couleur → mouvement
- Les composants sont regroupés par bloc commenté dans `style.css`, jamais dispersés
- **Ne jamais faire dépendre la mise en forme d'un sélecteur d'élément** (`section`, `div`)
  qui entrerait en conflit de spécificité avec une classe. Marges et espacements entre
  sections passent exclusivement par des classes.
## 36. Anti-patterns à éviter

Chacun de ces éléments est présent ou l'a été dans le code, et doit disparaître :

| Anti-pattern | Pourquoi |
|---|---|
| `box-shadow` hors `--ombre-bloc`/`--ombre-accent` | élévation Material Design sans retenue |
| `linear-gradient` hors `--degrade-corail` | ornement sans justification |
| Bandeau de logos défilant | « Trusted by » de landing page SaaS |
| Compte à rebours en quatre blocs | vocabulaire de lancement de produit |
| Portraits ronds | avatars d'interface |
| Titres de section centrés | absence de composition |
| Attributs `style=` en ligne | bloquent le rebranding par tokens |
| Carrousel de hero | aveu de non-choix |
| Barre sociale latérale flottante | tic d'agence |
| Numérotation 01/02/03 sans séquence réelle | décor déguisé en structure |
| Palette crème + or + serif à fort contraste | esthétique générative par défaut |

---

# DO NOT

**Règles absolues. Ne jamais enfreindre sans instruction explicite de l'utilisateur
dans la conversation en cours.**

## Esthétique

- ❌ Ne pas produire une esthétique SaaS, startup, agence ou landing page commerciale
- ❌ Ne pas utiliser de crème `#f7f3ec` + or `#b8922a` + serif à fort contraste — c'est
  l'esthétique générative par défaut, et c'est l'ancienne palette du site
- ❌ Ne pas utiliser `--corail` sur `--papier` (2,72:1) ni `--rideau` en texte sur fond
  sombre (1,4:1) — voir §10
- ❌ Ne pas faire une page entièrement sombre : le registre papier occupe au minimum 30 %
- ❌ Ne pas enchaîner deux blocs `--rideau` consécutifs
- ❌ Ne pas utiliser Montserrat, Cormorant Garamond, Poppins, Inter, Playfair Display,
  Archivo, Newsreader ni Paris2024 (propriétaire des JO Paris 2024, §9)
- ❌ Ne pas utiliser de dégradé décoratif ni de neumorphisme, hors `--degrade-corail`
  sur un bouton à fond plein (§6, §10)
- ❌ Ne pas utiliser de translucidité ailleurs que sur les barres fixes (§17)
- ❌ Ne pas utiliser de dégradé violet/bleu générique
- ❌ Ne pas mettre dans le hero une annonce inventée, ni plus d'un lien par vue
- ❌ Ne pas arrondir au-delà de `--rayon-l` (32 px), sauf `--rayon-plein` pour un avatar
  ou une puce (§6)
- ❌ Ne pas ajouter d'ombre hors `--ombre-bloc`/`--ombre-accent` (§6), et pas à chaque
  élément qui porte un rayon — seulement aux grands visuels et aux boutons à fond plein
- ❌ Ne pas centrer un titre de section
- ❌ Ne pas construire une page uniquement avec des cartes
- ❌ Ne pas introduire une bibliothèque d'icônes
- ❌ Ne pas utiliser d'emoji dans l'interface
## Culture

- ❌ Ne pas utiliser de zellige, arabesque, moucharabieh, main de Fatma, calligraphie
  décorative, palmier, théière, babouche
- ❌ Ne pas produire de « couchant marocain » en dégradé orange
- ❌ Ne pas traiter le Haut Patronage comme un badge marketing
- ❌ Ne pas afficher un titre arabe en police de repli système
- ❌ Ne pas oublier `lang` et `dir` sur un contenu non français
## Contenu

- ❌ Ne pas inventer un chiffre, une date, un nom de troupe ou un palmarès
- ❌ Ne pas remplir un gabarit avec du faux contenu — utiliser `[à confirmer]`
- ❌ Ne pas coder en dur des données d'édition dans le HTML
- ❌ Ne pas employer de vocabulaire commercial ni de superlatif
- ❌ Ne pas afficher un palmarès sous forme d'image
## Technique

- ❌ Ne pas introduire de framework, de build, de npm, de Tailwind
- ❌ Ne pas écrire de valeur hexadécimale ou d'espacement en dur — toujours une variable
- ❌ Ne pas écrire d'attribut `style=` en ligne
- ❌ Ne pas écrire de `@media (max-width: …)` dans le nouveau code
- ❌ Ne pas dupliquer le header ou le footer hors de `partials.js`
- ❌ Ne pas supprimer le `skip-link`, le `focus-visible` ni `prefers-reduced-motion`
- ❌ Ne pas casser une balise SEO ni un bloc JSON-LD existant
- ❌ Ne pas minifier le code
## Mouvement

- ❌ Ne pas ajouter de parallaxe, de curseur personnalisé, de défilement détourné
- ❌ Ne pas animer un compteur hors de l'encadrement du §23 (linéaire, rejoué au retour,
  sans `tabular-nums`, valeur finale absente du HTML)
- ❌ Ne pas mettre à l'échelle au survol, sauf `.bouton`, `.nav-links .btn-apply` et
  `.affiche-entree-lien` (§34, exception UI Fiteat) — jamais ailleurs sans le signaler
- ❌ Ne pas ajouter d'animation qui ne serve pas le sujet
---

# CONTRÔLE AVANT LIVRAISON

Vérifier ces onze points avant d'annoncer qu'un travail visuel est terminé.

- [ ] Le registre (salle ou scène) est explicite et cohérent
- [ ] Chaque surtitre porte un fait vérifiable
- [ ] Aucune carte là où une distribution, une entrée de programme ou une fiche convient
- [ ] Aucune valeur de couleur ou d'espacement en dur
- [ ] Aucun `border-radius` > 2 px, aucune ombre d'élévation
- [ ] Aucun titre de section centré
- [ ] Contrastes vérifiés en AAA
- [ ] Testé à 375 px avant 1440 px
- [ ] `lang` et `dir` corrects sur tout contenu non français
- [ ] Images : `alt`, `width`, `height`, `loading`, crédit visible
- [ ] Aucun chiffre inventé ; les manques sont marqués `[à confirmer]`
- [ ] **Rendu vérifié visuellement** — capture d'écran à 375 px et à 1440 px si
      l'environnement le permet, sinon relecture du HTML produit bloc par bloc
- [ ] **Test du défaut ③** — sans le surtitrage et sans la bascule de registres, la page
      garderait-elle une identité FITUT ? Si non, elle n'est pas terminée.
Si un point échoue, corriger avant de livrer. Si un point ne peut pas être respecté,
le signaler explicitement à l'utilisateur avec la raison.
