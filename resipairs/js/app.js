// 顧客・物件管理 — 提案用デモ
// 純粋なJavaScriptのみ。データはブラウザ内（localStorage）に保持し、外部とは一切通信しない。
"use strict";

/* ------------------------------------------------------------------
 * アイコン（Lucide風の線画SVG）
 * ------------------------------------------------------------------ */
const ICONS = {
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  building: '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M4 22V4M4 4h12l-2 4 2 4H4"/></svg>',
  file: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
  folder: '<svg viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  train: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4M9 14h.01M15 14h.01"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/></svg>',
  form: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3M9 10h6M9 14h6M9 18h3"/></svg>',
  calcheck: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/></svg>',
  meeting: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 20a6 6 0 0 1 12 0M10 20a6 6 0 0 1 12 0"/></svg>',
  key: '<svg viewBox="0 0 24 24"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/></svg>',
  note: '<svg viewBox="0 0 24 24"><path d="M4 4h16v12l-4 4H4z"/><path d="M16 20v-4h4M8 9h8M8 13h5"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  thumbup: '<svg viewBox="0 0 24 24"><path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zM7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.1 21H7"/></svg>',
  concern: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>',
  ban: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8z"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16M3 12a9 9 0 0 1 15.3-6.4L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  yen: '<svg viewBox="0 0 24 24"><path d="M6 4l6 8 6-8M12 12v8M8 13h8M8 17h8"/></svg>',
  ruler: '<svg viewBox="0 0 24 24"><path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  handover: '<svg viewBox="0 0 24 24"><path d="M3 12h4l3-3 4 4 3-3h4"/><path d="M3 18h18"/></svg>',
};
function hydrateIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach((el) => {
    if (el.dataset.iconDone) return;
    const svg = ICONS[el.dataset.icon];
    if (svg) { el.innerHTML = svg; el.dataset.iconDone = "1"; }
  });
}
const ic = (name, cls = "icon") => `<span class="${cls}" data-icon="${name}" aria-hidden="true"></span>`;

/* ------------------------------------------------------------------
 * 定数（ラベル）
 * ------------------------------------------------------------------ */
const STATUSES = [
  { k: "inquiry", l: "お問い合わせ" },
  { k: "meeting", l: "面談" },
  { k: "viewing", l: "物件紹介・内見" },
  { k: "assessment", l: "査定・販売活動" },
  { k: "application", l: "申し込み" },
  { k: "contract", l: "契約" },
  { k: "hold", l: "保留" },
];
const statusLabel = (k) => (STATUSES.find((s) => s.k === k) || { l: k }).l;

const SOURCES = {
  form: { l: "フォーム", icon: "form" },
  reserve: { l: "予約", icon: "calcheck" },
  mail: { l: "メール", icon: "mail" },
  line: { l: "LINE", icon: "chat" },
  meeting: { l: "面談", icon: "meeting" },
  viewing: { l: "内見", icon: "key" },
  phone: { l: "電話", icon: "phone" },
  memo: { l: "社内メモ", icon: "note" },
};

const PSTATUS = [
  { k: "sent", l: "資料送付済み" },
  { k: "scheduled", l: "内見予定" },
  { k: "viewed", l: "内見済み" },
  { k: "considering", l: "検討中" },
  { k: "declined", l: "見送り" },
  { k: "applied", l: "申し込み" },
  { k: "contracted", l: "成約" },
];
const pstatusLabel = (k) => (PSTATUS.find((s) => s.k === k) || { l: k }).l;

const RATINGS = {
  good: { l: "おすすめ", folder: "良い物件" },
  ok: { l: "条件次第", folder: "良い物件" },
  ng: { l: "見送り推奨", folder: "ダメな物件" },
};

const RECORD_TYPES = [
  { k: "meeting_office", l: "面談（事務所）", source: "meeting" },
  { k: "meeting_online", l: "面談（オンライン）", source: "meeting" },
  { k: "viewing", l: "内見", source: "viewing" },
  { k: "phone", l: "電話", source: "phone" },
  { k: "memo", l: "その他・社内メモ", source: "memo" },
];

/* ------------------------------------------------------------------
 * ユーティリティ
 * ------------------------------------------------------------------ */
