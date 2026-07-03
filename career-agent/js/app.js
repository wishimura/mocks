// CareerBridge — 転職エージェント業務支援システム
// 自前アイコン（Lucide風・線画）＋ 簡易インタラクション（DB接続なし）
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  userCheck: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M16 11l2 2 4-4"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  phoneCall: '<svg viewBox="0 0 24 24"><path d="M14.5 2a5.5 5.5 0 0 1 5.5 5.5M14.5 6a1.5 1.5 0 0 1 1.5 1.5"/><path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 4.1 2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  calendarCheck: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 16l2 2 4-4"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4L12 14.01l-3-3"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M3 5h18M6 12h12M10 19h4"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  fileText: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24"><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3"/><path d="M9 12h6M9 16h4"/></svg>',
  messageCircle: '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.8L3 21l1.9-5a8.4 8.4 0 0 1-.8-3.6 8.4 8.4 0 0 1 8.4-8.4 8.4 8.4 0 0 1 8.5 8z"/></svg>',
  discord: '<svg viewBox="0 0 24 24"><path d="M19 5.5A16 16 0 0 0 15 4l-.3.6a12 12 0 0 1 3.3 1.6 11 11 0 0 0-12 0A12 12 0 0 1 9.3 4.6L9 4a16 16 0 0 0-4 1.5C2.5 9 2 12.5 2.2 16a16 16 0 0 0 5 2.5l.8-1.4a9 9 0 0 1-1.6-.8l.4-.3a11 11 0 0 0 10.4 0l.4.3a9 9 0 0 1-1.6.8l.8 1.4a16 16 0 0 0 5-2.5c.3-4-.4-7.5-2.8-10.5z"/><circle cx="9" cy="12.5" r="1.2"/><circle cx="15" cy="12.5" r="1.2"/></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v13"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  trendUp: '<svg viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/></svg>',
  award: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.4L7 22l5-3 5 3-1.2-8.6"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>',
  history: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M4 22V4M4 4l3-1c2 0 3 1 5 1s3-1 5-1 3 1 3 1v9s-1 1-3 1-3-1-5-1-3 1-5 1l-3-1"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .7-5.3 4.7 1.6 7.1L12 18l-6.3 3.5L7.3 14.4 2 9.7 9 9z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  table: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 4-5"/></svg>',
};

(function () {
  // inject icons
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      if (!["icon", "nav-icon"].some((c) => el.classList.contains(c))) el.classList.add("icon");
    }
  });

  // active bottom nav
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    const t = a.getAttribute("data-page");
    if (t && path === t) a.classList.add("active");
  });

  // form submit / button redirects / demo alerts
  document.querySelectorAll("[data-login]").forEach((f) => f.addEventListener("submit", (e) => { e.preventDefault(); location.href = f.getAttribute("data-login-to") || "home.html"; }));
  document.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); location.href = b.getAttribute("data-goto"); }));
  document.querySelectorAll("[data-demo]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); alert(b.getAttribute("data-demo") || "モック動作です"); }));

  // chips (single active) — filter groups
  document.querySelectorAll("[data-filter-group]").forEach((g) => g.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => { g.querySelectorAll(".chip").forEach((x) => x.classList.remove("active")); c.classList.add("active"); })));

  // single-select groups
  document.querySelectorAll("[data-select-group]").forEach((g) => g.querySelectorAll("[data-select]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); g.querySelectorAll("[data-select]").forEach((x) => x.classList.remove("selected")); el.classList.add("selected"); })));

  // multi-select tags
  document.querySelectorAll(".tag.toggle").forEach((t) => t.addEventListener("click", (e) => { e.preventDefault(); t.classList.toggle("selected"); }));

  // search filter
  const si = document.querySelector("[data-search-input]");
  if (si) si.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll("[data-searchable]").forEach((r) => {
      const txt = (r.getAttribute("data-name") || r.textContent).toLowerCase();
      r.classList.toggle("hidden", q && !txt.includes(q));
    });
  });

  // ---- 選考ボード：ドラッグ&ドロップ（マウス・タッチ両対応） ----
  const board = document.querySelector(".board");
  if (board) {
    const cols = () => [...board.querySelectorAll(".board-col")];
    const updateCounts = () => cols().forEach((col) => {
      const cnt = col.querySelector(".board-col-head .cnt");
      if (cnt) cnt.textContent = col.querySelectorAll(".board-card").length;
    });
    const colUnder = (x, y) => {
      const el = document.elementFromPoint(x, y);
      return el ? el.closest(".board-col") : null;
    };
    board.querySelectorAll(".board-card").forEach((card) => {
      card.style.touchAction = "none";
      card.addEventListener("pointerdown", (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        const startX = e.clientX, startY = e.clientY;
        let started = false, ghost = null, ox = 0, oy = 0;
        const move = (ev) => {
          const dx = ev.clientX - startX, dy = ev.clientY - startY;
          if (!started) {
            if (Math.hypot(dx, dy) < 6) return;
            started = true;
            const rect = card.getBoundingClientRect();
            ox = startX - rect.left; oy = startY - rect.top;
            ghost = card.cloneNode(true);
            Object.assign(ghost.style, {
              position: "fixed", left: rect.left + "px", top: rect.top + "px",
              width: rect.width + "px", margin: "0", pointerEvents: "none",
              zIndex: "9999", opacity: "0.95", transform: "rotate(1.5deg)",
              boxShadow: "0 14px 34px rgba(0,0,0,0.28)",
            });
            document.body.appendChild(ghost);
            card.classList.add("card-dragging");
          }
          ghost.style.left = (ev.clientX - ox) + "px";
          ghost.style.top = (ev.clientY - oy) + "px";
          const col = colUnder(ev.clientX, ev.clientY);
          cols().forEach((c) => c.classList.toggle("drop-target", c === col));
          ev.preventDefault();
        };
        const up = (ev) => {
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerup", up);
          if (!started) return;
          const col = colUnder(ev.clientX, ev.clientY);
          if (col) col.appendChild(card);
          cols().forEach((c) => c.classList.remove("drop-target"));
          if (ghost) ghost.remove();
          card.classList.remove("card-dragging");
          updateCounts();
        };
        document.addEventListener("pointermove", move, { passive: false });
        document.addEventListener("pointerup", up);
      });
    });
  }
})();
