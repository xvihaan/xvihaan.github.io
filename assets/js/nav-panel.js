(function () {
  var panel    = document.getElementById('nav-panel');
  var overlay  = document.getElementById('nav-panel-overlay');
  var closeBtn = document.getElementById('nav-panel-close');
  var titleEl  = document.getElementById('nav-panel-title');
  if (!panel || !overlay || !closeBtn) return;

  var TRIGGERS = {
    '/categories/': 'category',
    '/tags/':       'tag',
    '/search/':     'search'
  };
  var TITLES = { category: 'Category', tag: 'Tag', search: 'Search' };

  // ── Masthead height → panel/overlay top ─────────────────────────
  function applyMastheadTop() {
    var el = document.querySelector('.masthead');
    var h  = el ? Math.max(0, Math.round(el.getBoundingClientRect().bottom)) : 0;
    document.documentElement.style.setProperty('--masthead-h', h + 'px');
  }
  // Set on load (masthead is now sticky — height is constant unless resized)
  applyMastheadTop();
  window.addEventListener('resize', applyMastheadTop);

  // ── Open / Close ─────────────────────────────────────────────────
  function openPanel(tab) {
    applyMastheadTop();
    panel.removeAttribute('aria-hidden');
    overlay.classList.add('is-open');
    panel.classList.add('is-open');
    document.body.classList.add('nav-panel--open');
    switchPane(tab || 'category');
    if (tab === 'search') {
      setTimeout(function () {
        var inp = document.getElementById('panel-search-input');
        if (inp) inp.focus();
      }, 280);
    }
  }

  function closePanel() {
    panel.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-open');
    panel.classList.remove('is-open');
    document.body.classList.remove('nav-panel--open');
  }

  // ── Pane switching (driven by nav buttons, no internal tabs) ─────
  function switchPane(name) {
    if (titleEl) titleEl.textContent = TITLES[name] || name;
    document.querySelectorAll('.nav-panel__pane').forEach(function (pane) {
      var on = pane.id === 'pane-' + name;
      pane.classList.toggle('active', on);
      if (on) pane.removeAttribute('hidden');
      else    pane.setAttribute('hidden', '');
    });
    if (name === 'search') initSearch();
  }

  // ── Intercept masthead nav links ─────────────────────────────────
  document.querySelectorAll('.visible-links a, .hidden-links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/^https?:\/\/[^/]+/, '');
    var tab  = TRIGGERS[href];
    if (!tab) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      // Toggle: clicking the same button again closes the panel
      if (panel.classList.contains('is-open') &&
          document.getElementById('pane-' + tab) &&
          document.getElementById('pane-' + tab).classList.contains('active')) {
        closePanel();
      } else {
        openPanel(tab);
      }
    });
  });

  // ── Close triggers ───────────────────────────────────────────────
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });

  // ── Search ───────────────────────────────────────────────────────
  var searchData  = null;
  var searchReady = false;

  function initSearch() {
    if (searchReady || searchData === false) return;
    fetch('/assets/search-data.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        searchData  = data;
        searchReady = true;
        var inp = document.getElementById('panel-search-input');
        if (inp && inp.value.trim()) runSearch(inp.value);
        if (inp) inp.focus();
      })
      .catch(function () { searchData = false; });
  }

  function esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function runSearch(q) {
    var box = document.getElementById('panel-search-results');
    if (!box) return;
    q = q.trim();
    if (!q) { box.innerHTML = '<p class="nav-panel__hint">검색어를 입력하세요.</p>'; return; }
    if (!searchReady) { box.innerHTML = '<p class="nav-panel__hint">로딩 중...</p>'; return; }
    var lower = q.toLowerCase();
    var hits  = (searchData || []).filter(function (p) {
      return (p.t + ' ' + p.c + ' ' + p.g).toLowerCase().indexOf(lower) >= 0;
    });
    if (!hits.length) { box.innerHTML = '<p class="nav-panel__hint">검색 결과가 없습니다.</p>'; return; }
    box.innerHTML = hits.slice(0, 20).map(function (p) {
      var meta = [p.d, p.c].filter(Boolean).join(' · ');
      return '<a class="nav-panel__result" href="' + esc(p.u) + '">' +
             '<span class="nav-panel__result-title">' + esc(p.t) + '</span>' +
             (meta ? '<span class="nav-panel__result-meta">' + esc(meta) + '</span>' : '') +
             '</a>';
    }).join('');
  }

  var timer;
  var inp = document.getElementById('panel-search-input');
  if (inp) {
    inp.addEventListener('input', function () {
      clearTimeout(timer);
      var val = this.value;
      timer = setTimeout(function () { runSearch(val); }, 220);
    });
  }
})();
