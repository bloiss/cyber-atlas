import { useMemo, useState } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';
import { Lien } from '../components/Lien';
import { niveauClasse, normalize } from '../lib/text';

export function ToolboxPage() {
  const [niveau, setNiveau] = useState('Tous');
  const [categorie, setCategorie] = useState('Toutes');
  const [q, setQ] = useState('');
  const categories = useMemo(() => ['Toutes', ...new Set(D.toolbox.map((t) => t.categorie))], []);
  const nq = normalize(q);

  const rows = D.toolbox.filter(
    (t) =>
      (niveau === 'Tous' || t.niveau === niveau) &&
      (categorie === 'Toutes' || t.categorie === categorie) &&
      (!nq || normalize(`${t.nom} ${t.description} ${t.categorie}`).includes(nq))
  );
  const groupes = [...new Set(rows.map((t) => t.categorie))];

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Usage autorisé uniquement</p>
        <h1>Toolbox</h1>
        <p className="lead">
          Un outil par usage, avec son lien officiel. À n'utiliser que sur tes labs et les plateformes autorisées (voir
          la <a href="#charte">charte</a>).
        </p>
      </div>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Filtrer les outils…"
          aria-label="Filtrer les outils"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <ChipRow values={['Tous', 'Essentiel', 'Utile', 'Avancé']} current={niveau} onPick={setNiveau} />
        <span className="count">
          {rows.length} / {D.toolbox.length}
        </span>
      </div>
      <ChipRow values={categories} current={categorie} onPick={setCategorie} style={{ marginBottom: 14 }} />
      <div className="list">
        {rows.length === 0 && <div className="empty">Aucun outil ne correspond.</div>}
        {groupes.map((g) => (
          <div key={g}>
            <div className="group-title">{g}</div>
            {rows
              .filter((t) => t.categorie === g)
              .map((t) => (
                <div className="row" key={t.nom}>
                  <h3>
                    <Lien href={t.lien}>{t.nom}</Lien>
                  </h3>
                  <div className="meta">
                    <span className={`tag ${niveauClasse(t.niveau)}`}>{t.niveau}</span>
                  </div>
                  <p>{t.description}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
