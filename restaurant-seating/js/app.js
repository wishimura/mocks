// 卓割 / Takuwari - 共通 JavaScript
// アイコン (Lucide-inspired, line-art SVG)
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  layout: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  history: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
  print: '<svg viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  sync: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  utensils: '<svg viewBox="0 0 24 24"><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M5 11v11M14 22V2c-2.5 0-5 2-5 5v6c0 1.1.9 2 2 2h3"/></svg>',
  gift: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M7.5 8a2.5 2.5 0 0 1 0-5C9 3 12 8 12 8S15 3 16.5 3a2.5 2.5 0 0 1 0 5"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M12 9v4M12 17v.01M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/></svg>',
  merge: '<svg viewBox="0 0 24 24"><path d="M8 3v6c0 1.7 1.3 3 3 3h2c1.7 0 3 1.3 3 3v6"/><path d="M5 6l3-3 3 3M19 18l-3 3-3-3"/></svg>',
  split: '<svg viewBox="0 0 24 24"><path d="M16 3h5v5M21 3l-7 7M4 16v5h5M4 21l7-7"/></svg>',
  move: '<svg viewBox="0 0 24 24"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/></svg>',
  save: '<svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
  filter: '<svg viewBox="0 0 24 24"><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  drag: '<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .7-5.3 4.7 1.6 7.1L12 18l-6.3 3.5L7.3 14.4 2 9.7 9 9z"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></svg>',
};

