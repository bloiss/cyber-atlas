import { useEffect, useState } from 'react';

/** Porte show()/initNav() de l'ancien app.js : routage par ancre, avec repli sur `fallback`. */
export function useHashRoute(validIds: readonly string[], fallback = 'accueil'): string {
  const resolve = (id: string) => (validIds.includes(id) ? id : fallback);

  const [route, setRoute] = useState<string>(() => resolve(location.hash.slice(1)));

  useEffect(() => {
    const onHashChange = () => setRoute(resolve(location.hash.slice(1)));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return route;
}
