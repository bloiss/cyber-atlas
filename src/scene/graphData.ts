export type NavGroup = 'Démarrer' | 'Apprendre' | 'Pratiquer' | 'Avancer';

export interface ConstellationNode {
  id: string;
  label: string;
  href: string;
  group: NavGroup;
  position: readonly [number, number, number];
}

export interface ConstellationEdge {
  from: string;
  to: string;
}

/**
 * Mêmes groupes et mêmes libellés que la nav (src/components/Nav.tsx), sans Accueil (c'est le point de vue, pas
 * un nœud du graphe) ni Recherche (ce n'est pas une section de contenu).
 */
const GROUPS: { name: NavGroup; items: { id: string; label: string }[] }[] = [
  {
    name: 'Démarrer',
    items: [
      { id: 'parcours', label: 'Parcours 6 mois' },
      { id: 'methode', label: "Méthode d'apprentissage" },
      { id: 'routine', label: 'Routine' },
    ],
  },
  {
    name: 'Apprendre',
    items: [
      { id: 'plateformes', label: 'Plateformes' },
      { id: 'bibliotheque', label: 'Bibliothèque' },
      { id: 'lexique', label: 'Lexique' },
      { id: 'cheatsheets', label: 'Cheatsheets' },
      { id: 'anki', label: 'Cartes Anki' },
    ],
  },
  {
    name: 'Pratiquer',
    items: [
      { id: 'toolbox', label: 'Toolbox' },
      { id: 'veille', label: 'Veille' },
      { id: 'charte', label: 'Charte éthique' },
      { id: 'bonnes-pratiques', label: 'Bonnes pratiques' },
    ],
  },
  {
    name: 'Avancer',
    items: [
      { id: 'eloquence', label: 'Éloquence' },
      { id: 'projets', label: 'Projets' },
      { id: 'metiers', label: 'Métiers' },
      { id: 'certifications', label: 'Certifications' },
      { id: 'rennes', label: 'Écosystème Rennes' },
      { id: 'a-propos', label: 'À propos' },
    ],
  },
];

/** Liens réellement présents dans le contenu (voir ToolboxPage/MethodePage) : le graphe sert la navigation, il ne la décore pas. */
const CONTENT_EDGES: ConstellationEdge[] = [
  { from: 'toolbox', to: 'charte' },
  { from: 'methode', to: 'anki' },
];

const CLUSTER_RADIUS = 3.2;
const NODE_RADIUS = 0.95;
const GROUP_Y_OFFSET = [0.6, -0.3, 0.3, -0.6] as const;

export interface ConstellationGraph {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
}

/** Disposition procédurale et déterministe (aucun hasard) : 4 ancres de cluster, nœuds en cercle autour de chacune. */
export function buildGraph(): ConstellationGraph {
  const nodes: ConstellationNode[] = [];
  const edges: ConstellationEdge[] = [...CONTENT_EDGES];

  GROUPS.forEach((group, gi) => {
    const groupAngle = (gi / GROUPS.length) * Math.PI * 2;
    const anchorX = Math.cos(groupAngle) * CLUSTER_RADIUS;
    const anchorZ = Math.sin(groupAngle) * CLUSTER_RADIUS;
    const anchorY = GROUP_Y_OFFSET[gi] ?? 0;
    const phase = gi * 0.3;

    group.items.forEach((item, ni) => {
      const nodeAngle = (ni / group.items.length) * Math.PI * 2 + phase;
      const position: [number, number, number] = [
        anchorX + Math.cos(nodeAngle) * NODE_RADIUS,
        anchorY + Math.sin(ni * 1.7) * 0.25,
        anchorZ + Math.sin(nodeAngle) * NODE_RADIUS,
      ];
      nodes.push({ id: item.id, label: item.label, href: `#${item.id}`, group: group.name, position });

      const next = group.items[(ni + 1) % group.items.length];
      if (next && group.items.length > 1) edges.push({ from: item.id, to: next.id });
    });
  });

  return { nodes, edges };
}
