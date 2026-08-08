/* =========================================================
   タイ語 学習メモ  ―  自己完結スクリプト
   ========================================================= */

/* ---------- アイコン（Lucide風・線画） ---------- */
const ICONS = {
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
  search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  hash:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/></svg>',
  chat:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.5A8 8 0 0 1 11 4h2a8 8 0 0 1 8 8z"/></svg>',
  star:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>',
  up:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>'
};

document.querySelectorAll('.icon[data-icon]').forEach(function (el) {
  const svg = ICONS[el.dataset.icon];
  if (svg) el.innerHTML = svg;
});

/* ---------- フィルタ ＋ 検索 ---------- */
const items      = Array.from(document.querySelectorAll('[data-searchable]'));
const headings   = Array.from(document.querySelectorAll('.section-heading'));
const emptyMsg   = document.querySelector('[data-empty]');
const searchInput = document.querySelector('[data-search-input]');

let activeCat = 'all';
let keyword   = '';

function normalize(s) {
  return (s || '').toLowerCase().replace(/[\s・、。？?！!（）()]/g, '');
}

function applyFilter() {
  let shown = 0;
  const kw = normalize(keyword);

  items.forEach(function (el) {
    const catOk = activeCat === 'all' || el.dataset.cat === activeCat;
    const hay   = normalize(el.dataset.name + ' ' + el.textContent);
    const kwOk  = kw === '' || hay.indexOf(kw) !== -1;
    const ok    = catOk && kwOk;
    el.hidden = !ok;
    if (ok) shown++;
  });

  // 見出しは、絞り込み中は隠す
  const filtering = activeCat !== 'all' || kw !== '';
  headings.forEach(function (h) { h.hidden = filtering; });

  if (emptyMsg) emptyMsg.hidden = shown !== 0;
}

document.querySelectorAll('[data-filter-group] .chip').forEach(function (chip) {
  chip.addEventListener('click', function () {
    const group = chip.closest('[data-filter-group]');
    group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-on'); });
    chip.classList.add('is-on');
    activeCat = chip.dataset.filter;
    applyFilter();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', function () {
    keyword = searchInput.value;
    applyFilter();
  });
}

/* ---------- トップへ戻る ---------- */
const toTop = document.querySelector('[data-to-top]');
if (toTop) {
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('is-on', window.scrollY > 400);
  }, { passive: true });
}

/* ---------- カードのふわっと表示 ---------- */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        const el = e.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        io.unobserve(el);
        // インラインstyleが残るとhoverの浮き上がりを潰すので、再生後に外す
        window.setTimeout(function () {
          el.style.removeProperty('opacity');
          el.style.removeProperty('transform');
          el.style.removeProperty('transition');
        }, 500);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    io.observe(el);
  });
}

applyFilter();
