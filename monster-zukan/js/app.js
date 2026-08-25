// となりのモンスター図鑑 — 自前アイコン + 簡易インタラクション（サーバー通信なし・DB接続なし）
const ICONS = {
  book: '<svg viewBox="0 0 24 24"><path d="M3 4.5A1.5 1.5 0 0 1 4.5 3H11v17H4.5A1.5 1.5 0 0 1 3 18.5z"/><path d="M21 4.5A1.5 1.5 0 0 0 19.5 3H13v17h6.5a1.5 1.5 0 0 0 1.5-1.5z"/><path d="M12 20v1"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  crown: '<svg viewBox="0 0 24 24"><path d="M3 7l4.5 4L12 4l4.5 7L21 7l-1.6 12H4.6L3 7z"/></svg>',
  pen: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  sword: '<svg viewBox="0 0 24 24"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6M16 16l4 4M19 21l2-2"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  school: '<svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/></svg>',
  house: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z"/><path d="M9.5 21v-6h5v6"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  tag: '<svg viewBox="0 0 24 24"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 3 12V4a1 1 0 0 1 1-1h8a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.6z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M3 5h18M6 12h12M10 19h4"/></svg>',
  sort: '<svg viewBox="0 0 24 24"><path d="M3 6h13M3 12h9M3 18h5M17 15l3 3 3-3M20 18V8"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>',
  trendUp: '<svg viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>',
  fire: '<svg viewBox="0 0 24 24"><path d="M12 2s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3s1.5-1 1-3c-.5-2-.5-3 0-4.5z"/><path d="M7 14a5 5 0 0 0 10 0"/></svg>',
  bomb: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="14.5" r="6.5"/><path d="M15.5 9.5L18 7M18 7l1-2 2 1-1 2-2-1z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4L12 14.01l-3-3"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>',
  doc: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v13"/></svg>',
};

// モンスターのシルエット（画像素材の代わり・タイプ別に3種）
const MONSTERS = {
  a: '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet"><path fill="#08070a" d="M50 15c-13 0-22 9-22 20 0 6 2 11 5 15-10 5-17 15-20 26-1 4 2 8 6 8h62c4 0 7-4 6-8-3-11-10-21-20-26 3-4 5-9 5-15 0-11-9-20-22-20z"/><path d="M36 30l10 4M64 30l-10 4" stroke="#ff9d3d" stroke-width="3" stroke-linecap="round"/><ellipse cx="41" cy="38" rx="4.6" ry="3" fill="#ffd23a"/><ellipse cx="59" cy="38" rx="4.6" ry="3" fill="#ffd23a"/></svg>',
  b: '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet"><circle cx="50" cy="14" r="9" fill="#08070a"/><path fill="#08070a" d="M50 18c-13 0-22 9-22 20 0 6 2 11 5 15-10 5-17 15-20 26-1 4 2 8 6 8h62c4 0 7-4 6-8-3-11-10-21-20-26 3-4 5-9 5-15 0-11-9-20-22-20z"/><ellipse cx="41" cy="39" rx="4.2" ry="3.4" fill="#7df5c2"/><ellipse cx="59" cy="39" rx="4.2" ry="3.4" fill="#7df5c2"/><path d="M43 52c4 3 10 3 14 0" stroke="#7df5c2" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
  c: '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet"><path fill="#08070a" d="M27 22l4-12 9 9zM73 22l-4-12-9 9z"/><path fill="#08070a" d="M50 15c-13 0-22 9-22 20 0 6 2 11 5 15-10 5-17 15-20 26-1 4 2 8 6 8h62c4 0 7-4 6-8-3-11-10-21-20-26 3-4 5-9 5-15 0-11-9-20-22-20z"/><ellipse cx="41" cy="38" rx="4.6" ry="3.2" fill="#ff8c3a"/><ellipse cx="59" cy="38" rx="4.6" ry="3.2" fill="#ff8c3a"/><path d="M42 51h16" stroke="#ff8c3a" stroke-width="2.6" stroke-linecap="round"/></svg>',
};

