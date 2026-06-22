/* =========================================================================
   経済シミュレーター（教育用・簡易モデル）
   - 純粋な HTML / CSS / JavaScript のみ（ビルドツール・外部ライブラリなし）
   - ロジックは simulateEconomy() に集約
   - グラフは自前の SVG レンダラ（renderLineChart）で描画
   ========================================================================= */

/* ------------------------------------------------------------------ *
 *  アイコン（Lucide 風・線画 SVG。stroke="currentColor"）
 * ------------------------------------------------------------------ */
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
  factory: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l6 4V9l6 4V9l6 4v8z"/><path d="M3 21h18"/><path d="M7 17h2M11 17h2M15 17h2"/></svg>',
  landmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M4 10h16"/><path d="M12 3 4 7h16z"/><path d="M6 10v8M10 10v8M14 10v8M18 10v8"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 10l3-3 3 3M9 14l3 3 3-3"/></svg>',
  trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>',
  coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="5"/><path d="M16 8.5a5 5 0 1 1 0 9.9"/><path d="M7 16.5a5 5 0 0 0 5 4.5"/></svg>',
  debt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v10H3z"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',
  fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3-1 4-1 6a4 4 0 0 0 4 4c0-2 1-3 1-3 2 2 3 4 3 6a6 6 0 0 1-12 0c0-4 4-6 5-13z"/></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
};

/* ------------------------------------------------------------------ *
 *  型定義（JSDoc）
 * ------------------------------------------------------------------ */

/**
 * @typedef {Object} Params シミュレーションの入力パラメータ
 * @property {number}  months                 シミュレーション期間（月数）
 * @property {number}  householdInit          家計の初期資金
 * @property {number}  firmInit               企業の初期資金
 * @property {number}  govInit                政府の初期資金
 * @property {number}  bankInit               銀行の初期資金
 * @property {number}  consumptionPropensity  家計の消費性向（0〜1）
 * @property {number}  incomeTaxRate          所得税率（0〜1）
 * @property {number}  corporateTaxRate       法人税率（0〜1）
 * @property {number}  govSpending            毎月の政府支出額
 * @property {number}  wageRatio              企業の賃金支払い比率（0〜1）
 * @property {number}  bankLoan               毎月の銀行→企業 融資額
 * @property {number}  interestRate           金利（月利、0〜1）
 * @property {number}  repaymentRate          返済率（残債に対する割合、0〜1）
 * @property {number}  inflationSensitivity   インフレ感応度（需要超過への反応）
 * @property {boolean} shockEnabled           景気ショックの有無
 * @property {number}  shockMonth             景気ショック発生月
 * @property {number}  shockDrop              景気ショック時の消費減少率（0〜1）
 */

/**
 * @typedef {Object} MonthRecord 1か月分の計算結果
 * @property {number} month
 * @property {number} household
 * @property {number} firm
 * @property {number} gov
 * @property {number} bank
 * @property {number} debt
 * @property {number} consumption
 * @property {number} wages
 * @property {number} govSpending
 * @property {number} inflation     当月のインフレ率（前月比、%）
 * @property {number} priceLevel
 * @property {number} tax           当月の税収（所得税＋法人税）
 */

/**
 * @typedef {Object} Summary サマリー（最終結果）
 * @property {number} finalHousehold
 * @property {number} finalFirm
 * @property {number} finalGov
 * @property {number} finalBank
 * @property {number} finalDebt
 * @property {number} avgInflation
 * @property {number} totalConsumption
 * @property {number} totalTax
 * @property {number} totalGovSpending
 */

/**
 * @typedef {Object} SimulationResult
 * @property {MonthRecord[]} records 各月の記録
 * @property {Summary}       summary サマリー
 */

/* ------------------------------------------------------------------ *
 *  シミュレーション本体
 * ------------------------------------------------------------------ */

/**
 * 経済を月単位でシミュレートする（教育用の簡易モデル）。
 *
 * お金は「家計・企業・政府・銀行」の4主体の間を移動するだけで、
 * 全体の総量は基本的に保存される（物価水準は指数なので資金には影響しない）。
 *
 * @param {Params} p
 * @returns {SimulationResult}
 */
