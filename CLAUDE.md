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

- Site **statique** : `index.html` + `css/style.css` + `js/app.js`, sans framework ni compilation.
- **Tout le contenu est dans `data/*.json`** (plateformes, toolbox, bibliotheque, veille, parcours, metiers,
  certifications, lexique, anki, projets). Pour ajouter du contenu, modifier le JSON, pas le code.
- `js/app.js` charge les JSON avec `fetch` : le site doit être servi (extension Live Server, port 5500).
- Navigation par ancre : chaque page est une `<section class="page" data-page="...">` dans `index.html`, affichée selon
  `location.hash`. Les liens de navigation sont dans `<nav class="nav">`.
- La progression des visiteurs (parcours, ressources vues, checklist du jour, thème) est stockée dans `localStorage`
  (clés préfixées `atlas:`).
- Schémas JSON dans `schemas/` (toolbox, lexique, plateformes), branchés dans `.vscode/settings.json`.

## Design

- Couleurs en variables CSS dans `:root` (thème clair) et redéfinies pour le thème sombre (media query + `data-theme`).
  Toujours passer par les variables, jamais de couleur en dur.
- Polices : Bricolage Grotesque (titres), IBM Plex Sans (texte), JetBrains Mono (code, étiquettes).
- Identité : bleu `#1F6FEB`, vert `#3FB950`, fond nuit `#0B1220`. Logo dans `assets/logo.svg`.
- Le site doit rester lisible sur téléphone (400 px) sans défilement horizontal.

## Règles de contenu

- Tout le texte est en **français**, simple et direct, en tutoyant le lecteur.
- Chaque ressource : un lien officiel en `https://` et une phrase qui dit pourquoi elle vaut le temps du lecteur.
- Vérifier les faits datés (dates d'événements, prix, éditions comme l'OWASP Top 10:2025) avant de les écrire.
- Mettre à jour « Liens revus le … » (pied de page et page Plateformes) après une revue des liens.
- **Éthique** : le site est pédagogique et défensif. Les commandes offensives restent génériques et réservées aux labs et
  plateformes autorisées. Pas de payloads d'exploitation prêts à l'emploi. Toujours renvoyer vers la page Charte
  (articles 323-1 et suivants du Code pénal).

## Idées en attente

- Page **Agenda** des CTF et événements rennais, depuis `data/agenda.json`.
- Mode **quiz** qui tire 10 cartes de `anki.json`.
- Compteur de jours consécutifs dans la checklist du jour.
- Vrai formulaire de contribution (Formspree, Netlify Forms ou Tally).
- Mise en ligne sur GitHub Pages, puis nom de domaine.
