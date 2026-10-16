/* Généré à partir de schemas/plateformes.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Plateformes = {
  nom: string;
  niveau: "Débutant" | "Intermédiaire" | "Avancé" | "Tous niveaux";
  /**
   * @minItems 1
   */
  domaines: [string, ...string[]];
  langue: "FR" | "EN";
  cout: "Gratuit" | "Freemium" | "Payant";
  lien: string;
  pourquoi: string;
}[];
