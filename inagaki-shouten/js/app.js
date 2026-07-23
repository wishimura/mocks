// ================================================================
// 稲垣商店 業務システム モック - 共通JS
// - アイコン展開 / 遷移 / フィルタ / 検索 / モーダル
// - 価格算出・運賃算出の簡易計算ロジック（デモ用の概算式）
// - サーバー通信なし。alert() や DOM操作のみ
// ================================================================

const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>',
  calculator: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/></svg>',
  truck: '<svg viewBox="0 0 24 24"><rect x="1" y="7" width="14" height="11" rx="1"/><path d="M15 10h4l4 4v4h-8z"/><circle cx="6" cy="19.5" r="1.8"/><circle cx="17.5" cy="19.5" r="1.8"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="M21 8.5l-9-5-9 5 9 5 9-5z"/><path d="M3 8.5v7l9 5 9-5v-7"/><path d="M12 13.5v7"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 16.5l9 5 9-5"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M4 5h16M7 12h10M10 19h4"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  ruler: '<svg viewBox="0 0 24 24"><path d="M3 16.5L7.5 21 21 7.5 16.5 3 3 16.5z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/></svg>',
  scissors: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1L21 21M20 4L8.1 15.9"/></svg>',
  scale: '<svg viewBox="0 0 24 24"><path d="M12 3v18M7 7h10M4 7l3-4 3 4-3 4-3-4zM14 7l3-4 3 4-3 4-3-4z"/><path d="M5 20h14"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17h.01"/></svg>',
  trendUp: '<svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M15 6h6v6"/></svg>',
  fileText: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  tag: '<svg viewBox="0 0 24 24"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-8.6-8.6V3h9l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/></svg>',
};

const MOCK_DATA = {
  materials: {
    ss400: { name: "SS400（一般構造用炭素鋼）", density: 7.85, price: 180 },
    s45c: { name: "S45C（機械構造用炭素鋼）", density: 7.85, price: 210 },
    sus304: { name: "SUS304（ステンレス鋼）", density: 8.0, price: 650 },
    a5052: { name: "A5052（アルミニウム）", density: 2.68, price: 520 },
    c3604: { name: "C3604（快削黄銅）", density: 8.5, price: 980 },
  },
  cutFee: 300,
  taxRate: 0.1,
  carriers: [
    {
      id: "chuo",
      name: "中央物流サービス",
      area: "全国",
      pack: "束・個別梱包に対応",
      longNg: true,
      base: 1200,
      perKg: 38,
      areaSurcharge: { 近畿: 0, 関東: 300, 中部: 0, その他: 600 },
    },
    {
      id: "hokuriku",
      name: "北陸急送",
      area: "北陸・中部エリア中心",
      pack: "束・裸積み・長尺対応",
      longNg: false,
      base: 900,
      perKg: 30,
      areaSurcharge: { 近畿: 200, 関東: 700, 中部: 0, その他: 1200 },
    },
    {
      id: "zenkoku",
      name: "全国鋼材輸送",
      area: "全国（離島含む）",
      pack: "長尺・特殊荷姿に対応",
      longNg: false,
      base: 1600,
      perKg: 34,
      areaSurcharge: { 近畿: 100, 関東: 100, 中部: 100, その他: 400 },
    },
  ],
};

