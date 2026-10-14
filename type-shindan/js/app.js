/* 8タイプ診断チェック — 静的モック（サーバー・DBなし、記録は localStorage） */

const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12.5l3 3 5-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  chevL: '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>',
  card: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 10h8M8 14h5"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
  print: '<svg viewBox="0 0 24 24"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
};

/* ---------- 診断データ（資料 60〜64ページを転記） ----------
   各質問の「欄」= 群(A〜H) + ページ番号(1〜4)。「はい」で1点、「いいえ」で0点。 */
const QUESTIONS = [
  // 60ページ（-1欄）
  ["約束時間を守る", "E", 1],
  ["自己肯定感が低め", "D", 1],
  ["いろいろなことを自分仕様にカスタマイズするのが得意", "C", 1],
  ["物事を順序立てて考えることができる", "B", 1],
  ["空気が読める", "A", 1],
  ["座っている時間が長い", "H", 1],
  ["座学よりものの実技の時間が好きだ", "G", 1],
  ["困っている人がいたら声をかける", "F", 1],
  ["指示に従って行動することができる", "E", 1],
  ["誰かから相談されることが多い", "D", 1],
  ["好奇心旺盛だ", "C", 1],
  ["物知りである", "B", 1],
  ["先を考えて行動している", "A", 1],
  // 61ページ（-2欄）
  ["感謝をあまり口に出さない", "B", 2],
  ["行動が早く、グズグズしない", "A", 2],
  ["友達からの相談に乗ることができる", "E", 2],
  ["体を動かすことが好きだ", "G", 2],
  ["周りが楽しそうだと自分も楽しい気持ちになる", "F", 2],
  ["皮膚や音などに過敏であったり、潔癖なところがある", "H", 2],
  ["友人の誘いに「NO」と言わない", "E", 2],
  ["常識にとらわれない", "C", 2],
  ["みんなとはどこか違う空気感をまとっている", "H", 2],
  ["予期せぬ出来事にも動じない", "A", 2],
  ["元気のない友達に寄り添うことができる", "F", 2],
  ["力加減を程よくすることができる", "E", 2],
  ["落とし物をした人を見たら追いかけて届ける", "E", 2],
  ["いろいろなアイデアが浮かぶ", "C", 2],
  ["腹立たしい出来事があっても、感情の変化がわかりづらい", "B", 2],
  ["うまくいかなかったときに、切り替えて前向きになる", "G", 2],
  ["自分ができることとできないことをわかっている", "H", 2],
  // 62ページ（-3欄）
  ["ハキハキと話す", "G", 3],
  ["自分の主張をしっかり話せる", "A", 3],
  ["自分の考えより他人の考えを優先する", "D", 3],
  ["他人と容易に知り合いになれる", "F", 3],
  ["外で遊ぶよりもゲームをしているほうが好きだ", "H", 3],
  ["議論ができる", "B", 3],
  ["色彩感覚に長けている", "C", 3],
  ["人に優しく攻撃的にならない", "D", 3],
  ["体育の成績は平均よりも上だ", "E", 3],
  ["誰と一緒にいてもストレスはない", "F", 3],
  ["本を読むことが好き", "B", 3],
  ["自分の意見と相手の意見を区別できる", "A", 3],
  ["友達との雑談で、高度な話題を振る", "H", 3],
  ["乗り物で席を譲る", "F", 3],
  ["耳で聞いた内容を正確に書き取ることができる", "E", 3],
  ["覚えた作業などは手早くこなせる", "G", 3],
  ["意外なところに着眼する観察力がある", "C", 3],
  // 63ページ（-4欄）
  ["声が大きい", "G", 4],
  ["協力を惜しまない", "D", 4],
  ["語彙が豊富である", "B", 4],
  ["何かを決めるときは迷わない", "A", 4],
  ["何かを始めると納得がいくまで諦めない", "H", 4],
  ["作業を制限時間内に終えることができる", "E", 4],
  ["失敗を恐れずチャレンジする", "G", 4],
  ["音感がよい", "C", 4],
  ["他人の買い物に付き合うのが好き", "F", 4],
  ["細かいことにも理由を求める", "B", 4],
  ["乗り物で乗り過ごしてしまった経験はない", "E", 4],
  ["誰かから話を聞いて情報を集めるのが得意", "D", 4],
  ["身振り手振りで表現できる", "G", 4],
  ["何かを作ることが好き", "C", 4],
  ["地図を読むのが得意", "H", 4],
  ["感動しやすい", "F", 4],
  ["相手を納得させる説明ができる", "A", 4],
].map(([text, group, col], i) => ({ no: i + 1, text, group, col }));

