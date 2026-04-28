// Lucide-inspired line icons (stroke="currentColor"). Use via <span class="icon" data-icon="name"></span>.
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  fish: '<svg viewBox="0 0 24 24"><path d="M3 12c3-5 8-6 12-5 3 .8 6 3 6 5s-3 4.2-6 5c-4 1-9 0-12-5z"/><circle cx="17" cy="11" r="0.8" fill="currentColor" stroke="none"/><path d="M7 12c0-1.5 1-3 3-3M7 12c0 1.5 1 3 3 3"/></svg>',
  tank: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="2.5"/><path d="M4 6v12a8 2.5 0 0 0 16 0V6"/><path d="M4 12a8 2.5 0 0 0 16 0"/></svg>',
  droplet: '<svg viewBox="0 0 24 24"><path d="M12 3s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12z"/></svg>',
  thermometer: '<svg viewBox="0 0 24 24"><path d="M14 4a2 2 0 1 0-4 0v10.5a4 4 0 1 0 4 0V4z"/></svg>',
  feed: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 11H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="10" cy="13" r="0.8" fill="currentColor" stroke="none"/><circle cx="14" cy="14" r="0.8" fill="currentColor" stroke="none"/><circle cx="12" cy="16" r="0.8" fill="currentColor" stroke="none"/></svg>',
  scale: '<svg viewBox="0 0 24 24"><path d="M3 7h18M6 7l-3 9a3 3 0 0 0 6 0L6 7zM18 7l-3 9a3 3 0 0 0 6 0L18 7zM12 3v18M9 21h6"/></svg>',
  ruler: '<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="6" rx="1"/><path d="M6 9v3M9 9v2M12 9v3M15 9v2M18 9v3"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>',
  history: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0zM12 9v4M12 17v.01"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M3 21V3M3 21h18"/><path d="M7 16v-5M11 16V8M15 16v-3M19 16V6"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M3 7h4l2-3h6l2 3h4v12H3V7z"/><circle cx="12" cy="13" r="4"/></svg>',
  flask: '<svg viewBox="0 0 24 24"><path d="M9 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19l-5-10V3M9 3h6"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>',
};

(function () {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      if (
        !el.classList.contains("icon") &&
        !el.classList.contains("nav-icon") &&
        !el.classList.contains("search-icon")
      ) {
        el.classList.add("icon");
      }
    }
  });

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a, .admin-nav a").forEach((a) => {
    const target = a.getAttribute("data-page");
    if (target && path === target) a.classList.add("active");
  });

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

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  });

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

  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = form.getAttribute("data-login-to") || "home.html";
      location.href = target;
    });
  });

  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = btn.getAttribute("data-goto");
    });
  });

  document.querySelectorAll("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(btn.getAttribute("data-demo") || "モック動作です");
    });
  });

  document.querySelectorAll("[data-toggle]").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("on"));
  });

  document.querySelectorAll("[data-stepper]").forEach((wrap) => {
    const num = wrap.querySelector(".num");
    const min = parseFloat(wrap.getAttribute("data-min") || "0");
    const step = parseFloat(wrap.getAttribute("data-step") || "1");
    wrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cur = parseFloat((num.textContent || "0").replace(/[^0-9.]/g, "")) || 0;
        const dir = btn.getAttribute("data-dir") === "down" ? -1 : 1;
        const next = Math.max(min, cur + step * dir);
        const unit = wrap.getAttribute("data-unit") || "";
        num.textContent = (Number.isInteger(step) ? next.toFixed(0) : next.toFixed(1)) + unit;
      });
    });
  });
})();
