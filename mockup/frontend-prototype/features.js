// features.js — Prototype Feature Flag System
(function () {

  var PRESETS = {
    mvp1: {
      label: 'MVP 1',
      sublabel: 'Manuelle Erfassung',
      nav: {
        dashboard: true, overview: true, myOpportunities: true,
        matches: false, verfuegbarkeit: false, statistik: false,
        exports: false, admin: false
      },
      features: { createAI: false, rfpItems: false }
    },
    mvp1_ai: {
      label: 'MVP 1 + AI',
      sublabel: 'inkl. KI-Erfassung',
      nav: {
        dashboard: true, overview: true, myOpportunities: true,
        matches: false, verfuegbarkeit: false, statistik: false,
        exports: false, admin: false
      },
      features: { createAI: true, rfpItems: false }
    },
    full: {
      label: 'Vollausbau',
      sublabel: 'Alle Features',
      nav: {
        dashboard: true, overview: true, myOpportunities: true,
        matches: true, verfuegbarkeit: true, statistik: true,
        exports: true, admin: true
      },
      features: { createAI: true, rfpItems: true }
    }
  };

  var NAV_LABELS = {
    dashboard: 'Dashboard',
    overview: 'Overview',
    myOpportunities: 'Meine Opportunities',
    matches: 'Matches',
    verfuegbarkeit: 'Verfügbarkeit',
    statistik: 'Statistik',
    exports: 'Exports',
    admin: 'Admin'
  };

  var FEAT_LABELS = {
    createAI: 'AI-Erfassung',
    rfpItems: 'RfP-Anfragen'
  };

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function defaultState() {
    return { activePreset: 'full', nav: deepCopy(PRESETS.full.nav), features: deepCopy(PRESETS.full.features) };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem('oh_feature_state');
      if (raw) {
        var s = JSON.parse(raw);
        if (s && s.nav && s.features) return s;
      }
    } catch (e) {}
    return defaultState();
  }

  function saveState(s) {
    try { localStorage.setItem('oh_feature_state', JSON.stringify(s)); } catch (e) {}
  }

  var _state = loadState();

  window.OHFeatures = {
    presets:    PRESETS,
    navLabels:  NAV_LABELS,
    featLabels: FEAT_LABELS,

    get state() { return _state; },

    nav:  function (name) { return !!_state.nav[name]; },
    feat: function (name) { return !!_state.features[name]; },

    applyPreset: function (key) {
      if (!PRESETS[key]) return;
      _state = { activePreset: key, nav: deepCopy(PRESETS[key].nav), features: deepCopy(PRESETS[key].features) };
      saveState(_state);
      if (window.applyPageFeatures) window.applyPageFeatures();
    },

    toggleNav: function (name) {
      _state.nav[name] = !_state.nav[name];
      _state.activePreset = 'custom';
      saveState(_state);
      if (window.applyPageFeatures) window.applyPageFeatures();
    },

    toggleFeat: function (name) {
      _state.features[name] = !_state.features[name];
      _state.activePreset = 'custom';
      saveState(_state);
      if (window.applyPageFeatures) window.applyPageFeatures();
    }
  };

})();
