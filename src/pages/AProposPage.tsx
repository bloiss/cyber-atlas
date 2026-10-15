import { useRef, useState } from 'react';

export function AProposPage() {
  const [nom, setNom] = useState('');
  const [lien, setLien] = useState('');
  const [pourquoi, setPourquoi] = useState('');
  const [message, setMessage] = useState('');
  const nomRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = nom.trim();
    if (!n) {
      setMessage('Indique au moins le nom de la ressource.');
      nomRef.current?.focus();
      return;
    }
    const texte = `Proposition pour Cyber Atlas\nRessource : ${n}\nLien : ${lien.trim() || '—'}\nPourquoi : ${pourquoi.trim() || '—'}`;
    try {
      await navigator.clipboard.writeText(texte);
      setMessage('Proposition copiée. Colle-la dans un message au créateur du site.');
    } catch {
      setMessage('Copie impossible : sélectionne le texte et copie-le à la main.');
    }
  }

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Le projet</p>
        <h1>À propos et contribuer</h1>
        <p className="lead">
          Les ressources pour apprendre la cyber sont partout, mais en vrac. Cyber Atlas les trie par niveau, les relie
          dans un parcours et ajoute ce qui manque ailleurs : une méthode, un rythme, et le travail de l'oral.
        </p>
      </div>
      <div className="cards">
        <div className="card">
          <h3>Qualité avant quantité</h3>
          <p className="muted">
            Chaque ressource est choisie, classée et accompagnée d'une phrase qui dit pourquoi elle vaut ton temps.
          </p>
        </div>
        <div className="card">
          <h3>Pratique avant théorie</h3>
          <p className="muted">Chaque notion renvoie à un exercice.</p>
        </div>
        <div className="card">
          <h3>Éthique d'abord</h3>
          <p className="muted">On apprend l'attaque pour mieux défendre, et seulement sur des cibles autorisées.</p>
        </div>
        <div className="card">
          <h3>À jour</h3>
          <p className="muted">Liens revus régulièrement. Dernière revue : 15 octobre 2026.</p>
        </div>
      </div>
      <div className="prose" style={{ marginTop: 22 }}>
        <h2>Proposer une ressource</h2>
        <p>
          Tu connais une plateforme, un outil, une vidéo ou un événement qui mérite d'être ici ? Prépare ta proposition
          ci-dessous, copie-la et envoie-la au créateur du site. Chaque proposition est vérifiée avant d'être ajoutée.
        </p>
      </div>
      <form className="card" style={{ marginTop: 14, maxWidth: 640 }} noValidate onSubmit={onSubmit}>
        <label htmlFor="pName">Nom de la ressource</label>
        <input
          id="pName"
          ref={nomRef}
          className="field"
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <label htmlFor="pLink">Lien</label>
        <input
          id="pLink"
          className="field"
          type="url"
          placeholder="https://…"
          value={lien}
          onChange={(e) => setLien(e.target.value)}
        />
        <label htmlFor="pWhy">Pourquoi elle est utile</label>
        <textarea id="pWhy" className="field" rows={3} value={pourquoi} onChange={(e) => setPourquoi(e.target.value)} />
        <div className="cta" style={{ marginTop: 6 }}>
          <button className="btn primary" type="submit">
            Copier la proposition
          </button>
        </div>
        <p className="muted" style={{ fontSize: '.9rem' }}>
          {message}
        </p>
      </form>
      <p className="muted" style={{ marginTop: 22, fontSize: '.88rem' }}>
        Projet étudiant indépendant, sans lien commercial avec les plateformes citées. Les dates, prix et salaires sont
        indicatifs : vérifie toujours sur le site officiel.
      </p>
    </>
  );
}
