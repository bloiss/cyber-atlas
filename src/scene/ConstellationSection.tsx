import { lazy, Suspense } from 'react';
import { useWebglSupported } from './useWebglSupported';
import styles from './ConstellationSection.module.css';

const ConstellationScene = lazy(() => import('./ConstellationScene'));

/**
 * Couche 3D additive de l'Accueil : la navigation `.tiles` (2D, accessible) couvre déjà les mêmes liens,
 * donc cette section est purement décorative/complémentaire pour qui a WebGL et peut voir les animations.
 */
export function ConstellationSection() {
  const webglSupported = useWebglSupported();
  if (!webglSupported) return null;

  return (
    <div className={styles.constellation} aria-hidden="true">
      <Suspense fallback={null}>
        <ConstellationScene />
      </Suspense>
    </div>
  );
}