function simulateEconomy(p) {
  let household = p.householdInit;
  let firm = p.firmInit;
  let gov = p.govInit;
  let bank = p.bankInit;
  let debt = 0; // 企業の借金残高（最初は0）

  let priceLevel = 100; // 物価水準（インデックス、初期=100）
  let prevPrice = 100;
  let baselineDemand = 0; // 1か月目の需要を基準にする

  /** @type {MonthRecord[]} */
  const records = [];

  let totalConsumption = 0;
  let totalTax = 0;
  let totalGovSpending = 0;
  let inflationSum = 0;

  for (let m = 1; m <= p.months; m++) {
    /* 1. 家計が消費する（資金 × 消費性向） */
    let consumption = household * p.consumptionPropensity;

    //    景気ショック：発生月以降は消費を指定割合だけ減らす
    if (p.shockEnabled && m >= p.shockMonth) {
      consumption *= 1 - p.shockDrop;
    }
    //    家計の手持ち以上は使えない
    consumption = Math.min(consumption, household);
    consumption = Math.max(consumption, 0);

    /* 2 & 6. 企業売上 = 家計消費 + 政府支出 */
    const govSpending = Math.min(p.govSpending, Math.max(gov, 0));
    const sales = consumption + govSpending;

    /* 3. 賃金 = 企業売上 × 賃金支払い比率 */
    const wages = sales * p.wageRatio;

    /* 4. 家計の所得税 = 賃金 × 所得税率 */
    const incomeTax = wages * p.incomeTaxRate;

    /* 8. 利息支払い = 借金残高 × 金利 */
    const interest = debt * p.interestRate;

    /* 5. 企業利益 = 売上 - 賃金 - 利息。法人税 = max(利益,0) × 法人税率 */
    const profit = sales - wages - interest;
    const corpTax = Math.max(profit, 0) * p.corporateTaxRate;

    /* 7. 銀行融資：企業の資金と借金を増やす */
    const loan = p.bankLoan;

    /* 8. 借金返済 = 借金残高 × 返済率 */
    const repayment = debt * p.repaymentRate;

    /* 11. 各主体の資金残高を更新（すべて主体間の移動） */
    // 家計：賃金を受け取り、消費と所得税を支払う
    household += wages - consumption - incomeTax;
    // 企業：売上を受け取り、賃金・法人税・利息・返済を払い、融資を受ける
    firm += sales - wages - corpTax - interest - repayment + loan;
    // 政府：税を受け取り、公共支出を払う
    gov += incomeTax + corpTax - govSpending;
    // 銀行：融資を出し、返済と利息を受け取る
    bank += repayment + interest - loan;
    // 企業の借金残高：融資で増え、返済で減る
    debt += loan - repayment;
    if (debt < 0) debt = 0;

    /* 9. 物価水準を更新（需要が基準より大きいほど上がる簡易モデル） */
    const demand = sales;
    if (m === 1) baselineDemand = demand > 0 ? demand : 1;
    const demandGap = demand / baselineDemand - 1; // 基準需要からの乖離
    prevPrice = priceLevel;
    priceLevel = priceLevel * (1 + p.inflationSensitivity * demandGap);
    if (priceLevel < 1) priceLevel = 1;

    /* 10. インフレ率 = 物価水準の前月比（%） */
    const inflation = ((priceLevel - prevPrice) / prevPrice) * 100;

    // 集計
    const tax = incomeTax + corpTax;
    totalConsumption += consumption;
    totalTax += tax;
    totalGovSpending += govSpending;
    inflationSum += inflation;

    records.push({
      month: m,
      household,
      firm,
      gov,
      bank,
      debt,
      consumption,
      wages,
      govSpending,
      inflation,
      priceLevel,
      tax,
    });
  }

  const last = records[records.length - 1];

  /** @type {Summary} */
  const summary = {
    finalHousehold: last.household,
    finalFirm: last.firm,
    finalGov: last.gov,
    finalBank: last.bank,
    finalDebt: last.debt,
    avgInflation: records.length ? inflationSum / records.length : 0,
    totalConsumption,
    totalTax,
    totalGovSpending,
  };

  return { records, summary };
}

/* ------------------------------------------------------------------ *
 *  パラメータ定義（UI 自動生成用）
 * ------------------------------------------------------------------ */

const COLORS = {
  household: '#2563eb',
  firm: '#059669',
  gov: '#d97706',
  bank: '#7c3aed',
  debt: '#dc2626',
  inflation: '#e11d48',
  consumption: '#2563eb',
  govSpending: '#d97706',
  wages: '#059669',
  grid: '#e6e8ee',
  axis: '#9aa1ad',
};