(function () {
  // アイコン差し込み
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const n = el.getAttribute("data-icon");
    if (ICONS[n]) {
      el.innerHTML = ICONS[n];
      if (!el.classList.contains("icon") && !el.classList.contains("nav-icon")) el.classList.add("icon");
    }
  });
  // モンスターのシルエット差し込み
  document.querySelectorAll("[data-mon]").forEach((el) => {
    el.innerHTML = MONSTERS[el.getAttribute("data-mon")] || MONSTERS.a;
  });

  // 現在地ハイライト
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a, .nav-links a").forEach((a) => {
    const t = a.getAttribute("data-page");
    if (t && page === t) a.classList.add("active");
  });

  // 画面遷移・モック動作
  document.querySelectorAll("[data-login]").forEach((f) =>
    f.addEventListener("submit", (e) => { e.preventDefault(); location.href = f.getAttribute("data-login-to") || "home.html"; }));
  document.querySelectorAll("[data-goto]").forEach((b) =>
    b.addEventListener("click", (e) => { e.preventDefault(); location.href = b.getAttribute("data-goto"); }));
  document.querySelectorAll("[data-demo]").forEach((b) =>
    b.addEventListener("click", (e) => { e.preventDefault(); alert(b.getAttribute("data-demo") || "モック動作です"); }));

  // タブ（モンスターの特徴 / 目撃情報 / 撃退事例）
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

  // リアクション（押す/取り消しでカウント増減）
  document.querySelectorAll("[data-react]").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    const c = b.querySelector(".react-count");
    const on = b.classList.toggle("on");
    if (c) {
      const n = parseInt(c.textContent.replace(/[^0-9]/g, ""), 10) || 0;
      c.textContent = (on ? n + 1 : n - 1).toLocaleString();
    }
  }));

  // 投票「あなたならどうする？」
  document.querySelectorAll("[data-vote]").forEach((v) => {
    const opts = [...v.querySelectorAll("[data-vote-opt]")];
    opts.forEach((o) => o.addEventListener("click", (e) => {
      e.preventDefault();
      if (v.classList.contains("voted")) return;
      v.classList.add("voted");
      o.classList.add("chosen");
      opts.forEach((x) => {
        const pct = x.getAttribute("data-pct") || "0";
        const bar = x.querySelector(".vote-bar i");
        const lbl = x.querySelector(".vote-pct");
        if (bar) bar.style.width = pct + "%";
        if (lbl) lbl.textContent = pct + "%";
      });
      const meta = v.querySelector("[data-vote-meta]");
      if (meta) meta.textContent = meta.getAttribute("data-voted-text") || meta.textContent;
    }));
  });

  // ---- 図鑑の絞り込み（環境 × タイプ × 立場 × キーワード）＋並び替え ----
  const board = document.querySelector("[data-zukan]");
  if (board) {
    const items = [...board.querySelectorAll("[data-item]")];
    const envBtns = [...document.querySelectorAll("[data-env]")];
    const typeBtns = [...document.querySelectorAll("[data-type]")];
    const posSel = document.querySelector("[data-pos]");
    const sortSel = document.querySelector("[data-sort]");
    const q = document.querySelector("[data-search-input]");
    const countEl = document.querySelector("[data-count]");
    const emptyEl = document.querySelector("[data-empty]");
    let env = "all";
    const types = new Set();

    function apply() {
      const kw = (q && q.value.trim().toLowerCase()) || "";
      const pos = (posSel && posSel.value) || "all";
      let shown = 0;
      items.forEach((it) => {
        const iEnv = it.getAttribute("data-env-val") || "";
        const iTypes = (it.getAttribute("data-types") || "").split(",").filter(Boolean);
        const iPos = it.getAttribute("data-pos-val") || "";
        const name = (it.getAttribute("data-name") || it.textContent).toLowerCase();
        const ok =
          (env === "all" || iEnv === env) &&
          (types.size === 0 || iTypes.some((t) => types.has(t))) &&
          (pos === "all" || iPos === pos) &&
          (!kw || name.includes(kw));
        it.classList.toggle("hidden", !ok);
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = shown;
      if (emptyEl) emptyEl.classList.toggle("hidden", shown !== 0);
    }
    function sortItems() {
      if (!sortSel) return;
      const key = sortSel.value;
      const parent = items[0] && items[0].parentNode;
      if (!parent) return;
      [...items]
        .sort((a, b) => {
          if (key === "no") return (a.getAttribute("data-no") || "").localeCompare(b.getAttribute("data-no") || "");
          return (+b.getAttribute("data-" + key) || 0) - (+a.getAttribute("data-" + key) || 0);
        })
        .forEach((el) => parent.appendChild(el));
    }
    envBtns.forEach((b) => b.addEventListener("click", (e) => {
      e.preventDefault();
      envBtns.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      env = b.getAttribute("data-env");
      apply();
    }));
    typeBtns.forEach((b) => b.addEventListener("click", (e) => {
      e.preventDefault();
      const t = b.getAttribute("data-type");
      if (types.has(t)) { types.delete(t); b.classList.remove("on"); }
      else { types.add(t); b.classList.add("on"); }
      apply();
    }));
    if (posSel) posSel.addEventListener("change", apply);
    if (q) q.addEventListener("input", apply);
    if (sortSel) sortSel.addEventListener("change", () => { sortItems(); apply(); });
    const clear = document.querySelector("[data-clear]");
    if (clear) clear.addEventListener("click", (e) => {
      e.preventDefault();
      env = "all"; types.clear();
      envBtns.forEach((x) => x.classList.toggle("active", x.getAttribute("data-env") === "all"));
      typeBtns.forEach((x) => x.classList.remove("on"));
      if (posSel) posSel.value = "all";
      if (q) q.value = "";
      apply();
    });
    sortItems();
    apply();
  }

  // 一覧の簡易検索（図鑑ボード以外のページ用）
  const si = document.querySelector("[data-simple-search]");
  if (si) si.addEventListener("input", (e) => {
    const kw = e.target.value.trim().toLowerCase();
    document.querySelectorAll("[data-searchable]").forEach((r) => {
      const t = (r.getAttribute("data-name") || r.textContent).toLowerCase();
      r.classList.toggle("hidden", !!kw && !t.includes(kw));
    });
  });

  // 単一選択 / 複数選択（投稿フォーム・管理画面）
  document.querySelectorAll("[data-select-group]").forEach((g) =>
    g.querySelectorAll("[data-select]").forEach((el) => el.addEventListener("click", (e) => {
      e.preventDefault();
      g.querySelectorAll("[data-select]").forEach((x) => x.classList.remove("active"));
      el.classList.add("active");
      const target = g.getAttribute("data-select-group");
      if (target) {
        document.querySelectorAll('[data-select-show="' + target + '"]').forEach((p) => {
          p.classList.toggle("hidden", p.getAttribute("data-select-val") !== el.getAttribute("data-select"));
        });
      }
    })));
  document.querySelectorAll("[data-toggle-group] .tag-btn").forEach((t) =>
    t.addEventListener("click", (e) => { e.preventDefault(); t.classList.toggle("on"); }));
})();
