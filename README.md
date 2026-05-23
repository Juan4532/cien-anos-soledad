# Cien años de soledad — Edición digital interactiva

Visualización interactiva de la novela de Gabriel García Márquez. Modela cuatro dimensiones de la obra — personajes, cronología, geografía y documentos — como un grafo navegable inspirado en [ladonacion.es](https://github.com/JaimeObregon/ladonacion.es).

---

## Estructura del repositorio

```
cien-anos-soledad/
├── datos/
│   ├── personajes.json
│   ├── relaciones.json
│   ├── eventos.json
│   ├── lugares.json
│   ├── documentos.json
│   ├── simbolos.json
│   └── schemas/
│       ├── personajes.schema.json
│       ├── relaciones.schema.json
│       ├── eventos.schema.json
│       ├── lugares.schema.json
│       ├── documentos.schema.json
│       └── simbolos.schema.json
├── scripts/
│   ├── validar.py          # Validador de coherencia
│   └── sincronizar_html.py # Sincronizador datos → visualización
├── visualizacion/
│   └── index.html          # Aplicación interactiva (todo en un fichero)
└── index.html              # Redirección a visualizacion/
```

---

## Modelo de datos

Todos los datos viven en `/datos/` como JSON con una clave `_schema` documentada en cada archivo.

### `personajes.json`

Cada personaje tiene:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador único (ver convención más abajo) |
| `nombre` | string | Nombre canónico en la novela |
| `nombres_alternativos` | string[] | Apodos y variantes |
| `generacion` | integer\|null | Generación Buendía (1 = fundadores) |
| `genero` | string | `masculino` / `femenino` |
| `nacimiento` / `muerte` | object\|null | `{valor, tipo}` — ver fechas |
| `capitulo_aparicion` | integer | Primera aparición (1–20) |
| `descripcion` | string | Rasgos breves sin reproducir el texto |
| `grupo` | string\|null | `buendia`, `visitante`, etc. |

### `relaciones.json`

Aristas del grafo. Tipos: `familiar`, `marital`, `amorosa`, `conflicto`, `mentor_discipulo`, `comercial`, `politica`, `amistad`, `otro`.

| Campo | Descripción |
|---|---|
| `id` | Prefijo `REL_` + descriptor |
| `tipo` / `subtipo` | Tipo general y rol específico (`padre`, `amante`, `enemigo`…) |
| `origen` / `destino` | IDs de personajes |
| `inicio` / `fin` | IDs de eventos que marcan el inicio/fin de la relación (nullable) |
| `notas` | Matices o ambigüedades |

### `eventos.json`

Hechos narrativos ordenables cronológicamente.

| Campo | Descripción |
|---|---|
| `id` | Prefijo `EVT_` |
| `tipo` | `nacimiento`, `muerte`, `boda`, `guerra`, `milagro`, `otro`… |
| `capitulo` | Capítulo narrativo donde ocurre (1–20) |
| `fecha` | `{valor: string, tipo: "absoluta"|"relativa"|"inferida"}` |
| `participantes` | Array de IDs de personajes |
| `lugar` | ID de lugar (nullable) |
| `orden_cronologico` | Entero para ordenar en la línea de tiempo real |

### `lugares.json`

| Campo | Descripción |
|---|---|
| `id` | Mayúsculas, e.g. `MACONDO`, `RIOHACHA` |
| `tipo` | `casa`, `pueblo`, `ciudad`, `region`, `pais`, `imaginario`… |
| `real` | `true` si es geografía real |
| `coordenadas_reales` | `{lat, lon}` si `real = true` |
| `coordenadas_macondo` | `{x, y}` en el mapa imaginario |

### `documentos.json`

Pergaminos, cartas, edictos y objetos con peso narrativo. Referencia a `autor` y `receptor` como IDs de personajes.

### `simbolos.json`

Capa opcional de motivos recurrentes (mariposas amarillas, lluvia, oro, hielo…). Cada símbolo lista sus `apariciones` como array de `{evento, personajes[]}`.

---

## Convención de IDs (homonimia)

La novela reutiliza nombres entre generaciones. El sistema de IDs los distingue con desambiguadores:

```
JOSE_ARCADIO_BUENDIA_FUNDADOR   — el patriarca
JOSE_ARCADIO_HIJO               — el del miembro tatuado
JOSE_ARCADIO_SEGUNDO            — gemelo, el de la matanza
AURELIANO_BUENDIA_CORONEL       — el coronel
AURELIANO_JOSE                  — hijo del coronel y Pilar
AURELIANO_SEGUNDO               — gemelo de José Arcadio Segundo
AURELIANO_BABILONIA             — el que descifra los pergaminos
```

**Regla:** los IDs son estables y nunca se reutilizan. Una vez asignado, no se modifica.

---

## Scripts

### `scripts/validar.py`

Validador de coherencia con salida coloreada (verde / amarillo / rojo). Ejecuta cinco comprobaciones:

1. **Validación contra JSON Schemas** — requiere `pip install jsonschema`
2. **Unicidad de IDs** — detecta duplicados dentro de cada colección
3. **Integridad referencial** — comprueba que todos los IDs referenciados existan (eventos → personajes/lugares, relaciones → personajes/eventos, documentos → personajes, símbolos → eventos/personajes)
4. **Coherencia de fechas** — `nacimiento ≤ muerte` en fechas absolutas
5. **Ciclos en relaciones parentales** — DFS sobre el grafo de filiación

```bash
python scripts/validar.py
# Código de salida: 0 = sin errores, 1 = errores encontrados
```

### `scripts/sincronizar_html.py`

Lee `personajes.json`, `relaciones.json` y `eventos.json` e inyecta los arrays JavaScript directamente en `visualizacion/index.html`, garantizando que la visualización siempre refleje los datos actuales.

```bash
python scripts/sincronizar_html.py
# ✓ Sincronizado: N personajes, N relaciones, N eventos
```

---

## Visualización

`visualizacion/index.html` es una aplicación autocontenida (sin dependencias externas de build) con tres pestañas:

- **Grafo** — red de personajes y relaciones, fuerza dirigida
- **Cronología** — línea de tiempo de eventos
- **Geografía** — mapa de lugares (reales + imaginarios)

Tipografías: Playfair Display (serif, títulos) + Inter (sans, UI). Paleta oscura con acento dorado `#D4933A`.

---

## Flujo de trabajo

El proyecto se procesa capítulo a capítulo (20 capítulos sin numerar):

1. Se añaden entidades nuevas a los JSON correspondientes
2. Se registran eventos y se actualizan relaciones
3. Se ejecuta `validar.py` para comprobar coherencia
4. Se ejecuta `sincronizar_html.py` para reflejar los cambios en la visualización

**Restricciones editoriales:**
- No se inventan personajes, fechas ni relaciones sin base en el texto
- Las cronologías no explícitas se marcan con `"tipo": "inferida"`
- No se reproducen párrafos del texto original en los campos de descripción
