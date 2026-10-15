import { D } from '../data';
import { computeProgress } from '../lib/progress';
import { Lien } from '../components/Lien';

export function ParcoursPage({
  done,
  onToggle,
}: {
  done: Record<string, boolean>;
  onToggle: (id: string, checked: boolean) => void;
}) {
  const { fait, total } = computeProgress(D.parcours, done);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Octobre → avril</p>
        <h1>Parcours 6 mois</h1>
        <p className="lead">
          Une étape = un objectif mesurable et un livrable. Coche les étapes au fur et à mesure : ta progression reste
          enregistrée dans ce navigateur.
        </p>
      </div>
      <div className="progress">
        <div className="track">
          <div className="fill" style={{ width: `${total ? (fait / total) * 100 : 0}%` }} />
        </div>
        <span className="score">
          {fait} / {total}
        </span>
      </div>
      <div className="phases">
        {D.parcours.map((ph) => (
          <div className="phase" key={ph.titre}>
            <div className="phase-label">
              <span className="mono">{ph.periode}</span>
              <strong>{ph.titre}</strong>
            </div>
            <div>
              {ph.etapes.map((e) => (
                <div className={`task${done[e.id] ? ' done' : ''}`} key={e.id}>
                  <input
                    type="checkbox"
                    id={`p${e.id}`}
                    checked={!!done[e.id]}
                    onChange={(ev) => onToggle(e.id, ev.target.checked)}
                  />
                  <div>
                    <label htmlFor={`p${e.id}`}>{e.titre}</label>
                    <div className="muted">
                      Livrable : {e.livrable}
                      {e.lien && (
                        <>
                          {' '}
                          · <Lien href={e.lien}>ressource</Lien>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="note" style={{ marginTop: 18 }}>
        Si tu rates une semaine, tu ne rattrapes pas : tu reprends simplement là où tu en es.
      </p>
    </>
  );
}