const esc = (v) => String(v == null ? "" : v)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayStr = () => ymd(new Date());
const parseDay = (s) => { const [y, m, d] = s.slice(0, 10).split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseDay(s); d.setDate(d.getDate() + n); return ymd(d); };
const diffDays = (a, b) => Math.round((parseDay(b) - parseDay(a)) / 86400000); // b - a
const WD = ["日", "月", "火", "水", "木", "金", "土"];
function fmtDate(s, withWd = true) {
  if (!s) return "—";
  const d = parseDay(s);
  const y = d.getFullYear() !== new Date().getFullYear() ? `${d.getFullYear()}/` : "";
  return `${y}${d.getMonth() + 1}/${d.getDate()}${withWd ? `(${WD[d.getDay()]})` : ""}`;
}
const fmtDateTime = (s) => (s ? `${fmtDate(s)} ${s.slice(11, 16)}` : "—");
function relDay(s) {
  const n = diffDays(todayStr(), s.slice(0, 10));
  if (n === 0) return "今日";
  if (n === -1) return "昨日";
  if (n === 1) return "明日";
  return n < 0 ? `${-n}日前` : `${n}日後`;
}
const man = (n) => (n == null || n === "" ? "—" : `${Number(n).toLocaleString("ja-JP")}万円`);
const yen = (n) => (n == null || n === "" ? "—" : `${Number(n).toLocaleString("ja-JP")}円`);
const toHalf = (s) => String(s).replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[，,]/g, "");
const nowLocal = () => { const d = new Date(); d.setMinutes(Math.floor(d.getMinutes() / 5) * 5); return `${ymd(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };

/* ------------------------------------------------------------------
 * データストア（localStorage）
 * ------------------------------------------------------------------ */
const STORE_KEY = "resipairs-demo-v1";
let S = loadState();

function shiftDates(obj, days) {
  const re = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/;
  const walk = (o) => {
    if (Array.isArray(o)) { o.forEach((v, i) => { if (typeof v === "string" && re.test(v)) o[i] = addDays(v, days) + v.slice(10); else if (v && typeof v === "object") walk(v); }); return; }
    Object.keys(o).forEach((k) => {
      const v = o[k];
      if (k === "baseDate") return;
      if (typeof v === "string" && re.test(v)) o[k] = addDays(v, days) + v.slice(10);
      else if (v && typeof v === "object") walk(v);
    });
  };
  walk(obj);
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      // 日をまたいで開いた場合も「今日の対応」が自然に見えるよう、全日付を今日基準にずらす
      const shift = diffDays(s.baseDate, todayStr());
      if (shift) { shiftDates(s, shift); s.baseDate = todayStr(); }
      s.staff = window.RP_SEED().staff; // 担当者名は保存済みデータより常に最新の定義を優先
      return s;
    }
  } catch (e) { /* 壊れていたら初期データ */ }
  return window.RP_SEED();
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* 保存不可でもデモは継続 */ } }
function resetDemo() { try { localStorage.removeItem(STORE_KEY); } catch (e) {} S = window.RP_SEED(); }
const uid = (p) => `${p}${++S.seq}`;

const getCustomer = (id) => S.customers.find((c) => c.id === id);
const getProperty = (id) => S.properties.find((p) => p.id === id);
const staffName = (id) => (S.staff.find((s) => s.id === id) || { name: "—" }).name;
const proposalsOf = (cid) => S.proposals.filter((r) => r.customerId === cid);
const proposalsFor = (pid) => S.proposals.filter((r) => r.propertyId === pid);
function lastContact(c) {
  const ts = c.history.filter((h) => h.source !== "memo").map((h) => h.at).sort();
  return ts.length ? ts[ts.length - 1] : c.createdAt;
}
const propTitle = (p) => (p.label ? `${p.label}：${p.name}` : p.name);
function dueState(due) {
  if (!due) return "none";
  const n = diffDays(todayStr(), due);
  return n < 0 ? "overdue" : n === 0 ? "today" : n <= 3 ? "soon" : "later";
}
function dueText(due) {
  if (!due) return "期限なし";
  const n = diffDays(todayStr(), due);
  if (n < 0) return `${fmtDate(due)}・${-n}日超過`;
  if (n === 0) return `${fmtDate(due)}・今日`;
  if (n === 1) return `${fmtDate(due)}・明日`;
  return `${fmtDate(due)}・あと${n}日`;
}

/* ------------------------------------------------------------------
 * 共通UI部品
 * ------------------------------------------------------------------ */
const statusPill = (k) => `<span class="pill st-${esc(k)}">${esc(statusLabel(k))}</span>`;
const typeBadge = (t) => `<span class="type type-${t}">${t === "sell" ? "売却相談" : "購入相談"}</span>`;
const sourceTag = (k) => { const s = SOURCES[k] || SOURCES.memo; return `<span class="src src-${esc(k)}">${ic(s.icon)}${esc(s.l)}</span>`; };
const pstatusPill = (k) => `<span class="pill ps-${esc(k)}">${esc(pstatusLabel(k))}</span>`;
const ratingBadge = (k, small) => `<span class="rating rating-${esc(k)}${small ? " small" : ""}">${ic(k === "ng" ? "ban" : k === "ok" ? "concern" : "star")}${esc(RATINGS[k].l)}</span>`;
const avatar = (sid) => `<span class="avatar av-${esc(sid)}" title="${esc(staffName(sid))}">${esc((S.staff.find((s) => s.id === sid) || { initial: "?" }).initial)}</span>`;
const staffOptions = (sel) => S.staff.map((s) => `<option value="${s.id}"${s.id === sel ? " selected" : ""}>${esc(s.full)}</option>`).join("");
const opt = (v, l, sel) => `<option value="${esc(v)}"${String(v) === String(sel) ? " selected" : ""}>${esc(l)}</option>`;

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.innerHTML = `${ic("check")}<span>${esc(msg)}</span>`;
  hydrateIcons(t);
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ------------------------------------------------------------------
 * モーダル
 * ------------------------------------------------------------------ */
let modalGuard = null;
function openModal({ title, sub = "", body, footer = "", size = "", onMount, guard }) {
  const root = document.getElementById("modal-root");
  root.innerHTML = `
    <div class="modal-backdrop" data-action="modal-backdrop">
      <div class="modal ${size}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-head">
          <div><h2 id="modal-title">${title}</h2>${sub ? `<p class="modal-sub">${sub}</p>` : ""}</div>
          <button class="icon-btn" data-action="modal-close" aria-label="閉じる">${ic("x")}</button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-foot">${footer}</div>` : ""}
      </div>
    </div>`;
  hydrateIcons(root);
  document.body.classList.add("modal-open");
  modalGuard = guard || null;
  const first = root.querySelector("[autofocus]") || root.querySelector(".modal");
  if (first && window.matchMedia("(min-width: 769px)").matches) first.focus({ preventScroll: true });
  if (onMount) onMount(root.querySelector(".modal"));
}
function closeModal(force) {
  if (!force && modalGuard && !modalGuard()) return;
  document.getElementById("modal-root").innerHTML = "";
  document.body.classList.remove("modal-open");
  modalGuard = null;
}
const modalEl = () => document.querySelector("#modal-root .modal");
const fval = (name) => { const el = modalEl().querySelector(`[name="${name}"]`); return el ? el.value.trim() : ""; };

/* ------------------------------------------------------------------
 * ルーター
 * ------------------------------------------------------------------ */
const app = document.getElementById("app");
let flash = null; // 保存直後にハイライトする箇所

function route() {
  const hash = location.hash.replace(/^#/, "") || "/customers";
  const parts = hash.split("/").filter(Boolean);
  closeModal(true);
  let nav = "customers";
  if (parts[0] === "customers" && parts[1]) renderCustomerDetail(parts[1]);
  else if (parts[0] === "properties" && parts[1]) { nav = "properties"; renderPropertyDetail(parts[1]); }
  else if (parts[0] === "properties") { nav = "properties"; renderPropertyList(); }
  else if (parts[0] === "about") { nav = "about"; renderAbout(); }
  else renderCustomerList();
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === nav));
  hydrateIcons(app);
  applyFlash();
}
function rerender() { const y = window.scrollY; route(); window.scrollTo(0, y); }
function go(hash) { if (location.hash === hash) rerender(); else { location.hash = hash; } }
window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });

function applyFlash() {
  if (!flash) return;
  const keys = flash.keys || [];
  let scrolled = false;
  keys.forEach((k) => {
    app.querySelectorAll(`[data-flash="${k}"]`).forEach((el) => {
      el.classList.add("flash");
      if (flash.scrollTo === k && !scrolled) { scrolled = true; setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }
    });
  });
  flash = null;
}

/* ------------------------------------------------------------------
 * 1. 顧客一覧
 * ------------------------------------------------------------------ */
const custFilter = { q: "", staff: "all", status: "all", type: "all", sort: "due" };

function renderCustomerList() {
  const today = todayStr();
  const active = S.customers.filter((c) => c.next && c.next.due);
  const todays = active.filter((c) => c.next.due === today);
  const overdue = active.filter((c) => c.next.due < today).sort((a, b) => a.next.due.localeCompare(b.next.due));
  const miniItem = (c) => `
    <li><a class="mini-item" href="#/customers/${c.id}">
      <span class="mini-name">${esc(c.name)} 様</span>
      <span class="mini-task">${esc(c.next.text)}</span>
      <span class="mini-meta">${avatar(c.next.staff || c.staff)}${c.next.due < today ? `<span class="due due-overdue">${diffDays(c.next.due, today)}日超過</span>` : ""}${ic("chevron", "icon chev")}</span>
    </a></li>`;

  app.innerHTML = `
    <div class="page">
      <div class="page-head">
        <div>
          <h1>顧客一覧</h1>
          <p class="page-sub">お問い合わせから契約まで、顧客ごとの状況と次の対応をまとめて確認できます。</p>
        </div>
        <button class="btn btn-primary" data-action="new-customer">${ic("plus")}顧客を登録</button>
      </div>

      <section class="todo-strip" aria-label="今日の対応と期限切れ">
        <div class="todo-box todo-today">
          <h2>${ic("calendar")}今日の対応 <span class="count">${todays.length}</span></h2>
          ${todays.length ? `<ul class="mini-list">${todays.map(miniItem).join("")}</ul>` : `<p class="empty-s">今日が期限の対応はありません</p>`}
        </div>
        <div class="todo-box todo-overdue">
          <h2>${ic("alert")}期限を過ぎた対応 <span class="count">${overdue.length}</span></h2>
          ${overdue.length ? `<ul class="mini-list">${overdue.map(miniItem).join("")}</ul>` : `<p class="empty-s">期限切れの対応はありません</p>`}
        </div>
      </section>

      <section class="card list-card">
        <div class="filters">
          <label class="search">${ic("search")}<input type="search" id="c-q" placeholder="顧客名・ふりがな・エリア・メモで検索" value="${esc(custFilter.q)}" aria-label="顧客を検索"></label>
          <div class="filter-row">
            <div class="chipset" role="group" aria-label="担当者">
              <span class="chip-label">担当</span>
              ${[["all", "全員"], ...S.staff.map((s) => [s.id, s.name])].map(([k, l]) => `<button class="chip${custFilter.staff === k ? " on" : ""}" data-action="cf" data-key="staff" data-val="${k}">${esc(l)}</button>`).join("")}
            </div>
            <div class="selects">
              <label class="sel"><span>種別</span><select id="c-type">${opt("all", "すべて", custFilter.type)}${opt("buy", "購入相談", custFilter.type)}${opt("sell", "売却相談", custFilter.type)}</select></label>
              <label class="sel"><span>並び順</span><select id="c-sort">${opt("due", "期限が近い順", custFilter.sort)}${opt("contact", "最終連絡が新しい順", custFilter.sort)}</select></label>
            </div>
          </div>
          <div class="status-tabs" role="group" aria-label="状況で絞り込み">
            ${[{ k: "all", l: "すべて" }, ...STATUSES].map((s) => {
              const n = s.k === "all" ? S.customers.length : S.customers.filter((c) => c.status === s.k).length;
              return `<button class="stab${custFilter.status === s.k ? " on" : ""}" data-action="cf" data-key="status" data-val="${s.k}">${esc(s.l)}<span>${n}</span></button>`;
            }).join("")}
          </div>
        </div>
        <div id="c-results"></div>
      </section>
    </div>`;
  renderCustomerRows();
  const q = document.getElementById("c-q");
  q.addEventListener("input", () => { custFilter.q = q.value; renderCustomerRows(); });
  [["c-type", "type"], ["c-sort", "sort"]].forEach(([id, key]) => {
    document.getElementById(id).addEventListener("change", (e) => { custFilter[key] = e.target.value; renderCustomerRows(); });
  });
}

function renderCustomerRows() {
  const box = document.getElementById("c-results");
  if (!box) return;
  const q = custFilter.q.trim().toLowerCase();
  let rows = S.customers.filter((c) => {
    if (custFilter.staff !== "all" && c.staff !== custFilter.staff) return false;
    if (custFilter.status !== "all" && c.status !== custFilter.status) return false;
    if (custFilter.type !== "all" && c.type !== custFilter.type) return false;
    if (q) {
      const hay = [c.name, c.kana, c.wants && c.wants.area, c.sale && c.sale.name, c.next && c.next.text, ...c.history.map((h) => h.body)].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  rows.sort((a, b) => custFilter.sort === "contact"
    ? lastContact(b).localeCompare(lastContact(a))
    : ((a.next && a.next.due) || "9999").localeCompare((b.next && b.next.due) || "9999"));

  box.innerHTML = `
    <div class="result-meta">${rows.length}件 / 全${S.customers.length}件</div>
    ${rows.length ? `
    <div class="ctable" role="table" aria-label="顧客一覧">
      <div class="ct-head" role="row">
        <span role="columnheader">顧客名</span><span role="columnheader">相談種別</span><span role="columnheader">担当</span>
        <span role="columnheader">現在の状況</span><span role="columnheader">最終連絡日</span><span role="columnheader">次の対応・期限</span>
      </div>
      ${rows.map((c) => {
        const lc = lastContact(c);
        const ds = c.next ? dueState(c.next.due) : "none";
        return `
        <a class="ct-row" role="row" href="#/customers/${c.id}" data-flash="row-${c.id}">
          <span class="ct-name" role="cell"><strong>${esc(c.name)} 様</strong><small>${esc(c.kana)}</small></span>
          <span class="ct-type" role="cell">${typeBadge(c.type)}</span>
          <span class="ct-staff" role="cell">${avatar(c.staff)}<span>${esc(staffName(c.staff))}</span></span>
          <span class="ct-status" role="cell">${statusPill(c.status)}</span>
          <span class="ct-contact" role="cell"><span class="m-label">最終連絡</span>${fmtDate(lc)}<small>${relDay(lc)}</small></span>
          <span class="ct-next" role="cell">${c.next
            ? `<span class="next-text">${esc(c.next.text)}</span><span class="due due-${ds}">${ic(ds === "overdue" ? "alert" : "clock")}${esc(dueText(c.next.due))}</span>`
            : `<span class="muted">次の対応は未設定</span>`}</span>
          ${ic("chevron", "icon ct-chev")}
        </a>`;
      }).join("")}
    </div>` : `<div class="empty">${ic("search")}<p>条件に合う顧客が見つかりません。</p><button class="btn btn-ghost" data-action="cf-clear">絞り込みを解除</button></div>`}`;
  hydrateIcons(box);
}

/* ------------------------------------------------------------------
 * 2. 顧客詳細
 * ------------------------------------------------------------------ */
let histFilter = "all";
let histFilterCustomer = null;

function renderCustomerDetail(id) {
  const c = getCustomer(id);
  if (!c) { app.innerHTML = notFound("顧客が見つかりません", "#/customers", "顧客一覧へ戻る"); return; }
  if (histFilterCustomer !== id) { histFilter = "all"; histFilterCustomer = id; }
  const isBuy = c.type === "buy";
  const props = proposalsOf(c.id).sort((a, b) => b.date.localeCompare(a.date));

  app.innerHTML = `
    <div class="page">
      <a class="backlink" href="#/customers">${ic("back")}顧客一覧</a>

      <section class="card cust-head">
        <div class="ch-main">
          <div class="ch-title">
            <h1>${esc(c.name)} 様</h1>
            ${typeBadge(c.type)}
          </div>
          <p class="ch-kana">${esc(c.kana)}・登録 ${fmtDate(c.createdAt)}（最初の入口：${esc((SOURCES[c.firstSource] || SOURCES.memo).l)}）</p>
          <div class="ch-controls">
            <label class="ctrl"><span>現在の状況</span>
              <select data-change="status" data-id="${c.id}" class="st-select st-${esc(c.status)}">${STATUSES.map((s) => opt(s.k, s.l, c.status)).join("")}</select>
            </label>
            <label class="ctrl"><span>担当者</span>
              <select data-change="staff" data-id="${c.id}">${staffOptions(c.staff)}</select>
            </label>
            <div class="ctrl ctrl-flow"><span>進め方</span><span class="flow-note">状況は順番通りでなくても自由に変更できます</span></div>
          </div>
        </div>
        <div class="ch-actions">
          <button class="btn btn-primary btn-lg" data-action="record" data-id="${c.id}">${ic("edit")}面談・内見を記録</button>
          <button class="btn btn-ghost" data-action="add-history" data-id="${c.id}">${ic("plus")}連絡を転記</button>
        </div>
      </section>

      <div class="detail-grid">
        <div class="col col-side">
          ${nextCard(c)}
          ${isBuy ? wantsCard(c) : saleCard(c)}
          ${basicCard(c)}
        </div>
        <div class="col col-main">
          ${isBuy ? proposalsSection(c, props) : saleActivity(c)}
          ${historySection(c)}
        </div>
      </div>
    </div>`;
}

function nextCard(c) {
  const n = c.next;
  const ds = n ? dueState(n.due) : "none";
  return `
  <section class="card next-card next-${ds}" data-flash="next" style="order:1">
    <div class="card-head">
      <h2>${ic("flag")}次の対応</h2>
      <button class="btn btn-text" data-action="edit-next" data-id="${c.id}">${ic("edit")}編集</button>
    </div>
    ${n ? `
      <p class="next-main">${esc(n.text)}</p>
      <div class="next-meta">
        <span class="due due-${ds}">${ic(ds === "overdue" ? "alert" : "clock")}期限 ${esc(dueText(n.due))}</span>
        <span class="next-staff">${avatar(n.staff || c.staff)}${esc(staffName(n.staff || c.staff))}</span>
      </div>
      <button class="btn btn-ghost btn-sm" data-action="done-next" data-id="${c.id}">${ic("check")}対応済みにする</button>
    ` : `
      <p class="muted">次の対応は未設定です。</p>
      <button class="btn btn-ghost btn-sm" data-action="edit-next" data-id="${c.id}">${ic("plus")}次の対応を設定</button>
    `}
  </section>`;
}

function wantsCard(c) {
  const w = c.wants;
  const row = (icon, label, val) => `<div class="kv"><dt>${ic(icon)}${label}</dt><dd>${val}</dd></div>`;
  return `
  <section class="card" data-flash="wants" style="order:2">
    <div class="card-head">
      <h2>${ic("home")}希望条件</h2>
      <button class="btn btn-text" data-action="edit-wants" data-id="${c.id}">${ic("edit")}編集</button>
    </div>
    <dl class="kvs">
      ${row("pin", "エリア", esc(w.area || "—"))}
      ${row("yen", "予算", `${man(w.budget)}${w.budget ? "まで" : ""}`)}
      ${row("list", "間取り", esc(w.layout || "—"))}
      ${row("ruler", "広さ", w.size ? `${esc(w.size)}㎡以上` : "—")}
      ${row("train", "駅徒歩", w.walk ? `${esc(w.walk)}分以内` : "—")}
    </dl>
    <div class="prio">
      <h3>重視する点（優先順）</h3>
      ${w.priorities.length ? `<ol>${w.priorities.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>` : `<p class="muted">未設定</p>`}
    </div>
    ${w.other ? `<p class="wants-other">${esc(w.other)}</p>` : ""}
  </section>`;
}

function saleCard(c) {
  const s = c.sale;
  const row = (label, val) => `<div class="kv"><dt>${label}</dt><dd>${val}</dd></div>`;
  return `
  <section class="card" data-flash="wants" style="order:2">
    <div class="card-head">
      <h2>${ic("home")}売却希望物件</h2>
      <button class="btn btn-text" data-action="edit-sale" data-id="${c.id}">${ic("edit")}編集</button>
    </div>
    <p class="sale-name">${esc(s.name)}</p>
    <dl class="kvs">
      ${row("所在地", esc(s.address))}
      ${row("間取り・広さ", `${esc(s.layout)}・${esc(s.size)}㎡`)}
      ${row("築年・階数", `${esc(s.built)}年築・${esc(s.floor)}`)}
      ${row("売却希望価格", s.desiredPrice ? man(s.desiredPrice) : "未定")}
      ${row("希望時期", esc(s.timing))}
      ${row("売却理由", esc(s.reason))}
      ${row("ローン", esc(s.loan))}
      ${row("現況", esc(s.occupancy))}
    </dl>
  </section>`;
}

function basicCard(c) {
  return `
  <section class="card" style="order:5">
    <div class="card-head"><h2>${ic("user")}基本情報</h2></div>
    <dl class="kvs">
      <div class="kv"><dt>${ic("phone")}電話</dt><dd>${esc(c.phone)}</dd></div>
      <div class="kv"><dt>${ic("mail")}メール</dt><dd class="break">${esc(c.email)}</dd></div>
      <div class="kv"><dt>${ic("chat")}LINE</dt><dd>${esc(c.line)}</dd></div>
      <div class="kv"><dt>${ic("users")}ご家族</dt><dd>${esc(c.household)}</dd></div>
    </dl>
  </section>`;
}

function proposalsSection(c, props) {
  return `
  <section class="card" style="order:3">
    <div class="card-head">
      <h2>${ic("building")}紹介した物件と反応 <span class="count">${props.length}</span></h2>
      <button class="btn btn-ghost btn-sm" data-action="add-proposal" data-id="${c.id}">${ic("plus")}物件を紹介</button>
    </div>
    <p class="hint">ここに記録するのは「この顧客の反応」です。会社としての物件評価は物件ごとに別管理しており、見送っても変わりません。</p>
    ${props.length ? `<div class="prop-list">${props.map((r) => proposalCard(r)).join("")}</div>`
      : `<div class="empty small"><p>まだ紹介した物件はありません。</p></div>`}
  </section>`;
}

function proposalCard(r) {
  const p = getProperty(r.propertyId);
  if (!p) return "";
  const line = (icon, cls, label, text) => text ? `<div class="react ${cls}"><dt>${ic(icon)}${label}</dt><dd>${esc(text)}</dd></div>` : "";
  return `
  <article class="prop-card pc-${esc(r.status)}" data-flash="proposal-${r.id}">
    <div class="pc-top">
      <a class="pc-name" href="#/properties/${p.id}">${esc(propTitle(p))}${ic("chevron")}</a>
      ${pstatusPill(r.status)}
    </div>
    <p class="pc-meta">${esc(p.station)}駅 徒歩${p.walk}分・${man(p.price)}・${esc(p.layout)} ${p.size}㎡・${esc(p.direction)}向き</p>
    <p class="pc-sub">紹介日 ${fmtDate(r.date)}　<span class="pc-company">会社評価 ${ratingBadge(p.rating, true)}</span></p>
    <dl class="reacts">
      ${line("thumbup", "good", "好評だった点", r.liked)}
      ${line("concern", "bad", "気になった点", r.concerns)}
      ${r.status === "declined" ? line("ban", "reason", "見送り理由", r.reason || "（未記入）") : ""}
    </dl>
    ${!r.liked && !r.concerns ? `<p class="muted small">まだ反応は記録されていません。</p>` : ""}
    <div class="pc-actions">
      <button class="btn btn-ghost btn-sm" data-action="edit-reaction" data-id="${r.id}">${ic("edit")}反応を記録</button>
      <a class="btn btn-text btn-sm" href="#/properties/${p.id}">${ic("file")}物件詳細・資料</a>
    </div>
  </article>`;
}

function saleActivity(c) {
  // 売却相談：購入相談とは別に、売却の進め方を表示
  const steps = [
    { k: "inquiry", l: "ご相談受付" }, { k: "meeting", l: "面談・訪問査定" }, { k: "assessment", l: "査定書提出・販売活動" },
    { k: "application", l: "購入申込の受付" }, { k: "contract", l: "売買契約" },
  ];
  const idx = steps.findIndex((s) => s.k === c.status);
  return `
  <section class="card" style="order:3">
    <div class="card-head"><h2>${ic("list")}売却の進み具合</h2></div>
    <ol class="steps">
      ${steps.map((s, i) => `<li class="${i < idx ? "done" : i === idx ? "cur" : ""}"><span class="dot">${i < idx ? ic("check") : i + 1}</span>${esc(s.l)}</li>`).join("")}
    </ol>
    ${c.status === "hold" ? `<p class="hint">現在は「保留」です。</p>` : ""}
    <p class="hint">売却相談では、紹介物件の代わりに売却希望物件・査定・販売活動の記録を中心に表示します。</p>
  </section>`;
}

function historySection(c) {
  // LINEなどのチャットと同じく、古い順に並べて最新を一番下に表示する
  const hs = [...c.history].sort((a, b) => a.at.localeCompare(b.at));
  const used = Object.keys(SOURCES).filter((k) => hs.some((h) => h.source === k));
  const shown = histFilter === "all" ? hs : hs.filter((h) => h.source === histFilter);
  return `
  <section class="card" style="order:4">
    <div class="card-head">
      <h2>${ic("clock")}相談・対応履歴 <span class="count">${hs.length}</span></h2>
      ${shown.length > 3 ? `<button class="btn btn-text btn-sm" data-action="hist-latest">最新へ${ic("chevron", "icon rot90")}</button>` : ""}
    </div>
    <div class="chipset src-filter" role="group" aria-label="情報源で絞り込み">
      <button class="chip${histFilter === "all" ? " on" : ""}" data-action="hf" data-val="all">すべて</button>
      ${used.map((k) => `<button class="chip${histFilter === k ? " on" : ""}" data-action="hf" data-val="${k}">${esc(SOURCES[k].l)} <span>${hs.filter((h) => h.source === k).length}</span></button>`).join("")}
    </div>
    <p class="hint">フォーム・予約・メール・LINEの内容は、担当者が転記した想定です（このデモでは自動取り込みは行いません）。古い順に表示し、最新は一番下です。</p>
    <ol class="timeline">
      ${shown.map((h) => {
        const p = h.propertyId ? getProperty(h.propertyId) : null;
        return `
        <li class="tl-item tl-${esc(h.source)}" data-flash="hist-${h.id}">
          <div class="tl-dot">${ic((SOURCES[h.source] || SOURCES.memo).icon)}</div>
          <div class="tl-body">
            <div class="tl-head">
              ${sourceTag(h.source)}
              <span class="tl-title">${esc(h.title)}</span>
              <span class="tl-when">${fmtDateTime(h.at)}・${esc(staffName(h.staff))}</span>
            </div>
            <p class="tl-text">${esc(h.body)}</p>
            ${p ? `<a class="tl-prop" href="#/properties/${p.id}">${ic("building")}${esc(propTitle(p))}</a>` : ""}
            ${h.applied && h.applied.length ? `<div class="tl-applied"><span>${ic("check")}反映した内容</span><ul>${h.applied.map((a) => `<li>${esc(a)}</li>`).join("")}</ul></div>` : ""}
          </div>
        </li>`;
      }).join("")}
    </ol>
  </section>`;
}

/* ------------------------------------------------------------------
 * 3. 物件一覧・物件詳細
 * ------------------------------------------------------------------ */
const propFilter = { q: "", station: "all", price: "all", rating: "all", layout: "all" };

function renderPropertyList() {
  const stations = [...new Set(S.properties.map((p) => p.station))];
  app.innerHTML = `
    <div class="page">
      <div class="page-head">
        <div>
          <h1>物件一覧</h1>
          <p class="page-sub">会社としての評価と、紹介した顧客の反応を分けて管理します。</p>
        </div>
        <button class="btn btn-primary" data-action="new-property">${ic("plus")}物件を登録</button>
      </div>
      <section class="card list-card">
        <div class="filters">
          <label class="search">${ic("search")}<input type="search" id="p-q" placeholder="物件名・エリア・駅名・特徴で検索" value="${esc(propFilter.q)}" aria-label="物件を検索"></label>
          <div class="filter-row">
            <div class="chipset" role="group" aria-label="会社としての評価">
              <span class="chip-label">会社評価</span>
              ${[["all", "すべて"], ["good", "おすすめ"], ["ok", "条件次第"], ["ng", "見送り推奨"]].map(([k, l]) => `<button class="chip${propFilter.rating === k ? " on" : ""}" data-action="pf" data-key="rating" data-val="${k}">${esc(l)}</button>`).join("")}
            </div>
            <div class="selects">
              <label class="sel"><span>エリア・駅</span><select id="p-station">${opt("all", "すべて", propFilter.station)}${stations.map((s) => opt(s, `${s}駅`, propFilter.station)).join("")}</select></label>
              <label class="sel"><span>価格</span><select id="p-price">${opt("all", "すべて", propFilter.price)}${opt("4000", "4,000万円以下", propFilter.price)}${opt("5000", "5,000万円以下", propFilter.price)}${opt("6000", "6,000万円以下", propFilter.price)}</select></label>
              <label class="sel"><span>間取り</span><select id="p-layout">${opt("all", "すべて", propFilter.layout)}${opt("2", "2部屋以上", propFilter.layout)}${opt("3", "3部屋以上", propFilter.layout)}</select></label>
            </div>
          </div>
        </div>
        <div id="p-results"></div>
      </section>
    </div>`;
  renderPropertyRows();
  const q = document.getElementById("p-q");
  q.addEventListener("input", () => { propFilter.q = q.value; renderPropertyRows(); });
  [["p-station", "station"], ["p-price", "price"], ["p-layout", "layout"]].forEach(([id, key]) => {
    document.getElementById(id).addEventListener("change", (e) => { propFilter[key] = e.target.value; renderPropertyRows(); });
  });
}
const rooms = (layout) => { const m = String(layout).match(/(\d)/); return m ? Number(m[1]) : 0; };

function renderPropertyRows() {
  const box = document.getElementById("p-results");
  if (!box) return;
  const q = propFilter.q.trim().toLowerCase();
  const rows = S.properties.filter((p) => {
    if (propFilter.rating !== "all" && p.rating !== propFilter.rating) return false;
    if (propFilter.station !== "all" && p.station !== propFilter.station) return false;
    if (propFilter.price !== "all" && p.price > Number(propFilter.price)) return false;
    if (propFilter.layout !== "all" && rooms(p.layout) < Number(propFilter.layout)) return false;
    if (q) {
      const hay = [p.label, p.name, p.area, p.station, p.line, p.layout, p.direction, p.ratingReason, ...p.features].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  box.innerHTML = `
    <div class="result-meta">${rows.length}件 / 全${S.properties.length}件</div>
    ${rows.length ? `<div class="pgrid">${rows.map((p) => {
      const rs = proposalsFor(p.id);
      const counts = {};
      rs.forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1; });
      return `
      <a class="pcard" href="#/properties/${p.id}">
        <div class="pcard-top">
          ${ratingBadge(p.rating)}
          <span class="sales sales-${p.sales === "成約済み" ? "done" : p.sales === "申込あり" ? "app" : "on"}">${esc(p.sales)}</span>
        </div>
        <h3>${p.label ? `<span class="plabel">${esc(p.label)}</span>` : ""}${esc(p.name)}</h3>
        <p class="pcard-loc">${ic("train")}${esc(p.line)}「${esc(p.station)}」駅 徒歩${p.walk}分・${esc(p.area)}</p>
        <div class="pcard-price"><strong>${Number(p.price).toLocaleString("ja-JP")}</strong>万円<span>${esc(p.layout)}・${p.size}㎡・${esc(p.direction)}向き・${p.built}年築</span></div>
        <p class="pcard-reason">${esc(p.ratingReason)}</p>
        <div class="pcard-foot">
          <span>${ic("file")}資料 3件</span>
          <span>${ic("users")}紹介 ${rs.length}名${rs.length ? `（${Object.entries(counts).map(([k, n]) => `${pstatusLabel(k)}${n}`).join("・")}）` : ""}</span>
        </div>
      </a>`;
    }).join("")}</div>` : `<div class="empty">${ic("search")}<p>条件に合う物件が見つかりません。</p><button class="btn btn-ghost" data-action="pf-clear">絞り込みを解除</button></div>`}`;
  hydrateIcons(box);
}

const DOCS = [
  { k: "flyer", t: "販売図面" },
  { k: "mgmt", t: "管理・修繕に関する資料（抜粋）" },
  { k: "area", t: "周辺環境・現地確認メモ" },
];

function renderPropertyDetail(id) {
  const p = getProperty(id);
  if (!p) { app.innerHTML = notFound("物件が見つかりません", "#/properties", "物件一覧へ戻る"); return; }
  const rs = proposalsFor(p.id).sort((a, b) => b.date.localeCompare(a.date));
  const spec = (l, v) => `<div class="kv"><dt>${l}</dt><dd>${v}</dd></div>`;
  app.innerHTML = `
    <div class="page">
      <a class="backlink" href="#/properties">${ic("back")}物件一覧</a>
      <section class="card prop-head" data-flash="prop-head">
        <div>
          <div class="ph-tags"><span class="sales sales-${p.sales === "成約済み" ? "done" : p.sales === "申込あり" ? "app" : "on"}">${esc(p.sales)}</span>${p.features.map((f) => `<span class="feat">${esc(f)}</span>`).join("")}</div>
          <h1>${p.label ? `<span class="plabel">${esc(p.label)}</span>` : ""}${esc(p.name)}</h1>
          <p class="ph-loc">${ic("pin")}${esc(p.area)}　${ic("train")}${esc(p.line)}「${esc(p.station)}」駅 徒歩${p.walk}分</p>
        </div>
        <div class="ph-price"><strong>${Number(p.price).toLocaleString("ja-JP")}</strong>万円<span>${esc(p.layout)}・${p.size}㎡</span></div>
      </section>

      <div class="detail-grid prop-grid">
        <div class="col col-side">
          <section class="card rating-card rating-card-${esc(p.rating)}" data-flash="rating" style="order:1">
            <div class="card-head">
              <h2>${ic("star")}会社としての評価</h2>
              <button class="btn btn-text" data-action="edit-rating" data-id="${p.id}">${ic("edit")}編集</button>
            </div>
            <div class="rating-big">${ratingBadge(p.rating)}</div>
            <p class="rating-reason">${esc(p.ratingReason)}</p>
            <p class="muted small">${fmtDate(p.ratingAt)} 更新・${esc(staffName(p.ratingBy))}</p>
            <p class="hint">顧客ごとの反応とは別に管理しています。ある顧客が見送っても、この評価は自動では変わりません。</p>
          </section>
          <section class="card" style="order:3">
            <div class="card-head">
              <h2>${ic("list")}物件概要</h2>
              <button class="btn btn-text" data-action="edit-property" data-id="${p.id}">${ic("edit")}編集</button>
            </div>
            <dl class="kvs">
              ${spec("価格", man(p.price))}
              ${spec("間取り", esc(p.layout))}
              ${spec("専有面積", `${p.size}㎡`)}
              ${spec("所在階", esc(p.floor))}
              ${spec("向き", `${esc(p.direction)}向き`)}
              ${spec("築年", `${p.built}年`)}
              ${spec("管理費", `${yen(p.mgmtFee)}/月`)}
              ${spec("修繕積立金", `${yen(p.repairFee)}/月`)}
              ${spec("積立金の改定", esc(p.repairNote))}
              ${spec("ペット", esc(p.pet))}
            </dl>
          </section>
        </div>
        <div class="col col-main">
          <section class="card" style="order:2">
            <div class="card-head"><h2>${ic("folder")}資料</h2></div>
            <p class="drive-path">${ic("folder")}物件資料 / ${esc(p.folder)} / ${esc(p.name)}</p>
            <ul class="docs">
              ${DOCS.map((d) => `
                <li><button class="doc-btn" data-action="open-doc" data-id="${p.id}" data-doc="${d.k}">
                  <span class="doc-ic">${ic("file")}</span>
                  <span class="doc-t"><strong>${esc(d.t)}</strong><small>${esc(p.name)}_${esc(d.t.replace(/[（）・]/g, ""))}.pdf・サンプル</small></span>
                  <span class="doc-open">開く${ic("chevron")}</span>
                </button></li>`).join("")}
            </ul>
            <p class="hint">Googleドライブの既存資料を参照する想定のイメージです。デモではサンプル資料を表示します（ドライブとは接続していません）。</p>
          </section>
          <section class="card" style="order:4">
            <div class="card-head">
              <h2>${ic("users")}この物件を紹介した顧客と反応 <span class="count">${rs.length}</span></h2>
              <button class="btn btn-ghost btn-sm" data-action="propose-from-property" data-id="${p.id}">${ic("plus")}顧客に紹介</button>
            </div>
            ${rs.length ? `<div class="who-list">${rs.map((r) => {
              const c = getCustomer(r.customerId);
              if (!c) return "";
              return `
              <article class="who pc-${esc(r.status)}">
                <div class="who-top">
                  <a class="who-name" href="#/customers/${c.id}">${esc(c.name)} 様${ic("chevron")}</a>
                  ${pstatusPill(r.status)}
                </div>
                <p class="muted small">紹介日 ${fmtDate(r.date)}・担当 ${esc(staffName(c.staff))}・顧客の状況 ${esc(statusLabel(c.status))}</p>
                <dl class="reacts">
                  ${r.liked ? `<div class="react good"><dt>${ic("thumbup")}好評</dt><dd>${esc(r.liked)}</dd></div>` : ""}
                  ${r.concerns ? `<div class="react bad"><dt>${ic("concern")}気になる点</dt><dd>${esc(r.concerns)}</dd></div>` : ""}
                  ${r.status === "declined" ? `<div class="react reason"><dt>${ic("ban")}見送り理由</dt><dd>${esc(r.reason || "（未記入）")}</dd></div>` : ""}
                </dl>
              </article>`;
            }).join("")}</div>` : `<div class="empty small"><p>まだどの顧客にも紹介していません。</p></div>`}
          </section>
        </div>
      </div>
    </div>`;
}

/* ------------------------------------------------------------------
 * サンプル資料ビューア（Googleドライブ参照のイメージ）
 * ------------------------------------------------------------------ */
function floorPlanSvg(p) {
  const n = Math.max(1, rooms(p.layout));
  const hasS = /\+S/.test(p.layout);
  const rows = n + (hasS ? 1 : 0);
  const h = 220, roomH = h / rows;
  let rects = "";
  for (let i = 0; i < rows; i++) {
    const label = hasS && i === rows - 1 ? "サービスルーム" : `洋室${i + 1}`;
    rects += `<rect x="20" y="${20 + i * roomH}" width="120" height="${roomH}" /><text x="80" y="${20 + i * roomH + roomH / 2 + 5}">${label}</text>`;
  }
  return `<svg class="plan" viewBox="0 0 400 300" role="img" aria-label="間取り図のイメージ">
    <g class="walls">${rects}
      <rect x="140" y="20" width="240" height="140" /><text x="260" y="95">LDK</text>
      <rect x="140" y="160" width="80" height="80" /><text x="180" y="205">浴室</text>
      <rect x="220" y="160" width="70" height="80" /><text x="255" y="205">洗面</text>
      <rect x="290" y="160" width="90" height="80" /><text x="335" y="205">玄関</text>
    </g>
    <rect class="balc" x="140" y="2" width="240" height="16" /><text class="small-t" x="260" y="14">バルコニー（${esc(p.direction)}向き）</text>
    <text class="small-t" x="20" y="275">※ 間取り図はデモ用のイメージです</text>
  </svg>`;
}

function docContent(p, k) {
  const rows = (arr) => `<table class="doc-table">${arr.map(([a, b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join("")}</table>`;
  if (k === "flyer") {
    return `
      <div class="paper-head"><span class="paper-kind">販売図面</span><h3>${esc(p.name)}</h3><p class="paper-price">${man(p.price)}</p></div>
      <div class="paper-cols">
        <div>${floorPlanSvg(p)}</div>
        <div>${rows([
          ["所在地", esc(p.area)], ["交通", `${esc(p.line)}「${esc(p.station)}」駅 徒歩${p.walk}分`],
          ["間取り", esc(p.layout)], ["専有面積", `${p.size}㎡`], ["所在階", esc(p.floor)],
          ["向き", `${esc(p.direction)}`], ["築年", `${p.built}年`], ["管理費", `${yen(p.mgmtFee)}/月`],
          ["修繕積立金", `${yen(p.repairFee)}/月`], ["ペット", esc(p.pet)],
        ])}
        <ul class="paper-points">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
      </div>`;
  }
  if (k === "mgmt") {
    const total = (p.mgmtFee || 0) + (p.repairFee || 0);
    return `
      <div class="paper-head"><span class="paper-kind">管理に係る調査報告（抜粋）</span><h3>${esc(p.name)}</h3></div>
      ${rows([
        ["管理費", `${yen(p.mgmtFee)} / 月`], ["修繕積立金", `${yen(p.repairFee)} / 月`],
        ["月々の合計", `<strong>${yen(total)} / 月</strong>`], ["修繕積立金の改定", esc(p.repairNote)],
        ["大規模修繕", esc(p.bigRepair)], ["管理形態", "全部委託・日勤"], ["ペット飼育", esc(p.pet)],
        ["駐車場", "空きあり（月額 22,000円）"],
      ])}
      <p class="paper-note">※ 金額・内容はデモ用の架空データです。実際の取引では管理会社の重要事項調査報告書で確認します。</p>`;
  }
  return `
    <div class="paper-head"><span class="paper-kind">周辺環境・現地確認メモ（社内用）</span><h3>${esc(p.name)}</h3></div>
    ${rows([
      ["最寄り駅", `「${esc(p.station)}」駅 徒歩${p.walk}分（実測）`],
      ["買い物", "スーパー 徒歩4分／商店街 徒歩6分"],
      ["教育", "区立小学校 徒歩8分／保育園 徒歩5分"],
      ["日当たり", `${esc(p.direction)}向き。${/南/.test(p.direction) ? "日中は室内まで明るい。" : "午後はやや暗め。照明計画の提案が必要。"}`],
      ["音・環境", p.id === "p7" ? "1階店舗の営業音あり（夕方〜21時頃）" : "日中・夜間とも静か"],
      ["現地確認日", fmtDate(p.addedAt)],
    ])}
    <p class="paper-note">※ 社内向けの確認メモのイメージです（架空）。</p>`;
}

function openDoc(pid, k) {
  const p = getProperty(pid);
  const d = DOCS.find((x) => x.k === k) || DOCS[0];
  openModal({
    title: `${ic("file")}${esc(d.t)}`,
    sub: `物件資料 / ${esc(p.folder)} / ${esc(p.name)}`,
    size: "modal-doc",
    body: `
      <div class="doc-tabs" role="tablist">${DOCS.map((x) => `<button role="tab" class="chip${x.k === d.k ? " on" : ""}" data-action="open-doc" data-id="${p.id}" data-doc="${x.k}">${esc(x.t)}</button>`).join("")}</div>
      <p class="demo-note">${ic("info")}デモ用のサンプル資料です。実際はGoogleドライブの資料を開く想定です（未接続）。</p>
      <div class="paper">${docContent(p, d.k)}</div>`,
    footer: `<button class="btn btn-primary" data-action="modal-close">閉じる</button>`,
  });
}

/* ------------------------------------------------------------------
 * 4. 面談・内見後の記録（モーダル）＋ メモ整理（サンプル処理）
 * ------------------------------------------------------------------ */
const SAMPLE_MEMO = {
  c1: { type: "viewing", prop: "p2", text: "池上テラスレジデンスを内見。南向きでリビングが明るく、日当たりをとても気に入っていた。駅から9分も実際に歩いてみて問題ないとのこと。浴室と洗面所がやや古いのが気になる様子。管理費と修繕積立金は合計で月3万円以内に抑えたい。ご主人の在宅勤務が増えるので、書斎に使える部屋がほしい。予算は5,200万円まで広げられそう。金曜までに管理会社へ修繕積立金の改定予定を確認して、LINEで連絡する。" },
  c2: { type: "meeting_online", prop: "", text: "オンラインで初回面談。池上か千鳥町で2LDK、予算は4,300万円まで。小学校まで徒歩10分以内を重視したい。ペットは飼わない。明日までに条件に合う物件を2件LINEで送る。" },
  c3: { type: "phone", prop: "p3", text: "ローン本審査の書類について電話。源泉徴収票がまだ見つからないとのこと。千鳥町パークハイツは引き続き申し込みで進める。明後日までに書類を受け取りに伺う日程を調整する。" },
  c5: { type: "meeting_office", prop: "", text: "査定結果をご説明。売り出し価格は6,080万円で進めたいとのこと。来年2月までに売却を完了したい。来週中に媒介契約書を準備して送付する。" },
};

// 登録済みサンプル顧客以外（新規登録した顧客など）は、進み具合に合わせた例文を出す
function sampleMemoFor(c) {
  if (SAMPLE_MEMO[c.id]) return SAMPLE_MEMO[c.id];
  if (c.type === "sell") {
    return { type: "meeting_office", prop: "", text: "ご自宅で訪問査定。室内はきれいに使われている。売り出し価格は5,800万円を希望。来年3月までに売却したい。来週中に査定書を作成して送付する。" };
  }
  const props = proposalsOf(c.id).sort((a, b) => b.date.localeCompare(a.date));
  if (props.length) {
    const p = getProperty(props[0].propertyId);
    return { type: "viewing", prop: p.id, text: `${p.name.split(" ")[0]}を内見。日当たりが良く、リビングが広いのを気に入っていた。駐車場がない点が気になる様子。前向きに検討したいとのこと。来週中に住宅ローンの事前審査の案内を送る。` };
  }
  return { type: "meeting_online", prop: "", text: "オンラインで初回面談。池上か長原あたりで2LDK以上を希望。予算は5,000万円まで出せる。駅徒歩10分以内を重視したい。子ども部屋が明るくなるよう、日当たりも優先したい。明日までに条件に合う物件を2件LINEで送る。" };
}

const SAMPLE_NEW_CUSTOMER = {
  name: "テスト 花子", kana: "てすと はなこ", type: "buy", staff: "s2", source: "line", phone: "090-0000-0000",
  body: "公式LINEより：池上か長原あたりで中古マンションを探しています。夫婦と子ども1人で、2LDK以上が希望です。予算は4,500万円くらいです。一度相談できますか？",
};
const SAMPLE_HISTORY = { source: "line", body: "面談はオンラインでお願いしたいです。今週土曜の午前中だと助かります。" };

function openRecordModal(cid) {
  const c = getCustomer(cid);
  const props = proposalsOf(c.id).map((r) => getProperty(r.propertyId)).filter(Boolean);
  const others = S.properties.filter((p) => !props.includes(p));
  openModal({
    title: `面談・内見の記録`,
    sub: `${esc(c.name)} 様・${c.type === "sell" ? "売却相談" : "購入相談"}`,
    size: "modal-wide",
    guard: () => !fval("memo") || confirm("入力中のメモは保存されません。閉じてよろしいですか？"),
    body: `
      <form id="rec-form" class="form" autocomplete="off" onsubmit="return false">
        <div class="form-grid">
          <label class="field"><span>記録日時</span><input type="datetime-local" name="at" value="${nowLocal()}" required></label>
          <label class="field"><span>対応者</span><select name="staff">${staffOptions(c.staff)}</select></label>
          <label class="field"><span>種別</span><select name="type">${RECORD_TYPES.map((t) => opt(t.k, t.l, "meeting_office")).join("")}</select></label>
          <label class="field"><span>関連する物件（任意）</span><select name="prop">
            <option value="">なし</option>
            ${props.length ? `<optgroup label="紹介済みの物件">${props.map((p) => opt(p.id, propTitle(p), "")).join("")}</optgroup>` : ""}
            ${c.type === "buy" ? `<optgroup label="その他の物件">${others.map((p) => opt(p.id, p.name, "")).join("")}</optgroup>` : ""}
          </select></label>
        </div>
        <label class="field">
          <span class="field-row"><span>メモ（自由記述）</span><button type="button" class="btn btn-text btn-sm" data-action="sample-memo" data-id="${c.id}">${ic("note")}サンプル文を入れる</button></span>
          <textarea name="memo" rows="6" placeholder="面談・内見で分かったこと、お客様の反応、次にやることなどを、話し言葉のままで書いてください。"></textarea>
        </label>
        <div class="organize-bar">
          <button type="button" class="btn btn-accent" data-action="organize" data-id="${c.id}">${ic("sparkle")}メモを整理する</button>
          <span class="muted small">メモから「希望条件の変化」「物件への反応」「次の対応」の整理案を作ります。</span>
        </div>
        <div id="org-result"></div>
        <fieldset class="next-fields" id="next-fields">
          <legend>${ic("flag")}次の対応と期限</legend>
          <div class="form-grid">
            <label class="field span-2"><span>次の対応</span><input name="nextText" value="${esc(c.next ? c.next.text : "")}" placeholder="例：物件Bの管理費を確認して連絡する"></label>
            <label class="field"><span>期限</span><input type="date" name="nextDue" value="${esc(c.next ? c.next.due : "")}"></label>
            <label class="field"><span>担当</span><select name="nextStaff">${staffOptions(c.next ? c.next.staff : c.staff)}</select></label>
          </div>
        </fieldset>
      </form>`,
    footer: `
      <span class="foot-note muted small">保存すると対応履歴に追加され、チェックした整理案が反映されます。</span>
      <button class="btn btn-ghost" data-action="modal-close">キャンセル</button>
      <button class="btn btn-primary" data-action="save-record" data-id="${c.id}">${ic("check")}確認した内容で保存</button>`,
  });
}

// 期限の言い回しを日付に変換（サンプル処理）
function parseDue(s) {
  const t = todayStr();
  const nextWd = (wd, minAdd = 1) => { const d = parseDay(t); let n = minAdd; while ((d.getDay() + n) % 7 !== wd) n++; return addDays(t, n); };
  let m;
  if (/今日中|本日/.test(s)) return t;
  if (/明後日/.test(s)) return addDays(t, 2);
  if (/明日/.test(s)) return addDays(t, 1);
  if ((m = s.match(/(\d{1,2})月(\d{1,2})日/))) { const y = parseDay(t).getFullYear(); let d = `${y}-${pad(m[1])}-${pad(m[2])}`; if (d < t) d = `${y + 1}-${pad(m[1])}-${pad(m[2])}`; return d; }
  if ((m = s.match(/(\d{1,2})\/(\d{1,2})/))) { const y = parseDay(t).getFullYear(); return `${y}-${pad(m[1])}-${pad(m[2])}`; }
  if ((m = s.match(/来週(の)?([月火水木金土日])曜/))) { const wd = WD.indexOf(m[2]); const nm = nextWd(1); return addDays(nm, (wd + 6) % 7); }
  if (/来週中|来週/.test(s)) { return addDays(nextWd(1), 4); }
  if ((m = s.match(/([月火水木金土日])曜/))) return nextWd(WD.indexOf(m[1]));
  if (/今週中|週内/.test(s)) return nextWd(5, 0);
  if ((m = s.match(/(\d+)日後/))) return addDays(t, Number(m[1]));
  return addDays(t, 3);
}

const PRIORITY_RULES = [
  { re: /(管理費|修繕積立金).*?(\d+(?:\.\d+)?)万円?以内/, make: (m) => `管理費＋修繕積立金 月${m[2]}万円以内` },
  { re: /書斎|在宅勤務|テレワーク|リモートワーク/, make: () => "在宅勤務用の書斎スペース" },
  { re: /(日当たり|明るさ|陽当たり).*(優先|重視|譲れない|大事)/, make: () => "日当たり" },
  { re: /ペット|猫|犬/, make: (m, s) => (/飼わない|不要|なし/.test(s) ? null : "ペット可") },
  { re: /駐車場/, make: () => "駐車場あり" },
  { re: /学区|小学校|学校/, make: (m, s) => { const w = s.match(/徒歩(\d+)分/); return w ? `小学校まで徒歩${w[1]}分以内` : "学区（小学校が近い）"; } },
  { re: /静か|騒音|音が/, make: () => "静かな環境" },
  { re: /リフォーム|リノベ/, make: () => "リフォーム済み・リフォーム可" },
  { re: /眺望|高層|上層階/, make: () => "眺望・上層階" },
];
const DESIRE = /優先|重視|譲れない|必須|ほしい|欲しい|抑えたい|したい|希望|大事/;
const POSITIVE = /気に入|好評|良い|よい|良かった|明る|広い|広く|広さ|便利|問題ない|問題なし|満足|きれい|綺麗|静か|魅力/;
const NEGATIVE = /気になる|気になっ|心配|古い|暗い|狭い|高い|うるさ|不安|ネック|難しい|厳しい|足りない/;
const ACTION = /(確認|連絡|送付|送る|手配|調整|予約|準備|提案|案内|共有|探し|伺う|受け取)/;

function organizeMemo(c, memo, relatedId, typeKey) {
  const sentences = memo.split(/[。\n！!？?]+/).map((s) => s.trim()).filter(Boolean);
  const used = new Set();
  const conds = [];
  const isBuy = c.type === "buy";
  const w = c.wants || {};

  sentences.forEach((s, i) => {
    const h = toHalf(s);
    let m;
    if (isBuy) {
      if ((m = h.match(/予算[^0-9]*(\d+)\s*万/))) {
        const v = Number(m[1]);
        if (v !== Number(w.budget)) conds.push({ key: "budget", label: "予算", before: man(w.budget), value: v, unit: "万円まで" });
        used.add(i); return;
      }
      if ((m = h.match(/^(?!.*(小学校|学校)).*徒歩\s*(\d+)\s*分(以内|まで)/))) {
        const v = Number(m[2]);
        if (v !== Number(w.walk)) conds.push({ key: "walk", label: "駅徒歩", before: w.walk ? `${w.walk}分以内` : "—", value: v, unit: "分以内" });
        used.add(i);
      }
      if ((m = h.match(/(\d)\s*(SLDK|LDK|DK)/)) && DESIRE.test(h) || (m = h.match(/(\d)\s*(LDK|DK)/)) && /で|以上/.test(h) && !POSITIVE.test(h) && !NEGATIVE.test(h) && /池上|千鳥|久が原|長原|エリア/.test(h)) {
        const v = `${m[1]}${m[2]}${/以上/.test(h) ? "以上" : ""}`;
        if (v !== w.layout) conds.push({ key: "layout", label: "間取り", before: w.layout || "—", value: v, unit: "" });
        used.add(i);
      }
      const areaHits = [...new Set(h.match(/池上|長原|千鳥町|久が原|雪が谷大塚|蓮沼|御嶽山|洗足池|蒲田/g) || [])];
      if (areaHits.length && /探|希望|検討|ほしい|欲しい|したい|LDK/.test(h) && !/内見/.test(h)
        && !S.properties.some((p) => h.includes(p.name.split(" ")[0]))
        && !areaHits.every((a) => (w.area || "").includes(a))) {
        conds.push({ key: "area", label: "エリア", before: w.area || "—", value: `${areaHits.join("・")}周辺`, unit: "" });
        used.add(i);
      }
      if ((m = h.match(/(\d+)\s*(㎡|平米|m2)/)) && DESIRE.test(h)) {
        const v = Number(m[1]);
        if (v !== Number(w.size)) conds.push({ key: "size", label: "広さ", before: w.size ? `${w.size}㎡以上` : "—", value: v, unit: "㎡以上" });
        used.add(i);
      }
      for (const rule of PRIORITY_RULES) {
        const pm = h.match(rule.re);
        if (!pm) continue;
        if (!DESIRE.test(h) && !/以内/.test(h)) continue;
        if (ACTION.test(h) && /まで|中に|までに/.test(h) && !DESIRE.test(h)) continue;
        const v = rule.make(pm, h);
        if (!v) { used.add(i); continue; }
        const exists = (w.priorities || []).some((p) => p.includes(v) || v.includes(p.replace(/（.*）/, "")));
        if (!exists && !conds.some((x) => x.value === v)) conds.push({ key: "priority", label: "重視する点を追加", before: "", value: v, unit: "" });
        used.add(i);
        break;
      }
    } else {
      if ((m = h.match(/(売り出し|売出し?|希望|価格)[^0-9]*(\d+)\s*万/))) {
        const v = Number(m[2]);
        if (v !== Number(c.sale.desiredPrice)) conds.push({ key: "desiredPrice", label: "売却希望価格", before: c.sale.desiredPrice ? man(c.sale.desiredPrice) : "未定", value: v, unit: "万円" });
        used.add(i); return;
      }
      if (/(年内|年度内|来年|\d+月).*(売却|売り)/.test(h) && !ACTION.test(h.replace(/売却を完了/, ""))) {
        conds.push({ key: "timing", label: "希望時期", before: c.sale.timing, value: s, unit: "" });
        used.add(i); return;
      }
    }
  });

  // 次の対応
  const actions = [];
  let due = null;
  sentences.forEach((s, i) => {
    if (used.has(i)) return;
    const h = toHalf(s);
    if (ACTION.test(h) && /(する|します|して|予定|まで|中に|ておく|伺う|送る)$|までに|中に/.test(h) && !/とのこと|ていた|でした/.test(h)) {
      if (!due) due = parseDue(h);
      const text = s
        .replace(/^(明日|明後日|今日中|本日|今週中|来週中|来週の?[月火水木金土日]曜日?|来週|[月火水木金土日]曜日?|\d{1,2}月\d{1,2}日|\d+日後)(まで)?(に|中に)?[、,]?/, "")
        .replace(/(までに|中に)、?/, "").trim();
      actions.push(text);
      used.add(i);
    }
  });

  // 物件への反応
  let reaction = null;
  let pid = relatedId;
  if (!pid && isBuy) {
    const hit = S.properties.find((p) => memo.includes(p.name.split(" ")[0]) || (p.label && memo.includes(p.label)));
    if (hit) pid = hit.id;
  }
  if (pid && isBuy) {
    const liked = [], concerns = [];
    let reason = "";
    sentences.forEach((s, i) => {
      if (used.has(i)) return;
      const h = toHalf(s);
      if (/見送/.test(h)) { reason = s.replace(/^.*?(見送り|見送る)(たい|ます)?[、,]?/, "").trim() || s; used.add(i); return; }
      if (NEGATIVE.test(h)) { concerns.push(cleanReaction(s)); used.add(i); return; }
      if (POSITIVE.test(h)) { liked.push(cleanReaction(s)); used.add(i); }
    });
    const existing = proposalsOf(c.id).find((r) => r.propertyId === pid);
    let status = existing ? existing.status : "sent";
    if (/見送/.test(memo)) status = "declined";
    else if (/申し?込/.test(memo) && !/申し込みで進める/.test(memo)) status = "applied";
    else if (/申し込みで進める/.test(memo)) status = "applied";
    else if (/内見(の)?(予定|予約|日程)/.test(memo)) status = "scheduled";
    else if (typeKey === "viewing" || /内見/.test(memo)) status = liked.length && !/見送/.test(memo) && (/気に入|前向き|検討/.test(memo)) ? "considering" : "viewed";
    else if (/検討|前向き/.test(memo)) status = "considering";
    if (status === "declined" && !reason) reason = concerns[0] || "";
    const join = (a, b) => [a, b].filter(Boolean).join("\n");
    reaction = {
      propertyId: pid, existingId: existing ? existing.id : null, beforeStatus: existing ? existing.status : null, status,
      liked: join(existing && existing.liked, liked.join("。")), concerns: join(existing && existing.concerns, concerns.join("。")),
      newLiked: liked, newConcerns: concerns, reason: reason || (existing ? existing.reason : ""),
    };
  }

  // 状況の変化
  let statusSuggest = null;
  if (reaction && reaction.status === "applied" && c.status !== "application") statusSuggest = "application";
  else if (/契約(しました|済|締結)/.test(memo) && c.status !== "contract") statusSuggest = "contract";
  else if (typeKey === "viewing" && ["inquiry", "meeting"].includes(c.status)) statusSuggest = "viewing";
  else if (typeKey.startsWith("meeting") && c.status === "inquiry") statusSuggest = "meeting";
  else if (c.type === "sell" && /媒介|査定結果/.test(memo) && ["inquiry", "meeting"].includes(c.status)) statusSuggest = "assessment";
  if (statusSuggest) conds.push({ key: "status", label: "現在の状況", before: statusLabel(c.status), value: statusSuggest, unit: "" });

  const rest = sentences.filter((s, i) => !used.has(i));
  return { conds, reaction, next: actions.length ? { text: actions.join("／"), due } : null, rest };
}
const cleanReaction = (s) => s.replace(/^.*?を内見[、,]?/, "").replace(/(とのこと|の様子|様子)$/, "").trim();

function renderOrganized(c, res) {
  const box = document.getElementById("org-result");
  const condRow = (x, i) => {
    let input;
    if (x.key === "status") input = `<select name="cond-${i}">${STATUSES.map((s) => opt(s.k, s.l, x.value)).join("")}</select>`;
    else if (["budget", "walk", "size", "desiredPrice"].includes(x.key)) input = `<span class="with-unit"><input type="number" name="cond-${i}" value="${esc(x.value)}" inputmode="numeric"><span>${esc(x.unit)}</span></span>`;
    else input = `<input name="cond-${i}" value="${esc(x.value)}">`;
    return `
      <div class="org-row">
        <label class="check"><input type="checkbox" name="use-cond-${i}" checked><span>${esc(x.label)}</span></label>
        <div class="org-change">${x.before ? `<span class="before">${esc(x.before)}</span>${ic("arrow")}` : `<span class="add-tag">追加</span>`}${input}</div>
      </div>`;
  };
  const r = res.reaction;
  const p = r ? getProperty(r.propertyId) : null;
  box.innerHTML = `
    <section class="org-panel" aria-live="polite">
      <div class="org-head">
        <h3>${ic("sparkle")}整理案</h3>
        <span class="sample-tag">サンプル処理（デモ用のルールで抽出／AIは未接続）</span>
      </div>
      <p class="muted small">内容を確認し、必要に応じて修正してください。チェックを外した項目は反映されません。</p>

      <div class="org-sec">
        <h4>${c.type === "buy" ? "希望条件・優先順位の変化" : "売却条件・状況の変化"}</h4>
        ${res.conds.length ? res.conds.map(condRow).join("") : `<p class="muted small">メモから条件の変化は見つかりませんでした。</p>`}
      </div>

      ${c.type === "buy" ? `
      <div class="org-sec">
        <h4>物件への反応</h4>
        ${r ? `
          <label class="check"><input type="checkbox" name="use-reaction" checked><span>${esc(propTitle(p))} の反応として記録</span></label>
          <div class="form-grid org-react">
            <label class="field"><span>状態${r.beforeStatus ? `（現在：${esc(pstatusLabel(r.beforeStatus))}）` : "（新規紹介）"}</span><select name="r-status">${PSTATUS.map((s) => opt(s.k, s.l, r.status)).join("")}</select></label>
            <label class="field span-2"><span>${ic("thumbup")}好評だった点</span><textarea name="r-liked" rows="3">${esc(r.liked)}</textarea></label>
            <label class="field span-2"><span>${ic("concern")}気になった点</span><textarea name="r-concerns" rows="3">${esc(r.concerns)}</textarea></label>
            <label class="field span-2"><span>${ic("ban")}見送り理由（見送りの場合）</span><input name="r-reason" value="${esc(r.reason)}"></label>
          </div>
          <p class="hint">顧客ごとの反応として記録します。物件の会社評価（${esc(RATINGS[p.rating].l)}）は変わりません。</p>
        ` : `<p class="muted small">関連する物件が選ばれていないため、物件への反応はありません。上の「関連する物件」を選ぶと整理案に含められます。</p>`}
      </div>` : ""}

      <div class="org-sec">
        <h4>次の対応</h4>
        ${res.next ? `<p class="small">下の「次の対応と期限」に整理案を入れました。${ic("arrow")}</p>` : `<p class="muted small">メモから次の対応は見つかりませんでした。下で入力できます。</p>`}
      </div>

      ${res.rest.length ? `<div class="org-sec"><h4>その他のメモ（履歴にのみ残ります）</h4><ul class="rest">${res.rest.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>` : ""}
    </section>`;
  hydrateIcons(box);
  if (res.next) {
    const f = modalEl();
    f.querySelector('[name="nextText"]').value = res.next.text;
    f.querySelector('[name="nextDue"]').value = res.next.due;
    const nf = document.getElementById("next-fields");
    nf.classList.add("suggested");
    if (!nf.querySelector(".sample-tag")) nf.querySelector("legend").insertAdjacentHTML("beforeend", `<span class="sample-tag">整理案から入力</span>`);
  }
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

let lastOrganized = null;

function saveRecord(cid) {
  const c = getCustomer(cid);
  const f = modalEl();
  const memo = fval("memo");
  const at = fval("at") || nowLocal();
  const staff = fval("staff");
  const typeKey = fval("type");
  const type = RECORD_TYPES.find((t) => t.k === typeKey);
  const relId = fval("prop");
  if (!memo) { f.querySelector('[name="memo"]').focus(); toast("メモを入力してください"); return; }

  const applied = [];
  const flashKeys = [];
  const res = lastOrganized && lastOrganized.cid === cid ? lastOrganized.res : null;

  if (res) {
    res.conds.forEach((x, i) => {
      if (!f.querySelector(`[name="use-cond-${i}"]`) || !f.querySelector(`[name="use-cond-${i}"]`).checked) return;
      const v = fval(`cond-${i}`);
      if (!v) return;
      if (x.key === "budget") { c.wants.budget = Number(v); applied.push(`予算：${x.before} → ${man(v)}`); }
      else if (x.key === "walk") { c.wants.walk = Number(v); applied.push(`駅徒歩：${x.before} → ${v}分以内`); }
      else if (x.key === "size") { c.wants.size = Number(v); applied.push(`広さ：${x.before} → ${v}㎡以上`); }
      else if (x.key === "area") { c.wants.area = v; applied.push(`エリア：${x.before} → ${v}`); }
      else if (x.key === "layout") { c.wants.layout = v; applied.push(`間取り：${x.before} → ${v}`); }
      else if (x.key === "priority") { c.wants.priorities.push(v); applied.push(`重視する点に「${v}」を追加`); }
      else if (x.key === "desiredPrice") { c.sale.desiredPrice = Number(v); applied.push(`売却希望価格：${x.before} → ${man(v)}`); }
      else if (x.key === "timing") { c.sale.timing = v; applied.push(`希望時期：${v}`); }
      else if (x.key === "status") {
        if (v !== c.status) { applied.push(`状況：${statusLabel(c.status)} → ${statusLabel(v)}`); c.status = v; }
        return;
      }
      flashKeys.push("wants");
    });
    const useR = f.querySelector('[name="use-reaction"]');
    if (res.reaction && useR && useR.checked) {
      const rr = res.reaction;
      const p = getProperty(rr.propertyId);
      let prop = rr.existingId ? S.proposals.find((x) => x.id === rr.existingId) : null;
      if (!prop) {
        prop = { id: uid("r"), customerId: c.id, propertyId: rr.propertyId, date: at.slice(0, 10), status: "sent", liked: "", concerns: "", reason: "" };
        S.proposals.push(prop);
      }
      const before = prop.status;
      prop.status = fval("r-status");
      prop.liked = fval("r-liked");
      prop.concerns = fval("r-concerns");
      prop.reason = fval("r-reason");
      prop.updatedAt = at.slice(0, 10);
      applied.push(`${p.label || p.name.split(" ")[0]}の反応を記録（${before === prop.status ? pstatusLabel(before) : `${pstatusLabel(before)} → ${pstatusLabel(prop.status)}`}）`);
      flashKeys.push(`proposal-${prop.id}`);
    }
  }

  // 次の対応
  const nextText = fval("nextText");
  const nextDue = fval("nextDue");
  const nextStaff = fval("nextStaff");
  const prevNext = c.next ? `${c.next.text}|${c.next.due}|${c.next.staff}` : "";
  if (nextText) {
    if (`${nextText}|${nextDue}|${nextStaff}` !== prevNext) {
      if (c.next && c.next.text !== nextText) applied.push(`前の対応「${c.next.text}」を完了扱いに`);
      c.next = { text: nextText, due: nextDue || addDays(todayStr(), 3), staff: nextStaff };
      applied.push(`次の対応：${nextText}（${fmtDate(c.next.due)}まで）`);
      flashKeys.push("next");
    }
  }

  const p = relId ? getProperty(relId) : null;
  const hid = uid("h");
  c.history.push({
    id: hid, at, source: type.source, staff,
    title: type.k === "viewing" && p ? `内見：${p.name.split(" ")[0]}` : type.l,
    body: memo, propertyId: relId || (res && res.reaction ? res.reaction.propertyId : undefined), applied,
  });
  save();
  lastOrganized = null;
  histFilter = "all";
  flash = { keys: [...flashKeys, `hist-${hid}`, `row-${c.id}`], scrollTo: `hist-${hid}` };
  closeModal(true);
  rerender();
  toast(`対応履歴に追加しました${applied.length ? `（${applied.length}件を反映）` : ""}`);
}

/* ------------------------------------------------------------------
 * その他のモーダル（編集系）
 * ------------------------------------------------------------------ */
function openNextModal(cid) {
  const c = getCustomer(cid);
  const n = c.next || { text: "", due: addDays(todayStr(), 1), staff: c.staff };
  openModal({
    title: "次の対応を編集", sub: `${esc(c.name)} 様`,
    body: `<form class="form" onsubmit="return false">
      <label class="field"><span>次の対応</span><input name="text" value="${esc(n.text)}" autofocus placeholder="例：物件資料を送付する"></label>
      <div class="form-grid">
        <label class="field"><span>期限</span><input type="date" name="due" value="${esc(n.due)}"></label>
        <label class="field"><span>担当</span><select name="staff">${staffOptions(n.staff)}</select></label>
      </div></form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-next" data-id="${c.id}">${ic("check")}保存</button>`,
  });
}

function openWantsModal(cid) {
  const c = getCustomer(cid);
  const w = c.wants;
  openModal({
    title: "希望条件を編集", sub: `${esc(c.name)} 様`, size: "modal-wide",
    body: `<form class="form" onsubmit="return false">
      <div class="form-grid">
        <label class="field span-2"><span>エリア</span><input name="area" value="${esc(w.area)}"></label>
        <label class="field"><span>予算（万円まで）</span><input type="number" name="budget" value="${esc(w.budget)}" inputmode="numeric"></label>
        <label class="field"><span>間取り</span><input name="layout" value="${esc(w.layout)}"></label>
        <label class="field"><span>広さ（㎡以上）</span><input type="number" name="size" value="${esc(w.size)}" inputmode="numeric"></label>
        <label class="field"><span>駅徒歩（分以内）</span><input type="number" name="walk" value="${esc(w.walk)}" inputmode="numeric"></label>
      </div>
      <label class="field"><span>重視する点（1行に1つ・上から優先順）</span><textarea name="priorities" rows="4">${esc(w.priorities.join("\n"))}</textarea></label>
      <label class="field"><span>その他メモ</span><textarea name="other" rows="2">${esc(w.other)}</textarea></label>
    </form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-wants" data-id="${c.id}">${ic("check")}保存</button>`,
  });
}

function openSaleModal(cid) {
  const c = getCustomer(cid);
  const s = c.sale;
  openModal({
    title: "売却希望物件を編集", sub: `${esc(c.name)} 様`, size: "modal-wide",
    body: `<form class="form" onsubmit="return false"><div class="form-grid">
      <label class="field span-2"><span>物件名</span><input name="name" value="${esc(s.name)}"></label>
      <label class="field"><span>所在地</span><input name="address" value="${esc(s.address)}"></label>
      <label class="field"><span>間取り</span><input name="layout" value="${esc(s.layout)}"></label>
      <label class="field"><span>専有面積（㎡）</span><input type="number" step="0.1" name="size" value="${esc(s.size)}"></label>
      <label class="field"><span>売却希望価格（万円・空欄は未定）</span><input type="number" name="desiredPrice" value="${esc(s.desiredPrice == null ? "" : s.desiredPrice)}"></label>
      <label class="field span-2"><span>希望時期</span><input name="timing" value="${esc(s.timing)}"></label>
      <label class="field span-2"><span>売却理由</span><input name="reason" value="${esc(s.reason)}"></label>
      <label class="field"><span>ローン</span><input name="loan" value="${esc(s.loan)}"></label>
      <label class="field"><span>現況</span><input name="occupancy" value="${esc(s.occupancy)}"></label>
    </div></form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-sale" data-id="${c.id}">${ic("check")}保存</button>`,
  });
}

function matchChips(c, p) {
  const w = c.wants || {};
  const out = [];
  if (w.budget) out.push(p.price <= w.budget ? ["ok", "予算内"] : ["ng", `予算+${(p.price - w.budget).toLocaleString()}万`]);
  if (w.walk) out.push(p.walk <= w.walk ? ["ok", `徒歩${p.walk}分`] : ["ng", `徒歩${p.walk}分`]);
  const need = rooms(w.layout);
  if (need) out.push(rooms(p.layout) >= need ? ["ok", p.layout] : ["ng", p.layout]);
  if ((w.priorities || []).some((x) => /日当たり/.test(x))) out.push(/南/.test(p.direction) ? ["ok", `${p.direction}向き`] : ["ng", `${p.direction}向き`]);
  return out.map(([k, l]) => `<span class="match match-${k}">${ic(k === "ok" ? "check" : "x")}${esc(l)}</span>`).join("");
}

const okCount = (c, p) => (matchChips(c, p).match(/match-ok/g) || []).length;

function openProposalModal(cid) {
  const c = getCustomer(cid);
  const already = proposalsOf(c.id).map((r) => r.propertyId);
  // 希望条件に合う項目が多い物件から順に並べる
  const cands = S.properties.filter((p) => !already.includes(p.id) && p.sales !== "成約済み")
    .sort((a, b) => okCount(c, b) - okCount(c, a)
      || (b.sales === "販売中") - (a.sales === "販売中")
      || (b.addedAt || "").localeCompare(a.addedAt || ""));
  openModal({
    title: "物件を紹介する", sub: `${esc(c.name)} 様の希望条件と照らし合わせて表示しています`, size: "modal-wide",
    body: cands.length ? `<form class="form" onsubmit="return false">
      <div class="pick-list" role="radiogroup" aria-label="紹介する物件">
        ${cands.map((p, i) => `
          <label class="pick">
            <input type="radio" name="pid" value="${p.id}"${i === 0 ? " checked" : ""}>
            <span class="pick-body">
              <span class="pick-top"><strong>${esc(p.name)}</strong>${ratingBadge(p.rating, true)}</span>
              <span class="pick-meta">${esc(p.station)}駅 徒歩${p.walk}分・${man(p.price)}・${esc(p.layout)} ${p.size}㎡</span>
              <span class="pick-match">${matchChips(c, p)}</span>
            </span>
          </label>`).join("")}
      </div>
      <div class="form-grid">
        <label class="field"><span>紹介日</span><input type="date" name="date" value="${todayStr()}"></label>
        <label class="field"><span>状態</span><select name="status">${PSTATUS.slice(0, 4).map((s) => opt(s.k, s.l, "sent")).join("")}</select></label>
        <label class="field span-2"><span>紹介方法・メモ（履歴に残ります）</span><input name="memo" value="販売図面をLINEで送付"></label>
      </div>
      <p class="hint">記録のみです。実際のLINE・メール送信は行いません。</p>
    </form>` : `<p>紹介できる物件がありません。</p>`,
    footer: cands.length ? `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-proposal" data-id="${c.id}">${ic("check")}紹介を記録</button>` : `<button class="btn btn-primary" data-action="modal-close">閉じる</button>`,
  });
}

function openProposeFromProperty(pid) {
  const p = getProperty(pid);
  const already = proposalsFor(pid).map((r) => r.customerId);
  const cands = S.customers.filter((c) => c.type === "buy" && !already.includes(c.id) && c.status !== "contract")
    .sort((a, b) => okCount(b, p) - okCount(a, p));
  openModal({
    title: "この物件を顧客に紹介する", sub: esc(p.name), size: "modal-wide",
    body: cands.length ? `<form class="form" onsubmit="return false">
      <div class="pick-list" role="radiogroup" aria-label="紹介する顧客">
        ${cands.map((c, i) => `
          <label class="pick">
            <input type="radio" name="cid" value="${c.id}"${i === 0 ? " checked" : ""}>
            <span class="pick-body">
              <span class="pick-top"><strong>${esc(c.name)} 様</strong>${statusPill(c.status)}</span>
              <span class="pick-meta">${esc(c.wants.area)}・${man(c.wants.budget)}まで・${esc(c.wants.layout)}</span>
              <span class="pick-match">${matchChips(c, p)}</span>
            </span>
          </label>`).join("")}
      </div>
      <div class="form-grid">
        <label class="field"><span>紹介日</span><input type="date" name="date" value="${todayStr()}"></label>
        <label class="field"><span>状態</span><select name="status">${PSTATUS.slice(0, 4).map((s) => opt(s.k, s.l, "sent")).join("")}</select></label>
        <label class="field span-2"><span>紹介方法・メモ（履歴に残ります）</span><input name="memo" value="販売図面をメールで送付"></label>
      </div>
    </form>` : `<p>紹介できる購入相談の顧客がいません。</p>`,
    footer: cands.length ? `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-proposal-p" data-id="${p.id}">${ic("check")}紹介を記録</button>` : `<button class="btn btn-primary" data-action="modal-close">閉じる</button>`,
  });
}

function addProposal(cid, pid) {
  const c = getCustomer(cid);
  const p = getProperty(pid);
  const date = fval("date") || todayStr();
  const status = fval("status");
  const memo = fval("memo");
  const r = { id: uid("r"), customerId: cid, propertyId: pid, date, status, liked: "", concerns: "", reason: "", updatedAt: date };
  S.proposals.push(r);
  const hid = uid("h");
  c.history.push({ id: hid, at: `${date}T${nowLocal().slice(11)}`, source: "memo", staff: c.staff, title: `物件を紹介：${p.name.split(" ")[0]}`, body: memo || "物件を紹介", propertyId: pid });
  save();
  return { r, hid };
}

function openReactionModal(rid) {
  const r = S.proposals.find((x) => x.id === rid);
  const p = getProperty(r.propertyId);
  const c = getCustomer(r.customerId);
  openModal({
    title: "物件への反応を記録", sub: `${esc(c.name)} 様 × ${esc(p.name)}`, size: "modal-wide",
    body: `<form class="form" onsubmit="return false">
      <div class="form-grid">
        <label class="field"><span>状態</span><select name="status">${PSTATUS.map((s) => opt(s.k, s.l, r.status)).join("")}</select></label>
        <label class="field"><span>紹介日</span><input type="date" name="date" value="${esc(r.date)}"></label>
      </div>
      <label class="field"><span>${ic("thumbup")}好評だった点</span><textarea name="liked" rows="2">${esc(r.liked)}</textarea></label>
      <label class="field"><span>${ic("concern")}気になった点</span><textarea name="concerns" rows="2">${esc(r.concerns)}</textarea></label>
      <label class="field"><span>${ic("ban")}見送り理由（見送りの場合）</span><input name="reason" value="${esc(r.reason)}"></label>
      <p class="hint">この記録は ${esc(c.name)} 様の反応です。物件の会社評価（${esc(RATINGS[p.rating].l)}）は変わりません。</p>
    </form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-reaction" data-id="${r.id}">${ic("check")}保存</button>`,
  });
}

/* 物件の登録・編集 */
const DIRECTIONS = ["南", "南東", "南西", "東", "西", "北", "北東", "北西"];
const SAMPLE_PROPERTY = {
  name: "御嶽山レジデンス 301号室", area: "大田区北嶺町", line: "東急池上線", station: "御嶽山", walk: 6,
  price: 4680, layout: "2LDK", size: 61.3, floor: "3階 / 6階建", direction: "南", built: 2004,
  mgmtFee: 13500, repairFee: 12000, repairNote: "改定予定なし", pet: "可（規約あり）", sales: "販売中",
  features: "南向き、駅徒歩6分、2023年 室内リフォーム済み", rating: "good",
  ratingReason: "南向きで室内リフォーム済み。日当たりを重視する方に紹介しやすい。",
};

function openPropertyModal(pid) {
  const p = pid ? getProperty(pid) : null;
  const v = p || { line: "東急池上線", direction: "南", sales: "販売中", rating: "good", features: [] };
  const val = (k) => esc(v[k] == null ? "" : v[k]);
  const stations = [...new Set(S.properties.map((x) => x.station))];
  openModal({
    title: p ? "物件情報を編集" : "物件を登録",
    sub: p ? esc(p.name) : "新しく取り扱う物件の情報を登録します",
    size: "modal-wide",
    body: `<form class="form" onsubmit="return false" autocomplete="off">
      ${p ? "" : `<div><button type="button" class="btn btn-ghost btn-sm" data-action="sample-property">${ic("note")}例文を入れる</button></div>`}
      <div class="form-grid">
        <label class="field span-2"><span>物件名・部屋番号 <em class="req">必須</em></span><input name="name" value="${val("name")}" placeholder="例：〇〇マンション 301号室"></label>
        <label class="field"><span>所在地（エリア）</span><input name="area" value="${val("area")}" placeholder="例：大田区池上"></label>
        <label class="field"><span>路線</span><input name="line" value="${val("line")}"></label>
        <label class="field"><span>最寄り駅 <em class="req">必須</em></span><input name="station" value="${val("station")}" list="station-list" placeholder="例：池上"><datalist id="station-list">${stations.map((x) => `<option value="${esc(x)}">`).join("")}</datalist></label>
        <label class="field"><span>駅徒歩（分） <em class="req">必須</em></span><input type="number" name="walk" value="${val("walk")}" inputmode="numeric" min="0"></label>
        <label class="field"><span>価格（万円） <em class="req">必須</em></span><input type="number" name="price" value="${val("price")}" inputmode="numeric" min="0"></label>
        <label class="field"><span>間取り <em class="req">必須</em></span><input name="layout" value="${val("layout")}" placeholder="例：2LDK"></label>
        <label class="field"><span>専有面積（㎡） <em class="req">必須</em></span><input type="number" step="0.1" name="size" value="${val("size")}" inputmode="decimal"></label>
        <label class="field"><span>所在階</span><input name="floor" value="${val("floor")}" placeholder="例：3階 / 6階建"></label>
        <label class="field"><span>向き</span><select name="direction">${DIRECTIONS.map((d) => opt(d, `${d}向き`, v.direction)).join("")}</select></label>
        <label class="field"><span>築年（西暦） <em class="req">必須</em></span><input type="number" name="built" value="${val("built")}" inputmode="numeric"></label>
        <label class="field"><span>管理費（円/月）</span><input type="number" name="mgmtFee" value="${val("mgmtFee")}" inputmode="numeric"></label>
        <label class="field"><span>修繕積立金（円/月）</span><input type="number" name="repairFee" value="${val("repairFee")}" inputmode="numeric"></label>
        <label class="field"><span>積立金の改定</span><input name="repairNote" value="${val("repairNote")}" placeholder="例：改定予定なし"></label>
        <label class="field"><span>ペット</span><input name="pet" value="${val("pet")}" placeholder="例：可（規約あり）"></label>
        <label class="field"><span>販売状況</span><select name="sales">${["販売中", "申込あり", "成約済み"].map((x) => opt(x, x, v.sales)).join("")}</select></label>
        <label class="field span-2"><span>特徴（読点「、」区切り）</span><input name="features" value="${esc((v.features || []).join("、"))}" placeholder="例：南向き、駅徒歩6分"></label>
      </div>
      ${p ? `<p class="hint">会社としての評価は、物件画面の「会社としての評価」から編集します。</p>` : `
      <fieldset class="next-fields">
        <legend>${ic("star")}会社としての評価</legend>
        <div class="seg" role="radiogroup" aria-label="評価">
          ${Object.entries(RATINGS).map(([k, r]) => `<label class="seg-item"><input type="radio" name="rating" value="${k}"${v.rating === k ? " checked" : ""}><span>${esc(r.l)}</span></label>`).join("")}
        </div>
        <div class="form-grid" style="margin-top:12px">
          <label class="field span-2"><span>評価の理由</span><textarea name="ratingReason" rows="2"></textarea></label>
          <label class="field"><span>登録者</span><select name="by">${staffOptions("s1")}</select></label>
        </div>
      </fieldset>
      <p class="hint">資料はGoogleドライブの物件フォルダを参照する想定です。デモでは入力内容からサンプル資料を作って表示します（ドライブとは接続していません）。</p>`}
    </form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-property"${p ? ` data-id="${p.id}"` : ""}>${ic("check")}${p ? "保存" : "登録"}</button>`,
  });
}

function saveProperty(pid) {
  const required = [["name", "物件名"], ["station", "最寄り駅"], ["walk", "駅徒歩"], ["price", "価格"], ["layout", "間取り"], ["size", "専有面積"], ["built", "築年"]];
  const missing = required.find(([k]) => !fval(k));
  if (missing) { toast(`${missing[1]}を入力してください`); modalEl().querySelector(`[name="${missing[0]}"]`).focus(); return; }
  const name = fval("name");
  const price = Number(fval("price"));
  const num = (k) => (fval(k) === "" ? null : Number(fval(k)));
  const data = {
    name, price, area: fval("area") || "—", line: fval("line") || "—", station: fval("station") || "—",
    walk: num("walk"), layout: fval("layout") || "—", size: num("size"), floor: fval("floor") || "—",
    direction: fval("direction"), built: num("built"), mgmtFee: num("mgmtFee"), repairFee: num("repairFee"),
    repairNote: fval("repairNote") || "未確認", pet: fval("pet") || "未確認", sales: fval("sales"),
    features: fval("features").split(/[、,，]/).map((x) => x.trim()).filter(Boolean),
  };
  let p;
  if (pid) {
    p = getProperty(pid);
    Object.assign(p, data);
  } else {
    const rating = (modalEl().querySelector('[name="rating"]:checked') || {}).value || "good";
    p = Object.assign({
      id: uid("p"), label: "", bigRepair: "未確認", rating, ratingReason: fval("ratingReason") || "（理由未記入）",
      ratingBy: fval("by"), ratingAt: todayStr(), folder: RATINGS[rating].folder, addedAt: todayStr(),
    }, data);
    S.properties.push(p);
  }
  save();
  flash = { keys: ["prop-head"] };
  closeModal(true);
  if (pid) rerender(); else go(`#/properties/${p.id}`);
  toast(pid ? "物件情報を更新しました" : "物件を登録しました");
}

function openRatingModal(pid) {
  const p = getProperty(pid);
  openModal({
    title: "会社としての評価を編集", sub: esc(p.name),
    body: `<form class="form" onsubmit="return false">
      <div class="seg" role="radiogroup" aria-label="評価">
        ${Object.entries(RATINGS).map(([k, v]) => `<label class="seg-item"><input type="radio" name="rating" value="${k}"${p.rating === k ? " checked" : ""}><span>${esc(v.l)}</span></label>`).join("")}
      </div>
      <label class="field"><span>評価の理由</span><textarea name="reason" rows="4">${esc(p.ratingReason)}</textarea></label>
      <label class="field"><span>更新者</span><select name="by">${staffOptions(p.ratingBy)}</select></label>
      <p class="hint">顧客ごとの反応（見送りなど）とは別の、会社としての見立てです。</p>
    </form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-rating" data-id="${p.id}">${ic("check")}保存</button>`,
  });
}

function openHistoryModal(cid) {
  const c = getCustomer(cid);
  openModal({
    title: "連絡を転記する", sub: `${esc(c.name)} 様・フォーム／メール／LINEなどで届いた内容を記録します`, size: "modal-wide",
    body: `<form class="form" onsubmit="return false">
      <div class="form-grid">
        <label class="field"><span>情報源</span><select name="source">${["line", "mail", "form", "reserve", "phone", "memo"].map((k) => opt(k, SOURCES[k].l, "line")).join("")}</select></label>
        <label class="field"><span>日時</span><input type="datetime-local" name="at" value="${nowLocal()}"></label>
        <label class="field"><span>記録者</span><select name="staff">${staffOptions(c.staff)}</select></label>
      </div>
      <label class="field">
        <span class="field-row"><span>内容</span><button type="button" class="btn btn-text btn-sm" data-action="sample-history">${ic("note")}例文を入れる</button></span>
        <textarea name="body" rows="4" autofocus placeholder="届いたメッセージの内容や要点を貼り付け・入力"></textarea>
      </label>
      <p class="hint">このデモでは、フォーム・メール・LINEから自動では取り込みません（手動で転記する想定）。</p>
    </form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-history" data-id="${c.id}">${ic("check")}履歴に追加</button>`,
  });
}

function openNewCustomerModal() {
  openModal({
    title: "顧客を登録", sub: "新しいお問い合わせを登録します", size: "modal-wide",
    body: `<form class="form" onsubmit="return false">
      <div class="form-grid">
        <label class="field"><span>お名前</span><input name="name" autofocus placeholder="例：中島 恵"></label>
        <label class="field"><span>ふりがな</span><input name="kana" placeholder="例：なかじま めぐみ"></label>
        <label class="field"><span>相談種別</span><select name="type">${opt("buy", "購入相談", "buy")}${opt("sell", "売却相談", "")}</select></label>
        <label class="field"><span>担当者</span><select name="staff">${staffOptions("s1")}</select></label>
        <label class="field"><span>最初の入口</span><select name="source">${["form", "reserve", "line", "mail", "phone"].map((k) => opt(k, SOURCES[k].l, "form")).join("")}</select></label>
        <label class="field"><span>電話（任意）</span><input name="phone" inputmode="tel"></label>
      </div>
      <label class="field"><span>お問い合わせ内容</span><textarea name="body" rows="3" placeholder="フォームやLINEで届いた内容を貼り付け・入力"></textarea></label>
      <div><button type="button" class="btn btn-ghost btn-sm" data-action="sample-new-customer">${ic("note")}例文を入れる</button></div>
    </form>`,
    footer: `<button class="btn btn-ghost" data-action="modal-close">キャンセル</button><button class="btn btn-primary" data-action="save-customer">${ic("check")}登録</button>`,
  });
}

/* ------------------------------------------------------------------
 * デモについて
 * ------------------------------------------------------------------ */
function renderAbout() {
  app.innerHTML = `
    <div class="page narrow">
      <div class="page-head"><div><h1>このデモについて</h1><p class="page-sub">初回のご相談用に作成した、操作できる画面イメージです。</p></div></div>
      <section class="card">
        <div class="card-head"><h2>${ic("info")}仮説：こういう仕組みなら、お仕事がやりやすくなりそうでしょうか？</h2></div>
        <p>顧客ごとの<strong>相談履歴・紹介物件・物件への反応・次の対応</strong>を一つの画面で確認できる、2名用の営業支援ツールを想定しています。</p>
        <ul class="bullets">
          <li>フォーム・予約・メール・LINEに分かれたやりとりを、顧客ごとに時系列で見返せる</li>
          <li>誰にどの物件を紹介し、なぜ見送ったかが分かる</li>
          <li>面談・内見で分かった希望条件を、次の物件提案に生かせる</li>
          <li>2名で担当・進捗・次の対応を共有できる</li>
        </ul>
        <p class="hint">会社としての物件評価（おすすめ／条件次第／見送り推奨）と、顧客ごとの反応は別の情報として扱っています。</p>
      </section>
      <section class="card">
        <div class="card-head"><h2>${ic("list")}デモの流れ（既存のお客様：佐藤様）</h2></div>
        <ol class="bullets num">
          <li>顧客一覧から <a href="#/customers/c1">佐藤 健一 様</a> を開く</li>
          <li>希望条件と、フォーム・LINE・メール・面談の履歴を確認する</li>
          <li>紹介物件A（メゾン池上ノース）の見送り理由を確認する</li>
          <li><a href="#/properties/p2">物件B（池上テラスレジデンス）</a> の詳細とサンプル資料を開く</li>
          <li>佐藤様の画面で「面談・内見を記録」→「サンプル文を入れる」</li>
          <li>「メモを整理する」で整理案を確認・編集して保存</li>
          <li>対応履歴・希望条件・紹介物件・次の対応の更新を確認</li>
          <li>顧客一覧に戻り、次の対応と最終連絡日の更新を確認</li>
        </ol>
      </section>
      <section class="card">
        <div class="card-head"><h2>${ic("plus")}デモの流れ（新規のお問い合わせ）</h2></div>
        <ol class="bullets num">
          <li><a href="#/customers">顧客一覧</a> で「顧客を登録」→「例文を入れる」→「登録」（LINEから届いたお問い合わせの想定）</li>
          <li>顧客一覧に戻り、「今日の対応」に表示され、状況が「お問い合わせ」になっていることを確認</li>
          <li>顧客の画面で「連絡を転記」→「例文を入れる」→「履歴に追加」（LINEでの返信を転記）</li>
          <li>「面談・内見を記録」→「サンプル文を入れる」→「メモを整理する」で、エリア・予算・間取り・駅徒歩・重視する点と、状況「面談」への変更を確認して保存</li>
          <li>「物件を紹介」で、希望条件との合う／合わないを見ながら物件を選んで記録（条件に合う物件ほど上に表示されます）</li>
          <li>もう一度「面談・内見を記録」→「サンプル文を入れる」（紹介した物件の内見メモ）→ 整理して保存</li>
          <li>紹介物件の反応と、物件画面の「この物件を紹介した顧客と反応」を確認</li>
          <li>終わったら画面右上の「デモをリセット」で最初の状態に戻す</li>
        </ol>
        <p class="hint">物件の登録も試せます：<a href="#/properties">物件一覧</a> で「物件を登録」→「例文を入れる」→「登録」。登録した物件は、顧客に紹介するときの候補にも表示されます。</p>
      </section>
      <section class="card">
        <div class="card-head"><h2>${ic("ban")}このデモで接続していないもの</h2></div>
        <ul class="bullets">
          <li>ホームページのお問い合わせフォーム・予約ページ・公式LINE・メールからの自動取り込み（履歴は手動で転記した想定です）</li>
          <li>LINE・メールの実際の送信</li>
          <li>Googleドライブとの接続（資料はデモ用のサンプルを表示しています）</li>
          <li>AIによるメモ整理（「メモを整理する」はデモ用のルールによるサンプル処理です）</li>
          <li>ログイン・データベース・サーバー（入力内容はこのブラウザの中だけに保存されます）</li>
        </ul>
        <p class="hint">表示している顧客・物件・連絡内容はすべて架空のデータです。</p>
      </section>
      <section class="card">
        <div class="card-head"><h2>${ic("refresh")}デモデータ</h2></div>
        <p>デモ中に編集・記録した内容は、このブラウザに保存されています。最初の状態に戻すには、下のボタンを押してください。</p>
        <button class="btn btn-danger" data-action="reset">${ic("refresh")}デモデータをリセットする</button>
      </section>
    </div>`;
}

function notFound(msg, href, label) {
  return `<div class="page"><div class="empty">${ic("search")}<p>${esc(msg)}</p><a class="btn btn-ghost" href="${href}">${esc(label)}</a></div></div>`;
}

/* ------------------------------------------------------------------
 * イベント（委譲）
 * ------------------------------------------------------------------ */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const a = el.dataset.action;
  const id = el.dataset.id;
  if (a === "modal-backdrop") { if (e.target === el) closeModal(); return; }
  e.preventDefault();

  switch (a) {
    case "modal-close": closeModal(); break;

    // 一覧の絞り込み
    case "cf": custFilter[el.dataset.key] = el.dataset.val; rerender(); break;
    case "cf-clear": Object.assign(custFilter, { q: "", staff: "all", status: "all", type: "all" }); rerender(); break;
    case "pf": propFilter[el.dataset.key] = el.dataset.val; rerender(); break;
    case "pf-clear": Object.assign(propFilter, { q: "", station: "all", price: "all", rating: "all", layout: "all" }); rerender(); break;
    case "hf": histFilter = el.dataset.val; rerender(); break;
    case "hist-latest": {
      const items = app.querySelectorAll(".timeline .tl-item");
      if (items.length) items[items.length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
      break;
    }

    // 記録
    case "record": lastOrganized = null; openRecordModal(id); break;
    case "sample-memo": {
      const smp = sampleMemoFor(getCustomer(id));
      const f = modalEl();
      f.querySelector('[name="memo"]').value = smp.text;
      f.querySelector('[name="type"]').value = smp.type;
      if (smp.prop && f.querySelector(`[name="prop"] option[value="${smp.prop}"]`)) f.querySelector('[name="prop"]').value = smp.prop;
      break;
    }
    case "sample-new-customer": {
      const f = modalEl();
      Object.entries(SAMPLE_NEW_CUSTOMER).forEach(([k, v]) => { const el = f.querySelector(`[name="${k}"]`); if (el) el.value = v; });
      break;
    }
    case "sample-history": {
      const f = modalEl();
      f.querySelector('[name="source"]').value = SAMPLE_HISTORY.source;
      f.querySelector('[name="body"]').value = SAMPLE_HISTORY.body;
      break;
    }
    case "organize": {
      const memo = fval("memo");
      if (!memo) { toast("先にメモを入力してください"); modalEl().querySelector('[name="memo"]').focus(); break; }
      const c = getCustomer(id);
      el.disabled = true;
      el.innerHTML = `${ic("sparkle")}整理しています…`;
      hydrateIcons(el);
      setTimeout(() => {
        const res = organizeMemo(c, memo, fval("prop"), fval("type"));
        lastOrganized = { cid: id, res };
        renderOrganized(c, res);
        el.disabled = false;
        el.innerHTML = `${ic("sparkle")}もう一度整理する`;
        hydrateIcons(el);
      }, 650);
      break;
    }
    case "save-record": saveRecord(id); break;

    // 顧客詳細の編集
    case "edit-next": openNextModal(id); break;
    case "save-next": {
      const c = getCustomer(id);
      const text = fval("text");
      if (!text) { toast("次の対応を入力してください"); break; }
      c.next = { text, due: fval("due") || addDays(todayStr(), 1), staff: fval("staff") };
      save(); flash = { keys: ["next"] }; closeModal(true); rerender(); toast("次の対応を更新しました");
      break;
    }
    case "done-next": {
      const c = getCustomer(id);
      if (!c.next) break;
      c.history.push({ id: uid("h"), at: nowLocal(), source: "memo", staff: c.next.staff || c.staff, title: "対応完了", body: `「${c.next.text}」を対応済みにしました。` });
      c.next = null;
      save(); rerender(); toast("対応済みにしました。次の対応を設定してください");
      break;
    }
    case "edit-wants": openWantsModal(id); break;
    case "save-wants": {
      const c = getCustomer(id);
      Object.assign(c.wants, {
        area: fval("area"), budget: Number(fval("budget")) || null, layout: fval("layout"),
        size: Number(fval("size")) || null, walk: Number(fval("walk")) || null,
        priorities: fval("priorities").split("\n").map((s) => s.trim()).filter(Boolean), other: fval("other"),
      });
      save(); flash = { keys: ["wants"] }; closeModal(true); rerender(); toast("希望条件を更新しました");
      break;
    }
    case "edit-sale": openSaleModal(id); break;
    case "save-sale": {
      const c = getCustomer(id);
      Object.assign(c.sale, {
        name: fval("name"), address: fval("address"), layout: fval("layout"), size: Number(fval("size")) || c.sale.size,
        desiredPrice: fval("desiredPrice") ? Number(fval("desiredPrice")) : null, timing: fval("timing"), reason: fval("reason"),
        loan: fval("loan"), occupancy: fval("occupancy"),
      });
      save(); flash = { keys: ["wants"] }; closeModal(true); rerender(); toast("売却希望物件を更新しました");
      break;
    }
    case "add-proposal": openProposalModal(id); break;
    case "save-proposal": {
      const pid = (modalEl().querySelector('[name="pid"]:checked') || {}).value;
      if (!pid) break;
      const { r, hid } = addProposal(id, pid);
      flash = { keys: [`proposal-${r.id}`, `hist-${hid}`], scrollTo: `proposal-${r.id}` };
      closeModal(true); rerender(); toast("物件の紹介を記録しました");
      break;
    }
    case "propose-from-property": openProposeFromProperty(id); break;
    case "save-proposal-p": {
      const cid = (modalEl().querySelector('[name="cid"]:checked') || {}).value;
      if (!cid) break;
      addProposal(cid, id);
      closeModal(true); rerender(); toast(`${getCustomer(cid).name} 様への紹介を記録しました`);
      break;
    }
    case "edit-reaction": openReactionModal(id); break;
    case "save-reaction": {
      const r = S.proposals.find((x) => x.id === id);
      Object.assign(r, { status: fval("status"), date: fval("date") || r.date, liked: fval("liked"), concerns: fval("concerns"), reason: fval("reason"), updatedAt: todayStr() });
      save(); flash = { keys: [`proposal-${r.id}`] }; closeModal(true); rerender(); toast("物件への反応を記録しました");
      break;
    }
    case "add-history": openHistoryModal(id); break;
    case "save-history": {
      const c = getCustomer(id);
      const body = fval("body");
      if (!body) { toast("内容を入力してください"); break; }
      const src = fval("source");
      const hid = uid("h");
      c.history.push({ id: hid, at: fval("at") || nowLocal(), source: src, staff: fval("staff"), title: `${SOURCES[src].l}（転記）`, body });
      save(); histFilter = "all"; flash = { keys: [`hist-${hid}`], scrollTo: `hist-${hid}` }; closeModal(true); rerender(); toast("対応履歴に追加しました");
      break;
    }

    // 物件
    case "open-doc": openDoc(id, el.dataset.doc); break;
    case "edit-rating": openRatingModal(id); break;
    case "new-property": openPropertyModal(); break;
    case "edit-property": openPropertyModal(id); break;
    case "save-property": saveProperty(id); break;
    case "sample-property": {
      const f = modalEl();
      Object.entries(SAMPLE_PROPERTY).forEach(([k, v]) => {
        if (k === "rating") { const r = f.querySelector(`[name="rating"][value="${v}"]`); if (r) r.checked = true; return; }
        const el = f.querySelector(`[name="${k}"]`); if (el) el.value = v;
      });
      break;
    }
    case "save-rating": {
      const p = getProperty(id);
      const rating = (modalEl().querySelector('[name="rating"]:checked') || {}).value || p.rating;
      Object.assign(p, { rating, ratingReason: fval("reason"), ratingBy: fval("by"), ratingAt: todayStr(), folder: RATINGS[rating].folder });
      save(); flash = { keys: ["rating"] }; closeModal(true); rerender(); toast("会社としての評価を更新しました");
      break;
    }

    // 顧客登録
    case "new-customer": openNewCustomerModal(); break;
    case "save-customer": {
      const name = fval("name");
      if (!name) { toast("お名前を入力してください"); break; }
      const type = fval("type");
      const src = fval("source");
      const staff = fval("staff");
      const c = {
        id: uid("c"), name, kana: fval("kana"), type, staff, status: "inquiry", phone: fval("phone") || "—", email: "—", line: "—",
        household: "—", firstSource: src, createdAt: todayStr(),
        next: { text: "初回のご連絡をする（面談のご案内）", due: todayStr(), staff },
        history: [{ id: uid("h"), at: nowLocal(), source: src, staff, title: `${SOURCES[src].l}（転記）`, body: fval("body") || "お問い合わせ" }],
      };
      if (type === "buy") c.wants = { area: "", budget: null, layout: "", size: null, walk: null, priorities: [], other: "" };
      else c.sale = { name: "（未確認）", address: "", layout: "", size: "", built: "", floor: "", desiredPrice: null, timing: "未確認", reason: "", loan: "", occupancy: "" };
      S.customers.push(c);
      save(); closeModal(true); go(`#/customers/${c.id}`); toast("顧客を登録しました");
      break;
    }

    case "reset":
      if (confirm("デモデータを最初の状態に戻します。よろしいですか？")) {
        resetDemo(); Object.assign(custFilter, { q: "", staff: "all", status: "all", type: "all", sort: "due" });
        Object.assign(propFilter, { q: "", station: "all", price: "all", rating: "all", layout: "all" });
        go("#/customers"); toast("デモデータをリセットしました");
      }
      break;
  }
});

document.addEventListener("change", (e) => {
  const el = e.target.closest("[data-change]");
  if (!el) return;
  const c = getCustomer(el.dataset.id);
  if (el.dataset.change === "status" && el.value !== c.status) {
    c.history.push({ id: uid("h"), at: nowLocal(), source: "memo", staff: c.staff, title: "状況を変更", body: `「${statusLabel(c.status)}」→「${statusLabel(el.value)}」` });
    c.status = el.value;
    save(); rerender(); toast(`状況を「${statusLabel(c.status)}」に変更しました`);
  } else if (el.dataset.change === "staff" && el.value !== c.staff) {
    c.history.push({ id: uid("h"), at: nowLocal(), source: "memo", staff: el.value, title: "担当者を変更", body: `${staffName(c.staff)} → ${staffName(el.value)}` });
    c.staff = el.value;
    if (c.next) c.next.staff = el.value;
    save(); rerender(); toast(`担当者を${staffName(c.staff)}に変更しました`);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.getElementById("modal-root").innerHTML) closeModal();
});

hydrateIcons(document);
route();
