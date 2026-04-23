# イベント管理アプリ HTML モック

実開発前の画面設計を検証するためのデザインモックです。
純粋な HTML / CSS / JavaScript のみで構成されており、ビルドや外部依存はありません。
アイコンはすべてシンプルな線画 SVG（Lucide風）を使用。

## 入り口

[`index.html`](index.html) → ロール選択 → 参加者 / 運営者 のログインへ

## 画面構成

### 参加者側（`/user/`）
| 画面 | ファイル |
|------|---------|
| ログイン | [user/login.html](user/login.html) |
| イベントを探す（ホーム） | [user/events.html](user/events.html) |
| イベント詳細 | [user/event-detail.html](user/event-detail.html) |
| 申込フォーム | [user/apply.html](user/apply.html) |
| 申込完了 | [user/apply-complete.html](user/apply-complete.html) |
| 申込履歴 | [user/my-events.html](user/my-events.html) |
| 当日チケット（QR） | [user/ticket.html](user/ticket.html) |
| 支払い・領収書一覧 | [user/receipts.html](user/receipts.html) |
| 領収書詳細（PDF） | [user/receipt-detail.html](user/receipt-detail.html) |
| マイページ | [user/mypage.html](user/mypage.html) |

参加者ボトムメニュー: **ホーム / 申込履歴 / チケット / 支払い / マイページ**

### 運営者側（`/admin/`）
| 画面 | ファイル |
|------|---------|
| ログイン | [admin/login.html](admin/login.html) |
| ダッシュボード | [admin/dashboard.html](admin/dashboard.html) |
| イベント一覧 | [admin/events.html](admin/events.html) |
| イベント作成 | [admin/event-new.html](admin/event-new.html) |
| イベント詳細・申込者管理 | [admin/event-detail.html](admin/event-detail.html) |
| 受付（ワンタップ） | [admin/reception.html](admin/reception.html) |
| 請求一覧 | [admin/invoices.html](admin/invoices.html) |
| 請求詳細（PDF） | [admin/invoice-detail.html](admin/invoice-detail.html) |
| マイページ | [admin/mypage.html](admin/mypage.html) |

運営ボトムメニュー: **ホーム / イベント / 受付 / 請求 / マイページ**

## UI 要件チェック

- [x] レスポンシブ対応（〜768px モバイル、以上はデスクトップ）
- [x] スマホ用ボトムメニュー
- [x] ボタンは大きめ（最小タップ領域 48px）
- [x] 直感的な操作（ワンタップ受付・絞り込みチップ・検索バー）
- [x] シンプルな線画アイコン（SVG／Lucide風、すべて `currentColor`）

## モックで動く対話

- 参加者 / 運営者 のログイン→それぞれのホームへ遷移
- 運営受付画面の名前検索（部分一致）
- 運営受付画面の **ワンタップ受付**（ステータス＋カウンター更新）
- フィルタチップの切替
- 申込フローの遷移（申込→完了→チケット）
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

- QR コードによる受付（参加者画面のQR→運営側でカメラスキャン）
- オンライン決済（Stripe）で申込時に決済
- メール配信（申込確認・リマインダー・領収書送付）
- キャンセル待ち・抽選機能
- 複数組織（マルチテナント）対応・権限分離
- 参加履歴に基づくリピーター分析 / 招待メール
- Slack / LINE 通知連携
