import { useState } from 'react';

const TABS = [
  { id: 'ports', label: 'Ports' },
  { id: 'web', label: 'Web' },
  { id: 'sql', label: 'SQL' },
  { id: 'linux', label: 'Linux' },
  { id: 'crypto', label: 'Crypto' },
] as const;
type TabId = (typeof TABS)[number]['id'];

const PORTS: [string, string][] = [
  ['21', 'FTP, en clair'],
  ['22', 'SSH'],
  ['23', 'Telnet, à bannir'],
  ['25', 'SMTP'],
  ['53', 'DNS'],
  ['80', 'HTTP'],
  ['88', 'Kerberos'],
  ['110', 'POP3'],
  ['143', 'IMAP'],
  ['389 / 636', 'LDAP / LDAPS'],
  ['443', 'HTTPS'],
  ['445', 'SMB'],
  ['1433', 'MS SQL'],
  ['3306', 'MySQL'],
  ['3389', 'RDP'],
  ['5432', 'PostgreSQL'],
  ['6379', 'Redis'],
  ['8080', 'HTTP alternatif'],
];

const OWASP: [string, string][] = [
  ['A01', "Contrôle d'accès défaillant (inclut désormais la SSRF)"],
  ['A02', 'Mauvaise configuration de sécurité'],
  ['A03', "Défaillances de la chaîne d'approvisionnement logicielle"],
  ['A04', 'Défaillances cryptographiques'],
  ['A05', 'Injection (SQL, commandes, XSS…)'],
  ['A06', 'Conception non sécurisée'],
  ['A07', "Défaillances d'authentification"],
  ['A08', "Défaillances d'intégrité du logiciel ou des données"],
  ['A09', "Défaillances de journalisation et d'alerte"],
  ['A10', 'Mauvaise gestion des conditions exceptionnelles'],
];

