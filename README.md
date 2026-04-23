# Lani Ola Members App — HTML モック

Lani Ola（酵素風呂サロン）向けの、会員アプリ + スタッフ管理画面のデザインモックです。
純粋な HTML / CSS / JavaScript のみで構成されており、ビルドや外部依存（DB 等）はありません。
POS（TEC）との顧客・売上データ連携、および LINE 公式アカウント連携を前提とした画面を含んでいます。

## コンセプト

- 会員は LINE / 会員証アプリから **予約〜来店〜次回案内** まで完結
- スタッフは **POS で発生した顧客・売上データを自動で一元化** して閲覧・セグメント配信
- 既存の POS（TEC）と LINE の中間レイヤーとして「会員アプリ」が入る想定

## 入り口

[`index.html`](index.html) → ロール選択 → 会員 / スタッフ のログインへ

## 画面構成

### 会員側（`/user/`）
| 画面 | ファイル |
|------|---------|
| ログイン（LINEログイン対応） | [user/login.html](user/login.html) |
| ホーム（次回予約・お知らせ） | [user/home.html](user/home.html) |
| 予約（店舗・日時・コース選択） | [user/booking.html](user/booking.html) |
| 予約完了 | [user/booking-complete.html](user/booking-complete.html) |
| 会員証（QR・ポイント・回数券） | [user/membership.html](user/membership.html) |
| 来店・購入履歴（POS連動） | [user/history.html](user/history.html) |
| マイページ（連携設定） | [user/mypage.html](user/mypage.html) |

ボトムメニュー: **ホーム / 予約 / 会員証 / 来店履歴 / マイページ**

### スタッフ側（`/admin/`）
| 画面 | ファイル |
|------|---------|
| スタッフログイン | [admin/login.html](admin/login.html) |
| ダッシュボード（POS/LINE連携状況） | [admin/dashboard.html](admin/dashboard.html) |
| 予約管理 | [admin/reservations.html](admin/reservations.html) |
| 顧客台帳（POS自動同期） | [admin/customers.html](admin/customers.html) |
| 顧客詳細（POS購入履歴・LINE履歴） | [admin/customer-detail.html](admin/customer-detail.html) |
| LINE配信（セグメント配信） | [admin/line-campaign.html](admin/line-campaign.html) |
| 設定（外部連携・店舗情報） | [admin/mypage.html](admin/mypage.html) |

ボトムメニュー: **ホーム / 予約 / 顧客 / LINE配信 / 設定**

## 連携の考え方（モック上の表現）

| 連携先 | 役割 | モック上での見え方 |
|--------|------|--------------------|
| TEC POS | 会員情報・売上・回数券を一元管理 | 顧客一覧の「POS同期」バッジ、顧客詳細の購入履歴、同期ステータス |
| LINE公式アカウント | 予約通知・リマインダー・セグメント配信 | LINEログイン、会員マイページの連携設定、配信作成・履歴 |
| 会員アプリ | 上記 2 つをつなぐフロント | 会員証QR（POSレジで読取想定）、予約フォーム、来店履歴 |

## モックで動く対話

- 会員／スタッフのログイン → それぞれのホームへ遷移
- 予約フローの遷移（店舗→日時→コース→完了→会員証表示）
- 店舗・日時・コース・オプションの選択ハイライト
- 予約一覧・顧客台帳の名前検索（部分一致）
- フィルタチップの切替
- LINE個別メッセージ／配信ボタン（ダイアログのみ）
- PDF 出力・CSV 出力ボタン（ダイアログのみ）

## デザイン

- カラー: ウッディブラウン（酵素風呂の檜）+ セージグリーン + クリーム
- フォント: Shippori Mincho（見出し）+ Noto Sans JP（本文）
- アイコン: シンプルな線画 SVG（Lucide風、すべて `currentColor`）
- レスポンシブ: 〜768px モバイル（下部タブ）、以上はデスクトップ

## 想定する実開発構成（参考）

| 項目 | 技術 |
|------|------|
| フロントエンド | Next.js (App Router) + TypeScript |
| スタイリング | Tailwind CSS |
| DB | Postgres（Neon / Supabase 等） |
| 認証 | NextAuth（メール + LINE Login） |
| 外部連携 | TEC POS API / Webhook、LINE Messaging API |
| ホスティング | Vercel |

## 実装フェーズの分け方（提案）

1. **フェーズ1 — MVP**: 会員証・予約・来店履歴（POSから参照のみ）、LINEログイン
2. **フェーズ2**: POS双方向同期（回数券残・ポイント書き戻し）、LINEセグメント配信
3. **フェーズ3**: ECでの物販販売、開業支援コンサルの商談管理