const PAGES = [
  { label: "60ページ", from: 1, to: 13 },
  { label: "61ページ", from: 14, to: 30 },
  { label: "62ページ", from: 31, to: 47 },
  { label: "63ページ", from: 48, to: 64 },
];

const THRESHOLD = 6; // 6点以上の群が「あなたのタイプ」

const TYPES = {
  A: { name: "リーダータイプ", color: "#c8173c",
    desc: "周囲に目配りをしながら個々と向き合う力があり、他者への理解力や伝達力が高いため、まとめ役を担います。活動的でどんな相手にも公平な対応ができるため、信頼関係を築ける頼れる存在です。" },
  B: { name: "論理タイプ", color: "#2f5d8a",
    desc: "論理タイプは大きく「文系」と「理系」に分かれ、どちらも筋道を立てて考える力や高い記憶力を備えています。特に理系はビジュアルイメージを描く力に優れ、創造的な分野で才能を発揮する傾向があります。" },
  C: { name: "クリエイティブタイプ", color: "#8a4fb0",
    desc: "1つのことを突き詰める強い好奇心を持ち、何かを「好きになる力」とその気持ちを持続する力が特徴です。「好きだから」という理由だけで集中力を発揮し、創造性の源泉となる継続的な探究を行うことができます。" },
  D: { name: "癒やしタイプ", color: "#3f8f6b",
    desc: "周囲の状況や人々の情報を受信する力に優れ、よく周囲を見渡して耳を傾けることができるタイプです。そのため、他者の話を聞く役割を担うことが多くなるでしょう。穏やかな存在感で場の空気を和らげる力があります。" },
  E: { name: "バランスタイプ", color: "#7a6a52",
    desc: "現時点では能力のバランスが取れており、周囲の大人からは「育てやすい子」と見られがちですが、外的刺激や成長過程で個性が形成され、将来、いかなる方向性にも才能が開花しうる大きな可能性を秘めたタイプです。" },
  F: { name: "フレンドリータイプ", color: "#e0782a",
    desc: "高い社交性と共感力、ポジティブ思考を備えたタイプです。周囲を巻き込む力に優れ、人と協力して成果を出す能力が際立っています。また、好奇心旺盛で「今を楽しむ」ことを最優先にする傾向があります。" },
  G: { name: "多動タイプ", color: "#d4a514",
    desc: "計画よりも即行動し、興味があることに積極的に取り組む活動的な性格です。多くの経験を積むことで、突出した能力や先見性を発揮する可能性があります。抜群の行動力を活かすことで、将来大きな成功を期待できます。" },
  H: { name: "エキスパートタイプ", color: "#1f7f95",
    desc: "8つのタイプの中で、もっとも好奇心旺盛なタイプです。興味を持った分野に対して圧倒的な集中力とモチベーションを発揮し、誰にも負けない専門的な知識を持つようになる可能性があります。" },
};
const GROUPS = Object.keys(TYPES);

// 群ごとの満点（資料どおり集計。D群は6問、E群は10問）
const MAX = Object.fromEntries(GROUPS.map(g => [g, QUESTIONS.filter(q => q.group === g).length]));

/* ---------- 保存 ---------- */
const KEY_DRAFT = "typeShindan.draft";
const KEY_HISTORY = "typeShindan.history";
const KEY_MODE = "typeShindan.mode";

function load(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* 保存できない環境でも動かす */ }
}

function newDraft(name = "") {
  return { name, answers: Array(QUESTIONS.length).fill(null), idx: 0, startedAt: Date.now() };
}
let draft = load(KEY_DRAFT, null);
if (!draft || !Array.isArray(draft.answers) || draft.answers.length !== QUESTIONS.length) draft = null;

