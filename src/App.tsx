import { useRef, useState } from 'react';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Page } from './components/Page';
import { useHashRoute } from './hooks/useHashRoute';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PAGE_IDS } from './routes';
import { D } from './data';
import { computeProgress } from './lib/progress';

import { AccueilPage } from './pages/AccueilPage';
import { ParcoursPage } from './pages/ParcoursPage';
import { MethodePage } from './pages/MethodePage';
import { RoutinePage } from './pages/RoutinePage';
import { PlateformesPage } from './pages/PlateformesPage';
import { ToolboxPage } from './pages/ToolboxPage';
import { BibliothequePage } from './pages/BibliothequePage';
import { LexiquePage } from './pages/LexiquePage';
import { CheatsheetsPage } from './pages/CheatsheetsPage';
import { AnkiPage } from './pages/AnkiPage';
import { VeillePage } from './pages/VeillePage';
import { ChartePage } from './pages/ChartePage';
import { BonnesPratiquesPage } from './pages/BonnesPratiquesPage';
import { EloquencePage } from './pages/EloquencePage';
import { ProjetsPage } from './pages/ProjetsPage';
import { MetiersPage } from './pages/MetiersPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { RennesPage } from './pages/RennesPage';
import { AProposPage } from './pages/AProposPage';
import { RecherchePage } from './pages/RecherchePage';

export function App() {
  const route = useHashRoute(PAGE_IDS);
  const { toggle: toggleTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [parcoursDone, setParcoursDone] = useLocalStorage<Record<string, boolean>>('parcours', {});
  const debounceRef = useRef<number | undefined>(undefined);

  const { fait, total } = computeProgress(D.parcours, parcoursDone);
  const navProg = fait ? `${fait}/${total}` : '';

  function onQueryChange(value: string) {
    setQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const trimmed = value.trim();
      if (!trimmed) {
        if (location.hash === '#recherche') history.back();
        return;
      }
      if (location.hash !== '#recherche') location.hash = 'recherche';
    }, 180);
  }

  function toggleEtape(id: string, checked: boolean) {
    setParcoursDone((d) => ({ ...d, [id]: checked }));
  }

  return (
    <>
      <Header
        query={query}
        onQueryChange={onQueryChange}
        onToggleMenu={() => setNavOpen((o) => !o)}
        onToggleTheme={toggleTheme}
        navOpen={navOpen}
      />
      <div className="shell">
        <Nav open={navOpen} current={route} navProg={navProg} onNavigate={() => setNavOpen(false)} />
        <main id="main" tabIndex={-1}>
          <Page id="accueil" current={route}>
            <AccueilPage />
          </Page>
          <Page id="parcours" current={route}>
            <ParcoursPage done={parcoursDone} onToggle={toggleEtape} />
          </Page>
          <Page id="methode" current={route}>
            <MethodePage />
          </Page>
          <Page id="routine" current={route}>
            <RoutinePage />
          </Page>
          <Page id="plateformes" current={route}>
            <PlateformesPage />
          </Page>
          <Page id="toolbox" current={route}>
            <ToolboxPage />
          </Page>
          <Page id="bibliotheque" current={route}>
            <BibliothequePage />
          </Page>
          <Page id="lexique" current={route}>
            <LexiquePage />
          </Page>
          <Page id="cheatsheets" current={route}>
            <CheatsheetsPage />
          </Page>
          <Page id="anki" current={route}>
            <AnkiPage />
          </Page>
          <Page id="veille" current={route}>
            <VeillePage />
          </Page>
          <Page id="charte" current={route}>
            <ChartePage />
          </Page>
          <Page id="bonnes-pratiques" current={route}>
            <BonnesPratiquesPage />
          </Page>
          <Page id="eloquence" current={route}>
            <EloquencePage />
          </Page>
          <Page id="projets" current={route}>
            <ProjetsPage />
          </Page>
          <Page id="metiers" current={route}>
            <MetiersPage />
          </Page>
          <Page id="certifications" current={route}>
            <CertificationsPage />
          </Page>
          <Page id="rennes" current={route}>
            <RennesPage />
          </Page>
          <Page id="a-propos" current={route}>
            <AProposPage />
          </Page>
          <Page id="recherche" current={route}>
            <RecherchePage query={query} />
          </Page>
          <Footer />
        </main>
      </div>
    </>
  );
}
