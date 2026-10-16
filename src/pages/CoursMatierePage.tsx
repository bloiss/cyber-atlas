import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { D } from '../data';
import { MATIERES, type MatiereId } from '../data/matieres';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from '../components/cours/CoursMatierePage.module.css';

export function CoursMatierePage({ matiere }: { matiere: MatiereId }) {
  const info = MATIERES.find((m) => m.id === matiere);
  const chapitres = [...D.cours[matiere]].sort((a, b) => a.ordre - b.ordre);
  const [chapitreId, setChapitreId] = useState(chapitres[0]?.id ?? '');
  const [lu, setLu] = useLocalStorage<Record<string, boolean>>(`cours-lu-${matiere}`, {});

  const chapitre = chapitres.find((c) => c.id === chapitreId) ?? chapitres[0];
  const nbLus = chapitres.filter((c) => lu[c.id]).length;

  function choisir(id: string) {
    setChapitreId(id);
  }

  function telecharger() {
    document.querySelectorAll('details').forEach((d) => {
      d.open = true;
    });
    window.print();
  }

  if (!chapitre) return null;

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Cours progressif</p>
        <h1>{info?.nom ?? matiere}</h1>
        <p className="lead">
          {info?.description} {nbLus} / {chapitres.length} chapitres lus.
        </p>
      </div>
      <div className={styles.layout}>
        <nav className={styles.chapitres} aria-label="Chapitres">
          {chapitres.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles.chapitreBtn} ${c.id === chapitre.id ? styles.chapitreBtnActive : ''}`}
              onClick={() => choisir(c.id)}
            >
              <span className={`${styles.puce} ${lu[c.id] ? styles.puceLue : ''}`}>{lu[c.id] ? '✓' : c.ordre}</span>
              {c.titre}
            </button>
          ))}
        </nav>
        <div className={`${styles.contenu} ${styles.printable}`}>
          <div className={styles.entete}>
            <div>
              <p className="eyebrow">
                Chapitre {chapitre.ordre} · {chapitre.duree}
              </p>
              <h2 style={{ margin: 0 }}>{chapitre.titre}</h2>
            </div>
            <div className="cta" style={{ margin: 0 }}>
              <button className="btn" onClick={() => setLu((s) => ({ ...s, [chapitre.id]: !s[chapitre.id] }))}>
                {lu[chapitre.id] ? '✓ Chapitre lu' : 'Marquer comme lu'}
              </button>
              <button className="btn primary" onClick={telecharger}>
                Télécharger en PDF
              </button>
            </div>
          </div>

          <div className={styles.objectifs}>
            <p className="eyebrow">Objectifs</p>
            <ul style={{ margin: '6px 0 0', paddingLeft: '1.2em' }}>
              {chapitre.objectifs.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>

          <div className={styles.markdown}>
            <ReactMarkdown>{chapitre.contenuMarkdown}</ReactMarkdown>
          </div>

          <div className="note">
            <strong>Mémo</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: '1.2em' }}>
              {chapitre.memo.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ marginBottom: 10 }}>Exercices guidés</h3>
            <div style={{ display: 'grid', gap: 10 }}>
              {chapitre.exercices.map((ex, i) => (
                <div className={styles.exercice} key={i}>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    Exercice {i + 1}. {ex.enonce}
                  </p>
                  {ex.indice && (
                    <details>
                      <summary>Voir l'indice</summary>
                      <p className="muted" style={{ marginTop: 6 }}>
                        {ex.indice}
                      </p>
                    </details>
                  )}
                  <details>
                    <summary>Voir la solution</summary>
                    <div className={styles.markdown} style={{ marginTop: 6 }}>
                      <ReactMarkdown>{ex.solution}</ReactMarkdown>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
