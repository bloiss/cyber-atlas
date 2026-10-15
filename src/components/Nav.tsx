import { D } from '../data';

const COUNT = {
  plateformes: D.plateformes.length,
  bibliotheque: D.bibliotheque.length,
  lexique: D.lexique.length,
  anki: D.anki.length,
  toolbox: D.toolbox.length,
  veille: D.veille.length,
  projets: D.projets.length,
  metiers: D.metiers.length,
  certifications: D.certifications.length,
};

export function Nav({
  open,
  current,
  navProg,
  onNavigate,
}: {
  open: boolean;
  current: string;
  navProg: string;
  onNavigate: () => void;
}) {
  const link = (href: string, label: string, badge?: string) => (
    <a href={href} aria-current={current === href.slice(1) ? 'page' : undefined} onClick={onNavigate}>
      {label} {badge !== undefined && <span className="mono">{badge}</span>}
    </a>
  );

  return (
    <nav className={`nav${open ? ' open' : ''}`} id="nav" aria-label="Sections du site">
      <div className="nav-group">
        <span className="eyebrow">Démarrer</span>
        {link('#accueil', 'Accueil')}
        {link('#parcours', 'Parcours 6 mois', navProg)}
        {link('#methode', "Méthode d'apprentissage")}
        {link('#routine', 'Routine')}
      </div>
      <div className="nav-group">
        <span className="eyebrow">Apprendre</span>
        {link('#plateformes', 'Plateformes', String(COUNT.plateformes))}
        {link('#bibliotheque', 'Bibliothèque', String(COUNT.bibliotheque))}
        {link('#lexique', 'Lexique', String(COUNT.lexique))}
        {link('#cheatsheets', 'Cheatsheets')}
        {link('#anki', 'Cartes Anki', String(COUNT.anki))}
      </div>
      <div className="nav-group">
        <span className="eyebrow">Pratiquer</span>
        {link('#toolbox', 'Toolbox', String(COUNT.toolbox))}
        {link('#veille', 'Veille', String(COUNT.veille))}
        {link('#charte', 'Charte éthique')}
        {link('#bonnes-pratiques', 'Bonnes pratiques')}
      </div>
      <div className="nav-group">
        <span className="eyebrow">Avancer</span>
        {link('#eloquence', 'Éloquence')}
        {link('#projets', 'Projets', String(COUNT.projets))}
        {link('#metiers', 'Métiers', String(COUNT.metiers))}
        {link('#certifications', 'Certifications', String(COUNT.certifications))}
        {link('#rennes', 'Écosystème Rennes')}
        {link('#a-propos', 'À propos')}
      </div>
    </nav>
  );
}
