# Análisis del motor ladonacion.es

Repositorio analizado: <https://github.com/JaimeObregon/ladonacion>  
Clonado en: `/home/juan/proyectos/ladonacion/`  
Fecha del análisis: 2026-05-16

---

## Índice

1. [Visión general](#1-visión-general)
2. [Estructura de directorios](#2-estructura-de-directorios)
3. [Stack técnico](#3-stack-técnico)
4. [Modelo de datos](#4-modelo-de-datos)
5. [Separación motor / carrocería](#5-separación-motor--carrocería)
6. [Cómo se consumen los datos](#6-cómo-se-consumen-los-datos)
7. [Esquema de relaciones](#7-esquema-de-relaciones)
8. [Build y deploy](#8-build-y-deploy)
9. [Tabla de correspondencias con el proyecto CAS](#9-tabla-de-correspondencias-con-el-proyecto-cas)
10. [Plan de adaptación](#10-plan-de-adaptación)

---

## 1. Visión general

ladonacion.es es una **SPA (Single Page Application) completamente vanilla**, sin frameworks de frontend. Combina cuatro visualizaciones interactivas —grafo de relaciones, cronología, mapa y biblioteca— sobre un corpus de datos investigativos.

La arquitectura está pensada para ser **completamente reutilizable**: los datos se definen en JSON5 en `/data/`, se validan y compilan a un único módulo ES (`ladonacion.js`) en tiempo de build, y el frontend los importa directamente. El motor no contiene ninguna referencia hardcodeada a Juan Carlos ni a la investigación en concreto.

```
datos JSON5  →  validate.js  →  ladonacion.js (compilado)  →  Web Components
               (build time)    (export const data = {...})    (runtime)
```

---

## 2. Estructura de directorios

```
ladonacion/
├── data/                          ← DATOS (no se despliegan, solo en build)
│   ├── persons.json5
│   ├── entities.json5             (organizaciones, empresas, fundaciones)
│   ├── events.json5
│   ├── places.json5
│   ├── documents.json5            (PDFs: contratos, cartas, actas)
│   ├── articles.json5             (prensa: artículos referenciados)
│   ├── relations.json5            (catálogo de tipos de relación)
│   ├── sources.json5              (catálogo de medios de comunicación)
│   └── schemas/                   (JSON Schema v7 para validación)
│       ├── persons.json5
│       ├── entities.json5
│       ├── events.json5
│       ├── places.json5
│       ├── documents.json5
│       ├── articles.json5
│       ├── relations.json5
│       ├── sources.json5
│       └── subschemas/
│           ├── country.json5      (ISO 3166-1 alpha-2)
│           ├── gender.json5       (male | female)
│           ├── language.json5     (ISO 639-1)
│           ├── picture.json5      (foto local o Getty Images embed)
│           ├── relation.json5     (subject + object + type + period?)
│           └── url.json5
├── bin/                           ← HERRAMIENTAS DE BUILD
│   ├── validate.js                (valida schemas, genera thumbnails, compila datos)
│   ├── config.js                  (rutas y configuración global del build)
│   ├── modules/screenshot.js
│   └── package.json               (jsonschema, capture-website, gm)
├── httpdocs/                      ← APLICACIÓN WEB (lo que se despliega)
│   ├── index.html                 (entry point, solo <script type="module">)
│   ├── assets/
│   │   ├── javascript/
│   │   │   ├── ladonacion.js      (inicializador SPA, router, globals)
│   │   │   ├── components/        (25 Web Components)
│   │   │   └── modules/           (router, references, countries, languages, patrons)
│   │   └── stylesheets/
│   │       └── ladonacion.css     (variables CSS, layout responsivo)
│   └── resources/                 ← DATOS COMPILADOS + ASSETS
│       ├── ladonacion.js          (GENERADO: export const data = {...})
│       ├── persons/{avatars,pictures,signatures}/
│       ├── entities/{avatars,pictures}/
│       ├── events/pictures/
│       ├── places/
│       ├── documents/{thumbnails}/
│       ├── articles/{screenshots,thumbnails}/
│       └── sources/{logos,avatars}/
├── snowpack.config.js             (bundler: bundle + minify, target es2018)
└── package.json                   (snowpack + terser + imagemin)
```

---

## 3. Stack técnico

| Capa | Tecnología |
|------|-----------|
| Lenguaje | JavaScript ES2018 (vanilla, sin transpiler) |
| Componentes UI | **Web Components** (Custom Elements + Shadow DOM) |
| Bundler | **Snowpack 3** |
| Minificación | Terser (2 passes, `drop_console`, `unsafe_arrows`) |
| Optimización imágenes | imagemin-mozjpeg (quality 70) + imagemin-optipng |
| Grafos | **D3.js** (cargado desde CDN Skypack, no instalado) |
| Mapas | **Mapbox GL JS** (CDN, token hardcodeado en el init) |
| Validación datos | JSON Schema v7 (solo en build, via `jsonschema` npm) |
| Datos en runtime | ES module: `export const data = {...}` |
| Dependencias runtime | **NINGUNA** — vanilla JS puro |

El target `es2018` implica que no hay soporte para IE11 ni navegadores muy antiguos. El uso de dynamic `import()` para cargar páginas on-demand requiere soporte nativo de módulos ES.

---

## 4. Modelo de datos

### 4.1 Entidades y sus campos

#### `persons` — Personas físicas

```js
{
  id:          'juan_carlos',            // slug único, lowercase_underscore
  avatar:      'file:persons/avatars/juan_carlos.jpg',
  title:       'S.M. el Rey Don Juan Carlos I',  // nombre formal
  alias:       'Juan Carlos',            // nombre corto (para etiquetas UI)
  description: '<p>Es el...</p>',        // HTML; puede contener refs internas
  gender:      'male',                   // 'male' | 'female'

  // Opcionales:
  birthdate:    '1938-01-05',            // ISO 8601
  deathdate:    '...',
  nationality:  'es',                    // ISO 3166-1 alpha-2
  residence:    'ae',
  wikipedia:    'https://es.wikipedia.org/wiki/...',
  linkedin:     'https://www.linkedin.com/in/...',
  panamaPapers: 'https://offshoreleaks.icij.org/nodes/...',
  paradisePapers: '...',
  pictures:     [{ id: '490462508', src: '//embed.gettyimages.com/...', ... }],
  signatures:   ['file:persons/signatures/juan_carlos_1.jpg'],
  names:        ['Juan Carlos de Borbón y Borbón', ...]
}
```

#### `entities` — Organizaciones, empresas, fundaciones

Mismos campos que `persons` (incluyendo `gender` gramatical para generar frases), más:

```js
{
  country:  'ch',            // sede
  website:  'https://...',
  linkedin: 'https://www.linkedin.com/company/...',
  bahamasLeaks: 'https://...'
}
```

#### `events` — Hechos cronológicos

```js
{
  id:          'juan_carlos_dona_a_corinna',
  title:       'Juan Carlos dona 65 millones a Corinna',
  date:        '2012-06-05',             // ISO 8601, requerido
  description: '<p>Tras el safari...</p>',

  // Opcionales:
  where:    '#/places/belgrave',         // ref interna a place
  document: '#/documents/carta_...',    // ref interna a document
  pictures: [...]
}
```

#### `places` — Lugares geográficos

```js
{
  id:          'francois_bellot_2',
  title:       'Rue François-Bellot, 2',
  description: '<p>Oficinas de...</p>',
  country:     'ch',
  coords:      [46.19777, 6.15163],      // [lat, lon]
  zoom:        17,
  google:      {
    link:  'https://goo.gl/maps/...',    // enlace corto
    embed: 'https://www.google.com/maps/embed?pb=...'
  },

  // Opcionales:
  address: '2, rue François-Bellot',
  town:    'Ginebra',
  zip:     '1206'
}
```

#### `documents` — PDFs: contratos, cartas, actas

```js
{
  id:          'carta_juan_carlos_dante_canonica_2018_08_12',
  file:        'file:documents/carta_...pdf',
  title:       'Carta de Juan Carlos a Dante Canonica',
  description: '<p>Carta sobre la fundación Lucum...</p>',
  lang:        'fr',                     // ISO 639-1
  date:        '2018-08-12',
  origin:      '#/articles/elconfidencial_2720484',  // o URL externa
  relations:   [                         // relaciones anidadas
    {
      subject: '#/persons/juan_carlos',
      object:  '#/documents/carta_...',
      type:    '#/relations/authors'
    },
    {
      subject: '#/documents/carta_...',
      object:  '#/persons/corinna',
      type:    '#/relations/mentions'
    }
  ]
}
```

#### `articles` — Artículos de prensa referenciados

```js
{
  id:        'elconfidencial_2720484',   // convención: {source}_{id_propio}
  url:       'https://www.elconfidencial.com/...',
  source:    '#/sources/elconfidencial',
  title:     'El rey Juan Carlos transfirió...',
  date:      '2020-08-03',
  lang:      'es',
  relations: [
    { subject: '#/articles/...', object: '#/persons/juan_carlos', type: '#/relations/mentions' }
  ],

  // Opcionales (generados en build):
  screenshot: 'file:articles/screenshots/elconfidencial_2720484.jpg',
  thumbnail:  'file:articles/thumbnails/elconfidencial_2720484.jpg'
}
```

#### `sources` — Catálogo de medios de comunicación

```js
{
  id:      'elconfidencial',
  name:    'El Confidencial',
  origin:  'https://www.elconfidencial.com',   // regex de dominio
  country: 'es',
  logo:    'sources/logos/elconfidencial.svg',
  avatar:  'sources/avatars/elconfidencial.jpg'
}
```

#### `relations` — Catálogo de **tipos** de relación (no instancias)

```js
{
  id:   'parent',
  type: 'human',                 // 'human' | 'business' | 'semantic'
  templates: {
    direct:  { male: 'padre de',  female: 'madre de' },
    reverse: { male: 'hijo de',   female: 'hija de' }
  },
  subjects: ['persons'],
  objects:  ['persons']
}

{
  id:   'controls',
  type: 'business',
  templates: {
    direct:  { male: 'controla',        female: 'controla' },
    reverse: { male: 'controlado por',  female: 'controlada por' }
  },
  subjects: ['persons', 'entities'],
  objects:  ['entities']
}

{
  id:   'mentions',              // sin direction, solo template plano
  type: 'semantic',
  templates: { male: 'menciona a', female: 'menciona a' },
  subjects: ['articles', 'documents'],
  objects:  ['persons', 'entities', 'places']
}
```

**Nota**: el campo `gender` de persons/entities no es cultural sino **gramatical**: se usa para seleccionar la plantilla correcta al generar frases («padre de» vs «madre de», «controlado por» vs «controlada por»).

### 4.2 Convenciones de IDs

| Tipo | Patrón | Ejemplos |
|------|--------|---------|
| persons | slug descriptivo | `juan_carlos`, `corinna`, `dante_canonica` |
| entities | slug | `mirabaud`, `banco_lucum` |
| events | acción snake_case | `juan_carlos_dona_a_corinna`, `abdicacion` |
| places | nombre/dirección | `belgrave`, `francois_bellot_2` |
| documents | `{tipo}_{fecha}` | `carta_juan_carlos_2018_08_12` |
| articles | `{source}_{id}` | `elconfidencial_2720484` |
| sources | slug medio | `elconfidencial`, `elpais` |
| relations | verbo | `parent`, `controls`, `mentions` |

### 4.3 Referencias internas

Todas las referencias cruzadas usan el patrón `#/{tipo}/{id}`:

```
#/persons/juan_carlos
#/entities/mirabaud
#/places/belgrave
#/events/abdicacion
#/documents/carta_...
#/articles/elconfidencial_...
#/sources/elconfidencial
#/relations/controls
```

El módulo `references.js` las parsea, resuelve y convierte a URLs navegables en runtime.

---

## 5. Separación motor / carrocería

### 5.1 Motor (100% reutilizable)

Todo lo que está en `httpdocs/` y no contiene texto específico de la investigación:

**Infraestructura SPA**:
- `ladonacion.js` — inicializador, router, registro de Web Components
- `modules/router.js` — SPA client-side router
- `modules/references.js` — parser y resolver de referencias `#/tipo/id`
- `modules/countries.js` — lookup ISO 3166-1 → nombre y bandera
- `modules/languages.js` — lookup ISO 639-1 → nombre idioma

**Componentes de UI genéricos**:
- `ladonacion-header.js` — barra de navegación
- `ladonacion-search.js` — búsqueda full-text sobre todos los tipos
- `ladonacion-details.js` — acordeón expandible
- `ladonacion-popup.js` — modal/notificaciones
- `ladonacion-slideshow.js` — galería de imágenes
- `ladonacion-panel-description.js` — panel descriptor genérico
- `ladonacion-citations.js` — lista de citas/fuentes
- `ladonacion-reference.js` — renderiza una referencia `#/tipo/id`
- `ladonacion-relation.js` — renderiza una relación tipada (sujeto → tipo → objeto)
- `ladonacion-country.js` — bandera + nombre de país ISO
- `ladonacion-excerpt.js` — preview de texto truncado

**Vistas de navegación genéricas**:
- `page-entramado.js` — **grafo D3** de nodos y relaciones (funciona con cualquier datos)
- `page-cronologia.js` — **timeline** de eventos y artículos
- `page-mapa.js` — **mapa Mapbox** de lugares
- `page-biblioteca.js` — **grid/lista** de documentos y artículos con filtros
- `page-portada.js` — splash/portada (contiene texto de la investigación → carrocería)
- `page-metodologia.js` — página estática (contiene texto propio → carrocería)
- `page-autor.js` — página autor (contiene texto propio → carrocería)

**Paneles especializados**:
- `entramado-panel.js` — panel de detalles del nodo seleccionado en el grafo
- `biblioteca-panel.js` — panel de filtros de la biblioteca
- `biblioteca-grid-item.js` — tarjeta de documento/artículo
- `biblioteca-list-item.js` — fila de documento/artículo
- `cronologia-item-event.js` — item de evento en el timeline
- `cronologia-item-article.js` — item de artículo en el timeline
- `mapa-panel.js` — panel de detalles del marcador del mapa

**Herramientas de build**:
- `bin/validate.js` — valida schemas + genera thumbnails + compila `ladonacion.js`
- `bin/config.js` — rutas de entrada/salida del build
- `snowpack.config.js` — bundler config (mount, optimize, plugins)

### 5.2 Carrocería (específica de ladonacion.es)

Los únicos archivos que contienen contenido específico de la investigación:

| Archivo | Contenido específico |
|---------|---------------------|
| `data/*.json5` | Todos los datos: personas, eventos, etc. |
| `data/schemas/` | Esquemas adaptados al dominio |
| `httpdocs/resources/` | Assets: fotos, PDFs, capturas |
| `page-portada.js` | Texto de presentación de la investigación |
| `page-metodologia.js` | Metodología específica del proyecto |
| `page-autor.js` | Bio del autor (Jaime Gómez-Obregón) |
| `ladonacion.css` | Paleta de colores (verde/negro del proyecto) |
| Token Mapbox | Hardcodeado en el init de `page-mapa.js` |

---

## 6. Cómo se consumen los datos

### 6.1 Flujo completo

```
/data/persons.json5          ┐
/data/entities.json5         │
/data/events.json5           │  bin/validate.js
/data/places.json5           ├─────────────────►  /httpdocs/resources/ladonacion.js
/data/documents.json5        │  (build time)       export const data = {
/data/articles.json5         │                       persons: [...],
/data/relations.json5        │                       entities: [...],
/data/sources.json5          ┘                       events: [...], ...
                                                   }
                                                        │
                                                        │ ES module import
                                                        ▼
                                             Web Components (runtime)
```

### 6.2 Importación en componentes

```js
// Cualquier componente importa el módulo compilado
import { data } from '/resources/ladonacion.js'

// Acceso directo a las colecciones
const person = data.persons.find(p => p.id === 'juan_carlos')
const events = data.events.filter(e => e.date.startsWith('2012'))
```

### 6.3 Resolución de referencias

El módulo `references.js` es el núcleo que conecta todo:

```js
import { references } from '/assets/javascript/modules/references.js'

// Parsear una referencia
references.parse('#/persons/juan_carlos')
// → { model: { name: 'persons', path: 'entramado', ... }, id: 'juan_carlos' }

// Resolver al objeto completo
references.object('#/persons/juan_carlos')
// → { id: 'juan_carlos', title: 'S.M. el Rey Don Juan Carlos I', ... }

// Obtener URL navegable
references.link('#/persons/juan_carlos')
// → '/entramado/juan_carlos'

// Reemplazar referencias en HTML
references.replace('<a href="#/persons/juan_carlos">Juan Carlos</a>')
// → '<a href="/entramado/juan_carlos">Juan Carlos</a>'
```

La estructura `models` en `references.js` define para cada tipo su ruta de navegación y cómo obtener el avatar:

```js
export const models = [
  { name: 'persons',   path: 'entramado',  weight: 1.0, avatar: item => `/resources/${item.avatar}` },
  { name: 'entities',  path: 'entramado',  weight: 0.9, avatar: item => `/resources/${item.avatar}` },
  { name: 'places',    path: 'mapa',       weight: 0.8, avatar: item => `/assets/images/flags/1x1/${item.country}.svg` },
  { name: 'documents', path: 'biblioteca', weight: 0.7, avatar: () => false },
  { name: 'events',    path: 'cronologia', weight: 0.6, avatar: () => false },
  { name: 'articles',  path: 'biblioteca', weight: 0.5, avatar: item => `/resources/${references.object(item.source).avatar}` },
  { name: 'relations' },
  { name: 'sources'   },
]
```

### 6.4 Rutas de archivos

Los datos usan prefijo `file:` para las rutas de assets locales:

```
"file:persons/avatars/juan_carlos.jpg"
                ↓ runtime
"/resources/persons/avatars/juan_carlos.jpg"
```

La conversión la hace cada componente o el validate.js en su salida. Las imágenes de Getty Images se embeben directamente con `//embed.gettyimages.com/embed/{id}`.

---

## 7. Esquema de relaciones

Las relaciones **no son entidades top-level** sino arrays anidados en `documents` y `articles`. Cada instancia de relación tiene:

```js
{
  subject: '#/tipo/id',         // quién actúa
  object:  '#/tipo/id',         // sobre quién actúa
  type:    '#/relations/slug',  // referencia al catálogo de tipos
  period:  ['2012-01-01', '2014-12-31']   // opcional: [inicio, fin?]
}
```

Los tipos de relación del catálogo definen templates bidireccionales: al mostrar una relación, el motor consulta el `gender` del sujeto/objeto para elegir la plantilla («controla» vs «controlado por»; «padre de» vs «madre de»).

**Tipos de relación disponibles** (agrupados por categoría):

| Categoría | Tipos |
|-----------|-------|
| human | `parent`, `sibling`, `related_to`, `spouse`, `partner`, `knows` |
| business | `controls`, `manages`, `represents`, `beneficiary_of`, `has_bank_account_in`, `owns` |
| semantic | `mentions`, `cited_by`, `takes_part`, `registered_in`, `authors`, `is_mentioned_in` |

El grafo `page-entramado` construye el grafo D3 a partir de las relaciones de todos los documentos y artículos, agrupando los nodos por tipo (persons, entities).

---

## 8. Build y deploy

### Build en dos fases

**Fase 1 — Validación y compilación de datos** (`cd bin && node validate.js`):
1. Lee todos los `.json5` de `/data/`
2. Valida contra los JSON Schemas
3. Genera thumbnails de PDFs (via `gm`)
4. Toma screenshots de artículos (via `capture-website`)
5. Serializa todo a `/httpdocs/resources/ladonacion.js`

**Fase 2 — Build del frontend** (`npm run build`):
1. Snowpack monta `/httpdocs` en `/`
2. Terser minifica JS (2 passes)
3. imagemin optimiza JPGs y PNGs
4. Genera directorio `/build` listo para deploy

### Dev

```bash
npm run dev   # snowpack dev server con hot reload
```

Los datos del `ladonacion.js` compilado deben existir antes de arrancar en dev.

### Deploy

El directorio `/build` es estático, sin servidor especial. Solo requiere que todas las rutas SPA sirvan `index.html` (Snowpack lo configura: `match: 'routes'`).

---

## 9. Tabla de correspondencias con el proyecto CAS

> CAS = Cien Años de Soledad

| ladonacion | CAS | Notas |
|-----------|-----|-------|
| `persons` | `personajes` | Renombrar; añadir `generacion`, `capitulo_aparicion` |
| `entities` | — | No hay organizaciones en CAS; descartar o repurposear para bandos (conservadores/liberales) |
| `events` | `eventos` | Muy similar; cambiar `date` ISO → `fecha` flexible (relativa/absoluta/inferida) |
| `places` | `lugares` | Similar; quitar `coords` reales para Macondo, añadir `coordenadas_macondo` |
| `documents` | `documentos` | Similar; cambiar `lang` de ISO a campo libre o reutilizar |
| `articles` | — | No hay prensa referenciada; descartar o reutilizar para crítica académica |
| `sources` | — | Sin fuentes de prensa; descartar o reutilizar para ediciones de la novela |
| `relations` (catálogo) | `relaciones` (catálogo) | Ya tenemos tipos: parental, marital, amorosa, conflicto, amistad, mentor_discipulo |
| Relaciones anidadas en docs/articles | — | En CAS, las relaciones son entidades top-level (en `relaciones.json`) |
| `gender` gramatical | `genero` | Reutilizar para templates de frases; en CAS tenemos masculino/femenino/desconocido |
| `file:` prefijo de assets | — | Adaptar para imágenes de personajes (ilustraciones) |
| Token Mapbox | — | Para el mapa de Macondo usar coordenadas ficticias o un mapa SVG custom |

**Diferencia arquitectónica principal**: en ladonacion las relaciones van anidadas en documentos y artículos. En el proyecto CAS son entidades de primer nivel en `relaciones.json`. Para reutilizar el motor del grafo habría que adaptar el extractor de aristas.

---

## 10. Plan de adaptación

### Lo que se puede reutilizar sin cambios

- `modules/router.js` — SPA routing
- `ladonacion-search.js` — búsqueda full-text
- `ladonacion-details.js`, `ladonacion-popup.js`, `ladonacion-slideshow.js` — UI genérica
- `ladonacion-relation.js`, `ladonacion-reference.js` — renderizado de relaciones/referencias
- `page-cronologia.js` + `cronologia-item-event.js` — timeline
- `snowpack.config.js` — bundler (solo cambiar nombre del proyecto)
- `bin/validate.js` — validación de schemas (adaptando rutas)

### Lo que hay que adaptar

1. **`references.js`**: ajustar `models` array:
   - Cambiar `path: 'entramado'` → `path: 'personajes'`
   - Cambiar `path: 'mapa'` → mantener o adaptar
   - Eliminar `articles` y `sources` si no se usan
   - Añadir `simbolos` si se implementa esa capa

2. **`page-entramado.js`**: el grafo extrae aristas de `documents.relations` y `articles.relations`. En CAS las relaciones son top-level, así que hay que reescribir el extractor de aristas para leer `data.relaciones`.

3. **`bin/validate.js`**: adaptar las rutas de entrada (`/data/personajes.json` en lugar de `/data/persons.json5`); quitar generación de screenshots de artículos; añadir validación de nuestros schemas.

4. **`httpdocs/resources/ladonacion.js`** (generado): el nombre del export puede cambiarse a `cienaños` o mantenerse como `data`.

5. **`page-mapa.js`**: sustituir Mapbox (que usa coords reales) por un mapa SVG de Macondo propio o por Leaflet con un tileset customizado.

6. **`page-portada.js`**, **`page-metodologia.js`**, **`page-autor.js`**: reescribir completamente con el contexto del proyecto CAS.

7. **CSS**: adaptar `ladonacion.css` — cambiar paleta de colores, tipografía, nombre de variables CSS. Las variables actuales son `--color-*`, `--font-*`.

8. **Mapbox token**: eliminar y sustituir por solución de mapa alternativa.

### Estructura de datos mínima para que el motor funcione

Para que el grafo y la cronología funcionen, el `ladonacion.js` compilado debe exportar:

```js
export const data = {
  persons:   [...],   // o personajes: [...] si se adapta references.js
  events:    [...],   // con campo date ISO (o adaptar la cronología)
  places:    [...],   // con coords para el mapa
  documents: [...],   // con relaciones anidadas (para el grafo)
  relations: [...],   // catálogo de tipos
}
```

La adaptación más limpia es **normalizar nuestros datos CAS al esquema de ladonacion** en el paso de compilación, en lugar de modificar el motor. Esto implica:

- Serializar `personajes` → `persons` (renombrando campos)
- Serializar `eventos` → `events` (convirtiendo fechas flexibles a ISO aproximado)
- Serializar nuestras `relaciones` top-level → `documents` sintéticos con el array `relations` anidado
- Serializar `lugares` → `places` (con coords ficticias para Macondo)
