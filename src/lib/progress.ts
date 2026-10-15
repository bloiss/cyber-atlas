import type { Parcours } from '../types/parcours';

export function computeProgress(phases: Parcours, done: Record<string, boolean>): { fait: number; total: number } {
  let total = 0;
  let fait = 0;
  for (const phase of phases) {
    for (const etape of phase.etapes) {
      total++;
      if (done[etape.id]) fait++;
    }
  }
  return { fait, total };
}