/* ---------- 採点 ---------- */
function score(answers) {
  const cols = {};   // "A-1" → 点
  const totals = {}; // "A" → 点
  GROUPS.forEach(g => { totals[g] = 0; for (let c = 1; c <= 4; c++) cols[`${g}-${c}`] = 0; });
  QUESTIONS.forEach((q, i) => {
    if (answers[i] === true) { cols[`${q.group}-${q.col}`]++; totals[q.group]++; }
  });
  const matched = GROUPS.filter(g => totals[g] >= THRESHOLD).sort((a, b) => totals[b] - totals[a]);
  const top = Math.max(...GROUPS.map(g => totals[g]));
  const leaning = matched.length ? [] : GROUPS.filter(g => totals[g] === top && top > 0);
  return { cols, totals, matched, leaning };
}

/* ---------- 共通 ---------- */
const $app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const answeredCount = a => a.filter(v => v !== null).length;
const fmtDate = t => { const d = new Date(t); return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`; };

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(el => {
    if (!el.dataset.iconDone && ICONS[el.dataset.icon]) { el.innerHTML = ICONS[el.dataset.icon]; el.dataset.iconDone = "1"; }
  });
}
function setNav(name) {
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === name));
}
function typeChip(g, big) {
  return `<span class="tchip${big ? " big" : ""}" style="--c:${TYPES[g].color}">${g}群</span>`;
}

/* ---------- 画面: はじめに ---------- */
function viewHome() {
  setNav("home");
  const resume = draft && answeredCount(draft.answers) > 0;
  $app.innerHTML = `
  <section class="hero">
    <div class="hero-badge">全64問 ・ はい／いいえ</div>
    <h1>8タイプ診断チェック</h1>
    <p class="lead">性格・気質を8種類のタイプ（A群〜H群）のどれに該当するかを診断するテストです。64問すべてに「はい」「いいえ」で答えると、自動で欄ごと・群ごとに合計してタイプを判定します。</p>
  </section>

  <section class="panel">
    <label class="field">
      <span class="field-label"><span class="icon" data-icon="user"></span>診断する人の名前（ニックネーム可・省略可）</span>
      <input id="nameInput" type="text" maxlength="20" placeholder="例）たろう" value="${esc(draft?.name || "")}">
    </label>
    <div class="btn-row">
      ${resume ? `<button class="btn primary" id="resumeBtn">つづきから（${answeredCount(draft.answers)}/64）</button>
                  <button class="btn ghost" id="startBtn">はじめから</button>`
               : `<button class="btn primary" id="startBtn">診断をはじめる</button>`}
    </div>
  </section>

  <section class="panel">
    <h2 class="h2"><span class="icon" data-icon="info"></span>判定のしくみ</h2>
    <ol class="steps">
      <li>各質問に「はい」なら <b>1点</b>、「いいえ」なら <b>0点</b>。</li>
      <li>質問ごとに決まった欄（A-1〜H-4 の32欄）に点数を記入します。</li>
      <li>A-1〜A-4 を足して <b>A群合計</b>…というように、A群〜H群の合計を出します。</li>
      <li><b>合計が${THRESHOLD}点以上になった群</b>が「あなたのタイプ」です（複数あることもあります）。</li>
    </ol>
    <div class="type-grid">
      ${GROUPS.map(g => `<div class="type-mini" style="--c:${TYPES[g].color}">${typeChip(g)}<span>${TYPES[g].name}</span></div>`).join("")}
    </div>
    <p class="note">※ 資料の欄割りどおりに集計しています。そのため群ごとの問題数が異なり、D群は最大${MAX.D}点、E群は最大${MAX.E}点、そのほかは最大8点です。回答はこの端末のブラウザにだけ保存されます。</p>
  </section>`;
  hydrateIcons($app);

  const nameVal = () => document.getElementById("nameInput").value.trim();
  document.getElementById("startBtn").onclick = () => {
    if (resume && !confirm("途中の回答を消して、はじめからやり直しますか？")) return;
    draft = newDraft(nameVal()); save(KEY_DRAFT, draft); location.hash = "#/quiz";
  };
  const r = document.getElementById("resumeBtn");
  if (r) r.onclick = () => { draft.name = nameVal(); save(KEY_DRAFT, draft); location.hash = "#/quiz"; };
}

/* ---------- 画面: 診断（1問ずつ / 一覧） ---------- */
let mode = load(KEY_MODE, "one");

function viewQuiz() {
  setNav("quiz");
  if (!draft) { draft = newDraft(); save(KEY_DRAFT, draft); }
  const done = answeredCount(draft.answers);
  $app.innerHTML = `
  <div class="quiz-head">
    <div class="progress"><div class="progress-bar" style="width:${done / 64 * 100}%"></div></div>
    <div class="quiz-meta">
      <span><b>${done}</b> / 64 問 回答${draft.name ? ` ・ ${esc(draft.name)}さん` : ""}</span>
      <div class="seg">
        <button data-mode="one" class="${mode === "one" ? "on" : ""}"><span class="icon" data-icon="card"></span>1問ずつ</button>
        <button data-mode="list" class="${mode === "list" ? "on" : ""}"><span class="icon" data-icon="list"></span>一覧</button>
      </div>
    </div>
  </div>
  <div id="quizBody"></div>`;
  hydrateIcons($app);
  $app.querySelectorAll("[data-mode]").forEach(b => b.onclick = () => { mode = b.dataset.mode; save(KEY_MODE, mode); viewQuiz(); });
  mode === "one" ? renderOne() : renderList();
}

function answer(i, val) {
  draft.answers[i] = val;
  save(KEY_DRAFT, draft);
}
function finishIfReady() {
  const left = draft.answers.findIndex(v => v === null);
  if (left !== -1) {
    alert(`まだ答えていない質問があります（${left + 1}問目）。`);
    if (mode === "one") { draft.idx = left; save(KEY_DRAFT, draft); viewQuiz(); }
    else document.getElementById(`q${left + 1}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const rec = { id: Date.now().toString(36), name: draft.name || "", date: Date.now(), answers: draft.answers };
  const hist = load(KEY_HISTORY, []);
  hist.unshift(rec); save(KEY_HISTORY, hist);
  draft = null; localStorage.removeItem(KEY_DRAFT);
  location.hash = `#/result/${rec.id}`;
}

