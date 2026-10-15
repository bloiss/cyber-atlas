import { useLocalStorage } from '../hooks/useLocalStorage';

const JOUR = [
  'Oral du matin (5 min)',
  'Veille (15 min)',
  'Anki (15 min)',
  'Rappel des cours (20 min)',
  'Théorie (30 min)',
  'Pratique + write-up (50–60 min)',
  'Couché avant 23 h',
];

function todayKey(): string {
  return 'jour:' + new Date().toISOString().slice(0, 10);
}

export function RoutinePage() {
  const [checked, setChecked] = useLocalStorage<Record<number, boolean>>(todayKey(), {});
  const n = JOUR.filter((_, i) => checked[i]).length;

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">2 h 30 par jour de cours</p>
        <h1>Routine</h1>
        <p className="lead">
          La motivation suit l'action. On construit un rythme fixe, petit au départ, qui devient automatique en 6 à 10
          semaines.
        </p>
      </div>
      <div className="cols">
        <div className="stack">
          <h2>Ma checklist du jour</h2>
          <div className="checklist">
            {JOUR.map((t, i) => (
              <label key={t}>
                <input
                  type="checkbox"
                  checked={!!checked[i]}
                  onChange={(e) => setChecked((s) => ({ ...s, [i]: e.target.checked }))}
                />{' '}
                {t}
              </label>
            ))}
            <div className="score" style={{ paddingTop: 8, borderTop: '1px solid var(--line)', marginTop: 4 }}>
              Score du jour : {Math.round((n / JOUR.length) * 100)} %
            </div>
          </div>
          <p className="muted" style={{ fontSize: '.88rem' }}>
            Gardée dans ce navigateur, remise à zéro chaque jour. Objectif : 80 % sur la semaine.
          </p>
        </div>
        <div className="stack">
          <h2>Les 7 règles</h2>
          <ol className="prose" style={{ paddingLeft: '1.2em', margin: 0 }}>
            <li>
              <strong>2 minutes</strong> : pas envie ? Lance juste le lab 2 minutes.
            </li>
            <li>
              <strong>Téléphone hors de la pièce</strong> pendant chaque bloc.
            </li>
            <li>
              <strong>Préparer la veille</strong> la ressource et le lab du lendemain.
            </li>
            <li>
              <strong>Jamais deux jours ratés de suite.</strong>
            </li>
            <li>
              <strong>Version minimale</strong> les jours durs : 10 min d'Anki, 1 info de veille, 2 min d'oral.
            </li>
            <li>
              <strong>Rendre visible</strong> : publie tes write-ups, avance avec un ami.
            </li>
            <li>
              <strong>Le sommeil n'est pas négociable.</strong>
            </li>
          </ol>
        </div>
      </div>
      <h2 style={{ marginTop: 28 }}>Jour de cours</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Heure</th>
              <th>Bloc</th>
              <th>Durée</th>
              <th>Contenu</th>
            </tr>
          </thead>
          <tbody className="tnum">
            <tr>
              <td>7 h 00</td>
              <td>Réveil + oral</td>
              <td>10 min</td>
              <td>Lumière du jour, puis 2 à 5 min à voix haute sans notes.</td>
            </tr>
            <tr>
              <td>Trajet</td>
              <td>Veille</td>
              <td>15 min</td>
              <td>Lecteur RSS ou podcast, une fiche de veille.</td>
            </tr>
            <tr>
              <td>Avant chaque cours</td>
              <td>Amorçage</td>
              <td>5 min</td>
              <td>Survoler le sujet, noter 2 questions.</td>
            </tr>
            <tr>
              <td>Midi</td>
              <td>Anki</td>
              <td>15 min</td>
              <td>Cartes du jour.</td>
            </tr>
            <tr>
              <td>18 h 00</td>
              <td>Rappel des cours</td>
              <td>20 min</td>
              <td>Feuille blanche, puis compléter avec les notes.</td>
            </tr>
            <tr>
              <td>18 h 30</td>
              <td>Théorie</td>
              <td>30 min</td>
              <td>Une ressource de la bibliothèque + 3 min de rappel actif.</td>
            </tr>
            <tr>
              <td>20 h 30</td>
              <td>Pratique</td>
              <td>50–60 min</td>
              <td>Un lab + un mini write-up.</td>
            </tr>
            <tr>
              <td>22 h 30</td>
              <td>Écrans off</td>
              <td>—</td>
              <td>Coucher 23 h maximum.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 style={{ marginTop: 28 }}>Semaine type</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Jour</th>
              <th>Thème</th>
              <th>Théorie (30 min)</th>
              <th>Pratique (50–60 min)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lundi</td>
              <td>Web et SQL</td>
              <td>Bases de données, requêtes, injections</td>
              <td>Un lab PortSwigger</td>
            </tr>
            <tr>
              <td>Mardi</td>
              <td>Réseau</td>
              <td>OSI, TCP/IP, DNS, HTTP</td>
              <td>TryHackMe + Wireshark</td>
            </tr>
            <tr>
              <td>Mercredi</td>
              <td>Système</td>
              <td>Linux, permissions, Windows, AD</td>
              <td>OverTheWire Bandit</td>
            </tr>
            <tr>
              <td>Jeudi</td>
              <td>Défense</td>
              <td>Sécuriser un site, OWASP Top 10</td>
              <td>Corriger la faille de lundi</td>
            </tr>
            <tr>
              <td>Vendredi</td>
              <td>Culture</td>
              <td>Un reportage sur une attaque réelle</td>
              <td>Fiche de veille + 2 min à l'oral</td>
            </tr>
            <tr>
              <td>Samedi</td>
              <td>CTF</td>
              <td>—</td>
              <td>2 h de Root-Me + write-up, 30 min d'oral enregistré</td>
            </tr>
            <tr>
              <td>Dimanche</td>
              <td>Repos</td>
              <td>—</td>
              <td>Revue hebdo de 30 min</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
