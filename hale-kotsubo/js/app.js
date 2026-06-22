// Hale Kotsubo — 予約一元管理モック / line icons + minimal interactions.
const ICONS = {
  waves: '<svg viewBox="0 0 24 24"><path d="M2 8c2 0 2-1.5 4-1.5S10 8 12 8s2-1.5 4-1.5S20 8 22 8M2 13c2 0 2-1.5 4-1.5S10 13 12 13s2-1.5 4-1.5S20 13 22 13M2 18c2 0 2-1.5 4-1.5S10 18 12 18s2-1.5 4-1.5S20 18 22 18"/></svg>',
  inbox: '<svg viewBox="0 0 24 24"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.5L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  bed: '<svg viewBox="0 0 24 24"><path d="M3 7v12M3 13h18v6M21 19v-5a3 3 0 0 0-3-3H10v5"/><circle cx="7" cy="10" r="1.6"/></svg>',
  yen: '<svg viewBox="0 0 24 24"><path d="M5 4l7 9 7-9M12 13v7M8 14h8M8 18h8"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  sync: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.01"/></svg>',
  building: '<svg viewBox="0 0 24 24"><path d="M3 21V8l9-5 9 5v13"/><path d="M3 21h18M9 21v-6h6v6M8 11h.01M12 11h.01M16 11h.01"/></svg>',
};

(function () {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      if (!el.classList.contains("icon") && !el.classList.contains("search-icon")) {
        el.classList.add("icon");
      }
    }
  });

  // Login form submit
  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      location.href = form.getAttribute("data-login-to") || "reservations.html";
    });
  });

  // Demo alerts
  document.querySelectorAll("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      alert(btn.getAttribute("data-demo") || "モック動作です");
    });
  });

  // Filter chips (visual)
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  });

  // Search filter
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll("[data-searchable]").forEach((row) => {
        const text = (row.getAttribute("data-name") || row.textContent).toLowerCase();
        row.classList.toggle("hidden", q && !text.includes(q));
      });
    });
  }

  // Unconfirmed counter
  function refreshCounts() {
    let unconfirmed = 0;
    document.querySelectorAll("[data-status]").forEach((p) => {
      if (!p.classList.contains("confirmed")) unconfirmed++;
    });
    document.querySelectorAll("[data-count='unconfirmed']").forEach((el) => {
      el.textContent = unconfirmed;
    });
  }

  // Status pill toggle (未確認 ⇄ 確認済み)
  document.querySelectorAll("[data-status]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      el.classList.toggle("confirmed");
      refreshCounts();
    });
  });
  refreshCounts();

  // Card / button navigation
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", () => {
      location.href = el.getAttribute("data-goto");
    });
  });
})();
