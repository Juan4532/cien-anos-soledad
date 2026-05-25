/* Cien años · Personajes app -------------------------------------------- *
   Grafo de nombres tipográficos puros sobre anillos concéntricos.
   Los retratos quedaron fuera: cada figura importante tiene su símbolo
   personal en lugar de la imagen.
   --------------------------------------------------------------------- */
const { useState, useMemo, useEffect } = React;

// Geometry: radius per generation as a fraction of the graph half-side
const GEN_RADIUS = { 1: 0.085, 2: 0.20, 3: 0.30, 4: 0.37, 5: 0.43, 6: 0.46, 7: 0.485 };

function polar(angleDeg, r){
  const a = (angleDeg - 90) * Math.PI / 180;  // 0deg = north
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
}

function FilterBar({ gens, setGens, kinds, setKinds, count }){
  function toggle(v, list, setList){
    setList(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);
  }
  function clearAll(){ setGens([]); setKinds([]); }

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <span className="label">Generación</span>
        {[1,2,3,4,5,6,7].map(g => (
          <button key={g}
            className={'chip' + (gens.includes(g) ? ' is-active' : '')}
            onClick={() => toggle(g, gens, setGens)}>
            {window.GEN_LABEL[g]}
          </button>
        ))}
      </div>

      <div className="toolbar-group">
        <span className="label">Vínculo</span>
        {window.KIND_ORDER.map(k => (
          <button key={k}
            className={'chip' + (kinds.includes(k) ? ' is-active' : '')}
            onClick={() => toggle(k, kinds, setKinds)}>
            {window.KIND_LABEL[k]}
          </button>
        ))}
      </div>

      <div style={{flex:1}}/>

      <span className="label">{count} de {window.CHARACTERS.length} figuras</span>
      <button className="btn-text" onClick={clearAll}>↺ Restablecer</button>
    </div>
  );
}

