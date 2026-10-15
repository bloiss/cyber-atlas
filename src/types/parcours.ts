/* Généré à partir de schemas/parcours.schema.json par `npm run gen:types`. Ne pas éditer à la main. */

export type Parcours = {
  periode: string;
  titre: string;
  /**
   * @minItems 1
   */
  etapes: [
    {
      /**
       * Identifiant unique, utilisé pour mémoriser la case cochée
       */
      id: string;
      titre: string;
      livrable: string;
      /**
       * Laisse vide si l'étape n'a pas de ressource dédiée
       */
      lien: ('' | string) & string;
    },
    ...{
      /**
       * Identifiant unique, utilisé pour mémoriser la case cochée
       */
      id: string;
      titre: string;
      livrable: string;
      /**
       * Laisse vide si l'étape n'a pas de ressource dédiée
       */
      lien: ('' | string) & string;
    }[],
  ];
}[];
