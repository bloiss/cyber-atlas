import { useMemo, useState } from 'react';
import { D, type AgendaItem } from '../data';
import { ChipRow } from '../components/ChipRow';
import { Lien } from '../components/Lien';

const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

function formatDate(iso: string): { jour: number; mois: string; annee: number } {
  const [annee, mois, jour] = iso.split('-').map(Number);
  return { jour: jour ?? 1, mois: MOIS[(mois ?? 1) - 1] ?? '', annee: annee ?? 0 };
}

function formatPeriode(e: AgendaItem): string {
  if (!e.debut || !e.fin) return e.periodeLibre ?? 'Dates à confirmer';
  const a = formatDate(e.debut);
  const b = formatDate(e.fin);
  if (a.mois === b.mois && a.annee === b.annee) return `${a.jour} – ${b.jour} ${a.mois} ${a.annee}`;
  if (a.annee === b.annee) return `${a.jour} ${a.mois} – ${b.jour} ${b.mois} ${a.annee}`;
  return `${a.jour} ${a.mois} ${a.annee} – ${b.jour} ${b.mois} ${b.annee}`;
}

function classeType(t: string): string {
  return t === 'CTF' ? 'lvl-3' : t === 'Salon' ? 'lvl-1' : 'lvl-2';
}

export function AgendaPage() {
  const [filtre, setFiltre] = useState('Tous');
  const types = useMemo(() => ['Tous', ...new Set(D.agenda.map((e) => e.type))], []);

  const rows = useMemo(() => {
    const filtered = D.agenda.filter((e) => filtre === 'Tous' || e.type === filtre);
    return [...filtered].sort((a, b) => {
      if (a.debut && b.debut) return a.debut.localeCompare(b.debut);
      if (a.debut) return -1;
      if (b.debut) return 1;
      return a.nom.localeCompare(b.nom);
    });
  }, [filtre]);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Conférences et CTF, dans le monde</p>
        <h1>Agenda cyber</h1>
        <p className="lead">
          Les grands rendez-vous de la cybersécurité, triés par date. Pour les événements rennais et l'écosystème local,
          voir <a href="#rennes">Écosystème Rennes</a>.
        </p>
      </div>
      <div className="toolbar">
        <ChipRow values={types} current={filtre} onPick={setFiltre} />
        <span className="count">
          {rows.length} / {D.agenda.length}
        </span>
      </div>
      <div className="list">
        {rows.map((e) => (
          <div className="row" key={e.nom}>
            <h3>
              <Lien href={e.lien}>{e.nom}</Lien>
            </h3>
            <div className="meta">
              <span className={`tag ${classeType(e.type)}`}>{e.type}</span>
              <span className="tag mono">{formatPeriode(e)}</span>
              <span className="tag">{e.lieu}</span>
            </div>
            <p>{e.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
