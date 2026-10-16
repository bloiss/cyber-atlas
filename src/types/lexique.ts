/* Généré à partir de schemas/lexique.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Lexique = {
  terme: string;
  domaine: "Général" | "Réseau" | "Web" | "Système" | "Crypto" | "Attaque" | "Défense" | "Organisation";
  /**
   * Une ou deux phrases, en langage simple
   */
  definition: string;
}[];
