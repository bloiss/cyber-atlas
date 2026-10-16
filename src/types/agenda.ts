/* Généré à partir de schemas/agenda.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Agenda = {
  nom: string;
  type: "Conférence" | "CTF" | "Salon";
  lieu: string;
  /**
   * AAAA-MM-JJ. Omis si la date officielle n'est pas encore annoncée (utiliser periodeLibre à la place).
   */
  debut?: string;
  /**
   * AAAA-MM-JJ. Omis si la date officielle n'est pas encore annoncée.
   */
  fin?: string;
  /**
   * Texte libre utilisé seulement quand debut/fin sont absents, ex. « Chaque printemps (mars), dates 2027 à annoncer ».
   */
  periodeLibre?: string;
  lien: string;
  /**
   * Une phrase : pourquoi s'y intéresser
   */
  description: string;
}[];
