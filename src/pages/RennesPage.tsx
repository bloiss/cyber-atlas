export function RennesPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">48.11° N · 1.68° O</p>
        <h1>Écosystème cyber à Rennes</h1>
        <p className="lead">
          La Bretagne est l'une des premières régions françaises en cybersécurité, et Rennes en est le cœur. Les
          événements, les CTF et les employeurs sont à portée de bus. Encore faut-il y aller.
        </p>
      </div>
      <h2 style={{ marginBottom: 12 }}>Les rendez-vous</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Événement</th>
              <th>Quand</th>
              <th>Pourquoi y aller</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>European Cyber Week</strong>
                <br />
                <span className="muted">Couvent des Jacobins</span>
              </td>
              <td className="tnum">16 – 19 nov. 2026</td>
              <td>
                Le grand salon européen de la cyber. Conférences, entreprises, écoles. Idéal pour décrocher un stage.
              </td>
            </tr>
            <tr>
              <td>
                <strong>BreizhCTF</strong>
              </td>
              <td>Chaque printemps</td>
              <td>Le CTF rennais de référence, sur une nuit, en équipe, avec un espace recrutement.</td>
            </tr>
            <tr>
              <td>
                <strong>CTF Hacklantique</strong>
                <br />
                <span className="muted">Cyberschool</span>
              </td>
              <td>Vers mars</td>
              <td>CTF de l'école universitaire de cybersécurité de Rennes. Parfait pour une première compétition.</td>
            </tr>
            <tr>
              <td>
                <strong>France Cybersecurity Challenge</strong>
              </td>
              <td>Chaque printemps, en ligne</td>
              <td>
                Le championnat national de l'ANSSI, ouvert aux jeunes. Les meilleurs intègrent l'équipe de France.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ marginTop: 8, fontSize: '.88rem' }}>
        Dates à confirmer chaque année sur les sites officiels :{' '}
        <a href="https://www.european-cyber-week.eu" target="_blank" rel="noopener">
          European Cyber Week
        </a>
        ,{' '}
        <a href="https://www.breizhctf.com" target="_blank" rel="noopener">
          BreizhCTF
        </a>
        ,{' '}
        <a href="https://cyberschool.univ-rennes.fr" target="_blank" rel="noopener">
          Cyberschool
        </a>
        ,{' '}
        <a href="https://hackropole.fr/fr/" target="_blank" rel="noopener">
          Hackropole
        </a>
        .
      </p>
      <div className="cards" style={{ marginTop: 22 }}>
        <div className="card">
          <span className="eyebrow">Formation</span>
          <h3>Cyberschool</h3>
          <p className="muted">
            L'école universitaire de recherche en cybersécurité de l'Université de Rennes, qui fédère plusieurs
            établissements.
          </p>
        </div>
        <div className="card">
          <span className="eyebrow">Défense</span>
          <h3>DGA Maîtrise de l'information</h3>
          <p className="muted">
            À Bruz : le centre d'expertise cyber du ministère des Armées, grand recruteur d'ingénieurs et d'alternants.
          </p>
        </div>
        <div className="card">
          <span className="eyebrow">Réseau</span>
          <h3>Pôle d'excellence cyber</h3>
          <p className="muted">Relie défense, entreprises, recherche et formation en Bretagne.</p>
        </div>
        <div className="card">
          <span className="eyebrow">Campus</span>
          <h3>Bretagne Cyber Alliance</h3>
          <p className="muted">Le campus cyber régional, qui fédère l'écosystème breton.</p>
        </div>
      </div>
      <div className="prose" style={{ marginTop: 22 }}>
        <h2>En profiter, concrètement</h2>
        <ol>
          <li>
            Va à l'European Cyber Week en novembre, même une journée, avec une présentation de toi en 30 secondes et un
            CV d'une page.
          </li>
          <li>Forme une équipe CTF de 3 ou 4 étudiants et entraînez-vous sur Hackropole avant le BreizhCTF.</li>
          <li>Participe au FCSC chaque printemps : gratuit, en ligne, et une bonne ligne de CV.</li>
          <li>Repère 10 entreprises rennaises qui recrutent en cyber et suis-les dès maintenant.</li>
          <li>Présente une attaque à l'oral devant ta promo ou ton association.</li>
        </ol>
      </div>
    </>
  );
}
