// Web商店街 - 店主向け 外観ビルダー（街と同じ冒険風の建物をライブ・カスタマイズ）
(function () {
  const cv = document.getElementById("builderCanvas");
  if (!cv || !window.ShopBuilding) return;
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height;

  const state = { wall: "#efe7d6", roof: "#b5572f", door: "#6a4a2a", night: false, sign: "BOOK STORE", emoji: "📚" };
  const THEMES = {
    "標準": { wall: "#efe7d6", roof: "#b5572f", door: "#6a4a2a", night: false },
    "和風": { wall: "#ece4d3", roof: "#384a40", door: "#5a3b2a", night: false },
    "洋風": { wall: "#f4ece0", roof: "#9c4a3c", door: "#6a3b24", night: false },
    "モダン": { wall: "#e9edf1", roof: "#3a4a64", door: "#2a3550", night: false },
    "ナチュラル": { wall: "#efe9da", roof: "#8a9a5b", door: "#7a5a38", night: false },
    "ポップ": { wall: "#fdeef1", roof: "#e8623d", door: "#d8456e", night: false },
    "夕暮れ": { wall: "#f3d8c0", roof: "#b5572f", door: "#7a3b24", night: false },
    "夜灯り": { wall: "#5a5470", roof: "#2a3550", door: "#e0a02c", night: true },
  };

  function redraw() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    if (state.night) { g.addColorStop(0, "#222a40"); g.addColorStop(1, "#2c3654"); }
    else { g.addColorStop(0, "#dfeef2"); g.addColorStop(1, "#d2e3da"); }
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = state.night ? "#3a3a50" : "#cdd6c2";
    ctx.beginPath(); ctx.ellipse(W / 2, H - 44, 120, 38, 0, 0, 7); ctx.fill();
    ShopBuilding.draw(ctx, W / 2, H - 58, 122, { wall: state.wall, roof: state.roof, door: state.door, night: state.night, short: state.sign, emoji: state.emoji }, 0);
  }

  document.querySelectorAll("[data-paint]").forEach((sw) =>
    sw.addEventListener("click", () => { state[sw.getAttribute("data-paint")] = sw.getAttribute("data-color"); redraw(); })
  );
  document.querySelectorAll("[data-theme]").forEach((ch) =>
    ch.addEventListener("click", () => {
      document.querySelectorAll("[data-theme]").forEach((c) => c.classList.remove("active"));
      ch.classList.add("active");
      const t = THEMES[ch.getAttribute("data-theme")];
      if (t) { state.wall = t.wall; state.roof = t.roof; state.door = t.door; state.night = t.night; }
      redraw();
    })
  );
  const si = document.getElementById("signInput");
  if (si) { state.sign = si.value || "BOOK STORE"; si.addEventListener("input", () => { state.sign = si.value || "SHOP"; redraw(); }); }

  redraw();
})();
