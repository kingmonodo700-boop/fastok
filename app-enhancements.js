(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const openPage = page => window.fasotokSwitchPage?.(page);

  document.addEventListener('DOMContentLoaded', () => {
    $('#switch-to-register')?.addEventListener('click', () => { $('#login-form').hidden = true; $('#register-form').hidden = false; });
    $('#switch-to-login')?.addEventListener('click', () => { $('#register-form').hidden = true; $('#login-form').hidden = false; });
    $('#close-create-menu')?.addEventListener('click', () => { $('#create-menu').hidden = true; });
    $('#empty-create-btn')?.addEventListener('click', () => { $('#create-menu').hidden = false; });
    $('#top-search-btn')?.addEventListener('click', () => openPage('discover'));
    $('#open-assistant-from-discover')?.addEventListener('click', () => openPage('assistant'));
    $$('[data-open-page]').forEach(btn => btn.addEventListener('click', () => openPage(btn.dataset.openPage)));
    $$('[data-search-tag]').forEach(btn => btn.addEventListener('click', () => {
      openPage('discover'); const input = $('#discover-search'); if (input) { input.value = btn.dataset.searchTag; input.dispatchEvent(new Event('input')); }
    }));
    $$('[data-inbox-tab]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-inbox-tab]').forEach(t => t.classList.toggle('active', t === btn));
      const messages = btn.dataset.inboxTab === 'messages';
      $('#inbox-messages-panel').hidden = !messages; $('#inbox-activity-panel').hidden = messages;
    }));
    $('#find-creators-btn')?.addEventListener('click', () => openPage('discover'));
  });

  // Reclasser les modules qui étaient tous ajoutés à la page Profil.
  function organizeTools() {
    const groups = {
      create: $('#studio-create-tools'), planning: $('#studio-planning-tools'), growth: $('#studio-growth-tools'),
      profile: $('#profile-tools'), backend: $('#backend-tools')
    };
    if (!groups.create) return;
    const backendIds = new Set([319,322,323,326,327,328,329,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349]);
    const growthIds = new Set([318,324,330,337,338,339,365,371,372,376,380,389,390,400,401,410,412,418,420,474,489]);
    const planningIds = new Set([352,359,362,363,367,370,374,378,381,382,384,387,391,393,394,396,398,403,404,407,408,409,411,413,414,416,417,419]);
    const profileIds = new Set([320,321,325,332,342,345,347,353,369,379,383,385,386,388,392,397,402,405,406,422,423,431,435,436,437,439,441,442,445,447,451,452,454,455,456,458,459,461,463,464,465,467,468,469,471,472,473,475,477,481,482,484,485,486,487,488,491,492,493,494,495,496,497,498]);
    const createIds = new Set([351,354,355,356,357,358,360,361,364,366,368,375,377,415]);
    const hiddenIds = new Set([350,380,390,400,410,420,430,440,450,460,470,480,490,499,500,424,425,427,428]);

    $$('[id^="btn-mod-"]').forEach(btn => {
      const match = btn.id.match(/^btn-mod-(\d+)$/); if (!match) return;
      const id = Number(match[1]);
      if (hiddenIds.has(id)) { btn.remove(); return; }
      if (backendIds.has(id)) { btn.classList.add('backend-tool'); btn.disabled = true; btn.title = 'Désactivé pour le moment : activation après la phase de développement local.'; groups.backend.appendChild(btn); return; }
      let target = groups.profile;
      if (createIds.has(id)) target = groups.create;
      else if (planningIds.has(id)) target = groups.planning;
      else if (growthIds.has(id)) target = groups.growth;
      else if (id >= 351 && id <= 420) target = groups.planning;
      else if (id >= 421 && id <= 500 && profileIds.has(id)) target = groups.profile;
      if (btn.parentElement !== target) target.appendChild(btn);
    });

    // Supprimer les anciennes barres flottantes redondantes qui recouvrent l'interface.
    ['top-tabs-mod-424','right-bar-mod-425','bottom-left-info-mod-427','bottom-navbar-mod-428','search-icon-mod-436','vinyl-disc-mod-423','btn-mod-421','drawer-tools-mod-421','mute-btn-mod-435','time-readout-mod-462','live-views-mod-465','net-status-mod-479','badge-mod-500','btn-mod-500','btn-mod-451'].forEach(id => document.getElementById(id)?.remove());
    // Les annonces de réussite 500/500 étaient des badges de démonstration, pas des tests réels.
    $$('[id^="badge-mod-"]').forEach(el => { if (/^(350|380|390|400|410|420|430|440|450|460|470|480|490|500)$/.test(el.id.replace('badge-mod-',''))) el.remove(); });
  }

  window.addEventListener('load', () => {
    organizeTools();
    // Certains modules injectent tardivement leur bouton : on les reclasse au besoin.
    const observer = new MutationObserver(() => organizeTools());
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  });
})();
