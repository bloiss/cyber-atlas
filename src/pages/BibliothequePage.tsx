import { useMemo, useState } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';
import { Lien } from '../components/Lien';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function BibliothequePage() {
  const [filtre, setFiltre] = useState('Tout');
  const [vu, setVu] = useLocalStorage<Record<string, boolean>>('vu', {});
  const formats = useMemo(() => ['Tout', ...new Set(D.bibliotheque.map((b) => b.format))], []);
  const rows = D.bibliotheque.filter((b) => filtre === 'Tout' || b.format === filtre);
  const nVu = D.bibliotheque.filter((b) => vu[b.titre]).length;

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">1 vidéo de théorie = 1 session de pratique</p>
        <h1>Bibliothèque</h1>
        <p className="lead">
          Chaînes YouTube, cours, documentaires, podcasts et livres. Marque ce que tu as vu : c'est gardé dans ce
          navigateur.
        </p>
      </div>
      <div className="toolbar">
        <ChipRow values={formats} current={filtre} onPick={setFiltre} />
        <span className="count">
          {nVu} vu{nVu > 1 ? 's' : ''} sur {D.bibliotheque.length}
        </span>
      </div>
      <div className="list">
        {rows.map((b) => (
          <div className="row" key={b.titre}>
            <h3>
              <Lien href={b.lien}>{b.titre}</Lien>
            </h3>
            <div className="meta">
              <span className="tag">{b.format}</span>
              <span className="tag">{b.langue}</span>
              <label className="tag" style={{ cursor: 'pointer', gap: 6 }}>
                <input
                  type="checkbox"
                  checked={!!vu[b.titre]}
                  onChange={(e) => setVu((s) => ({ ...s, [b.titre]: e.target.checked }))}
                  style={{ accentColor: 'var(--ok)' }}
                />{' '}
                vu
              </label>
            </div>
            <p>
              {b.pourquoi}{' '}
              <span className="mono" style={{ fontSize: '.75rem' }}>
                {b.themes.join(' · ')}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
