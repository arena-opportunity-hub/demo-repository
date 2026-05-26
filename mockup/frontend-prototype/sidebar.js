window.renderSidebar = function () {
  var F = window.OHFeatures;
  var navOn = F ? function (n) { return F.nav(n); } : function () { return true; };

  var items = [
    { href: 'dashboard.html',        label: 'Dashboard',           key: 'dashboard' },
    { href: 'overview.html',         label: 'Overview',            key: 'overview',        id: 'nav-overview' },
    { href: 'my-opportunities.html', label: 'Meine Opportunities', key: 'myOpportunities', id: 'nav-my-opportunities' },
    { href: 'matches.html',          label: 'Matches',             key: 'matches',         badge: '3' },
    { href: 'verfuegbarkeit.html',   label: 'Verfügbarkeit',       key: 'verfuegbarkeit' },
    { href: 'statistik.html',        label: 'Statistik',           key: 'statistik',       v2: true },
    { href: 'exports.html',          label: 'Exports',             key: 'exports' },
    { href: 'admin.html',            label: 'Admin',               key: 'admin' }
  ];

  var navHtml = items
    .filter(function (it) { return navOn(it.key); })
    .map(function (it) {
      var extra = '';
      if (it.badge) extra += ' <span class="nav-badge">' + it.badge + '</span>';
      if (it.v2)    extra += ' <span class="nav-badge" style="background:#7B1FA2;color:#fff;font-size:9px;padding:1px 5px">V2</span>';
      var id = it.id ? ' id="' + it.id + '"' : '';
      return '<a href="' + it.href + '" class="nav-item nav-sub"' + id + '>' + it.label + extra + '</a>';
    })
    .join('');

  var html =
    '<div class="sidebar-logo">' +
      '<div class="logo-mark">R</div>' +
      '<div class="logo-text"><span class="brand">REPLY</span><span class="sub">FINCON</span></div>' +
    '</div>' +
    '<nav class="sidebar-nav">' +
      '<div class="nav-section-header">Opportunity Hub</div>' +
      navHtml +
    '</nav>';

  var aside = document.querySelector('aside.sidebar');
  if (aside) aside.innerHTML = html;

  if (window.setActiveNavItem) setActiveNavItem();
};

window.renderSidebar();
