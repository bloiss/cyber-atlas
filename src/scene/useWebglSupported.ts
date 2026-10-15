import { useState } from 'react';

function detectWebgl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Repli 2D silencieux si WebGL est indisponible (exigence 4 du brief 3D). */
export function useWebglSupported(): boolean {
  const [supported] = useState(detectWebgl);
  return supported;
}
