/* ============================================================
   美的マインドセット診断 — このモック専用スクリプト
   （サーバー通信なし／採点はすべてブラウザ内で完結）
   ============================================================ */

/* ---------- アイコン（Lucide風・線画） ---------- */
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  palette: '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.5 1.8-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z"/><circle cx="7.5" cy="11.5" r="1.2"/><circle cx="10.5" cy="7.5" r="1.2"/><circle cx="15" cy="8.5" r="1.2"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 15l3.5-4 3 3L20 7"/></svg>',
  history: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 2l8 3v7c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .7-5.3 4.7 1.6 7.1L12 18l-6.3 3.5L7.3 14.4 2 9.7 9 9z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>',
  music: '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  frame: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>',
  brush: '<svg viewBox="0 0 24 24"><path d="M9.5 14.5L4 20c-.5.5-.5 1.5 0 2s1.5.5 2 0l5.5-5.5"/><path d="M14 4l6 6-7.5 7.5-6-6L14 4z"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>',
  compass: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  grip: '<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/></svg>',
  ticket: '<svg viewBox="0 0 24 24"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V9z"/><path d="M12 7v2M12 13v2M12 17v0"/></svg>',
  location: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
};

/* ---------- 診断の定義 ---------- */

// 5段階の選択肢（テスト冒頭の凡例そのまま）
const SCALE = [
  { v: 1, t: "まったくない" },
  { v: 2, t: "ほとんどない" },
  { v: 3, t: "ときどきある" },
  { v: 4, t: "よくある" },
  { v: 5, t: "とてもよくある" },
];

// カテゴリ（採点方法ページの3分類）
const CATEGORIES = {
  understand: {
    key: "understand",
    name: "美的理解力",
    en: "Aesthetic Appreciation",
    color: "#4b6c8c",
    items: [1, 2, 3, 4, 6, 9, 14],
    desc: "美的経験と環境の美的側面に、どのくらい敏感に反応しているかを示します。",
  },
  intense: {
    key: "intense",
    name: "強力な美的経験",
    en: "Intense Aesthetic Experience",
    color: "#a75440",
    items: [8, 12, 13],
    desc: "美的経験に対して、平均的な人の反応よりも強い反応がみられる度合いを示します。",
  },
  creative: {
    key: "creative",
    name: "創造的行動",
    en: "Creative Behavior",
    color: "#5d7a56",
    items: [5, 7, 10, 11],
    desc: "アートの創作などの、創造的意欲の度合いを示します。",
  },
};

// 14項目（テストの設問そのまま）
const QUESTIONS = [
  { no: 1, cat: "understand", text: "音楽やダンスの公演、美術館、演劇、デジタルアートなどのイベントに行く。" },
  { no: 2, cat: "understand", text: "アートを鑑賞したり体験したりすると美しさを感じる。" },
  { no: 3, cat: "understand", text: "音楽に感情を揺さぶられる。" },
  { no: 4, cat: "understand", text: "アート作品の均整のとれた美しさに感動する。" },
  { no: 5, cat: "creative", text: "彫刻、絵画、工芸品、映像作品、デザインなどを創作する。" },
  { no: 6, cat: "understand", text: "アートを鑑賞すると、前向きなエネルギーや活気を得られる。" },
  { no: 7, cat: "creative", text: "詩、歌詞、ノンフィクション、フィクションなどを創作する。" },
  { no: 8, cat: "intense", text: "アートを鑑賞すると、心拍数が上がるなど、身体的に影響を受ける。" },
  { no: 9, cat: "understand", text: "建物やインテリアのデザインに興味がある。" },
  { no: 10, cat: "creative", text: "アート、工芸、文芸、美学などの教室に通っている（もしくは通っていた）。" },
  { no: 11, cat: "creative", text: "アートの創作や鑑賞を通して連帯感やコミュニティとのつながりを感じる。" },
  { no: 12, cat: "intense", text: "アートを体験するとき、宇宙、自然、存在、神との調和、一体感もしくはつながりを感じる。" },
  { no: 13, cat: "intense", text: "アートを目にすると深く感動する。" },
  { no: 14, cat: "understand", text: "アートを創作したり鑑賞したりすると、喜び、安らぎ、その他の前向きな感情が得られる。" },
];

// 評価の指標（1〜5）
const RANKS = ["低い", "平均より下", "平均的", "平均より上", "高い"];

