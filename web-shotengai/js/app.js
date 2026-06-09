// Web商店街 - icon set & minimal interactions (mock only)
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  map: '<svg viewBox="0 0 24 24"><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg>',
  store: '<svg viewBox="0 0 24 24"><path d="M4 9l1-5h14l1 5M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9M4 9h16M9 21v-6h6v6"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z"/></svg>',
  location: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  external: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>',
  share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  cart: '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 13h11l2-9H6"/></svg>',
  bag: '<svg viewBox="0 0 24 24"><path d="M6 7h12l1 13H5L6 7zM9 7a3 3 0 0 1 6 0"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M3 7h4l2-3h6l2 3h4v12H3V7z"/><circle cx="12" cy="13" r="4"/></svg>',
  image: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5L5 20"/></svg>',
  palette: '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11.5" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16.5" cy="11.5" r="1"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  layout: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
  x_sns: '<svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20"/></svg>',
  move: '<svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M9 5l3-3 3 3M9 19l3 3 3-3M5 9l-3 3 3 3M19 9l3 3-3 3"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M4 21V4h12l-2 4 2 4H4"/></svg>',
};

(function () {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      if (!el.classList.contains("icon") && !el.classList.contains("nav-icon") && !el.classList.contains("search-icon")) {
        el.classList.add("icon");
      }
    }
  });

  // Active bottom nav based on filename
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    const target = a.getAttribute("data-page");
    if (!target) return;
    if (path === target) a.classList.add("active");
  });

  // Filter chips
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  });

  // Single-select option groups (avatar / color / template pickers)
  document.querySelectorAll("[data-select-group]").forEach((group) => {
    group.querySelectorAll("[data-select]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        if (el.classList.contains("disabled")) return;
        group.querySelectorAll("[data-select]").forEach((c) => c.classList.remove("selected"));
        el.classList.add("selected");
      });
    });
  });

  // Text search filter
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

  // Login / form submit → go to target
  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = form.getAttribute("data-login-to") || "home.html";
      location.href = target;
    });
  });

  // Button redirects
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = btn.getAttribute("data-goto");
    });
  });

  // Demo alerts (mock-only actions)
  document.querySelectorAll("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(btn.getAttribute("data-demo") || "モック動作です");
    });
  });

  // Toggle (like / switch)
  document.querySelectorAll("[data-toggle]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      el.classList.toggle("on");
    });
  });

  // Town map: tap to walk your avatar (flavor only)
  const stage = document.querySelector("[data-stage]");
  const me = stage ? stage.querySelector(".avatar-pin.me") : null;
  if (stage && me) {
    stage.addEventListener("click", (e) => {
      if (e.target.closest(".shop-front")) return; // shop clicks go to detail / sheet
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      me.style.left = Math.max(4, Math.min(96, x)) + "%";
      me.style.top = Math.max(10, Math.min(94, y)) + "%";
    });
  }
})();

