export default function PathologyVisual() {
  const patches = [
    [32, 62],
    [112, 62],
    [192, 62],
    [72, 142],
    [152, 142],
  ];
  return (
    <figure className="pathology-visual">
      <svg viewBox="0 0 310 450" role="img" aria-labelledby="pathology-title pathology-desc">
        <title id="pathology-title">Path-HGT pathology and hierarchical graph illustration</title>
        <desc id="pathology-desc">
          Stylized tissue patches connect to local graph groups and a higher-level graph. This is an
          illustrative graphic, not a figure or result from the paper.
        </desc>
        <defs>
          <linearGradient id="tissue" x2="1" y2="1">
            <stop stopColor="#edd1ec" />
            <stop offset="1" stopColor="#b59aca" />
          </linearGradient>
        </defs>
        <text x="32" y="32" className="figure-label">
          01 / TISSUE PATCHES
        </text>
        {patches.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect width="66" height="66" rx="9" fill="url(#tissue)" />
            {Array.from({ length: 12 }, (_, j) => (
              <ellipse
                key={j}
                cx={10 + (j % 4) * 15 + (i % 2) * 2}
                cy={12 + Math.floor(j / 4) * 19}
                rx={4 + (j % 3)}
                ry={3 + (j % 4)}
                transform={`rotate(${j * 17},${10 + (j % 4) * 15},${12 + Math.floor(j / 4) * 19})`}
                fill={j % 3 === 0 ? '#7d4e9e' : '#aa76ad'}
                opacity=".8"
              />
            ))}
          </g>
        ))}
        <path d="M150 219v29m-7-8 7 8 7-8" fill="none" stroke="#b6a0da" strokeWidth="1.5" />
        <text x="32" y="278" className="figure-label">
          02 / LOCAL RELATIONSHIPS
        </text>
        {[65, 155, 245].map((x, i) => (
          <g key={i}>
            <path
              d={`M${x - 20} 321l20-22 20 22-20 22z M${x - 20} 321h40 M${x} 299v44`}
              fill="none"
              stroke="#ad8bd2"
              opacity=".65"
            />
            {[
              [x - 20, 321],
              [x, 299],
              [x + 20, 321],
              [x, 343],
            ].map(([cx, cy], j) => (
              <circle key={j} cx={cx} cy={cy} r="4" fill="#cbb7ec" />
            ))}
          </g>
        ))}
        <path d="m65 351 90 46 90-46M155 351v46" fill="none" stroke="#8b72ab" />
        <circle cx="155" cy="399" r="14" fill="#9a7fd0" />
        <circle cx="155" cy="399" r="24" fill="none" stroke="#bfa5ec" opacity=".35" />
        <text x="155" y="446" textAnchor="middle" className="figure-label">
          03 / HIERARCHICAL GRAPH
        </text>
      </svg>
    </figure>
  );
}
