import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './BlocNotesPage.module.css';

const RINGS = 14;

export function BlocNotesPage() {
  const [notes, setNotes] = useLocalStorage('notes', '');

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Ta feuille, pour toi</p>
        <h1>Bloc-notes</h1>
        <p className="lead">
          Un espace libre pour noter une idée, une question à creuser, un doute. Pas de structure imposée : écris comme
          sur un vrai cahier.
        </p>
      </div>
      <div className={styles.wrap}>
        <div className={styles.sheet}>
          <div className={styles.rings} aria-hidden="true">
            {Array.from({ length: RINGS }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className={styles.margin} aria-hidden="true" />
          <textarea
            className={styles.paper}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Écris ici…"
            aria-label="Tes notes libres"
            spellCheck
          />
        </div>
        <div className={styles.foot}>
          <span>Sauvegardé automatiquement dans ce navigateur (lui seul, pas de compte ni de serveur).</span>
          <span className="mono">{notes.length} caractères</span>
        </div>
      </div>
    </>
  );
}
