# 本番プロジェクト構成案

## 技術スタック（再掲）
- フロント：React + TypeScript + Vite / 街描画は **PixiJS**（or Phaser 3）/ Tailwind CSS
- バック：**Supabase**（PostgreSQL + Auth + Storage + Realtime）
- ホスティング：**Vercel**（CDN・SSL自動）
- 同時接続：Supabase Realtime（presence）→ 将来 Colyseus
- EC：BASE / Shopify は URL保存→外部遷移のみ

## ディレクトリ構成（案）
```
web-shotengai-app/
├─ public/
│  └─ assets/                 # モックの assets/ をここへ
│     ├─ buildings/  (bakery.png, tea.png, greengrocer.png …)
│     ├─ avatars/    (未着手・10種)
│     ├─ ground/     (grass.png, cobble.png)
│     ├─ props/      (tree.png …)
│     └─ bg/         (forest.png)
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ lib/
│  │  ├─ supabase.ts          # createClient
│  │  └─ realtime.ts          # presence（4人の位置同期）
│  ├─ game/                   # PixiJSの街エンジン
│  │  ├─ TownScene.ts         # マップ描画・カメラ・入力（十字キー/キーボード）
│  │  ├─ building.ts          # 建物スプライト（接地点=下端中央）
│  │  ├─ avatar.ts            # アバタースプライト
│  │  └─ assets.ts            # ローダー
│  ├─ features/
│  │  ├─ auth/                # 会員登録/ログイン/招待初回設定
│  │  ├─ markets/             # マーケット一覧/入場
│  │  ├─ town/                # 街マップ画面（U3）＋紹介ウィンドウ（U4）
│  │  ├─ shops/               # 店舗詳細/一覧
│  │  ├─ avatar/              # アバター選択
│  │  ├─ mypage/              # マイページ/お気に入り
│  │  ├─ owner/               # 店舗オーナー（情報編集/建物選択/写真/公開）
│  │  └─ admin/               # 管理（マーケット/配置/オーナー発行/店舗/ユーザー/アセット/お知らせ）
│  ├─ components/             # 共通UI（ボタン/カード/ポップアップ等）
│  ├─ styles/                 # tailwind / tokens
│  └─ routes.tsx              # ルーティング＋ロールガード
├─ docs/                      # requirements.md / architecture.png をコピー
├─ .env.local                 # ※コミットしない
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
```

## 環境変数（例）
```
# .env.local（gitignore対象）
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
# Vercel側にも同じ値を設定（Production / Preview）
```

## ロールとルートガード
- `profiles.role`：`general` / `shop_owner` / `admin`
- ルートで role を判定し、`/admin/*` は admin、`/owner/*` は shop_owner のみ許可
- DB側は **RLS** で二重に保護（`db-schema.sql` 参照）

## 初期セットアップ手順（要約）
```bash
npm create vite@latest web-shotengai-app -- --template react-ts
cd web-shotengai-app
npm i pixi.js @supabase/supabase-js react-router-dom
npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
# public/assets/ に モックの assets/ をコピー
# docs/ に requirements.md / architecture.png をコピー
# .env.local に Supabase の値を設定
npm run dev
```
