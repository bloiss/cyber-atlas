import { useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

/** Porte initTheme() de l'ancien app.js : thème sauvegardé dans `atlas:theme`, posé sur <html data-theme>. */
export function useTheme(): { toggle: () => void } {
  const [saved, setSaved] = useLocalStorage<Theme | null>('theme', null);

  useEffect(() => {
    if (saved) document.documentElement.dataset.theme = saved;
  }, [saved]);

  const toggle = useCallback(() => {
    const current =
      (document.documentElement.dataset.theme as Theme | undefined) ??
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setSaved(next);
  }, [setSaved]);

  return { toggle };
}