/* ---------- 採点ロジック ---------- */

// answers: { 1: 4, 2: 5, ... } もしくは長さ14の配列（index0 = 項目1）
function normalizeAnswers(answers) {
  const map = {};
  if (Array.isArray(answers)) {
    answers.forEach((v, i) => { if (v) map[i + 1] = Number(v); });
  } else if (answers) {
    Object.keys(answers).forEach((k) => { if (answers[k]) map[Number(k)] = Number(answers[k]); });
  }
  return map;
}

function avgOf(map, items) {
  let sum = 0, n = 0;
  items.forEach((no) => { if (map[no]) { sum += map[no]; n++; } });
  return n ? sum / n : 0;
}

// 「各項目の点数を足して、項目の数で割る」＝カテゴリ平均、総合点は14項目の合計÷14
function scoreAnswers(answers) {
  const map = normalizeAnswers(answers);
  const understand = avgOf(map, CATEGORIES.understand.items);
  const intense = avgOf(map, CATEGORIES.intense.items);
  const creative = avgOf(map, CATEGORIES.creative.items);
  const total = avgOf(map, QUESTIONS.map((q) => q.no));
  const sum = QUESTIONS.reduce((a, q) => a + (map[q.no] || 0), 0);
  return {
    map, understand, intense, creative, total, sum,
    answered: Object.keys(map).length,
  };
}

// 点数（1〜5の平均）→ 指標ラベル
function rankOf(score) {
  if (!score) return "—";
  const i = Math.min(5, Math.max(1, Math.round(score))) - 1;
  return RANKS[i];
}
function rankIndex(score) {
  return Math.min(5, Math.max(1, Math.round(score || 1)));
}

// 3カテゴリのバランスから「タイプ」を出す（提案用の付加価値部分）
function typeOf(s) {
  const arr = [
    { k: "understand", v: s.understand },
    { k: "intense", v: s.intense },
    { k: "creative", v: s.creative },
  ].sort((a, b) => b.v - a.v);
  const top = arr[0];
  const spread = arr[0].v - arr[2].v;

  if (s.total >= 4.2 && spread < 0.8) {
    return { name: "アートに生きる人", desc: "3つの側面すべてが高く、鑑賞・没入・創作が生活の中で循環しています。美的経験があなたの日常の土台になっているタイプです。" };
  }
  if (s.total <= 2.0) {
    return { name: "これから出会う人", desc: "いまはアートとの接点が少ない状態です。まずは「行く」「見る」の機会を一つ増やすところから、反応の変化を確かめてみましょう。" };
  }
  if (top.k === "understand") {
    return { name: "感受する人", desc: "環境の美しさや作品の均整に、細やかに気づける受け手です。触れる量が増えるほど、感じ取れる幅も広がっていきます。" };
  }
  if (top.k === "intense") {
    return { name: "深く震える人", desc: "アートに出会ったときの反応が、平均的な人より強く出るタイプです。身体感覚や一体感をともなう体験が、あなたの原動力になります。" };
  }
  return { name: "つくる人", desc: "見るだけでなく、自分の手で形にすることに意欲が向いています。創作を通じた人とのつながりも、あなたを支える要素です。" };
}

/* ---------- 保存（localStorage・モックなのでブラウザ内のみ） ---------- */
const STORE_ANSWERS = "am_answers_v1";
const STORE_HISTORY = "am_history_v1";

function saveAnswers(map) {
  try { localStorage.setItem(STORE_ANSWERS, JSON.stringify(map)); } catch (e) {}
}
function loadAnswers() {
  try { return JSON.parse(localStorage.getItem(STORE_ANSWERS) || "null"); } catch (e) { return null; }
}
function clearAnswers() {
  try { localStorage.removeItem(STORE_ANSWERS); } catch (e) {}
}
function pushHistory(map) {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_HISTORY) || "[]");
    const s = scoreAnswers(map);
    list.unshift({
      date: formatToday(),
      total: round1(s.total),
      understand: round1(s.understand),
      intense: round1(s.intense),
      creative: round1(s.creative),
      answers: map,
    });
    localStorage.setItem(STORE_HISTORY, JSON.stringify(list.slice(0, 12)));
  } catch (e) {}
}
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORE_HISTORY) || "[]"); } catch (e) { return []; }
}

