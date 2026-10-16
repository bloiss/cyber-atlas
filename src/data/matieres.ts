export type MatiereId = 'linux' | 'python' | 'sql' | 'reseau';

export interface Matiere {
  id: MatiereId;
  nom: string;
  description: string;
}

export const MATIERES: Matiere[] = [
  {
    id: 'linux',
    nom: 'Linux / Bash',
    description: 'Le terminal, les fichiers, les permissions, les premiers scripts.',
  },
  { id: 'python', nom: 'Python', description: 'Le langage le plus utilisé en cyber : bases, structures, réseau.' },
  { id: 'sql', nom: 'SQL', description: 'Lire et écrire des requêtes, et comprendre les injections SQL.' },
  { id: 'reseau', nom: 'Réseau (TCP/IP, HTTP)', description: "Des fondamentaux à la lecture d'une capture Wireshark." },
];
