import type { ReactNode } from 'react';

/** Porte lien() de l'ancien app.js : lien externe si une URL existe, sinon simple texte. */
export function Lien({ href, children }: { href: string; children: ReactNode }) {
  if (!href) return <>{children}</>;
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}
