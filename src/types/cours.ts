/* Généré à partir de schemas/cours.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Cours = {
  /**
   * Identifiant unique du chapitre dans la matière (slug)
   */
  id: string;
  titre: string;
  ordre: number;
  /**
   * Ex. « 20 min »
   */
  duree: string;
  /**
   * @minItems 1
   */
  objectifs: [string, ...string[]];
  /**
   * Corps du cours en Markdown (##, listes, ```blocs de code```)
   */
  contenuMarkdown: string;
  /**
   * Points essentiels à retenir
   *
   * @minItems 1
   */
  memo: [string, ...string[]];
  exercices: {
    enonce: string;
    indice?: string;
    solution: string;
  }[];
}[];
