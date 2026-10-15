/* Généré à partir de schemas/projets.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Projets = {
  titre: string;
  type: 'Write-up CTF' | 'Lab' | 'Projet perso' | "Rapport d'incident";
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  /**
   * Année-mois, pour trier du plus récent au plus ancien
   */
  date: string;
  /**
   * Une ou deux phrases : ce qui a été fait et ce qui en a été retenu
   */
  resume: string;
  outils?: string[];
  /**
   * Vers le write-up ou le dépôt GitHub. Laisse vide si pas encore publié.
   */
  lien: ('' | string) & string;
}[];
