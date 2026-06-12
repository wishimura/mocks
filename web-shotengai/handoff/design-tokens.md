# デザイントークン

モックで使用している配色・フォント・形状の定義。本番のTailwind設定 or CSS変数にそのまま反映できる。

## カラー
| 用途 | 変数 | 値 |
|---|---|---|
| プライマリ（提灯オレンジ） | `--primary` | `#e8623d` |
| プライマリ濃 | `--primary-dark` | `#c64a29` |
| プライマリ淡 | `--primary-light` | `#fdeae3` |
| アクセント（ティール） | `--accent` | `#2bb3a3` |
| アクセント淡 | `--accent-light` | `#d8f3ef` |
| ネイビー（コントラスト） | `--navy` | `#2a3550` |
| テキスト | `--text` | `#2e3340` |
| テキスト淡 | `--text-muted` | `#8b8f9c` |
| ボーダー | `--border` | `#eee4da` |
| ボーダー2 | `--border-2` | `#e6dccf` |
| 背景（生成り） | `--bg` | `#faf5ee` |
| 背景2 | `--bg-2` | `#f2eadf` |
| カード | `--card` | `#ffffff` |
| 成功 | `--success` | `#4f9d5d` |
| 注意 | `--warn` | `#e0a02c` |
| 危険 | `--danger` | `#d2583f` |

### ゲーム風ポップアップ（羊皮紙＋木枠）
| 用途 | 値 |
|---|---|
| 羊皮紙（上→下） | `#f6e8c6` → `#efdcb2` |
| 木枠（外線） | `#7a4f24` |
| 内側ゴールド線 | `#e7c98e` |
| 見出し茶 | `#4a2f15` / `#9a6b2a` |
| 金ボタン（上→下） | `#d8af63` → `#b0812f` |
| 木札ボタン（上→下） | `#6f4d2b` → `#523619` |

## フォント
- 基本：`"M PLUS Rounded 1c", "Noto Sans JP", system-ui, sans-serif`
- 見出しは太め（700〜800）。※明朝はゲームUIでは不採用（店名はゴシック）

## 形状・余白
| 項目 | 値 |
|---|---|
| 角丸（標準） | `16px` |
| 角丸（小） | `11px` |
| 影（標準） | `0 1px 3px rgba(60,40,20,.07), 0 1px 2px rgba(60,40,20,.05)` |
| 影（大） | `0 14px 34px rgba(60,40,20,.16)` |
| ボタン最小タップ | 高さ48px / 文字15px |

## Tailwind 反映例（抜粋）
```js
// tailwind.config.js
export default {
  theme: { extend: {
    colors: {
      primary: { DEFAULT:'#e8623d', dark:'#c64a29', light:'#fdeae3' },
      accent:  { DEFAULT:'#2bb3a3', light:'#d8f3ef' },
      navy: '#2a3550',
      ink: '#2e3340', muted:'#8b8f9c',
      paper: '#faf5ee', paper2:'#f2eadf',
    },
    borderRadius: { xl:'16px', lg:'11px' },
    fontFamily: { sans:['"M PLUS Rounded 1c"','"Noto Sans JP"','system-ui','sans-serif'] },
  }},
}
```
