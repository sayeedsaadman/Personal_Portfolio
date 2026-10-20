export default function ProjectArtwork({ farm }: { farm: boolean }) {
  return (
    <svg viewBox="0 0 520 380" role="img" aria-label={farm ? 'Dairy farm with cattle, a barn, and green pastures' : 'City skyline and connected streets'}>
      <defs>
        <linearGradient id={farm ? 'farm-sky' : 'city-sky'} x2="0" y2="1">
          <stop stopColor={farm ? '#142e35' : '#172b46'} />
          <stop offset="1" stopColor={farm ? '#26584d' : '#263f5e'} />
        </linearGradient>
      </defs>
      <rect width="520" height="380" fill={`url(#${farm ? 'farm-sky' : 'city-sky'})`} />
      <circle cx="412" cy="83" r="34" fill={farm ? '#e6c889' : '#a6c8e3'} opacity=".8" />
      {farm ? <>
        <path d="M0 238Q100 139 244 228T520 179V380H0Z" fill="#3b7261" />
        <path d="M0 290Q148 190 324 280T520 239V380H0Z" fill="#244e43" />
        <path d="M0 335Q205 249 520 311V380H0Z" fill="#193d35" />
        <path d="M326 380Q254 280 244 219" fill="none" stroke="#b5a37b" strokeWidth="24" opacity=".55" />
        <g transform="translate(87 119)">
          <path d="M0 65 74 11 148 65V161H0Z" fill="#ba7757" />
          <path d="m-14 66 88-68 88 68-10 12-78-58-78 58Z" fill="#e1c5a0" />
          <path d="M48 96H100V161H48Z" fill="#3a3931" stroke="#e1c5a0" strokeWidth="4" />
          <path d="m49 98 50 62m0-62-50 62M74 96v65" stroke="#b29c7f" strokeWidth="3" />
          <rect x="60" y="45" width="28" height="27" rx="2" fill="#34504b" stroke="#e1c5a0" strokeWidth="4" />
          <path d="M74 45v27M60 58h28" stroke="#e1c5a0" strokeWidth="3" />
        </g>
        <g transform="translate(335 252)">
          <path d="M-8 9q-12 3-12-13" fill="none" stroke="#e3e3cf" strokeWidth="4" />
          <rect width="65" height="33" rx="12" fill="#e3e3cf" />
          <path d="M12 1q26-2 23 18T14 25Z" fill="#344840" />
          <path d="M7 26v27M49 26v27" stroke="#e3e3cf" strokeWidth="8" />
          <path d="M57 3 67-10 81-7 83 21 62 24Z" fill="#e3e3cf" />
          <path d="m64-9-9-7m23 9 9-7" stroke="#e3e3cf" strokeWidth="5" />
          <rect x="66" y="15" width="19" height="11" rx="5" fill="#c6a58c" />
          <circle cx="75" cy="2" r="2" fill="#20362f" />
        </g>
        <g stroke="#afba94" strokeWidth="4" opacity=".7">
          <path d="M20 287v46m38-54v46m38-54v46m-76-18 76-20m-76 38 76-20" />
          <path d="M450 265v43m35-51v43m32-51v43m-67-13 67-16m-67 33 67-16" />
        </g>
        <g fill="#86ad76" opacity=".7">
          <path d="m53 361 4-18 5 18m363-5 4-20 5 20m-274 0 4-15 5 15" />
        </g>
      </> : <>
        <path d="M0 290 520 250V380H0Z" fill="#152839" />
        {[ [45, 159, 65, 133], [126, 94, 73, 198], [213, 137, 62, 155], [291, 62, 80, 230], [388, 173, 70, 119] ].map(([x,y,w,h], i) => <g key={x}>
          <rect x={x} y={y} width={w} height={h} rx="3" fill={i%2 ? '#3b607d' : '#2b4a65'} />
          {Array.from({length: Math.floor(h/27)},(_,row) => [0,1,2].map(col => <rect key={`${row}-${col}`} x={x+12+col*17} y={y+14+row*25} width="7" height="10" fill="#b1d6dc" opacity={(row+col)%3 ? '.65' : '.2'} />))}
        </g>)}
        <path d="m0 346 520-31M256 380l-5-89" stroke="#6d8e9f" strokeWidth="3" opacity=".6" />
        {[65,166,337,451].map(x => <g key={x}><path d={`M${x} 332v-39h15`} fill="none" stroke="#84acbc" strokeWidth="3"/><circle cx={x+15} cy="293" r="4" fill="#ddcd98"/></g>)}
      </>}
    </svg>
  );
}
