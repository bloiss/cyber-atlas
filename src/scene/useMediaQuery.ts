import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);

  useEffect(() => {
    const mql = matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Mobile allégé (exigence 2) : moins de rendu, pas de post-processing. */
export function useIsSmallScreen(): boolean {
  return useMediaQuery('(max-width: 640px)');
}

/** Coupe toute animation de caméra/rotation (exigence 3). */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
