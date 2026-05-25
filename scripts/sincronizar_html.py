#!/usr/bin/env python3
"""Regenera los datos embebidos en index.html y en las páginas del rediseño
(personajes.html, cronologia.html, personaje.html) desde los JSON de datos."""

import json, re, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent

def js_str(s):
    if s is None:
        return 'null'
    return "'" + str(s).replace("\\", "\\\\").replace("'", "\\'") + "'"

def js_arr(items):
    if not items:
        return '[]'
    return '[' + ','.join(js_str(i) for i in items) + ']'

def js_val(v):
    if v is None:
        return 'null'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return str(int(v))
    if isinstance(v, str):
        return js_str(v)
    if isinstance(v, list):
        return js_arr(v)
    return str(v)

# ── Carga de datos ────────────────────────────────────────────────────────────
with open(ROOT / 'datos/personajes.json') as f:
    personajes = json.load(f)['personajes']

with open(ROOT / 'datos/relaciones.json') as f:
    relaciones = json.load(f)['relaciones']

with open(ROOT / 'datos/eventos.json') as f:
    eventos = json.load(f)['eventos']

with open(ROOT / 'datos/lugares.json') as f:
    lugares = json.load(f)['lugares']

# ── Generación de líneas JS ───────────────────────────────────────────────────
def p_line(p):
    return (
        f"  {{ id: {js_str(p['id'])}, nombre: {js_str(p['nombre'])}, "
        f"apodos: {js_arr(p.get('nombres_alternativos', []))}, "
        f"generacion: {js_val(p.get('generacion'))}, "
        f"capitulo: {js_val(p.get('capitulo_aparicion'))}, "
        f"grupo: {js_val(p.get('grupo'))}, "
        f"descripcion: {js_str(p.get('descripcion', ''))} }},"
    )

def r_line(r):
    return (
        f"  {{ id: {js_str(r['id'])}, tipo: {js_str(r['tipo'])}, "
        f"subtipo: {js_val(r.get('subtipo'))}, "
        f"origen: {js_str(r['origen'])}, destino: {js_str(r['destino'])}, "
        f"notas: {js_val(r.get('notas'))} }},"
    )

def e_line(e):
    return (
        f"  {{ id: {js_str(e['id'])}, titulo: {js_str(e['titulo'])}, "
        f"tipo: {js_str(e['tipo'])}, capitulo: {js_val(e.get('capitulo'))}, "
        f"participantes: {js_arr(e.get('participantes', []))}, "
        f"lugar: {js_val(e.get('lugar'))}, "
        f"descripcion: {js_str(e.get('descripcion', ''))}, "
        f"orden_cronologico: {js_val(e.get('orden_cronologico'))} }},"
    )

def l_line(l):
    coords = l.get('coordenadas_reales')
    if coords:
        coords_js = '{lat:' + str(coords['lat']) + ',lon:' + str(coords['lon']) + '}'
    else:
        coords_js = 'null'
    return (
        f"  {{ id: {js_str(l['id'])}, nombre: {js_str(l['nombre'])}, "
        f"tipo: {js_str(l['tipo'])}, "
        f"descripcion: {js_str(l.get('descripcion', ''))}, "
        f"dentro_de: {js_val(l.get('dentro_de'))}, "
        f"capitulo: {js_val(l.get('capitulo_aparicion'))}, "
        f"real: {js_val(l.get('real', False))}, "
        f"coords: {coords_js} }},"
    )

p_lines = '\n'.join(p_line(p) for p in personajes)
r_lines = '\n'.join(r_line(r) for r in relaciones)
e_lines = '\n'.join(e_line(e) for e in eventos)
l_lines = '\n'.join(l_line(l) for l in lugares)

# ── Sustitución en el HTML ────────────────────────────────────────────────────
html_path = ROOT / 'visualizacion/index.html'
html = html_path.read_text()

def replace_array(html, name, new_content):
    pattern = rf'(const {name} = \[)\n.*?(\n\];)'
    replacement = rf'\1\n{new_content}\n\2'
    result, n = re.subn(pattern, replacement, html, flags=re.DOTALL)
    if n != 1:
        print(f'ERROR: no se encontró exactamente 1 bloque para {name} (encontrados: {n})', file=sys.stderr)
        sys.exit(1)
    return result

html = replace_array(html, 'PERSONAJES', p_lines)
html = replace_array(html, 'RELACIONES', r_lines)
html = replace_array(html, 'EVENTOS',    e_lines)
html = replace_array(html, 'LUGARES',    l_lines)

html_path.write_text(html)

print(f'✓ index.html: {len(personajes)} personajes, {len(relaciones)} relaciones, {len(eventos)} eventos, {len(lugares)} lugares')

