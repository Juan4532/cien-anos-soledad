#!/usr/bin/env python3
"""
Validador de coherencia para los datos del proyecto
Cien años de soledad — Edición digital interactiva.

Uso: python scripts/validar.py
Salida: errores en rojo, advertencias en amarillo, OK en verde.
Código de salida: 0 si todo correcto, 1 si hay errores.
"""

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

try:
    import jsonschema
    from jsonschema import Draft7Validator
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False

# ── Colores ANSI ──────────────────────────────────────────────────────────────

RESET  = "\033[0m"
BOLD   = "\033[1m"
RED    = "\033[91m"
YELLOW = "\033[93m"
GREEN  = "\033[92m"
CYAN   = "\033[96m"
DIM    = "\033[2m"


def _ok(msg: str)    -> None: print(f"  {GREEN}✓{RESET} {msg}")
def _warn(msg: str)  -> None: print(f"  {YELLOW}⚠{RESET}  {msg}")
def _err(msg: str)   -> None: print(f"  {RED}✗{RESET} {msg}")
def _header(msg: str) -> None: print(f"\n{BOLD}{CYAN}{msg}{RESET}")
def _rule()           -> None: print(f"{DIM}{'─' * 50}{RESET}")


# ── Registro de resultados ────────────────────────────────────────────────────

class Report:
    def __init__(self):
        self.errors   = 0
        self.warnings = 0

    def ok(self, msg: str)   -> None: _ok(msg)
    def warn(self, msg: str) -> None: _warn(msg);  self.warnings += 1
    def err(self, msg: str)  -> None: _err(msg);   self.errors   += 1

    @property
    def clean(self) -> bool:
        return self.errors == 0 and self.warnings == 0


R = Report()

# ── Rutas ─────────────────────────────────────────────────────────────────────

ROOT    = Path(__file__).resolve().parent.parent
DATOS   = ROOT / "datos"
SCHEMAS = DATOS / "schemas"

# Mapa: nombre_archivo → (clave_array, archivo_schema)
COLECCIONES: dict[str, tuple[str, str]] = {
    "personajes": ("personajes", "personajes.schema.json"),
    "lugares":    ("lugares",    "lugares.schema.json"),
    "eventos":    ("eventos",    "eventos.schema.json"),
    "documentos": ("documentos", "documentos.schema.json"),
    "relaciones": ("relaciones", "relaciones.schema.json"),
    "simbolos":   ("simbolos",   "simbolos.schema.json"),
}

# ── Carga ─────────────────────────────────────────────────────────────────────

def _load_json(path: Path) -> dict:
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def load_all() -> dict[str, list]:
    """Carga todos los archivos de /datos/ y devuelve {nombre: [items]}."""
    data: dict[str, list] = {}
    for nombre, (array_key, _) in COLECCIONES.items():
        path = DATOS / f"{nombre}.json"
        raw  = _load_json(path)
        data[nombre] = raw.get(array_key, [])
    return data


def load_schema(schema_file: str) -> dict:
    return _load_json(SCHEMAS / schema_file)


# ── Check 1: Schemas ──────────────────────────────────────────────────────────

def check_schemas(data: dict[str, list]) -> None:
    _header("1. Validación contra JSON Schemas")

    if not HAS_JSONSCHEMA:
        R.warn("jsonschema no instalado — omitido. Instala: pip install jsonschema")
        return

    for nombre, (_, schema_file) in COLECCIONES.items():
        schema    = load_schema(schema_file)
        validator = Draft7Validator(schema)
        items     = data[nombre]
        fallos    = 0

        for i, item in enumerate(items):
            item_id = item.get("id", f"índice {i}")
            for ve in sorted(validator.iter_errors(item), key=str):
                path = " → ".join(str(p) for p in ve.absolute_path) or "raíz"
                R.err(f"{nombre}[{item_id}] ({path}): {ve.message}")
                fallos += 1

        if fallos == 0:
            R.ok(f"{nombre}: {len(items)} ítem(s) válidos")


# ── Check 2: Unicidad de IDs ──────────────────────────────────────────────────

def check_unique_ids(data: dict[str, list]) -> None:
    _header("2. Unicidad de IDs")

    for nombre, items in data.items():
        seen: dict[str, int] = {}
        dupes = 0
        for i, item in enumerate(items):
            id_ = item.get("id")
            if id_ is None:
                R.warn(f"{nombre}[índice {i}]: sin campo 'id'")
                continue
            if id_ in seen:
                R.err(f"{nombre}: ID duplicado '{id_}' (índices {seen[id_]} y {i})")
                dupes += 1
            else:
                seen[id_] = i

        if dupes == 0:
            R.ok(f"{nombre}: {len(seen)} IDs únicos")


# ── Check 3: Integridad referencial ───────────────────────────────────────────