// ===== 賑わい版（店先で実演・試食）=====
(function () {
  const stage = document.querySelector("[data-live-stage]");
  if (!stage) return;

  const overlay = document.getElementById("sheetOverlay");
  const sheet = document.getElementById("shopSheet");
  let saleTimer = null;
  let viewerTimer = null;

  const fmt = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  const renderIcons = (root) => {
    root.querySelectorAll("[data-icon]").forEach((el) => {
      const n = el.getAttribute("data-icon");
      if (ICONS[n]) { el.innerHTML = ICONS[n]; if (!el.classList.contains("icon")) el.classList.add("icon"); }
    });
  };

  function closeSheet() {
    sheet.classList.remove("open");
    overlay.classList.remove("open");
    if (saleTimer) clearInterval(saleTimer);
    if (viewerTimer) clearInterval(viewerTimer);
  }

  function openSheet(el) {
    const d = el.dataset;
    const samples = parseInt(d.samples != null ? d.samples : "-1", 10);
    const sale = parseInt(d.sale || "0", 10);

    const html = [];
    html.push('<div class="sheet-grip"></div>');
    html.push(
      '<div class="sheet-head">' +
        '<div class="sheet-em" style="background:' + d.color + '">' + d.emoji + "</div>" +
        '<div><p class="sheet-title">' + d.shop + '</p><p class="sheet-kind muted">' + (d.cat || "") + "</p></div>" +
        '<button class="back" id="sheetClose"><span class="icon" data-icon="x"></span></button>' +
      "</div>"
    );
    html.push(
      '<div class="live-line">' +
        '<span class="live"><span class="ld"></span>' + d.kind + "</span>" +
        '<span><span class="icon" data-icon="users"></span> <span id="vCount">' + (d.viewers || "0") + "</span>人が見てる</span>" +
      "</div>"
    );
    html.push('<div class="event-card"><p class="et">' + d.title + "</p>");
    if (samples >= 0) {
      html.push('<div class="meter"><span>試食・サンプル</span><span>残り <span class="num" id="sampleN">' + samples + "</span> 個</span></div>");
    }
    if (sale > 0) {
      html.push('<div class="meter"><span>タイムセール</span><span class="countdown" id="cd">' + fmt(sale) + "</span></div>");
    }
    html.push("</div>");
    if (samples >= 0) {
      html.push('<button class="btn btn-block" id="getSample" style="margin-bottom:10px"><span class="icon" data-icon="sparkle"></span> 試食をもらう</button>');
    }
    html.push('<button class="btn btn-navy btn-block" id="watchLive" style="margin-bottom:10px"><span class="icon" data-icon="users"></span> 実演ライブを見る</button>');
    html.push(
      '<div class="grid-2">' +
        '<a class="ec-btn ec-base" id="ecBase"><span class="icon" data-icon="bag"></span><div>BASEで買う</div></a>' +
        '<a class="ec-btn ec-shopify" id="ecShop"><span class="icon" data-icon="cart"></span><div>Shopifyで買う</div></a>' +
      "</div>"
    );
    sheet.innerHTML = html.join("");
    renderIcons(sheet);

    sheet.classList.add("open");
    overlay.classList.add("open");

    sheet.querySelector("#sheetClose").addEventListener("click", closeSheet);

    // 試食をもらう → 残数が減り、初回はクーポン獲得（モック）
    let remaining = samples;
    let gotCoupon = false;
    const sampleBtn = sheet.querySelector("#getSample");
    if (sampleBtn) {
      sampleBtn.addEventListener("click", () => {
        if (remaining <= 0) return;
        remaining -= 1;
        sheet.querySelector("#sampleN").textContent = remaining;
        if (!gotCoupon) {
          gotCoupon = true;
          alert("試食を受け取りました！「" + d.shop + "」で使える10%OFFクーポンを獲得しました（モック）");
        }
        if (remaining <= 0) {
          sampleBtn.disabled = true;
          sampleBtn.style.opacity = "0.5";
          sampleBtn.innerHTML = "本日の試食は終了しました";
        }
      });
    }
    sheet.querySelector("#watchLive").addEventListener("click", () => alert(d.kind + "「" + d.title + "」をライブ視聴します（モック）"));
    sheet.querySelector("#ecBase").addEventListener("click", () => alert("BASEのストアへ移動します（外部サイト・モック）"));
    sheet.querySelector("#ecShop").addEventListener("click", () => alert("Shopifyのストアへ移動します（外部サイト・モック）"));

    // タイムセールのカウントダウン
    if (sale > 0) {
      let left = sale;
      const cd = sheet.querySelector("#cd");
      saleTimer = setInterval(() => {
        left -= 1;
        if (left <= 0) { cd.textContent = "終了"; clearInterval(saleTimer); return; }
        cd.textContent = fmt(left);
      }, 1000);
    }

    // 視聴者数のゆらぎ（ライブ感）
    const vEl = sheet.querySelector("#vCount");
    if (vEl) {
      viewerTimer = setInterval(() => {
        let v = parseInt(vEl.textContent, 10) + (Math.floor(Math.random() * 5) - 2);
        vEl.textContent = Math.max(1, v);
      }, 2500);
    }
  }

  overlay.addEventListener("click", closeSheet);
  stage.querySelectorAll(".shop-front").forEach((el) => {
    el.addEventListener("click", (e) => { e.preventDefault(); openSheet(el); });
  });

  // 呼び込み吹き出し
  const hot = [].slice.call(stage.querySelectorAll(".shop-front.hot"));
  function popCalloutOn(el) {
    const phrases = (el.dataset.callouts || "いらっしゃい！").split("|");
    const text = phrases[Math.floor(Math.random() * phrases.length)];
    let c = el.querySelector(".callout");
    if (!c) { c = document.createElement("div"); c.className = "callout"; el.appendChild(c); }
    c.textContent = text;
    c.classList.add("show");
    clearTimeout(c._t);
    c._t = setTimeout(() => c.classList.remove("show"), 2600);
  }
  if (hot.length) {
    setInterval(() => popCalloutOn(hot[Math.floor(Math.random() * hot.length)]), 2400);
    setTimeout(() => popCalloutOn(hot[0]), 600);
  }

  // 通りすがり：近づいた店が呼び込みしてくる
  stage.addEventListener("click", (e) => {
    if (e.target.closest(".shop-front") || !hot.length) return;
    const rect = stage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    let best = null, bd = Infinity;
    hot.forEach((el) => {
      const dx = parseFloat(el.style.left) - x, dy = parseFloat(el.style.top) - y;
      const dd = dx * dx + dy * dy;
      if (dd < bd) { bd = dd; best = el; }
    });
    if (best) popCalloutOn(best);
  });

  // いま賑わってるお店チップ → その店先を開く
  document.querySelectorAll("[data-open-shop]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const target = stage.querySelector('.shop-front[data-shop="' + chip.getAttribute("data-open-shop") + '"]');
      if (target) openSheet(target);
    });
  });
})();
