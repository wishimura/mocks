// Simple, minimal icon set (Lucide-inspired line icons).
// Use via <span class="icon" data-icon="name"></span> in HTML.
const ICONS = {
  book: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/><path d="M4 19.5V6.5"/></svg>',
  kanji: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M12 4v16M4 12h16"/></svg>',
  award: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5M3 8l9 5 9-5"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  flame: '<svg viewBox="0 0 24 24"><path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-3 2 1 4 4 4 7a6 6 0 0 1-12 0c0-4 3-6 6-12z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24"><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M7 5H4a3 3 0 0 0 3 4M17 5h3a3 3 0 0 1-3 4"/><path d="M12 13v3M9 20h6M8 20a4 4 0 0 1 8 0"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  bar: '<svg viewBox="0 0 24 24"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>',
  keyboard: '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  file: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
};

(function () {
  // Render icons from data-icon attributes
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      if (!el.classList.contains("icon") && !el.classList.contains("nav-icon") && !el.classList.contains("search-icon") && !el.classList.contains("logo-icon")) {
        el.classList.add("icon");
      }
    }
  });

  // Highlight bottom-nav active item
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    const target = a.getAttribute("data-page");
    if (!target) return;
    if (path === target) a.classList.add("active");
  });

  // Login form demo
  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = form.getAttribute("data-login-to") || "home.html";
      location.href = target;
    });
  });

  // Button page transitions
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = el.getAttribute("data-goto");
    });
  });

  // Generic select-group highlight (e.g. quiz format / range chooser)
  document.querySelectorAll("[data-select-group]").forEach((group) => {
    group.querySelectorAll("[data-select]").forEach((opt) => {
      opt.addEventListener("click", () => {
        group.querySelectorAll("[data-select]").forEach((o) => o.classList.remove("active"));
        opt.classList.add("active");
      });
    });
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

  // Demo alert dialogs
  document.querySelectorAll("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(btn.getAttribute("data-demo"));
    });
  });

  // Toggle switches (visual only, no persistence)
  document.querySelectorAll(".toggle input").forEach((input) => {
    input.addEventListener("change", () => {});
  });

  /* ---------- 4択クイズ判定 ---------- */
  document.querySelectorAll("[data-choice-quiz]").forEach((quiz) => {
    const buttons = quiz.querySelectorAll("[data-choice]");
    const feedback = quiz.querySelector("[data-quiz-feedback]");
    const nextBtn = quiz.querySelector("[data-quiz-next]");
    let answered = false;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const isCorrect = btn.getAttribute("data-choice") === "correct";

        buttons.forEach((b) => {
          b.disabled = true;
          if (b.getAttribute("data-choice") === "correct") {
            b.classList.add("correct");
            b.insertAdjacentHTML(
              "beforeend",
              '<span class="result-icon icon" data-icon="check"></span>'
            );
          } else if (b === btn) {
            b.classList.add("wrong");
            b.insertAdjacentHTML(
              "beforeend",
              '<span class="result-icon icon" data-icon="x"></span>'
            );
          }
        });

        if (feedback) {
          feedback.classList.remove("hidden");
          feedback.classList.add(isCorrect ? "ok" : "ng");
          feedback.querySelector("[data-feedback-text]").textContent = isCorrect
            ? "正解です！"
            : "残念、不正解です。";
          const icoEl = feedback.querySelector(".icon");
          if (icoEl) icoEl.innerHTML = ICONS[isCorrect ? "check" : "x"];
        }
        if (nextBtn) nextBtn.classList.remove("hidden");

        document.querySelectorAll("[data-icon]").forEach((el) => {
          const name = el.getAttribute("data-icon");
          if (ICONS[name] && !el.innerHTML) el.innerHTML = ICONS[name];
        });
      });
    });
  });

  /* ---------- スペル入力クイズ判定 ---------- */
  document.querySelectorAll("[data-spell-quiz]").forEach((quiz) => {
    const input = quiz.querySelector("[data-spell-input]");
    const submitBtn = quiz.querySelector("[data-spell-submit]");
    const feedback = quiz.querySelector("[data-quiz-feedback]");
    const nextBtn = quiz.querySelector("[data-quiz-next]");
    const answer = (quiz.getAttribute("data-answer") || "").trim().toLowerCase();
    let answered = false;

    function submit() {
      if (answered || !input.value.trim()) return;
      answered = true;
      const isCorrect = input.value.trim().toLowerCase() === answer;
      input.disabled = true;
      input.classList.add(isCorrect ? "is-correct" : "is-wrong");
      submitBtn.disabled = true;

      if (feedback) {
        feedback.classList.remove("hidden");
        feedback.classList.add(isCorrect ? "ok" : "ng");
        feedback.querySelector("[data-feedback-text]").textContent = isCorrect
          ? "正解です！"
          : "不正解です。";
        const icoEl = feedback.querySelector(".icon");
        if (icoEl) icoEl.innerHTML = ICONS[isCorrect ? "check" : "x"];
        const ansEl = feedback.querySelector("[data-feedback-answer]");
        if (ansEl && !isCorrect) ansEl.textContent = "正解: " + quiz.getAttribute("data-answer-display");
        else if (ansEl) ansEl.textContent = "";
      }
      if (nextBtn) nextBtn.classList.remove("hidden");
    }

    if (submitBtn) submitBtn.addEventListener("click", submit);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); submit(); }
      });
      setTimeout(() => input.focus(), 50);
    }
  });
})();
