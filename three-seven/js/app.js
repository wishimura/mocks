/* =========================================================
   スリーセブン（777） — 落ちもの数字パズル
   ルール:
     ・1〜7の数字ブロックが4個ひと組（テトリミノ）で落下
     ・タテ／ヨコに連続したブロックの合計が「7」になると消える
       （連続していれば個数は何個でもOK）
     ・「7」だけは特別。3つ並べないと消えない（=スリーセブン）
     ・消すと上が詰まって連鎖。時間経過で落下が加速
     ・上端まで積み上がるとゲームオーバー
   ※純粋HTML/CSS/JSのみ。DB/APIなし。
   ========================================================= */
(() => {
  "use strict";

  const COLS = 6;
  const ROWS = 13;

  // テトリミノ形状（相対セル [r,c]）
  const SHAPES = [
    [[0,0],[0,1],[0,2],[0,3]], // I
    [[0,0],[0,1],[1,0],[1,1]], // O
    [[0,0],[0,1],[0,2],[1,1]], // T
    [[0,1],[0,2],[1,0],[1,1]], // S
    [[0,0],[0,1],[1,1],[1,2]], // Z
    [[0,0],[1,0],[1,1],[1,2]], // J
    [[0,2],[1,0],[1,1],[1,2]], // L
  ];

  // 数字の出現重み（7は揃えにくいので少し控えめ）
  const NUMBER_BAG = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7];

  // ---- 状態 ----
  let grid;          // ROWS×COLS : null | 1..7
  let piece;         // 現在のピース
  let nextPiece;     // 次のピース（ネクスト）
  let next2Piece;    // その次のピース（ネクネク）
  let score, level, totalCleared, bestChain;
  let running = false;
  let busy = false;  // 消去アニメ中は入力/落下を止める
  let startTime = 0;
  let lastDrop = 0;
  let rafId = null;

  // ---- DOM ----
  const boardEl   = document.getElementById("board");
  const nextEl    = document.getElementById("next");
  const next2El   = document.getElementById("next2");
  const scoreEl   = document.getElementById("score");
  const levelEl   = document.getElementById("level");
  const chainEl   = document.getElementById("chain");
  const finalEl   = document.getElementById("finalScore");
  const startScreen = document.getElementById("startScreen");
  const overScreen  = document.getElementById("overScreen");
  const pauseScreen = document.getElementById("pauseScreen");

  // 盤面セルを生成（一度だけ）
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    cells[r] = [];
    for (let c = 0; c < COLS; c++) {
      const d = document.createElement("div");
      d.className = "cell";
      boardEl.appendChild(d);
      cells[r][c] = d;
    }
  }

  // ---- ユーティリティ ----
  const sleep = (ms) => new Promise(res => setTimeout(res, ms));
  const rand = (n) => Math.floor(Math.random() * n);
  const pickNumber = () => NUMBER_BAG[rand(NUMBER_BAG.length)];

  function emptyGrid() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  }

  // 落下間隔（ms）。時間経過＝レベルで加速。
  function dropInterval() {
    return Math.max(110, 820 - (level - 1) * 70);
  }

  // ---- ピース生成 ----
  function makePiece() {
    const shape = SHAPES[rand(SHAPES.length)];
    const cellsRel = shape.map(([r, c]) => ({ r, c, value: pickNumber() }));
    const width = Math.max(...cellsRel.map(p => p.c)) + 1;
    return {
      cells: cellsRel,
      row: 0,
      col: Math.floor((COLS - width) / 2),
    };
  }

  // ---- 衝突判定 ----
  function collides(p, dRow = 0, dCol = 0, testCells = null) {
    const cs = testCells || p.cells;
    for (const cell of cs) {
      const gr = p.row + cell.r + dRow;
      const gc = p.col + cell.c + dCol;
      if (gc < 0 || gc >= COLS || gr >= ROWS) return true;
      if (gr >= 0 && grid[gr][gc] != null) return true;
    }
    return false;
  }

  // ---- 回転（90°CW、バウンディングボックス基準）----
  function rotatedCells(p) {
    const maxR = Math.max(...p.cells.map(c => c.r));
    const rot = p.cells.map(c => ({ r: c.c, c: maxR - c.r, value: c.value }));
    const minR = Math.min(...rot.map(c => c.r));
    const minC = Math.min(...rot.map(c => c.c));
    return rot.map(c => ({ r: c.r - minR, c: c.c - minC, value: c.value }));
  }

  function tryRotate() {
    const rc = rotatedCells(piece);
    // 壁蹴り（左右に少しずらして収まれば許可）
    for (const dx of [0, -1, 1, -2, 2]) {
      if (!collides(piece, 0, dx, rc.map(c => ({ ...c })))) {
        piece.cells = rc;
        piece.col += dx;
        return true;
      }
    }
    return false;
  }

  // ---- 列重力：浮いているブロックを下に詰める ----
  function applyGravity() {
    for (let c = 0; c < COLS; c++) {
      let write = ROWS - 1;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (grid[r][c] != null) {
          const v = grid[r][c];
          grid[r][c] = null;
          grid[write][c] = v;
          write--;
        }
      }
    }
  }

  /* ---- 1ラインを走査して消去対象をマーク ----
     values: そのライン上の値（null可）の配列
     markFn(i): ライン内インデックス i を消去対象に
  */
  function scanLine(values, markFn) {
    const n = values.length;
    let i = 0;
    while (i < n) {
      if (values[i] == null) { i++; continue; }
      // 連続した充填セグメント [i, j)
      let j = i;
      while (j < n && values[j] != null) j++;

      // (1) 合計7（2個以上の連続）
      for (let a = i; a < j; a++) {
        let sum = 0;
        for (let b = a; b < j; b++) {
          sum += values[b];
          const len = b - a + 1;
          if (sum === 7 && len >= 2) { for (let k = a; k <= b; k++) markFn(k); break; }
          if (sum >= 7) break; // 全て正なのでこれ以上は7にならない（単独7もここで除外）
        }
      }
      // (2) 7が3つ以上連続（スリーセブン）
      for (let a = i; a + 2 < j; a++) {
        if (values[a] === 7 && values[a+1] === 7 && values[a+2] === 7) {
          markFn(a); markFn(a+1); markFn(a+2);
        }
      }
      i = j;
    }
  }

  // 盤面全体の消去マスクを計算（消去対象があれば mask、なければ null）
  function computeClears() {
    const mask = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    let any = false;
    // 横
    for (let r = 0; r < ROWS; r++) {
      const vals = grid[r].slice();
      scanLine(vals, (i) => { mask[r][i] = true; any = true; });
    }
    // 縦
    for (let c = 0; c < COLS; c++) {
      const vals = [];
      for (let r = 0; r < ROWS; r++) vals.push(grid[r][c]);
      scanLine(vals, (i) => { mask[i][c] = true; any = true; });
    }
    return any ? mask : null;
  }

  // ---- ピースを盤面に固定 → 重力 → 連鎖消去 ----
  async function lockAndResolve() {
    busy = true;
    for (const cell of piece.cells) {
      const gr = piece.row + cell.r;
      const gc = piece.col + cell.c;
      if (gr >= 0) grid[gr][gc] = cell.value;
    }
    // 固定したら即アクティブ表示を消す。これをしないと、列重力で
    // 落ちた本体と、重力前の位置のアクティブ描画が一瞬ダブって見える。
    piece = null;
    applyGravity();
    render();

    let chain = 0;
    while (true) {
      const mask = computeClears();
      if (!mask) break;
      chain++;
      bestChain = Math.max(bestChain, chain);

      // 消去アニメ
      let count = 0;
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        if (mask[r][c]) { cells[r][c].classList.add("clearing"); count++; }
      }
      chainEl.textContent = chain;
      await sleep(460);

      // 得点：消したブロック数 × 連鎖係数
      score += count * 10 * chain;
      totalCleared += count;
      // レベルは「経過時間」と「消去数」の両方で上昇
      level = 1 + Math.floor(totalCleared / 16) + Math.floor((performance.now() - startTime) / 35000);

      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        if (mask[r][c]) grid[r][c] = null;
      }
      applyGravity();
      render();
      updateHud();
      await sleep(110);
    }

    chainEl.textContent = 0;
    spawnPiece();
    busy = false;
    lastDrop = performance.now();
  }

  // ---- 新ピース投入 / ゲームオーバー判定 ----
  function spawnPiece() {
    piece = nextPiece;
    nextPiece = next2Piece;
    next2Piece = makePiece();
    renderNext();
    if (collides(piece)) {
      gameOver();
    }
  }

  function stepDown() {
    if (!collides(piece, 1, 0)) {
      piece.row++;
      render();
    } else {
      lockAndResolve();
    }
  }

  function hardDrop() {
    let d = 0;
    while (!collides(piece, d + 1, 0)) d++;
    piece.row += d;
    score += d * 2;
    render();
    lockAndResolve();
  }

  // ---- 描画 ----
  function render() {
    // クリア
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const el = cells[r][c];
      el.className = "cell";
      el.textContent = "";
    }
    // 固定ブロック
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const v = grid[r][c];
      if (v != null) {
        const el = cells[r][c];
        el.className = `cell filled n${v}`;
        el.textContent = v;
      }
    }
    // アクティブピース
    if (piece && running) {
      for (const cell of piece.cells) {
        const gr = piece.row + cell.r;
        const gc = piece.col + cell.c;
        if (gr >= 0 && gr < ROWS) {
          const el = cells[gr][gc];
          el.className = `cell filled active n${cell.value}`;
          el.textContent = cell.value;
        }
      }
    }
  }

  // プレビュー（4×2の正方マス）に1ピースを描画
  function renderPreview(el, p) {
    el.innerHTML = "";
    const map = {};
    for (const cell of p.cells) map[`${cell.r},${cell.c}`] = cell.value;
    for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
      const d = document.createElement("div");
      const v = map[`${r},${c}`];
      if (v != null) {
        d.className = `pcell n${v}`;
        d.style.background = getComputedStyle(document.documentElement).getPropertyValue(`--n${v}`);
        d.textContent = v;
        if (v === 7) d.style.color = "#8a5a12";
      } else {
        d.className = "pcell empty";
      }
      el.appendChild(d);
    }
  }

  function renderNext() {
    renderPreview(nextEl, nextPiece);
    renderPreview(next2El, next2Piece);
  }

  function updateHud() {
    scoreEl.textContent = score;
    levelEl.textContent = level;
  }

  // ---- ゲーム進行 ----
  function loop(t) {
    if (running && !busy && piece) {
      if (t - lastDrop >= dropInterval()) {
        stepDown();
        lastDrop = t;
      }
    }
    rafId = requestAnimationFrame(loop);
  }

  function startGame() {
    grid = emptyGrid();
    score = 0; level = 1; totalCleared = 0; bestChain = 0;
    nextPiece = makePiece();
    next2Piece = makePiece();
    spawnPiece();
    running = true; busy = false;
    startTime = performance.now();
    lastDrop = startTime;
    startScreen.classList.add("hidden");
    overScreen.classList.add("hidden");
    pauseScreen.classList.add("hidden");
    updateHud();
    chainEl.textContent = 0;
    render();
    if (!rafId) rafId = requestAnimationFrame(loop);
  }

  function gameOver() {
    running = false;
    finalEl.textContent = score;
    overScreen.classList.remove("hidden");
  }

  let paused = false;
  function togglePause() {
    if (!running && !paused) return;
    if (paused) {
      paused = false; running = true;
      pauseScreen.classList.add("hidden");
      lastDrop = performance.now();
    } else {
      paused = true; running = false;
      pauseScreen.classList.remove("hidden");
    }
  }

  // ---- 入力 ----
  function move(dir) {
    if (!running || busy || !piece) return;
    if (dir === "left"  && !collides(piece, 0, -1)) { piece.col--; render(); }
    if (dir === "right" && !collides(piece, 0,  1)) { piece.col++; render(); }
    if (dir === "down") { stepDown(); lastDrop = performance.now(); }
    if (dir === "rotate") { if (tryRotate()) render(); }
    if (dir === "drop") hardDrop();
  }

  document.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k === "ArrowLeft")  { e.preventDefault(); move("left"); }
    else if (k === "ArrowRight") { e.preventDefault(); move("right"); }
    else if (k === "ArrowDown")  { e.preventDefault(); move("down"); }
    else if (k === "ArrowUp" || k === "x" || k === "X") { e.preventDefault(); move("rotate"); }
    else if (k === " ") { e.preventDefault(); move("drop"); }
    else if (k === "p" || k === "P") { togglePause(); }
  });

  // タッチパッド
  document.querySelectorAll(".pad").forEach(btn => {
    const act = btn.dataset.act;
    btn.addEventListener("click", (e) => { e.preventDefault(); move(act); });
  });

  // ボタン
  document.getElementById("startBtn").addEventListener("click", startGame);
  document.getElementById("retryBtn").addEventListener("click", startGame);
  document.getElementById("pauseBtn").addEventListener("click", togglePause);
  document.getElementById("resumeBtn").addEventListener("click", togglePause);

  // 初期描画
  render();
})();
