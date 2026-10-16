import { useEffect, useMemo, useState } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';
import { PageFlip } from '../components/book/PageFlip';
import { usePrefersReducedMotion } from '../scene/useMediaQuery';
import styles from '../components/book/Carnet.module.css';

const SPINE_RINGS = 10;

export function CarnetPage() {
  const [theme, setTheme] = useState('Tous');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [coverOpen, setCoverOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const themes = useMemo(() => ['Tous', ...new Set(D.anki.map((a) => a.theme))], []);
  const cards = useMemo(() => D.anki.filter((a) => theme === 'Tous' || a.theme === theme), [theme]);
  const card = cards[Math.min(index, cards.length - 1)];

  useEffect(() => {
    if (reducedMotion) return;
    const t = setTimeout(() => setCoverOpen(true), 500);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  function changeTheme(next: string) {
    setDirection(null);
    setTheme(next);
    setIndex(0);
    setRevealed(false);
  }

  function goTo(next: number, dir: 'next' | 'prev') {
    if (next < 0 || next >= cards.length) return;
    setDirection(dir);
    setIndex(next);
    setRevealed(false);
  }

  if (!card) return null;

  const decoration = (
    <>
      <div className={styles.spine} aria-hidden="true">
        {Array.from({ length: SPINE_RINGS }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      {!reducedMotion && (
        <div className={`${styles.cover} ${coverOpen ? styles.coverOpen : ''}`} aria-hidden="true">
          <p className="eyebrow">Carnet de révision</p>
          <h2 style={{ margin: 0 }}>Cyber Atlas</h2>
          <p className="muted" style={{ margin: 0 }}>
            {D.anki.length} fiches, une par page.
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Une carte, une page</p>
        <h1>Carnet de révision</h1>
        <p className="lead">
          Les mêmes cartes que la page Anki, mises en scène pour une révision continue : feuillette au lieu de faire
          défiler.
        </p>
      </div>
      <div className="toolbar">
        <ChipRow values={themes} current={theme} onPick={changeTheme} />
      </div>
      <div className={styles.wrap}>
        <div className={styles.book}>
          <PageFlip
            pageKey={`${theme}-${index}`}
            direction={direction}
            reducedMotion={reducedMotion}
            decoration={decoration}
            left={
              <>
                <p className={`eyebrow ${styles.cardTheme}`}>{card.theme}</p>
                <p className={styles.question}>{card.question}</p>
              </>
            }
            right={
              <>
                <p className="eyebrow">Réponse</p>
                {revealed ? (
                  <p className={styles.answer}>{card.reponse}</p>
                ) : (
                  <>
                    <p className="muted">Essaie de répondre de tête avant de regarder.</p>
                    <button className="btn" onClick={() => setRevealed(true)}>
                      Retourner la carte
                    </button>
                  </>
                )}
              </>
            }
          />
        </div>
        <div className={styles.controls}>
          <button className="btn" onClick={() => goTo(index - 1, 'prev')} disabled={index === 0}>
            ← Précédent
          </button>
          <span className={styles.counter}>
            {index + 1} / {cards.length}
          </span>
          <button className="btn primary" onClick={() => goTo(index + 1, 'next')} disabled={index === cards.length - 1}>
            Suivant →
          </button>
        </div>
      </div>
    </>
  );
}
