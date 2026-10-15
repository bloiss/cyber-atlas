import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Instance, Instances, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import type { Group } from 'three';
import { buildGraph, type ConstellationNode } from './graphData';
import { usePrefersReducedMotion, useIsSmallScreen } from './useMediaQuery';
import styles from './ConstellationSection.module.css';

const COLOR_BLUE = '#1f6feb';
const COLOR_GREEN = '#3fb950';
const EDGE_COLOR = '#2f81f7';

function colorFor(groupIndex: number): string {
  return groupIndex % 2 === 0 ? COLOR_BLUE : COLOR_GREEN;
}

function Nodes({
  nodes,
  groupIndexOf,
  onHover,
  onPick,
}: {
  nodes: ConstellationNode[];
  groupIndexOf: (group: string) => number;
  onHover: (id: string | null) => void;
  onPick: (node: ConstellationNode) => void;
}) {
  return (
    <Instances limit={nodes.length}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial toneMapped={false} />
      {nodes.map((n) => {
        const color = colorFor(groupIndexOf(n.group));
        return (
          <Instance
            key={n.id}
            position={n.position}
            color={color}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(n.id);
            }}
            onPointerOut={() => onHover(null)}
            onClick={(e) => {
              e.stopPropagation();
              onPick(n);
            }}
          />
        );
      })}
    </Instances>
  );
}

function Edges({ nodes, edges }: { nodes: ConstellationNode[]; edges: { from: string; to: string }[] }) {
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n.position])), [nodes]);
  return (
    <>
      {edges.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        return <Line key={i} points={[a, b]} color={EDGE_COLOR} lineWidth={1} transparent opacity={0.35} />;
      })}
    </>
  );
}

function Rig({ reducedMotion, children }: { reducedMotion: boolean; children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    ref.current.rotation.y += delta * 0.06;
  });
  return <group ref={ref}>{children}</group>;
}

export default function ConstellationScene() {
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const groupNames = useMemo(() => [...new Set(nodes.map((n) => n.group))], [nodes]);
  const groupIndexOf = (group: string) => groupNames.indexOf(group as ConstellationNode['group']);
  const reducedMotion = usePrefersReducedMotion();
  const smallScreen = useIsSmallScreen();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hovered = nodes.find((n) => n.id === hoveredId) ?? null;

  function navigateTo(node: ConstellationNode) {
    location.hash = node.id;
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8.5], fov: 50 }}
      style={{ cursor: hoveredId ? 'pointer' : 'default' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={40} color={COLOR_BLUE} />
      <pointLight position={[-5, -3, -5]} intensity={30} color={COLOR_GREEN} />
      <Rig reducedMotion={reducedMotion}>
        <Edges nodes={nodes} edges={edges} />
        <Nodes nodes={nodes} groupIndexOf={groupIndexOf} onHover={setHoveredId} onPick={navigateTo} />
        {hovered && (
          <Html position={hovered.position} center distanceFactor={9} occlude={false} zIndexRange={[10, 0]}>
            <span className={styles.label}>{hovered.label}</span>
          </Html>
        )}
      </Rig>
      {!smallScreen && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.9} intensity={0.55} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  );
}