function round1(n) { return Math.round(n * 10) / 10; }
function fmt1(n) { return (Math.round(n * 10) / 10).toFixed(1); }
function formatToday() {
  const d = new Date();
  return d.getFullYear() + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0");
}

// デモ用のサンプル回答（結果画面に直接来た場合のフォールバック）
// （合計55点 → 総合3.9／理解4.4・経験4.7・創造2.5＝「深く震える人」）
const DEMO_ANSWERS = { 1: 4, 2: 5, 3: 5, 4: 4, 5: 2, 6: 5, 7: 3, 8: 5, 9: 3, 10: 2, 11: 3, 12: 4, 13: 5, 14: 5 };

/* ---------- レーダーチャート（SVG・3軸） ---------- */
function renderRadar(el, scores) {
  // ラベルが見切れないよう、横に余白をとった viewBox にする
  const W = 340, H = 268, cx = W / 2, cy = 128, R = 78;
  const axes = [
    { label: "美的理解力", v: scores.understand },
    { label: "強力な美的経験", v: scores.intense },
    { label: "創造的行動", v: scores.creative },
  ];
  const angle = (i) => (-90 + i * 120) * (Math.PI / 180);
  const pt = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];

  let svg = '<svg class="radar" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="3カテゴリのレーダーチャート">';
  // 目盛り（1〜5の同心三角形）
  for (let lv = 1; lv <= 5; lv++) {
    const r = (R * lv) / 5;
    const p = [0, 1, 2].map((i) => pt(i, r).join(",")).join(" ");
    svg += '<polygon class="grid-line" points="' + p + '"/>';
  }
  // 軸
  [0, 1, 2].forEach((i) => {
    const [x, y] = pt(i, R);
    svg += '<line class="axis" x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '"/>';
  });
  // 実データ
  const dataPts = axes.map((a, i) => pt(i, (R * Math.max(a.v, 0.2)) / 5));
  svg += '<polygon class="shape" points="' + dataPts.map((p) => p.join(",")).join(" ") + '"/>';
  dataPts.forEach((p) => { svg += '<circle class="pt" cx="' + p[0] + '" cy="' + p[1] + '" r="3.5"/>'; });
  // ラベル
  axes.forEach((a, i) => {
    const [lx, ly] = pt(i, R + 28);
    const anchor = i === 0 ? "middle" : i === 1 ? "start" : "end";
    const dx = i === 1 ? -14 : i === 2 ? 14 : 0;
    svg += '<text class="lbl" x="' + (lx + dx) + '" y="' + ly + '" text-anchor="' + anchor + '">' + a.label + "</text>";
    svg += '<text class="val" x="' + (lx + dx) + '" y="' + (ly + 15) + '" text-anchor="' + anchor + '">' + fmt1(a.v) + "</text>";
  });
  svg += "</svg>";
  el.innerHTML = svg;
}

/* ---------- 推移グラフ（履歴・SVG折れ線） ---------- */
function renderTrend(el, points) {
  if (!points.length) { el.innerHTML = ""; return; }
  const W = 320, H = 120, padL = 26, padR = 10, padT = 12, padB = 24;
  const iw = W - padL - padR, ih = H - padT - padB;
  const x = (i) => padL + (points.length === 1 ? iw / 2 : (iw * i) / (points.length - 1));
  const y = (v) => padT + ih - ((v - 1) / 4) * ih;

  let svg = '<svg class="trend" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none">';
  [1, 2, 3, 4, 5].forEach((v) => {
    svg += '<line class="gl" x1="' + padL + '" y1="' + y(v) + '" x2="' + (W - padR) + '" y2="' + y(v) + '"/>';
    svg += '<text class="tx" x="' + (padL - 6) + '" y="' + (y(v) + 3) + '" text-anchor="end">' + v + "</text>";
  });
  const line = points.map((p, i) => x(i) + "," + y(p.v)).join(" ");
  svg += '<polygon class="ar" points="' + padL + "," + (padT + ih) + " " + line + " " + (W - padR) + "," + (padT + ih) + '"/>';
  svg += '<polyline class="ln" points="' + line + '"/>';
  points.forEach((p, i) => {
    svg += '<circle class="dt" cx="' + x(i) + '" cy="' + y(p.v) + '" r="4"/>';
    svg += '<text class="tx" x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + p.label + "</text>";
  });
  svg += "</svg>";
  el.innerHTML = svg;
}