# ── Nuevas páginas del rediseño (JSON embebido directamente) ──────────────────
def build_p_lite():
    return [{'id':p['id'],'nombre':p['nombre'],'apodos':p.get('nombres_alternativos',[]),
             'generacion':p.get('generacion'),'capitulo':p.get('capitulo_aparicion'),
             'grupo':p.get('grupo'),'descripcion':p.get('descripcion','')} for p in personajes]

def build_r_lite():
    return [{'tipo':r['tipo'],'subtipo':r.get('subtipo'),'origen':r['origen'],'destino':r['destino']}
            for r in relaciones]

def build_e_lite():
    return [{'id':e['id'],'titulo':e['titulo'],'tipo':e.get('tipo'),'capitulo':e.get('capitulo'),
             'participantes':e.get('participantes',[]),'descripcion':e.get('descripcion',''),
             'orden_cronologico':e.get('orden_cronologico'),'lugar':e.get('lugar')} for e in eventos]

def build_lug_crono():
    return [{'id':l['id'],'nombre':l['nombre']} for l in lugares]

def build_pe_lite():
    """Slim events for personajes.html — only what the panel needs, no description."""
    return [{'id':e['id'],'titulo':e['titulo'],'capitulo':e.get('capitulo'),
             'participantes':e.get('participantes',[])} for e in eventos]

def replace_raw_json(html_text, name, data):
    """Sustituye 'const NAME = <json>;' en el HTML usando el decoder de JSON
    para encontrar el fin exacto del valor (evita falsos positivos con ';')."""
    marker = f'const {name} = '
    idx = html_text.find(marker)
    if idx == -1:
        print(f'  AVISO: no encontrado {name}', file=sys.stderr)
        return html_text
    value_start = idx + len(marker)
    try:
        _, value_end = json.JSONDecoder().raw_decode(html_text, value_start)
    except json.JSONDecodeError as e:
        print(f'  ERROR: JSON inválido en {name}: {e}', file=sys.stderr)
        return html_text
    new_json = json.dumps(data, ensure_ascii=False)
    return html_text[:value_start] + new_json + html_text[value_end:]

def build_l_lite():
    lugar_ev = {}
    for e in eventos:
        lid = e.get('lugar')
        if lid:
            lugar_ev.setdefault(lid, []).append({
                'id': e['id'], 'titulo': e['titulo'],
                'capitulo': e.get('capitulo'), 'tipo': e.get('tipo'),
                'orden': e.get('orden_cronologico')
            })
    def sort_key(e):
        return (e.get('capitulo') or 999, e.get('orden') or 999999)
    return [{'id': l['id'], 'nombre': l['nombre'], 'tipo': l['tipo'],
             'desc': l.get('descripcion', ''), 'dentro': l.get('dentro_de'),
             'cap': l.get('capitulo_aparicion'), 'real': l.get('real', False),
             'eventos': sorted(lugar_ev.get(l['id'], []), key=sort_key)} for l in lugares]

p_lite = build_p_lite()
r_lite = build_r_lite()
e_lite = build_e_lite()
pe_lite = build_pe_lite()
l_lite = build_l_lite()
lug_crono_lite = build_lug_crono()

nuevas = {
    'personajes.html': lambda h: replace_raw_json(replace_raw_json(replace_raw_json(h, 'RAW_EVENTOS', pe_lite), 'RAW_PERSONAJES', p_lite), 'RAW_RELACIONES', r_lite),
    'cronologia.html': lambda h: replace_raw_json(replace_raw_json(replace_raw_json(h, 'RAW_EVENTOS', e_lite), 'RAW_PERSONAJES_CRONO', p_lite), 'RAW_LUGARES_CRONO', lug_crono_lite),
    'personaje.html':  lambda h: replace_raw_json(replace_raw_json(replace_raw_json(h, 'RAW_PERSONAJES', p_lite), 'RAW_RELACIONES', r_lite), 'RAW_EVENTOS', e_lite),
    'lugares.html':    lambda h: replace_raw_json(h, 'RAW_LUGARES', l_lite),
}

for nombre, fn in nuevas.items():
    path = ROOT / 'visualizacion' / nombre
    if not path.exists():
        print(f'  AVISO: {nombre} no existe, omitido', file=sys.stderr)
        continue
    path.write_text(fn(path.read_text()))
    print(f'✓ {nombre}: datos actualizados')

# ── Design handoff (nueva visualización) ─────────────────────────────────────
nuevas_dh = {
    'lugares.html': lambda h: replace_raw_json(h, 'RAW_LUGARES', l_lite),
}

for nombre, fn in nuevas_dh.items():
    path = ROOT / 'design_handoff_cien_anos' / nombre
    if not path.exists():
        print(f'  AVISO: design_handoff/{nombre} no existe, omitido', file=sys.stderr)
        continue
    path.write_text(fn(path.read_text()))
    print(f'✓ design_handoff/{nombre}: {len(l_lite)} lugares actualizados')

print(f'✓ Sincronización completa')
