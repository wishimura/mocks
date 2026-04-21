// Minimal interactivity for the mock.
// Since this is a static HTML mock, interactions are simulated.

(function () {
  // Highlight the active bottom-nav item based on the current file name.
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a").forEach((a) => {
    const target = a.getAttribute("data-page");
    if (!target) return;
    if (path === target || (path === "" && target === "dashboard.html")) {
      a.classList.add("active");
    }
  });

  // Reception: name search filtering
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

  // Reception: one-tap check-in toggle
  document.querySelectorAll("[data-checkin]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const row = btn.closest(".applicant-row");
      if (!row) return;
      const badge = row.querySelector(".badge");
      const isDone = badge && badge.classList.contains("badge-done");
      if (isDone) {
        badge.classList.remove("badge-done");
        badge.classList.add("badge-pending");
        badge.textContent = "未受付";
        btn.textContent = "受付する";
        btn.classList.remove("btn-secondary");
        btn.classList.add("btn-success");
      } else if (badge) {
        badge.classList.remove("badge-pending");
        badge.classList.add("badge-done");
        badge.textContent = "受付済";
        btn.textContent = "取消";
        btn.classList.remove("btn-success");
        btn.classList.add("btn-secondary");
      }
      updateReceptionCount();
    });
  });

  function updateReceptionCount() {
    const counter = document.querySelector("[data-checkin-count]");
    if (!counter) return;
    const total = document.querySelectorAll(".applicant-row").length;
    const done = document.querySelectorAll(".applicant-row .badge-done").length;
    counter.textContent = `${done} / ${total}`;
  }
  updateReceptionCount();

  // Filter chips
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  });

  // Apply button (demo feedback)
  document.querySelectorAll("[data-apply]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.textContent = "申込済み ✓";
      btn.classList.remove("btn");
      btn.classList.add("btn", "btn-secondary");
      btn.disabled = true;
    });
  });

  // PDF download demo
  const pdfBtn = document.querySelector("[data-pdf]");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("PDFを出力しました（モック動作）");
    });
  }

  // Login form demo
  const loginForm = document.querySelector("[data-login]");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      location.href = "dashboard.html";
    });
  }
})();
