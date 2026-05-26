// feature-toggle.js — Floating preset-switcher UI
(function () {

  // ── Apply page-specific feature flags (called on every state change) ──
  window.applyPageFeatures = function () {
    var F = window.OHFeatures;
    if (!F) return;

    // Re-render sidebar with updated nav flags
    if (window.renderSidebar) renderSidebar();

    // new-opportunity.html: show/hide AI mode card
    var aiCard = document.getElementById('mode-card-ai');
    if (aiCard) aiCard.style.display = F.feat('createAI') ? '' : 'none';

    // overview.html: delegate to applyOvFilter (which checks rfpItems internally)
    if (window.applyOvFilter) {
      applyOvFilter();
    } else {
      // generic fallback for any page that has an rfp-divider
      var rfpDiv = document.getElementById('rfp-divider');
      if (rfpDiv) {
        var show = F.feat('rfpItems');
        rfpDiv.style.display = show ? '' : 'none';
        document.querySelectorAll('.opp-list-item[data-type="rfp"]').forEach(function (el) {
          el.style.display = show ? '' : 'none';
        });
        var visible = Array.from(document.querySelectorAll('.opp-list-item[data-opp-id]'))
          .filter(function (i) { return i.style.display !== 'none'; }).length;
        var countEl = document.querySelector('.opp-list-count');
        if (countEl) countEl.textContent = visible;
      }
    }

    // Refresh floating chip label + panel if open
    refreshUI();
  };

  // ── Helpers ────────────────────────────────────────────────────
  function getPresetLabel() {
    var F = window.OHFeatures;
    if (!F) return '…';
    var key = F.state.activePreset;
    if (key === 'custom') return 'Custom';
    var p = F.presets[key];
    return p ? p.label : key;
  }

  function refreshUI() {
    var label = document.getElementById('oh-ft-label');
    if (label) label.textContent = getPresetLabel();
    var panel = document.getElementById('oh-ft-panel');
    if (panel && panel.style.display !== 'none') renderPanel();
  }

  // ── Panel renderer ─────────────────────────────────────────────
  function renderPanel() {
    var F = window.OHFeatures;
    var panel = document.getElementById('oh-ft-panel');
    if (!F || !panel) return;

    var state = F.state;

    // Preset buttons
    var presetsHtml = Object.keys(F.presets).map(function (key) {
      var p = F.presets[key];
      var active = state.activePreset === key;
      var s = active
        ? 'flex:1;padding:8px 4px;font-size:11px;font-weight:700;border:2px solid #1976D2;border-radius:6px;background:#E3F0FC;color:#1976D2;cursor:pointer;line-height:1.4;text-align:center'
        : 'flex:1;padding:8px 4px;font-size:11px;font-weight:500;border:1px solid #E0E0E0;border-radius:6px;background:#FAFAFA;color:#616161;cursor:pointer;line-height:1.4;text-align:center';
      return '<button style="' + s + '" onclick="OHFeatures.applyPreset(\'' + key + '\')">'
        + p.label + '<br>'
        + '<span style="font-weight:400;font-size:10px;color:' + (active ? '#1565C0' : '#9E9E9E') + '">' + p.sublabel + '</span>'
        + '</button>';
    }).join('');

    // Toggle row
    function row(label, isOn, onClickExpr) {
      var bg   = isOn ? '#1976D2' : '#BDBDBD';
      var knob = isOn ? '15px' : '2px';
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid #F5F5F5">'
        + '<span style="font-size:12px;color:#333">' + label + '</span>'
        + '<button onclick="' + onClickExpr + '" style="'
          + 'width:34px;height:20px;border-radius:10px;background:' + bg + ';border:none;'
          + 'position:relative;cursor:pointer;flex-shrink:0">'
          + '<span style="position:absolute;top:3px;left:' + knob + ';width:14px;height:14px;border-radius:50%;background:#fff"></span>'
        + '</button>'
        + '</div>';
    }

    var navRows  = Object.keys(F.navLabels).map(function (k) {
      return row(F.navLabels[k], !!state.nav[k], 'OHFeatures.toggleNav(\'' + k + '\')');
    }).join('');

    var featRows = Object.keys(F.featLabels).map(function (k) {
      return row(F.featLabels[k], !!state.features[k], 'OHFeatures.toggleFeat(\'' + k + '\')');
    }).join('');

    panel.innerHTML =
      // Header
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;border-bottom:1px solid #F0F0F0">'
        + '<div style="font-size:13px;font-weight:700;color:#212121">Prototype Preset</div>'
        + '<button onclick="document.getElementById(\'oh-ft-panel\').style.display=\'none\'" '
          + 'style="border:none;background:none;font-size:16px;cursor:pointer;color:#9E9E9E;padding:2px 4px;line-height:1">✕</button>'
      + '</div>'
      // Presets
      + '<div style="padding:12px 16px;border-bottom:1px solid #F0F0F0">'
        + '<div style="display:flex;gap:6px">' + presetsHtml + '</div>'
      + '</div>'
      // Nav toggles
      + '<div style="padding:10px 16px 2px">'
        + '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9E9E9E;margin-bottom:4px">Navigation</div>'
        + navRows
      + '</div>'
      // Feature toggles
      + '<div style="padding:10px 16px 14px">'
        + '<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9E9E9E;margin-bottom:4px">Features</div>'
        + featRows
      + '</div>';
  }

  // ── Build floating chip + panel ────────────────────────────────
  function buildToggle() {
    var trigger = document.createElement('div');
    trigger.id = 'oh-ft-trigger';
    trigger.style.cssText = [
      'position:fixed', 'bottom:18px', 'right:18px', 'z-index:9999',
      'display:flex', 'align-items:center', 'gap:5px',
      'padding:6px 14px 6px 10px',
      'background:#1976D2', 'color:#fff',
      'border-radius:20px', 'font-size:12px', 'font-weight:600',
      'cursor:pointer', 'box-shadow:0 2px 10px rgba(0,0,0,.28)',
      'user-select:none', 'font-family:Roboto,sans-serif',
      'transition:background .12s'
    ].join(';');
    trigger.innerHTML = '⚙&nbsp;<span id="oh-ft-label">' + getPresetLabel() + '</span>&nbsp;▾';
    document.body.appendChild(trigger);

    var panel = document.createElement('div');
    panel.id = 'oh-ft-panel';
    panel.style.cssText = [
      'position:fixed', 'bottom:56px', 'right:18px', 'z-index:9999',
      'width:288px', 'background:#fff', 'border-radius:10px',
      'box-shadow:0 6px 28px rgba(0,0,0,.16)',
      'display:none', 'overflow:hidden',
      'font-family:Roboto,sans-serif'
    ].join(';');
    document.body.appendChild(panel);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = panel.style.display === 'none';
      panel.style.display = open ? 'block' : 'none';
      if (open) renderPanel();
    });

    document.addEventListener('click', function () {
      panel.style.display = 'none';
    });

    panel.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    buildToggle();
    window.applyPageFeatures();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
