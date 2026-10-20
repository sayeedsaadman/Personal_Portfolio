import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="section-index">/{number}</p>
      <h2 className="section-title">{label}</h2>
      <p className="section-subtitle">{title}</p>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}
export function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={`text-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={16} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
export function GraphVisual({ variant = 'blue' }: { variant?: 'blue' | 'violet' }) {
  const nodes = [
    [170, 130],
    [87, 73],
    [93, 202],
    [253, 67],
    [270, 191],
    [181, 37],
    [189, 245],
    [33, 140],
    [328, 117],
    [37, 38],
    [322, 258],
    [326, 31],
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 7],
    [1, 9],
    [2, 7],
    [2, 6],
    [3, 5],
    [3, 8],
    [3, 11],
    [4, 8],
    [4, 6],
    [4, 10],
    [6, 10],
  ];
  return (
    <svg className={`graph-visual ${variant}`} viewBox="0 0 360 280" aria-hidden="true">
      <defs>
        <radialGradient id={`glow-${variant}`}>
          <stop stopColor={variant === 'violet' ? '#b9a0ff' : '#56dce9'} stopOpacity=".16" />
          <stop offset="1" stopColor="#080e19" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="140" r="140" fill={`url(#glow-${variant})`} />
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle className="node-halo" cx={x} cy={y} r={i === 0 ? 23 : 9} />
          <circle className="node-core" cx={x} cy={y} r={i === 0 ? 8 : 3} />
        </g>
      ))}
    </svg>
  );
}