function Roster({ chars, selected, setSelected, isMatch }){
  const groups = useMemo(() => {
    const byGen = {};
    chars.forEach(c => { (byGen[c.gen] = byGen[c.gen] || []).push(c); });
    return Object.entries(byGen).sort((a,b) => +a[0] - +b[0]);
  }, [chars]);

  return (
    <aside className="roster">
      <div className="roster-head">
        <span className="label">El reparto</span>
        <span className="label" style={{color:'var(--ink-faint)'}}>{chars.length}</span>
      </div>
      {groups.map(([gen, list]) => (
        <div key={gen}>
          <div className="label" style={{padding:'18px 0 6px', color:'var(--accent)'}}>
            Generación {window.GEN_LABEL[gen]}
          </div>
          {list.map(c => (
            <div key={c.id}
              className={'roster-row'
                + (selected === c.id ? ' is-active' : '')
                + (isMatch(c) ? '' : ' is-dimmed')}
              onClick={() => setSelected(c.id)}>
              <div className="rsym">
                {c.symbol ? <window.Glyph name={c.symbol} size={28}/> : <span className="rdot">·</span>}
              </div>
              <div className="name">{c.name}<span className="alias">{c.alias}</span></div>
              <div className="gen-tag">{window.GEN_LABEL[c.gen]}</div>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}

function Graph({ selected, setSelected, isMatch }){
  const rings = [1,2,3,4,5,6,7].map(g => GEN_RADIUS[g]);
  const sel = window.CHAR_BY_ID[selected];

  const edges = useMemo(() => {
    if(!sel) return [];
    return sel.rels.map(r => {
      const target = window.CHAR_BY_ID[r.id];
      if(!target) return null;
      const a = polar(sel.angle, GEN_RADIUS[sel.gen]);
      const b = polar(target.angle, GEN_RADIUS[target.gen]);
      return { from: a, to: b, kind: target.kind, targetId: r.id };
    }).filter(Boolean);
  }, [sel && sel.id]);

  function initials(c){
    const words = c.name.split(' ').filter(w => w && w[0] === w[0].toUpperCase());
    return words.slice(0,2).map(w => w[0]).join('·');
  }

  // Render the character as a medallion node positioned at polar coords
  function CharLabel({ c }){
    const r = GEN_RADIUS[c.gen];
    const p = polar(c.angle, r);
    const isSel = c.id === selected;
    const dim = !isMatch(c) && !isSel;

    return (
      <div
        className={'char-label gen-' + c.gen
          + (isSel ? ' is-selected' : '')
          + (dim ? ' is-dim' : '')
          + (c.kind !== 'buendia' ? ' is-external' : '')}
        style={{
          left:  `${50 + p.x*100}%`,
          top:   `${50 + p.y*100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => setSelected(c.id)}
        title={c.name}>
        <div className="cl-medal">
          {c.symbol
            ? <window.Glyph name={c.symbol} size={isSel ? 28 : 20}/>
            : <span className="cl-inits">{initials(c)}</span>
          }
        </div>
        <span className="cl-name">{shortName(c)}</span>
      </div>
    );
  }

  return (
    <div className="graph-wrap">
      <svg viewBox="-0.5 -0.5 1 1" preserveAspectRatio="xMidYMid meet">
        {rings.map((r, i) => (
          <circle key={i} cx="0" cy="0" r={r} fill="none"
            stroke="currentColor" strokeOpacity="0.14" strokeWidth="0.0014"/>
        ))}
        <circle cx="0" cy="0" r="0.49" fill="none"
          stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.0014" strokeDasharray="0.005 0.007"/>
        {/* edges of selected */}
        {edges.map((e, i) => (
          <line key={i}
            x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y}
            stroke={e.kind === 'buendia' ? 'var(--accent)' : 'currentColor'}
            strokeOpacity={e.kind === 'buendia' ? '0.85' : '0.45'}
            strokeWidth="0.003"
            strokeDasharray={e.kind === 'amante' || e.kind === 'gitano' ? '0.008 0.006' : '0'}/>
        ))}
        {/* selected dot */}
        {sel && (() => {
          const p = polar(sel.angle, GEN_RADIUS[sel.gen]);
          return <circle cx={p.x} cy={p.y} r="0.008" fill="var(--accent)"/>;
        })()}
        {/* center */}
        <circle cx="0" cy="0" r="0.0035" fill="currentColor" opacity="0.5"/>
      </svg>

      {/* Ring labels: tiny "Gen N" markers on the SW diagonal */}
      {[1,2,3,4,5,6,7].map(g => {
        const r = GEN_RADIUS[g];
        const p = polar(305, r);
        return (
          <div key={g} className="ring-label"
            style={{ left: `${50 + p.x*100}%`, top: `${50 + p.y*100}%` }}>
            {window.GEN_LABEL[g]}
          </div>
        );
      })}

      {/* Center label */}
      <div className="graph-center it">Macondo</div>

      {/* Character labels */}
      {window.CHARACTERS.map(c => <CharLabel key={c.id} c={c}/>)}
    </div>
  );
}

function shortName(c){
  // Compress long names for the graph view
  const SHORT = {
    jab: 'José Arcadio B.',
    urs: 'Úrsula',
    jah: 'José Arcadio (h.)',
    cor: 'Coronel Aureliano',
    ama: 'Amaranta',
    reb: 'Rebeca',
    mel: 'Melquíades',
    pil: 'Pilar Ternera',
    pcr: 'Pietro Crespi',
    gma: 'Gerineldo M.',
    arc: 'Arcadio',
    aujs: 'Aureliano José',
    remm: 'Remedios M.',
    '17a': 'Los 17 Aurelianos',
    ssp: 'Santa Sofía',
    rem4: 'Remedios la Bella',
    ja2: 'J. Arcadio Segundo',
    au2: 'Aureliano Segundo',
    fer: 'Fernanda',
    pet: 'Petra Cotes',
    jose5: 'José Arcadio (c.)',
    meme: 'Meme',
    amu: 'Amaranta Úrsula',
    mau: 'Mauricio Babilonia',
    gas: 'Gastón',
    aub: 'Aureliano Babilonia',
    aul: 'Aureliano (último)',
  };
  return SHORT[c.id] || c.name;
}

function DetailPanel({ selected, setSelected }){
  const c = window.CHAR_BY_ID[selected];
  if(!c){
    return (
      <aside className="detail-panel">
        <div className="label" style={{color:'var(--accent)', marginBottom: 16}}>§ Selecciona una figura</div>
        <p className="it" style={{fontStyle:'italic', fontSize:18, lineHeight:1.5, color:'var(--ink-soft)'}}>
          Toca cualquier nombre en el grafo, o cualquier fila del reparto, para abrir su ficha.
        </p>
      </aside>
    );
  }

  function swatchClass(kind){
    if(kind === 'buendia') return '';
    if(kind === 'amante' || kind === 'gitano') return 'dash';
    return 'thin';
  }

  return (
    <aside className="detail-panel">
      <div className="detail-emblem">
        {c.symbol ? (
          <window.Glyph name={c.symbol} size={140}/>
        ) : (
          <div className="emblem-empty it">
            <span>—</span>
            <span style={{marginTop:8,fontSize:12,color:'var(--ink-faint)'}}>sin emblema</span>
          </div>
        )}
      </div>

      <div className="label" style={{color:'var(--accent)', marginBottom: 8}}>
        Generación {window.GEN_LABEL[c.gen]} · {window.KIND_LABEL[c.kind]}
      </div>
      <div className="detail-name">{c.name}</div>
      <div className="detail-alias">— {c.alias} —</div>

      <div className="detail-meta">
        <div className="row"><span className="k">Nacido</span><span className="v">{c.born}</span></div>
        <div className="row"><span className="k">Muere</span><span className="v">{c.died}</span></div>
        <div className="row"><span className="k">Primera aparición</span><span className="v">Cap. {c.chapter}</span></div>
      </div>

      <p className="detail-bio" dangerouslySetInnerHTML={{__html: c.bio}}/>

      <a className="detail-link" href={`personaje.html?id=${c.id}`}>Ver ficha completa →</a>

      {c.rels && c.rels.length > 0 && (
        <div className="detail-rels">
          <h4>Vínculos · {c.rels.length}</h4>
          {c.rels.map((r, i) => {
            const t = window.CHAR_BY_ID[r.id];
            if(!t) return null;
            return (
              <div key={i} className="rel" onClick={() => setSelected(t.id)}>
                <div className={'swatch ' + swatchClass(t.kind)}/>
                <div className="rname">{t.name}</div>
                <div className="rkind">{r.kind}</div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}

function App(){
  const [selected, setSelected] = useState('cor');
  const [gens, setGens] = useState([]);
  const [kinds, setKinds] = useState([]);

  useEffect(() => {
    try{
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      if(id && window.CHAR_BY_ID[id]) setSelected(id);
    }catch(e){}
  }, []);

  function isMatch(c){
    if(gens.length && !gens.includes(c.gen)) return false;
    if(kinds.length && !kinds.includes(c.kind)) return false;
    return true;
  }

  const filtered = window.CHARACTERS.filter(isMatch);

  return (
    <main>
      <div className="page-head">
        <div>
          <div className="page-eyebrow">§ I · El reparto · Capítulo XIV / XX</div>
          <h1 className="page-title">Personajes <em>de la novela</em></h1>
          <p className="page-lede">Siete generaciones de Buendía y el coro que los rodea. La estirpe en ámbar; los forasteros, gitanos y amantes en línea blanca. Toca cualquier nombre para abrir su ficha.</p>
        </div>
        <div className="meta-row">
          <div className="stat"><div className="v">{window.CHARACTERS.length}</div><div className="label l">Figuras catalogadas</div></div>
          <div className="stat"><div className="v">VII</div><div className="label l">Generaciones</div></div>
          <div className="stat"><div className="v">14/20</div><div className="label l">Capítulos procesados</div></div>
        </div>
      </div>

      <FilterBar gens={gens} setGens={setGens} kinds={kinds} setKinds={setKinds} count={filtered.length}/>

      <div className="ptg-main">
        <Roster chars={window.CHARACTERS} selected={selected} setSelected={setSelected} isMatch={isMatch}/>
        <Graph selected={selected} setSelected={setSelected} isMatch={isMatch}/>
        <DetailPanel selected={selected} setSelected={setSelected}/>
      </div>

      <div className="legend-bar">
        <div className="item"><div className="sw"></div> Estirpe de los Buendía</div>
        <div className="item"><div className="sw thin"></div> Consorte / forastero</div>
        <div className="item"><div className="sw dash"></div> Amante / gitano</div>
        <div className="item" style={{marginLeft:'auto', color:'var(--ink-faint)'}}>Los anillos marcan la generación · La posición angular sugiere la rama familiar</div>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