(function () {
  // ---- アイコン展開 ----
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!ICONS[name]) return;
    el.innerHTML = ICONS[name];
    const keep = ["icon", "nav-icon", "search-icon", "logo-icon", "row-icon", "role-icon"];
    if (!keep.some((c) => el.classList.contains(c))) el.classList.add("icon");
  });

  // ---- ボトムナビのアクティブ表示 ----
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    const target = a.getAttribute("data-page");
    if (!target) return;
    if (path === target) a.classList.add("active");
  });

  // ---- ログインフォーム ----
  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      location.href = form.getAttribute("data-login-to") || "home.html";
    });
  });

  // ---- data-goto でボタン遷移 ----
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.tagName.toLowerCase() === "a") return;
      e.preventDefault();
      location.href = el.getAttribute("data-goto");
    });
  });

  // ---- 選択肢のハイライト（data-select-group / data-select）----
  document.querySelectorAll("[data-select-group]").forEach((group) => {
    group.querySelectorAll("[data-select]").forEach((opt) => {
      opt.addEventListener("click", () => {
        group.querySelectorAll("[data-select]").forEach((o) => o.classList.remove("active"));
        opt.classList.add("active");
        const targetId = group.getAttribute("data-select-target");
        if (targetId) {
          const input = document.getElementById(targetId);
          if (input) input.value = opt.getAttribute("data-select");
        }
        group.dispatchEvent(new CustomEvent("select-change", { bubbles: true }));
      });
    });
  });

  // ---- フィルタチップの切替 ----
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        applyFilters();
      });
    });
  });
  document.querySelectorAll("[data-filter-select]").forEach((sel) => {
    sel.addEventListener("change", applyFilters);
  });
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) searchInput.addEventListener("input", applyFilters);

  function applyFilters() {
    const cards = document.querySelectorAll("[data-searchable]");
    if (!cards.length) return;
    const q = (document.querySelector("[data-search-input]")?.value || "").trim().toLowerCase();
    const filterGroup = document.querySelector("[data-filter-group]");
    const activeChip = filterGroup ? filterGroup.querySelector(".filter-chip.active") : null;
    const status = activeChip ? activeChip.getAttribute("data-filter") : "";

    cards.forEach((card) => {
      const text = (card.getAttribute("data-name") || card.textContent).toLowerCase();
      const cardStatus = card.getAttribute("data-status") || "";
      const hitQ = !q || text.includes(q);
      const hitStatus = !status || status === "all" || cardStatus === status;
      card.classList.toggle("hidden", !(hitQ && hitStatus));
    });

    const counter = document.querySelector("[data-result-count]");
    if (counter) {
      const visible = document.querySelectorAll("[data-searchable]:not(.hidden)").length;
      counter.textContent = String(visible);
    }
  }
  applyFilters();

  // ---- 汎用デモ動作 (data-demo="message") ----
  document.querySelectorAll("[data-demo]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      alert(el.getAttribute("data-demo"));
    });
  });

  // ---- モーダル / ポップアップ ----
  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = document.getElementById(trigger.getAttribute("data-open-modal"));
      if (modal) modal.classList.add("show");
    });
  });
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.classList.remove("show");
    });
    backdrop.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        backdrop.classList.remove("show");
      });
    });
  });

  // ================================================================
  // 価格算出（棒材の切断・重量から概算金額を計算）
  // ================================================================
  const pricingForm = document.querySelector("[data-pricing-form]");
  if (pricingForm) {
    const matSelect = document.getElementById("mat-select");
    const diaSelect = document.getElementById("dia-select");
    const lengthInput = document.getElementById("length-input");
    const qtyInput = document.getElementById("qty-input");
    const cutCheck = document.getElementById("cut-check");

    function calcPricing() {
      const mat = MOCK_DATA.materials[matSelect.value];
      const dia = parseFloat(diaSelect.value) || 0;
      const length = parseFloat(lengthInput.value) || 0;
      const qty = parseInt(qtyInput.value, 10) || 0;

      const areaMm2 = Math.PI * Math.pow(dia / 2, 2);
      const weightPerPieceKg = ((areaMm2 * length) / 1000) * (mat.density / 1000);
      const totalWeightKg = weightPerPieceKg * qty;
      const materialCost = totalWeightKg * mat.price;
      const cutFee = cutCheck.checked ? MOCK_DATA.cutFee * qty : 0;
      const subtotal = materialCost + cutFee;
      const tax = subtotal * MOCK_DATA.taxRate;
      const total = subtotal + tax;

      document.getElementById("result-amount").textContent = Math.round(total).toLocaleString();
      document.getElementById("bd-weight").textContent = totalWeightKg.toFixed(2) + " kg";
      document.getElementById("bd-material-cost").textContent = "¥" + Math.round(materialCost).toLocaleString();
      document.getElementById("bd-cut-fee").textContent = "¥" + Math.round(cutFee).toLocaleString();
      document.getElementById("bd-subtotal").textContent = "¥" + Math.round(subtotal).toLocaleString();
      document.getElementById("bd-tax").textContent = "¥" + Math.round(tax).toLocaleString();
      document.getElementById("bd-total").textContent = "¥" + Math.round(total).toLocaleString();
      document.getElementById("bd-unit-price").textContent = "¥" + mat.price.toLocaleString() + " /kg";

      const freightLink = document.getElementById("to-freight-link");
      if (freightLink) {
        freightLink.href = "freight.html?weight=" + Math.max(1, Math.round(totalWeightKg)) + "&from=pricing";
      }
      return total;
    }

    [matSelect, diaSelect, lengthInput, qtyInput, cutCheck].forEach((el) => {
      el.addEventListener("input", calcPricing);
      el.addEventListener("change", calcPricing);
    });
    calcPricing();
  }

  // ================================================================
  // 運賃算出（重量・エリア・荷姿から運送会社をマッチング）
  // ================================================================
  const freightForm = document.querySelector("[data-freight-form]");
  if (freightForm) {
    const weightInput = document.getElementById("weight-input");
    const areaSelect = document.getElementById("area-select");
    const longCheck = document.getElementById("long-check");
    const resultList = document.getElementById("freight-result-list");
    const linkBanner = document.getElementById("freight-link-banner");

    const params = new URLSearchParams(location.search);
    if (params.get("from") === "pricing") {
      const w = params.get("weight");
      if (w) weightInput.value = w;
      if (linkBanner) linkBanner.classList.remove("hidden");
    }

    function calcFreight() {
      const weight = parseFloat(weightInput.value) || 0;
      const area = areaSelect.value;
      const isLong = longCheck.checked;

      const results = MOCK_DATA.carriers
        .filter((c) => !(isLong && c.longNg))
        .map((c) => {
          const surcharge = c.areaSurcharge[area] !== undefined ? c.areaSurcharge[area] : c.areaSurcharge["その他"];
          const price = c.base + c.perKg * weight + surcharge;
          return { ...c, price: Math.round(price), surcharge };
        })
        .sort((a, b) => a.price - b.price);

      resultList.innerHTML = "";
      results.forEach((c, i) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "list-row";
        row.setAttribute("data-open-modal", "modal-carrier-" + c.id);
        row.innerHTML = `
          <span class="rank-badge ${i === 0 ? "best" : ""}">${i + 1}</span>
          <span class="row-body">
            <span class="row-title">${c.name}</span>
            <span class="row-sub">${c.area}・${c.pack}</span>
          </span>
          <span class="row-meta">
            <span class="row-value">¥${c.price.toLocaleString()}</span>
            ${i === 0 ? '<span class="badge badge-accent" style="margin-top:4px;">最安</span>' : ""}
          </span>`;
        resultList.appendChild(row);

        const modal = document.getElementById("modal-carrier-" + c.id);
        if (modal) {
          modal.querySelector("[data-carrier-base]").textContent = "¥" + c.base.toLocaleString();
          modal.querySelector("[data-carrier-perkg]").textContent = "¥" + c.perKg.toLocaleString() + " /kg";
          modal.querySelector("[data-carrier-weight-cost]").textContent = "¥" + Math.round(c.perKg * weight).toLocaleString();
          modal.querySelector("[data-carrier-surcharge]").textContent = "¥" + c.surcharge.toLocaleString();
          modal.querySelector("[data-carrier-total]").textContent = "¥" + c.price.toLocaleString();
        }
      });

      // 新しく生成したモーダルにも開閉イベントを付与
      document.querySelectorAll("#freight-result-list [data-open-modal]").forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          const modal = document.getElementById(trigger.getAttribute("data-open-modal"));
          if (modal) modal.classList.add("show");
        });
      });
    }

    [weightInput, areaSelect, longCheck].forEach((el) => {
      el.addEventListener("input", calcFreight);
      el.addEventListener("change", calcFreight);
    });
    calcFreight();
  }

  // ================================================================
  // 使用（切断）登録モーダル内の残材プレビュー
  // ================================================================
  const usageForm = document.querySelector("[data-usage-form]");
  if (usageForm) {
    const stockLength = 4000; // デモ用: 入荷長 4,000mm の棒材
    const cutLenInput = document.getElementById("usage-cut-length");
    const cutQtyInput = document.getElementById("usage-cut-qty");
    const remainEl = document.getElementById("usage-remain");
    const remainGauge = document.getElementById("usage-remain-gauge");

    function calcUsage() {
      const cutLen = parseFloat(cutLenInput.value) || 0;
      const cutQty = parseInt(cutQtyInput.value, 10) || 0;
      const used = cutLen * cutQty;
      const remain = Math.max(0, stockLength - used);
      remainEl.textContent = remain.toLocaleString() + " mm";
      remainEl.style.color = remain <= 0 ? "var(--danger)" : "";
      if (remainGauge) remainGauge.style.width = Math.min(100, (remain / stockLength) * 100) + "%";
    }
    [cutLenInput, cutQtyInput].forEach((el) => {
      el.addEventListener("input", calcUsage);
    });
    calcUsage();

    usageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("使用実績を登録しました（デモ）\n残材は在庫一覧に自動反映されます。");
      const modal = usageForm.closest(".modal-backdrop");
      if (modal) modal.classList.remove("show");
    });
  }

  // ================================================================
  // 入荷登録モーダル（送信でデモ完了メッセージ）
  // ================================================================
  document.querySelectorAll("[data-receiving-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("入荷情報を登録しました（デモ）\n在庫一覧に新しいロットが追加されます。");
      const modal = form.closest(".modal-backdrop");
      if (modal) modal.classList.remove("show");
    });
  });
})();
