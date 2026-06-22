// Web商店街 - 共通の建物描画（冒険風・半木骨造／canvas）
// 街(walk.js)と店主ビルダー(builder.js)で同じ建物を描く。色はお店ごとにカスタマイズ可能。
window.ShopBuilding = (function () {
  function hx(h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map((x) => x + x).join(""); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function shade(h, a) { const c = hx(h); const f = (v) => Math.max(0, Math.min(255, v + a)); return "rgb(" + f(c[0]) + "," + f(c[1]) + "," + f(c[2]) + ")"; }
  function tri(ctx, a, b, c, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.closePath(); ctx.fill(); }
  function quad(ctx, a, b, c, d, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.fill(); }
  function circle(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
  function rrect(ctx, x, y, w, h, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill(); }
  function win(ctx, x, y, w, h, glass, frame, night) {
    ctx.fillStyle = frame; ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
    ctx.fillStyle = glass; ctx.fillRect(x, y, w, h);
    if (night) { ctx.fillStyle = "rgba(255,210,120,.45)"; ctx.fillRect(x, y, w, h); }
    ctx.strokeStyle = frame; ctx.lineWidth = Math.max(1.4, w * 0.06);
    ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.stroke();
  }

  // cx: 正面中央のスクリーンX / baseY: 接地ライン / fw: 正面幅
  function draw(ctx, cx, baseY, fw, c, t) {
    const wall = c.wall || "#efe7d6", roof = c.roof || "#b5572f", door = c.door || "#6a4a2a", beam = c.timber || "#574431";
    const night = !!c.night, glass = night ? "#ffd98a" : (c.win || "#c2d8e6");
    const FW = fw, WH = fw * 1.3, RH = fw * 0.62, DP = fw * 0.32, EA = fw * 0.09;
    const left = cx - FW / 2, right = cx + FW / 2, topWall = baseY - WH;
    const roofD = shade(roof, -30), wallD = shade(wall, -16);
    const bt = Math.max(3, fw * 0.05);

    // 影
    ctx.fillStyle = "rgba(0,0,0,.16)"; ctx.beginPath(); ctx.ellipse(cx, baseY + 4, FW * 0.62, 7, 0, 0, 7); ctx.fill();
    // 右側面（奥行き）
    quad(ctx, [right, baseY], [right + DP, baseY - DP * 0.7], [right + DP, topWall - DP * 0.7], [right, topWall], wallD);
    // 正面壁（淡い漆喰）
    ctx.fillStyle = wall; ctx.fillRect(left, topWall, FW, WH);

    // 半木骨の梁
    ctx.fillStyle = beam;
    ctx.fillRect(left, topWall, FW, bt); ctx.fillRect(left, baseY - bt, FW, bt);
    ctx.fillRect(left, topWall, bt, WH); ctx.fillRect(right - bt, topWall, bt, WH);
    const midY = topWall + WH * 0.46; ctx.fillRect(left, midY, FW, bt);
    ctx.fillRect(left + FW / 3 - bt / 2, topWall, bt, WH); ctx.fillRect(left + 2 * FW / 3 - bt / 2, topWall, bt, WH);
    ctx.strokeStyle = beam; ctx.lineWidth = bt * 0.8;
    ctx.beginPath(); ctx.moveTo(left + bt, midY); ctx.lineTo(left + FW / 3, topWall + bt);
    ctx.moveTo(right - bt, midY); ctx.lineTo(right - FW / 3, topWall + bt); ctx.stroke();

    // 上階の窓（十字格子）
    const uwW = FW * 0.2, uwH = WH * 0.22, uwY = topWall + WH * 0.13;
    win(ctx, left + FW * 0.11, uwY, uwW, uwH, glass, beam, night);
    win(ctx, right - FW * 0.11 - uwW, uwY, uwW, uwH, glass, beam, night);

    // 看板（お店の色）
    const sgY = midY + bt + 2, sgH = fw * 0.17;
    rrect(ctx, left + FW * 0.06, sgY, FW * 0.88, sgH, 3, roof);
    ctx.fillStyle = "#fff"; ctx.font = "bold " + Math.round(fw * 0.12) + "px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText((c.emoji ? c.emoji + " " : "") + (c.short || ""), cx, sgY + sgH / 2);
    ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";

    // 1階：ショップ窓＋扉
    const gY = sgY + sgH + 4, gH = (baseY - bt) - gY;
    win(ctx, left + FW * 0.1, gY + gH * 0.1, FW * 0.28, gH * 0.78, glass, beam, night);
    const doorW = FW * 0.22, doorH = gH * 0.96, doorX = cx + FW * 0.06, doorY = baseY - bt - doorH;
    ctx.fillStyle = beam; ctx.fillRect(doorX - 2, doorY - 2, doorW + 4, doorH + 4);
    ctx.fillStyle = door; ctx.fillRect(doorX, doorY, doorW, doorH);
    circle(ctx, doorX + doorW - 4, doorY + doorH * 0.5, 1.7, "#f0d77a");

    // 屋根（お店の色）：右斜面→正面の切妻
    quad(ctx, [right + EA, topWall + 2], [cx, topWall - RH], [cx + DP, topWall - RH - DP * 0.7], [right + EA + DP, topWall + 2 - DP * 0.7], roofD);
    tri(ctx, [left - EA, topWall + 2], [right + EA, topWall + 2], [cx, topWall - RH], roof);
    ctx.strokeStyle = "rgba(0,0,0,.12)"; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) { const yy = topWall + 2 - (RH * i / 4); const hw = (EA * 2 + FW) * (1 - i / 4) / 2; ctx.beginPath(); ctx.moveTo(cx - hw, yy); ctx.lineTo(cx + hw, yy); ctx.stroke(); }
    ctx.strokeStyle = roofD; ctx.lineWidth = Math.max(2, fw * 0.03); ctx.beginPath(); ctx.moveTo(left - EA, topWall + 2); ctx.lineTo(right + EA, topWall + 2); ctx.stroke();
    circle(ctx, cx, topWall - RH * 0.5, fw * 0.05, night ? "#ffd98a" : "#d8c49a");

    // 煙突＋煙
    ctx.fillStyle = shade(wall, -34); ctx.fillRect(cx + DP * 0.5, topWall - RH - DP * 0.1, fw * 0.1, fw * 0.2);
    if (t) { const tt = t / 700; for (let i = 0; i < 3; i++) { const yy = topWall - RH - DP * 0.1 - i * 7 - ((tt * 12) % 14); circle(ctx, cx + DP * 0.55 + Math.sin(tt + i) * 3, yy, 2.4 + i * 0.8, "rgba(228,228,228,.4)"); } }
  }
  return { draw: draw, shade: shade };
})();
