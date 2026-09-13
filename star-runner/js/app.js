/* =====================================================================
   STAR RUNNER / スターランナー
   洞窟レース風ブラウザゲーム（Canvas・完全クライアント動作）
   - 壁 / 岩にぶつかったらアウト
   - スターを取ると残り時間 +1.0 秒
   - 残り時間は 30.0 秒スタート
   - スコアは進んだ距離に比例（10px = 1点 = 1m）
   サーバー通信なし。ベストスコアのみ localStorage に保存。
   ===================================================================== */
(function () {
  'use strict';

  /* ================= アイコン（自前SVG・Lucide風） ================= */
  const ICONS = {
    play:     '<svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8V4z"/></svg>',
    pause:    '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    retry:    '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/></svg>',
    star:     '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/></svg>',
    left:     '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    right:    '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    boost:    '<svg viewBox="0 0 24 24"><path d="M12 2c4 3.2 6 7 6 11a6 6 0 0 1-12 0c0-4 2-7.8 6-11z"/><path d="M9 20c1 1.6 1.8 2.4 3 2.4S14 21.6 15 20"/><circle cx="12" cy="11" r="2.2"/></svg>',
    soundOn:  '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 8.5a5 5 0 0 1 0 7"/><path d="M20 6a9 9 0 0 1 0 12"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9.5l5 5M22 9.5l-5 5"/></svg>',
    home:     '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
    trophy:   '<svg viewBox="0 0 24 24"><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v1a4 4 0 0 0 3.5 4M17 6h3v1a4 4 0 0 1-3.5 4"/><path d="M9 21h6M12 14v7"/></svg>',
    flag:     '<svg viewBox="0 0 24 24"><path d="M5 21V4M5 5h13l-2.5 4L18 13H5"/></svg>',
    clock:    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>'
  };
  function mountIcons(root) {
    (root || document).querySelectorAll('.icon[data-icon]').forEach(function (el) {
      const svg = ICONS[el.dataset.icon];
      if (svg) el.innerHTML = svg;
    });
  }

  /* ================= 5x7 ドットフォント（HUD用・自前） ================= */
  const GLYPH = {
    '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
    '1': ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    '2': ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
    '3': ['#####', '...#.', '..##.', '....#', '....#', '#...#', '.###.'],
    '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
    '5': ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
    '6': ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
    '7': ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
    '8': ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
    '9': ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
    'A': ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    'B': ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
    'C': ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
    'D': ['###..', '#..#.', '#...#', '#...#', '#...#', '#..#.', '###..'],
    'E': ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
    'F': ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
    'G': ['.###.', '#...#', '#....', '#.###', '#...#', '#...#', '.###.'],
    'H': ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
    'I': ['.###.', '..#..', '..#..', '..#..', '..#..', '..#..', '.###.'],
    'J': ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
    'K': ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
    'L': ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
    'M': ['#...#', '##.##', '#.#.#', '#...#', '#...#', '#...#', '#...#'],
    'N': ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
    'O': ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    'P': ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
    'Q': ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
    'R': ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
    'S': ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
    'T': ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
    'U': ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
    'V': ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
    'W': ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
    'X': ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
    'Y': ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
    'Z': ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
    '.': ['.....', '.....', '.....', '.....', '.....', '.##..', '.##..'],
    ':': ['.....', '.##..', '.##..', '.....', '.##..', '.##..', '.....'],
    '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
    '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
    '!': ['..#..', '..#..', '..#..', '..#..', '..#..', '.....', '..#..'],
    '?': ['.###.', '#...#', '....#', '..##.', '..#..', '.....', '..#..'],
    '/': ['....#', '...#.', '...#.', '..#..', '.#...', '.#...', '#....'],
    'x': ['.....', '.....', '#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
    ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....']
  };
  const GW = 5, GH = 7;
  function textWidth(s, sc) { return s.length * (GW + 1) * sc - sc; }
  function drawText(g, s, x, y, col, sc) {
    sc = sc || 1;
    g.fillStyle = col;
    for (let i = 0; i < s.length; i++) {
      const rows = GLYPH[s[i]] || GLYPH[s[i].toUpperCase()] || GLYPH[' '];
      const ox = x + i * (GW + 1) * sc;
      for (let r = 0; r < GH; r++) {
        const line = rows[r];
        let run = -1;
        for (let c = 0; c <= GW; c++) {
          const on = c < GW && line[c] === '#';
          if (on && run < 0) run = c;
          if (!on && run >= 0) { g.fillRect(ox + run * sc, y + r * sc, (c - run) * sc, sc); run = -1; }
        }
      }
    }
  }
  function drawTextOut(g, s, x, y, col, sc, outline) {
    const o = outline || '#12140a';
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++)
        if (dx || dy) drawText(g, s, x + dx * sc, y + dy * sc, o, sc);
    drawText(g, s, x, y, col, sc);
  }
  /* にじみ付き（ブラウン管っぽい色ズレ）＋黒フチ */
  function drawTextRGB(g, s, x, y, col, sc) {
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++)
        if (dx || dy) drawText(g, s, x + dx * sc, y + dy * sc, '#12140a', sc);
    g.globalAlpha = 0.65;
    drawText(g, s, x - sc, y, '#ff2f4f', sc);
    drawText(g, s, x + sc, y, '#28e0ff', sc);
    g.globalAlpha = 1;
    drawText(g, s, x, y, col, sc);
  }

  /* ================= 定数 ================= */
  const W = 200, H = 280;      // 論理解像度（ドット）
  const BLK = 4;               // コースを4pxブロック単位で生成（カクカクした階段状のフチ）
  const SHIP_Y = 188;          // 自機の画面上のY（下寄せ＝前方が見える）
  const NB = 256;              // ブロックのリングバッファ
  const START_DIST = 100;      // 開始時の世界座標
  const START_TIME = 30;       // 残り時間の初期値（秒）
  const STAR_BONUS = 1.0;      // スター1個あたりの追加秒数
  const HR = 3.6;              // 自機の当たり判定半径
  const VMAX = 110;            // 左右移動の最高速度（px/秒）

  const C = {
    wall:    '#413c36',
    wallDk:  '#332f2a',
    wallLt:  '#4e4841',
    course:  '#c6d40b',
    courseDk:'#a3af06',
    courseLn:'#b4c208',
    rim:     '#f0fb72',
    dither:  '#aab705',
    dither2: '#717c04',
    ship:    '#4ad4ff',
    shipLt:  '#eafcff',
    shipDk:  '#1c6f96',
    ink:     '#0e1310',
    star:    '#fff05c',
    starLt:  '#ffffff',
    rock:    '#2b2823',
    rockLt:  '#6b6459',
    hud:     '#f4fff6'
  };

  /* ================= キャンバス ================= */
  const cv = document.getElementById('game');
  const ctx = cv.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  function makePattern(base, a, b, c) {
    const p = document.createElement('canvas');
    p.width = 4; p.height = 4;
    const g = p.getContext('2d');
    g.fillStyle = base; g.fillRect(0, 0, 4, 4);
    if (c) { g.fillStyle = c; g.fillRect(0, 1, 4, 1); }
    g.fillStyle = a; g.fillRect(0, 0, 1, 1); g.fillRect(2, 2, 1, 1);
    if (b) { g.fillStyle = b; g.fillRect(2, 0, 1, 1); g.fillRect(0, 2, 1, 1); }
    return ctx.createPattern(p, 'repeat');
  }
  const patCourse = makePattern(C.course, C.courseDk, null, C.courseLn);
  const patWall = makePattern(C.wall, C.wallDk, C.wallLt, null);

  function pixelDisc(g, cx, cy, r, col) {
    g.fillStyle = col;
    const r2 = r * r;
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
      const dy = y + 0.5 - cy;
      const w2 = r2 - dy * dy;
      if (w2 <= 0) continue;
      const w = Math.sqrt(w2);
      const x0 = Math.round(cx - w), x1 = Math.round(cx + w);
      if (x1 > x0) g.fillRect(x0, y, x1 - x0, 1);
    }
  }
  function pixelRing(g, cx, cy, r, col) {
    g.fillStyle = col;
    for (let a = 0; a < 44; a++) {
      const t = a / 44 * Math.PI * 2;
      g.fillRect(Math.round(cx + Math.cos(t) * r), Math.round(cy + Math.sin(t) * r), 1, 1);
    }
  }
  const clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ================= スプライト ================= */
  const SHIP = [
    '.....O.....',
    '....OLO....',
    '....OLO....',
    '...OBLBO...',
    '...OBLBO...',
    '..OBBLBBO..',
    '..OBBLBBO..',
    '.OBBBLBBBO.',
    '.OBBBBBBBO.',
    'OBBOOOOOBBO',
    'OOO.....OOO'
  ];
  const SHIP_COL = { O: C.ink, B: C.ship, L: C.shipLt, D: C.shipDk };
  const STAR_SPR = [
    '....#....',
    '....#....',
    '...###...',
    '#########',
    '.#######.',
    '..#####..',
    '..##.##..',
    '.##...##.',
    '##.....##'
  ];
  const STAR_MINI = [
    '..#..',
    '.###.',
    '#####',
    '.###.',
    '##.##'
  ];
  /* フチ付きで描く（黄色いコースの上でも形が読めるように） */
  function drawSpriteOut(g, spr, fill, outline, x, y) {
    drawSprite(g, spr, { '#': outline }, x - 1, y, 0);
    drawSprite(g, spr, { '#': outline }, x + 1, y, 0);
    drawSprite(g, spr, { '#': outline }, x, y - 1, 0);
    drawSprite(g, spr, { '#': outline }, x, y + 1, 0);
    drawSprite(g, spr, { '#': fill }, x, y, 0);
  }
  function drawSprite(g, spr, cols, x, y, tilt) {
    const h = spr.length, w = spr[0].length;
    for (let r = 0; r < h; r++) {
      const shift = tilt ? Math.round(tilt * (h - r) / h) : 0;
      for (let c = 0; c < w; c++) {
        const ch = spr[r][c];
        if (ch === '.') continue;
        g.fillStyle = cols[ch] || '#fff';
        g.fillRect(x + c - (w >> 1) + shift, y + r - (h >> 1), 1, 1);
      }
    }
  }

  /* ================= サウンド（WebAudio・簡易ビープ） ================= */
  const Sfx = {
    ac: null, muted: false,
    ready() {
      if (this.ac) { if (this.ac.state === 'suspended') this.ac.resume(); return; }
      try { this.ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ac = null; }
    },
    tone(freq, dur, type, vol, to) {
      if (this.muted) return;
      this.ready(); if (!this.ac) return;
      const t = this.ac.currentTime;
      const o = this.ac.createOscillator(), g = this.ac.createGain();
      o.type = type || 'square';
      o.frequency.setValueAtTime(freq, t);
      if (to) o.frequency.exponentialRampToValueAtTime(Math.max(40, to), t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol || 0.1, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.ac.destination);
      o.start(t); o.stop(t + dur + 0.03);
    },
    noise(dur, vol) {
      if (this.muted) return;
      this.ready(); if (!this.ac) return;
      const t = this.ac.currentTime;
      const len = Math.floor(this.ac.sampleRate * dur);
      const buf = this.ac.createBuffer(1, len, this.ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const s = this.ac.createBufferSource(); s.buffer = buf;
      const f = this.ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400;
      const g = this.ac.createGain(); g.gain.value = vol || 0.18;
      s.connect(f); f.connect(g); g.connect(this.ac.destination);
      s.start(t);
    },
    star() { this.tone(1046, 0.06, 'square', 0.09); setTimeout(() => this.tone(1568, 0.10, 'square', 0.08), 55); },
    crash() { this.tone(320, 0.45, 'sawtooth', 0.14, 60); this.noise(0.5, 0.2); },
    tick() { this.tone(660, 0.05, 'square', 0.06); },
    go() { this.tone(880, 0.14, 'square', 0.1); },
    ready2() { this.tone(523, 0.10, 'square', 0.08); },
    over() { this.tone(523, 0.12, 'square', 0.09); setTimeout(() => this.tone(392, 0.12, 'square', 0.09), 130); setTimeout(() => this.tone(262, 0.3, 'square', 0.09), 260); }
  };

  /* ================= ゲーム状態 ================= */
  let state = 'title';        // title | play | pause | dying | result
  let dist, sx, svx, time, starCount, best = 0;
  let shake = 0, flash = 0, timeFlash = 0, countdown = 0, dieT = 0, endReason = '';
  let lastTick = -1;

  const blocks = new Array(NB);
  let gb = 0, gcx = 0, ghw = 0, gthw = 0, gslope = 0, gNextTurn = 0, gNextW = 0, nextStar = 0, nextRock = 0;
  const stars = [], rocks = [], parts = [], texts = [];

  const travelled = () => dist - START_DIST;
  const scoreNow = () => Math.floor(travelled() / 10);

  function genBlock() {
    const b = gb, d = b * BLK;
    const t = clamp((d - START_DIST - 400) / 5200, 0, 1);   // 難易度 0→1
    if (d >= gNextW) {
      gthw = (42 - 15 * t) + rnd(0, 13 - 5 * t);
      gNextW = d + rnd(90, 240);
    }
    ghw += clamp(gthw - ghw, -0.45, 0.45);
    if (d >= gNextTurn) {
      const ms = 0.30 + 0.36 * t;
      gslope = (Math.random() < 0.5 ? -1 : 1) * rnd(0.35, 1) * ms;
      if (Math.random() < 0.15) gslope = 0;
      gNextTurn = d + rnd(55, 175);
    }
    gcx += gslope * BLK;
    const M = 5;
    if (gcx - ghw < M) { gcx = M + ghw; gslope = Math.abs(gslope); }
    if (gcx + ghw > W - M) { gcx = W - M - ghw; gslope = -Math.abs(gslope); }
    const l = Math.round((gcx - ghw) / 2) * 2;
    const r = Math.round((gcx + ghw) / 2) * 2;
    blocks[b % NB] = { l: l, r: r };

    if (d >= nextStar) {
      const room = (r - l) / 2 - 9;
      if (room > 1) {
        stars.push({ d: d + 2, x: (l + r) / 2 + rnd(-room, room), got: false, ph: Math.random() * 6.28 });
        nextStar = d + rnd(130, 290);
      } else nextStar = d + 16;
    }
    if (d >= nextRock) {
      const rr = rnd(5, 7.5), gap = rnd(26, 38);
      if (r - l > gap + rr * 2 + 12) {
        const x = Math.random() < 0.5 ? l + gap + rr : r - gap - rr;
        rocks.push({ d: d + 2, x: x, r: rr });
      }
      nextRock = d + rnd(240, 520) - 140 * t;
    }
    gb++;
  }
  function blockAt(d) {
    const b = Math.floor(d / BLK);
    if (b < 0 || b >= gb || b <= gb - NB) return null;
    return blocks[b % NB];
  }
  function ensureBlocks() {
    const need = Math.ceil((dist + SHIP_Y) / BLK) + 2;
    while (gb < need) genBlock();
  }

  function resetWorld() {
    dist = START_DIST; sx = W / 2; svx = 0;
    gb = 0; gcx = W / 2; ghw = 50; gthw = 46; gslope = 0;
    gNextTurn = START_DIST + 150; gNextW = START_DIST + 200;
    nextStar = START_DIST + 190; nextRock = START_DIST + 1500;
    stars.length = 0; rocks.length = 0; parts.length = 0; texts.length = 0;
    ensureBlocks();
  }
  function startGame() {
    resetWorld();
    time = START_TIME; starCount = 0;
    shake = 0; flash = 0; timeFlash = 0; dieT = 0; endReason = '';
    countdown = 1.5; lastTick = -1;
    state = 'play';
    showOverlay(null);
    Sfx.ready(); Sfx.ready2();
  }

  /* ================= 更新 ================= */
  function boom(x, d, n, col) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = rnd(20, 110);
      parts.push({ x: x, d: d, vx: Math.cos(a) * s, vd: Math.sin(a) * s, life: rnd(0.3, 0.9), max: 0.9, col: col, r: rnd(1, 2.4) });
    }
  }

  function update(dt) {
    /* --- タイトルはデモスクロール --- */
    if (state === 'title') {
      dist += 62 * dt;
      ensureBlocks();
      if (travelled() > 3600) resetWorld();
      cull();
      return;
    }
    if (state === 'result' || state === 'pause') { decay(dt); return; }

    if (state === 'dying') {
      dieT -= dt;
      shake = Math.max(0, shake - dt * 26);
      flash = Math.max(0, flash - dt * 3.5);
      stepParts(dt);
      if (dieT <= 0) finish();
      return;
    }

    /* --- 走行 --- */
    const t = clamp(travelled() / 4200, 0, 1);
    let mul = 1;
    if (countdown > 0) {
      countdown -= dt;
      mul = clamp(1 - countdown / 1.5, 0.35, 1);
      if (countdown <= 0) Sfx.go();
    }
    const boosting = input.boost && countdown <= 0;
    const spd = (80 + 46 * t) * (boosting ? 1.55 : 1) * mul;
    dist += spd * dt;
    ensureBlocks();

    /* 左右移動 */
    const target = steerDir() * VMAX;
    svx += (target - svx) * (1 - Math.exp(-9 * dt));
    sx += svx * dt;
    if (sx < 2) { sx = 2; svx = 0; }
    if (sx > W - 2) { sx = W - 2; svx = 0; }

    /* 残り時間 */
    if (countdown <= 0) {
      time -= dt;
      const ip = Math.ceil(time);
      if (time <= 5.05 && ip !== lastTick && time > 0) { lastTick = ip; Sfx.tick(); }
      if (time <= 0) { time = 0; die('TIME UP'); return; }
    }
    timeFlash = Math.max(0, timeFlash - dt * 3);

    /* 壁との判定 */
    for (let dd = -4; dd <= 6; dd += 2) {
      const blk = blockAt(dist + dd);
      if (!blk) continue;
      if (sx - HR < blk.l || sx + HR > blk.r) { die('OUT'); return; }
    }
    /* 岩との判定 */
    for (let i = 0; i < rocks.length; i++) {
      const rk = rocks[i], dy = rk.d - dist, dx = rk.x - sx;
      if (dy < -14 || dy > 14) continue;
      const rr = rk.r + HR - 0.8;
      if (dx * dx + dy * dy < rr * rr) { die('OUT'); return; }
    }
    /* スター取得 */
    for (let i = 0; i < stars.length; i++) {
      const st = stars[i];
      if (st.got) continue;
      const dy = st.d - dist, dx = st.x - sx;
      if (dx * dx + dy * dy < 81) {
        st.got = true; starCount++;
        time = Math.min(99.9, time + STAR_BONUS);
        timeFlash = 1;
        texts.push({ x: st.x, d: st.d, s: '+1.0', life: 0.9 });
        boom(st.x, st.d, 8, C.star);
        Sfx.star();
      }
    }
    /* エンジンの粒 */
    if (Math.random() < (boosting ? 0.9 : 0.4)) {
      parts.push({ x: sx + rnd(-2, 2), d: dist - 7, vx: rnd(-14, 14), vd: rnd(-70, -30),
        life: 0.28, max: 0.28, col: boosting ? '#ffd34d' : '#7fe4ff', r: boosting ? 1.8 : 1.2 });
    }
    stepParts(dt);
    decay(dt);
    cull();
  }
  function decay(dt) {
    shake = Math.max(0, shake - dt * 26);
    flash = Math.max(0, flash - dt * 3.5);
  }
  function stepParts(dt) {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx * dt; p.d += p.vd * dt; p.life -= dt;
      p.vx *= 0.94; p.vd *= 0.94;
      if (p.life <= 0) parts.splice(i, 1);
    }
    for (let i = texts.length - 1; i >= 0; i--) {
      texts[i].life -= dt; texts[i].d += 24 * dt;
      if (texts[i].life <= 0) texts.splice(i, 1);
    }
  }
  function cull() {
    const back = dist + SHIP_Y - H - 30;
    while (stars.length && stars[0].d < back) stars.shift();
    while (rocks.length && rocks[0].d < back) rocks.shift();
  }
  function die(reason) {
    endReason = reason;
    state = 'dying'; dieT = 0.95; shake = 6; flash = 1;
    boom(sx, dist, 26, '#ffb03a');
    boom(sx, dist, 14, C.ship);
    Sfx.crash();
  }
  function finish() {
    state = 'result';
    const sc = scoreNow();
    if (sc > best) { best = sc; saveBest(sc); document.getElementById('rNew').hidden = false; }
    else document.getElementById('rNew').hidden = true;
    document.getElementById('rTitle').textContent = endReason === 'OUT' ? 'クラッシュ！' : 'タイムアップ！';
    document.getElementById('rScore').textContent = String(sc);
    document.getElementById('rDist').textContent = sc + ' m';
    document.getElementById('rStar').textContent = '× ' + starCount;
    document.getElementById('rBest').textContent = String(best);
    showOverlay('ovResult');
    Sfx.over();
  }

  /* ================= 描画 ================= */
  function render() {
    const g = ctx;
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (shake > 0.2) g.translate(Math.round(rnd(-shake, shake)), Math.round(rnd(-shake, shake)));

    const camY = Math.round(SHIP_Y + dist);
    const off = ((camY % 4) + 4) % 4;

    /* 壁 */
    g.save(); g.translate(0, off);
    g.fillStyle = patWall; g.fillRect(-12, -12, W + 24, H + 24);
    g.restore();

    /* コース */
    const b0 = Math.max(0, Math.max(Math.floor((camY - H) / BLK), gb - NB + 2));
    const b1 = Math.min(gb - 1, Math.ceil(camY / BLK) - 1);
    g.save();
    g.beginPath();
    for (let b = b0; b <= b1; b++) {
      const blk = blocks[b % NB]; if (!blk) continue;
      g.rect(blk.l, camY - (b + 1) * BLK, blk.r - blk.l, BLK);
    }
    g.clip();
    g.translate(0, off);
    g.fillStyle = patCourse; g.fillRect(-12, -12, W + 24, H + 24);
    g.restore();

    /* フチ（明るいリム＋壁側ディザ） */
    for (let b = b0; b <= b1; b++) {
      const blk = blocks[b % NB]; if (!blk) continue;
      const y = camY - (b + 1) * BLK;
      g.fillStyle = C.rim;
      g.fillRect(blk.l, y, 2, BLK);
      g.fillRect(blk.r - 2, y, 2, BLK);
      for (let i = 0; i < 2; i++) {
        const yy = y + i * 2, par = (b * 2 + i) & 1;
        g.fillStyle = C.dither;
        g.fillRect(blk.l - 4 + (par ? 0 : 2), yy, 2, 2);
        g.fillRect(blk.r + (par ? 2 : 0), yy, 2, 2);
        g.fillStyle = C.dither2;
        if (par) { g.fillRect(blk.l - 8, yy, 2, 2); g.fillRect(blk.r + 6, yy, 2, 2); }
        else { g.fillRect(blk.l - 6, yy, 2, 2); g.fillRect(blk.r + 4, yy, 2, 2); }
      }
    }

    /* 岩 */
    for (let i = 0; i < rocks.length; i++) {
      const rk = rocks[i], y = camY - rk.d;
      if (y < -14 || y > H + 14) continue;
      pixelDisc(g, rk.x, y, rk.r + 1, C.ink);
      pixelDisc(g, rk.x, y, rk.r, C.rock);
      pixelDisc(g, rk.x - rk.r * 0.3, y - rk.r * 0.35, rk.r * 0.42, C.rockLt);
    }

    /* スター */
    const now = performance.now() / 1000;
    for (let i = 0; i < stars.length; i++) {
      const st = stars[i];
      if (st.got) continue;
      const y = camY - st.d;
      if (y < -12 || y > H + 12) continue;
      const px = Math.round(st.x);
      const pulse = 7.5 + Math.sin(now * 5 + st.ph) * 1.3;
      pixelRing(g, px, y, pulse, C.rim);
      drawSpriteOut(g, STAR_SPR, C.star, C.ink, px, y);
      g.fillStyle = C.starLt;
      g.fillRect(px - 1, y - 2, 2, 3);
    }

    /* 粒子 */
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i], y = camY - p.d;
      if (y < -8 || y > H + 8) continue;
      g.globalAlpha = clamp(p.life / p.max, 0, 1);
      pixelDisc(g, p.x, y, p.r, p.col);
    }
    g.globalAlpha = 1;

    /* 自機 */
    if (state === 'play' || state === 'pause') {
      const tilt = clamp(svx / VMAX, -1, 1) * 2;
      if (input.boost && countdown <= 0) {
        const fl = 3 + Math.floor(Math.random() * 3);
        g.fillStyle = '#ffcf3d'; g.fillRect(Math.round(sx) - 2, SHIP_Y + 5, 4, fl);
        g.fillStyle = '#fff3b0'; g.fillRect(Math.round(sx) - 1, SHIP_Y + 5, 2, fl - 1);
      }
      drawSprite(g, SHIP, SHIP_COL, Math.round(sx), SHIP_Y, tilt);
    }

    /* 浮き上がる文字 */
    for (let i = 0; i < texts.length; i++) {
      const tx = texts[i], y = camY - tx.d;
      g.globalAlpha = clamp(tx.life / 0.9, 0, 1);
      drawTextOut(g, tx.s, Math.round(tx.x) - Math.round(textWidth(tx.s, 1) / 2), y - 14, '#ffffff', 1);
      g.globalAlpha = 1;
    }

    /* HUD */
    if (state !== 'title') {
      const tcol = time <= 5 ? (Math.floor(now * 6) % 2 ? '#ff5a5a' : '#ffd0d0')
        : (timeFlash > 0 ? '#b6ff6a' : C.hud);
      drawTextRGB(g, 'TIME ' + time.toFixed(1), 6, 7, tcol, 1);
      const s = 'SCORE ' + String(scoreNow()).padStart(5, '0');
      drawTextRGB(g, s, W - 6 - textWidth(s, 1), 7, C.hud, 1);
      const sc = 'x' + String(starCount).padStart(2, '0');
      drawSpriteOut(g, STAR_MINI, C.star, C.ink, 10, 22);
      drawTextOut(g, sc, 16, 19, '#ffffff', 1);
    }

    /* カウントダウン */
    if (state === 'play' && countdown > 0) {
      const s = countdown > 0.45 ? 'READY' : 'GO!';
      const sc2 = countdown > 0.45 ? 2 : 3;
      drawTextRGB(g, s, Math.round((W - textWidth(s, sc2)) / 2), 96, '#ffffff', sc2);
    }
    if (state === 'dying' || (state === 'result')) {
      const s = endReason === 'OUT' ? 'OUT' : 'TIME UP';
      drawTextRGB(g, s, Math.round((W - textWidth(s, 3)) / 2), 110, '#ff6b6b', 3);
    }

    /* フラッシュ */
    if (flash > 0.02) {
      g.globalAlpha = clamp(flash, 0, 1) * 0.8;
      g.fillStyle = '#fff7d6'; g.fillRect(-12, -12, W + 24, H + 24);
      g.globalAlpha = 1;
    }
    g.setTransform(1, 0, 0, 1, 0, 0);
  }

  /* ================= 入力 ================= */
  const input = { left: false, right: false, boost: false, px: null };
  function steerDir() {
    const k = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    if (k) return k;
    if (input.px != null) return clamp((input.px - sx) / 12, -1, 1);
    return 0;
  }

  document.addEventListener('keydown', function (e) {
    const k = e.key.toLowerCase();
    if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown', ' ', 'spacebar'].indexOf(k) >= 0) e.preventDefault();
    if (k === 'arrowleft' || k === 'a') input.left = true;
    else if (k === 'arrowright' || k === 'd') input.right = true;
    else if (k === ' ' || k === 'arrowup' || k === 'w' || k === 'shift') input.boost = true;
    else if (k === 'p' || k === 'escape') togglePause();
    else if (k === 'enter' || k === 'r') {
      if (state === 'title' || state === 'result') startGame();
    }
    if ((k === ' ' || k === 'enter') && (state === 'title' || state === 'result')) startGame();
  });
  document.addEventListener('keyup', function (e) {
    const k = e.key.toLowerCase();
    if (k === 'arrowleft' || k === 'a') input.left = false;
    else if (k === 'arrowright' || k === 'd') input.right = false;
    else if (k === ' ' || k === 'arrowup' || k === 'w' || k === 'shift') input.boost = false;
  });
  window.addEventListener('blur', function () {
    input.left = input.right = input.boost = false; input.px = null;
    if (state === 'play') togglePause();
  });

  /* キャンバスをなぞって操縦（スマホ） */
  function pointerX(e) {
    const r = cv.getBoundingClientRect();
    return clamp((e.clientX - r.left) / r.width * W, 0, W);
  }
  cv.addEventListener('pointerdown', function (e) {
    if (state !== 'play') return;
    cv.setPointerCapture(e.pointerId); input.px = pointerX(e); Sfx.ready();
  });
  cv.addEventListener('pointermove', function (e) { if (input.px != null) input.px = pointerX(e); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
    cv.addEventListener(ev, function () { input.px = null; });
  });

  /* ボタン（押しっぱなし対応） */
  function bindHold(el, on, off) {
    if (!el) return;
    el.addEventListener('pointerdown', function (e) { e.preventDefault(); el.classList.add('is-on'); Sfx.ready(); on(); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
      el.addEventListener(ev, function () { el.classList.remove('is-on'); off(); });
    });
  }
  bindHold(document.getElementById('padLeft'), () => input.left = true, () => input.left = false);
  bindHold(document.getElementById('padRight'), () => input.right = true, () => input.right = false);
  bindHold(document.getElementById('padBoost'), () => input.boost = true, () => input.boost = false);

  /* ================= 画面制御 ================= */
  function showOverlay(id) {
    ['ovTitle', 'ovPause', 'ovResult'].forEach(function (o) {
      document.getElementById(o).classList.toggle('is-show', o === id);
    });
  }
  function togglePause() {
    if (state === 'play') { state = 'pause'; showOverlay('ovPause'); }
    else if (state === 'pause') { state = 'play'; showOverlay(null); }
  }
  function loadBest() {
    try { best = parseInt(localStorage.getItem('star-runner.best') || '0', 10) || 0; } catch (e) { best = 0; }
    document.getElementById('tBest').textContent = String(best);
  }
  function saveBest(v) {
    try { localStorage.setItem('star-runner.best', String(v)); } catch (e) { /* 保存できなくても続行 */ }
    document.getElementById('tBest').textContent = String(v);
  }

  document.querySelectorAll('[data-action]').forEach(function (el) {
    el.addEventListener('click', function () {
      const a = el.dataset.action;
      if (a === 'start' || a === 'retry') startGame();
      else if (a === 'pause') togglePause();
      else if (a === 'resume') togglePause();
      else if (a === 'title') { state = 'title'; resetWorld(); showOverlay('ovTitle'); }
      else if (a === 'sound') {
        Sfx.muted = !Sfx.muted;
        el.querySelector('.icon').innerHTML = ICONS[Sfx.muted ? 'soundOff' : 'soundOn'];
        el.setAttribute('aria-pressed', String(Sfx.muted));
        if (!Sfx.muted) { Sfx.ready(); Sfx.tick(); }
      }
    });
  });

  /* ================= メインループ ================= */
  let prev = performance.now();
  function frame(now) {
    let dt = (now - prev) / 1000;
    prev = now;
    if (dt > 0.05) dt = 0.05;
    update(dt);
    render();
    requestAnimationFrame(frame);
  }

  /* ステージいっぱいにドット比を保って拡大 */
  const stageEl = document.querySelector('.stage');
  const screenEl = document.querySelector('.screen');
  function fitScreen() {
    const aw = stageEl.clientWidth, ah = stageEl.clientHeight;
    if (!aw || !ah) return;
    const s = Math.min(aw / W, ah / H);
    const w = Math.floor(W * s), h = Math.floor(H * s);
    screenEl.style.width = w + 'px';
    screenEl.style.height = h + 'px';
    screenEl.style.fontSize = clamp(w / 200 * 7, 10.5, 16).toFixed(2) + 'px';
  }
  window.addEventListener('resize', fitScreen);
  window.addEventListener('orientationchange', fitScreen);
  if (window.ResizeObserver) new ResizeObserver(fitScreen).observe(stageEl);
  fitScreen();

  /* 動作確認用（QA）。ゲームの挙動には影響しない */
  window.StarRunner = {
    peek: function () {
      const blk = blockAt(dist + 60) || { l: 0, r: W };
      let rock = null, star = null;
      for (let i = 0; i < rocks.length; i++) {
        const dd = rocks[i].d - dist;
        if (dd > 10 && dd < 120 && (!rock || dd < rock.dd)) rock = { dd: dd, x: rocks[i].x, r: rocks[i].r };
      }
      for (let i = 0; i < stars.length; i++) {
        const dd = stars[i].d - dist;
        if (!stars[i].got && dd > 10 && dd < 150 && (!star || dd < star.dd)) star = { dd: dd, x: stars[i].x };
      }
      return { state: state, sx: sx, left: blk.l, right: blk.r, time: time,
               score: scoreNow(), stars: starCount, rock: rock, star: star };
    }
  };

  mountIcons();
  loadBest();
  resetWorld();
  showOverlay('ovTitle');
  requestAnimationFrame(frame);
})();
