/** Minuscules, sans accents : pour une recherche insensible aux accents et à la casse. */
export function normalize(s: string | undefined | null): string {
  return String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

const NIVEAU_CLASSE: Record<string, string> = {
  Débutant: 'lvl-1',
  Essentiel: 'lvl-1',
  Intermédiaire: 'lvl-2',
  Utile: 'lvl-2',
  Avancé: 'lvl-3',
  'Tous niveaux': 'lvl-0',
};

/** Classe CSS de couleur associée à un niveau (`.tag.lvl-1/2/3/0` dans global.css). */
export function niveauClasse(niveau: string): string {
  return NIVEAU_CLASSE[niveau] ?? '';
}
