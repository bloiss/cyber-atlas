import type { ReactNode } from 'react';
import type { PageId } from '../routes';

export function Page({ id, current, children }: { id: PageId; current: string; children: ReactNode }) {
  return (
    <section className="page" data-page={id} hidden={current !== id}>
      {children}
    </section>
  );
}
