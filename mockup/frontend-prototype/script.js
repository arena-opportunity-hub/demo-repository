document.addEventListener('DOMContentLoaded', () => {
  setActiveNavItem();
  initTabs();
  initSkillChips();
  initFormValidation();
  initCandidateDrawer();
  initActionDropdowns();
});

/* ── Navigation ──────────────────────────────────────────────── */
function setActiveNavItem() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';

  // Pages that belong to the "Meine Opportunities" group (ID-based)
  const myOppPages = ['my-opportunities.html','detail.html','new-opportunity.html','new-opportunity-manual.html','new-rfp.html'];
  if (myOppPages.includes(filename)) {
    document.getElementById('nav-my-opportunities')?.classList.add('active');
    return;
  }

  // rfp-detail belongs under Matches
  if (filename === 'rfp-detail.html') {
    document.querySelector('.nav-item[href="matches.html"]')?.classList.add('active');
    return;
  }

  // All other pages: match by href
  document.querySelectorAll('.nav-item[href]').forEach(link => {
    if (link.getAttribute('href') === filename) link.classList.add('active');
  });
}

/* ── Tabs ────────────────────────────────────────────────────── */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length === 0) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanel = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + targetPanel);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ── Skill Chips ─────────────────────────────────────────────── */
function initSkillChips() {
  const wrapper = document.getElementById('chip-input-wrapper');
  const list    = document.getElementById('chip-list');
  const input   = document.getElementById('skill-input');
  if (!wrapper || !list || !input) return;

  wrapper.addEventListener('click', () => input.focus());

  input.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
      e.preventDefault();
      addChip(input.value.trim());
      input.value = '';
    }
    if (e.key === 'Backspace' && !input.value) {
      const chips = list.querySelectorAll('.chip-removable');
      if (chips.length) chips[chips.length - 1].remove();
    }
  });

  document.querySelectorAll('.chip-suggest').forEach(btn => {
    btn.addEventListener('click', () => addChip(btn.dataset.skill));
  });

  function addChip(skill) {
    if (!skill) return;
    const existing = [...list.querySelectorAll('.chip-removable')].map(c => c.dataset.skill);
    if (existing.includes(skill)) return;
    const chip = document.createElement('span');
    chip.className = 'chip-removable';
    chip.dataset.skill = skill;
    chip.innerHTML = `${skill}<button type="button" class="chip-remove-btn" aria-label="${skill} entfernen">×</button>`;
    chip.querySelector('.chip-remove-btn').addEventListener('click', () => chip.remove());
    list.appendChild(chip);
  }
}

/* ── Form Validation ─────────────────────────────────────────── */
function initFormValidation() {
  const form      = document.getElementById('opportunity-form');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !submitBtn) return;

  const requiredFields = [...form.querySelectorAll('[required]')];

  function checkValidity() {
    submitBtn.disabled = !requiredFields.every(f => f.value.trim() !== '');
  }

  requiredFields.forEach(f => f.addEventListener('input', checkValidity));

  requiredFields.forEach(f => {
    f.addEventListener('blur', () => {
      const err = document.getElementById(f.id + '-error');
      if (!err) return;
      if (!f.value.trim()) { err.textContent = 'Dieses Feld ist erforderlich.'; f.classList.add('error'); }
      else                 { err.textContent = ''; f.classList.remove('error'); }
    });
    f.addEventListener('input', () => {
      const err = document.getElementById(f.id + '-error');
      if (err && f.value.trim()) { err.textContent = ''; f.classList.remove('error'); }
    });
  });

  const startDate = document.getElementById('start-date');
  const endDate   = document.getElementById('end-date');
  const endError  = document.getElementById('end-date-error');
  if (startDate && endDate && endError) {
    function validateDates() {
      if (endDate.value && startDate.value && endDate.value < startDate.value) {
        endError.textContent = 'Enddatum muss nach dem Startdatum liegen.';
        endDate.classList.add('error');
      } else {
        endError.textContent = '';
        endDate.classList.remove('error');
      }
    }
    startDate.addEventListener('change', validateDates);
    endDate.addEventListener('change', validateDates);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'detail.html';
  });
}

