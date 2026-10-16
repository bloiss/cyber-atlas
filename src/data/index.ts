import toolbox from './toolbox.json';
import lexique from './lexique.json';
import plateformes from './plateformes.json';
import projets from './projets.json';
import veille from './veille.json';
import parcours from './parcours.json';
import metiers from './metiers.json';
import certifications from './certifications.json';
import bibliotheque from './bibliotheque.json';
import anki from './anki.json';
import agenda from './agenda.json';
import coursLinux from './cours-linux.json';
import coursPython from './cours-python.json';
import coursSql from './cours-sql.json';
import coursReseau from './cours-reseau.json';

import type { Toolbox } from '../types/toolbox';
import type { Lexique } from '../types/lexique';
import type { Plateformes } from '../types/plateformes';
import type { Projets } from '../types/projets';
import type { Veille } from '../types/veille';
import type { Parcours } from '../types/parcours';
import type { Metiers } from '../types/metiers';
import type { Certifications } from '../types/certifications';
import type { Bibliotheque } from '../types/bibliotheque';
import type { Anki } from '../types/anki';
import type { Agenda } from '../types/agenda';
import type { Cours } from '../types/cours';
import type { MatiereId } from './matieres';

/**
 * Toutes les données du site, typées à partir des schémas JSON (voir schemas/ + `npm run gen:types`).
 * Ajouter une ressource = modifier le fichier .json correspondant, rien d'autre.
 */
export const D = {
  toolbox: toolbox as Toolbox,
  lexique: lexique as Lexique,
  plateformes: plateformes as Plateformes,
  projets: projets as Projets,
  veille: veille as Veille,
  parcours: parcours as Parcours,
  metiers: metiers as Metiers,
  certifications: certifications as Certifications,
  bibliotheque: bibliotheque as Bibliotheque,
  anki: anki as Anki,
  agenda: agenda as Agenda,
  cours: {
    linux: coursLinux as Cours,
    python: coursPython as Cours,
    sql: coursSql as Cours,
    reseau: coursReseau as Cours,
  } satisfies Record<MatiereId, Cours>,
};

export type ToolboxItem = Toolbox[number];
export type LexiqueItem = Lexique[number];
export type PlateformeItem = Plateformes[number];
export type ProjetItem = Projets[number];
export type VeilleItem = Veille[number];
export type ParcoursPhase = Parcours[number];
export type MetierItem = Metiers[number];
export type CertificationItem = Certifications[number];
export type BibliothequeItem = Bibliotheque[number];
export type AnkiCard = Anki[number];
export type AgendaItem = Agenda[number];
export type CoursChapitre = Cours[number];
export type Exercice = CoursChapitre['exercices'][number];
