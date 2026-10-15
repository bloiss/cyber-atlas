export function ChartePage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">À lire avant tout</p>
        <h1>Charte éthique et cadre légal</h1>
      </div>
      <p className="note warn" style={{ marginBottom: 22 }}>
        <strong>Règle d'or : on ne teste que ce qu'on a le droit de tester.</strong> Ton lab, une plateforme
        d'entraînement, un CTF, ou un programme de bug bounty dont tu respectes le périmètre. Tout le reste est illégal,
        même « pour voir ».
      </p>
      <div className="prose">
        <h2>Ce que dit la loi</h2>
        <p>
          Les articles 323-1 à 323-7 du Code pénal répriment notamment l'accès ou le maintien frauduleux dans un système
          informatique, l'entrave à son fonctionnement, la modification de données, et la détention ou diffusion
          d'outils conçus pour ces infractions sans motif légitime. Les peines vont jusqu'à plusieurs années de prison
          et de lourdes amendes.{' '}
          <a href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006149839/" target="_blank" rel="noopener">
            Texte à jour sur Légifrance
          </a>
          .
        </p>
      </div>
      <div className="cols" style={{ marginTop: 22 }}>
        <div className="card">
          <h3>Autorisé</h3>
          <ul className="prose" style={{ paddingLeft: '1.2em', margin: 0 }}>
            <li>Les plateformes d'entraînement, selon leurs règles.</li>
            <li>Tes propres machines virtuelles.</li>
            <li>Les CTF officiels.</li>
            <li>
              Le bug bounty dans le périmètre publié, par exemple sur{' '}
              <a href="https://www.yeswehack.com" target="_blank" rel="noopener">
                YesWeHack
              </a>
              .
            </li>
            <li>Un test avec un accord écrit et signé du propriétaire.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Interdit</h3>
          <ul className="prose" style={{ paddingLeft: '1.2em', margin: 0 }}>
            <li>Scanner le réseau de ton école, d'un voisin ou d'un site.</li>
            <li>Tester un identifiant trouvé dans une fuite.</li>
            <li>Utiliser l'OSINT pour suivre une personne réelle.</li>
            <li>Publier la solution d'un challenge dont la plateforme l'interdit.</li>
          </ul>
        </div>
      </div>
      <div className="prose" style={{ marginTop: 22 }}>
        <h2>Si tu découvres une faille par hasard</h2>
        <ol>
          <li>Arrête-toi immédiatement.</li>
          <li>Ne copie ni ne conserve aucune donnée.</li>
          <li>Préviens l'organisation concernée (fichier security.txt, adresse dédiée) ou l'ANSSI.</li>
          <li>Garde une trace datée de ce que tu as fait.</li>
        </ol>
      </div>
    </>
  );
}
