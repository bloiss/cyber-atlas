import { D } from '../data';
import { Lien } from '../components/Lien';

function classeFreq(f: string): string {
  return f === 'Chaque jour' ? 'lvl-3' : f === 'Hebdo' ? 'lvl-1' : 'lvl-2';
}

export function VeillePage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">15 minutes par jour</p>
        <h1>Veille cyber</h1>
        <p className="lead">
          Des sources fixes, regroupées dans un lecteur RSS (Feedly, Inoreader), et une ligne écrite par info retenue.
        </p>
      </div>
      <div className="list">
        {D.veille.map((v) => (
          <div className="row" key={v.source}>
            <h3>
              <Lien href={v.lien}>{v.source}</Lien>
            </h3>
            <div className="meta">
              <span className={`tag ${classeFreq(v.frequence)}`}>{v.frequence}</span>
              <span className="tag">{v.langue}</span>
              <span className="tag">{v.type}</span>
            </div>
            <p>{v.contenu}</p>
          </div>
        ))}
      </div>
      <div className="cols" style={{ marginTop: 22 }}>
        <div className="card">
          <h3>La fiche de veille</h3>
          <p className="muted">
            Date · titre · ce qui s'est passé (1 phrase) · faille ou technique · ce que j'en retiens.
          </p>
        </div>
        <div className="card">
          <h3>Exemple : WannaCry, mai 2017</h3>
          <p className="muted">
            Un rançongiciel se propage seul via une faille SMBv1 (MS17-010) corrigée deux mois plus tôt. Leçon : un
            correctif non appliqué suffit.
          </p>
        </div>
      </div>
      <p className="note" style={{ marginTop: 16 }}>
        Chaque vendredi, présente l'info la plus marquante de la semaine en 2 minutes à voix haute : veille et oral en
        même temps.
      </p>
    </>
  );
}
