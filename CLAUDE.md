# Contexte du projet Cyber Atlas

Ce fichier est lu par Claude Code au début de chaque conversation. Il résume le projet et la façon d'y travailler.

## Qui et pourquoi

- Projet de Loïs, étudiant en cybersécurité à **Ynov Campus Rennes**.
- Objectif : un **site de référence francophone** pour progresser en cyber, chaque jour, et à terme un projet
  d'entreprise. Exigence : qualité supérieure, ressources vérifiées, rien de bâclé.
- Le site accompagne aussi la routine personnelle de Loïs : parcours de 6 mois (octobre → avril), méthode
  d'apprentissage (rappel actif, répétition espacée, sommeil), veille quotidienne et entraînement à l'oral.
- Une version Notion existe aussi (« Cyber Atlas », avec un espace perso privé séparé). Le site est la version publique.

## Stack

- **Vite + React + TypeScript strict**, `npm run dev` (serveur de dev) / `npm run build` (build + vérif TS) /
  `npm run preview`. Depuis la Phase 1 (migration 3D en cours, voir plus bas), ce n'est plus un site 100 % statique
  sans build — mais la règle d'or reste : **tout le contenu est dans `src/data/*.json`**, on ajoute une ressource en
  modifiant le JSON, jamais le code.
- `src/data/*.json` (plateformes, toolbox, bibliotheque, veille, parcours, metiers, certifications, lexique, anki,
  projets), importés statiquement par `src/data/index.ts` et typés via `src/types/*.ts`, **générés** depuis
  `schemas/*.schema.json` par `npm run gen:types` (ne pas éditer `src/types/` à la main). Après avoir ajouté un
  champ ou une valeur d'enum dans un schéma, relancer `npm run gen:types`.
- Navigation par ancre, portée en React (`src/hooks/useHashRoute.ts`) : un composant par page sous `src/pages/`,
  affiché/masqué selon `location.hash`, exactement comme avant (`#toolbox`, `#veille`…). Les liens de nav sont dans
  `src/components/Nav.tsx`.
- La progression des visiteurs (parcours, ressources vues, checklist du jour, thème) reste dans `localStorage`, mêmes
  clés préfixées `atlas:` qu'avant la migration (`src/hooks/useLocalStorage.ts`) — ne jamais changer ce préfixe, les
  visiteurs existants perdraient leur progression.
- CSS : `src/styles/global.css` (repris tel quel de l'ancien `style.css`, variables `:root` incluses), importé une
  fois dans `main.tsx`. CSS Modules réservés aux styles propres à un composant ajouté après la Phase 1 (habillage 3D
  notamment) — ne pas redécouper le design system existant sans raison.
- Schémas JSON dans `schemas/` (un par fichier de `src/data/`), branchés dans `.vscode/settings.json`.
- `oxlint` pour le lint (`npm run lint`), `prettier` pour le format (`.prettierrc`, formatOnSave dans VS Code).

## Design

- Couleurs en variables CSS dans `:root` (thème clair) et redéfinies pour le thème sombre (media query + `data-theme`).
  Toujours passer par les variables, jamais de couleur en dur.
- Polices : Bricolage Grotesque (titres), IBM Plex Sans (texte), JetBrains Mono (code, étiquettes).
- Identité : bleu `#1F6FEB`, vert `#3FB950`, fond nuit `#0B1220`. Logo dans `public/assets/logo.svg`.
- Le site doit rester lisible sur téléphone (400 px) sans défilement horizontal.

## Règles de contenu

- Tout le texte est en **français**, simple et direct, en tutoyant le lecteur.
- Chaque ressource : un lien officiel en `https://` et une phrase qui dit pourquoi elle vaut le temps du lecteur.
- Vérifier les faits datés (dates d'événements, prix, éditions comme l'OWASP Top 10:2025) avant de les écrire.
- Mettre à jour « Liens revus le … » (pied de page et page Plateformes) après une revue des liens.
- **Éthique** : le site est pédagogique et défensif. Les commandes offensives restent génériques et réservées aux labs et
  plateformes autorisées. Pas de payloads d'exploitation prêts à l'emploi. Toujours renvoyer vers la page Charte
  (articles 323-1 et suivants du Code pénal).

## Migration 3D (en cours, par phases validées une à une)

Objectif : transformer le site en expérience immersive 3D façon Awwwards (React Three Fiber, GSAP/ScrollTrigger,
Lenis), sans jamais sacrifier le contenu ni l'accessibilité — un visiteur doit pouvoir trouver un outil ou un terme
en moins de 10 secondes, au clavier et au lecteur d'écran, même sans WebGL.

- **Phase 1 — faite** : migration Vite + React + TS à l'identique, sans 3D (voir Stack ci-dessus).
- **Phase 2** : scène 3D d'accueil. Concept retenu : **constellation réseau** (pas de globe) — un graphe de nœuds
  reliés par des arêtes lumineuses bleu/vert, chaque nœud = une section du site. Même moteur de graphe réutilisé en
  Phase 4 pour Toolbox (amas par catégorie) et Parcours (chaîne de 6 étapes qui s'allume). Piste à creuser pour la
  page Méthode : une variante « cerveau/arbre de neurones » du même moteur, chaque principe d'apprentissage (rappel
  actif, répétition espacée, sommeil…) comme une branche lumineuse — cohérent avec le langage visuel déjà choisi.
- **Phase 3** : navigation caméra liée au scroll (GSAP ScrollTrigger + Lenis), coupée si `prefers-reduced-motion`.
- **Phase 4** : Parcours et Toolbox en 3D.
- **Phase 5** : perf (Lighthouse ≥ 90 desktop — à mesurer dans un vrai Chrome, pas d'outil headless disponible ici),
  accessibilité, repli 2D si WebGL absent.
- **Phase 6** : déploiement GitHub Pages + GitHub Actions.

Charte et Toolbox : l'habillage 3D ne doit jamais diluer leur message (avertissement légal, usage réservé aux labs
et plateformes autorisées) — Charte reste volontairement sans 3D.

## Idées en attente

- Page **Agenda** des CTF et événements rennais, depuis `src/data/agenda.json`.
- Mode **quiz** qui tire 10 cartes de `anki.json`.
- Compteur de jours consécutifs dans la checklist du jour.
- Vrai formulaire de contribution (Formspree, Netlify Forms ou Tally).
- Nom de domaine perso après la mise en ligne (Phase 6).
