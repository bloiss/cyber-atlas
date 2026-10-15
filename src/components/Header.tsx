export function Header({
  query,
  onQueryChange,
  onToggleMenu,
  onToggleTheme,
  navOpen,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onToggleMenu: () => void;
  onToggleTheme: () => void;
  navOpen: boolean;
}) {
  return (
    <header className="head">
      <div className="head-in">
        <button
          className="icon-btn menu-btn"
          aria-label="Ouvrir le menu"
          aria-expanded={navOpen}
          aria-controls="nav"
          onClick={onToggleMenu}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <a className="brand" href="#accueil" aria-label="Cyber Atlas, accueil">
          <svg viewBox="-100 -100 200 200" aria-hidden="true" fill="none" strokeLinecap="round">
            <circle r="62" stroke="#1f6feb" strokeWidth="9" />
            <ellipse rx="62" ry="22" stroke="#2f81f7" strokeWidth="6" opacity=".8" />
            <ellipse rx="22" ry="62" stroke="#2f81f7" strokeWidth="6" opacity=".8" />
            <ellipse rx="86" ry="30" transform="rotate(-24)" stroke="#3fb950" strokeWidth="8" />
            <circle cx="70" cy="-46" r="12" fill="#3fb950" stroke="none" />
          </svg>
          <span>Cyber Atlas</span>
        </a>
        <label className="search" htmlFor="q">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="q"
            type="search"
            placeholder="Rechercher un outil, un terme, une ressource…"
            autoComplete="off"
            aria-label="Rechercher dans tout le site"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </label>
        <button className="icon-btn" aria-label="Changer de thème" onClick={onToggleTheme}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />
          </svg>
          <span className="theme-label">Thème</span>
        </button>
      </div>
    </header>
  );
}
