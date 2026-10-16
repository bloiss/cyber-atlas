/* Généré à partir de schemas/bibliotheque.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Bibliotheque = {
  titre: string;
  format: "YouTube" | "Cours" | "Documentaire" | "Série" | "Podcast" | "Livre";
  /**
   * @minItems 1
   */
  themes: [string, ...string[]];
  langue: "FR" | "EN";
  lien: string;
  pourquoi: string;
}[];
