/* Cien años · símbolos personales (vanilla JS, sin JSX) ------------------- */

const SYMBOL_SVG = {

  castano: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
    <path d="M 50 95 L 50 55" stroke-width="2.2"/>
    <path d="M 50 55 C 38 50, 32 38, 30 28 M 50 55 C 62 50, 68 38, 70 28"/>
    <path d="M 50 50 C 42 45, 38 32, 38 20 M 50 50 C 58 45, 62 32, 62 20"/>
    <path d="M 50 45 C 50 35, 50 25, 50 15"/>
    <circle cx="30" cy="26" r="2" fill="currentColor"/>
    <circle cx="40" cy="20" r="1.6" fill="currentColor"/>
    <circle cx="50" cy="14" r="2" fill="currentColor"/>
    <circle cx="60" cy="19" r="1.6" fill="currentColor"/>
    <circle cx="70" cy="26" r="2" fill="currentColor"/>
    <path d="M 38 95 L 62 95" stroke-width="1"/>
  </g>`,

  ave: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 22 60 C 35 45, 55 40, 72 50 L 80 48 L 76 56 C 70 70, 50 75, 38 68 Z"/>
    <circle cx="68" cy="50" r="1.6" fill="currentColor"/>
    <path d="M 35 55 C 42 58, 50 60, 58 58" opacity="0.55"/>
    <path d="M 22 60 L 12 65" stroke-width="1.2"/>
    <path d="M 18 63 L 10 60" stroke-width="1.2" opacity="0.7"/>
  </g>`,

  pescadito: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 12 50 C 28 28, 64 28, 78 50 C 64 72, 28 72, 12 50 Z"/>
    <path d="M 78 50 L 92 38 L 92 62 Z"/>
    <circle cx="24" cy="46" r="2.2" fill="currentColor"/>
    <path d="M 38 48 L 52 48 M 42 53 L 56 53 M 40 43 L 54 43" stroke-width="1"/>
  </g>`,

  culebra: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
    <path d="M 16 30 C 30 30, 30 50, 50 50 C 70 50, 70 70, 84 70"/>
    <circle cx="84" cy="70" r="3" fill="currentColor"/>
    <path d="M 87 67 L 92 64 M 87 73 L 92 76" stroke-width="1"/>
    <path d="M 22 28 L 18 24 L 14 28" stroke-width="1.2"/>
  </g>`,

  mano: `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 38 90 L 38 60 C 38 56, 34 50, 34 42 L 34 30"/>
    <path d="M 38 60 L 42 30 M 46 60 L 50 25 M 54 60 L 58 32"/>
    <path d="M 62 60 L 64 42 C 64 38, 62 35, 60 35 L 56 38"/>
    <path d="M 28 75 L 72 75" stroke-width="2.8"/>
    <path d="M 28 80 L 72 80" stroke-width="2.8"/>
  </g>`,

  huesos: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 18 22 L 82 78" stroke-width="3"/>
    <circle cx="18" cy="22" r="6"/>
    <circle cx="82" cy="78" r="6"/>
    <path d="M 82 22 L 18 78" stroke-width="3"/>
    <circle cx="82" cy="22" r="6"/>
    <circle cx="18" cy="78" r="6"/>
  </g>`,

  pergamino: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 18 28 C 14 28, 14 36, 18 36 L 76 36 C 80 36, 80 28, 76 28 Z"/>
    <path d="M 18 36 L 18 72 C 18 76, 22 76, 22 72 L 22 36"/>
    <path d="M 76 36 L 76 76 C 80 76, 80 64, 76 60 L 30 60 C 26 64, 26 72, 30 72 L 76 72"/>
    <path d="M 30 44 L 70 44 M 30 50 L 64 50" stroke-width="0.9" opacity="0.8"/>
  </g>`,

  cartas: `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="20" y="34" width="26" height="40" transform="rotate(-15 33 54)"/>
    <rect x="37" y="30" width="26" height="40"/>
    <rect x="54" y="34" width="26" height="40" transform="rotate(15 67 54)"/>
    <path d="M 47 50 L 53 50 M 50 47 L 50 53" stroke-width="1.6"/>
  </g>`,

  sabana: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 16 32 C 28 24, 42 28, 50 32 C 60 28, 75 24, 86 36 C 90 50, 84 60, 70 60 L 30 60 C 16 60, 12 46, 16 32 Z"/>
    <path d="M 25 70 C 30 75, 40 72, 45 76 M 55 72 C 62 78, 68 74, 75 78" opacity="0.7"/>
    <path d="M 28 85 L 35 90 M 50 85 L 50 92 M 65 85 L 72 90" opacity="0.5" stroke-width="1"/>
  </g>`,

  copa: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 30 18 L 70 18 L 64 52 C 64 60, 56 64, 50 64 C 44 64, 36 60, 36 52 Z"/>
    <path d="M 50 64 L 50 84"/>
    <path d="M 32 84 L 68 84"/>
    <path d="M 36 30 C 44 34, 56 34, 64 30" opacity="0.7"/>
  </g>`,

  corona: `<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 18 60 L 24 28 L 38 50 L 50 22 L 62 50 L 76 28 L 82 60 Z"/>
    <path d="M 18 70 L 82 70"/>
    <path d="M 22 78 L 78 78"/>
    <circle cx="24" cy="28" r="2" fill="currentColor"/>
    <circle cx="50" cy="22" r="2.5" fill="currentColor"/>
    <circle cx="76" cy="28" r="2" fill="currentColor"/>
  </g>`,

  mariposa: `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50 22 L 50 80" stroke-width="2"/>
    <path d="M 50 32 C 30 18, 12 28, 14 44 C 16 56, 32 58, 50 50"/>
    <path d="M 50 32 C 70 18, 88 28, 86 44 C 84 56, 68 58, 50 50"/>
    <path d="M 50 56 C 36 56, 24 64, 26 76 C 30 84, 42 82, 50 76"/>
    <path d="M 50 56 C 64 56, 76 64, 74 76 C 70 84, 58 82, 50 76"/>
    <circle cx="50" cy="22" r="2" fill="currentColor"/>
    <path d="M 48 20 L 44 14 M 52 20 L 56 14" stroke-width="1.2"/>
  </g>`,

  jaula: `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 25 30 L 75 30 L 75 78 L 25 78 Z"/>
    <path d="M 33 30 L 33 78 M 41 30 L 41 78 M 50 30 L 50 78 M 59 30 L 59 78 M 67 30 L 67 78" opacity="0.5" stroke-width="0.9"/>
    <path d="M 25 78 L 75 78" stroke-width="2.4"/>
    <path d="M 35 26 L 50 18 L 65 26" stroke-width="1.2"/>
    <circle cx="50" cy="14" r="1.5" fill="currentColor"/>
    <path d="M 44 56 C 48 50, 56 50, 58 56 C 58 60, 54 62, 50 62 C 46 62, 44 60, 44 56 Z" fill="currentColor" stroke="none"/>
  </g>`,

  pluma: `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 80 16 C 76 24, 68 38, 58 50 C 50 60, 38 70, 22 78 L 18 82 L 28 82 C 40 80, 52 72, 62 60 C 70 50, 76 36, 80 22 Z"/>
    <path d="M 28 82 L 14 92" stroke-width="2"/>
    <path d="M 38 70 L 60 36 M 30 76 L 52 42 M 46 64 L 64 40" opacity="0.5" stroke-width="0.9"/>
  </g>`,

  hormiga: `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="32" cy="50" rx="10" ry="8"/>
    <circle cx="50" cy="50" r="9"/>
    <ellipse cx="72" cy="50" rx="11" ry="9"/>
    <path d="M 28 44 L 22 36 M 36 44 L 36 32" stroke-width="1.2"/>
    <path d="M 42 56 L 32 70 M 48 58 L 44 76 M 56 58 L 58 76 M 64 56 L 70 70" stroke-width="1.2"/>
    <path d="M 50 42 L 50 30 M 50 30 L 44 22 M 50 30 L 56 22" stroke-width="1.2"/>
  </g>`,

  cruzCeniza: `<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
    <path d="M 50 22 L 50 78"/>
    <path d="M 26 38 L 74 38"/>
    <circle cx="50" cy="38" r="14" stroke-width="1.2" stroke-dasharray="3 3"/>
  </g>`,

  tren: `<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="18" y="40" width="50" height="28"/>
    <rect x="68" y="32" width="14" height="36"/>
    <circle cx="28" cy="74" r="4"/>
    <circle cx="42" cy="74" r="4"/>
    <circle cx="58" cy="74" r="4"/>
    <circle cx="76" cy="74" r="4"/>
    <path d="M 75 32 L 75 20 L 88 20"/>
    <path d="M 75 22 C 80 18, 84 14, 86 10" opacity="0.5"/>
    <path d="M 24 50 L 30 50 M 38 50 L 48 50 M 56 50 L 62 50" opacity="0.7"/>
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