/** @type {Params} */
const DEFAULTS = {
  months: 36,
  householdInit: 400,
  firmInit: 400,
  govInit: 2000,
  bankInit: 3000,
  consumptionPropensity: 0.3,
  incomeTaxRate: 0.12,
  corporateTaxRate: 0.2,
  govSpending: 50,
  wageRatio: 0.82,
  bankLoan: 30,
  interestRate: 0.01,
  repaymentRate: 0.05,
  inflationSensitivity: 0.4,
  shockEnabled: false,
  shockMonth: 18,
  shockDrop: 0.4,
};

/**
 * 入力フォームの定義。グループごとに表示する。
 */
const PARAM_GROUPS = [
  {
    title: 'シミュレーション設定',
    items: [
      { key: 'months', label: '期間', unit: 'か月', min: 6, max: 120, step: 1, desc: '何か月分を計算するか。' },
    ],
  },
  {
    title: '初期資金',
    items: [
      { key: 'householdInit', label: '家計の初期資金', unit: '万円', min: 0, max: 2000, step: 10, desc: '家計が最初に持っているお金。' },
      { key: 'firmInit', label: '企業の初期資金', unit: '万円', min: 0, max: 3000, step: 10, desc: '企業が最初に持っているお金。' },
      { key: 'govInit', label: '政府の初期資金', unit: '万円', min: 0, max: 5000, step: 10, desc: '政府が最初に持っているお金。' },
      { key: 'bankInit', label: '銀行の初期資金', unit: '万円', min: 0, max: 10000, step: 50, desc: '銀行が最初に持っているお金（融資の元手）。' },
    ],
  },
  {
    title: '家計・税',
    items: [
      { key: 'consumptionPropensity', label: '消費性向', unit: '', min: 0, max: 1, step: 0.01, pct: true, desc: '家計が手持ち資金のうち毎月どれだけ消費するか。' },
      { key: 'incomeTaxRate', label: '所得税率', unit: '', min: 0, max: 0.6, step: 0.01, pct: true, desc: '賃金に対してかかる税率。' },
      { key: 'corporateTaxRate', label: '法人税率', unit: '', min: 0, max: 0.6, step: 0.01, pct: true, desc: '企業の利益にかかる税率。' },
    ],
  },
  {
    title: '企業・政府',
    items: [
      { key: 'wageRatio', label: '賃金支払い比率', unit: '', min: 0, max: 1, step: 0.01, pct: true, desc: '企業が売上のうち賃金として家計に払う割合。' },
      { key: 'govSpending', label: '政府支出額', unit: '万円/月', min: 0, max: 500, step: 5, desc: '政府が毎月使う公共支出。企業の売上になる。' },
    ],
  },
  {
    title: '銀行・金融',
    items: [
      { key: 'bankLoan', label: '企業向け融資額', unit: '万円/月', min: 0, max: 300, step: 5, desc: '銀行が毎月企業に貸し出す金額。借金が増える。' },
      { key: 'interestRate', label: '金利', unit: '', min: 0, max: 0.05, step: 0.001, pct: true, desc: '借金残高にかかる月あたりの利率。' },
      { key: 'repaymentRate', label: '返済率', unit: '', min: 0, max: 0.3, step: 0.005, pct: true, desc: '毎月、借金残高のうち返済する割合。' },
    ],
  },
  {
    title: '物価・景気',
    items: [
      { key: 'inflationSensitivity', label: 'インフレ感応度', unit: '', min: 0, max: 2, step: 0.05, desc: '需要が増えたとき物価がどれだけ上がりやすいか。' },
    ],
  },
];

/* ------------------------------------------------------------------ *
 *  数値フォーマット
 * ------------------------------------------------------------------ */
function fmtMoney(n) {
  return Math.round(n).toLocaleString('ja-JP');
}
function fmtPct(n) {
  return (n * 100).toFixed(n < 0.1 && n !== 0 ? 1 : 0) + '%';
}
function fmtInfl(n) {
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}

/* ------------------------------------------------------------------ *
 *  SVG 折れ線グラフ レンダラ
 * ------------------------------------------------------------------ */

/**
 * @param {HTMLElement} el
 * @param {{labels:number[], series:{name:string,color:string,data:number[]}[], yLabel?:string, zeroLine?:boolean, valueFmt?:(n:number)=>string}} cfg
 */
