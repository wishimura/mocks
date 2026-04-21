# イベント管理アプリ HTML モック

実開発前の画面設計を検証するためのデザインモックです。
純粋な HTML / CSS / JavaScript のみで構成されており、ビルドや外部依存はありません。

## 公開URL (GitHub Pages)

リポジトリ Settings → Pages で、ブランチを `claude/event-management-html-mock-G9Z6e` / root に設定すると
以下のような URL で公開されます：

```
https://<username>.github.io/mocks/login.html
```

ローカルで確認する場合は、このフォルダを開いて `login.html` をブラウザで表示するだけで動作します。

## 画面一覧

| # | 画面 | ファイル |
|---|------|---------|
| 1 | ログイン | [login.html](login.html) |
| 2 | ダッシュボード | [dashboard.html](dashboard.html) |
| 3 | イベント一覧 | [events.html](events.html) |
| 4 | イベント詳細（申込者一覧・受付状況） | [event-detail.html](event-detail.html) |
| 5 | イベント作成 | [event-new.html](event-new.html) |
| 6 | 申込画面（ユーザー側） | [apply.html](apply.html) |
| 7 | 受付画面（名前検索・ワンタップ受付） | [reception.html](reception.html) |
| 8 | 請求一覧 | [invoices.html](invoices.html) |
| 9 | 請求詳細（PDFプレビュー） | [invoice-detail.html](invoice-detail.html) |
| 10 | マイページ | [mypage.html](mypage.html) |

## UI 要件の確認

- [x] レスポンシブ対応（〜768px はモバイル、768px+ はデスクトップ）
- [x] スマホ用ボトムメニュー（ホーム / イベント / 受付 / 請求 / マイページ）
- [x] ボタンは大きめ（最小タップ領域 48px）
- [x] 直感的な操作（ワンタップ受付、絞り込みチップ、検索バー）
- [x] シンプルなカラー（ブランド色 1 つ＋ステータス色）

## モックで動く対話

- ログイン → ダッシュボード遷移
- 受付画面の名前検索（部分一致）
- 受付画面のワンタップ受付（ステータス＋カウンター更新）
- フィルタチップの切り替え
- 申込ボタンのフィードバック
- PDF 出力ボタン（ダイアログのみ）

## 想定する実開発構成（参考）

| 項目 | 技術 |
|------|------|
| フロントエンド | Next.js (App Router) + TypeScript |
| スタイリング | Tailwind CSS |
| DB | Neon (Postgres) |
| ORM | Prisma or Drizzle |
| 認証 | NextAuth / Clerk |
| PDF 出力 | @react-pdf/renderer |
| ホスティング | Vercel |

## 今後の拡張案

- QR コードによる受付（申込完了メールに QR、受付画面でスキャン）
- オンライン決済（Stripe）対応
- メール配信（リマインダー / 領収書送付）
- 複数イベント同時開催時の会場別受付
- キャンセル待ち・抽選機能
- Slack / LINE との通知連携
- 管理者の権限分離（運営 / 受付スタッフ / 閲覧のみ）
- 参加履歴に基づくリピーター分析
