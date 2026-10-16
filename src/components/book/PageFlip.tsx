import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Carnet.module.css';

type Side = 'left' | 'right';

interface LeafState {
  key: string;
  content: ReactNode;
  side: Side;
}

/**
 * Carnet à deux pages (format obligatoire du projet, voir mémoire) : une page gauche et une page droite,
 * reliées au centre. Tourner vers la suite anime la page DROITE qui pivote sur la reliure (comme un vrai
 * carnet) pour révéler le nouveau contenu posé dessous ; revenir en arrière anime symétriquement la page
 * GAUCHE. Coupé en instantané si `reducedMotion` (pas de rotation animée).
 */
export function PageFlip({
  pageKey,
  direction,
  reducedMotion,
  decoration,
  left,
  right,
}: {
  pageKey: string;
  /** Sens du dernier changement de page ; détermine quelle page pivote. */
  direction: 'next' | 'prev' | null;
  reducedMotion: boolean;
  /** Élément fixe au-dessus des pages (ex. la reliure), qui ne pivote jamais. */
  decoration?: ReactNode;
  left: ReactNode;
  right: ReactNode;
}) {
  const [leaf, setLeaf] = useState<LeafState | null>(null);
  const [flipped, setFlipped] = useState(false);
  const keyRef = useRef(pageKey);
  const leftRef = useRef(left);
  const rightRef = useRef(right);

  useEffect(() => {
    if (pageKey !== keyRef.current && !reducedMotion && direction) {
      const side: Side = direction === 'next' ? 'right' : 'left';
      setLeaf({
        key: keyRef.current,
        content: side === 'right' ? rightRef.current : leftRef.current,
        side,
      });
      setFlipped(false);
      requestAnimationFrame(() => setFlipped(true));
    }
    keyRef.current = pageKey;
    leftRef.current = left;
    rightRef.current = right;
  }, [pageKey, left, right, direction, reducedMotion]);

  return (
    <div className={styles.bookFrame}>
      <div className={styles.leftPage}>{left}</div>
      <div className={styles.rightPage}>{right}</div>
      {leaf && (
        <div
          className={[
            styles.leaf,
            leaf.side === 'right' ? styles.leafRight : styles.leafLeft,
            flipped ? styles.leafFlipped : '',
          ].join(' ')}
          onTransitionEnd={() => setLeaf(null)}
        >
          {leaf.content}
        </div>
      )}
      {decoration}
    </div>
  );
}
