/* Généré à partir de schemas/veille.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Veille = {
  source: string;
  type: 'Officiel' | 'Média cyber' | 'Média tech' | 'Enquête' | 'Base de failles';
  langue: 'FR' | 'EN';
  frequence: 'Chaque jour' | 'Hebdo' | '2–3 fois / sem.';
  lien: string;
  contenu: string;
}[];
