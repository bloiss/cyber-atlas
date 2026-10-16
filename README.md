# Cyber Atlas

Le hub francophone pour progresser en cybersécurité, chaque jour : parcours de 6 mois, plateformes d'entraînement,
toolbox, bibliothèque, lexique, cartes Anki, veille, métiers, certifications, projets et écosystème cyber de Rennes.

Le site est construit avec **Vite + React + TypeScript strict**. Une migration vers une expérience 3D immersive
(React Three Fiber) est en cours, par phases validées une à une — voir `CLAUDE.md` pour le détail de la feuille de
route. Le principe ne change pas : **tout le contenu vit dans `src/data/*.json`**, tu modifies le JSON, le site se
met à jour tout seul.

---

## 1. Lancer le site (2 minutes)

Prérequis : [Node.js](https://nodejs.org) (version 20 ou plus).

```bash
npm install
npm run dev
```

Le site s'ouvre sur `http://localhost:5173` (ou le port suivant libre) et se recharge tout seul à chaque sauvegarde.

Autres commandes utiles :

```bash
npm run build      # build de production + vérification TypeScript stricte
npm run preview    # sert le build de production en local, pour vérifier avant mise en ligne
npm run lint        # oxlint sur src/
npm run gen:types   # régénère src/types/*.ts à partir de schemas/*.schema.json
```

## 2. Comment le projet est rangé

```
cyber-atlas/
├── index.html            Point d'entrée Vite (head, <div id="root">)
├── src/
│   ├── main.tsx           Montage de React
│   ├── App.tsx             Layout racine : header, nav, routage par ancre
│   ├── routes.ts           Liste des pages (#toolbox, #veille…)
│   ├── components/         Header, Nav, Footer, ChipRow, Page, Lien…
│   ├── pages/               Un composant par page du site
│   ├── hooks/                useLocalStorage, useTheme, useHashRoute
│   ├── lib/                   Petits utilitaires (recherche, niveaux, progression)
│   ├── styles/global.css     Le design : couleurs, polices, mise en page, thème clair/sombre
│   ├── data/                  LE CONTENU, en JSON : c'est ici que tu agrandis le site
│   │   ├── plateformes.json
│   │   ├── toolbox.json
│   │   ├── bibliotheque.json
│   │   ├── lexique.json
│   │   ├── veille.json
│   │   ├── parcours.json
│   │   ├── metiers.json
│   │   ├── certifications.json
│   │   ├── anki.json
│   │   ├── projets.json
│   │   ├── agenda.json
│   │   ├── cours-linux.json
│   │   ├── cours-python.json
│   │   ├── cours-sql.json
│   │   ├── cours-reseau.json
│   │   ├── matieres.ts        Les 4 matières (id, nom, description), pas un JSON (liste fixe)
│   │   └── index.ts          Importe et type tous les JSON ci-dessus
│   └── types/                 Types TypeScript générés depuis schemas/ (ne pas éditer à la main)
├── public/assets/         Logo, favicon, paquet Anki (.apkg) et cartes en CSV (servis tels quels)
├── schemas/                Schémas JSON qui vérifient src/data/*.json pendant que tu tapes
├── scripts/gen-types.mjs  Génère src/types/ à partir de schemas/
└── .vscode/                Réglages et extensions recommandées
```

**Règle d'or : pour ajouter du contenu, tu modifies seulement un fichier dans `src/data/`.** Le site se met à jour
tout seul, compteurs compris.

## 3. Agrandir le site : exemples

### Ajouter un outil à la Toolbox

Dans `src/data/toolbox.json`, ajoute un bloc dans la liste (attention à la virgule entre deux blocs) :

```json
{
  "nom": "Bloodhound",
  "categorie": "Pentest",
  "niveau": "Avancé",
  "description": "Cartographie les chemins d'attaque dans un Active Directory de lab.",
  "lien": "https://github.com/SpecterOps/BloodHound"
}
```

Grâce aux schémas, VS Code souligne en rouge une catégorie ou un niveau qui n'existe pas.

### Ajouter un terme au lexique

Dans `src/data/lexique.json` :

```json
{ "terme": "SBOM", "domaine": "Défense", "definition": "Liste des composants d'un logiciel, pour savoir vite s'il contient une faille connue." }
```

### Ajouter une étape au parcours

Dans `src/data/parcours.json`, ajoute une étape dans la bonne période. Donne-lui un `id` unique (il sert à mémoriser
la case cochée) :

```json
{ "id": "2-4", "titre": "Monter un mini-SOC avec Wazuh", "livrable": "Un tableau de bord avec 3 alertes testées.", "lien": "https://wazuh.com" }
```

### Ajouter un projet / write-up

Dans `src/data/projets.json` : `titre`, `type` (Write-up CTF / Lab / Projet perso / Rapport d'incident), `niveau`,
`date` (AAAA-MM), `resume`, `outils` et `lien` (laisse `""` si pas encore publié).

### Ajouter un chapitre de cours

Dans le bon `src/data/cours-<matiere>.json`, ajoute un bloc avec un `ordre` qui le place dans la séquence :
`id`, `titre`, `ordre`, `duree`, `objectifs` (liste), `contenuMarkdown` (le cours, en Markdown), `memo` (liste des
points essentiels) et `exercices` (liste de `{ enonce, indice?, solution }`). Le chapitre apparaît automatiquement
dans la liste de la matière, compteurs compris.

### Changer une valeur possible (enum) dans un schéma

1. Édite `schemas/<fichier>.schema.json` (ex. ajouter une catégorie à `toolbox.schema.json`).
2. Relance `npm run gen:types` pour régénérer le type TypeScript correspondant.

### Ajouter une nouvelle page

1. Crée `src/pages/MaPage.tsx` sur le modèle d'une page existante proche (ex. `VeillePage.tsx` pour une liste
   simple, `ToolboxPage.tsx` pour une liste filtrable).
2. Ajoute l'identifiant de la page dans `src/routes.ts` (`PAGE_IDS`).
3. Ajoute le lien dans `src/components/Nav.tsx` et la section `<Page id="ma-page" current={route}>` dans `App.tsx`.
4. Si la page a des données : crée `src/data/ma-page.json` + `schemas/ma-page.schema.json`, ajoute-le dans
   `src/data/index.ts`, relance `npm run gen:types`.

### Changer les couleurs

Tout est dans le bloc `:root` en haut de `src/styles/global.css` (thème clair), puis dans les deux blocs suivants
(thème sombre). Change `--accent` pour changer la couleur principale partout.

## 4. Mettre le site en ligne

Le site se déploie automatiquement sur GitHub Pages à chaque push sur `master`, via `.github/workflows/deploy.yml`
(build Vite, puis publication). URL : `https://<ton-pseudo>.github.io/cyber-atlas/`.

En local, `vite.config.ts` fixe `base: '/cyber-atlas/'` pour que les chemins fonctionnent sous ce sous-dossier — si
tu renommes un jour le dépôt, mets à jour cette valeur. Si le déploiement ne se déclenche pas après un push,
vérifie sur GitHub : **Settings → Pages → Source** doit être réglé sur **GitHub Actions**.

## 5. Idées pour la suite

- [x] Une page **Projets** qui présente tes write-ups et projets (ton portfolio) — ajoute tes entrées dans `src/data/projets.json`.
- [x] Une page **Agenda** des grandes conférences et CTF mondiaux, depuis `src/data/agenda.json`.
- [x] Une section **Cours** (Linux/Bash, Python, SQL, Réseau) avec exercices guidés et fiches PDF téléchargeables.
- [x] Un **Carnet de révision** (`#carnet`) qui feuillette les cartes Anki en carnet deux pages.
- [x] Un **Bloc-notes** (`#bloc-notes`) pour tes notes libres, sauvegardées dans ce navigateur.
- [ ] Un mode **quiz** qui tire 10 cartes de `anki.json` au hasard.
- [ ] Un compteur de jours consécutifs (« série ») dans la checklist du jour.
- [ ] Un vrai formulaire de contribution (Formspree, Netlify Forms ou Tally) à la place du bouton « Copier ».
- [ ] Un nom de domaine à toi (environ 10 € par an), après la mise en ligne.

## 6. Règles du projet

- Chaque ressource : un lien officiel en `https://` et une phrase qui dit **pourquoi** elle vaut le temps du lecteur.
- Revoir les liens régulièrement et mettre à jour la date « Liens revus le … » (pied de page et page Plateformes).
- Éthique d'abord : rien qui sorte du cadre des labs et des plateformes autorisées (voir la page Charte).
- La progression des visiteurs vit dans `localStorage`, clés préfixées `atlas:` — ne jamais changer ce préfixe.

Dernière revue du contenu : 15 octobre 2026.
