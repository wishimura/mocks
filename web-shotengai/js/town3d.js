// Web商店街 - low-poly 3D 試作（Three.js r128・CDN）
// 本物の3D（視点回転OK）の手触り確認用。現モック(2.5D)とは別ページ。
(function () {
  if (!window.THREE) return;
  const wrap = document.getElementById("wrap3d");
  if (!wrap) return;
  const THREE = window.THREE;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.touchAction = "none";
  wrap.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#bfe2ef");
  scene.fog = new THREE.Fog("#bfe2ef", 70, 150);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 500);

  // ---- ライト ----
  scene.add(new THREE.HemisphereLight("#ffffff", "#9bbf8f", 0.85));
  const sun = new THREE.DirectionalLight("#fff4dc", 0.95);
  sun.position.set(-28, 46, 22);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  const sc = sun.shadow.camera; sc.left = -70; sc.right = 70; sc.top = 70; sc.bottom = -70; sc.near = 1; sc.far = 160;
  scene.add(sun);

  // ---- 地面・道 ----
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(320, 320), new THREE.MeshLambertMaterial({ color: "#86bb6b" }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  function pathStrip(x, z, w, d) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), new THREE.MeshLambertMaterial({ color: "#cdbd97" }));
    m.position.set(x, 0.06, z); m.receiveShadow = true; scene.add(m);
  }
  pathStrip(0, 0, 8, 90);
  pathStrip(0, -12, 60, 8);
  pathStrip(0, 12, 60, 8);

  // ---- 当たり判定（円） ----
  const blockers = [];

  // ---- 建物（low-poly） ----
  function house(x, z, wall, roof) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.2, 4.4), new THREE.MeshLambertMaterial({ color: wall }));
    body.position.y = 1.6; body.castShadow = true; body.receiveShadow = true; g.add(body);
    const rf = new THREE.Mesh(new THREE.ConeGeometry(3.7, 2.6, 4), new THREE.MeshLambertMaterial({ color: roof }));
    rf.position.y = 4.5; rf.rotation.y = Math.PI / 4; rf.castShadow = true; g.add(rf);
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.7, 0.12), new THREE.MeshLambertMaterial({ color: "#5a3b22" }));
    door.position.set(0, 0.85, 2.22); g.add(door);
    const winMat = new THREE.MeshLambertMaterial({ color: "#cfe7f5" });
    const w1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.1), winMat); w1.position.set(-1.2, 2.0, 2.22); g.add(w1);
    const w2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.1), winMat); w2.position.set(1.2, 2.0, 2.22); g.add(w2);
    g.position.set(x, 0, z); scene.add(g);
    blockers.push({ x: x, z: z, r: 3.4 });
    return g;
  }
  function tree(x, z) {
    const g = new THREE.Group();
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.6, 6), new THREE.MeshLambertMaterial({ color: "#7a5a36" }));
    t.position.y = 0.8; t.castShadow = true; g.add(t);
    const f = new THREE.Mesh(new THREE.ConeGeometry(1.7, 3.2, 7), new THREE.MeshLambertMaterial({ color: "#5fa05a" }));
    f.position.y = 3.0; f.castShadow = true; g.add(f);
    g.position.set(x, 0, z); scene.add(g);
    blockers.push({ x: x, z: z, r: 1.2 });
  }

  // ---- 店舗データ ----
  const shops = [
    { name: "こむぎベーカリー", cat: "食べもの・パン", emoji: "🍞", ec: "BASE", wall: "#f0ddc4", roof: "#c0563b", x: -18, z: -22, desc: "国産小麦の焼きたてパン。限定パンも並びます。" },
    { name: "茶舗やまぐち", cat: "飲みもの・日本茶", emoji: "🫖", ec: "BASE", wall: "#ece4d3", roof: "#384a40", x: 18, z: -22, desc: "産地直送の一番茶。飲み比べセットが人気。" },
    { name: "みどり園芸", cat: "雑貨・観葉植物", emoji: "🌿", ec: "Shopify", wall: "#efe9da", roof: "#8a9a5b", x: -28, z: 0, desc: "多肉・観葉の小さな園芸店。育て方相談OK。" },
    { name: "洋菓子マロン", cat: "食べもの・スイーツ", emoji: "🍰", ec: "BASE", wall: "#f3d8c0", roof: "#b5572f", x: 28, z: 0, desc: "季節のケーキと焼き菓子。ギフト全国発送。" },
    { name: "革工房ナナ", cat: "クラフト・レザー", emoji: "👜", ec: "Shopify", wall: "#e7ddf0", roof: "#7a5cd6", x: -18, z: 22, desc: "手づくりレザー小物。名入れも承ります。" },
    { name: "海鮮あおい", cat: "食べもの・海産物", emoji: "🐟", ec: "Shopify", wall: "#d8e6f0", roof: "#3a7afe", x: 18, z: 22, desc: "港直送の干物と海鮮。予約販売あり。" },
  ];
  shops.forEach((s) => house(s.x, s.z, s.wall, s.roof));
  [[-30, -28], [30, -28], [-34, 12], [34, 14], [-12, 34], [14, 34], [0, -38]].forEach((p) => tree(p[0], p[1]));

  // ---- プレイヤー ----
  const player = new THREE.Group();
  const pBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 1.2, 10), new THREE.MeshLambertMaterial({ color: "#e8623d" }));
  pBody.position.y = 0.9; pBody.castShadow = true; player.add(pBody);
  const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12), new THREE.MeshLambertMaterial({ color: "#f4d0ad" }));
  pHead.position.y = 1.9; pHead.castShadow = true; player.add(pHead);
  player.position.set(0, 0, 30); scene.add(player);

  // ---- カメラ追従＋ドラッグで視点回転 ----
  let camYaw = 0.5, camDist = 16, camHeight = 11;
  function updateCamera() {
    camera.position.set(player.position.x + Math.sin(camYaw) * camDist, camHeight, player.position.z + Math.cos(camYaw) * camDist);
    camera.lookAt(player.position.x, 1.4, player.position.z);
  }
  let dragging = false, lastX = 0;
  renderer.domElement.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; });
  window.addEventListener("pointermove", (e) => { if (dragging) { camYaw -= (e.clientX - lastX) * 0.006; lastX = e.clientX; } });
  window.addEventListener("pointerup", () => { dragging = false; });

  // ---- 入力（矢印/WASD ＋ 十字キー） ----
  const keys = {};
  function mapKey(k, on) {
    if (k === "ArrowUp" || k === "w" || k === "W") keys.up = on;
    else if (k === "ArrowDown" || k === "s" || k === "S") keys.down = on;
    else if (k === "ArrowLeft" || k === "a" || k === "A") keys.left = on;
    else if (k === "ArrowRight" || k === "d" || k === "D") keys.right = on;
  }
  window.addEventListener("keydown", (e) => { if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault(); mapKey(e.key, true); });
  window.addEventListener("keyup", (e) => mapKey(e.key, false));
  document.querySelectorAll("[data-dir]").forEach((btn) => {
    const d = btn.getAttribute("data-dir");
    const set = (on) => (e) => { e.preventDefault(); keys[d] = on; };
    btn.addEventListener("pointerdown", set(true));
    btn.addEventListener("pointerup", set(false));
    btn.addEventListener("pointerleave", set(false));
    btn.addEventListener("pointercancel", set(false));
  });

  function blocked(x, z) {
    for (const b of blockers) { const dx = x - b.x, dz = z - b.z; if (dx * dx + dz * dz < (b.r + 0.6) * (b.r + 0.6)) return true; }
    if (Math.abs(x) > 58 || Math.abs(z) > 58) return true;
    return false;
  }

  // ---- 近接ポップアップ ----
  let near = null;
  const panel = document.getElementById("walkInfo");
  const wic = document.getElementById("walkInfoClose");
  if (wic) wic.addEventListener("click", () => panel && panel.classList.remove("open"));
  function updateNear() {
    let best = null, bd = 7 * 7;
    for (const s of shops) { const dx = player.position.x - s.x, dz = player.position.z - (s.z + 3); const dd = dx * dx + dz * dz; if (dd < bd) { bd = dd; best = s; } }
    if (best !== near) {
      near = best;
      if (!panel) return;
      if (!near) { panel.classList.remove("open"); return; }
      panel.querySelector("[data-w=em]").textContent = near.emoji;
      panel.querySelector("[data-w=shop]").textContent = near.name;
      panel.querySelector("[data-w=cat]").textContent = near.cat;
      panel.querySelector("[data-w=desc]").textContent = near.desc;
      panel.querySelector("[data-w=ec]").textContent = near.ec + "で買う";
      panel.classList.add("open");
    }
  }

  // ---- 全画面 ----
  const fsBtn = document.getElementById("fsBtn");
  if (fsBtn) fsBtn.addEventListener("click", () => {
    const on = wrap.classList.toggle("fs");
    document.body.style.overflow = on ? "hidden" : "";
    fsBtn.textContent = on ? "✕ 解除" : "⤢ 全画面で遊ぶ";
    setTimeout(resize, 60);
  });

  // ---- リサイズ ----
  function resize() {
    const w = Math.max(320, wrap.clientWidth), h = Math.max(220, wrap.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", () => setTimeout(resize, 200));

  // ---- ループ ----
  const SP = 13;
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const fwdX = -Math.sin(camYaw), fwdZ = -Math.cos(camYaw);
    const rgtX = Math.cos(camYaw), rgtZ = -Math.sin(camYaw);
    let f = (keys.up ? 1 : 0) - (keys.down ? 1 : 0);
    let r = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    let mx = fwdX * f + rgtX * r, mz = fwdZ * f + rgtZ * r;
    const len = Math.hypot(mx, mz);
    if (len > 0.001) {
      mx /= len; mz /= len;
      const nx = player.position.x + mx * SP * dt, nz = player.position.z + mz * SP * dt;
      if (!blocked(nx, player.position.z)) player.position.x = nx;
      if (!blocked(player.position.x, nz)) player.position.z = nz;
      player.rotation.y = Math.atan2(mx, mz);
      player.position.y = Math.abs(Math.sin(now / 90)) * 0.18; // 歩きバウンド
    } else { player.position.y = 0; }

    updateNear();
    updateCamera();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  resize();
  requestAnimationFrame(frame);
})();
