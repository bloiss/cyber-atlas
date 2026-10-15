import { useMemo } from 'react';
import { D } from '../data';
import { normalize } from '../lib/text';

type Hit = { cat: string; ancre: string; titre: string; texte: string; url?: string };

export function RecherchePage({ query }: { query: string }) {
  const brut = query.trim();
  const q = normalize(brut);

  const hits = useMemo<Hit[]>(() => {
    if (!q) return [];
    const out: Hit[] = [];
    const add = (cat: string, ancre: string, titre: string, texte: string, url?: string) =>
      out.push({ cat, ancre, titre, texte, url });
    for (const t of D.toolbox)
      if (normalize(`${t.nom} ${t.description}`).includes(q)) add('Toolbox', '#toolbox', t.nom, t.description, t.lien);
    for (const l of D.lexique)
      if (normalize(`${l.terme} ${l.definition}`).includes(q)) add('Lexique', '#lexique', l.terme, l.definition);
    for (const p of D.plateformes)
      if (normalize(`${p.nom} ${p.pourquoi}`).includes(q)) add('Plateforme', '#plateformes', p.nom, p.pourquoi, p.lien);
    for (const b of D.bibliotheque)
      if (normalize(`${b.titre} ${b.pourquoi}`).includes(q))
        add('Bibliothèque', '#bibliotheque', b.titre, b.pourquoi, b.lien);
    for (const m of D.metiers)
      if (normalize(`${m.metier} ${m.quotidien}`).includes(q)) add('Métier', '#metiers', m.metier, m.quotidien);
    for (const c of D.certifications)
      if (normalize(`${c.nom} ${c.quand}`).includes(q)) add('Certification', '#certifications', c.nom, c.quand, c.lien);
    return out;
  }, [q]);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Recherche</p>
        <h1>{brut ? `${hits.length} résultat${hits.length > 1 ? 's' : ''} pour « ${brut} »` : 'Résultats'}</h1>
      </div>
      <div className="list">
        {hits.length === 0 ? (
          <div className="empty">Rien trouvé. Essaie « réseau », « SQL » ou « forensic ».</div>
        ) : (
          hits.map((h, i) => (
            <div className="row" key={i}>
              <h3>
                {h.url ? (
                  <a href={h.url} target="_blank" rel="noopener">
                    {h.titre}
                  </a>
                ) : (
                  <a href={h.ancre}>{h.titre}</a>
                )}
              </h3>
              <div className="meta">
                <a className="tag" href={h.ancre}>
                  {h.cat}
                </a>
              </div>
              <p>{h.texte}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