function renderOne() {
  const i = Math.min(Math.max(draft.idx || 0, 0), 63);
  const q = QUESTIONS[i];
  const cur = draft.answers[i];
  const page = PAGES.find(p => q.no >= p.from && q.no <= p.to);
  const body = document.getElementById("quizBody");
  body.innerHTML = `
  <article class="qcard">
    <div class="qno">Q${q.no}<span class="qpage">${page.label}</span></div>
    <p class="qtext">${esc(q.text)}</p>
    <div class="yn">
      <button class="yn-btn yes${cur === true ? " on" : ""}" data-ans="1">はい</button>
      <button class="yn-btn no${cur === false ? " on" : ""}" data-ans="0">いいえ</button>
    </div>
    <div class="qnav">
      <button class="btn ghost sm" id="prevBtn" ${i === 0 ? "disabled" : ""}><span class="icon" data-icon="chevL"></span>前へ</button>
      ${answeredCount(draft.answers) === 64
        ? `<button class="btn primary sm" id="finishBtn">結果を見る</button>`
        : `<button class="btn ghost sm" id="nextBtn" ${i === 63 ? "disabled" : ""}>次へ<span class="icon" data-icon="chevR"></span></button>`}
    </div>
  </article>
  <div class="dots" aria-label="質問一覧">
    ${QUESTIONS.map((x, k) => `<button class="dot${draft.answers[k] === true ? " y" : draft.answers[k] === false ? " n" : ""}${k === i ? " cur" : ""}" data-jump="${k}" title="Q${k + 1}">${k + 1}</button>`).join("")}
  </div>
  <p class="note center">キーボード：Y / → で「はい」、N で「いいえ」、← で前へ</p>`;
  hydrateIcons(body);

  const go = k => { draft.idx = k; save(KEY_DRAFT, draft); viewQuiz(); };
  body.querySelectorAll("[data-ans]").forEach(b => b.onclick = () => {
    answer(i, b.dataset.ans === "1");
    b.classList.add("pop");
    setTimeout(() => {
      if (answeredCount(draft.answers) === 64 && i === 63) return viewQuiz();
      const nextEmpty = draft.answers.findIndex((v, k) => k > i && v === null);
      go(i < 63 ? i + 1 : (nextEmpty === -1 ? i : nextEmpty));
    }, 160);
  });
  body.querySelectorAll("[data-jump]").forEach(b => b.onclick = () => go(+b.dataset.jump));
  document.getElementById("prevBtn").onclick = () => go(i - 1);
  const nb = document.getElementById("nextBtn"); if (nb) nb.onclick = () => go(i + 1);
  const fb = document.getElementById("finishBtn"); if (fb) fb.onclick = finishIfReady;
}