/* ── Candidate Data ──────────────────────────────────────────── */
const CANDIDATES = {
  mm: {
    name: 'Max Mustermann', role: 'Senior Consultant',
    initials: 'MM', color: '#1976D2',
    manager: 'Anna Schmidt', managerInitials: 'AS',
    score: 91, status: 'approved',
    required: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    has:      ['Java', 'AWS', 'Docker', 'Spring Boot', 'Kubernetes'],
    exports: [
      { name: 'Kurzprofil_MaxMustermann_AWS_2026.pdf', date: '15.05.2026' },
      { name: 'Kompetenzprofil_MaxMustermann_v2.pdf',  date: '01.04.2026' },
    ],
  },
  sk: {
    name: 'Sandra Koch', role: 'Consultant',
    initials: 'SK', color: '#388E3C',
    manager: 'Anna Schmidt', managerInitials: 'AS',
    score: 84, status: 'review',
    required: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    has:      ['Java', 'Spring', 'Kafka', 'SQL', 'Maven'],
    exports: [
      { name: 'Kurzprofil_SandraKoch_v1.pdf', date: '12.05.2026' },
    ],
  },
  fw: {
    name: 'Felix Weber', role: 'Consultant',
    initials: 'FW', color: '#F57C00',
    manager: 'Anna Schmidt', managerInitials: 'AS',
    score: 69, status: 'open',
    required: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    has:      ['AWS', 'Lambda', 'Docker', 'Python', 'Serverless'],
    exports: [
      { name: 'Kurzprofil_FelixWeber_v1.pdf', date: '10.05.2026' },
    ],
  },
  tb: {
    name: 'Thomas Berger', role: 'Senior Consultant',
    initials: 'TB', color: '#7B1FA2',
    manager: 'Klaus Bauer', managerInitials: 'KB',
    score: 78, status: 'review',
    required: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    has:      ['AWS', 'Terraform', 'CI/CD', 'Azure', 'Linux'],
    exports: [
      { name: 'Kurzprofil_ThomasBerger_v2.pdf',    date: '08.05.2026' },
      { name: 'Kompetenzprofil_Berger_Cloud.pdf',   date: '20.03.2026' },
    ],
  },
  jr: {
    name: 'Jana Richter', role: 'Consultant',
    initials: 'JR', color: '#E53935',
    manager: 'Klaus Bauer', managerInitials: 'KB',
    score: 61, status: 'open',
    required: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    has:      ['Java', 'SQL', 'Spring', 'JUnit'],
    exports: [],
  },
  lm: {
    name: 'Lisa Müller', role: 'Principal Consultant',
    initials: 'LM', color: '#0097A7',
    manager: 'Marco Lehmann', managerInitials: 'ML',
    score: 74, status: 'open',
    required: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    has:      ['Java', 'SQL', 'Maven', 'JPA', 'Microservices'],
    exports: [
      { name: 'Kurzprofil_LisaMueller_v3.pdf',       date: '14.05.2026' },
      { name: 'Kompetenzprofil_Mueller_Java.pdf',     date: '05.04.2026' },
    ],
  },

  /* ── 4 neue Personas ──────────────────────────────────────── */
  aw: {
    name: 'Anna Weber', role: 'Senior Business Analyst',
    initials: 'AW', color: '#006064',
    manager: 'Anna Schmidt', managerInitials: 'AS',
    score: 95, status: 'open',
    required: ['Business Analysis', 'Scrum', 'Kanban', 'Jira', 'Confluence'],
    has:      ['Business Analysis', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'BPMN', 'Requirements Engineering'],
    exports: [],
  },
  mf: {
    name: 'Michael Fischer', role: 'DevOps Engineer',
    initials: 'MF', color: '#1B5E20',
    manager: 'Klaus Bauer', managerInitials: 'KB',
    score: 88, status: 'open',
    required: ['Docker', 'Kubernetes', 'GitOps', 'Argo CD', 'WebSphere'],
    has:      ['Docker', 'Kubernetes', 'GitOps', 'Argo CD', 'CI/CD', 'Linux', 'Helm'],
    exports: [],
  },
  sb: {
    name: 'Sophie Braun', role: 'Scrum Master',
    initials: 'SB', color: '#880E4F',
    manager: 'Marco Lehmann', managerInitials: 'ML',
    score: 71, status: 'open',
    required: ['Business Analysis', 'Scrum', 'Kanban', 'Jira', 'Confluence'],
    has:      ['Scrum', 'Kanban', 'Jira', 'MS Project', 'Facilitation', 'Agile Coaching'],
    exports: [],
  },
  dk: {
    name: 'David Klein', role: 'Backend Developer',
    initials: 'DK', color: '#37474F',
    manager: 'Anna Schmidt', managerInitials: 'AS',
    score: 83, status: 'open',
    required: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    has:      ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Spring Boot', 'Microservices'],
    exports: [],
  },
};

