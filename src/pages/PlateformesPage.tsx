import { useMemo, useState } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';
import { Lien } from '../components/Lien';
import { niveauClasse } from '../lib/text';

export function PlateformesPage() {
  const [filtre, setFiltre] = useState('Tous');
  const domaines = useMemo(() => ['Tous', ...new Set(D.plateformes.flatMap((p) => p.domaines))], []);
  const rows = D.plateformes.filter((p) => filtre === 'Tous' || p.domaines.includes(filtre));

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Classées dans l'ordre conseillé</p>
        <h1>Plateformes d'entraînement</h1>
        <p className="lead">
          Où pratiquer, de la première machine virtuelle aux CTF en équipe. Commence par le haut de la liste. Liens
          vérifiés le 15 octobre 2026.
        </p>
      </div>
      <div className="toolbar">
        <ChipRow values={domaines} current={filtre} onPick={setFiltre} />
        <span className="count">
          {rows.length} / {D.plateformes.length}
        </span>
      </div>
      <div className="list">
        {rows.map((p) => (
          <div className="row" key={p.nom}>
            <h3>
              <Lien href={p.lien}>{p.nom}</Lien>
            </h3>
            <div className="meta">
              <span className={`tag ${niveauClasse(p.niveau)}`}>{p.niveau}</span>
              <span className="tag">{p.langue}</span>
              <span className="tag">{p.cout}</span>
            </div>
            <p>{p.pourquoi}</p>
          </div>
        ))}
      </div>
    </>
  );
}
