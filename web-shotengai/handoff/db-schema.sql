-- Web商店街 — Supabase(PostgreSQL) 初期スキーマ案（MVP）
-- 注: あくまで叩き台。本番ではマイグレーション管理（supabase migration）で運用する。
-- 認証は Supabase Auth(auth.users) を利用し、プロフィールを profiles で拡張する。

-- ========== ロール ==========
create type user_role as enum ('general', 'shop_owner', 'admin');
create type publish_status as enum ('draft', 'published');

-- ========== プロフィール（auth.users 拡張） ==========
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'general',
  display_name text,
  avatar_template_id uuid,          -- 選択中アバター（avatar_templates）
  created_at timestamptz default now()
);

-- ========== テンプレ（管理者のみ追加・編集） ==========
create table building_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_path text not null,         -- Storage上のパス（例: buildings/bakery.png）
  created_at timestamptz default now()
);

create table avatar_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_path text not null,         -- 例: avatars/fox.png
  created_at timestamptz default now()
);

alter table profiles
  add constraint fk_profiles_avatar foreign key (avatar_template_id) references avatar_templates(id);

-- ========== マーケット（管理者が作成・会員限定公開） ==========
create table markets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  period_start date,
  period_end date,
  status publish_status not null default 'draft',
  visibility text not null default 'members',   -- 会員限定
  max_shops int default 50,
  layout jsonb,                     -- 区画レイアウト（運営が割当）
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- ========== 店舗（1マーケットに複数 / 店舗オーナーが編集） ==========
create table shops (
  id uuid primary key default gen_random_uuid(),
  market_id uuid not null references markets(id) on delete cascade,
  owner_id uuid not null references profiles(id),       -- 店舗オーナー
  name text not null,
  category text,
  description text,
  building_template_id uuid references building_templates(id),  -- 用意された中から選択
  sign_text text,
  ec_base_url text,                 -- BASE（外部リンク）
  ec_shopify_url text,              -- Shopify（外部リンク）
  sns jsonb,                        -- {instagram, x, website ...}
  placement jsonb,                  -- 街での区画（運営割当）
  status publish_status not null default 'draft',
  created_at timestamptz default now()
);
create index on shops(market_id);
create index on shops(owner_id);

-- ========== 商品・店内写真（紹介ウィンドウ/詳細に表示） ==========
create table product_images (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  image_path text not null,
  sort int default 0
);

-- ========== お気に入り ==========
create table favorites (
  user_id uuid references profiles(id) on delete cascade,
  shop_id uuid references shops(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, shop_id)
);

-- ========== お知らせ（管理者→会員） ==========
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  published_at timestamptz,
  created_by uuid references profiles(id)
);

-- =====================================================================
-- RLS（Row Level Security）方針 ※実装時に有効化
--   一般ユーザー : published のマーケット/店舗を閲覧、自分のお気に入り操作
--   店舗オーナー : 自分が owner の店舗のみ編集（market/区画は不可）
--   管理者       : 全テーブル フル権限
-- =====================================================================
-- 例（雛形・要調整）:
-- alter table shops enable row level security;
--
-- create policy "shops public read" on shops
--   for select using (status = 'published');
--
-- create policy "owner manage own shops" on shops
--   for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
--
-- create policy "admin full shops" on shops
--   for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));
--
-- markets / building_templates / avatar_templates は
--   select=会員可、insert/update/delete=admin のみ、で同様に定義する。

-- ========== 店舗オーナーのアカウント発行 ==========
-- 1. 契約はシステム外。メールアドレスを受領
-- 2. 管理者が Supabase Auth の招待（inviteUserByEmail 相当）でユーザー作成
--    → profiles に role='shop_owner' を付与（トリガ or 管理画面処理）
-- 3. 招待メールのリンクからログイン → パスワード設定・プロフィール登録

-- ========== 将来（今回スコープ外） ==========
-- billing（出店料・決済）, analytics（来訪/ECクリック）, reports（通報） 等は別途。
