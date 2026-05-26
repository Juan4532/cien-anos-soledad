# Cien años de soledad — Atlas interactivo

Atlas interactivo de *Cien años de soledad* de Gabriel García Márquez. Cartografía de personajes, relaciones, cronología de eventos y geografía de Macondo.

Demo: abre `visualizacion/personajes.html` en el navegador (o sirve la carpeta con un servidor local).

---

## Estructura

```
datos/              JSON canónicos — fuente de verdad
  personajes.json   78 personajes
  eventos.json      274 eventos
  relaciones.json   108 relaciones
  lugares.json      48 lugares
  simbolos.json     símbolos SVG asignados a personajes
  schemas/          JSON Schema de cada colección

scripts/
  sincronizar_html.py   inyecta los JSON en los HTML de visualizacion/
  validar.py            comprueba coherencia referencial entre colecciones

visualizacion/
  personajes.html   red de personajes (Cytoscape.js) + anillos concéntricos
  cronologia.html   línea de tiempo de eventos por capítulo
  lugares.html      índice de lugares de Macondo y alrededores
  sobre.html        descripción del proyecto
  styles/system.css diseño compartido (tipografía, variables CSS, dark/light)
  scripts/mode.js   toggle dark/light persistente
  scripts/symbols.js definición SVG de los símbolos de personajes
```

---

## Modelo de datos

### `personajes.json`
Campos: `id`, `nombre`, `nombres_alternativos`, `generacion` (1–7 o `allegado`), `genero`, `nacimiento`, `muerte`, `capitulo_aparicion`, `grupo`, `descripcion`, `referencias`.

### `eventos.json`
Campos: `id`, `titulo`, `descripcion`, `tipo` (`conflicto`, `muerte`, `nacimiento`, `llegada`, `partida`, `boda`, `descubrimiento`, `milagro`, `acuerdo`, `otro`), `capitulo`, `orden_cronologico`, `participantes` (array de IDs de personaje), `lugar` (ID de lugar), `inferido`.

### `relaciones.json`
Campos: `id`, `origen`, `destino` (IDs de personaje), `tipo` (`familiar`, `romantica`, `amistad`, `politica`, `otro`), `subtipo`, `notas`.

### `lugares.json`
Campos: `id`, `nombre`, `tipo`, `descripcion`, `parte_de` (ID de lugar padre).

---

## Flujo de trabajo

Editar los JSON en `datos/` → regenerar los HTML → validar:

```bash
python3 scripts/sincronizar_html.py
python3 scripts/validar.py
```

El script `sincronizar_html.py` reemplaza bloques marcados con comentarios `<!-- DATA:* -->` en los HTML. No toca el resto del HTML.

Servidor local:

```bash
python3 -m http.server 8765 --directory visualizacion
# → http://localhost:8765/personajes.html
```

---

## Tecnología

- HTML, CSS y JavaScript vanilla. Sin frameworks, sin build step, sin servidor.
- [Cytoscape.js](https://js.cytoscape.org/) para la red de personajes (vista Red).
- Tipografía: Cormorant Garamond, EB Garamond, IM Fell English SC, JetBrains Mono (Google Fonts).
- Modo oscuro/claro persistente vía `localStorage`.

---

## Licencia

Contenidos bajo [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es).
*Cien años de soledad* © Gabriel García Márquez, 1967.
