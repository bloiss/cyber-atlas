import { D } from '../data';
import { MATIERES } from '../data/matieres';
import { useLocalStorage } from '../hooks/useLocalStorage';

function CarteMatiere({ id, nom, description }: { id: keyof typeof D.cours; nom: string; description: string }) {
  const [lu] = useLocalStorage<Record<string, boolean>>(`cours-lu-${id}`, {});
  const chapitres = D.cours[id];
  const nbLus = chapitres.filter((c) => lu[c.id]).length;

  return (
    <a className="card" href={`#cours-${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'start' }}>
        <h3>{nom}</h3>
        <span className="tag mono">
          {nbLus} / {chapitres.length}
        </span>
      </div>
      <p className="muted">{description}</p>
    </a>
  );
}

export function CoursPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Apprendre pas à pas</p>
        <h1>Cours</h1>
        <p className="lead">
          Un cours progressif par matière : objectifs, explication, mémo des points essentiels et exercices guidés.
          Chaque chapitre se télécharge en PDF, pour réviser hors ligne.
        </p>
      </div>
      <div className="cards">
        {MATIERES.map((m) => (
          <CarteMatiere key={m.id} id={m.id} nom={m.nom} description={m.description} />
        ))}
      </div>
    </>
  );
}
