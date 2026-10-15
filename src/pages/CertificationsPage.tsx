import { D } from '../data';
import { Lien } from '../components/Lien';

const NOMS: Record<number, string> = { 1: 'Premier pas', 2: 'Junior', 3: 'Confirmé', 4: 'Expert' };

export function CertificationsPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Dans l'ordre où les viser</p>
        <h1>Certifications</h1>
        <p className="lead">
          Une certification ne remplace pas la pratique : elle la prouve. Les prix changent souvent, vérifie-les sur le
          site officiel.
        </p>
      </div>
      <div className="phases">
        {[1, 2, 3, 4].map((n) => (
          <div className="phase" key={n}>
            <div className="phase-label">
              <span className="mono">NIVEAU {n}</span>
              <strong>{NOMS[n]}</strong>
            </div>
            <div>
              {D.certifications
                .filter((c) => c.niveau === n)
                .map((c) => (
                  <div className="task" style={{ gridTemplateColumns: 'minmax(0,1fr)' }} key={c.nom}>
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 6,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <strong>
                          <Lien href={c.lien}>{c.nom}</Lien>
                        </strong>
                        <span className="meta">
                          <span className="tag">{c.voie}</span>
                          <span className="tag">{c.format}</span>
                          <span className={`tag ${c.cout === 'Gratuit' ? 'lvl-1' : ''}`}>{c.cout}</span>
                        </span>
                      </div>
                      <div className="muted">
                        {c.organisme} · {c.quand}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
