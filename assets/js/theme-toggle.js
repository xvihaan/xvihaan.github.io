(function () {
  var btn  = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');
  var link = document.getElementById('dark-css');
  if (!btn || !icon || !link) return;

  // Nav panel CSS vars: match Minimal Mistakes skin colors exactly
  var DARK_VARS = {
    '--site-bg':   '#252a34',  // dark skin $background-color → sticky masthead bg
    '--np-bg':     '#2e3441',
    '--np-text':   '#eaeaea',
    '--np-border': '#51555d',
    '--np-hover':  '#3a3f4e',
    '--np-accent': '#00adb5'
  };
  var LIGHT_VARS = {
    '--site-bg':   '#ffffff',
    '--np-bg':     '#f8f9f9',
    '--np-text':   '#3d4144',
    '--np-border': '#e8e9e9',
    '--np-hover':  '#f2f3f3',
    '--np-accent': '#2f7d95'
  };

  function setPanelVars(isDark) {
    var vars = isDark ? DARK_VARS : LIGHT_VARS;
    var r    = document.documentElement;
    for (var k in vars) r.style.setProperty(k, vars[k]);
  }

  function applyTheme(isDark) {
    link.media    = isDark ? 'all' : 'not all';
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    btn.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    setPanelVars(isDark);
  }

  applyTheme(link.media === 'all');

  btn.addEventListener('click', function () {
    var nowDark = link.media !== 'all';
    applyTheme(nowDark);
    try { localStorage.setItem('theme', nowDark ? 'dark' : 'light'); } catch (e) {}
  });
})();
