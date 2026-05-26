/* ── Shared Opportunity Data & Render Logic ──────────────────── */
const OPP_DATA = {
  'oph-1247': {
    title:   'Backend-Projekt Datenmigration',
    status:  { label: 'Offen', cls: 'pill-open' },
    id:      'OPH-1247',
    client:  'Hypoteq AG',
    created: '12.05.2026',
    creator: 'Jannik Schröder',
    meta: [
      { label: 'Start',      value: '01.06.2026' },
      { label: 'Laufzeit',   value: '7 Monate',  sub: '(+ Option)' },
      { label: 'Auslastung', value: 'Vollzeit',   sub: '40h / Woche' },
      { label: 'Ort',        value: 'München',    sub: 'Hybrid' },
    ],
    skills: ['Java', 'AWS', 'Docker', 'PostgreSQL', 'Terraform'],
    skillLevels: [
      { name: 'Java',       stars: 5, max: 5 },
      { name: 'AWS',        stars: 4, max: 5 },
      { name: 'Docker',     stars: 4, max: 5 },
      { name: 'PostgreSQL', stars: 4, max: 5 },
      { name: 'Terraform',  stars: 3, max: 5 },
    ],
    languageSkills: [
      { name: 'Deutsch',  stars: 3, max: 3 },
      { name: 'Englisch', stars: 2, max: 3 },
    ],
    personalSkills: ['Teamfähigkeit', 'Eigeninitiative', 'Analytisches Denkvermögen', 'Lösungsorientiertes Denken'],
    description: 'Migration einer bestehenden On-Premise-Datenbankinfrastruktur in die AWS-Cloud. Ziel ist die Verbesserung von Skalierbarkeit und Ausfallsicherheit sowie eine langfristige Senkung der Betriebskosten. Das Projekt umfasst die vollständige Überführung von Oracle-Datenbanken auf Amazon Aurora sowie die Modernisierung angrenzender Java-Backenddienste.',
    tasks: [
      'Analyse und Dokumentation der bestehenden Datenbanklandschaft',
      'Planung und Durchführung der Migration zu Amazon RDS / Aurora',
      'Implementierung von Datenvalidierungsroutinen und Rollback-Strategien',
      'Abstimmung mit dem DevOps-Team bei CI/CD-Pipeline-Integration',
      'Koordination mit Stakeholdern bei Abnahmetests',
    ],
  },

  'oph-1248': {
    title:   'Container Plattform Initiative',
    status:  { label: 'In Prüfung', cls: 'pill-review' },
    id:      'OPH-1248',
    client:  'Lars Gehrken',
    created: '20.05.2026',
    creator: 'Lars Gehrken',
    extraMeta: [
      { label: 'Fristende',           value: '28.05.2026' },
      { label: 'Anforderungsprozess', value: 'Arbeitnehmerüberlassung' },
      { label: 'Funktion / Aufgabe',  value: 'Architekturcoach' },
      { label: 'Skill Level',         value: 'Position mit Berufserfahrung' },
    ],
    meta: [
      { label: 'Beginn',   value: '22.06.2026' },
      { label: 'Ende',     value: '31.12.2026' },
      { label: 'Volumen',  value: '714 Stunden', sub: 'pro Ressource' },
      { label: 'Standort', value: 'Hamburg',     sub: 'Remote' },
    ],
    skills: ['Docker', 'Kubernetes', 'GitOps', 'Argo CD', 'WebSphere'],
    skillLevels: [
      { name: 'Docker',     stars: 5, max: 5 },
      { name: 'Kubernetes', stars: 5, max: 5 },
      { name: 'GitOps',     stars: 5, max: 5 },
      { name: 'Argo CD',    stars: 5, max: 5 },
      { name: 'WebSphere',  stars: 4, max: 5 },
    ],
    languageSkills: [
      { name: 'Englisch', stars: 2, max: 3 },
      { name: 'Deutsch',  stars: 3, max: 3 },
    ],
    personalSkills: ['Kommunikationsfähigkeit', 'Analytisches Denkvermögen', 'Präsentationstechniken', 'Fähigkeit zur Übersicht'],
    description: 'Container Plattform Initiative (IT / Standard / Non-SAP / Klass. Sprachen) — Team: Container Plattform Initiative. Die Tätigkeit wird überwiegend Remote erbracht. Eine Beauftragung über den angefragten Zeitraum hinaus ist angedacht.',
    tasks: [
      'Selbstständige Beratung diverser Teams bei der Migration von WebSphere/OCP3 in Richtung OnPrem Cloud',
      'Coaching diverser Entwickler bei allgemeinen Fragen der Architektur im Bereich DevOps',
      'Coachende Rolle (Enabler) in einem zentralen Architekturteam',
      'Beratung diverser Teams aus unterschiedlichen Fachrichtungen',
    ],
  },

  'oph-1249': {
    title:   'Business Analysten (m/w/d) im Umfeld IT-Consulting',
    status:  { label: 'Offen', cls: 'pill-open' },
    id:      'OPH-1249',
    client:  'IPSWAYS / Insurance',
    created: '20.05.2026',
    creator: 'IPSWAYS',
    extraMeta: [
      { label: 'Segment',    value: 'Insurance' },
      { label: 'Auslastung', value: '40h / Woche, ca. 1.000 Stunden' },
      { label: 'Einsatzort', value: 'Düsseldorf / Remote (50%)' },
    ],
    meta: [
      { label: 'Beginn',   value: '14.06.2026' },
      { label: 'Ende',     value: '31.12.2026', sub: '(+ Option)' },
      { label: 'Volumen',  value: '1.000 Stunden', sub: '40h / Woche' },
      { label: 'Standort', value: 'Düsseldorf',    sub: 'Remote (50%)' },
    ],
    skills: ['Business Analysis', 'Scrum', 'Kanban', 'Jira', 'Confluence'],
    skillLevels: [
      { name: 'Business Analysis', stars: 5, max: 5 },
      { name: 'Scrum',             stars: 4, max: 5 },
      { name: 'Kanban',            stars: 4, max: 5 },
      { name: 'Jira',              stars: 4, max: 5 },
      { name: 'Confluence',        stars: 3, max: 5 },
    ],
    languageSkills: [
      { name: 'Deutsch',  stars: 3, max: 3 },
      { name: 'Englisch', stars: 3, max: 3 },
    ],
    personalSkills: ['Analytisches Denkvermögen', 'Selbstständigkeit', 'Strukturiertes Arbeiten', 'Erwartungsmanagement'],
    description: 'Für unseren Kunden suchen wir einen erfahrenen Business Analysten (m/w/d) im Umfeld IT-Consulting, Innovation und Projektmanagement. In dieser Rolle analysieren Sie komplexe Geschäftsprozesse im Customer-Services-Umfeld, insbesondere an der Schnittstelle zwischen Marketing, Vertrieb und Operations. Der Fokus liegt auf der End-to-End-Betrachtung von Prozessen rund um Consent Management, Datenströme und Informationsobjekte.',
    tasks: [
      'Analyse und Optimierung von Geschäftsprozessen im Bereich Customer Services in Zusammenarbeit mit Marketing, Vertrieb und Operations',
      'Analyse und Dokumentation von Datenströmen und Informationsobjekten im Kontext eines Universal Consent Managements',
      'End-to-End-Analyse der Prozesse zur Consent-Erfassung, Speicherung, Weiterverarbeitung und Nutzung',
      'Aufnahme, Konsolidierung und Priorisierung von Anforderungen der Fachbereiche sowie aktives Erwartungsmanagement',
      'Aktive Mitgestaltung des Lösungsdesigns in enger Abstimmung mit interdisziplinären und internationalen Projektteams',
      'Erstellung klar strukturierter Use Cases und User Stories als Grundlage für Entwicklerteams',
      'Beobachtung technologischer Entwicklungen und Bewertung ihres Potenzials für neue digitale Lösungen',
    ],
  },
};