(function () {
  // Insert SVG icons
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      if (!el.classList.contains("icon") && !el.classList.contains("nav-icon") && !el.classList.contains("search-icon")) {
        el.classList.add("icon");
      }
    }
  });

  // Highlight active bottom-nav
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    const target = a.getAttribute("data-page");
    if (!target) return;
    if (path === target) a.classList.add("active");
  });

  // Search
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

  // Filter chips
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  });

  // Single-select option groups
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

  // Tabs
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    group.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        group.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  });

  // Login
  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = form.getAttribute("data-login-to") || "board.html";
      location.href = target;
    });
  });

  // Goto buttons
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = btn.getAttribute("data-goto");
    });
  });

  // Demo alerts
  document.querySelectorAll("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(btn.getAttribute("data-demo") || "モック動作です");
    });
  });

  // Toggles
  document.querySelectorAll("[data-toggle]").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("on"));
  });

  // ========== Toast ==========
  let toastEl = null;
  function showToast(message, type = "info", ms = 2400) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.className = "toast show " + type;
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => {
      toastEl.className = "toast " + type;
    }, ms);
  }
  window.showToast = showToast;

  // ========== Capacity controls (admin: layout editor) ==========
  document.querySelectorAll("[data-cap-input]").forEach((wrap) => {
    const valEl = wrap.querySelector("[data-cap-val]");
    wrap.querySelector("[data-cap-minus]")?.addEventListener("click", () => {
      const v = Math.max(1, parseInt(valEl.textContent) - 1);
      valEl.textContent = v;
    });
    wrap.querySelector("[data-cap-plus]")?.addEventListener("click", () => {
      const v = Math.min(20, parseInt(valEl.textContent) + 1);
      valEl.textContent = v;
    });
  });

  // ========== Drag-and-drop seating board ==========
  const board = document.querySelector("[data-board]");
  if (!board) return;

  let dragGuestEl = null;    // The guest card / seated / banquet row being dragged
  let dragPax = 0;
  const splitMemory = new Map(); // anchor.id -> { rightHtml, gridCol, gridRow, anchorOrigGridCol, anchorOrigGridRow, anchorOrigCap, anchorOrigTable }

  function COURSE_LABEL(c) {
    if (c === "std") return "STD";
    if (c === "up") return "グレードアップ";
    if (c === "stay") return "滞在料理";
    return "";
  }
  function COURSE_CLASS(c) {
    if (c === "up") return "guest-course up";
    if (c === "stay") return "guest-course stay";
    return "guest-course";
  }

  function tagBadge(tag, options = {}) {
    const compact = options.compact;
    if (tag === "記念日") return '<span class="badge badge-special">記念日</span>';
    if (tag === "アレルギー") return '<span class="badge badge-allergy">アレルギー</span>';
    if (tag === "VIP") return '<span class="badge badge-vip">VIP</span>';
    if (tag === "同席") return '<span class="badge badge-info">同席希望</span>';
    if (tag === "車椅子") return '<span class="badge badge-info">車椅子</span>';
    return `<span class="badge">${tag}</span>`;
  }

  function recalcCounts() {
    // Restaurant tables
    document.querySelectorAll("[data-table]").forEach((tbl) => {
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0, count = 0;
      tbl.querySelectorAll(".seated-guest").forEach((g) => {
        used += parseInt(g.getAttribute("data-pax")) || 0;
        count += 1;
      });
      const capEl = tbl.querySelector("[data-cap-display]");
      if (capEl) {
        capEl.textContent = `${used}/${cap}名`;
        capEl.classList.toggle("full", used >= cap && used > 0);
        capEl.classList.toggle("over", used > cap);
      }
      tbl.classList.toggle("has-guest", count > 0);
      tbl.classList.toggle("over-capacity", used > cap);
      const body = tbl.querySelector("[data-table-body]");
      if (body) {
        const empty = body.querySelector(".seat-empty-text");
        if (empty) empty.style.display = count === 0 ? "" : "none";
      }
    });

    // Banquet hall (大広間)
    const banquet = document.querySelector("[data-banquet]");
    if (banquet) {
      const rows = banquet.querySelectorAll(".banquet-row");
      let banquetPax = 0;
      rows.forEach((r) => banquetPax += parseInt(r.getAttribute("data-pax")) || 0);
      const banCount = document.querySelector("[data-banquet-count]");
      if (banCount) banCount.textContent = rows.length;
      const banPax = document.querySelector("[data-banquet-pax]");
      if (banPax) banPax.textContent = banquetPax;
      const empty = banquet.querySelector(".banquet-empty");
      if (empty) empty.style.display = rows.length === 0 ? "" : "none";
    }

    // Unassigned counter
    const list = document.querySelector("[data-guest-list]");
    if (list) {
      const remaining = list.querySelectorAll(".guest-card").length;
      const counter = document.querySelector("[data-unassigned-count]");
      if (counter) counter.textContent = remaining;
      const empty = list.querySelector(".guest-empty");
      if (empty) empty.style.display = remaining === 0 ? "" : "none";
    }

    // Assigned ratio
    const totalAssigned = document.querySelectorAll(".table-cell .seated-guest").length
      + document.querySelectorAll("[data-banquet] .banquet-row").length;
    const remaining = document.querySelectorAll("[data-guest-list] .guest-card").length;
    const total = totalAssigned + remaining;
    const ratioEl = document.querySelector("[data-assigned-ratio]");
    if (ratioEl) ratioEl.textContent = `${totalAssigned} / ${total}組`;
  }

  function bindGuestDrag(el) {
    el.setAttribute("draggable", "true");
    el.addEventListener("dragstart", (e) => {
      dragGuestEl = el;
      dragPax = parseInt(el.getAttribute("data-pax")) || 1;
      el.classList.add("dragging");
      try { e.dataTransfer.setData("text/plain", el.getAttribute("data-guest-id") || ""); } catch {}
      e.dataTransfer.effectAllowed = "move";
    });
    el.addEventListener("dragend", () => {
      el.classList.remove("dragging");
      document.querySelectorAll(".drop-target, .invalid-target").forEach((x) => {
        x.classList.remove("drop-target", "invalid-target");
      });
    });
  }

  document.querySelectorAll("[data-guest-card]").forEach(bindGuestDrag);

  // Tables: drop targets with capacity check
  document.querySelectorAll("[data-table]").forEach((tbl) => {
    tbl.addEventListener("dragover", (e) => {
      if (!dragGuestEl) return;
      e.preventDefault();
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0;
      tbl.querySelectorAll(".seated-guest").forEach((g) => { used += parseInt(g.getAttribute("data-pax")) || 0; });
      if (dragGuestEl.closest("[data-table]") === tbl) used -= dragPax;
      const wouldFit = used + dragPax <= cap;
      tbl.classList.toggle("drop-target", wouldFit);
      tbl.classList.toggle("invalid-target", !wouldFit);
      e.dataTransfer.dropEffect = wouldFit ? "move" : "none";
    });
    tbl.addEventListener("dragleave", (e) => {
      if (!tbl.contains(e.relatedTarget)) tbl.classList.remove("drop-target", "invalid-target");
    });
    tbl.addEventListener("drop", (e) => {
      e.preventDefault();
      tbl.classList.remove("drop-target", "invalid-target");
      if (!dragGuestEl) return;
      if (dragGuestEl.closest("[data-table]") === tbl) return;
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0;
      tbl.querySelectorAll(".seated-guest").forEach((g) => { used += parseInt(g.getAttribute("data-pax")) || 0; });
      if (used + dragPax > cap) {
        showToast(`定員${cap}名を超えるため割り当てできません（${used}名 + ${dragPax}名）`, "error");
        return;
      }
      moveGuestToTable(dragGuestEl, tbl);
      showToast(`卓 ${tbl.getAttribute("data-table")} に ${dragGuestEl.getAttribute("data-name")} 様を配席`, "success");
      recalcCounts();
    });
  });

  // Banquet (大広間): no capacity check, free seating
  const banquetDrop = document.querySelector("[data-banquet]");
  if (banquetDrop) {
    banquetDrop.addEventListener("dragover", (e) => {
      if (!dragGuestEl) return;
      e.preventDefault();
      banquetDrop.classList.add("drop-target");
      e.dataTransfer.dropEffect = "move";
    });
    banquetDrop.addEventListener("dragleave", (e) => {
      if (!banquetDrop.contains(e.relatedTarget)) banquetDrop.classList.remove("drop-target");
    });
    banquetDrop.addEventListener("drop", (e) => {
      e.preventDefault();
      banquetDrop.classList.remove("drop-target");
      if (!dragGuestEl) return;
      if (dragGuestEl.classList.contains("banquet-row")) return;
      moveGuestToBanquet(dragGuestEl);
      showToast(`大広間に ${dragGuestEl.getAttribute("data-name")} 様を配席`, "success");
      recalcCounts();
    });
  }

  // Unassigned list: drop back from anywhere
  const guestList = document.querySelector("[data-guest-list]");
  if (guestList) {
    guestList.addEventListener("dragover", (e) => {
      if (!dragGuestEl) return;
      const fromTable = !!dragGuestEl.closest("[data-table]");
      const fromBanquet = dragGuestEl.classList.contains("banquet-row");
      if (fromTable || fromBanquet) {
        e.preventDefault();
        guestList.classList.add("drop-target");
        e.dataTransfer.dropEffect = "move";
      }
    });
    guestList.addEventListener("dragleave", () => guestList.classList.remove("drop-target"));
    guestList.addEventListener("drop", (e) => {
      if (!dragGuestEl) return;
      const fromTable = !!dragGuestEl.closest("[data-table]");
      const fromBanquet = dragGuestEl.classList.contains("banquet-row");
      if (!fromTable && !fromBanquet) return;
      e.preventDefault();
      guestList.classList.remove("drop-target");
      moveGuestToList(dragGuestEl);
      showToast("割り当てを解除しました", "info");
      recalcCounts();
    });
  }

  function copyGuestAttrs(from, to) {
    ["guest-id","pax","pax-adult","pax-kid","name","room","course","food","allergy","memo","tags"].forEach((k) => {
      const v = from.getAttribute("data-" + k);
      if (v != null) to.setAttribute("data-" + k, v);
    });
    if (from.classList.contains("is-special")) to.classList.add("is-special");
    if (from.classList.contains("is-allergy")) to.classList.add("is-allergy");
  }

  function buildListCard(src) {
    const card = document.createElement("div");
    card.className = "guest-card";
    card.setAttribute("data-guest-card", "");
    copyGuestAttrs(src, card);
    const room = src.getAttribute("data-room") || "";
    const name = src.getAttribute("data-name") || "";
    const adult = parseInt(src.getAttribute("data-pax-adult")) || 0;
    const kid = parseInt(src.getAttribute("data-pax-kid")) || 0;
    const total = adult + kid;
    const course = src.getAttribute("data-course") || "";
    const food = src.getAttribute("data-food") || "";
    const allergy = src.getAttribute("data-allergy") || "";
    const memo = src.getAttribute("data-memo") || "";
    const tagsHtml = (src.getAttribute("data-tags") || "").split(",").filter(Boolean).map(t => tagBadge(t)).join(" ");
    card.innerHTML = `
      <div class="guest-row1">
        <span class="guest-room">${room}号</span>
        <span class="guest-pax">${total}名</span>
      </div>
      <p class="guest-name">${name} 様</p>
      <div class="guest-meals">
        ${adult > 0 ? `<span class="meal-pill"><span class="num">${adult}</span> 大人料理</span>` : ""}
        ${kid > 0 ? `<span class="meal-pill kid"><span class="num">${kid}</span> 子供料理</span>` : ""}
        ${course ? `<span class="${COURSE_CLASS(course)}">${COURSE_LABEL(course)}</span>` : ""}
      </div>
      ${tagsHtml ? `<div class="guest-meta">${tagsHtml}</div>` : ""}
      ${allergy ? `<div class="guest-meta"><span class="badge badge-allergy">⚠ ${allergy}</span></div>` : ""}
      ${food ? `<div class="guest-meta muted" style="font-size:10px;">飲食: ${food}</div>` : ""}
      ${memo ? `<div class="guest-meta muted" style="font-size:10px;">${memo}</div>` : ""}
    `;
    bindGuestDrag(card);
    return card;
  }

  function buildSeatedFromCard(src) {
    const seat = document.createElement("div");
    seat.className = "seated-guest";
    seat.setAttribute("data-guest-card", "");
    copyGuestAttrs(src, seat);
    const room = src.getAttribute("data-room") || "";
    const name = src.getAttribute("data-name") || "";
    const adult = parseInt(src.getAttribute("data-pax-adult")) || 0;
    const kid = parseInt(src.getAttribute("data-pax-kid")) || 0;
    const total = adult + kid;
    const course = src.getAttribute("data-course") || "";
    const allergy = src.getAttribute("data-allergy") || "";
    const tagsHtml = (src.getAttribute("data-tags") || "").split(",").filter(Boolean).map(t => {
      if (t === "記念日") return '<span class="badge badge-special">記念日</span>';
      if (t === "VIP") return '<span class="badge badge-vip">VIP</span>';
      if (t === "車椅子") return '<span class="badge badge-info">車椅子</span>';
      return "";
    }).filter(Boolean).join(" ");
    const meal = `${adult > 0 ? `大${adult}` : ""}${adult > 0 && kid > 0 ? "/" : ""}${kid > 0 ? `子${kid}` : ""}`;
    seat.innerHTML = `
      <button class="remove" data-unseat aria-label="解除">×</button>
      <span class="room">${room}号</span><span class="name">${name}様</span>
      <div class="info">
        <span>${total}名 ${meal ? `(${meal})` : ""}</span>
        ${course ? `<span class="${COURSE_CLASS(course)}" style="font-size:9px;">${COURSE_LABEL(course)}</span>` : ""}
        ${tagsHtml}
      </div>
      ${allergy ? `<div class="info"><span class="badge badge-allergy" style="font-size:9px;">⚠${allergy}</span></div>` : ""}
    `;
    bindGuestDrag(seat);
    bindUnseat(seat);
    return seat;
  }

  function buildBanquetRow(src) {
    const row = document.createElement("div");
    row.className = "banquet-row";
    row.setAttribute("data-guest-card", "");
    copyGuestAttrs(src, row);
    const room = src.getAttribute("data-room") || "";
    const name = src.getAttribute("data-name") || "";
    const adult = parseInt(src.getAttribute("data-pax-adult")) || 0;
    const kid = parseInt(src.getAttribute("data-pax-kid")) || 0;
    const total = adult + kid;
    const course = src.getAttribute("data-course") || "";
    const allergy = src.getAttribute("data-allergy") || "";
    const memo = src.getAttribute("data-memo") || "";
    row.innerHTML = `
      <button class="remove" data-unseat aria-label="解除">×</button>
      <div class="br-head">
        <span class="br-room">${room}号</span>
        <span class="br-name">${name}様</span>
        <span class="guest-pax" style="font-size:10px;padding:1px 6px;">${total}名</span>
      </div>
      <div class="br-meta">
        ${adult > 0 ? `<span>大${adult}</span>` : ""}
        ${kid > 0 ? `<span>子${kid}</span>` : ""}
        ${course ? `<span class="${COURSE_CLASS(course)}" style="font-size:9px;">${COURSE_LABEL(course)}</span>` : ""}
        ${allergy ? `<span class="badge badge-allergy" style="font-size:9px;">⚠${allergy}</span>` : ""}
      </div>
      ${memo ? `<div class="br-meta muted">${memo}</div>` : ""}
    `;
    bindGuestDrag(row);
    bindUnseat(row);
    return row;
  }

  function moveGuestToTable(srcEl, table) {
    const newSeat = buildSeatedFromCard(srcEl);
    table.querySelector("[data-table-body]")?.appendChild(newSeat);
    srcEl.remove();
  }
  function moveGuestToBanquet(srcEl) {
    const banquet = document.querySelector("[data-banquet] .banquet-list");
    if (!banquet) return;
    const newRow = buildBanquetRow(srcEl);
    banquet.appendChild(newRow);
    srcEl.remove();
  }
  function moveGuestToList(srcEl) {
    const list = document.querySelector("[data-guest-list]");
    const newCard = buildListCard(srcEl);
    list?.appendChild(newCard);
    srcEl.remove();
  }

  function bindUnseat(seat) {
    const btn = seat.querySelector("[data-unseat]");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveGuestToList(seat);
      showToast("割り当てを解除しました", "info");
      recalcCounts();
    });
  }
  document.querySelectorAll(".seated-guest, .banquet-row").forEach(bindUnseat);

  // ========== Edit mode (combine / split tables) ==========
  const editToggle = document.querySelector("[data-edit-mode]");
  if (editToggle) {
    editToggle.addEventListener("click", () => {
      const on = board.classList.toggle("edit-mode");
      editToggle.classList.toggle("active", on);
      const lbl = editToggle.querySelector("[data-edit-label]");
      if (lbl) lbl.textContent = on ? "編集中…完了" : "卓レイアウト編集";
      if (!on) document.querySelectorAll(".table-cell.selected").forEach((c) => c.classList.remove("selected"));
    });
  }

  function isCombined(tbl) {
    return tbl.classList.contains("combined-h") || tbl.classList.contains("combined-v");
  }
  function adjacency(a, b) {
    const aCol = parseInt(a.dataset.col), aRow = parseInt(a.dataset.row);
    const bCol = parseInt(b.dataset.col), bRow = parseInt(b.dataset.row);
    if (!aCol || !bCol) return null;
    if (aRow === bRow && Math.abs(aCol - bCol) === 1) return "h";
    if (aCol === bCol && Math.abs(aRow - bRow) === 1) return "v";
    return null;
  }
  function countSeatedPax(tbl) {
    let s = 0;
    tbl.querySelectorAll(".seated-guest").forEach((g) => s += parseInt(g.getAttribute("data-pax")) || 0);
    return s;
  }

  document.querySelectorAll("[data-table]").forEach((tbl) => {
    tbl.addEventListener("click", (e) => {
      if (!board.classList.contains("edit-mode")) return;
      // Click on a combined table = split
      if (isCombined(tbl)) {
        if (confirm(`卓 ${tbl.getAttribute("data-table")} の結合を解除しますか？`)) splitTable(tbl);
        return;
      }
      tbl.classList.toggle("selected");
      const selected = document.querySelectorAll(".table-cell.selected");
      if (selected.length === 2) {
        const [a, b] = selected;
        const dir = adjacency(a, b);
        if (!dir) {
          showToast("隣接していない卓は結合できません（縦・横の隣のみ）", "error");
          a.classList.remove("selected");
          b.classList.remove("selected");
          return;
        }
        // anchor = top-left
        const aCol = parseInt(a.dataset.col), aRow = parseInt(a.dataset.row);
        const bCol = parseInt(b.dataset.col), bRow = parseInt(b.dataset.row);
        const anchor = (aCol < bCol || aRow < bRow) ? a : b;
        const other = anchor === a ? b : a;
        const newCap = parseInt(anchor.getAttribute("data-capacity")) + parseInt(other.getAttribute("data-capacity"));
        const newName = `${anchor.getAttribute("data-table")}+${other.getAttribute("data-table")}`;
        if (!confirm(`卓 ${anchor.getAttribute("data-table")} と ${other.getAttribute("data-table")} を${dir === "h" ? "横" : "縦"}結合します（定員${newCap}名）。よろしいですか？`)) {
          a.classList.remove("selected");
          b.classList.remove("selected");
          return;
        }
        mergeTables(anchor, other, dir);
      }
    });
  });

  function mergeTables(anchor, other, dir) {
    if (!anchor.id) anchor.id = "tbl-" + Math.random().toString(36).slice(2, 9);
    const newCap = parseInt(anchor.getAttribute("data-capacity")) + parseInt(other.getAttribute("data-capacity"));
    const newName = `${anchor.getAttribute("data-table")}+${other.getAttribute("data-table")}`;
    splitMemory.set(anchor.id, {
      rightHtml: other.outerHTML,
      anchorOrigCap: anchor.getAttribute("data-capacity"),
      anchorOrigTable: anchor.getAttribute("data-table"),
      anchorOrigStyle: anchor.getAttribute("style") || "",
      anchorOrigClasses: Array.from(anchor.classList),
      direction: dir,
    });
    anchor.classList.remove("selected", "auxiliary", "empty");
    anchor.classList.add(dir === "h" ? "combined-h" : "combined-v");
    // Update grid placement using actual inline-style position (not data-row,
    // which is the global Excel row but sub-grids start at row 1 each)
    const startOf = (v) => (v ? v.split("/")[0].trim() : "");
    const colStart = startOf(anchor.style.gridColumn) || String(parseInt(anchor.dataset.col));
    const rowStart = startOf(anchor.style.gridRow) || String(parseInt(anchor.dataset.row));
    if (dir === "h") {
      anchor.style.gridColumn = `${colStart} / span 2`;
      anchor.style.gridRow = rowStart;
    } else {
      anchor.style.gridColumn = colStart;
      anchor.style.gridRow = `${rowStart} / span 2`;
    }
    anchor.setAttribute("data-capacity", newCap);
    anchor.setAttribute("data-table", newName);
    const numEl = anchor.querySelector(".table-num");
    if (numEl) numEl.firstChild.textContent = "卓 " + newName;
    // Move other's guests into anchor
    const body = anchor.querySelector("[data-table-body]");
    other.querySelectorAll(".seated-guest").forEach((g) => body?.appendChild(g));
    // Remove the seat-empty-text if guests were added
    if (body && body.querySelectorAll(".seated-guest").length > 0) {
      const empty = body.querySelector(".seat-empty-text");
      if (empty) empty.style.display = "none";
    }
    other.remove();
    recalcCounts();
    showToast(`卓 ${newName} を${dir === "h" ? "横" : "縦"}結合しました（定員${newCap}名）`, "success");
  }

  function splitTable(tbl) {
    const mem = splitMemory.get(tbl.id);
    if (!mem) {
      // Fallback if memory missing - just reset class
      tbl.classList.remove("combined-h", "combined-v");
      return;
    }
    // Remove combined classes
    tbl.classList.remove("combined-h", "combined-v");
    // Restore anchor state including inline style (grid placement)
    tbl.setAttribute("style", mem.anchorOrigStyle);
    tbl.setAttribute("data-capacity", mem.anchorOrigCap);
    tbl.setAttribute("data-table", mem.anchorOrigTable);
    const numEl = tbl.querySelector(".table-num");
    if (numEl) numEl.firstChild.textContent = "卓 " + mem.anchorOrigTable;
    // Re-insert the right cell after the anchor in the same parent
    const wrap = document.createElement("div");
    wrap.innerHTML = mem.rightHtml.trim();
    const restored = wrap.firstElementChild;
    tbl.parentNode.insertBefore(restored, tbl.nextSibling);
    rebindTable(restored);
    // Bounce excess guests back to list
    const cap = parseInt(mem.anchorOrigCap);
    let used = countSeatedPax(tbl);
    while (used > cap) {
      const last = tbl.querySelector(".seated-guest:last-child");
      if (!last) break;
      moveGuestToList(last);
      used = countSeatedPax(tbl);
    }
    splitMemory.delete(tbl.id);
    recalcCounts();
    showToast(`卓 ${mem.anchorOrigTable} の結合を解除しました`, "info");
  }

  // Re-bind drag/drop for a re-inserted table cell (after split)
  function rebindTable(tbl) {
    tbl.addEventListener("dragover", (e) => {
      if (!dragGuestEl) return;
      e.preventDefault();
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0;
      tbl.querySelectorAll(".seated-guest").forEach((g) => { used += parseInt(g.getAttribute("data-pax")) || 0; });
      if (dragGuestEl.closest("[data-table]") === tbl) used -= dragPax;
      const wouldFit = used + dragPax <= cap;
      tbl.classList.toggle("drop-target", wouldFit);
      tbl.classList.toggle("invalid-target", !wouldFit);
      e.dataTransfer.dropEffect = wouldFit ? "move" : "none";
    });
    tbl.addEventListener("dragleave", (e) => {
      if (!tbl.contains(e.relatedTarget)) tbl.classList.remove("drop-target", "invalid-target");
    });
    tbl.addEventListener("drop", (e) => {
      e.preventDefault();
      tbl.classList.remove("drop-target", "invalid-target");
      if (!dragGuestEl) return;
      if (dragGuestEl.closest("[data-table]") === tbl) return;
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0;
      tbl.querySelectorAll(".seated-guest").forEach((g) => { used += parseInt(g.getAttribute("data-pax")) || 0; });
      if (used + dragPax > cap) {
        showToast(`定員${cap}名を超えるため割り当てできません`, "error");
        return;
      }
      moveGuestToTable(dragGuestEl, tbl);
      showToast(`卓 ${tbl.getAttribute("data-table")} に配席`, "success");
      recalcCounts();
    });
    tbl.addEventListener("click", (e) => {
      if (!board.classList.contains("edit-mode")) return;
      if (isCombined(tbl)) {
        if (confirm(`卓 ${tbl.getAttribute("data-table")} の結合を解除しますか？`)) splitTable(tbl);
        return;
      }
      tbl.classList.toggle("selected");
    });
  }

  // Pre-populate splitMemory for pre-rendered combined tables
  document.querySelectorAll("[data-restore-right]").forEach((tbl) => {
    if (!tbl.id) tbl.id = "tbl-" + Math.random().toString(36).slice(2, 9);
    const decoder = document.createElement("textarea");
    decoder.innerHTML = tbl.getAttribute("data-restore-right");
    splitMemory.set(tbl.id, {
      rightHtml: decoder.value,
      anchorOrigCap: tbl.getAttribute("data-restore-anchor-cap"),
      anchorOrigTable: tbl.getAttribute("data-restore-anchor-table"),
      anchorOrigStyle: tbl.getAttribute("data-restore-anchor-style") || "",
      direction: tbl.classList.contains("combined-v") ? "v" : "h",
    });
  });

  // Initial counts
  recalcCounts();
})();
