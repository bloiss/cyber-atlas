import { useEffect, useState } from 'react';
import { D } from '../data';
import { ConstellationSection } from '../scene/ConstellationSection';

const ETAPES = D.parcours.reduce((s, p) => s + p.etapes.length, 0);

function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setOn((v) => !v), 600);
    return () => clearInterval(id);
  }, []);
  return <span style={{ opacity: on ? 1 : 0 }}>▌</span>;
}

export function AccueilPage() {
  return (
    <>
      <div className="hero">
        <div>
          <p className="eyebrow">Hub francophone · Rennes</p>
          <h1 style={{ marginTop: 8 }}>
            Progresser en cyber, <span>chaque jour.</span>
          </h1>
          <p className="lead">
            Un parcours de 6 mois, les meilleures plateformes et ressources triées par niveau, une toolbox vérifiée, les
            métiers et certifications, l'écosystème rennais, et le travail de l'oral. Le rythme compte plus que la
            motivation.
          </p>
          <div className="cta">
            <a className="btn primary" href="#parcours">
              Commencer le parcours
            </a>
            <a className="btn" href="#methode">
              Comment apprendre vite
            </a>
          </div>
        </div>
        <div className="term" role="img" aria-label="Résumé du contenu du site">
          <div className="bar">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div>
            <span className="p">loïs@atlas</span>:<span className="dim">~</span>$ atlas --status
          </div>
          <div>
            <span className="ok">✓</span> parcours ........ <span className="tnum">{ETAPES} étapes</span> · 6 mois
          </div>
          <div>
            <span className="ok">✓</span> plateformes ..... <span className="tnum">{D.plateformes.length}</span>{' '}
            classées par niveau
          </div>
          <div>
            <span className="ok">✓</span> toolbox ......... <span className="tnum">{D.toolbox.length}</span> outils,
            liens officiels
          </div>
          <div>
            <span className="ok">✓</span> lexique ......... <span className="tnum">{D.lexique.length}</span> termes
          </div>
          <div>
            <span className="ok">✓</span> cartes anki ..... <span className="tnum">{D.anki.length}</span>
          </div>
          <div>
            <span className="ok">✓</span> owasp top 10 .... édition 2025
          </div>
          <div>
            <span className="p">loïs@atlas</span>:<span className="dim">~</span>$ <Cursor />
          </div>
        </div>
      </div>

      <ConstellationSection />

      <h2 style={{ marginBottom: 14 }}>Commencer ici</h2>
      <div className="steps">
        <div className="step">
          <b>ÉTAPE 1</b>
          <a href="#methode">Lire la méthode</a>
          <p className="muted">10 minutes pour apprendre comme le cerveau aime apprendre.</p>
        </div>
        <div className="step">
          <b>ÉTAPE 2</b>
          <a href="#charte">Lire la charte</a>
          <p className="muted">On ne teste que ce qu'on a le droit de tester.</p>
        </div>
        <div className="step">
          <b>ÉTAPE 3</b>
          <a href="#routine">Caler la routine</a>
          <p className="muted">2 h 30 par jour de cours, 4 h le samedi, repos le dimanche.</p>
        </div>
        <div className="step">
          <b>ÉTAPE 4</b>
          <a href="#parcours">Attaquer l'étape 1</a>
          <p className="muted">Installer Kali en machine virtuelle, dès ce soir.</p>
        </div>
      </div>

      <h2 style={{ marginBottom: 14 }}>Tout le site</h2>
      <div className="tiles">
        <a className="tile" href="#plateformes">
          <span className="mono">{D.plateformes.length} sites</span>
          <strong>Plateformes</strong>
          <span className="muted">Où pratiquer, dans l'ordre.</span>
        </a>
        <a className="tile" href="#toolbox">
          <span className="mono">{D.toolbox.length} outils</span>
          <strong>Toolbox</strong>
          <span className="muted">Un outil par usage, lien officiel.</span>
        </a>
        <a className="tile" href="#bibliotheque">
          <span className="mono">{D.bibliotheque.length} ressources</span>
          <strong>Bibliothèque</strong>
          <span className="muted">Chaînes, cours, docs, podcasts, livres.</span>
        </a>
        <a className="tile" href="#lexique">
          <span className="mono">{D.lexique.length} termes</span>
          <strong>Lexique</strong>
          <span className="muted">Le vocabulaire, en une phrase.</span>
        </a>
        <a className="tile" href="#cheatsheets">
          <span className="mono">5 onglets</span>
          <strong>Cheatsheets</strong>
          <span className="muted">Ports, web, SQL, Linux, crypto.</span>
        </a>
        <a className="tile" href="#veille">
          <span className="mono">{D.veille.length} sources</span>
          <strong>Veille</strong>
          <span className="muted">15 minutes par jour, avec méthode.</span>
        </a>
        <a className="tile" href="#metiers">
          <span className="mono">{D.metiers.length} métiers</span>
          <strong>Métiers</strong>
          <span className="muted">Le quotidien et les salaires.</span>
        </a>
        <a className="tile" href="#certifications">
          <span className="mono">{D.certifications.length} certifs</span>
          <strong>Certifications</strong>
          <span className="muted">Lesquelles, et quand.</span>
        </a>
        <a className="tile" href="#rennes">
          <span className="mono">35000</span>
          <strong>Écosystème Rennes</strong>
          <span className="muted">Événements, CTF, employeurs.</span>
        </a>
        <a className="tile" href="#eloquence">
          <span className="mono">5 min / jour</span>
          <strong>Éloquence</strong>
          <span className="muted">Parler sans notes, convaincre.</span>
        </a>
      </div>

      <div className="rules">
        <div className="rule">
          <strong>Théorie → pratique</strong>
          <span className="muted">Une vidéo sans exercice derrière s'oublie en quelques jours.</span>
        </div>
        <div className="rule">
          <strong>Tout lab finit en write-up</strong>
          <span className="muted">C'est ton portfolio pour le stage.</span>
        </div>
        <div className="rule">
          <strong>Parler tous les jours</strong>
          <span className="muted">2 minutes à voix haute, sans notes.</span>
        </div>
      </div>
    </>
  );
}
