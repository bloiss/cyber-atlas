export function BonnesPratiquesPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Commencer par soi</p>
        <h1>Bonnes pratiques et réflexes</h1>
        <p className="lead">Un futur pro de la cyber commence par sécuriser sa propre vie numérique.</p>
      </div>
      <div className="cards">
        <div className="card">
          <h3>Comptes</h3>
          <ul className="prose" style={{ paddingLeft: '1.2em', margin: 0 }}>
            <li>
              Gestionnaire de mots de passe :{' '}
              <a href="https://bitwarden.com" target="_blank" rel="noopener">
                Bitwarden
              </a>{' '}
              ou{' '}
              <a href="https://keepassxc.org" target="_blank" rel="noopener">
                KeePassXC
              </a>
              .
            </li>
            <li>Une phrase de passe unique par site.</li>
            <li>Double authentification partout, par application ou clé physique.</li>
            <li>
              Vérifier ses fuites sur{' '}
              <a href="https://haveibeenpwned.com" target="_blank" rel="noopener">
                Have I Been Pwned
              </a>
              .
            </li>
          </ul>
        </div>
        <div className="card">
          <h3>Machines</h3>
          <ul className="prose" style={{ paddingLeft: '1.2em', margin: 0 }}>
            <li>Mises à jour automatiques.</li>
            <li>Pare-feu et antivirus actifs.</li>
            <li>Disque chiffré (BitLocker, FileVault, LUKS).</li>
            <li>Tests offensifs uniquement en machine virtuelle.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Navigation</h3>
          <ul className="prose" style={{ paddingLeft: '1.2em', margin: 0 }}>
            <li>Vérifier l'adresse exacte avant de se connecter.</li>
            <li>Jamais de clic sur un lien reçu par SMS inattendu.</li>
            <li>Wi-Fi public : HTTPS ou VPN de confiance.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Sauvegardes 3-2-1</h3>
          <ul className="prose" style={{ paddingLeft: '1.2em', margin: 0 }}>
            <li>
              <strong>3</strong> copies.
            </li>
            <li>
              <strong>2</strong> supports différents.
            </li>
            <li>
              <strong>1</strong> copie hors ligne, la seule qui résiste à un rançongiciel.
            </li>
          </ul>
        </div>
      </div>
      <div className="prose" style={{ marginTop: 22 }}>
        <h2>En cas d'incident</h2>
        <ol>
          <li>Déconnecter la machine du réseau, sans l'éteindre.</li>
          <li>Ne rien supprimer : les traces sont des preuves.</li>
          <li>Changer les mots de passe depuis un autre appareil, en commençant par l'e-mail.</li>
          <li>
            Prévenir le responsable informatique ou le mentor cyber, et{' '}
            <a href="https://17cyber.gouv.fr" target="_blank" rel="noopener">
              17Cyber
            </a>
            , le guichet officiel d'assistance aux victimes.
          </li>
          <li>Porter plainte en cas d'escroquerie ou de chantage.</li>
        </ol>
      </div>
    </>
  );
}
