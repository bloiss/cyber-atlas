import { useMemo, useState } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';

export function MetiersPage() {
  const [filtre, setFiltre] = useState('Tous');
  const equipes = useMemo(() => ['Tous', ...new Set(D.metiers.map((m) => m.equipe))], []);
  const rows = D.metiers.filter((m) => filtre === 'Tous' || m.equipe === filtre);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Ordres de grandeur France, baromètres 2026</p>
        <h1>Métiers de la cyber</h1>
        <p className="lead">
          Ce qu'on y fait vraiment et comment y arriver. Salaires bruts annuels de débutant, plus élevés en
          Île-de-France.
        </p>
      </div>
      <div className="toolbar">
        <ChipRow values={equipes} current={filtre} onPick={setFiltre} />
      </div>
      <div className="cards">
        {rows.map((m) => (
          <div className="card" key={m.metier}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'start' }}>
              <h3>{m.metier}</h3>
              <span className="tag">{m.equipe}</span>
            </div>
            <p className="muted">{m.quotidien}</p>
            <dl>
              <dt>Compétences</dt>
              <dd>{m.competences}</dd>
              <dt>Salaire débutant</dt>
              <dd className="tnum">
                <strong>{m.salaire}</strong> · sortie d'école : {m.sortieEcole}
              </dd>
              <dt>Certifs utiles</dt>
              <dd>{m.certifs}</dd>
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