/* ── Helpers ──────────────────────────────────────────────────── */
function renderStars(n, max) {
  return `<span style="color:#FFB300;letter-spacing:2px">${'★'.repeat(n)}</span>` +
         `<span style="color:#D0D0D0;letter-spacing:2px">${'☆'.repeat(max - n)}</span>`;
}

const STAR_LEVELS = { 5: 'Expert', 4: 'Erfahren', 3: 'Mittel', 2: 'Grundkenntnisse', 1: 'Einsteiger' };

/* ── Render opportunity detail into any panel element ─────────── */
function renderDetailContent(id, panelId) {
  const opp   = OPP_DATA[id];
  const panel = document.getElementById(panelId);
  if (!panel) return;
  if (!opp) {
    panel.innerHTML = '<div style="padding:40px;color:var(--c-text-muted);font-size:14px">Kein Detail verfügbar.</div>';
    return;
  }

  const metaCards = opp.meta.map(m => `
    <div class="detail-meta-card">
      <div class="meta-label">${m.label}</div>
      <div class="meta-value">${m.value}</div>
      ${m.sub ? `<div class="meta-sub">${m.sub}</div>` : ''}
    </div>`).join('');

  const extraMetaHtml = opp.extraMeta ? `
    <div class="detail-extra-meta-row">
      ${opp.extraMeta.map(m =>
        `<span class="detail-extra-meta-chip">
           <span class="detail-extra-meta-label">${m.label}:</span>${m.value}
         </span>`).join('')}
    </div>` : '';

  const skillChips = opp.skills.map(s => `<span class="chip">${s}</span>`).join('');

  const anforderungenHtml = opp.skillLevels ? `
    <div class="detail-section">
      <h2 class="detail-section-title">
        <span class="detail-section-icon orange">≡</span>
        Anforderungen an die Kandidaten
      </h2>
      <div class="detail-subsection-title">Fachliche Qualifikationen</div>
      <table class="skill-level-table">
        ${opp.skillLevels.map(sl => `
          <tr>
            <td>${sl.name}</td>
            <td>${renderStars(sl.stars, sl.max)}</td>
            <td style="font-size:11px;color:var(--c-text-muted);text-align:right">${STAR_LEVELS[sl.stars] || ''}</td>
          </tr>`).join('')}
      </table>
      ${opp.languageSkills ? `
        <div class="detail-subsection-title">Sprachliche Qualifikationen</div>
        <table class="skill-level-table">
          ${opp.languageSkills.map(ls => `
            <tr>
              <td>${ls.name}</td>
              <td>${renderStars(ls.stars, ls.max)}</td>
            </tr>`).join('')}
        </table>` : ''}
      ${opp.personalSkills ? `
        <div class="detail-subsection-title">Persönliche und soziale Fähigkeiten</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px">
          ${opp.personalSkills.map(s => `<span class="chip">${s}</span>`).join('')}
        </div>` : ''}
    </div>` : '';

  panel.innerHTML = `
    <div class="opp-detail-header">
      <div class="opp-detail-title-block">
        <div class="opp-detail-eyebrow">
          <span class="pill ${opp.status.cls}">${opp.status.label}</span>
          <span class="opp-detail-id">ID: ${opp.id}</span>
        </div>
        <h1>${opp.title}</h1>
        <div class="opp-detail-client">${opp.client}&nbsp;·&nbsp;Erstellt am ${opp.created}&nbsp;·&nbsp;${opp.creator}</div>
      </div>
      <div class="opp-detail-actions">
        <a href="detail.html?id=${id}#details" class="btn btn-outlined">Bearbeiten</a>
        <a href="matches.html?opp=${id}" class="btn btn-primary">Matches ansehen</a>
      </div>
    </div>
    ${extraMetaHtml}
    <div class="detail-meta-cards">${metaCards}</div>
    ${opp.description ? `
    <div class="detail-section">
      <h2 class="detail-section-title">
        <span class="detail-section-icon blue">ⓘ</span>Projektbeschreibung
      </h2>
      <p>${opp.description}</p>
    </div>` : ''}
    ${opp.tasks ? `
    <div class="detail-section">
      <h2 class="detail-section-title">
        <span class="detail-section-icon green">✓</span>Aufgaben
      </h2>
      <ul>${opp.tasks.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>` : ''}
    ${anforderungenHtml}
  `;
}
