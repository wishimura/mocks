// 漢字テスト（kanji-test）の記録を Neon(Postgres) に保存・読みこみする Vercel Function。
// メールアドレスだけで家族の記録をひらく（認証なし）。
//
// POST /api/kanji
//   { action: "load", email }                          → { ok, data, updatedAt }
//   { action: "save", email, profiles, store, removed } → { ok, updatedAt }
//     profiles: 家族のプロフィール一覧（全件で置きかえ）
//     store:    { [プロフィールID]: { キー: 値 } }（送ったプロフィールの分だけ置きかえ）
//     removed:  消したプロフィールID の配列
import { neon } from "@neondatabase/serverless";

const DB_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || "";
const sql = DB_URL ? neon(DB_URL) : null;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const MAX_BYTES = 3 * 1024 * 1024;

let ready = null;
function ensureTable() {
  ready ??= sql`
    create table if not exists kanji_families (
      email text primary key,
      data jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )`.catch((e) => { ready = null; throw e; });
  return ready;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (!sql) return res.status(503).json({ ok: false, error: "no-database" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const email = String(body.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, error: "bad-email" });

  try {
    await ensureTable();
    if (body.action === "load") {
      const rows = await sql`select data, updated_at from kanji_families where email = ${email}`;
      return res.json({ ok: true, data: rows[0]?.data ?? null, updatedAt: rows[0]?.updated_at ?? null });
    }
    if (body.action === "save") {
      const profiles = Array.isArray(body.profiles) ? body.profiles : [];
      const store = body.store && typeof body.store === "object" ? body.store : {};
      const removed = Array.isArray(body.removed) ? body.removed.map(String) : [];
      const size = JSON.stringify(profiles).length + JSON.stringify(store).length;
      if (size > MAX_BYTES) return res.status(413).json({ ok: false, error: "too-large" });
      const rows = await sql`
        insert into kanji_families (email, data)
        values (${email}, jsonb_build_object('profiles', ${JSON.stringify(profiles)}::jsonb, 'store', ${JSON.stringify(store)}::jsonb))
        on conflict (email) do update set
          data = jsonb_build_object(
            'profiles', ${JSON.stringify(profiles)}::jsonb,
            'store', (coalesce(kanji_families.data->'store', '{}'::jsonb) || ${JSON.stringify(store)}::jsonb) - ${removed}::text[]
          ),
          updated_at = now()
        returning updated_at`;
      return res.json({ ok: true, updatedAt: rows[0].updated_at });
    }
    return res.status(400).json({ ok: false, error: "bad-action" });
  } catch (e) {
    console.error("kanji api error", e);
    return res.status(500).json({ ok: false, error: "server-error" });
  }
}
