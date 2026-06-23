(function () {
  var btn  = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');
  var link = document.getElementById('dark-css');

  if (!btn || !icon || !link) return;

  function applyTheme(isDark) {
    link.media = isDark ? 'all' : 'not all';
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    btn.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
  }

  // Sync icon with current state (head script may have already activated dark CSS)
  applyTheme(link.media === 'all');

  btn.addEventListener('click', function () {
    var nowDark = link.media !== 'all';
    applyTheme(nowDark);
    try {
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    } catch (e) {}
  });
})();
