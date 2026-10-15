import { useMemo, useState, type ReactNode } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';
import { normalize } from '../lib/text';

export function LexiquePage() {
  const [filtre, setFiltre] = useState('Tous');
  const [q, setQ] = useState('');
  const domaines = useMemo(() => ['Tous', ...[...new Set(D.lexique.map((l) => l.domaine))].sort()], []);
  const nq = normalize(q);
  const rows = D.lexique.filter(
    (l) => (filtre === 'Tous' || l.domaine === filtre) && (!nq || normalize(`${l.terme} ${l.definition}`).includes(nq))
  );

  const items: ReactNode[] = [];
  let lettre = '';
  for (const l of rows) {
    const L = (normalize(l.terme)[0] ?? '').toUpperCase();
    if (L !== lettre) {
      lettre = L;
      items.push(
        <div className="group-title" key={`g-${L}`}>
          {L}
        </div>
      );
    }
    items.push(
      <div className="row" key={l.terme}>
        <h3>{l.terme}</h3>
        <div className="meta">
          <span className="tag">{l.domaine}</span>
        </div>
        <p>{l.definition}</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">De A à Z</p>
        <h1>Lexique</h1>
        <p className="lead">Les termes de la cyber expliqués en une ou deux phrases.</p>
      </div>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Chercher un terme…"
          aria-label="Chercher un terme"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="count">
          {rows.length} / {D.lexique.length}
        </span>
      </div>
      <ChipRow values={domaines} current={filtre} onPick={setFiltre} style={{ marginBottom: 14 }} />
      <div className="list">{rows.length === 0 ? <div className="empty">Aucun terme ne correspond.</div> : items}</div>
    </>
  );
}
