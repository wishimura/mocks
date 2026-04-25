// ================================================================
// 業者マッチング モック - 共通JS
// - アイコン展開 / フィルタ切替 / 検索絞り込み / ボタン遷移 / チャット送信
// - サーバー通信なし。alert() や DOM操作のみ
// ================================================================

// Lucide風の線画アイコン。<span class="icon" data-icon="name"></span> で呼ぶ
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7L18 22l-6-4-6 4 1.3-7.7L2 9.6 9 9z"/></svg>',
  location: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  yen: '<svg viewBox="0 0 24 24"><path d="M5 4l7 9 7-9M12 13v7M8 14h8M8 18h8"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>',
  tag: '<svg viewBox="0 0 24 24"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-8.6-8.6V3h9l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  file: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
};

(function () {
  // ---- アイコン展開 ----
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!ICONS[name]) return;
    el.innerHTML = ICONS[name];
    const keep = ["icon", "nav-icon", "search-icon", "logo-icon"];
    if (!keep.some((c) => el.classList.contains(c))) el.classList.add("icon");
  });

  // ---- ボトムナビのアクティブ表示 ----
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    const target = a.getAttribute("data-page");
    if (!target) return;
    if (path === target) a.classList.add("active");
  });

  // ---- ログインフォーム（送信先に遷移するだけ） ----
  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = form.getAttribute("data-login-to") || "home.html";
      location.href = target;
    });
  });

  // ---- data-goto="next.html" でボタン遷移 ----
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.tagName.toLowerCase() === "a") return;
      e.preventDefault();
      location.href = el.getAttribute("data-goto");
    });
  });

  // ---- フィルタチップの切替（単一選択） ----
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        applyVendorFilters();
      });
    });
  });

  // ---- セレクト（カテゴリ・エリア）変更時も絞り込み再計算 ----
  document.querySelectorAll("[data-filter-select]").forEach((sel) => {
    sel.addEventListener("change", applyVendorFilters);
  });

  // ---- キーワード検索 ----
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    searchInput.addEventListener("input", applyVendorFilters);
  }

  // 業者カードを 検索語 × カテゴリ × エリア で絞り込む
  function applyVendorFilters() {
    const cards = document.querySelectorAll("[data-searchable]");
    if (!cards.length) return;

    const q = (document.querySelector("[data-search-input]")?.value || "").trim().toLowerCase();
    const catSel = document.querySelector("[data-filter-select=\"category\"]");
    const areaSel = document.querySelector("[data-filter-select=\"area\"]");
    const cat = catSel ? catSel.value : "";
    const area = areaSel ? areaSel.value : "";

    cards.forEach((card) => {
      const text = (card.getAttribute("data-name") || card.textContent).toLowerCase();
      const cardCat = card.getAttribute("data-category") || "";
      const cardArea = card.getAttribute("data-area") || "";
      const hitQ = !q || text.includes(q);
      const hitCat = !cat || cardCat === cat;
      const hitArea = !area || cardArea.includes(area);
      card.classList.toggle("hidden", !(hitQ && hitCat && hitArea));
    });

    // ヒット件数表示
    const counter = document.querySelector("[data-result-count]");
    if (counter) {
      const visible = document.querySelectorAll("[data-searchable]:not(.hidden)").length;
      counter.textContent = String(visible);
    }
  }
  applyVendorFilters();

  // ---- 汎用デモ動作 (data-demo="message") ----
  document.querySelectorAll("[data-demo]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      alert(el.getAttribute("data-demo"));
    });
  });

  // ---- 問い合わせフォーム送信（完了画面に遷移） ----
  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = form.getAttribute("data-inquiry-to") || "inquiry-complete.html";
      location.href = target;
    });
  });

  // ---- チャット送信（DOMに吹き出し追加） ----
  const chatForm = document.querySelector("[data-chat-form]");
  if (chatForm) {
    const input = chatForm.querySelector(".chat-input");
    const body = document.querySelector("[data-chat-body]");

    // Enter で送信 / Shift+Enter で改行
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        chatForm.requestSubmit();
      }
    });

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      const row = document.createElement("div");
      row.className = "bubble-row mine";
      const time = new Date();
      const hh = String(time.getHours()).padStart(2, "0");
      const mm = String(time.getMinutes()).padStart(2, "0");
      row.innerHTML = `
        <div class="bubble bubble-mine"></div>
        <div class="bubble-meta">${hh}:${mm}</div>
      `;
      row.querySelector(".bubble").textContent = text;
      body.appendChild(row);
      input.value = "";
      body.scrollTop = body.scrollHeight;
    });

    // 初期表示で末尾までスクロール
    if (body) body.scrollTop = body.scrollHeight;
  }
})();