def check_references(data: dict[str, list]) -> None:
    _header("3. Integridad referencial")

    ids = {
        col: {item["id"] for item in items if "id" in item}
        for col, items in data.items()
    }

    fallos = 0

    def _check_ref(origen_col: str, origen_id: str, campo: str,
                   destino_id: str | None, destino_col: str) -> None:
        nonlocal fallos
        if destino_id and destino_id not in ids[destino_col]:
            R.err(
                f"{origen_col}[{origen_id}].{campo}: "
                f"'{destino_id}' no existe en {destino_col}"
            )
            fallos += 1

    # eventos → personajes, lugares
    for ev in data["eventos"]:
        ev_id = ev.get("id", "?")
        for pid in ev.get("participantes", []):
            _check_ref("eventos", ev_id, "participantes", pid, "personajes")
        _check_ref("eventos", ev_id, "lugar", ev.get("lugar"), "lugares")

    # relaciones → personajes, eventos
    for rel in data["relaciones"]:
        rel_id = rel.get("id", "?")
        _check_ref("relaciones", rel_id, "origen",  rel.get("origen"),  "personajes")
        _check_ref("relaciones", rel_id, "destino", rel.get("destino"), "personajes")
        _check_ref("relaciones", rel_id, "inicio",  rel.get("inicio"),  "eventos")
        _check_ref("relaciones", rel_id, "fin",     rel.get("fin"),     "eventos")

    # documentos → personajes
    for doc in data["documentos"]:
        doc_id = doc.get("id", "?")
        _check_ref("documentos", doc_id, "autor",    doc.get("autor"),    "personajes")
        _check_ref("documentos", doc_id, "receptor", doc.get("receptor"), "personajes")

    # simbolos → eventos, personajes
    for sim in data["simbolos"]:
        sim_id = sim.get("id", "?")
        for ap in sim.get("apariciones", []):
            _check_ref("simbolos", sim_id, "apariciones.evento",
                       ap.get("evento"), "eventos")
            for pid in ap.get("personajes", []):
                _check_ref("simbolos", sim_id, "apariciones.personajes",
                           pid, "personajes")

    if fallos == 0:
        R.ok("Todas las referencias apuntan a IDs existentes")


# ── Check 4: Fechas coherentes ────────────────────────────────────────────────

def _extract_year(fecha: dict | None) -> int | None:
    """Extrae el primer año de 4 dígitos solo de fechas absolutas."""
    if not isinstance(fecha, dict) or fecha.get("tipo") != "absoluta":
        return None
    m = re.search(r"\b(\d{4})\b", fecha.get("valor", ""))
    return int(m.group(1)) if m else None


def check_dates(data: dict[str, list]) -> None:
    _header("4. Coherencia de fechas (nacimiento ≤ muerte)")

    fallos = 0
    for p in data["personajes"]:
        pid   = p.get("id", "?")
        nac   = _extract_year(p.get("nacimiento"))
        muerte = _extract_year(p.get("muerte"))

        if nac is None or muerte is None:
            continue  # No comparables (nulas, relativas o inferidas)

        if muerte < nac:
            R.err(
                f"personajes[{pid}]: muerte ({muerte}) anterior "
                f"a nacimiento ({nac})"
            )
            fallos += 1
        elif muerte == nac:
            R.warn(
                f"personajes[{pid}]: mismo año de nacimiento y muerte "
                f"({nac}) — verifica si es correcto"
            )

    if fallos == 0:
        R.ok("Sin inconsistencias de fechas en valores absolutos")


# ── Check 5: Ciclos en relaciones parentales ──────────────────────────────────

def check_parental_cycles(data: dict[str, list]) -> None:
    _header("5. Ciclos en relaciones parentales")

    # Grafo dirigido: progenitor → hijo(s)
    graph: dict[str, set[str]] = defaultdict(set)
    for rel in data["relaciones"]:
        if rel.get("tipo") == "parental":
            o = rel.get("origen")
            d = rel.get("destino")
            if o and d and o != d:
                graph[o].add(d)

    WHITE, GRAY, BLACK = 0, 1, 2
    color: dict[str, int] = defaultdict(int)
    cycles_found: list[list[str]] = []

    def dfs(node: str, path: list[str]) -> None:
        color[node] = GRAY
        for child in graph[node]:
            if color[child] == GRAY:
                # Extraemos el ciclo desde el punto de reentrada
                try:
                    start = path.index(child)
                except ValueError:
                    start = 0
                cycles_found.append(path[start:] + [child])
            elif color[child] == WHITE:
                dfs(child, path + [child])
        color[node] = BLACK

    all_nodes = set(graph) | {d for ds in graph.values() for d in ds}
    sys.setrecursionlimit(max(1000, len(all_nodes) * 10))

    for node in all_nodes:
        if color[node] == WHITE:
            dfs(node, [node])

    if cycles_found:
        for cycle in cycles_found:
            R.err("Ciclo parental: " + " → ".join(cycle))
    else:
        R.ok("Sin ciclos en relaciones parentales")


# ── Resumen final ─────────────────────────────────────────────────────────────

def print_summary() -> None:
    _rule()
    if R.clean:
        print(f"\n{GREEN}{BOLD}  Todo correcto — sin errores ni advertencias.{RESET}\n")
    else:
        if R.errors:
            print(f"\n  {RED}{BOLD}{R.errors} error(es){RESET}")
        if R.warnings:
            print(f"  {YELLOW}{BOLD}{R.warnings} advertencia(s){RESET}")
        print()


# ── Punto de entrada ──────────────────────────────────────────────────────────

def main() -> None:
    print(f"\n{BOLD}{'═' * 50}{RESET}")
    print(f"{BOLD}  Validador · Cien años de soledad{RESET}")
    print(f"{BOLD}{'═' * 50}{RESET}")

    try:
        data = load_all()
    except FileNotFoundError as exc:
        _err(f"Archivo no encontrado: {exc.filename}")
        sys.exit(1)
    except json.JSONDecodeError as exc:
        _err(f"JSON malformado: {exc}")
        sys.exit(1)

    check_schemas(data)
    check_unique_ids(data)
    check_references(data)
    check_dates(data)
    check_parental_cycles(data)
    print_summary()

    sys.exit(1 if R.errors else 0)


if __name__ == "__main__":
    main()