function renderList() {
  const body = document.getElementById("quizBody");
  body.innerHTML = PAGES.map(p => `
    <section class="list-page">
      <h3 class="list-page-h">${p.label}<span>Q${p.from}〜Q${p.to}</span></h3>
      ${QUESTIONS.slice(p.from - 1, p.to).map(q => {
        const v = draft.answers[q.no - 1];
        return `<div class="lrow${v === null ? "" : " done"}" id="q${q.no}">
          <span class="lno">${q.no}.</span>
          <span class="ltext">${esc(q.text)}</span>
          <span class="lyn">
            <button class="mini yes${v === true ? " on" : ""}" data-i="${q.no - 1}" data-v="1">はい</button>
            <button class="mini no${v === false ? " on" : ""}" data-i="${q.no - 1}" data-v="0">いいえ</button>
          </span>
        </div>`;
      }).join("")}
    </section>`).join("") + `
    <div class="sticky-finish"><button class="btn primary block" id="finishBtn">結果を見る</button></div>`;
  body.querySelectorAll("[data-i]").forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    answer(i, b.dataset.v === "1");
    const row = b.closest(".lrow");
    row.classList.add("done");
    row.querySelectorAll(".mini").forEach(m => m.classList.toggle("on", m === b));
    const done = answeredCount(draft.answers);
    document.querySelector(".progress-bar").style.width = `${done / 64 * 100}%`;
    document.querySelector(".quiz-meta b").textContent = done;
  });
  document.getElementById("finishBtn").onclick = finishIfReady;
}

document.addEventListener("keydown", e => {
  if (!location.hash.startsWith("#/quiz") || mode !== "one" || !draft) return;
  if (e.target.tagName === "INPUT") return;
  const k = e.key.toLowerCase();
  if (k === "y" || k === "arrowright") document.querySelector('[data-ans="1"]')?.click();
  else if (k === "n") document.querySelector('[data-ans="0"]')?.click();
  else if (k === "arrowleft") document.getElementById("prevBtn")?.click();
});

