/* Généré à partir de schemas/metiers.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Metiers = {
  metier: string;
  equipe: "Défense" | "Offensif" | "Gouvernance" | "Ingénierie";
  quotidien: string;
  competences: string;
  salaire: string;
  sortieEcole: string;
  certifs: string;
}[];
