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

  let dragSource = null;     // 'list' | element with [data-table]
  let dragGuestEl = null;    // The guest card being dragged
  let dragPax = 0;

  function recalcCounts() {
    // Count assigned guests per table (sum pax)
    document.querySelectorAll("[data-table]").forEach((tbl) => {
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0;
      let count = 0;
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

    // Update unassigned counter
    const list = document.querySelector("[data-guest-list]");
    if (list) {
      const remaining = list.querySelectorAll(".guest-card").length;
      const counter = document.querySelector("[data-unassigned-count]");
      if (counter) counter.textContent = remaining;
      const empty = list.querySelector(".guest-empty");
      if (empty) empty.style.display = remaining === 0 ? "" : "none";
    }

    // Update assigned ratio
    const totalAssigned = document.querySelectorAll(".table-cell .seated-guest").length;
    const remaining = document.querySelectorAll("[data-guest-list] .guest-card").length;
    const total = totalAssigned + remaining;
    const ratioEl = document.querySelector("[data-assigned-ratio]");
    if (ratioEl) ratioEl.textContent = `${totalAssigned} / ${total}組`;
  }

  function bindGuestDrag(card) {
    card.setAttribute("draggable", "true");
    card.addEventListener("dragstart", (e) => {
      dragGuestEl = card;
      dragPax = parseInt(card.getAttribute("data-pax")) || 1;
      dragSource = card.closest("[data-table]") || "list";
      card.classList.add("dragging");
      try { e.dataTransfer.setData("text/plain", card.getAttribute("data-guest-id") || ""); } catch {}
      e.dataTransfer.effectAllowed = "move";
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      document.querySelectorAll(".drop-target, .invalid-target").forEach((el) => {
        el.classList.remove("drop-target", "invalid-target");
      });
    });
  }

  // Bind all existing guest cards (in list & on tables)
  document.querySelectorAll("[data-guest-card]").forEach(bindGuestDrag);

  // Tables: drop targets
  document.querySelectorAll("[data-table]").forEach((tbl) => {
    tbl.addEventListener("dragover", (e) => {
      if (!dragGuestEl) return;
      e.preventDefault();
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0;
      tbl.querySelectorAll(".seated-guest").forEach((g) => { used += parseInt(g.getAttribute("data-pax")) || 0; });
      // If this drag is *from* this same table, used already includes it - subtract
      if (dragGuestEl.closest("[data-table]") === tbl) used -= dragPax;
      const wouldFit = used + dragPax <= cap;
      tbl.classList.toggle("drop-target", wouldFit);
      tbl.classList.toggle("invalid-target", !wouldFit);
      e.dataTransfer.dropEffect = wouldFit ? "move" : "none";
    });
    tbl.addEventListener("dragleave", (e) => {
      if (!tbl.contains(e.relatedTarget)) {
        tbl.classList.remove("drop-target", "invalid-target");
      }
    });
    tbl.addEventListener("drop", (e) => {
      e.preventDefault();
      tbl.classList.remove("drop-target", "invalid-target");
      if (!dragGuestEl) return;
      const cap = parseInt(tbl.getAttribute("data-capacity")) || 0;
      let used = 0;
      tbl.querySelectorAll(".seated-guest").forEach((g) => { used += parseInt(g.getAttribute("data-pax")) || 0; });
      if (dragGuestEl.closest("[data-table]") === tbl) {
        // Same table - just ignore
        return;
      }
      if (used + dragPax > cap) {
        showToast(`定員${cap}名を超えるため割り当てできません（${used}名 + ${dragPax}名）`, "error");
        return;
      }
      // Move card
      moveGuestToTable(dragGuestEl, tbl);
      showToast(`卓 ${tbl.getAttribute("data-table")} に ${dragGuestEl.getAttribute("data-name")} 様を割り当てました`, "success");
      recalcCounts();
    });
  });

  // Drop back on the guest list (un-assign)
  const guestList = document.querySelector("[data-guest-list]");
  if (guestList) {
    guestList.addEventListener("dragover", (e) => {
      if (!dragGuestEl) return;
      // Only allow if drag is from a table (not from list itself)
      if (dragGuestEl.closest("[data-table]")) {
        e.preventDefault();
        guestList.classList.add("drop-target");
        e.dataTransfer.dropEffect = "move";
      }
    });
    guestList.addEventListener("dragleave", () => {
      guestList.classList.remove("drop-target");
    });
    guestList.addEventListener("drop", (e) => {
      if (!dragGuestEl) return;
      if (!dragGuestEl.closest("[data-table]")) return;
      e.preventDefault();
      guestList.classList.remove("drop-target");
      moveGuestToList(dragGuestEl);
      showToast("割り当てを解除しました", "info");
      recalcCounts();
    });
  }

  function buildListCard(seatedEl) {
    const card = document.createElement("div");
    card.className = "guest-card";
    if (seatedEl.classList.contains("is-special")) card.classList.add("is-special");
    if (seatedEl.classList.contains("is-allergy")) card.classList.add("is-allergy");
    card.setAttribute("data-guest-card", "");
    card.setAttribute("data-guest-id", seatedEl.getAttribute("data-guest-id"));
    card.setAttribute("data-pax", seatedEl.getAttribute("data-pax"));
    card.setAttribute("data-name", seatedEl.getAttribute("data-name"));
    const pax = seatedEl.getAttribute("data-pax");
    const paxDetail = seatedEl.getAttribute("data-pax-detail") || "";
    const room = seatedEl.getAttribute("data-room");
    const name = seatedEl.getAttribute("data-name");
    const time = seatedEl.getAttribute("data-time");
    const course = seatedEl.getAttribute("data-course");
    const tagsHtml = (seatedEl.getAttribute("data-tags") || "").split(",").filter(Boolean).map((t) => {
      if (t === "記念日") return '<span class="badge badge-special">記念日</span>';
      if (t === "アレルギー") return '<span class="badge badge-allergy">アレルギー</span>';
      if (t === "VIP") return '<span class="badge badge-vip">VIP</span>';
      if (t === "素泊り") return '<span class="badge badge-info">素泊り</span>';
      if (t === "グレードアップ") return '<span class="badge badge-warn">グレードアップ</span>';
      return `<span class="badge">${t}</span>`;
    }).join(" ");
    card.innerHTML = `
      <div class="guest-row1">
        <span class="guest-room">${room}</span>
        <span class="guest-pax">${pax}名</span>
      </div>
      <p class="guest-name">${name} 様</p>
      <div class="guest-meta">
        <span><span class="icon" data-icon="clock" style="width:11px;height:11px;"></span>${time || "-"}</span>
        <span class="guest-pax-detail">${paxDetail}</span>
        <span>${course || ""}</span>
      </div>
      ${tagsHtml ? `<div class="guest-meta">${tagsHtml}</div>` : ""}
    `;
    // Re-render icons inside the new card
    card.querySelectorAll("[data-icon]").forEach((el) => {
      const n = el.getAttribute("data-icon");
      if (ICONS[n]) el.innerHTML = ICONS[n];
    });
    bindGuestDrag(card);
    return card;
  }

  function buildSeatedFromCard(card) {
    const seat = document.createElement("div");
    seat.className = "seated-guest";
    if (card.classList.contains("is-special")) seat.classList.add("is-special");
    if (card.classList.contains("is-allergy")) seat.classList.add("is-allergy");
    seat.setAttribute("data-guest-card", "");
    seat.setAttribute("data-guest-id", card.getAttribute("data-guest-id"));
    seat.setAttribute("data-pax", card.getAttribute("data-pax"));
    seat.setAttribute("data-name", card.getAttribute("data-name"));
    seat.setAttribute("data-pax-detail", card.getAttribute("data-pax-detail") || "");
    seat.setAttribute("data-room", card.getAttribute("data-room") || "");
    seat.setAttribute("data-time", card.getAttribute("data-time") || "");
    seat.setAttribute("data-course", card.getAttribute("data-course") || "");
    seat.setAttribute("data-tags", card.getAttribute("data-tags") || "");
    const room = card.getAttribute("data-room") || "";
    const name = card.getAttribute("data-name") || "";
    const pax = card.getAttribute("data-pax") || "";
    const paxDetail = card.getAttribute("data-pax-detail") || "";
    const tagsHtml = (card.getAttribute("data-tags") || "").split(",").filter(Boolean).map((t) => {
      if (t === "記念日") return '<span class="badge badge-special">記念日</span>';
      if (t === "アレルギー") return '<span class="badge badge-allergy">エビ×</span>';
      if (t === "VIP") return '<span class="badge badge-vip">VIP</span>';
      return "";
    }).filter(Boolean).join(" ");
    seat.innerHTML = `
      <button class="remove" data-unseat aria-label="解除"><span class="icon" data-icon="x" style="width:10px;height:10px;"></span></button>
      <span class="room">${room}</span><span class="name">${name}様</span>
      <div class="info">
        <span>${pax}名${paxDetail ? `(${paxDetail})` : ""}</span>
        ${tagsHtml}
      </div>
    `;
    seat.querySelectorAll("[data-icon]").forEach((el) => {
      const n = el.getAttribute("data-icon");
      if (ICONS[n]) el.innerHTML = ICONS[n];
    });
    bindGuestDrag(seat);
    bindUnseat(seat);
    return seat;
  }

  function copyDataAttrs(from, to) {
    ["guest-id", "pax", "name", "pax-detail", "room", "time", "course", "tags"].forEach((k) => {
      const v = from.getAttribute("data-" + k);
      if (v != null) to.setAttribute("data-" + k, v);
    });
    if (from.classList.contains("is-special")) to.classList.add("is-special");
    if (from.classList.contains("is-allergy")) to.classList.add("is-allergy");
  }

  function moveGuestToTable(srcCard, table) {
    const newSeat = buildSeatedFromCard(srcCard);
    const body = table.querySelector("[data-table-body]");
    if (body) body.appendChild(newSeat);
    srcCard.remove();
  }

  function moveGuestToList(srcSeat) {
    const list = document.querySelector("[data-guest-list]");
    const newCard = buildListCard(srcSeat);
    if (list) list.appendChild(newCard);
    srcSeat.remove();
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
  document.querySelectorAll(".seated-guest").forEach(bindUnseat);

  // ========== Edit mode (combine / split tables) ==========
  const editToggle = document.querySelector("[data-edit-mode]");
  if (editToggle) {
    editToggle.addEventListener("click", () => {
      const on = board.classList.toggle("edit-mode");
      editToggle.classList.toggle("active", on);
      editToggle.querySelector("[data-edit-label]").textContent = on ? "編集中…完了" : "卓レイアウト編集";
      // Clear selections when leaving
      if (!on) {
        document.querySelectorAll(".table-cell.selected").forEach((c) => c.classList.remove("selected"));
      }
    });
  }

  // In edit mode, click selects up to 2 tables to merge
  document.querySelectorAll("[data-table]").forEach((tbl) => {
    tbl.addEventListener("click", (e) => {
      if (!board.classList.contains("edit-mode")) return;
      // Already-combined tables can be split
      if (tbl.classList.contains("combined")) {
        if (confirm(`卓 ${tbl.getAttribute("data-table")} の結合を解除しますか？`)) {
          splitTable(tbl);
        }
        return;
      }
      tbl.classList.toggle("selected");
      const selected = document.querySelectorAll(".table-cell.selected");
      if (selected.length === 2) {
        const a = selected[0], b = selected[1];
        const aPax = countSeatedPax(a);
        const bPax = countSeatedPax(b);
        const aCap = parseInt(a.getAttribute("data-capacity"));
        const bCap = parseInt(b.getAttribute("data-capacity"));
        const newCap = aCap + bCap;
        if (!confirm(`卓 ${a.getAttribute("data-table")} と ${b.getAttribute("data-table")} を結合します（${newCap}名定員）。よろしいですか？`)) {
          a.classList.remove("selected");
          b.classList.remove("selected");
          return;
        }
        mergeTables(a, b);
      }
    });
  });

  function countSeatedPax(tbl) {
    let s = 0;
    tbl.querySelectorAll(".seated-guest").forEach((g) => s += parseInt(g.getAttribute("data-pax")) || 0);
    return s;
  }

  function mergeTables(a, b) {
    const newCap = parseInt(a.getAttribute("data-capacity")) + parseInt(b.getAttribute("data-capacity"));
    const newName = `${a.getAttribute("data-table")}+${b.getAttribute("data-table")}`;
    a.classList.add("combined");
    a.classList.remove("selected");
    a.setAttribute("data-capacity", newCap);
    a.setAttribute("data-table", newName);
    a.setAttribute("data-merged-from", `${a.getAttribute("data-orig") || a.getAttribute("data-table").split("+")[0]},${b.getAttribute("data-table")}`);
    a.querySelector(".table-num").firstChild.textContent = "卓 " + newName;
    // Move b's guests into a
    b.querySelectorAll(".seated-guest").forEach((g) => a.querySelector("[data-table-body]").appendChild(g));
    b.remove();
    recalcCounts();
    showToast(`卓 ${newName} を結合しました（定員${newCap}名）`, "success");
  }

  function splitTable(tbl) {
    // Demo: just remove combined class and reset capacity to half (rounded)
    const cap = parseInt(tbl.getAttribute("data-capacity"));
    const half = Math.floor(cap / 2);
    const original = tbl.getAttribute("data-table").split("+")[0];
    tbl.classList.remove("combined");
    tbl.setAttribute("data-capacity", half);
    tbl.setAttribute("data-table", original);
    tbl.querySelector(".table-num").firstChild.textContent = "卓 " + original;
    // If guests exceed new cap, kick them back to the list
    let used = countSeatedPax(tbl);
    while (used > half) {
      const last = tbl.querySelector(".seated-guest:last-child");
      if (!last) break;
      moveGuestToList(last);
      used = countSeatedPax(tbl);
    }
    recalcCounts();
    showToast(`卓 ${original} の結合を解除しました`, "info");
  }

  // Initial counts
  recalcCounts();
})();
