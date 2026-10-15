# Cyber Atlas

Le hub francophone pour progresser en cybersécurité, chaque jour : parcours de 6 mois, plateformes d'entraînement,
toolbox, bibliothèque, lexique, cartes Anki, veille, métiers, certifications et écosystème cyber de Rennes.

Site **statique** : HTML, CSS et JavaScript, sans framework ni étape de compilation. Tu ouvres, tu modifies, tu vois le
résultat.

---

## 1. Lancer le site dans VS Code (2 minutes)

1. Ouvre le dossier `cyber-atlas` dans VS Code (**Fichier → Ouvrir le dossier…**).
2. VS Code propose d'installer les **extensions recommandées** : accepte. La plus importante est **Live Server**.
3. Fais un clic droit sur `index.html` → **Open with Live Server**.
4. Le site s'ouvre sur `http://127.0.0.1:5500` et se recharge tout seul à chaque sauvegarde.

> Ne double-clique pas sur `index.html` : le navigateur bloque le chargement des fichiers `data/*.json` sans serveur, et
> le site affiche alors un message « Données non chargées ».

## 2. Comment le projet est rangé

```
cyber-atlas/
├── index.html          La structure de toutes les pages (une section par page)
├── css/style.css       Le design : couleurs, polices, mise en page, thème clair/sombre
├── js/app.js           La logique : navigation, filtres, recherche, progression
├── data/               LE CONTENU, en JSON : c'est ici que tu agrandis le site
│   ├── plateformes.json
│   ├── toolbox.json
│   ├── bibliotheque.json
│   ├── lexique.json
│   ├── veille.json
│   ├── parcours.json
│   ├── metiers.json
│   ├── certifications.json
│   ├── anki.json
│   └── projets.json
├── assets/             Logo, favicon, paquet Anki (.apkg) et cartes en CSV
├── schemas/            Règles qui vérifient tes JSON pendant que tu tapes
└── .vscode/            Réglages et extensions recommandées
```

**Règle d'or : pour ajouter du contenu, tu modifies seulement un fichier dans `data/`.** Le site se met à jour tout
seul, compteurs compris.

## 3. Agrandir le site : exemples

### Ajouter un outil à la Toolbox

Dans `data/toolbox.json`, ajoute un bloc dans la liste (attention à la virgule entre deux blocs) :

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

Dans `data/lexique.json` :

```json
{ "terme": "SBOM", "domaine": "Défense", "definition": "Liste des composants d'un logiciel, pour savoir vite s'il contient une faille connue." }
```

### Ajouter une étape au parcours

Dans `data/parcours.json`, ajoute une étape dans la bonne période. Donne-lui un `id` unique (il sert à mémoriser la
case cochée) :

```json
{ "id": "2-4", "titre": "Monter un mini-SOC avec Wazuh", "livrable": "Un tableau de bord avec 3 alertes testées.", "lien": "https://wazuh.com" }
```

### Ajouter une nouvelle page (exemple : « Projets »)

1. **`index.html`** : copie une section existante, par exemple celle de la Veille, et change son attribut :
   `<section class="page" data-page="projets" hidden> … </section>`
2. **`index.html`**, dans la barre de navigation (`<nav class="nav">`) : ajoute `<a href="#projets">Projets</a>`.
3. Si la page a des données : crée `data/projets.json`, ajoute `'projets'` dans la liste `FICHIERS` en haut de
   `js/app.js`, écris une fonction `renderProjets()` sur le modèle de `renderVeille()`, et appelle-la dans `init()`.

### Changer les couleurs

Tout est dans le bloc `:root` en haut de `css/style.css` (thème clair), puis dans les deux blocs suivants (thème
sombre). Change `--accent` pour changer la couleur principale partout.

## 4. Mettre le site en ligne (gratuit)

**GitHub Pages** (recommandé, ça te fait aussi un portfolio) :

1. Crée un compte sur GitHub et un dépôt `cyber-atlas`.
2. Dans VS Code : onglet **Contrôle de code source** → **Publier sur GitHub**.
3. Sur GitHub : **Settings → Pages → Branch : main → Save**.
4. Ton site est en ligne sur `https://<ton-pseudo>.github.io/cyber-atlas/`.

Autre option : **Netlify** ou **Cloudflare Pages**, en glissant simplement le dossier sur leur site.

## 5. Idées pour la suite

- [x] Une page **Projets** qui présente tes write-ups et projets (ton portfolio) — ajoute tes entrées dans `data/projets.json`.
- [ ] Une page **Agenda** des CTF et événements rennais, depuis un `data/agenda.json` daté.
- [ ] Un mode **quiz** qui tire 10 cartes de `anki.json` au hasard.
- [ ] Un compteur de jours consécutifs (« série ») dans la checklist du jour.
- [ ] Un vrai formulaire de contribution (Formspree, Netlify Forms ou Tally) à la place du bouton « Copier ».
- [ ] Un nom de domaine à toi (environ 10 € par an).

## 6. Règles du projet

- Chaque ressource : un lien officiel en `https://` et une phrase qui dit **pourquoi** elle vaut le temps du lecteur.
- Revoir les liens régulièrement et mettre à jour la date « Liens revus le … » (pied de page et page Plateformes).
- Éthique d'abord : rien qui sorte du cadre des labs et des plateformes autorisées (voir la page Charte).

Dernière revue du contenu : 15 octobre 2026.
