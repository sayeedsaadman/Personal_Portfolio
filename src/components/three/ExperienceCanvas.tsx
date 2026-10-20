import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Stage = { progress: number; phase: number };
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    /* Static fallback retains all content. */
  }
  render() {
    return this.state.failed ? <StaticSystem /> : this.props.children;
  }
}
function StaticSystem() {
  return (
    <div className="static-system" data-testid="webgl-fallback" aria-hidden="true">
      <div className="static-board">
        <div className="static-chip">
          <span>CORE</span>
          <strong>SAAD</strong>
        </div>
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} style={{ top: `${15 + i * 12}%` }} />
        ))}
      </div>
      <span className="static-caption">SYSTEMS / SOFTWARE / INTELLIGENCE</span>
    </div>
  );
}
function Box({
  position,
  size,
  color = '#172637',
  metalness = 0.75,
  emissive = '#000000',
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  metalness?: number;
  emissive?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={0.3}
        emissive={emissive}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
function Motherboard({ reducedMotion }: { reducedMotion: boolean }) {
  const chip = useRef<THREE.Group>(null);
  const signal = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (chip.current && !reducedMotion)
      chip.current.position.y = 0.65 + Math.sin(clock.elapsedTime * 0.7) * 0.05;
    if (signal.current) {
      const progress = reducedMotion ? 0.4 : (clock.elapsedTime * 0.22) % 1;
      signal.current.position.set(
        -1.95 + progress * 1.3,
        0.13,
        -0.59 + Math.max(0, progress - 0.6) * 0.73,
      );
    }
  });
  const circuits = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const z = -0.95 + Math.floor(i / 2) * 0.18;
        return [
          [side * 0.62, 0.095, z * 0.5],
          [side * (0.9 + (i % 3) * 0.11), 0.095, z * 0.5],
          [side * (1.1 + (i % 3) * 0.11), 0.095, z],
          [side * 1.95, 0.095, z],
        ] as [number, number, number][];
      }),
    [],
  );
  return (
    <group>
      <RoundedBox args={[4.4, 0.15, 3.45]} radius={0.09} smoothness={2}>
        <meshStandardMaterial color="#102839" metalness={0.7} roughness={0.32} />
      </RoundedBox>
      <Line
        points={[
          [-2.13, 0.09, -1.65],
          [2.13, 0.09, -1.65],
          [2.13, 0.09, 1.65],
          [-2.13, 0.09, 1.65],
          [-2.13, 0.09, -1.65],
        ]}
        color="#57dce8"
        lineWidth={1.5}
      />
      {circuits.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={i % 3 === 0 ? '#68e8ef' : '#1e6877'}
          lineWidth={i % 3 === 0 ? 1.2 : 0.7}
        />
      ))}
      <Box position={[0, 0.14, 0]} size={[1.6, 0.12, 1.5]} color="#152033" />
      <Line
        points={[
          [-0.8, 0.21, -0.75],
          [0.8, 0.21, -0.75],
          [0.8, 0.21, 0.75],
          [-0.8, 0.21, 0.75],
          [-0.8, 0.21, -0.75],
        ]}
        color="#4ad9e4"
        lineWidth={2}
      />
      <group ref={chip} position={[0, 0.65, 0]}>
        <RoundedBox args={[1.35, 0.19, 1.25]} radius={0.035} smoothness={2}>
          <meshStandardMaterial color="#263c4b" metalness={0.85} roughness={0.2} />
        </RoundedBox>
        <Box position={[0, 0.115, 0]} size={[1.03, 0.05, 0.94]} color="#081523" />
        <Line
          points={[
            [-0.54, 0.145, -0.49],
            [0.54, 0.145, -0.49],
            [0.54, 0.145, 0.49],
            [-0.54, 0.145, 0.49],
            [-0.54, 0.145, -0.49],
          ]}
          color="#b3f9ff"
          lineWidth={2}
        />
        <Box
          position={[0, 0.15, 0]}
          size={[0.43, 0.025, 0.43]}
          color="#55d5df"
          emissive="#3fc6d7"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <group key={i}>
            <Box
              position={[-0.72, 0.015, -0.5 + i * 0.125]}
              size={[0.12, 0.045, 0.035]}
              color="#a2b6b9"
            />
            <Box
              position={[0.72, 0.015, -0.5 + i * 0.125]}
              size={[0.12, 0.045, 0.035]}
              color="#a2b6b9"
            />
          </group>
        ))}
      </group>
      {[-0.58, 0.58].flatMap((x) =>
        [-0.53, 0.53].map((z) => (
          <Line
            key={`${x}${z}`}
            points={[
              [x, 0.22, z],
              [x, 0.56, z],
            ]}
            color="#41a6bc"
            transparent
            opacity={0.45}
            dashed
            dashSize={0.04}
            gapSize={0.04}
          />
        )),
      )}
      {Array.from({ length: 4 }, (_, i) => (
        <group key={i} position={[1.1 + i * 0.23, 0.2, 0.05]}>
          <Box position={[0, 0, 0]} size={[0.11, 0.22, 1.7]} color="#09232f" />
          <Box
            position={[0, 0.12, 0]}
            size={[0.065, 0.025, 1.55]}
            color={i === 1 ? '#4ce1e6' : '#397d8c'}
            emissive={i === 1 ? '#39b6cf' : '#000000'}
          />
        </group>
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <group key={i}>
          <Box position={[-0.45, 0.15, 0.96 + i * 0.22]} size={[1.8, 0.17, 0.1]} color="#101723" />
          <Box
            position={[-0.45, 0.24, 0.96 + i * 0.22]}
            size={[1.68, 0.025, 0.025]}
            color="#47717e"
          />
        </group>
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <group key={i}>
          <Box
            position={[-1.76 + i * 0.24, 0.2, -1.35]}
            size={[0.17, 0.23, 0.24]}
            color="#263544"
          />
          <mesh position={[-1.5, 0.2, -0.85 + i * 0.24]}>
            <cylinderGeometry args={[0.065, 0.065, 0.22, 12]} />
            <meshStandardMaterial color="#537181" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <Box
          key={i}
          position={[-2.15, 0.21, -1.03 + i * 0.65]}
          size={[0.26, 0.27, 0.42]}
          color="#465c6a"
        />
      ))}
      {[
        [-1.94, -1.43],
        [1.94, -1.43],
        [-1.94, 1.43],
        [1.94, 1.43],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.09, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.045, 0.085, 16]} />
          <meshStandardMaterial color="#92b5bd" metalness={0.9} />
        </mesh>
      ))}
      <pointLight position={[0, 0.6, 0]} intensity={2} color="#3ae7ff" distance={3} />
      <mesh ref={signal}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#b6fbff" />
      </mesh>
    </group>
  );
}
function NetworkModel({ ai = false }: { ai?: boolean }) {
  const positions = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => {
        const t = i * 2.39996;
        const y = 1 - i / 7;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        return new THREE.Vector3(Math.cos(t) * r * 2.3, y * 2.3, Math.sin(t) * r * 2.3);
      }),
    [],
  );
  return (
    <group>
      {positions.map((p, i) => (
        <group key={i}>
          <mesh position={p}>
            {ai ? (
              <icosahedronGeometry args={[0.1, 0]} />
            ) : (
              <boxGeometry args={[0.19, 0.19, 0.19]} />
            )}
            <meshStandardMaterial
              color={ai ? '#b0a0ff' : '#70e0ea'}
              emissive={ai ? '#6443ac' : '#1c718c'}
              emissiveIntensity={0.7}
            />
          </mesh>
          {i > 0 && (
            <Line points={[positions[i - 1], p]} color={ai ? '#9275c9' : '#368c9e'} lineWidth={1} />
          )}
          {i % 2 === 0 && (
            <Line points={[[0, 0, 0], p]} color={ai ? '#67518e' : '#1c576b'} lineWidth={0.6} />
          )}
        </group>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial color={ai ? '#665095' : '#367a90'} wireframe />
      </mesh>
    </group>
  );
}
function Scene({
  stage,
  reducedMotion,
}: {
  stage: React.RefObject<Stage>;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const board = useRef<THREE.Group>(null);
  const ai = useRef<THREE.Group>(null);
  const { size, invalidate } = useThree();
  const mobile = size.width < 760;
  const particles = useMemo(() => {
    const values = new Float32Array((mobile ? 30 : 80) * 3);
    for (let i = 0; i < values.length; i++) values[i] = Math.sin(i * 127.1 + 311.7) * 12;
    return values;
  }, [mobile]);
  useEffect(() => {
    invalidate();
  }, [reducedMotion, invalidate]);
  useEffect(() => {
    if (!reducedMotion) return;
    const update = () => invalidate();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [reducedMotion, invalidate]);
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const phase = stage.current.phase;
    const time = reducedMotion ? 0 : clock.elapsedTime;
    const targetX = mobile ? 1.05 : 2.65;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 4, delta);
    group.current.position.y = mobile ? 0.1 : -0.2 + Math.sin(time * 0.45) * 0.06;
    group.current.rotation.y =
      -0.38 + (reducedMotion ? 0 : Math.sin(time * 0.14) * 0.08 + stage.current.progress * 0.5);
    group.current.rotation.z = -0.12;
    group.current.scale.setScalar(mobile ? 0.74 : 1);
    if (board.current) board.current.visible = phase === 0;

    if (ai.current) {
      ai.current.visible = phase >= 1;
      ai.current.rotation.y = time * 0.07;
    }
  });
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[1, 7, 5]} intensity={3} color="#b0e1fa" />
      <directionalLight position={[5, 3, -4]} intensity={5} color="#39bacc" />
      <pointLight position={[-3, 1, 3]} intensity={15} color="#6652a6" />
      <group ref={group} position={[mobile ? 1.05 : 2.65, -0.2, 0]}>
        <group ref={board}>
          <Motherboard reducedMotion={reducedMotion} />
        </group>
        <group ref={ai} visible={false}>
          <NetworkModel ai />
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
          <ringGeometry args={[2.85, 2.86, 100]} />
          <meshBasicMaterial color="#206379" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.72, 0]}>
          <ringGeometry args={[3.25, 3.255, 100]} />
          <meshBasicMaterial color="#206379" transparent opacity={0.25} />
        </mesh>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.013} color="#80ceda" transparent opacity={0.35} sizeAttenuation />
      </points>
    </>
  );
}
export default function ExperienceCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const [supported, setSupported] = useState(
    () => new URLSearchParams(window.location.search).get('render') !== 'static',
  );
  const [inStory, setInStory] = useState(true);
  const stage = useRef<Stage>({ progress: 0, phase: 0 });
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const test = document.createElement('canvas');
    const gl = test.getContext('webgl2');
    if (!gl) setSupported(false);
    else gl.getExtension('WEBGL_lose_context')?.loseContext();
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        stage.current.progress = self.progress;
        setInStory((document.getElementById('research')?.getBoundingClientRect().bottom ?? 1) > 0);
      },
    });
    const triggers = ['home', 'projects', 'research'].map((id, i) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => {
          if (self.isActive) stage.current.phase = i;
        },
      }),
    );
    const fade = gsap.to(root.current, {
      opacity: 0.14,
      ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'bottom 95%', end: 'bottom 40%', scrub: true },
    });
    return () => {
      trigger.kill();
      triggers.forEach((t) => t.kill());
      fade.scrollTrigger?.kill();
      fade.kill();
    };
  }, []);

  return (
    <div ref={root} className="canvas-root" aria-hidden="true">
      {!supported ? (
        <StaticSystem />
      ) : (
        <CanvasBoundary>
          <Canvas
            camera={{ position: [0, 5.8, 10], fov: 39 }}
            dpr={[1, 1.5]}
            frameloop={reducedMotion || !inStory ? 'demand' : 'always'}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener('webglcontextlost', () => setSupported(false), {
                once: true,
              });
            }}
          >
            <Suspense fallback={null}>
              <Scene stage={stage} reducedMotion={reducedMotion} />
            </Suspense>
          </Canvas>
        </CanvasBoundary>
      )}
    </div>
  );
}