/* ---------- 画面: 結果 ---------- */
function viewResult(id) {
  setNav("history");
  const rec = load(KEY_HISTORY, []).find(r => r.id === id);
  if (!rec) { $app.innerHTML = `<section class="panel"><p>記録が見つかりませんでした。</p><a class="btn ghost" href="#/history">きろくへ</a></section>`; return; }
  const s = score(rec.answers);
  const heads = s.matched.length ? s.matched : s.leaning;

  $app.innerHTML = `
  <section class="result-hero">
    <div class="rh-meta">${rec.name ? `${esc(rec.name)}さん ・ ` : ""}${fmtDate(rec.date)}</div>
    <h1>${s.matched.length ? "あなたのタイプ" : "参考：もっとも高い群"}</h1>
    ${s.matched.length ? "" : `<p class="note">${THRESHOLD}点以上になった群はありませんでした。もっとも点数の高い群を参考として表示しています。</p>`}
    <div class="result-types">
      ${heads.map(g => `
      <article class="rtype" style="--c:${TYPES[g].color}">
        <div class="rtype-head">${typeChip(g, true)}<div><h2>${TYPES[g].name}</h2><div class="rtype-score"><b>${s.totals[g]}</b> / ${MAX[g]} 点</div></div></div>
        <p>${TYPES[g].desc}</p>
      </article>`).join("") || `<p>「はい」の回答がありませんでした。</p>`}
    </div>
  </section>

  <section class="panel">
    <h2 class="h2">群ごとの合計</h2>
    <div class="bars">
      ${GROUPS.map(g => {
        const hit = s.totals[g] >= THRESHOLD;
        return `<div class="bar-row${hit ? " hit" : ""}" style="--c:${TYPES[g].color}">
          <span class="bar-label">${typeChip(g)}<span class="bar-name">${TYPES[g].name}</span></span>
          <span class="bar-track">
            <span class="bar-fill" style="width:${s.totals[g] / 10 * 100}%"></span>
            <span class="bar-max" style="left:${MAX[g] / 10 * 100}%"></span>
            <span class="bar-th" style="left:${THRESHOLD / 10 * 100}%"></span>
          </span>
          <span class="bar-val"><b>${s.totals[g]}</b><small>/${MAX[g]}</small></span>
        </div>`;
      }).join("")}
    </div>
    <p class="note">赤い縦線＝判定ライン（${THRESHOLD}点）、グレーの目盛り＝その群の満点</p>
  </section>

  <section class="panel">
    <h2 class="h2">集計表（欄ごとの点数）</h2>
    <div class="table-wrap">
      <table class="sheet">
        <thead><tr><th>群</th><th>-1<small>60p</small></th><th>-2<small>61p</small></th><th>-3<small>62p</small></th><th>-4<small>63p</small></th><th>合計</th></tr></thead>
        <tbody>
          ${GROUPS.map(g => `<tr class="${s.totals[g] >= THRESHOLD ? "hit" : ""}">
            <th>${typeChip(g)}</th>
            ${[1, 2, 3, 4].map(c => `<td>${s.cols[`${g}-${c}`]}</td>`).join("")}
            <td class="sum">${s.totals[g]}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  </section>

  <section class="panel">
    <details>
      <summary class="h2">回答の内訳（64問）</summary>
      <div class="ans-list">
        ${QUESTIONS.map((q, i) => `<div class="ans-row">
          <span class="lno">${q.no}.</span><span class="ltext">${esc(q.text)}</span>
          <span class="ans-col">${q.group}-${q.col}</span>
          <span class="ans-v ${rec.answers[i] ? "y" : "n"}">${rec.answers[i] ? "はい" : "いいえ"}</span>
        </div>`).join("")}
      </div>
    </details>
  </section>

  <div class="btn-row center no-print">
    <button class="btn ghost" onclick="window.print()"><span class="icon" data-icon="print"></span>印刷する</button>
    <a class="btn primary" href="#/" id="againBtn"><span class="icon" data-icon="refresh"></span>もう一度診断する</a>
  </div>`;
  hydrateIcons($app);
  document.getElementById("againBtn").onclick = () => { draft = null; localStorage.removeItem(KEY_DRAFT); };
}

/* ---------- 画面: きろく ---------- */
function viewHistory() {
  setNav("history");
  const hist = load(KEY_HISTORY, []);
  $app.innerHTML = `
  <section class="panel">
    <h2 class="h2"><span class="icon" data-icon="clock"></span>診断のきろく</h2>
    ${hist.length ? `<div class="hist">
      ${hist.map(r => {
        const s = score(r.answers);
        const heads = s.matched.length ? s.matched : s.leaning;
        return `<div class="hist-row">
          <a class="hist-main" href="#/result/${r.id}">
            <div class="hist-name">${r.name ? esc(r.name) + "さん" : "（名前なし）"}<span>${fmtDate(r.date)}</span></div>
            <div class="hist-types">${heads.map(g => `${typeChip(g)}<span class="hist-tn">${TYPES[g].name}</span>`).join("")}${s.matched.length ? "" : `<span class="hist-tn muted">（参考）</span>`}</div>
          </a>
          <button class="icon-btn" data-del="${r.id}" aria-label="削除"><span class="icon" data-icon="trash"></span></button>
        </div>`;
      }).join("")}
    </div>` : `<p class="empty">まだ記録はありません。</p>`}
    <div class="btn-row"><a class="btn primary" href="#/">診断をはじめる</a></div>
  </section>`;
  hydrateIcons($app);
  $app.querySelectorAll("[data-del]").forEach(b => b.onclick = () => {
    if (!confirm("この記録を削除しますか？")) return;
    save(KEY_HISTORY, load(KEY_HISTORY, []).filter(r => r.id !== b.dataset.del));
    viewHistory();
  });
}

/* ---------- ルーター ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, "");
  const [p, arg] = h.split("/");
  window.scrollTo(0, 0);
  if (p === "quiz") viewQuiz();
  else if (p === "result") viewResult(arg);
  else if (p === "history") viewHistory();
  else viewHome();
}
window.addEventListener("hashchange", route);
hydrateIcons();
route();