/* ── Candidate Drawer ────────────────────────────────────────── */
function initCandidateDrawer() {
  const overlay = document.getElementById('drawer-overlay');
  const drawer  = document.getElementById('candidate-drawer');
  if (!overlay || !drawer) return;

  // Attach click handlers to all candidate rows
  document.querySelectorAll('.data-table tbody tr').forEach(row => {
    const avatarEl = row.querySelector('.avatar');
    if (!avatarEl) return;
    const key = avatarEl.textContent.trim().toLowerCase();
    if (!CANDIDATES[key]) return;

    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      if (e.target.type === 'checkbox' || e.target.tagName === 'BUTTON') return;
      openDrawer(key);
    });
  });

  // Close handlers
  overlay.addEventListener('click', closeDrawer);
  document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('drawer-close-btn')?.addEventListener('click', closeDrawer);

  // Status radio toggle
  drawer.addEventListener('click', (e) => {
    const label = e.target.closest('.status-radio-label');
    if (!label) return;
    drawer.querySelectorAll('.status-radio-label').forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    const radio = label.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  });

  // Export item toggle
  drawer.addEventListener('click', (e) => {
    const item = e.target.closest('.export-item');
    if (!item) return;
    drawer.querySelectorAll('.export-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    const radio = item.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  });

  // Save
  document.getElementById('d-save-btn')?.addEventListener('click', () => {
    const name = document.getElementById('d-name')?.textContent || 'Kandidat';
    showSnackbar(`Bewertung für ${name} wurde gespeichert.`);
    closeDrawer();
  });
}

function openDrawer(key) {
  const c       = CANDIDATES[key];
  const drawer  = document.getElementById('candidate-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (!c || !drawer) return;

  // Header
  const avatarEl = document.getElementById('d-avatar');
  avatarEl.textContent    = c.initials;
  avatarEl.style.background = c.color;
  document.getElementById('d-name').textContent           = c.name;
  document.getElementById('d-role').textContent           = c.role;
  document.getElementById('d-score').textContent          = c.score;
  document.getElementById('d-manager-initial').textContent = c.managerInitials;
  document.getElementById('d-manager-name').textContent   = c.manager;

  // Skill comparison
  const matched = c.required.filter(s => c.has.includes(s));
  const missing = c.required.filter(s => !c.has.includes(s));
  const extra   = c.has.filter(s => !c.required.includes(s));

  document.getElementById('d-skill-summary').innerHTML = `
    <span class="skill-summary-item">
      <span class="skill-dot" style="background:#0F6E56"></span>
      ${matched.length} von ${c.required.length} Pflichtskills vorhanden
    </span>
    <span class="skill-summary-item">
      <span class="skill-dot" style="background:#791F1F"></span>
      ${missing.length} fehlend
    </span>
    <span class="skill-summary-item">
      <span class="skill-dot" style="background:#757575"></span>
      ${extra.length} weitere
    </span>`;

  document.getElementById('d-skills-matched').innerHTML = matched.length
    ? matched.map(s => `<span class="chip chip-matched">${s}</span>`).join('')
    : `<span style="font-size:12px;color:var(--c-text-muted)">Keine übereinstimmenden Skills</span>`;

  document.getElementById('d-skills-missing').innerHTML = missing.length
    ? missing.map(s => `<span class="chip chip-missing">${s}</span>`).join('')
    : `<span style="font-size:12px;color:var(--pill-approved-text)">Alle Pflichtskills vorhanden ✓</span>`;

  document.getElementById('d-skills-extra').innerHTML = extra.length
    ? extra.map(s => `<span class="chip">${s}</span>`).join('')
    : `<span style="font-size:12px;color:var(--c-text-muted)">—</span>`;

  // Pre-select current status
  drawer.querySelectorAll('.status-radio-label').forEach(label => {
    label.classList.remove('selected');
    const radio = label.querySelector('input');
    if (radio.value === c.status) {
      label.classList.add('selected');
      radio.checked = true;
    }
  });

  // Reset comment
  const commentEl = document.getElementById('d-comment');
  if (commentEl) commentEl.value = '';

  // Exports
  const exportsEl   = document.getElementById('d-exports');
  const noExportsEl = document.getElementById('d-no-exports');
  if (c.exports.length) {
    noExportsEl.style.display = 'none';
    exportsEl.innerHTML = c.exports.map((exp, i) => `
      <label class="export-item">
        <input type="radio" name="drawer-export" value="${i}" />
        <span class="export-item-icon">📄</span>
        <span class="export-item-name">${exp.name}</span>
        <span class="export-item-date">${exp.date}</span>
      </label>`).join('');
  } else {
    exportsEl.innerHTML = '';
    noExportsEl.style.display = 'block';
  }

  overlay.classList.add('open');
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  document.getElementById('candidate-drawer')?.classList.remove('open');
  document.getElementById('drawer-overlay')?.classList.remove('open');
  document.getElementById('candidate-drawer')?.setAttribute('aria-hidden', 'true');
}

/* ── Action Dropdowns (matches page) ────────────────────────── */
function initActionDropdowns() {
  const STATUS_MAP = {
    'approve-item': { pill: 'pill-approved', text: 'Genehmigt' },
    'review-item':  { pill: 'pill-review',   text: 'In Prüfung' },
    'reject-item':  { pill: 'pill-rejected', text: 'Abgelehnt' },
  };

  document.addEventListener('click', (e) => {
    // Toggle dropdown open/close
    const btn = e.target.closest('.action-dropdown-btn');
    if (btn) {
      e.stopPropagation();
      if (btn.closest('.manager-group[data-locked]')) return;
      const menu = btn.nextElementSibling;
      const isOpen = menu.classList.contains('open');
      document.querySelectorAll('.action-dropdown-menu.open').forEach(m => m.classList.remove('open'));
      if (!isOpen) menu.classList.add('open');
      return;
    }

    // Handle item selection
    const item = e.target.closest('.action-dropdown-item');
    if (item) {
      const menu = item.closest('.action-dropdown-menu');
      const row  = item.closest('tr');
      if (row) {
        const statusCell = row.querySelector('td:nth-child(5)');
        if (statusCell) {
          const [cls] = Object.entries(STATUS_MAP).find(([k]) => item.classList.contains(k)) || [];
          if (cls) {
            const { pill, text } = STATUS_MAP[cls];
            statusCell.innerHTML = `<span class="pill ${pill}">${text}</span>`;
          }
        }
      }
      menu.classList.remove('open');
      return;
    }

    // Click outside closes all
    document.querySelectorAll('.action-dropdown-menu.open').forEach(m => m.classList.remove('open'));
  });
}

/* ── String Escaping ─────────────────────────────────────────── */
function escapeAttr(s) { return String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function escapeHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ── Snackbar ────────────────────────────────────────────────── */
function showSnackbar(msg) {
  let el = document.getElementById('app-snackbar');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-snackbar';
    el.className = 'snackbar';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 3500);
}