export function CheatsheetsPage() {
  const [tab, setTab] = useState<TabId>('ports');

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Mémo</p>
        <h1>Cheatsheets</h1>
        <p className="lead">
          L'essentiel à avoir sous la main. Les commandes servent sur tes labs et les plateformes autorisées.
        </p>
      </div>
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'ports' && (
        <div className="stack">
          <div className="ports">
            {PORTS.map(([n, d]) => (
              <div className="port" key={n}>
                <b>{n}</b>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <h3>Nmap sur ton lab</h3>
          <pre>
            {'nmap -sC -sV -oA scan <cible>     '}
            <span className="c"># scripts par défaut + versions, résultats sauvegardés</span>
            {'\nnmap -p- --min-rate 1000 <cible>  '}
            <span className="c"># tous les ports TCP</span>
            {'\nnmap -sU --top-ports 50 <cible>   '}
            <span className="c"># 50 ports UDP les plus courants</span>
          </pre>
        </div>
      )}

      {tab === 'web' && (
        <div className="stack">
          <div className="cols">
            <div className="card">
              <h3>Méthodes HTTP</h3>
              <p>
                <code>GET</code> lire · <code>POST</code> créer · <code>PUT</code> remplacer · <code>PATCH</code>{' '}
                modifier en partie · <code>DELETE</code> supprimer · <code>OPTIONS</code> méthodes autorisées
              </p>
            </div>
            <div className="card">
              <h3>Codes HTTP</h3>
              <p className="tnum">
                <code>200</code> OK · <code>301/302</code> redirection · <code>400</code> requête invalide ·{' '}
                <code>401</code> non authentifié · <code>403</code> interdit · <code>404</code> introuvable ·{' '}
                <code>500</code> erreur serveur
              </p>
            </div>
          </div>
          <h3>OWASP Top 10 — édition 2025</h3>
          <div className="table-wrap">
            <table>
              <tbody className="tnum">
                {OWASP.map(([code, label]) => (
                  <tr key={code}>
                    <td className="mono">{code}</td>
                    <td>{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted">
            Source officielle :{' '}
            <a href="https://owasp.org/Top10/2025/" target="_blank" rel="noopener">
              owasp.org/Top10/2025
            </a>
          </p>
        </div>
      )}

      {tab === 'sql' && (
        <div className="stack">
          <h3>Les bases</h3>
          <pre>{`SELECT nom, email FROM utilisateurs WHERE ville = 'Rennes' ORDER BY nom;
SELECT u.nom, c.total FROM utilisateurs u JOIN commandes c ON c.user_id = u.id;
INSERT INTO utilisateurs (nom, email) VALUES ('Loïs', 'lois@exemple.fr');
UPDATE utilisateurs SET ville = 'Paris' WHERE id = 3;`}</pre>
          <p className="prose">
            L'injection SQL existe quand une application colle directement la saisie de l'utilisateur dans sa requête :
            la saisie peut alors changer le sens de la requête au lieu d'être traitée comme une simple donnée.
          </p>
          <h3>Comment s'en protéger</h3>
          <pre>
            <span className="c"># Vulnérable : la saisie est collée dans la requête</span>
            {'\ncursor.execute("SELECT * FROM users WHERE name = \'" + nom + "\'")\n\n'}
            <span className="c"># Sûr : requête préparée, la saisie reste une donnée</span>
            {'\ncursor.execute("SELECT * FROM users WHERE name = %s", (nom,))'}
          </pre>
          <ul className="prose" style={{ paddingLeft: '1.2em' }}>
            <li>Requêtes préparées partout, sans exception.</li>
            <li>Compte de base de données avec le minimum de droits.</li>
            <li>Messages d'erreur génériques côté utilisateur.</li>
          </ul>
        </div>
      )}

      {tab === 'linux' && (
        <div className="stack">
          <pre>
            {'pwd ; ls -la ; cd /chemin            '}
            <span className="c"># se repérer</span>
            {'\ncat f ; less f ; head -n 20 f         '}
            <span className="c"># lire un fichier</span>
            {'\ngrep -ri "motclé" dossier/            '}
            <span className="c"># chercher un texte</span>
            {'\nfind / -name "*.conf" 2>/dev/null      '}
            <span className="c"># chercher des fichiers</span>
            {'\nchmod 640 f ; chown user:groupe f     '}
            <span className="c"># permissions</span>
            {'\nps aux ; ss -tulpn                    '}
            <span className="c"># processus et ports ouverts</span>
            {'\nid ; sudo -l                          '}
            <span className="c"># qui suis-je, que puis-je lancer en root</span>
            {'\nfile f ; strings f | less             '}
            <span className="c"># identifier et inspecter un binaire</span>
            {'\ncurl -i http://<cible>                '}
            <span className="c"># requête HTTP avec en-têtes</span>
          </pre>
          <p className="note">
            <code>-rwxr-x---</code> = propriétaire : lecture, écriture, exécution · groupe : lecture, exécution · autres
            : rien. En octal : <strong>750</strong>.
          </p>
        </div>
      )}

      {tab === 'crypto' && (
        <div className="stack">
          <div className="cards">
            <div className="card">
              <h3>Encodage</h3>
              <p className="muted">Base64, hex. Réversible par tous : ce n'est pas de la sécurité.</p>
            </div>
            <div className="card">
              <h3>Hachage</h3>
              <p className="muted">Sens unique. Pour les mots de passe : Argon2 ou bcrypt, salés. Jamais MD5.</p>
            </div>
            <div className="card">
              <h3>Symétrique</h3>
              <p className="muted">Une seule clé pour chiffrer et déchiffrer. Ex : AES.</p>
            </div>
            <div className="card">
              <h3>Asymétrique</h3>
              <p className="muted">Clé publique pour chiffrer, clé privée pour déchiffrer ou signer. Ex : RSA.</p>
            </div>
          </div>
          <pre>{`echo 'texte' | base64 ; echo 'dGV4dGUK' | base64 -d
sha256sum fichier`}</pre>
        </div>
      )}
    </>
  );
}
