export function MethodePage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Sciences de l'apprentissage</p>
        <h1>Comment le cerveau apprend</h1>
        <p className="lead">
          Apprendre vite, c'est récupérer l'info de mémoire, souvent, espacé dans le temps, puis dormir. Relire ses
          notes ou regarder une vidéo donne une impression de maîtrise, mais retient peu.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Principe</th>
              <th>Ce que dit la science</th>
              <th>Ce que tu fais</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Rappel actif</strong>
              </td>
              <td>Se forcer à se souvenir renforce bien plus la mémoire que relire (effet de test).</td>
              <td>Après chaque vidéo ou cours : ferme tout, écris ou dis ce que tu as retenu en 3 min.</td>
            </tr>
            <tr>
              <td>
                <strong>Répétition espacée</strong>
              </td>
              <td>On oublie vite ; revoir juste avant d'oublier consolide.</td>
              <td>
                Les <a href="#anki">cartes Anki</a>, 10 à 15 minutes par jour.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Sommeil</strong>
              </td>
              <td>La mémoire se consolide pendant le sommeil profond et paradoxal.</td>
              <td>7 h 30 minimum, coucher à heure fixe.</td>
            </tr>
            <tr>
              <td>
                <strong>Attention limitée</strong>
              </td>
              <td>Le multitâche coûte cher ; il faut un quart d'heure pour entrer en concentration profonde.</td>
              <td>Blocs de 45 à 50 min, téléphone dans une autre pièce.</td>
            </tr>
            <tr>
              <td>
                <strong>Effet Feynman</strong>
              </td>
              <td>Expliquer simplement révèle ce qu'on ne comprend pas.</td>
              <td>Explique chaque notion à voix haute comme à un ami de 15 ans.</td>
            </tr>
            <tr>
              <td>
                <strong>Pratique alternée</strong>
              </td>
              <td>Alterner les types d'exercices ancre mieux que répéter le même.</td>
              <td>Web, réseau, Linux mélangés dans la semaine.</td>
            </tr>
            <tr>
              <td>
                <strong>Curiosité</strong>
              </td>
              <td>On retient mieux ce qui intrigue ; le scroll sature le circuit de la récompense.</td>
              <td>Pose une question avant chaque vidéo. Pas de réseaux sociaux avant la fin du bloc.</td>
            </tr>
            <tr>
              <td>
                <strong>Habitude</strong>
              </td>
              <td>Une habitude s'ancre en liant l'action à un déclencheur fixe.</td>
              <td>« Après le dîner → 1 h de lab », même lieu, même heure.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cols" style={{ marginTop: 22 }}>
        <div className="prose">
          <h3>En cours</h3>
          <ol>
            <li>
              <strong>Avant</strong> : 5 minutes pour survoler le sujet et noter 2 questions.
            </li>
            <li>
              <strong>Pendant</strong> : écris avec tes mots, ne recopie pas les slides.
            </li>
            <li>
              <strong>Le soir</strong> : 10 minutes de rappel sur feuille blanche, puis complète avec tes notes.
            </li>
            <li>
              <strong>Le week-end</strong> : transforme les 5 notions clés en cartes Anki.
            </li>
          </ol>
        </div>
        <div className="prose">
          <h3>De bonnes cartes Anki</h3>
          <ul>
            <li>Une carte = une seule idée.</li>
            <li>
              Des questions qui obligent à comprendre : « Pourquoi une requête préparée empêche-t-elle une injection SQL
              ? »
            </li>
            <li>Une carte toujours ratée est mal formulée : reformule-la.</li>
            <li>
              Pour aller plus loin : <em>Make It Stick</em> et <em>Atomic Habits</em>.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
