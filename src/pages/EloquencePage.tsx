import { useState } from 'react';

const MOTS = [
  'pare-feu',
  'mot de passe',
  'sommeil',
  'Rennes',
  'confiance',
  'mise à jour',
  'curiosité',
  'équipe',
  'échec',
  'clé USB',
  'vie privée',
  'phishing',
  'discipline',
  'réseau',
  'courage',
  'sauvegarde',
  'Internet',
  'hacker',
  'vérité',
  'avenir',
];

export function EloquencePage() {
  const [mot, setMot] = useState('');

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">5 minutes par jour</p>
        <h1>Éloquence et confiance</h1>
        <p className="lead">
          Parler sans notes ne vient pas du talent mais de la répétition. Convaincre, c'est raconter une histoire claire
          avec conviction, pas réciter.
        </p>
      </div>
      <div className="cards">
        <div className="card">
          <span className="eyebrow">Chaque matin</span>
          <h3>Le résumé</h3>
          <p className="muted">Explique une notion d'hier ou une actu, sans notes, en 2 minutes chrono.</p>
        </div>
        <div className="card">
          <span className="eyebrow">Improvisation</span>
          <h3>Le mot imposé</h3>
          <p className="muted">Tire un mot au hasard et parle 60 secondes dessus.</p>
          <p>
            <button
              className="btn"
              style={{ height: 34 }}
              onClick={() => setMot(MOTS[Math.floor(Math.random() * MOTS.length)] ?? '')}
            >
              Tirer un mot
            </button>{' '}
            <strong className="mono" style={{ marginLeft: 8 }}>
              {mot}
            </strong>
          </p>
        </div>
        <div className="card">
          <span className="eyebrow">Voix</span>
          <h3>La lecture expressive</h3>
          <p className="muted">Lis un paragraphe à voix haute en exagérant pauses et intonation.</p>
        </div>
        <div className="card">
          <span className="eyebrow">Tics</span>
          <h3>Zéro « euh »</h3>
          <p className="muted">Remplace chaque « euh » par un silence. Le silence paraît assuré.</p>
        </div>
      </div>
      <div className="cols" style={{ marginTop: 22 }}>
        <div className="prose">
          <h2>Parler sans notes</h2>
          <ul>
            <li>Mémorise une structure, pas un texte : une accroche, 3 idées, une phrase de fin.</li>
            <li>Palais mental : associe chaque idée à une pièce de chez toi.</li>
            <li>Répète 3 fois à voix haute, dont une fois debout.</li>
            <li>Pieds ancrés, une personne regardée par phrase, 20 % plus lent que ce que tu crois.</li>
          </ul>
        </div>
        <div className="prose">
          <h2>Raconter une cyberattaque</h2>
          <div className="table-wrap">
            <table>
              <tbody className="tnum">
                <tr>
                  <td className="mono">15 s</td>
                  <td>
                    <strong>Accroche</strong> : « En mai 2017, des hôpitaux anglais ont renvoyé des patients chez eux.
                    La cause : un fichier. »
                  </td>
                </tr>
                <tr>
                  <td className="mono">45 s</td>
                  <td>
                    <strong>Ce qui s'est passé</strong> : propagation mondiale, machines chiffrées.
                  </td>
                </tr>
                <tr>
                  <td className="mono">45 s</td>
                  <td>
                    <strong>Comment</strong> : faille SMBv1, exploit EternalBlue.
                  </td>
                </tr>
                <tr>
                  <td className="mono">30 s</td>
                  <td>
                    <strong>Ce qui l'aurait évité</strong> : le correctif existait depuis deux mois.
                  </td>
                </tr>
                <tr>
                  <td className="mono">15 s</td>
                  <td>
                    <strong>Fin</strong> : « La meilleure sécurité, c'est souvent une mise à jour qu'on a repoussée. »
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="note" style={{ marginTop: 20 }}>
        Chaque samedi, enregistre-toi 3 à 5 minutes sur un sujet de la semaine, regarde-toi une fois et note un seul
        point à améliorer. Pour le déclic : le documentaire <em>À voix haute</em> (2017).
      </p>
    </>
  );
}
