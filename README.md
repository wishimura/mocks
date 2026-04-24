# HTML Mock Gallery

お客さま向けに制作したWebアプリのHTMLモック集です。
`index.html` がトップのモック一覧で、各アプリはサブフォルダに自己完結しています。

**DB接続なし・純粋な HTML / CSS / JavaScript のみ** で動作するので、
Vercel / Netlify / GitHub Pages など静的ホスティングに置くだけで公開できます。

## 一覧

| モック | 対象 | パス | 概要 |
|--------|------|------|------|
| Citrus Salon Members App | Citrus Salon（酵素風呂サロン） | [`/citrus/`](citrus/) | 回数券デジタル管理・来店履歴・LINE来店誘致/教育配信でLTV向上 |
| イベント管理アプリ | 汎用 / 参考モック | [`/event-management/`](event-management/) | 参加者のイベント申込・チケット・領収書、運営のイベント作成・受付・請求管理 |

## 新しいモックの追加方法

1. ルート直下に `<mock-name>/` ディレクトリを作成
2. その中に `index.html` + 必要な `css/`, `js/`, 画面ファイル群を自己完結で配置
3. ルートの `index.html` の `.grid` にカードを1枚追加
4. （必要なら）`vercel.json` の `rewrites` に `/<mock-name>` → `/<mock-name>/index.html` を追加

各モックは相対パス（`css/...`, `../css/...` など）でリソース参照するので、
ディレクトリを丸ごと配置すれば動きます。

## ローカルで確認

```bash
# 何でもOK。例:
python3 -m http.server 8000
# http://localhost:8000/ にアクセス
```

## Vercelにデプロイ

このリポジトリをVercelにImportするだけ。Framework Presetは **Other**。
ビルドコマンド・出力ディレクトリは不要です。
