/* Cien años · símbolos personales (vanilla JS, sin JSX) ------------------- *
   Paths convertidos de symbols.jsx. viewBox 0 0 100 100.
   -------------------------------------------------------------------------- */

const SYMBOL_SVG = {

  // José Arcadio Buendía: el castaño
  castano: `<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 48 92 Q 46 80 50 70 Q 54 60 50 50" stroke-width="5"/>
    <path d="M 50 60 Q 36 56 28 44" stroke-width="3.5"/>
    <path d="M 50 60 Q 64 56 72 44" stroke-width="3.5"/>
    <path d="M 50 52 Q 50 40 50 28" stroke-width="3.5"/>
    <path d="M 50 50 Q 42 42 38 34" stroke-width="3"/>
    <path d="M 50 50 Q 58 42 62 34" stroke-width="3"/>
    <path d="M 50 16 Q 36 16 30 26 Q 22 32 22 42 Q 22 50 32 50 Q 38 56 50 50"/>
    <path d="M 50 16 Q 64 16 70 26 Q 78 32 78 42 Q 78 50 68 50 Q 62 56 50 50"/>
    <path d="M 50 22 Q 44 28 44 38 Q 44 46 50 50 Q 56 46 56 38 Q 56 28 50 22" opacity="0.6" stroke-width="1.5"/>
    <path d="M 48 92 L 38 96 M 48 92 L 30 94" stroke-width="2" opacity="0.6"/>
    <path d="M 50 92 L 62 96 M 50 92 L 70 94" stroke-width="2" opacity="0.6"/>
  </g>`,

  // Úrsula: la casa colonial de los Buendía
  ave: `<g fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 6 42 L 50 14 L 94 42 Z"/>
    <path d="M 6 42 L 94 42" stroke-width="2"/>
    <path d="M 16 38 L 16 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 24 36 L 24 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 32 34 L 32 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 40 31 L 40 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 50 28 L 50 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 60 31 L 60 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 68 34 L 68 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 76 36 L 76 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 84 38 L 84 42" stroke-width="1.5" opacity="0.7"/>
    <path d="M 14 42 L 14 88 L 86 88 L 86 42"/>
    <path d="M 42 88 L 42 60 Q 42 54 50 54 Q 58 54 58 60 L 58 88"/>
    <path d="M 50 60 L 50 86" stroke-width="1.5"/>
    <circle cx="47" cy="74" r="0.9" fill="currentColor" stroke="none"/>
    <circle cx="53" cy="74" r="0.9" fill="currentColor" stroke="none"/>
    <rect x="20" y="58" width="14" height="18"/>
    <path d="M 23 58 L 23 76 M 27 58 L 27 76 M 31 58 L 31 76" stroke-width="1.4"/>
    <path d="M 18 56 L 36 56" stroke-width="2"/>
    <rect x="66" y="58" width="14" height="18"/>
    <path d="M 69 58 L 69 76 M 73 58 L 73 76 M 77 58 L 77 76" stroke-width="1.4"/>
    <path d="M 64 56 L 82 56" stroke-width="2"/>
    <path d="M 6 88 L 94 88" stroke-width="3"/>
    <path d="M 6 92 L 94 92" stroke-width="1.5" opacity="0.5"/>
  </g>`,

  // Coronel Aureliano: el pescadito de oro
  pescadito: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 14 50 Q 30 26 60 26 Q 78 26 78 50 Q 78 74 60 74 Q 30 74 14 50 Z"/>
    <path d="M 14 50 L 4 36 L 4 64 Z"/>
    <circle cx="64" cy="44" r="2.5" fill="currentColor"/>
    <path d="M 40 42 Q 50 50 40 58 M 50 42 Q 60 50 50 58" stroke-width="2"/>
  </g>`,

  // José Arcadio (hijo): la culebra
  culebra: `<g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 18 78 Q 18 58 38 58 Q 58 58 58 38 Q 58 22 78 22"/>
    <circle cx="80" cy="22" r="5" fill="currentColor" stroke="none"/>
    <path d="M 86 22 L 92 18 M 86 22 L 92 26" stroke-width="2"/>
    <path d="M 18 78 L 12 84" stroke-width="2.5"/>
  </g>`,

  // Amaranta: la mano vendada de negro
  mano: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 30 92 L 30 36 Q 30 28 36 28 Q 42 28 42 36 L 42 50 M 42 22 Q 42 14 48 14 Q 54 14 54 22 L 54 50 M 54 18 Q 54 10 60 10 Q 66 10 66 18 L 66 50 M 66 26 Q 66 18 72 18 Q 78 18 78 26 L 78 50 L 78 70 Q 78 92 60 92 Z"/>
    <path d="M 30 50 Q 18 50 18 60 Q 18 70 30 70"/>
    <path d="M 22 56 L 80 56" stroke-width="4"/>
    <path d="M 22 64 L 80 64" stroke-width="4"/>
    <path d="M 22 72 L 80 72" stroke-width="4"/>
    <path d="M 22 80 L 80 80" stroke-width="4"/>
  </g>`,

  // Rebeca: los huesos cruzados
  huesos: `<g fill="currentColor" stroke="none">
    <g transform="translate(50 50) rotate(-45)">
      <rect x="-30" y="-4" width="60" height="8" rx="1"/>
      <circle cx="-30" cy="-7" r="6"/>
      <circle cx="-30" cy="7" r="6"/>
      <circle cx="30" cy="-7" r="6"/>
      <circle cx="30" cy="7" r="6"/>
    </g>
    <g transform="translate(50 50) rotate(45)">
      <rect x="-30" y="-4" width="60" height="8" rx="1"/>
      <circle cx="-30" cy="-7" r="6"/>
      <circle cx="-30" cy="7" r="6"/>
      <circle cx="30" cy="-7" r="6"/>
      <circle cx="30" cy="7" r="6"/>
    </g>
  </g>`,

  // Melquíades: el pergamino enrollado
  pergamino: `<g fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 32 26 L 68 26 L 70 74 L 30 74 Z"/>
    <path d="M 32 26 Q 22 22 22 18 Q 22 14 28 14 Q 36 14 36 22 Q 36 26 32 26"/>
    <path d="M 68 26 Q 78 22 78 18 Q 78 14 72 14 Q 64 14 64 22 Q 64 26 68 26"/>
    <path d="M 32 18 L 68 18" stroke-width="1.5" opacity="0.5"/>
    <path d="M 30 74 Q 20 78 20 82 Q 20 86 26 86 Q 34 86 34 78 Q 34 74 30 74"/>
    <path d="M 70 74 Q 80 78 80 82 Q 80 86 74 86 Q 66 86 66 78 Q 66 74 70 74"/>
    <path d="M 30 82 L 70 82" stroke-width="1.5" opacity="0.5"/>
    <path d="M 38 36 L 62 36" stroke-width="1.6"/>
    <path d="M 38 44 L 58 44" stroke-width="1.6"/>
    <path d="M 38 52 L 62 52" stroke-width="1.6"/>
    <path d="M 38 60 L 56 60" stroke-width="1.6"/>
  </g>`,

  // Pilar Ternera: las cartas
  cartas: `<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="22" y="32" width="22" height="36" rx="2" transform="rotate(-20 33 50)"/>
    <rect x="39" y="28" width="22" height="36" rx="2"/>
    <rect x="56" y="32" width="22" height="36" rx="2" transform="rotate(20 67 50)"/>
    <path d="M 50 40 Q 46 36 44 40 Q 44 44 50 50 Q 56 44 56 40 Q 54 36 50 40 Z" fill="currentColor" stroke="none"/>
  </g>`,

  // Remedios la Bella: la sábana flotante
  sabana: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 38 Q 20 28 30 36 Q 40 44 50 36 Q 60 28 70 36 Q 80 44 88 38 L 88 60 Q 80 70 70 60 Q 60 52 50 60 Q 40 70 30 60 Q 20 52 12 60 Z"/>
    <path d="M 26 78 L 36 84 M 46 80 L 50 88 M 64 78 L 60 86 M 70 76 L 80 82" stroke-width="2" opacity="0.6"/>
  </g>`,

  // Aureliano Segundo: la copa
  copa: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 26 18 L 74 18 L 70 50 Q 66 60 50 60 Q 34 60 30 50 Z"/>
    <path d="M 50 60 L 50 82" stroke-width="4"/>
    <path d="M 32 86 L 68 86" stroke-width="5"/>
    <path d="M 30 30 Q 50 36 70 30" stroke-width="2" opacity="0.6"/>
  </g>`,

  // Fernanda del Carpio: la corona
  corona: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 14 70 L 22 32 L 36 56 L 50 22 L 64 56 L 78 32 L 86 70 Z"/>
    <path d="M 14 70 L 86 70" stroke-width="5"/>
    <circle cx="22" cy="32" r="3" fill="currentColor" stroke="none"/>
    <circle cx="50" cy="22" r="4" fill="currentColor" stroke="none"/>
    <circle cx="78" cy="32" r="3" fill="currentColor" stroke="none"/>
    <circle cx="50" cy="78" r="2.5" fill="currentColor" stroke="none"/>
  </g>`,

  // Mauricio Babilonia: la mariposa
  mariposa: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50 24 L 50 78" stroke-width="4"/>
    <path d="M 50 32 Q 18 18 18 38 Q 18 50 38 48 Q 48 46 50 38 Z"/>
    <path d="M 50 32 Q 82 18 82 38 Q 82 50 62 48 Q 52 46 50 38 Z"/>
    <path d="M 50 50 Q 30 56 26 72 Q 26 82 40 78 Q 48 74 50 64 Z"/>
    <path d="M 50 50 Q 70 56 74 72 Q 74 82 60 78 Q 52 74 50 64 Z"/>
    <circle cx="50" cy="22" r="3" fill="currentColor" stroke="none"/>
    <path d="M 50 22 Q 44 14 40 12 M 50 22 Q 56 14 60 12" stroke-width="2"/>
  </g>`,

  // Amaranta Úrsula: la jaula con pájaro
  jaula: `<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 22 80 L 22 38 Q 22 22 50 22 Q 78 22 78 38 L 78 80 Z" stroke-width="3"/>
    <path d="M 32 26 L 32 80 M 42 22 L 42 80 M 50 22 L 50 80 M 58 22 L 58 80 M 68 26 L 68 80" stroke-width="1.5" opacity="0.6"/>
    <path d="M 18 80 L 82 80" stroke-width="4"/>
    <path d="M 46 14 L 54 14 M 50 14 L 50 22" stroke-width="2.5"/>
    <ellipse cx="50" cy="56" rx="8" ry="5" fill="currentColor" stroke="none"/>
    <path d="M 56 54 L 60 50 M 56 54 L 60 56" stroke-width="1.5"/>
  </g>`,

  // Aureliano Babilonia: la pluma de oca + tintero
  pluma: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 66 8 Q 56 26 46 44 Q 38 56 32 66" stroke-width="3.5"/>
    <path d="M 66 8 Q 80 18 78 32 Q 74 42 64 50 Q 54 56 42 60 Q 34 64 30 68 Q 34 56 40 48 Q 48 38 56 28 Q 62 16 66 8 Z"/>
    <path d="M 63 16 L 70 16" stroke-width="1.8" opacity="0.7"/>
    <path d="M 59 24 L 70 24" stroke-width="1.8" opacity="0.7"/>
    <path d="M 55 32 L 68 32" stroke-width="1.8" opacity="0.7"/>
    <path d="M 50 40 L 64 40" stroke-width="1.8" opacity="0.7"/>
    <path d="M 44 48 L 58 48" stroke-width="1.8" opacity="0.7"/>
    <path d="M 38 56 L 50 56" stroke-width="1.8" opacity="0.7"/>
    <path d="M 32 66 L 28 74" stroke-width="3.5"/>
    <path d="M 18 76 L 38 76" stroke-width="3"/>
    <path d="M 22 76 L 22 82 M 34 76 L 34 82"/>
    <path d="M 22 82 L 14 96 L 42 96 L 34 82 Z"/>
    <path d="M 19 88 L 37 88" stroke-width="1.6" opacity="0.5"/>
  </g>`,

  // Aureliano (último): la hormiga
  hormiga: `<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="50" r="10" fill="currentColor" stroke="none"/>
    <path d="M 32 50 L 40 50" stroke-width="3"/>
    <circle cx="48" cy="50" r="8" fill="currentColor" stroke="none"/>
    <path d="M 56 50 L 64 50" stroke-width="3"/>
    <ellipse cx="78" cy="50" rx="14" ry="11" fill="currentColor" stroke="none"/>
    <path d="M 18 44 Q 8 32 6 22" stroke-width="2.5"/>
    <path d="M 20 42 Q 12 28 16 18" stroke-width="2.5"/>
    <path d="M 42 56 L 36 72 L 32 78" stroke-width="2.5"/>
    <path d="M 48 58 L 48 76" stroke-width="2.5"/>
    <path d="M 54 56 L 60 72 L 64 78" stroke-width="2.5"/>
    <path d="M 42 44 L 36 30" stroke-width="2" opacity="0.5"/>
    <path d="M 54 44 L 60 30" stroke-width="2" opacity="0.5"/>
  </g>`,

  // Arcadio: la pistola del fusilamiento
  pistola: `<g stroke-linecap="round" stroke-linejoin="round">
    <rect x="50" y="38" width="42" height="10" fill="currentColor"/>
    <rect x="86" y="34" width="4" height="4" fill="currentColor"/>
    <rect x="26" y="40" width="28" height="18" rx="2" fill="currentColor"/>
    <path d="M 24 34 L 30 34 L 30 40 L 24 40 Z" fill="currentColor"/>
    <circle cx="40" cy="49" r="10" fill="currentColor"/>
    <circle cx="40" cy="49" r="7" fill="none" stroke="var(--bg)" stroke-width="1.5"/>
    <circle cx="40" cy="44" r="1.5" fill="var(--bg)"/>
    <circle cx="44" cy="48" r="1.5" fill="var(--bg)"/>
    <circle cx="43" cy="53" r="1.5" fill="var(--bg)"/>
    <circle cx="37" cy="53" r="1.5" fill="var(--bg)"/>
    <circle cx="36" cy="48" r="1.5" fill="var(--bg)"/>
    <path d="M 26 58 L 18 88 L 34 92 L 42 60 Z" fill="currentColor"/>
    <path d="M 34 58 L 50 58 L 50 64 Q 50 74 42 74 Q 34 74 34 66 Z" fill="currentColor"/>
    <path d="M 37 60 L 47 60 L 47 64 Q 47 71 42 71 Q 37 71 37 66 Z" fill="var(--bg)"/>
  </g>`,

  // Petra Cotes: la vaca de la fecundidad
  venado: `<g fill="currentColor" stroke="none">
    <rect x="12" y="42" width="54" height="26" rx="10"/>
    <rect x="60" y="46" width="28" height="22" rx="6"/>
    <path d="M 64 46 L 62 38 L 70 44 Z"/>
    <path d="M 84 46 L 86 38 L 78 44 Z"/>
    <path d="M 70 44 Q 70 36 66 36" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 78 44 Q 78 36 82 36" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="70" cy="54" r="1.8" fill="var(--bg)"/>
    <circle cx="78" cy="54" r="1.8" fill="var(--bg)"/>
    <ellipse cx="74" cy="62" rx="6" ry="3.5" fill="var(--bg)"/>
    <circle cx="71" cy="62" r="1" fill="currentColor"/>
    <circle cx="77" cy="62" r="1" fill="currentColor"/>
    <rect x="18" y="68" width="7" height="18" rx="1"/>
    <rect x="28" y="68" width="7" height="18" rx="1"/>
    <rect x="44" y="68" width="7" height="18" rx="1"/>
    <rect x="54" y="68" width="7" height="18" rx="1"/>
    <ellipse cx="40" cy="72" rx="5" ry="4"/>
    <circle cx="36" cy="75" r="1.2" fill="var(--bg)"/>
    <circle cx="40" cy="76" r="1.2" fill="var(--bg)"/>
    <circle cx="44" cy="75" r="1.2" fill="var(--bg)"/>
    <ellipse cx="26" cy="50" rx="5" ry="3.5" fill="var(--bg)"/>
    <ellipse cx="50" cy="58" rx="6" ry="3" fill="var(--bg)"/>
    <path d="M 12 48 L 6 42" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="5" cy="41" r="2"/>
  </g>`,

  // Meme: el clavicordio
  clavicordio: `<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 10 32 L 90 32 L 90 56 L 10 56 Z"/>
    <path d="M 10 32 L 14 28 L 86 28 L 90 32" stroke-width="2"/>
    <path d="M 14 44 L 86 44" stroke-width="2"/>
    <path d="M 22 44 L 22 56" stroke-width="1.5"/>
    <path d="M 30 44 L 30 56" stroke-width="1.5"/>
    <path d="M 38 44 L 38 56" stroke-width="1.5"/>
    <path d="M 46 44 L 46 56" stroke-width="1.5"/>
    <path d="M 54 44 L 54 56" stroke-width="1.5"/>
    <path d="M 62 44 L 62 56" stroke-width="1.5"/>
    <path d="M 70 44 L 70 56" stroke-width="1.5"/>
    <path d="M 78 44 L 78 56" stroke-width="1.5"/>
    <rect x="26" y="44" width="4" height="7" fill="currentColor" stroke="none"/>
    <rect x="34" y="44" width="4" height="7" fill="currentColor" stroke="none"/>
    <rect x="50" y="44" width="4" height="7" fill="currentColor" stroke="none"/>
    <rect x="58" y="44" width="4" height="7" fill="currentColor" stroke="none"/>
    <rect x="66" y="44" width="4" height="7" fill="currentColor" stroke="none"/>
    <path d="M 18 56 L 18 78" stroke-width="3"/>
    <path d="M 82 56 L 82 78" stroke-width="3"/>
    <path d="M 18 78 L 82 78" stroke-width="2.5"/>
    <path d="M 50 78 L 50 86 L 56 86" stroke-width="2"/>
  </g>`,

  // Cruz de ceniza (los 17 Aurelianos)
  cruzCeniza: `<g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
    <path d="M 50 22 L 50 78" stroke-width="6"/>
    <path d="M 28 38 L 72 38" stroke-width="6"/>
    <circle cx="50" cy="38" r="20" fill="none" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.6"/>
  </g>`,

  // José Arcadio Segundo: el tren
  tren: `<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="16" y="42" width="50" height="28" rx="2"/>
    <path d="M 66 30 L 86 30 L 86 70 L 66 70 Z"/>
    <rect x="72" y="38" width="10" height="10" fill="currentColor" stroke="none"/>
    <path d="M 22 42 L 22 22 L 34 22 L 34 42"/>
    <path d="M 28 18 Q 24 12 28 8 Q 32 12 28 6" stroke-width="2" opacity="0.6"/>
    <circle cx="28" cy="76" r="6" stroke-width="3"/>
    <circle cx="28" cy="76" r="2" fill="currentColor" stroke="none"/>
    <circle cx="52" cy="76" r="6" stroke-width="3"/>
    <circle cx="52" cy="76" r="2" fill="currentColor" stroke="none"/>
    <circle cx="76" cy="76" r="6" stroke-width="3"/>
    <circle cx="76" cy="76" r="2" fill="currentColor" stroke="none"/>
    <path d="M 6 88 L 96 88" stroke-width="2" opacity="0.5"/>
  </g>`,
};

function createGlyph(name, size) {
  size = size || 100;
  const inner = SYMBOL_SVG[name];
  if (!inner) return null;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.style.display = 'block';
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = inner;
  return svg;
}

window.SYMBOL_SVG = SYMBOL_SVG;
window.createGlyph = createGlyph;
