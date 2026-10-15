/* Généré à partir de schemas/toolbox.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Toolbox = {
  /**
   * Nom de l'outil
   */
  nom: string;
  categorie:
    | 'Réseau'
    | 'Web'
    | 'OSINT'
    | 'Crypto'
    | 'Stéganographie'
    | 'Forensic'
    | 'Reverse'
    | 'Mots de passe'
    | 'Pentest'
    | 'Défense'
    | 'Lab';
  niveau: 'Essentiel' | 'Utile' | 'Avancé';
  /**
   * Une phrase : à quoi ça sert
   */
  description: string;
  lien: string;
}[];
