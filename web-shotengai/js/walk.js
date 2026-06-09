// Web商店街 - 歩けるドット風RPGの街（Canvas・モック）
// 地面は淡く控えめ／お店の色は建物（屋根・看板・扉）で出す／約50店舗を歩き回る／冒険風の半木骨造（building.js）
(function () {
  const canvas = document.getElementById("walkCanvas");
  if (!canvas || !window.ShopBuilding) return;
  const ctx = canvas.getContext("2d");
  const VIEW_W = canvas.width, VIEW_H = canvas.height;

  const PAL = [
    { roof: "#e8623d", door: "#b34a2c" }, { roof: "#2bb3a3", door: "#1f8074" },
    { roof: "#3a7afe", door: "#2a57b0" }, { roof: "#e0a02c", door: "#a8761c" },
    { roof: "#7a5cd6", door: "#5a429e" }, { roof: "#4f9d5d", door: "#387043" },
    { roof: "#d8456e", door: "#a8294f" }, { roof: "#c0563b", door: "#8a3a26" },
    { roof: "#3aa0b0", door: "#2a7480" }, { roof: "#b5572f", door: "#854020" },
    { roof: "#6a8a3a", door: "#4d6629" }, { roof: "#5a6b8c", door: "#3f4d68" },
  ];
  const POOL = [
    { short: "こむぎ", name: "こむぎベーカリー", emoji: "🍞", cat: "食べもの・パン", desc: "国産小麦の焼きたてパン。限定パンも並びます。", ec: "BASE" },
    { short: "茶舗", name: "茶舗やまぐち", emoji: "🫖", cat: "飲みもの・日本茶", desc: "産地直送の一番茶。飲み比べセットが人気。", ec: "BASE" },
    { short: "みどり", name: "みどり園芸", emoji: "🌿", cat: "雑貨・観葉植物", desc: "多肉・観葉の小さな園芸店。育て方相談OK。", ec: "Shopify" },
    { short: "マロン", name: "洋菓子マロン", emoji: "🍰", cat: "食べもの・スイーツ", desc: "季節のケーキと焼き菓子。ギフト全国発送。", ec: "BASE" },
    { short: "革ナナ", name: "革工房ナナ", emoji: "👜", cat: "クラフト・レザー", desc: "手づくりレザー小物。名入れも承ります。", ec: "Shopify" },
    { short: "海鮮", name: "海鮮あおい", emoji: "🐟", cat: "食べもの・海産物", desc: "港直送の干物と海鮮。予約販売あり。", ec: "Shopify" },
    { short: "珈琲", name: "珈琲やま", emoji: "☕", cat: "飲みもの・コーヒー", desc: "自家焙煎のスペシャルティ。豆も買えます。", ec: "BASE" },
    { short: "花cafe", name: "花カフェ", emoji: "🌸", cat: "カフェ・花", desc: "花に囲まれたカフェ。ブーケの注文も。", ec: "Shopify" },
    { short: "うつわ", name: "陶器のうつわ", emoji: "🏺", cat: "雑貨・陶器", desc: "作家ものの器を少しずつ。普段使いに。", ec: "BASE" },
    { short: "八百屋", name: "八百屋ふじ", emoji: "🥬", cat: "食べもの・青果", desc: "朝採れ野菜と果物。詰め合わせも人気。", ec: "BASE" },
    { short: "蜂蜜", name: "はちみつ堂", emoji: "🍯", cat: "食べもの・蜂蜜", desc: "国産はちみつ専門。食べ比べセットあり。", ec: "Shopify" },
    { short: "毛糸", name: "毛糸のいと", emoji: "🧶", cat: "クラフト・手芸", desc: "天然素材の毛糸とキット。編み図つき。", ec: "Shopify" },
    { short: "本の森", name: "本の森", emoji: "📚", cat: "雑貨・書店", desc: "店主が選ぶ古今の本。文具も少し。", ec: "BASE" },
    { short: "飴", name: "あめ細工こはく", emoji: "🍬", cat: "食べもの・和菓子", desc: "昔ながらの飴細工。実演もしています。", ec: "BASE" },
    { short: "香", name: "香りのことね", emoji: "🕯️", cat: "雑貨・フレグランス", desc: "アロマとキャンドル。香りのオーダーも。", ec: "Shopify" },
    { short: "眼鏡", name: "めがね日和", emoji: "👓", cat: "雑貨・眼鏡", desc: "顔に合う一本を一緒に。フレーム多数。", ec: "Shopify" },
  ];

  // ---------- 街の生成（約50店舗）----------
  const cols = 9, rows = 6, MX = 160, SPX = 240, SPY = 300, BW = 104, BH = 60;
  const WORLD_W = MX * 2 + (cols - 1) * SPX + BW;
  const WORLD_H = MX * 2 + (rows - 1) * SPY + BH;
  const buildings = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const p = POOL[idx % POOL.length], col = PAL[idx % PAL.length];
    buildings.push({ x: MX + c * SPX, y: MX + r * SPY, w: BW, h: BH, short: p.short, name: p.name, emoji: p.emoji, cat: p.cat, desc: p.desc, ec: p.ec, wall: "#f2ede2", roof: col.roof, door: col.door });
    idx++;
  }

  const paths = [];
  for (let r = 0; r < rows; r++) paths.push({ x: 70, y: MX + r * SPY + BH + 26, w: WORLD_W - 140, h: 56 });
  [1.5, 4.5, 7.5].forEach((c) => paths.push({ x: MX + c * SPX - 26, y: 50, w: 60, h: WORLD_H - 100 }));
  const water = [{ x: WORLD_W - 150, y: 60, w: 120, h: 150 }];
  const trees = [
    { x: 110, y: 360, r: 15 }, { x: WORLD_W - 90, y: 760, r: 15 },
    { x: 120, y: 1200, r: 15 }, { x: WORLD_W - 120, y: 1480, r: 15 },
  ];
  const R = 11;
  function blockedAt(x, y) {
    for (const b of buildings) if (x > b.x - R && x < b.x + b.w + R && y > b.y - R && y < b.y + b.h + R) return true;
    for (const w of water) if (x > w.x - R && x < w.x + w.w + R && y > w.y - R && y < w.y + w.h + R) return true;
    for (const t of trees) { const dx = x - t.x, dy = y - t.y; if (dx * dx + dy * dy < (t.r + R) * (t.r + R)) return true; }
    if (x < R || x > WORLD_W - R || y < R || y > WORLD_H - R) return true;
    return false;
  }

  const THEMES = {
    standard: { label: "標準（淡い）", grass: "#d6dccb", grass2: "#d0d7c4", path: "#e7e1d2", water: "#c3dbe2", particle: null, night: false, deco: [] },
    spring: { label: "春のマルシェ", grass: "#d7e0c8", grass2: "#d1dac1", path: "#ece2d0", water: "#c8e0e8", particle: "sakura", night: false, deco: [] },
    summer: { label: "夏祭り", grass: "#d2dcc2", grass2: "#ccd6bb", path: "#ece2cb", water: "#bfdce6", particle: null, night: false, deco: [{ x: 360, y: 120, e: "🏮" }, { x: 840, y: 110, e: "🏮" }, { x: 1320, y: 120, e: "🏮" }, { x: 1800, y: 120, e: "🏮" }] },
    halloween: { label: "ハロウィン", grass: "#9aa088", grass2: "#949a82", path: "#a89c82", water: "#7c93a0", particle: "bat", night: true, deco: [{ x: 380, y: 360, e: "🎃" }, { x: 1100, y: 420, e: "🎃" }, { x: 1700, y: 380, e: "🎃" }] },
    winter: { label: "雪まつり", grass: "#e6ecee", grass2: "#e0e7ea", path: "#dde3e3", water: "#cfe3ea", particle: "snow", night: false, deco: [{ x: 360, y: 240, e: "⛄" }, { x: 1500, y: 980, e: "🎄" }] },
    beauty: { label: "美容の街（夜）", grass: "#8e8aa0", grass2: "#888499", path: "#9a93a6", water: "#7e89a4", particle: "sparkle", night: true, deco: [{ x: 420, y: 220, e: "🌸" }, { x: 1300, y: 560, e: "💄" }] },
  };
  let theme = THEMES.standard;

  const player = { x: WORLD_W / 2, y: WORLD_H / 2, dir: "down", step: 0, moving: false, name: "あなた", color: "#e8623d" };
  const others = [
    { x: WORLD_W / 2 - 120, y: WORLD_H / 2 - 40, color: "#3a7afe", name: "くまさん", tx: 0, ty: 0, spd: 60, dir: "down", step: 0 },
    { x: WORLD_W / 2 + 140, y: WORLD_H / 2 + 30, color: "#7a5cd6", name: "みけ", tx: 0, ty: 0, spd: 56, dir: "down", step: 0 },
    { x: WORLD_W / 2 + 40, y: WORLD_H / 2 + 120, color: "#2bb3a3", name: "ぺん太", tx: 0, ty: 0, spd: 58, dir: "down", step: 0 },
  ];
  others.forEach((o) => { o.tx = o.x; o.ty = o.y; });
  const cam = { x: 0, y: 0 };

  // ---------- 建物スプライト（PNGがあれば画像描画／無ければコード描画）----------
  const SPRITES = { "こむぎ": "../assets/buildings/bakery.png", "茶舗": "../assets/buildings/tea.png" };
  const sprImg = {};
  for (const k in SPRITES) { const im = new Image(); im.onload = function () { this._ok = true; }; im.src = SPRITES[k]; sprImg[k] = im; }

  // ---------- 入力 ----------
  const keys = {};
  function mapKey(k, on) {
    if (k === "ArrowUp" || k === "w" || k === "W") keys.up = on;
    else if (k === "ArrowDown" || k === "s" || k === "S") keys.down = on;
    else if (k === "ArrowLeft" || k === "a" || k === "A") keys.left = on;
    else if (k === "ArrowRight" || k === "d" || k === "D") keys.right = on;
  }
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
    mapKey(e.key, true);
    if (e.key === "Enter" || e.key === " ") enterShop();
  });
  window.addEventListener("keyup", (e) => mapKey(e.key, false));
  document.querySelectorAll("[data-dir]").forEach((btn) => {
    const d = btn.getAttribute("data-dir");
    const set = (on) => (e) => { e.preventDefault(); keys[d] = on; };
    btn.addEventListener("pointerdown", set(true));
    btn.addEventListener("pointerup", set(false));
    btn.addEventListener("pointerleave", set(false));
    btn.addEventListener("pointercancel", set(false));
  });
  const actBtn = document.getElementById("actBtn");
  if (actBtn) actBtn.addEventListener("click", enterShop);

  // 全画面（擬似フルスクリーン）
  const wrap = canvas.closest(".walk-wrap");
  const fsBtn = document.getElementById("fsBtn");
  if (fsBtn && wrap) {
    fsBtn.addEventListener("click", () => {
      const on = wrap.classList.toggle("fs");
      document.body.style.overflow = on ? "hidden" : "";
      fsBtn.textContent = on ? "✕ 解除" : "⤢ 全画面";
    });
  }

  // ---------- 近接で紹介ウィンドウ ----------
  let near = null;
  const panel = document.getElementById("walkInfo");
  const wic = document.getElementById("walkInfoClose");
  if (wic) wic.addEventListener("click", () => { if (panel) panel.classList.remove("open"); });
  function updateNear() {
    let best = null, bd = 76 * 76;
    for (const b of buildings) {
      const dx = player.x - (b.x + b.w / 2), dy = player.y - (b.y + b.h + 10);
      const dd = dx * dx + dy * dy;
      if (dd < bd) { bd = dd; best = b; }
    }
    if (best !== near) { near = best; renderInfo(); }
  }
  function renderInfo() {
    if (!panel) return;
    if (!near) { panel.classList.remove("open"); return; }
    panel.querySelector("[data-w=em]").textContent = near.emoji;
    panel.querySelector("[data-w=shop]").textContent = near.name;
    panel.querySelector("[data-w=cat]").textContent = near.cat;
    panel.querySelector("[data-w=desc]").textContent = near.desc;
    panel.querySelector("[data-w=ec]").textContent = near.ec + "で買う";
    panel.classList.add("open");
  }
  function enterShop() { if (near) location.href = "shop.html"; }

  // ---------- ワールド切替 ----------
  document.querySelectorAll("[data-world]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-world]").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      theme = THEMES[chip.getAttribute("data-world")] || THEMES.standard;
      initParticles();
      const tn = document.getElementById("themeName");
      if (tn) tn.textContent = theme.label;
    });
  });

  // ---------- パーティクル ----------
  let parts = [];
  function initParticles() {
    parts = [];
    const ty = theme.particle;
    const n = ty === "snow" ? 80 : ty === "sakura" ? 50 : ty === "sparkle" ? 38 : ty === "bat" ? 8 : 0;
    for (let i = 0; i < n; i++) parts.push({ x: Math.random() * VIEW_W, y: Math.random() * VIEW_H, v: 0.4 + Math.random(), s: Math.random() * Math.PI * 2 });
  }
  function drawParticles() {
    const ty = theme.particle;
    if (!ty) return;
    const now = performance.now();
    for (const p of parts) {
      if (ty === "snow") { p.y += p.v * 0.7; p.x += Math.sin(p.s + now / 1000) * 0.4; ctx.fillStyle = "rgba(255,255,255,.92)"; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill(); }
      else if (ty === "sakura") { p.y += p.v * 0.6; p.x += Math.sin(p.s + now / 800) * 0.7; ctx.fillStyle = "rgba(255,183,197,.9)"; ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, 7); ctx.fill(); }
      else if (ty === "sparkle") { p.y -= p.v * 0.2; ctx.fillStyle = "rgba(255,225,150,.9)"; ctx.font = "12px serif"; ctx.fillText("✦", p.x, p.y); }
      else if (ty === "bat") { p.x += Math.sin(p.s + now / 600) * 1.1; p.y += Math.cos(p.s + now / 700) * 0.6; ctx.font = "16px serif"; ctx.fillText("🦇", p.x, p.y); }
      if (p.y > VIEW_H + 12) { p.y = -10; p.x = Math.random() * VIEW_W; }
      if (p.y < -12) p.y = VIEW_H + 10;
      if (p.x > VIEW_W + 12) p.x = -10; if (p.x < -12) p.x = VIEW_W + 10;
    }
  }

  // ---------- 描画ヘルパ ----------
  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill(); }
  function ellipse(cx, cy, rx, ry, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.fill(); }
  function onScreen(x, y, pad) { return x > cam.x - pad && x < cam.x + VIEW_W + pad && y > cam.y - pad && y < cam.y + VIEW_H + pad; }

  function drawTree(t) {
    const sx = t.x - cam.x, sy = t.y - cam.y;
    ellipse(sx, sy + 6, t.r, 5, "rgba(0,0,0,.14)");
    ctx.fillStyle = "#7a5a3a"; rr(sx - 3, sy - 6, 6, 14, 2);
    ctx.fillStyle = theme.night ? "#5a6a52" : "#86a878"; ctx.beginPath(); ctx.arc(sx, sy - 14, t.r, 0, 7); ctx.fill();
  }
  function drawChar(wx, wy, color, dir, step, moving, name) {
    const sx = wx - cam.x, sy = wy - cam.y;
    const bob = moving ? Math.abs(Math.sin(step)) * 2.5 : 0;
    ellipse(sx, sy + 3, 10, 4, "rgba(0,0,0,.22)");
    ctx.fillStyle = color; rr(sx - 8, sy - 16 - bob, 16, 16, 6);
    ctx.fillStyle = "#f4d0ad"; ctx.beginPath(); ctx.arc(sx, sy - 22 - bob, 7, 0, 7); ctx.fill();
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(sx, sy - 24 - bob, 7, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#3a2e26";
    const ey = sy - 21 - bob;
    if (dir === "down") { ctx.fillRect(sx - 4, ey, 2, 2); ctx.fillRect(sx + 2, ey, 2, 2); }
    else if (dir === "left") ctx.fillRect(sx - 5, ey, 2, 2);
    else if (dir === "right") ctx.fillRect(sx + 3, ey, 2, 2);
    ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
    const tw = ctx.measureText(name).width + 12;
    ctx.fillStyle = "rgba(255,255,255,.92)"; rr(sx - tw / 2, sy - 44 - bob, tw, 14, 7);
    ctx.fillStyle = "#2a3550"; ctx.fillText(name, sx, sy - 34 - bob);
    ctx.textAlign = "left";
  }

  function render(now) {
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = theme.grass; ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    ctx.fillStyle = theme.grass2;
    for (let gy = -(cam.y % 80) - 80; gy < VIEW_H; gy += 80) ctx.fillRect(0, gy + 40, VIEW_W, 40);
    ctx.fillStyle = theme.water;
    for (const w of water) if (onScreen(w.x + w.w / 2, w.y + w.h / 2, 300)) rr(w.x - cam.x, w.y - cam.y, w.w, w.h, 16);
    ctx.fillStyle = theme.path;
    for (const p of paths) if (onScreen(p.x + p.w / 2, p.y + p.h / 2, 700)) rr(p.x - cam.x, p.y - cam.y, p.w, p.h, 10);

    const ents = [];
    for (const b of buildings) if (onScreen(b.x + b.w / 2, b.y, 220)) ents.push({ y: b.y + b.h, k: "b", o: b });
    for (const t of trees) if (onScreen(t.x, t.y, 80)) ents.push({ y: t.y, k: "t", o: t });
    for (const d of theme.deco) if (onScreen(d.x, d.y, 80)) ents.push({ y: d.y, k: "d", o: d });
    for (const o of others) ents.push({ y: o.y, k: "o", o: o });
    ents.push({ y: player.y, k: "p", o: player });
    ents.sort((a, b) => a.y - b.y);
    for (const e of ents) {
      if (e.k === "b") {
        const b = e.o, im = sprImg[b.short];
        if (im && im._ok) {
          const dw = b.w * 1.9, dh = dw * (im.naturalHeight / im.naturalWidth);
          const gx = b.x + b.w / 2 - cam.x, gy = b.y + b.h - cam.y + 6;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(im, gx - dw / 2, gy - dh, dw, dh);
        } else {
          ShopBuilding.draw(ctx, b.x + b.w / 2 - cam.x, b.y + b.h - cam.y, b.w, { wall: b.wall, roof: b.roof, door: b.door, emoji: b.emoji, short: b.short, night: theme.night }, now);
        }
      }
      else if (e.k === "t") drawTree(e.o);
      else if (e.k === "d") { ctx.font = "26px serif"; ctx.textAlign = "center"; ctx.fillText(e.o.e, e.o.x - cam.x, e.o.y - cam.y); ctx.textAlign = "left"; }
      else if (e.k === "o") drawChar(e.o.x, e.o.y, e.o.color, e.o.dir, e.o.step, e.o.moving, e.o.name);
      else drawChar(player.x, player.y, player.color, player.dir, player.step, player.moving, player.name);
    }

    if (theme.night) { ctx.fillStyle = "rgba(20,22,46,.34)"; ctx.fillRect(0, 0, VIEW_W, VIEW_H); }
    drawParticles();
  }

  // ---------- ループ ----------
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    let mvx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    let mvy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    if (mvx || mvy) {
      const len = Math.hypot(mvx, mvy) || 1; mvx /= len; mvy /= len;
      player.step += dt * 9;
      if (Math.abs(mvx) > Math.abs(mvy)) player.dir = mvx > 0 ? "right" : "left"; else player.dir = mvy > 0 ? "down" : "up";
    }
    const SP = 160;
    const nx = player.x + mvx * SP * dt; if (!blockedAt(nx, player.y)) player.x = nx;
    const ny = player.y + mvy * SP * dt; if (!blockedAt(player.x, ny)) player.y = ny;
    player.moving = !!(mvx || mvy);

    for (const o of others) {
      const dx = o.tx - o.x, dy = o.ty - o.y, d = Math.hypot(dx, dy);
      if (d < 8) { o.tx = 140 + Math.random() * (WORLD_W - 280); o.ty = 160 + Math.random() * (WORLD_H - 300); o.moving = false; }
      else {
        const ux = dx / d, uy = dy / d;
        const ox = o.x + ux * o.spd * dt; if (!blockedAt(ox, o.y)) o.x = ox; else o.tx = o.x;
        const oy = o.y + uy * o.spd * dt; if (!blockedAt(o.x, oy)) o.y = oy; else o.ty = o.y;
        o.step += dt * 8; o.moving = true;
        o.dir = Math.abs(ux) > Math.abs(uy) ? (ux > 0 ? "right" : "left") : (uy > 0 ? "down" : "up");
      }
    }

    updateNear();
    cam.x = Math.max(0, Math.min(WORLD_W - VIEW_W, player.x - VIEW_W / 2));
    cam.y = Math.max(0, Math.min(WORLD_H - VIEW_H, player.y - VIEW_H / 2));
    render(now);
    requestAnimationFrame(frame);
  }

  initParticles();
  requestAnimationFrame(frame);
})();
