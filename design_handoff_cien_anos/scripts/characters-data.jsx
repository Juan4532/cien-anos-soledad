/* Cien años · datos de personajes (selección, no exhaustiva) ----------- */

// kind: 'buendia' (estirpe directa) | 'consorte' (esposas, esposos) |
//       'amante' | 'gitano' | 'foraneo' (forasteros que tocan la familia)
// gen: 1..7
// angle: degrees, 0 = North, clockwise

const CHARACTERS = [
  // ---------- Gen I — fundadores ----------
  { id: 'jab',  name: 'José Arcadio Buendía', alias: 'el fundador', gen: 1, angle: 195, kind: 'buendia',
    symbol: 'castano',
    born: '1820', died: '1885', chapter: 'I',
    bio: 'Patriarca y fundador de Macondo. Hombre de razón insaciable, de cuya curiosidad febril nacen los experimentos con imanes, lupas y mapas. Termina sus días <em>amarrado al castaño</em> del patio, hablando solo en latín.',
    rels: [
      { id: 'urs', kind: 'esposa' }, { id: 'pil', kind: 'amante' }, { id: 'mel', kind: 'maestro' },
      { id: 'jah', kind: 'hijo' }, { id: 'cor', kind: 'hijo' }, { id: 'ama', kind: 'hija' }
    ]},

  { id: 'urs',  name: 'Úrsula Iguarán', alias: 'la matriarca', gen: 1, angle: 165, kind: 'buendia',
    symbol: 'ave',
    born: '1825', died: '1925', chapter: 'I',
    bio: 'Sostiene la casa cien años. Pequeña, activa, severa; sospechaba en los nombres repetidos la promesa de una desgracia. Muere ciega y diminuta, durante el diluvio, como un <em>pájaro decapitado</em>.',
    rels: [{ id: 'jab', kind: 'esposo' }, { id: 'jah', kind: 'hijo' }, { id: 'cor', kind: 'hijo' }, { id: 'ama', kind: 'hija' }, { id: 'reb', kind: 'hija adoptiva' }]},

  // ---------- Gen II — primera descendencia ----------
  { id: 'jah',  name: 'José Arcadio (hijo)', alias: 'el del tatuaje', gen: 2, angle: 230, kind: 'buendia',
    symbol: 'culebra',
    born: '1846', died: '1875', chapter: 'III',
    bio: 'Se fuga con los gitanos. Vuelve gigantesco, tatuado de pies a cabeza, en compañía de una culebra. Muere de un balazo cuyo hilo de sangre <em>busca a Úrsula a través de toda la casa</em>.',
    rels: [{ id: 'reb', kind: 'esposa' }, { id: 'pil', kind: 'amante' }]},

  { id: 'cor',  name: 'Coronel Aureliano Buendía', alias: '32 guerras perdidas', gen: 2, angle: 195, kind: 'buendia',
    symbol: 'pescadito',
    born: '1848', died: '1908', chapter: 'III',
    bio: 'Promueve treinta y dos levantamientos armados y los pierde todos. Tiene diecisiete hijos varones con diecisiete mujeres distintas. Vuelve a Macondo a fabricar <em>pescaditos de oro</em> que funde y vuelve a hacer.',
    rels: [{ id: 'remm', kind: 'esposa' }, { id: 'pil', kind: 'amante' }, { id: '17a', kind: 'hijos' }, { id: 'aujs', kind: 'hijo' }]},

  { id: 'ama',  name: 'Amaranta', alias: 'la de la mano negra', gen: 2, angle: 160, kind: 'buendia',
    symbol: 'mano',
    born: '1858', died: '1925', chapter: 'IV',
    bio: 'Rivaliza con Rebeca por el amor de Pietro Crespi y, vencedora, lo rechaza. Borda y desborda su propia mortaja. Vendaje negro en la mano, hasta el día <em>fijado por la muerte</em>.',
    rels: [{ id: 'pcr', kind: 'cortejada' }, { id: 'gma', kind: 'amante' }, { id: 'aujs', kind: 'cuidadora' }]},

  { id: 'reb',  name: 'Rebeca', alias: 'la come-tierra', gen: 2, angle: 130, kind: 'buendia',
    symbol: 'huesos',
    born: '1845', died: '1920', chapter: 'IV',
    bio: 'Llega de niña con una bolsa de huesos de sus padres. Adicta a comer tierra y cal. Se casa con José Arcadio (hijo) y, viuda, se encierra en la casa hasta <em>volverse leyenda</em>.',
    rels: [{ id: 'jah', kind: 'esposo' }, { id: 'pcr', kind: 'cortejada' }, { id: 'urs', kind: 'madre adoptiva' }]},

  // ---------- Gen II — externos y vínculos ----------
  { id: 'mel',  name: 'Melquíades', alias: 'el alquimista', gen: 2, angle: 25, kind: 'gitano',
    symbol: 'pergamino',
    born: '?', died: '× 2', chapter: 'I',
    bio: 'Gitano sabio que trae a Macondo el imán, la lupa, el hielo. Escribe en sánscrito los pergaminos que <em>nadie podrá descifrar hasta cien años después</em>. Muere dos veces, la segunda en el cuarto que será su mausoleo.',
    rels: [{ id: 'jab', kind: 'discípulo' }, { id: 'aub', kind: 'descifrador' }]},

  { id: 'pil',  name: 'Pilar Ternera', alias: 'la pitonisa', gen: 2, angle: 270, kind: 'amante',
    symbol: 'cartas',
    born: '1830', died: '1930', chapter: 'III',
    bio: 'Lectora de cartas; risueña hasta lo cósmico. Madre de Arcadio (con José Arcadio hijo) y de Aureliano José (con el Coronel). Vive más de cien años; muere sentada en el mecedor del último burdel de Macondo.',
    rels: [{ id: 'jah', kind: 'amante' }, { id: 'cor', kind: 'amante' }, { id: 'arc', kind: 'hijo' }, { id: 'aujs', kind: 'hijo' }]},

  { id: 'pcr',  name: 'Pietro Crespi', alias: 'el de la pianola', gen: 2, angle: 90, kind: 'foraneo',
    born: '1850', died: '1885', chapter: 'IV',
    bio: 'Italiano elegante que trae la pianola a Macondo. Amado por Rebeca y por Amaranta. <em>Se abre las venas</em> después del rechazo de Amaranta.',
    rels: [{ id: 'reb', kind: 'cortejada' }, { id: 'ama', kind: 'cortejada' }]},

  { id: 'gma',  name: 'Gerineldo Márquez', alias: 'compañero del Coronel', gen: 2, angle: 305, kind: 'foraneo',
    born: '1850', died: '1920', chapter: 'V',
    bio: 'Compañero de armas del Coronel. Lo acompaña en treinta y dos derrotas. Espera a Amaranta toda una vida bordando la mortaja.',
    rels: [{ id: 'cor', kind: 'compañero' }, { id: 'ama', kind: 'amante' }]},

  // ---------- Gen III ----------
  { id: 'arc',  name: 'Arcadio', alias: 'el tirano', gen: 3, angle: 240, kind: 'buendia',
    symbol: 'pistola',
    born: '1865', died: '1885', chapter: 'V',
    bio: 'Hijo natural de José Arcadio (hijo) y Pilar Ternera. Maestro convertido en jefe civil y militar. Ejerce su autoridad con tal crueldad que termina <em>fusilado contra la tapia del cementerio</em>.',
    rels: [{ id: 'jah', kind: 'padre' }, { id: 'pil', kind: 'madre' }, { id: 'ssp', kind: 'esposa' }, { id: 'rem4', kind: 'hija' }, { id: 'ja2', kind: 'hijo' }, { id: 'au2', kind: 'hijo' }]},

  { id: 'aujs', name: 'Aureliano José', alias: 'criado por Amaranta', gen: 3, angle: 215, kind: 'buendia',
    born: '1870', died: '1903', chapter: 'V',
    bio: 'Hijo del Coronel y Pilar Ternera. Criado por Amaranta, la desea con un fuego incestuoso. Muere de un balazo en el pecho durante las guerras.',
    rels: [{ id: 'cor', kind: 'padre' }, { id: 'pil', kind: 'madre' }, { id: 'ama', kind: 'criadora' }]},

  { id: 'remm', name: 'Remedios Moscote', alias: 'la niña esposa', gen: 3, angle: 110, kind: 'consorte',
    born: '1860', died: '1881', chapter: 'IV',
    bio: 'Niña de nueve años cuando el Coronel se enamora de ella. Muere muy joven, embarazada de gemelos, en su propia sangre.',
    rels: [{ id: 'cor', kind: 'esposo' }]},

  { id: '17a',  name: 'Los 17 Aurelianos', alias: 'hijos de la guerra', gen: 3, angle: 0, kind: 'buendia',
    symbol: 'cruzCeniza',
    born: 'varios', died: '× 17', chapter: 'IX',
    bio: 'Diecisiete hijos del Coronel, marcados con una cruz indeleble de ceniza en la frente. <em>Los matan a todos</em> uno a uno, una noche de luna, por la marca.',
    rels: [{ id: 'cor', kind: 'padre' }]},

  { id: 'ssp',  name: 'Santa Sofía de la Piedad', alias: 'la silenciosa', gen: 3, angle: 75, kind: 'consorte',
    born: '1855', died: '1925', chapter: 'VI',
    bio: 'Mujer dócil y sin biografía, esposa de Arcadio. Cría a sus hijos en la casa de los Buendía. Una noche, sin despedirse, <em>desaparece para siempre</em>.',
    rels: [{ id: 'arc', kind: 'esposo' }, { id: 'rem4', kind: 'hija' }, { id: 'ja2', kind: 'hijo' }, { id: 'au2', kind: 'hijo' }]},

  // ---------- Gen IV ----------
  { id: 'rem4', name: 'Remedios la Bella', alias: 'sube al cielo', gen: 4, angle: 180, kind: 'buendia',
    symbol: 'sabana',
    born: '1880', died: '× sube al cielo', chapter: 'XII',
    bio: 'Hija de Arcadio y Santa Sofía. De una hermosura perturbadora, ignorante de su efecto en los hombres. <em>Asciende al cielo</em> en cuerpo y alma una mañana de marzo, mientras dobla unas sábanas.',
    rels: [{ id: 'arc', kind: 'padre' }, { id: 'ssp', kind: 'madre' }]},

  { id: 'ja2',  name: 'José Arcadio Segundo', alias: 'el de los muertos', gen: 4, angle: 215, kind: 'buendia',
    symbol: 'tren',
    born: '1875', died: '1925', chapter: 'XII',
    bio: 'Gemelo de Aureliano Segundo. Capataz de la compañía bananera y testigo de la matanza de los obreros. Único que sostiene la memoria del <em>tren de tres mil muertos</em>.',
    rels: [{ id: 'arc', kind: 'padre' }, { id: 'au2', kind: 'gemelo' }, { id: 'aub', kind: 'tutor' }]},

  { id: 'au2',  name: 'Aureliano Segundo', alias: 'el de la fiesta', gen: 4, angle: 245, kind: 'buendia',
    symbol: 'copa',
    born: '1875', died: '1925', chapter: 'X',
    bio: 'Gemelo desordenado, rico por la fertilidad de Petra Cotes y los animales que con ella se multiplican. <em>Glotón hasta la enormidad</em>; muere el mismo día que su hermano.',
    rels: [{ id: 'fer', kind: 'esposa' }, { id: 'pet', kind: 'amante' }, { id: 'jose5', kind: 'hijo' }, { id: 'meme', kind: 'hija' }, { id: 'amu', kind: 'hija' }]},

  { id: 'fer',  name: 'Fernanda del Carpio', alias: 'la reina', gen: 4, angle: 90, kind: 'consorte',
    symbol: 'corona',
    born: '1885', died: '1930', chapter: 'X',
    bio: 'Criada para ser reina; trae a la casa la rigidez del altiplano, los calendarios de oración, los pésames de tres cuartillas. Madre de Meme, José Arcadio (cardenal) y Amaranta Úrsula.',
    rels: [{ id: 'au2', kind: 'esposo' }, { id: 'jose5', kind: 'hijo' }, { id: 'meme', kind: 'hija' }, { id: 'amu', kind: 'hija' }]},

  { id: 'pet',  name: 'Petra Cotes', alias: 'la fecundidad', gen: 4, angle: 320, kind: 'amante',
    symbol: 'venado',
    born: '1880', died: '1935', chapter: 'X',
    bio: 'Amante de Aureliano Segundo; basta su presencia para que los animales se multipliquen sin medida. Sobrevive a la riqueza y al diluvio, fiel hasta la inanición.',
    rels: [{ id: 'au2', kind: 'amante' }]},

  // ---------- Gen V ----------
  { id: 'jose5', name: 'José Arcadio (cardenal)', alias: 'enviado a Roma', gen: 5, angle: 70, kind: 'buendia',
    born: '1905', died: '1928', chapter: 'XV',
    bio: 'Destinado al sacerdocio por orden de Fernanda. Vuelve de Roma sin haber tomado órdenes. Vive escondido en la casa con cuatro niños hasta ser <em>asesinado en su baño</em>.',
    rels: [{ id: 'au2', kind: 'padre' }, { id: 'fer', kind: 'madre' }]},

  { id: 'meme', name: 'Renata Remedios «Meme»', alias: 'la de los alacranes', gen: 5, angle: 200, kind: 'buendia',
    symbol: 'clavicordio',
    born: '1905', died: '1955', chapter: 'XIV',
    bio: 'Enviada a un colegio de monjas; vuelve apasionada de la música y de Mauricio Babilonia. Cuando lo hieren a balazos en el patio de su casa, <em>nunca vuelve a hablar</em>.',
    rels: [{ id: 'au2', kind: 'padre' }, { id: 'fer', kind: 'madre' }, { id: 'mau', kind: 'amante' }, { id: 'aub', kind: 'hijo' }]},

  { id: 'amu',  name: 'Amaranta Úrsula', alias: 'la última', gen: 5, angle: 35, kind: 'buendia',
    symbol: 'jaula',
    born: '1915', died: '1945', chapter: 'XVIII',
    bio: 'La última hija. Vuelve de Bruselas con su esposo Gastón y una jaula de canarios. Su amor con Aureliano Babilonia cierra el ciclo y <em>engendra al niño con cola de cerdo</em>.',
    rels: [{ id: 'au2', kind: 'padre' }, { id: 'fer', kind: 'madre' }, { id: 'gas', kind: 'esposo' }, { id: 'aub', kind: 'amante' }, { id: 'aul', kind: 'hijo' }]},

  { id: 'mau',  name: 'Mauricio Babilonia', alias: 'el de las mariposas amarillas', gen: 5, angle: 145, kind: 'foraneo',
    symbol: 'mariposa',
    born: '1900', died: '1932', chapter: 'XIV',
    bio: 'Aprendiz de mecánico de la compañía bananera. Lo siguen mariposas amarillas a todas partes. Lo hieren a balazos por <em>ladrón de gallinas</em> al subir al cuarto de Meme.',
    rels: [{ id: 'meme', kind: 'amante' }, { id: 'aub', kind: 'hijo' }]},

  { id: 'gas',  name: 'Gastón', alias: 'el aviador', gen: 5, angle: 0, kind: 'foraneo',
    born: '1908', died: '?', chapter: 'XVIII',
    bio: 'Belga sereno. Esposo de Amaranta Úrsula. Espera durante meses la llegada de un avión que termina por embarcar a otro destino.',
    rels: [{ id: 'amu', kind: 'esposa' }]},

  // ---------- Gen VI ----------
  { id: 'aub',  name: 'Aureliano Babilonia', alias: 'el descifrador', gen: 6, angle: 195, kind: 'buendia',
    symbol: 'pluma',
    born: '1925', died: '1945', chapter: 'XVI',
    bio: 'Hijo escondido de Meme y Mauricio Babilonia. Crece encerrado en la casa, estudia sánscrito en los pergaminos de Melquíades. <em>Descifra el manuscrito mientras se desploma la casa.</em>',
    rels: [{ id: 'meme', kind: 'madre' }, { id: 'mau', kind: 'padre' }, { id: 'amu', kind: 'amante' }, { id: 'aul', kind: 'hijo' }, { id: 'mel', kind: 'maestro' }]},

  // ---------- Gen VII ----------
  { id: 'aul',  name: 'Aureliano (el último)', alias: 'cola de cerdo', gen: 7, angle: 195, kind: 'buendia',
    symbol: 'hormiga',
    born: '1945', died: '× devorado', chapter: 'XX',
    bio: 'Único hijo concebido con amor en la estirpe. Nace con <em>una cola de cerdo</em>, como había anunciado Úrsula. Es devorado por las hormigas; con él se cumple la profecía.',
    rels: [{ id: 'aub', kind: 'padre' }, { id: 'amu', kind: 'madre' }]},
];

// quick lookup
const CHAR_BY_ID = Object.fromEntries(CHARACTERS.map(c => [c.id, c]));

const KIND_LABEL = {
  buendia:  'Estirpe',
  consorte: 'Consorte',
  amante:   'Amante',
  gitano:   'Gitanos',
  foraneo:  'Forasteros',
};

const KIND_ORDER = ['buendia', 'consorte', 'amante', 'gitano', 'foraneo'];

const GEN_LABEL = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

window.CHARACTERS = CHARACTERS;
window.CHAR_BY_ID = CHAR_BY_ID;
window.KIND_LABEL = KIND_LABEL;
window.KIND_ORDER = KIND_ORDER;
window.GEN_LABEL  = GEN_LABEL;