function renderLineChart(el, cfg) {
  const W = 640, H = 280;
  const padL = 56, padR = 16, padT = 16, padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const allVals = cfg.series.flatMap((s) => s.data);
  let min = Math.min(...allVals);
  let max = Math.max(...allVals);
  if (cfg.zeroLine) { min = Math.min(min, 0); max = Math.max(max, 0); }
  if (min === max) { max = min + 1; min = min - 1; }
  // 少し余白
  const range = max - min;
  max += range * 0.08;
  min -= range * 0.08;

  const n = cfg.labels.length;
  const xOf = (i) => padL + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const yOf = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const fmt = cfg.valueFmt || ((v) => fmtMoney(v));

  // 横グリッド（5本）
  let gridSvg = '';
  const ticks = 5;
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    const y = yOf(v);
    gridSvg += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="${COLORS.grid}" stroke-width="1"/>`;
    gridSvg += `<text x="${padL - 8}" y="${(y + 3.5).toFixed(1)}" text-anchor="end" class="chart-tick">${fmt(v)}</text>`;
  }
  // ゼロ線を強調
  if (cfg.zeroLine && min < 0 && max > 0) {
    const yz = yOf(0);
    gridSvg += `<line x1="${padL}" y1="${yz.toFixed(1)}" x2="${W - padR}" y2="${yz.toFixed(1)}" stroke="${COLORS.axis}" stroke-width="1.2" stroke-dasharray="3 3"/>`;
  }

  // x 軸ラベル（開始・中間・終了）
  let xSvg = '';
  const xticks = [0, Math.floor((n - 1) / 2), n - 1].filter((v, i, a) => a.indexOf(v) === i);
  xticks.forEach((i) => {
    xSvg += `<text x="${xOf(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" class="chart-tick">${cfg.labels[i]}か月</text>`;
  });

  // 折れ線
  let lineSvg = '';
  cfg.series.forEach((s) => {
    const pts = s.data.map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ');
    lineSvg += `<polyline fill="none" stroke="${s.color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" points="${pts}"/>`;
  });

  // ホバー用の縦線とドット（JSで動かす）
  const hoverSvg = `<g class="chart-hover" style="display:none"><line stroke="${COLORS.axis}" stroke-width="1" stroke-dasharray="2 2"></line></g>`;

  el.innerHTML = `
    <div class="chart-legend">
      ${cfg.series.map((s) => `<span class="lg"><i style="background:${s.color}"></i>${s.name}</span>`).join('')}
    </div>
    <div class="chart-wrap">
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" class="chart-svg">
        ${gridSvg}${xSvg}${lineSvg}${hoverSvg}
        <rect x="${padL}" y="${padT}" width="${plotW}" height="${plotH}" fill="transparent" class="chart-capture"/>
      </svg>
      <div class="chart-tip" style="display:none"></div>
    </div>`;

  // ---- ホバー操作 ----
  const svg = el.querySelector('.chart-svg');
  const capture = el.querySelector('.chart-capture');
  const hover = el.querySelector('.chart-hover');
  const hoverLine = hover.querySelector('line');
  const tip = el.querySelector('.chart-tip');

  capture.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let i = Math.round(((px - padL) / plotW) * (n - 1));
    i = Math.max(0, Math.min(n - 1, i));
    const x = xOf(i);
    hover.style.display = '';
    hoverLine.setAttribute('x1', x); hoverLine.setAttribute('x2', x);
    hoverLine.setAttribute('y1', padT); hoverLine.setAttribute('y2', padT + plotH);
    // 既存ドットを消して描き直し
    hover.querySelectorAll('circle').forEach((c) => c.remove());
    cfg.series.forEach((s) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', yOf(s.data[i]));
      c.setAttribute('r', '3.2'); c.setAttribute('fill', s.color);
      c.setAttribute('stroke', '#fff'); c.setAttribute('stroke-width', '1.5');
      hover.appendChild(c);
    });
    tip.style.display = '';
    tip.innerHTML = `<div class="tip-h">${cfg.labels[i]}か月目</div>` +
      cfg.series.map((s) => `<div class="tip-r"><i style="background:${s.color}"></i><span>${s.name}</span><b>${fmt(s.data[i])}</b></div>`).join('');
    const leftPct = (x / W) * 100;
    tip.style.left = leftPct > 60 ? 'auto' : `calc(${leftPct}% + 8px)`;
    tip.style.right = leftPct > 60 ? `calc(${100 - leftPct}% + 8px)` : 'auto';
  });
  capture.addEventListener('mouseleave', () => {
    hover.style.display = 'none';
    tip.style.display = 'none';
  });
}

/* ------------------------------------------------------------------ *
 *  状態とUI構築
 * ------------------------------------------------------------------ */

/** @type {Params} */
let state = { ...DEFAULTS };

function buildControls() {
  const root = document.getElementById('controls');
  let html = '';

  PARAM_GROUPS.forEach((g) => {
    html += `<div class="ctrl-group"><h3 class="ctrl-group-title">${g.title}</h3>`;
    g.items.forEach((it) => {
      const val = state[it.key];
      const display = it.pct ? fmtPct(val) : (it.step < 1 ? val : fmtMoney(val)) + (it.unit ? ' ' + it.unit : '');
      html += `
        <div class="ctrl" data-key="${it.key}">
          <div class="ctrl-head">
            <label>${it.label}</label>
            <span class="ctrl-val">${display}</span>
          </div>
          <div class="ctrl-row">
            <input type="range" class="slider" data-key="${it.key}" min="${it.min}" max="${it.max}" step="${it.step}" value="${val}">
            <input type="number" class="num" data-key="${it.key}" min="${it.min}" max="${it.max}" step="${it.step}" value="${val}">
          </div>
          <p class="ctrl-desc">${it.desc}</p>
        </div>`;
    });
    html += `</div>`;
  });

  // 景気ショック（トグル＋連動パラメータ）
  html += `<div class="ctrl-group">
      <h3 class="ctrl-group-title">${'<span class="icon" data-icon="fire"></span>'} 景気ショック</h3>
      <div class="ctrl">
        <label class="toggle">
          <input type="checkbox" id="shockEnabled" ${state.shockEnabled ? 'checked' : ''}>
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>景気ショックを発生させる</span>
        </label>
        <p class="ctrl-desc">特定の月から家計の消費が落ち込む不況を再現します。</p>
      </div>
      <div class="ctrl" data-key="shockMonth">
        <div class="ctrl-head"><label>発生月</label><span class="ctrl-val">${state.shockMonth} か月目</span></div>
        <div class="ctrl-row">
          <input type="range" class="slider" data-key="shockMonth" min="1" max="120" step="1" value="${state.shockMonth}">
          <input type="number" class="num" data-key="shockMonth" min="1" max="120" step="1" value="${state.shockMonth}">
        </div>
        <p class="ctrl-desc">この月以降、消費が落ち込みます。</p>
      </div>
      <div class="ctrl" data-key="shockDrop">
        <div class="ctrl-head"><label>消費減少率</label><span class="ctrl-val">${fmtPct(state.shockDrop)}</span></div>
        <div class="ctrl-row">
          <input type="range" class="slider" data-key="shockDrop" min="0" max="0.9" step="0.05" value="${state.shockDrop}">
          <input type="number" class="num" data-key="shockDrop" min="0" max="0.9" step="0.05" value="${state.shockDrop}">
        </div>
        <p class="ctrl-desc">ショック時に消費をどれだけ減らすか。</p>
      </div>
    </div>`;

  // リセット
  html += `<button id="resetBtn" class="reset-btn"><span class="icon" data-icon="reset"></span>初期値に戻す</button>`;

  root.innerHTML = html;
  wireControls();
  injectIcons();
}

function setVal(key, raw, def) {
  let v = parseFloat(raw);
  if (isNaN(v)) return;
  // clamp
  const clamp = (lo, hi) => Math.max(lo, Math.min(hi, v));
  v = clamp(def.min, def.max);
  state[key] = def.step < 1 ? v : Math.round(v);
}

function findDef(key) {
  for (const g of PARAM_GROUPS) {
    const it = g.items.find((x) => x.key === key);
    if (it) return it;
  }
  // shock の補助
  if (key === 'shockMonth') return { min: 1, max: 120, step: 1, pct: false, unit: 'か月目' };
  if (key === 'shockDrop') return { min: 0, max: 0.9, step: 0.05, pct: true };
  return null;
}

function wireControls() {
  const root = document.getElementById('controls');

  root.querySelectorAll('input.slider, input.num').forEach((input) => {
    input.addEventListener('input', () => {
      const key = input.dataset.key;
      const def = findDef(key);
      if (!def) return;
      setVal(key, input.value, def);
      // 連動表示を更新
      const ctrl = root.querySelector(`.ctrl[data-key="${key}"]`);
      if (ctrl) {
        ctrl.querySelectorAll('input').forEach((i) => { i.value = state[key]; });
        const valEl = ctrl.querySelector('.ctrl-val');
        if (valEl) {
          valEl.textContent = def.pct
            ? fmtPct(state[key])
            : (def.step < 1 ? state[key] : fmtMoney(state[key])) + (def.unit ? ' ' + def.unit : '');
        }
      }
      recalc();
    });
  });

  const shock = root.querySelector('#shockEnabled');
  if (shock) {
    shock.addEventListener('change', () => {
      state.shockEnabled = shock.checked;
      recalc();
    });
  }

  const reset = root.querySelector('#resetBtn');
  if (reset) {
    reset.addEventListener('click', () => {
      state = { ...DEFAULTS };
      buildControls();
      recalc();
    });
  }
}

/* ------------------------------------------------------------------ *
 *  サマリー描画
 * ------------------------------------------------------------------ */
function renderSummary(s) {
  const cards = [
    { icon: 'home', label: '最終 家計資金', value: fmtMoney(s.finalHousehold) + ' 万円', color: COLORS.household },
    { icon: 'factory', label: '最終 企業資金', value: fmtMoney(s.finalFirm) + ' 万円', color: COLORS.firm },
    { icon: 'landmark', label: '最終 政府資金', value: fmtMoney(s.finalGov) + ' 万円', color: COLORS.gov },
    { icon: 'bank', label: '最終 銀行資金', value: fmtMoney(s.finalBank) + ' 万円', color: COLORS.bank },
    { icon: 'debt', label: '最終 企業借金', value: fmtMoney(s.finalDebt) + ' 万円', color: COLORS.debt },
    { icon: 'trend', label: '平均インフレ率', value: fmtInfl(s.avgInflation), color: COLORS.inflation },
    { icon: 'coins', label: '累計消費', value: fmtMoney(s.totalConsumption) + ' 万円', color: COLORS.consumption },
    { icon: 'coins', label: '累計税収', value: fmtMoney(s.totalTax) + ' 万円', color: COLORS.gov },
    { icon: 'landmark', label: '累計政府支出', value: fmtMoney(s.totalGovSpending) + ' 万円', color: COLORS.gov },
  ];
  document.getElementById('summary').innerHTML = cards.map((c) => `
    <div class="sum-card">
      <span class="sum-icon" style="color:${c.color}"><span class="icon" data-icon="${c.icon}"></span></span>
      <div class="sum-body">
        <div class="sum-label">${c.label}</div>
        <div class="sum-value">${c.value}</div>
      </div>
    </div>`).join('');
  injectIcons();
}

/* ------------------------------------------------------------------ *
 *  再計算 → 描画
 * ------------------------------------------------------------------ */
function recalc() {
  const { records, summary } = simulateEconomy(state);
  const labels = records.map((r) => r.month);

  renderSummary(summary);

  renderLineChart(document.getElementById('chart-funds'), {
    labels,
    zeroLine: true,
    series: [
      { name: '家計', color: COLORS.household, data: records.map((r) => r.household) },
      { name: '企業', color: COLORS.firm, data: records.map((r) => r.firm) },
      { name: '政府', color: COLORS.gov, data: records.map((r) => r.gov) },
      { name: '銀行', color: COLORS.bank, data: records.map((r) => r.bank) },
    ],
  });

  renderLineChart(document.getElementById('chart-debt'), {
    labels,
    zeroLine: true,
    series: [{ name: '企業借金残高', color: COLORS.debt, data: records.map((r) => r.debt) }],
  });

  renderLineChart(document.getElementById('chart-inflation'), {
    labels,
    zeroLine: true,
    valueFmt: (v) => v.toFixed(1) + '%',
    series: [{ name: 'インフレ率（前月比）', color: COLORS.inflation, data: records.map((r) => r.inflation) }],
  });

  renderLineChart(document.getElementById('chart-flows'), {
    labels,
    zeroLine: true,
    series: [
      { name: '家計消費', color: COLORS.consumption, data: records.map((r) => r.consumption) },
      { name: '政府支出', color: COLORS.govSpending, data: records.map((r) => r.govSpending) },
      { name: '賃金', color: COLORS.wages, data: records.map((r) => r.wages) },
    ],
  });
}

/* ------------------------------------------------------------------ *
 *  アイコン注入
 * ------------------------------------------------------------------ */
function injectIcons() {
  document.querySelectorAll('.icon[data-icon]').forEach((el) => {
    if (el.dataset.done) return;
    const name = el.dataset.icon;
    if (ICONS[name]) {
      el.innerHTML = ICONS[name];
      el.dataset.done = '1';
    }
  });
}

/* ------------------------------------------------------------------ *
 *  起動
 * ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  buildControls();
  recalc();
  injectIcons();
});
