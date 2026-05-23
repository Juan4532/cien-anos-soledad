/* Cien años · mode toggle ----------------------------------------------- */
(function(){
  const html = document.documentElement;

  function render(){
    const m = html.dataset.mode;
    document.querySelectorAll('[data-toggle-label]').forEach(function(el){
      el.textContent = m === 'dark' ? '☾' : '☀';
    });
  }

  function flip(){
    html.dataset.mode = (html.dataset.mode === 'dark') ? 'light' : 'dark';
    render();
    try{ localStorage.setItem('cienanos-mode', html.dataset.mode); }catch(e){}
  }

  // Initial: URL ?mode= wins (for embedded preview), else localStorage
  try{
    const params = new URLSearchParams(location.search);
    const urlMode = params.get('mode');
    if(urlMode === 'light' || urlMode === 'dark'){
      html.dataset.mode = urlMode;
    } else {
      const saved = localStorage.getItem('cienanos-mode');
      if(saved === 'light' || saved === 'dark') html.dataset.mode = saved;
    }
  }catch(e){}

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-mode-toggle]').forEach(function(el){
      el.addEventListener('click', flip);
    });
    render();
  });

  // Expose for inline pages that need to react manually
  window.cienAnos = { flip: flip, render: render };
})();
