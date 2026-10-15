export const PAGE_IDS = [
  'accueil',
  'parcours',
  'methode',
  'routine',
  'plateformes',
  'toolbox',
  'bibliotheque',
  'lexique',
  'cheatsheets',
  'anki',
  'veille',
  'charte',
  'bonnes-pratiques',
  'eloquence',
  'projets',
  'metiers',
  'certifications',
  'rennes',
  'a-propos',
  'recherche',
] as const;

export type PageId = (typeof PAGE_IDS)[number];
