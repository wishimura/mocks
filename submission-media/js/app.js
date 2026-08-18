// Citrus Media — 自前アイコン + 簡易インタラクション（サーバー通信なし・DB接続なし）
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  crown: '<svg viewBox="0 0 24 24"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-1.6 12H4.6L3 7z"/></svg>',
  pen: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .7-5.3 4.7 1.6 7.1L12 18l-6.3 3.5L7.3 14.4 2 9.7 9 9z"/></svg>',
  bulb: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4"/><path d="M12 2a6 6 0 0 0-3.5 10.9c.6.5.9 1.2 1 1.9l.1 1.2h4.8l.1-1.2c.1-.7.4-1.4 1-1.9A6 6 0 0 0 12 2z"/></svg>',
  cheer: '<svg viewBox="0 0 24 24"><path d="M14 9V5a2 2 0 0 0-2-2l-3 8v10h9.3a2 2 0 0 0 2-1.7l1.2-8A2 2 0 0 0 19.5 9H14z"/><path d="M6 21H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2"/></svg>',
  tear: '<svg viewBox="0 0 24 24"><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  tag: '<svg viewBox="0 0 24 24"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V4a1 1 0 0 1 1-1h8a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  folder: '<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>',
  poll: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>',
  trendUp: '<svg viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4L12 14.01l-3-3"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M3 5h18M6 12h12M10 19h4"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  image: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v13"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
};

(function () {
  // アイコン差し込み
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      if (!el.classList.contains("icon") && !el.classList.contains("nav-icon")) el.classList.add("icon");
    }
  });

  // 現在地ハイライト（下部タブ・ヘッダーnav）
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a, .nav-links a").forEach((a) => {
    const t = a.getAttribute("data-page");
    if (t && page === t) a.classList.add("active");
  });

  // ログイン・登録フォーム → 指定先へ遷移
  document.querySelectorAll("[data-login]").forEach((f) =>
    f.addEventListener("submit", (e) => { e.preventDefault(); location.href = f.getAttribute("data-login-to") || "home.html"; }));

  // ボタン遷移
  document.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", (e) => { e.preventDefault(); location.href = b.getAttribute("data-goto"); }));

  // モック動作のダイアログ
  document.querySelectorAll("[data-demo]").forEach((b) =>
    b.addEventListener("click", (e) => { e.preventDefault(); alert(b.getAttribute("data-demo") || "モック動作です"); }));

  // フィルタチップ（1つだけ active・data-cat で絞り込み）
  document.querySelectorAll("[data-filter-group]").forEach((g) => {
    const chips = g.querySelectorAll("[data-filter]");
    chips.forEach((c) => c.addEventListener("click", (e) => {
      e.preventDefault();
      chips.forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      const key = c.getAttribute("data-filter");
      document.querySelectorAll("[data-filterable]").forEach((item) => {
        const cat = item.getAttribute("data-cat") || "";
        item.classList.toggle("hidden", key !== "all" && !cat.split(",").includes(key));
      });
    }));
  });

  // タブ切替（週間 / 月間 など）
  document.querySelectorAll("[data-tabs]").forEach((g) => {
    const key = g.getAttribute("data-tabs");
    const tabs = g.querySelectorAll("[data-tab]");
    tabs.forEach((t) => t.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      document.querySelectorAll('[data-panel-group="' + key + '"]').forEach((p) => {
        p.classList.toggle("hidden", p.getAttribute("data-panel") !== t.getAttribute("data-tab"));
      });
    }));
  });

  // キーワード検索（クライアント側の絞り込みのみ）
  const si = document.querySelector("[data-search-input]");
  if (si) si.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll("[data-searchable]").forEach((r) => {
      const txt = (r.getAttribute("data-name") || r.textContent).toLowerCase();
      r.classList.toggle("hidden", !!q && !txt.includes(q));
    });
  });

  // 複数種類のリアクション（押す/取り消しでカウント増減）
  document.querySelectorAll("[data-react]").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    const cnt = b.querySelector("b");
    const on = b.classList.toggle("on");
    if (cnt) {
      const n = parseInt(cnt.textContent.replace(/[^0-9]/g, ""), 10) || 0;
      cnt.textContent = (on ? n + 1 : n - 1).toLocaleString();
    }
  }));

  // 選択式アンケート（投票すると結果バーを表示）
  document.querySelectorAll("[data-poll]").forEach((p) => {
    const opts = [...p.querySelectorAll("[data-poll-opt]")];
    opts.forEach((o) => o.addEventListener("click", (e) => {
      e.preventDefault();
      if (p.classList.contains("voted")) return;
      p.classList.add("voted");
      o.classList.add("chosen");
      opts.forEach((x) => {
        const pct = x.getAttribute("data-pct") || "0";
        x.style.setProperty("--pct", pct + "%");
        const b = document.createElement("b");
        b.className = "poll-pct";
        b.textContent = pct + "%";
        x.appendChild(b);
      });
      const meta = p.querySelector("[data-poll-meta]");
      if (meta) meta.textContent = meta.getAttribute("data-voted-text") || meta.textContent;
    }));
  });

  // 単一選択グループ / 複数選択タグ
  document.querySelectorAll("[data-select-group]").forEach((g) =>
    g.querySelectorAll("[data-select]").forEach((el) => el.addEventListener("click", (e) => {
      e.preventDefault();
      g.querySelectorAll("[data-select]").forEach((x) => x.classList.remove("selected"));
      el.classList.add("selected");
    })));
  document.querySelectorAll("[data-tag-toggle] .tag").forEach((t) =>
    t.addEventListener("click", (e) => { e.preventDefault(); t.classList.toggle("selected"); }));
})();