/* ============================================================
   共通の動き
   ============================================================ */
(function () {
  // アイコン展開
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!ICONS[name]) return;
    el.innerHTML = ICONS[name];
    if (!el.classList.contains("icon") && !el.classList.contains("nav-icon") &&
        !el.classList.contains("search-icon") && !el.classList.contains("logo-icon")) {
      el.classList.add("icon");
    }
  });

  // 現在ページのナビをアクティブに
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".bottom-nav a, .side-link").forEach((a) => {
    const t = a.getAttribute("data-page");
    if (t && t.toLowerCase() === page) a.classList.add("active");
  });

  // ログインフォーム
  document.querySelectorAll("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      location.href = form.getAttribute("data-login-to") || "home.html";
    });
  });

  // ボタン遷移
  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = btn.getAttribute("data-goto");
    });
  });

  // モック動作のダイアログ
  document.querySelectorAll("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(btn.getAttribute("data-demo") || "モック動作です");
    });
  });

  // フィルタチップ
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        group.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const key = chip.getAttribute("data-filter") || "all";
        document.querySelectorAll("[data-filterable]").forEach((row) => {
          const tags = row.getAttribute("data-tags") || "";
          row.classList.toggle("hidden", key !== "all" && !tags.split(" ").includes(key));
        });
      });
    });
  });

  // 検索フィルタ
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

  // 単一選択グループ
  document.querySelectorAll("[data-select-group]").forEach((group) => {
    group.querySelectorAll("[data-select]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        group.querySelectorAll("[data-select]").forEach((c) => c.classList.remove("selected"));
        el.classList.add("selected");
      });
    });
  });

  /* ========== 診断画面 ========== */
  const quiz = document.getElementById("quiz");
  if (quiz) initQuiz(quiz);

  /* ========== 結果画面 ========== */
  const result = document.getElementById("result");
  if (result) initResult(result);

  /* ========== 履歴画面 ========== */
  const trendEl = document.getElementById("trend");
  if (trendEl) {
    const hist = loadHistory();
    const seeded = hist.length ? hist : [
      { date: "2026.07.20", total: 3.9 }, { date: "2026.05.18", total: 3.5 }, { date: "2026.02.11", total: 3.1 },
    ];
    const pts = seeded.slice(0, 6).reverse().map((h) => ({ v: h.total, label: h.date.slice(5) }));
    renderTrend(trendEl, pts);
  }
})();

/* ---------- 診断（1問ずつ） ---------- */
function initQuiz(root) {
  const saved = loadAnswers() || {};
  const answers = {};
  Object.keys(saved).forEach((k) => { answers[Number(k)] = Number(saved[k]); });
  let idx = 0;
  // 未回答の最初の問題から再開
  for (let i = 0; i < QUESTIONS.length; i++) {
    if (!answers[QUESTIONS[i].no]) { idx = i; break; }
    idx = i;
  }

  const elCount = document.getElementById("q-count");
  const elCat = document.getElementById("q-cat");
  const elBar = document.getElementById("q-bar");
  const elNo = document.getElementById("q-no");
  const elText = document.getElementById("q-text");
  const elScale = document.getElementById("q-scale");
  const elPrev = document.getElementById("q-prev");
  const elNext = document.getElementById("q-next");
  const elDots = document.getElementById("q-dots");

  function answeredCount() { return Object.keys(answers).filter((k) => answers[k]).length; }

  function render() {
    // 設問を描き替えるたびに、直前の操作で残ったフォーカスを解除する
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
    const q = QUESTIONS[idx];
    elCount.innerHTML = "<b>" + q.no + "</b> / 14";
    elCat.textContent = CATEGORIES[q.cat].name;
    elBar.style.width = (answeredCount() / 14) * 100 + "%";
    elNo.textContent = "QUESTION " + String(q.no).padStart(2, "0");
    elText.textContent = q.text;

    elScale.innerHTML = SCALE.map((s) =>
      '<button class="scale-btn' + (answers[q.no] === s.v ? " selected" : "") + '" data-v="' + s.v + '">' +
      '<span class="n">' + s.v + '</span><span class="t">' + s.t + "</span></button>"
    ).join("");
    elScale.querySelectorAll(".scale-btn").forEach((b) => {
      b.addEventListener("click", () => {
        answers[q.no] = Number(b.getAttribute("data-v"));
        saveAnswers(answers);
        b.blur(); // 次の設問に選択状態が残って見えないようフォーカスを外す
        render();
        // 最後の問題以外は少し待って自動で次へ
        if (idx < QUESTIONS.length - 1) {
          setTimeout(() => { idx++; render(); window.scrollTo({ top: 0, behavior: "smooth" }); }, 260);
        }
      });
    });

    elPrev.disabled = idx === 0;
    const isLast = idx === QUESTIONS.length - 1;
    const allDone = answeredCount() === 14;
    elNext.textContent = isLast || allDone ? "結果を見る" : "次へ";
    elNext.disabled = (isLast || allDone) ? !allDone : !answers[q.no];

    elDots.innerHTML = QUESTIONS.map((qq, i) =>
      '<button class="q-dot' + (answers[qq.no] ? " answered" : "") + (i === idx ? " current" : "") +
      '" data-i="' + i + '">' + qq.no + "</button>"
    ).join("");
    elDots.querySelectorAll(".q-dot").forEach((d) => {
      d.addEventListener("click", () => { idx = Number(d.getAttribute("data-i")); render(); });
    });
  }

  elPrev.addEventListener("click", () => { if (idx > 0) { idx--; render(); } });
  elNext.addEventListener("click", () => {
    const allDone = answeredCount() === 14;
    if (allDone) {
      saveAnswers(answers);
      pushHistory(answers);
      location.href = "result.html";
      return;
    }
    if (idx < QUESTIONS.length - 1) { idx++; render(); }
  });

  render();
}

