# CLAUDE.md

このリポジトリはお客さまへの提案用 **HTMLモック集（ギャラリー）** です。
将来のClaudeセッションもこのファイルを参考に、同じ構成でモックを追加してください。

## このリポジトリの目的

- 要件がまだ曖昧なお客さまに「こういう画面になりますよ」と見せるための**静的HTMLモック**
- DB・API・ビルドツールは**使わない**（純粋 HTML / CSS / JavaScript のみ）
- Vercelで静的ホスティング → 本番URL `https://mocks-psi.vercel.app/`

## ディレクトリ構成（ルール）

```
/
├── index.html                ← ギャラリー（モック一覧）。新モック追加時にカードを1枚足す
├── vercel.json               ← /<mock-name>/ の rewrites を書く
├── README.md
├── CLAUDE.md                 ← このファイル
└── <mock-name>/              ← 1モック1ディレクトリ・自己完結
    ├── index.html            ← ロール選択 or エントリ
    ├── css/style.css         ← そのモック専用（他モックと共有しない）
    ├── js/app.js             ← そのモック専用
    ├── user/                 ← エンドユーザー側の画面群
    └── admin/                ← 管理者・スタッフ側の画面群
```

**各モックは完全に自己完結**させる。共通CSS/JSは作らない。
デザインがお客さまごとに全く違うので、共通化すると破綻する。

## 新しいモックを追加する手順

1. お客さまの情報を調査（WebSearchで会社名・業種・HPの雰囲気を把握）
2. ルート直下に `<mock-name>/` ディレクトリを作成（英小文字・ハイフン区切り）
3. 中身を自己完結で配置:
   - `<mock-name>/index.html`（ロール選択）
   - `<mock-name>/css/style.css`
   - `<mock-name>/js/app.js`
   - `<mock-name>/user/*.html`
   - `<mock-name>/admin/*.html`
4. ルートの `/index.html` の `.grid` 内に `<a class="mock">` カードを1枚追加
5. `/vercel.json` の redirects に1行追加（相対パスを壊さないため、末尾スラッシュ付きURLに寄せる）:
   ```json
   { "source": "/<mock-name>", "destination": "/<mock-name>/", "permanent": false }
   ```
   ※ `rewrites` は使わない。rewritesはブラウザURLを書き換えないので、HTML内の相対パス（`css/...` など）が `/css/...` にズレて 404 になる。`redirects` で末尾 `/` 付きに飛ばしてから、Vercelがディレクトリの `index.html` を自動配信する形にする。

## デザイン方針

- **お客さまのHP・業種の雰囲気に合わせる**（カラー・フォント・余白感）。テンプレ使い回しはしない
- カラー・フォントはお客さまごとに決め打ち（CSS変数で）
- アイコンは自前SVG（Lucide風・線画、`stroke="currentColor"`）を `js/app.js` 内に `ICONS` オブジェクトで持ち、`<span class="icon" data-icon="name"></span>` で呼び出す
- レスポンシブ: 〜768px モバイル（下部タブナビ）、以上はデスクトップ
- ボタンの最小タップ領域 48px、フォントは最低14px

## モック画面の典型構成

ほぼどのモックでも以下の構成に落ち着く（調整は自由）:

**ユーザー側**: ログイン / ホーム / メイン機能フォーム / 完了画面 / 一覧or履歴 / マイページ
**管理者側**: ログイン / ダッシュボード / メイン機能管理 / 顧客・データ一覧 / 詳細 / 設定

ボトムナビは5項目を目安に。

## 動く対話（JavaScriptで実装するもの）

- ログインフォーム送信 → 指定先に遷移（`data-login` + `data-login-to`）
- ボタン遷移（`data-goto="next.html"`）
- 選択肢のハイライト（`data-select-group` + `data-select`）
- フィルタチップの切替（`data-filter-group`）
- 検索フィルタ（`data-search-input` + `data-searchable` + `data-name`）
- モック動作のダイアログ（`data-demo="メッセージ"` → `alert()`）

サーバー通信や実データは**書かない**。alertで十分。

## Gitワークフロー

- 作業ブランチ: セッション起動時に指定される feature ブランチ（例 `claude/<slug>`）
- 作業完了したらPRを作成 → デフォルトブランチにマージ
- デフォルトブランチは `claude/event-management-html-mock-G9Z6e`（歴史的経緯、変更しない）
- マージすると Vercel が自動で Production にデプロイ（1〜2分）

## やらないこと

- ビルドツール（Next.js, Vite等）の導入
- 共通CSSやコンポーネントライブラリの作成
- DB接続・API呼び出しの実装
- 旧モックの削除（過去の提案として残す）
- お客さま名の英字表記を勝手に省略する（正式名があればそれに従う）

## 参考: 既存モック

| ディレクトリ | 対象 | 特徴 |
|--------------|------|------|
| `laniola/` | Lani Ola（酵素風呂サロン） | ウッディブラウン+セージグリーン、Hot Pepper予約連動・回数券デジタル・LINE教育配信（POSは将来対応） |
| `event-management/` | 汎用サンプル | ブルー系、イベント申込・チケット・請求管理 |
