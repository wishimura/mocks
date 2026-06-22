# Web商店街 — 本番開発 引き継ぎパッケージ

このフォルダは、デザインモック（このリポジトリ）から **本番アプリ用の新リポジトリ**へ移る際の引き継ぎ資料一式です。

> 本番は別スタック（React + TypeScript + PixiJS + Supabase）。モックは「移動」ではなく **新リポジトリで作り直し＋ここの資産を引き継ぐ** のが前提。

## 収録物
| ファイル | 内容 |
|---|---|
| `README.md`（本書） | 移行手順チェックリスト |
| `asset-spec.md` | 画像アセットの規格（建物/アバター/地面/小物/背景）＋AIプロンプト |
| `design-tokens.md` | 配色・フォント・角丸などのデザイントークン |
| `project-structure.md` | 本番の推奨ディレクトリ構成・技術スタック・環境変数 |
| `db-schema.sql` | Supabase(PostgreSQL) 初期スキーマ案（RLS方針つき） |
| （参照）`../docs/requirements.md` | 要件定義（ロール・画面一覧・スコープ） |
| （参照）`../docs/architecture.png` | システム構成図 |
| （参照）`../assets/` | 再利用するAIアート（建物3種・地面・道・木・背景） |

---

## 移行手順チェックリスト

### 1. 新リポジトリを作る
- [ ] GitHubで新規リポジトリ作成（例 `web-shotengai-app`、**Private** 推奨）
- [ ] ローカルにclone

### 2. プロジェクト初期化
- [ ] `npm create vite@latest web-shotengai-app -- --template react-ts`
- [ ] PixiJS 等を導入：`npm i pixi.js @supabase/supabase-js`、`npm i -D tailwindcss postcss autoprefixer`
- [ ] `project-structure.md` のツリーに沿ってディレクトリを用意

### 3. 資産を引き継ぐ
- [ ] このリポジトリの `web-shotengai/assets/` を新repoの `public/assets/`（or `src/assets/`）へコピー
- [ ] `web-shotengai/docs/`（要件・構成図）を新repoの `docs/` へコピー
- [ ] `design-tokens.md` の値を Tailwind 設定 or CSS変数に反映
- [ ] `asset-spec.md` をアートチーム/AI生成の指示書として共有

### 4. バックエンド（Supabase）
- [ ] Supabaseプロジェクト作成
- [ ] `db-schema.sql` を SQL Editor で実行（テーブル＋RLS）
- [ ] Storageバケット作成（`buildings` / `avatars` / `products` / `ground` 等）＋公開設定
- [ ] Authのメール招待（店舗オーナー発行フロー）設定

### 5. ホスティング（Vercel）
- [ ] Vercelに新リポジトリを接続（pushで自動デプロイ）
- [ ] 環境変数を設定（`project-structure.md` 参照：Supabase URL / anon key 等）
- [ ] 独自ドメイン割当（SSL自動）

### 6. 運用
- [ ] `main` ブランチ保護、PRベース運用
- [ ] `.env` はコミットしない（`.gitignore`）

### 7. モックリポジトリ
- [ ] このリポジトリ（mocks）は **削除せず**、提案・参考用に残す

---

## メモ
- 本番開発を始めたら、**新リポジトリを指定した別セッション**を立てれば、そこで実装（React/PixiJS/Supabase）を直接手伝えます。
- まず作る画面の優先順位（MVPスコープ）は別途相談：最有力は「会員登録/ログイン → マーケット入場 → 歩く街(U3) → 店紹介→EC」の一本道＋管理のマーケット/店舗最小。
