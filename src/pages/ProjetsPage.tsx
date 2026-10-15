import { useMemo, useState } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';
import { Lien } from '../components/Lien';
import { niveauClasse } from '../lib/text';

export function ProjetsPage() {
  const [filtre, setFiltre] = useState('Tous');
  const types = useMemo(() => ['Tous', ...new Set(D.projets.map((p) => p.type))], []);
  const rows = D.projets
    .filter((p) => filtre === 'Tous' || p.type === filtre)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Le portfolio qui prouve la pratique</p>
        <h1>Projets et write-ups</h1>
        <p className="lead">
          Chaque write-up, lab ou projet fait pendant le parcours, dans l'ordre inverse. Un recruteur ou un jury regarde
          ça avant le CV.
        </p>
      </div>
      <div className="toolbar">
        <ChipRow values={types} current={filtre} onPick={setFiltre} />
        <span className="count">
          {rows.length} / {D.projets.length}
        </span>
      </div>
      <div className="list">
        {rows.length === 0 ? (
          <div className="empty">
            Aucun projet pour l'instant. Ajoute ton premier write-up dans src/data/projets.json.
          </div>
        ) : (
          rows.map((p) => (
            <div className="row" key={p.titre}>
              <h3>
                <Lien href={p.lien}>{p.titre}</Lien>
              </h3>
              <div className="meta">
                <span className={`tag ${niveauClasse(p.niveau)}`}>{p.niveau}</span>
                <span className="tag">{p.type}</span>
                <span className="tag mono">{p.date}</span>
              </div>
              <p>
                {p.resume}
                {p.outils && p.outils.length > 0 && (
                  <span className="mono" style={{ fontSize: '.75rem' }}>
                    {' '}
                    {p.outils.join(' · ')}
                  </span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
      <p className="note" style={{ marginTop: 16 }}>
        Pour ajouter un projet : complète <code>src/data/projets.json</code> avec <code>titre</code>, <code>type</code>,{' '}
        <code>niveau</code>, <code>date</code> (AAAA-MM), <code>resume</code>, <code>outils</code> et <code>lien</code>{' '}
        (vers le write-up ou le dépôt GitHub, laisse "" si pas encore publié).
      </p>
    </>
  );
}
