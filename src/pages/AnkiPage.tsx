import { useMemo, useState } from 'react';
import { D } from '../data';
import { ChipRow } from '../components/ChipRow';

export function AnkiPage() {
  const [filtre, setFiltre] = useState('Tous');
  const themes = useMemo(() => ['Tous', ...new Set(D.anki.map((a) => a.theme))], []);
  const rows = D.anki.filter((a) => filtre === 'Tous' || a.theme === filtre);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Répétition espacée</p>
        <h1>{D.anki.length} cartes Anki</h1>
        <p className="lead">
          Ports, HTTP, OWASP 2025, failles web et protections, Linux, réseau, crypto, défense et culture cyber. 15
          minutes par jour suffisent.
        </p>
      </div>
      <div className="cta" style={{ margin: '0 0 20px' }}>
        <a className="btn primary" href="/assets/cyber-atlas-cartes.csv" download>
          Télécharger les cartes (CSV)
        </a>
        <a className="btn" href="/assets/Cyber_Atlas.apkg" download>
          Paquet Anki (.apkg)
        </a>
        <a className="btn" href="https://apps.ankiweb.net" target="_blank" rel="noopener">
          Installer Anki
        </a>
      </div>
      <p className="note" style={{ marginBottom: 20 }}>
        Le plus simple : ouvre le fichier .apkg avec Anki. Sinon, avec le CSV, dans Anki : Fichier → Importer → choisis
        le CSV, séparateur « virgule », première ligne = en-têtes. Le thème peut servir d'étiquette.
      </p>
      <div className="toolbar">
        <ChipRow values={themes} current={filtre} onPick={setFiltre} />
        <span className="count">{rows.length} cartes</span>
      </div>
      <div className="list">
        {rows.map((a) => (
          <details className="row" style={{ display: 'block' }} key={a.question}>
            <summary style={{ cursor: 'pointer', fontWeight: 500 }}>{a.question}</summary>
            <p style={{ marginTop: 6, color: 'var(--accent)', fontWeight: 600 }}>{a.reponse}</p>
          </details>
        ))}
      </div>
    </>
  );
}
