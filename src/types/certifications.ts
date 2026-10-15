/* Généré à partir de schemas/certifications.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Certifications = {
  nom: string;
  organisme: string;
  /**
   * 1 Premier pas, 2 Junior, 3 Confirmé, 4 Expert
   */
  niveau: 1 | 2 | 3 | 4;
  voie: 'Généraliste' | 'Défensif' | 'Offensif' | 'Gouvernance';
  format: 'QCM' | 'Pratique' | 'Mixte';
  cout: 'Gratuit' | '€' | '€€' | '€€€';
  quand: string;
  lien: string;
}[];