/* ---------- 結果 ---------- */
function initResult(root) {
  const stored = loadAnswers();
  const answers = stored && Object.keys(stored).length === 14 ? stored : DEMO_ANSWERS;
  const s = scoreAnswers(answers);
  const t = typeOf(s);

  document.getElementById("r-total").innerHTML = fmt1(s.total) + "<small> / 5.0</small>";
  document.getElementById("r-rank").textContent = rankOf(s.total);
  document.getElementById("r-type").textContent = t.name;
  document.getElementById("r-type-desc").textContent = t.desc;
  const sumEl = document.getElementById("r-sum");
  if (sumEl) sumEl.textContent = s.sum;

  renderRadar(document.getElementById("r-radar"), s);

  // 指標ガイドの点灯
  const gi = rankIndex(s.total);
  document.querySelectorAll("#r-guide > div").forEach((d, i) => {
    d.classList.toggle("on", i + 1 === gi);
  });

  // カテゴリ別
  const catBox = document.getElementById("r-cats");
  catBox.innerHTML = ["understand", "intense", "creative"].map((k) => {
    const c = CATEGORIES[k];
    const v = s[k];
    return '<div class="cat-row">' +
      '<div class="cat-head">' +
        '<span class="cat-dot" style="background:' + c.color + '"></span>' +
        '<span class="cat-name">' + c.name + "</span>" +
        '<span class="cat-score">' + fmt1(v) + "<small> / 5.0</small></span>" +
      "</div>" +
      '<div class="cat-bar"><i style="width:' + (v / 5) * 100 + "%;background:" + c.color + '"></i></div>' +
      '<div class="cat-meta">' +
        '<span class="cat-rank" style="color:' + c.color + '">' + rankOf(v) + "</span>" +
        '<span class="cat-items">項目 ' + c.items.join("、") + " の合計 ÷ " + c.items.length + "</span>" +
      "</div>" +
      '<p class="cat-desc">' + c.desc + "</p>" +
    "</div>";
  }).join("");

  // 回答一覧
  const ansBox = document.getElementById("r-answers");
  if (ansBox) {
    ansBox.innerHTML = QUESTIONS.map((q) =>
      '<div class="answer-row">' +
        '<span class="answer-no">' + q.no + "</span>" +
        '<span class="answer-text">' + q.text + "</span>" +
        '<span class="answer-val" style="background:' + CATEGORIES[q.cat].color + '1f;color:' + CATEGORIES[q.cat].color + '">' +
          (s.map[q.no] || "-") + "</span>" +
      "</div>"
    ).join("");
  }

  // もう一度受ける
  const again = document.getElementById("r-again");
  if (again) {
    again.addEventListener("click", (e) => {
      e.preventDefault();
      clearAnswers();
      location.href = "test.html";
    });
  }
}
