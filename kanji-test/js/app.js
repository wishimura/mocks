// 5年 漢字テスト（光村図書『国語五 銀河』1学期の新出漢字に準拠）モック
// 使い方: <span class="icon" data-icon="name"></span>
const ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-9.5z"/></svg>',
  pencil: '<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  hand: '<svg viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/></svg>',
  list: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chevron: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  teacher: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="13" rx="1"/><path d="M8 21l4-5 4 5M6 8h7M6 11h4"/></svg>',
  child: '<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="3"/><path d="M9 22v-6l-2-2 1.5-4a2 2 0 0 1 1.9-1.4h3.2A2 2 0 0 1 17 10l1.5 4-2 2v6"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/></svg>',
  eraser: '<svg viewBox="0 0 24 24"><path d="M20 20H8.5L3.6 15.1a2 2 0 0 1 0-2.8L13.3 2.6a2 2 0 0 1 2.8 0l4.3 4.3a2 2 0 0 1 0 2.8L11 19"/><path d="M6 11l7 7"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2l3 7 7 .7-5.3 4.7 1.6 7.1L12 18l-6.3 3.5L7.3 14.4 2 9.7 9 9z"/></svg>',
  flame: '<svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.3.3 1.5 1.3 2.8 2.5 2.8z"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 21a2 2 0 0 0 4 0"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  download: '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
};

// ---------------------------------------------------------------
// 出題データ
// 光村図書『国語五 銀河』（令和6年度版）の新出漢字のうち、1学期に習う字を
// 教科書の新出順で7つのまとまりに分けたもの。
// 例文は {答えの語|よみ} の形。語の外の送りがなは問題文にそのまま残す。
// ---------------------------------------------------------------
const UNITS = [
  { no: 1, name: "かんがえるのって おもしろい／銀色の裏地", month: "4月" },
  { no: 2, name: "図書館を使いこなそう／漢字の成り立ち", month: "4月" },
  { no: 3, name: "きいて、きいて、きいてみよう／見立てる・言葉の意味が分かること／原因と結果", month: "5月" },
  { no: 4, name: "敬語／日常を十七音で", month: "5〜6月" },
  { no: 5, name: "1学期 まとまり⑤", month: "6月" },
  { no: 6, name: "1学期 まとまり⑥", month: "6〜7月" },
  { no: 7, name: "1学期 まとまり⑦", month: "7月" },
];

const RAW = [
  // まとまり① 像 経 情 象 絶 厚 賞 状 喜 解
  [1, "像", "未来の町のすがたを{想像|そうぞう}する。"],
  [1, "経", "キャンプで楽しい{経験|けいけん}をした。"],
  [1, "情", "明るい{表情|ひょうじょう}で話す。"],
  [1, "象", "動物園で大きな{象|ぞう}を見た。"],
  [1, "絶", "次の試合は{絶対|ぜったい}に負けない。"],
  [1, "厚", "図書館で{厚|あつ}い本をかりる。"],
  [1, "賞", "作文コンクールで{賞|しょう}をもらった。"],
  [1, "状", "友だちに{年賀状|ねんがじょう}を書く。"],
  [1, "喜", "みんなで優勝を{喜|よろこ}ぶ。"],
  [1, "解", "算数の問題を{解|と}く。"],
  // まとまり② 容 技 術 適 許 可 複 構 桜 銅 破 修 復 眼 停 祖 準 備 貿 易 際 潔
  [2, "容", "話の{内容|ないよう}をまとめる。"],
  [2, "技", "鉄ぼうの{技|わざ}を練習する。"],
  [2, "術", "週末に{美術館|びじゅつかん}へ行く。"],
  [2, "適", "{適切|てきせつ}な言葉を選ぶ。"],
  [2, "許", "母が外出を{許|ゆる}してくれた。"],
  [2, "可", "この部屋は写真さつえいが{可能|かのう}です。"],
  [2, "複", "{複数|ふくすう}の意見を聞く。"],
  [2, "構", "作文の{構成|こうせい}を考える。"],
  [2, "桜", "校庭の{桜|さくら}がさいた。"],
  [2, "銅", "リレーで{銅|どう}メダルを取った。"],
  [2, "破", "大切な紙を{破|やぶ}ってしまった。"],
  [2, "修", "こわれた自転車を{修理|しゅうり}する。"],
  [2, "復", "家で漢字の{復習|ふくしゅう}をする。"],
  [2, "眼", "目がいたいので{眼科|がんか}に行く。"],
  [2, "停", "かみなりで{停電|ていでん}になった。"],
  [2, "祖", "夏休みに{祖父|そふ}の家へ行く。"],
  [2, "準", "わたしたちのチームが{準決勝|じゅんけっしょう}に進んだ。"],
  [2, "備", "台風に{備|そな}えて水を用意する。"],
  [2, "貿", "日本は外国との{貿易|ぼうえき}がさかんだ。"],
  [2, "易", "最初は{易|やさ}しい問題からとく。"],
  [2, "際", "{国際|こくさい}交流のイベントに参加する。"],
  [2, "潔", "手を洗って{清潔|せいけつ}にする。"],
  // まとまり③ 質 報 告 属 確 識 因 造 似 限 留 現 接
  [3, "質", "分からないことを先生に{質問|しつもん}する。"],
  [3, "報", "テレビで天気{予報|よほう}を見る。"],
  [3, "告", "新聞の{広告|こうこく}を切りぬく。"],
  [3, "属", "兄はサッカー部に{所属|しょぞく}している。"],
  [3, "確", "答えをもう一度{確|たし}かめる。"],
  [3, "識", "本を読んで{知識|ちしき}を広げる。"],
  [3, "因", "けんかの{原因|げんいん}を考える。"],
  [3, "造", "古い{木造|もくぞう}の家に住む。"],
  [3, "似", "妹は母によく{似|に}ている。"],
  [3, "限", "{限|かぎ}られた時間で問題をとく。"],
  [3, "留", "家族が出かけたので{留守|るす}番をする。"],
  [3, "現", "ついに夢が{実現|じつげん}した。"],
  [3, "接", "大きな台風が{接近|せっきん}している。"],
  // まとまり④ 応 勢 河 歴 史 幹 招 句 常 序
  [4, "応", "みんなの期待に{応|こた}える。"],
  [4, "勢", "広場に{大勢|おおぜい}の人が集まった。"],
  [4, "河", "大きな船が{運河|うんが}を進む。"],
  [4, "歴", "{歴代|れきだい}の優勝チームを調べる。"],
  [4, "史", "日本の{歴史|れきし}を学ぶ。"],
  [4, "幹", "太い木の{幹|みき}にさわる。"],
  [4, "招", "たん生会に友だちを{招|まね}く。"],
  [4, "句", "文に{句読点|くとうてん}をつける。"],
  [4, "常", "{日常|にちじょう}の出来事を十七音で表す。"],
  [4, "序", "{順序|じゅんじょ}よく説明する。"],
  // まとまり⑤ 武 士 資 査 性 非 総
  [5, "武", "むかしの{武士|ぶし}のくらしを調べる。"],
  [5, "士", "将来は{消防士|しょうぼうし}になりたい。"],
  [5, "資", "発表のための{資料|しりょう}を集める。"],
  [5, "査", "川の水のよごれを{調査|ちょうさ}する。"],
  [5, "性", "金ぞくの{性質|せいしつ}を調べる。"],
  [5, "非", "{非常口|ひじょうぐち}の場所を確かめる。"],
  [5, "総", "{総合|そうごう}的な学習の時間に発表する。"],
  // まとまり⑥ 測 舎 往 演 刊 肥 製 謝 罪 暴 防 鉱 績 志 航
  [6, "測", "毎朝、気温を{測|はか}る。"],
  [6, "舎", "新しい{校舎|こうしゃ}に入る。"],
  [6, "往", "駅まで{往復|おうふく}で三十分かかる。"],
  [6, "演", "学習発表会で劇を{演|えん}じる。"],
  [6, "刊", "毎朝、新聞の{朝刊|ちょうかん}を読む。"],
  [6, "肥", "畑に{肥料|ひりょう}をまく。"],
  [6, "製", "この時計は{日本製|にほんせい}だ。"],
  [6, "謝", "お世話になった人に{感謝|かんしゃ}する。"],
  [6, "罪", "自分の{罪|つみ}をみとめる。"],
  [6, "暴", "つないでいた犬が{暴|あば}れる。"],
  [6, "防", "手洗いでかぜを{防|ふせ}ぐ。"],
  [6, "鉱", "博物館で{鉱物|こうぶつ}の標本を見る。"],
  [6, "績", "テストの{成績|せいせき}が上がった。"],
  [6, "志", "{志|こころざし}を高くもつ。"],
  [6, "航", "船で長い{航海|こうかい}に出る。"],
  // まとまり⑦ 夢 編 険 断 境 態 逆 判 圧
  [7, "夢", "空を飛ぶ{夢|ゆめ}を見た。"],
  [7, "編", "毛糸でマフラーを{編|あ}む。"],
  [7, "険", "{険|けわ}しい山道を登る。"],
  [7, "断", "友だちのさそいを{断|ことわ}る。"],
  [7, "境", "飛行機から{国境|こっきょう}の山々を見る。"],
  [7, "態", "授業を受ける{態度|たいど}を見直す。"],
  [7, "逆", "{逆|ぎゃく}の方向へ歩き出す。"],
  [7, "判", "どちらにするか自分で{判断|はんだん}する。"],
  [7, "圧", "台風が近づき{気圧|きあつ}が下がる。"],
];

// 1字につき2つめの例文（100問テストができるように、別のことばで出題）
const RAW2 = [
  ["像", "公園に{銅像|どうぞう}が立っている。"], ["経", "引っこしてから一年が{経|た}った。"],
  ["情", "{友情|ゆうじょう}を大切にする。"], ["象", "第一{印象|いんしょう}が大切だ。"],
  ["絶", "遠くの友だちとの連らくが{絶|た}える。"], ["厚", "{厚紙|あつがみ}で箱を作る。"],
  ["賞", "くじ引きで{賞品|しょうひん}が当たった。"], ["状", "部屋の{状態|じょうたい}を確かめる。"],
  ["喜", "合格の知らせに{大喜|おおよろこ}びする。"], ["解", "話の内容を{理解|りかい}する。"],
  ["容", "牛にゅうを{容器|ようき}に入れる。"], ["技", "新しい{技術|ぎじゅつ}を学ぶ。"],
  ["術", "祖父が{手術|しゅじゅつ}を受けた。"], ["適", "毎日{適度|てきど}な運動をする。"],
  ["許", "先生の{許可|きょか}をもらう。"], ["可", "学級会で案が{可決|かけつ}された。"],
  ["複", "大切な書類を{複写|ふくしゃ}する。"], ["構", "駅前に店を{構|かま}える。"],
  ["桜", "{桜色|さくらいろ}のハンカチを買う。"], ["銅", "むかしの{銅山|どうざん}を見学する。"],
  ["破", "長い物語を{読破|どくは}した。"], ["修", "六年生で{修学|しゅうがく}旅行に行く。"],
  ["復", "かぜが治って体調が{回復|かいふく}する。"], ["眼", "夜空の星を{肉眼|にくがん}で見る。"],
  ["停", "電車が駅に{停車|ていしゃ}する。"], ["祖", "{祖母|そぼ}に手紙を書く。"],
  ["準", "合格の{基準|きじゅん}を決める。"], ["備", "新しい{設備|せつび}が整った体育館。"],
  ["貿", "横浜は{貿易港|ぼうえきこう}として発展した。"], ["易", "{安易|あんい}に決めないようにする。"],
  ["際", "{実際|じっさい}にやってみる。"], ["潔", "手を洗わないと{不潔|ふけつ}だ。"],
  ["質", "{品質|ひんしつ}のよい野菜を選ぶ。"], ["報", "インターネットで{情報|じょうほう}を集める。"],
  ["告", "時計が正午を{告|つ}げる。"], ["属", "{金属|きんぞく}でできたスプーン。"],
  ["確", "{確実|かくじつ}に点を取る。"], ["識", "時間を{意識|いしき}して練習する。"],
  ["因", "勝利の{要因|よういん}を話し合う。"], ["造", "大きな船を{造|つく}る。"],
  ["似", "友だちの{似顔絵|にがおえ}をかく。"], ["限", "体力の{限界|げんかい}まで走った。"],
  ["留", "姉はアメリカに{留学|りゅうがく}した。"], ["現", "雲の間から月が{現|あらわ}れる。"],
  ["接", "分からないことを先生に{直接|ちょくせつ}聞く。"], ["応", "習ったことを{応用|おうよう}する。"],
  ["勢", "水が{勢|いきお}いよく流れる。"], ["河", "川の{河口|かこう}に鳥が集まる。"],
  ["歴", "選手の{経歴|けいれき}を調べる。"], ["史", "{史上|しじょう}初の記録が出た。"],
  ["幹", "{新幹線|しんかんせん}で旅行する。"], ["招", "発表会に家族を{招待|しょうたい}する。"],
  ["句", "{文句|もんく}を言わずに働く。"], ["常", "{常|つね}に笑顔をわすれない。"],
  ["序", "物語の{序章|じょしょう}を読む。"], ["武", "博物館で昔の{武器|ぶき}を見る。"],
  ["士", "大きな{力士|りきし}がしこをふむ。"], ["資", "地球の{資源|しげん}を大切にする。"],
  ["査", "病院で目の{検査|けんさ}を受ける。"], ["性", "道具の{安全性|あんぜんせい}を確かめる。"],
  ["非", "この資料は{非公開|ひこうかい}だ。"], ["総", "{総理|そうり}大臣が記者会見をする。"],
  ["測", "夜に星の{観測|かんそく}をする。"], ["舎", "古い{駅舎|えきしゃ}を写真にとる。"],
  ["往", "人の{往来|おうらい}がはげしい道。"], ["演", "劇に{出演|しゅつえん}する。"],
  ["刊", "{夕刊|ゆうかん}がとどく。"], ["肥", "この畑の土はよく{肥|こ}えている。"],
  ["製", "新しい{製品|せいひん}が発売された。"], ["謝", "けんかした友だちに{謝|あやま}る。"],
  ["罪", "{犯罪|はんざい}をなくす取り組み。"], ["暴", "{暴風|ぼうふう}警報が出た。"],
  ["防", "事故を{防止|ぼうし}する。"], ["鉱", "{鉱山|こうざん}で働く人々。"],
  ["績", "多くの{実績|じっせき}を残した選手。"], ["志", "将来の{志望|しぼう}を書く。"],
  ["航", "{航空|こうくう}写真で町を見る。"], ["夢", "読書に{夢中|むちゅう}になる。"],
  ["編", "学級新聞を{編集|へんしゅう}する。"], ["険", "車の{保険|ほけん}に入る。"],
  ["断", "道路を{横断|おうだん}する。"], ["境", "畑の{境|さかい}に木を植える。"],
  ["態", "森の動物の{生態|せいたい}を調べる。"], ["逆", "鉄ぼうで{逆上|さかあ}がりをする。"],
  ["判", "写真で{判定|はんてい}する。"], ["圧", "強い{圧力|あつりょく}をかける。"],
];

// 形やつくりが似ている字・同じ音の字（漢字えらび問題のまちがい選択肢）
const SIMILAR = {
  像: "象増蔵", 経: "径軽終", 情: "晴清精", 象: "像家衆", 絶: "給純結", 厚: "原暑圧",
  賞: "常堂当", 状: "伏犬条", 喜: "善吉幸", 解: "角説触", 容: "客浴用", 技: "枝持投",
  術: "述衛街", 適: "敵滴通", 許: "計評話", 可: "河何化", 複: "復腹福", 構: "講購溝",
  桜: "桃板松", 銅: "胴洞同", 破: "被波彼", 修: "終収習", 復: "複腹福", 眼: "根眠限",
  停: "亭定提", 祖: "組租相", 準: "順純進", 備: "補満偏", 貿: "留賀貸", 易: "湯場陽",
  際: "祭察除", 潔: "結清契", 質: "資貨賀", 報: "服幸執", 告: "吉造合", 属: "族続触",
  確: "格角権", 識: "織職式", 因: "困固団", 造: "告遣道", 似: "以仏位", 限: "眼根恨",
  留: "貿流昭", 現: "規見観", 接: "採授折", 応: "王央皇", 勢: "熱勝執", 河: "何可川",
  歴: "暦麻歳", 史: "吏使中", 幹: "乾干軒", 招: "紹昭拾", 句: "旬何区", 常: "賞堂当",
  序: "予字席", 武: "式歩無", 士: "土仕志", 資: "質貨次", 査: "検調宣", 性: "姓生正",
  非: "悲飛否", 総: "絵統綿", 測: "側則計", 舎: "社宿舌", 往: "住注径", 演: "縁園延",
  刊: "干判冊", 肥: "把肌飼", 製: "制裂型", 謝: "射謙誌", 罪: "罰非署", 暴: "爆暮暑",
  防: "坊妨訪", 鉱: "広拡銅", 績: "積責漬", 志: "誌士忘", 航: "抗港行", 夢: "墓募暮",
  編: "偏遍綿", 険: "検験剣", 断: "継新折", 境: "鏡競経", 態: "能熊様", 逆: "送迎達",
  判: "半伴版", 圧: "庄厚在",
};

const UNIT_OF = Object.fromEntries(RAW.map(([unit, kanji]) => [kanji, unit]));
const QUESTIONS = RAW.map(([, kanji, s]) => [kanji, s, true]).concat(RAW2.map(([kanji, s]) => [kanji, s, false])).map(([kanji, s, main], i) => {
  const m = s.match(/\{(.+?)\|(.+?)\}/);
  return {
    id: i,
    unit: UNIT_OF[kanji],
    kanji,
    main,
    word: m[1],
    yomi: m[2],
    before: s.slice(0, m.index),
    after: s.slice(m.index + m[0].length),
  };
});
// MAIN = 1字1問（漢字表・集計用）。QUESTIONS は2つめの例文もふくむ出題用
const MAIN = QUESTIONS.filter((q) => q.main);
const ALL_KANJI = MAIN.map((q) => q.kanji);
const byKanji = (k) => MAIN.find((q) => q.kanji === k);
const examplesOf = (k) => QUESTIONS.filter((q) => q.kanji === k);
const unitKanji = (no) => MAIN.filter((q) => q.unit === no).map((q) => q.kanji);
const unitQuestionCount = (no) => QUESTIONS.filter((q) => q.unit === no).length;

const MODES = {
  read: { label: "読み", long: "読みテスト（4たく）", prompt: "赤い字の読みを えらぼう" },
  choose: { label: "漢字えらび", long: "書きテスト（漢字えらび）", prompt: "（　）に入る漢字を えらぼう" },
  write: { label: "手書き", long: "書きテスト（手書き）", prompt: "（　）に入る漢字を マスか紙に書こう" },
};

// ---------------------------------------------------------------
// 保存（localStorage。使えない環境でも動くように try/catch）
// ---------------------------------------------------------------
const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("kanji5." + key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("kanji5." + key, JSON.stringify(value));
    } catch (e) {}
  },
  clear() {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith("kanji5.")).forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
  },
};

// 漢字ごとの状態: none（まだ） / good（できた） / weak（にがて＝さいごにまちがえた）
function kanjiStatus(k, records) {
  const r = (records || store.get("records", {}))[k];
  if (!r) return "none";
  return r.last ? "good" : "weak";
}
function summary() {
  const records = store.get("records", {});
  const s = { good: 0, weak: 0, none: 0 };
  ALL_KANJI.forEach((k) => s[kanjiStatus(k, records)]++);
  return s;
}

// ---------------------------------------------------------------
// ユーティリティ
// ---------------------------------------------------------------
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function injectIcons(root) {
  $$("[data-icon]", root).forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name] && !el.firstChild) {
      el.innerHTML = ICONS[name];
      if (!el.classList.contains("icon")) el.classList.add("icon");
    }
  });
}
function fmtDate(ts) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function sentenceHTML(q, mode, filled) {
  let mid;
  if (mode === "read") mid = `<span class="target">${esc(q.word)}</span>`;
  else mid = `<span class="blank${filled ? " filled" : ""}">${esc(filled || q.yomi)}</span>`;
  return esc(q.before) + mid + esc(q.after);
}
const MARK_OK = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38"/></svg>';
const MARK_NG = '<svg viewBox="0 0 100 100"><path d="M24 24l52 52M76 24L24 76"/></svg>';
const RES_OK = '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="12"/></svg>';
const RES_NG = '<svg viewBox="0 0 36 36"><path d="M10 10l16 16M26 10L10 26"/></svg>';

// ---------------------------------------------------------------
// 選択肢づくり
// ---------------------------------------------------------------
const DAKU = { か: "が", き: "ぎ", く: "ぐ", け: "げ", こ: "ご", さ: "ざ", し: "じ", す: "ず", せ: "ぜ", そ: "ぞ", た: "だ", ち: "ぢ", つ: "づ", て: "で", と: "ど", は: "ば", ひ: "び", ふ: "ぶ", へ: "べ", ほ: "ぼ" };
const SEI = Object.fromEntries(Object.entries(DAKU).map(([a, b]) => [b, a]));
function yomiVariants(y) {
  const out = new Set();
  const rules = [["ょう", "ょ"], ["ゅう", "ゅ"], ["ょ", "ょう"], ["ゅ", "ゅう"], ["っ", "つ"], ["う", "ん"], ["い", "え"], ["えい", "え"], ["おう", "お"], ["ん", ""]];
  rules.forEach(([a, b]) => {
    const i = y.indexOf(a);
    if (i >= 0) out.add(y.slice(0, i) + b + y.slice(i + a.length));
  });
  for (let i = 0; i < y.length; i++) {
    const c = y[i];
    const alt = DAKU[c] || SEI[c];
    if (alt) out.add(y.slice(0, i) + alt + y.slice(i + 1));
  }
  out.delete(y);
  out.delete("");
  return Array.from(out);
}
function readChoices(q) {
  const variants = shuffle(yomiVariants(q.yomi)).slice(0, 2);
  const others = shuffle(QUESTIONS.filter((o) => o.yomi !== q.yomi).map((o) => o.yomi));
  const near = others.filter((y) => Math.abs(y.length - q.yomi.length) <= 1);
  const pool = near.concat(others.filter((y) => !near.includes(y)));
  const set = new Set(variants);
  for (const p of pool) {
    if (set.size >= 3) break;
    set.add(p);
  }
  return shuffle([q.yomi, ...Array.from(set).slice(0, 3)]);
}
function kanjiChoices(q) {
  const sims = (SIMILAR[q.kanji] || "").split("").filter((c) => c !== q.kanji);
  const opts = new Set();
  shuffle(sims).forEach((c) => opts.add(q.word.replace(q.kanji, c)));
  shuffle(ALL_KANJI).forEach((c) => {
    if (opts.size < 3 && c !== q.kanji) opts.add(q.word.replace(q.kanji, c));
  });
  opts.delete(q.word);
  return shuffle([q.word, ...Array.from(opts).slice(0, 3)]);
}

// ---------------------------------------------------------------
// 共通インタラクション
// ---------------------------------------------------------------
function common() {
  injectIcons();

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".bottom-nav a, .sidebar a").forEach((a) => {
    const pages = (a.getAttribute("data-page") || "").split(",");
    if (pages.includes(path)) a.classList.add("active");
  });

  $$("[data-login]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = $("[data-name-input]", form);
      if (nameInput && nameInput.value.trim()) store.set("name", nameInput.value.trim());
      location.href = form.getAttribute("data-login-to") || "home.html";
    });
  });
  $$("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = btn.getAttribute("data-goto");
    });
  });
  $$("[data-demo]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(btn.getAttribute("data-demo") || "モック動作です");
    });
  });
  $$("[data-select-group]").forEach((group) => {
    $$("[data-select]", group).forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        $$("[data-select]", group).forEach((c) => c.classList.remove("selected"));
        el.classList.add("selected");
        group.dispatchEvent(new CustomEvent("change", { detail: el.getAttribute("data-select") }));
      });
    });
  });
  $$("[data-filter-group]").forEach((group) => {
    $$(".chip", group).forEach((chip) => {
      chip.addEventListener("click", () => {
        $$(".chip", group).forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        group.dispatchEvent(new CustomEvent("change", { detail: chip.getAttribute("data-filter") }));
      });
    });
  });
  $$("[data-reset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("これまでの記録をすべて消します。よろしいですか？")) {
        store.clear();
        location.reload();
      }
    });
  });

  const name = store.get("name", "");
  $$("[data-user-name]").forEach((el) => (el.textContent = name || "5年1組のみなさん"));
  $$("[data-user-initial]").forEach((el) => (el.textContent = (name || "5")[0]));

  const page = document.body.getAttribute("data-page");
  const fn = PAGES[page];
  if (fn) fn();
  injectIcons();
}

// ---------------------------------------------------------------
// ページごとの処理
// ---------------------------------------------------------------
const PAGES = {
  // ---------- ホーム ----------
  home() {
    const s = summary();
    const total = ALL_KANJI.length;
    const pct = s.good / total;
    const C = 2 * Math.PI * 48;
    $("#ring").innerHTML = `
      <svg viewBox="0 0 112 112"><circle class="bg" cx="56" cy="56" r="48"/>
      <circle class="fg" cx="56" cy="56" r="48" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>
      <div class="ring-label"><b>${s.good}</b><span>/ ${total}字</span></div>`;
    $("#legend").innerHTML = `
      <div><span class="legend-dot dot-good"></span>できた　<b>${s.good}</b>字</div>
      <div><span class="legend-dot dot-weak"></span>にがて　<b>${s.weak}</b>字</div>
      <div><span class="legend-dot dot-none"></span>まだ　　<b>${s.none}</b>字</div>`;
    $("#weak-count").textContent = s.weak ? `${s.weak}字を もう一度` : "まだ ありません";

    const records = store.get("records", {});
    $("#units").innerHTML = UNITS.map((u) => {
      const ks = unitKanji(u.no);
      const g = ks.filter((k) => kanjiStatus(k, records) === "good").length;
      const w = ks.filter((k) => kanjiStatus(k, records) === "weak").length;
      return `<a class="unit-row" href="select.html?units=${u.no}">
        <span class="unit-no">${u.no}</span>
        <div class="unit-body">
          <div class="unit-name">${esc(u.name)}</div>
          <div class="unit-kanji">${ks.join("")}</div>
          <div class="bar"><i class="g" style="width:${(g / ks.length) * 100}%"></i><i class="r" style="width:${(w / ks.length) * 100}%"></i></div>
        </div>
        <span class="unit-pct">${Math.round((g / ks.length) * 100)}%</span>
      </a>`;
    }).join("");

    const hist = store.get("history", []);
    $("#streak").textContent = hist.length ? `これまでに ${hist.length}回 テストしたよ` : "さいしょの テストに ちょうせんしよう";
  },

  // ---------- テストのせってい ----------
  select() {
    const params = new URLSearchParams(location.search);
    const pre = (params.get("units") || "1,2,3,4,5,6,7").split(",").map(Number);
    const box = $("#unit-checks");
    box.innerHTML = UNITS.map((u) => `
      <button type="button" class="unit-check${pre.includes(u.no) ? " on" : ""}" data-unit="${u.no}">
        <span class="box"><span data-icon="check"></span></span>
        <span class="unit-body">
          <span class="unit-name" style="display:block">${u.no}．${esc(u.name)}</span>
          <span class="unit-kanji" style="display:block">${unitKanji(u.no).join("")}</span>
        </span>
        <span class="count">${unitKanji(u.no).length}字</span>
      </button>`).join("");
    injectIcons(box);

    const state = { mode: params.get("mode") || "read", n: "100" };
    const update = () => {
      const units = $$(".unit-check.on").map((b) => b.dataset.unit);
      const count = units.reduce((a, u) => a + unitKanji(Number(u)).length, 0);
      const qCount = units.reduce((a, u) => a + unitQuestionCount(Number(u)), 0);
      const n = state.n === "all" ? qCount : Math.min(Number(state.n), qCount);
      $("#summary").textContent = units.length ? `${units.length}つのまとまり（${count}字・${qCount}問）から ${n}問` : "まとまりを えらんでね";
      $("#start").disabled = !units.length;
      $("#start").dataset.href = `test.html?units=${units.join(",")}&mode=${state.mode}&n=${state.n}`;
    };
    $$(".unit-check").forEach((b) => b.addEventListener("click", () => { b.classList.toggle("on"); update(); }));
    $("#select-all").addEventListener("click", () => {
      const allOn = $$(".unit-check").every((b) => b.classList.contains("on"));
      $$(".unit-check").forEach((b) => b.classList.toggle("on", !allOn));
      update();
    });
    $$("#mode-group [data-select]").forEach((el) => el.classList.toggle("selected", el.dataset.select === state.mode));
    $("#mode-group").addEventListener("change", (e) => { state.mode = e.detail; update(); });
    $("#n-group").addEventListener("change", (e) => { state.n = e.detail; update(); });
    $("#start").addEventListener("click", () => (location.href = $("#start").dataset.href));
    update();
  },

  // ---------- テスト本体 ----------
  test() {
    const params = new URLSearchParams(location.search);
    const mode = MODES[params.get("mode")] ? params.get("mode") : "read";
    let pool;
    if (params.get("ids")) {
      const ids = params.get("ids").split(",").map(Number);
      pool = QUESTIONS.filter((q) => ids.includes(q.id));
    } else if (params.get("kanji")) {
      const ks = params.get("kanji").split("");
      pool = QUESTIONS.filter((q) => ks.includes(q.kanji));
    } else {
      const units = (params.get("units") || "1").split(",").map(Number);
      pool = QUESTIONS.filter((q) => units.includes(q.unit));
    }
    const n = params.get("n") === "all" || !params.get("n") ? pool.length : Math.min(Number(params.get("n")), pool.length);
    const list = shuffle(pool).slice(0, n);
    const answers = [];
    let idx = 0;
    let pad = null;

    $("#quit").addEventListener("click", () => {
      if (confirm("テストを やめますか？（記録はのこりません）")) location.href = "home.html";
    });

    function record(q, ok) {
      answers.push({ id: q.id, ok });
      const recs = store.get("records", {});
      const r = recs[q.kanji] || { ok: 0, ng: 0 };
      r[ok ? "ok" : "ng"]++;
      r.last = ok;
      r.at = Date.now();
      recs[q.kanji] = r;
      store.set("records", recs);
    }
    function stamp(ok) {
      const m = $("#mark");
      m.className = "mark " + (ok ? "ok" : "ng");
      m.innerHTML = ok ? MARK_OK : MARK_NG;
      void m.offsetWidth;
      m.classList.add("show");
    }
    function showNext() {
      $("#next").classList.remove("hidden");
      $("#next").textContent = idx === list.length - 1 ? "けっかを見る" : "つぎの問題へ";
      $("#next").focus();
    }
    function finish() {
      const score = answers.filter((a) => a.ok).length;
      const result = {
        at: Date.now(),
        mode,
        units: params.get("units") || "",
        retry: !!(params.get("kanji") || params.get("ids")),
        total: answers.length,
        score,
        answers,
      };
      store.set("last", result);
      const hist = store.get("history", []);
      hist.unshift({ at: result.at, mode, units: result.units, retry: result.retry, total: result.total, score, wrong: answers.filter((a) => !a.ok).map((a) => QUESTIONS[a.id].kanji).join("") });
      store.set("history", hist.slice(0, 50));
      location.href = "result.html";
    }

    function render() {
      const q = list[idx];
      $("#count").textContent = `${idx + 1} / ${list.length}`;
      $("#bar").style.width = `${(idx / list.length) * 100}%`;
      $("#mode-tag").textContent = MODES[mode].long;
      $("#prompt").textContent = MODES[mode].prompt;
      $("#sentence").innerHTML = sentenceHTML(q, mode);
      $("#q-unit").textContent = `まとまり${q.unit}　${UNITS[q.unit - 1].name}`;
      $("#mark").className = "mark";
      $("#feedback").className = "feedback";
      $("#feedback").innerHTML = "";
      $("#next").classList.add("hidden");
      $("#choices").innerHTML = "";
      $("#write").classList.add("hidden");

      if (mode === "read" || mode === "choose") {
        const opts = mode === "read" ? readChoices(q) : kanjiChoices(q);
        const correct = mode === "read" ? q.yomi : q.word;
        const wrap = $("#choices");
        wrap.className = "choices";
        wrap.innerHTML = opts.map((o) => `<button class="choice${mode === "choose" ? " kanji" : ""}" data-v="${esc(o)}">${esc(o)}</button>`).join("");
        $$(".choice", wrap).forEach((b) => b.addEventListener("click", () => {
          const ok = b.dataset.v === correct;
          wrap.classList.add("done");
          b.classList.add(ok ? "correct" : "wrong");
          if (!ok) $$(".choice", wrap).find((x) => x.dataset.v === correct).classList.add("correct");
          if (mode === "choose") $("#sentence").innerHTML = sentenceHTML(q, mode, q.word);
          stamp(ok);
          $("#feedback").className = "feedback " + (ok ? "ok" : "ng");
          $("#feedback").innerHTML = ok
            ? "せいかい！"
            : `ざんねん　こたえは <span class="ans">${esc(q.word)}（${esc(q.yomi)}）</span>`;
          record(q, ok);
          showNext();
        }));
      } else {
        setupWrite(q);
      }
    }

    function setupWrite(q) {
      const w = $("#write");
      w.classList.remove("hidden");
      const len = q.word.length;
      const max = Math.min(window.innerWidth - 48, 680);
      const cell = Math.max(64, Math.min(130, Math.floor(max / len)));
      const area = $("#write-area");
      area.style.setProperty("--cell", cell + "px");
      $(".cells", area).innerHTML = '<div class="cell"></div>'.repeat(len);
      const canvas = $("canvas", area);
      const dpr = window.devicePixelRatio || 1;
      const width = cell * len - (len - 1) * 2;
      canvas.width = width * dpr;
      canvas.height = cell * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(4, cell / 18);
      ctx.strokeStyle = "#2a2f3a";
      let drawing = false;
      const pos = (e) => {
        const r = canvas.getBoundingClientRect();
        return [((e.clientX - r.left) / r.width) * width, ((e.clientY - r.top) / r.height) * cell];
      };
      canvas.onpointerdown = (e) => {
        drawing = true;
        canvas.setPointerCapture(e.pointerId);
        const [x, y] = pos(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 0.1, y + 0.1);
        ctx.stroke();
      };
      canvas.onpointermove = (e) => {
        if (!drawing) return;
        const [x, y] = pos(e);
        ctx.lineTo(x, y);
        ctx.stroke();
      };
      canvas.onpointerup = canvas.onpointercancel = () => (drawing = false);
      pad = { clear: () => ctx.clearRect(0, 0, width, cell) };

      $("#reveal").classList.add("hidden");
      $("#grade").classList.add("hidden");
      $("#write-tools").classList.remove("hidden");
      $("#clear").onclick = () => pad.clear();
      $("#check").onclick = () => {
        canvas.style.pointerEvents = "none";
        $("#reveal-word").textContent = q.word;
        $("#reveal").classList.remove("hidden");
        $("#grade").classList.remove("hidden");
        $("#write-tools").classList.add("hidden");
        $("#sentence").innerHTML = sentenceHTML(q, mode, q.word);
      };
      $$("#grade [data-grade]").forEach((b) => (b.onclick = () => {
        const ok = b.dataset.grade === "ok";
        $("#grade").classList.add("hidden");
        stamp(ok);
        $("#feedback").className = "feedback " + (ok ? "ok" : "ng");
        $("#feedback").textContent = ok ? "よく書けたね！" : "つぎは書けるように 練習しよう";
        record(q, ok);
        showNext();
      }));
      canvas.style.pointerEvents = "";
    }

    $("#next").addEventListener("click", () => {
      idx++;
      if (idx >= list.length) finish();
      else render();
    });
    if (!list.length) {
      $("#sentence").textContent = "問題が ありません";
      return;
    }
    render();
  },

  // ---------- けっか ----------
  result() {
    const r = store.get("last", null);
    if (!r) {
      $("#result").innerHTML = `<div class="empty"><span data-icon="pencil"></span><p>まだ テストを していません</p></div>`;
      return;
    }
    const pct = Math.round((r.score / r.total) * 100);
    const msg = pct === 100 ? "パーフェクト！すばらしい！" : pct >= 80 ? "よくできました！" : pct >= 50 ? "もう少し！にがてを 練習しよう" : "まちがえた漢字を 見直そう";
    const hanamaru = pct >= 80
      ? `<div class="hanamaru"><svg viewBox="0 0 150 150"><path d="M75 30c-26 0-45 18-45 42 0 23 19 40 44 40 24 0 42-15 42-37 0-20-15-33-34-33-17 0-29 11-29 26 0 13 10 22 23 22 11 0 19-7 19-17 0-8-6-13-13-13"/><path d="M40 112c-8 6-14 10-20 12M110 112c8 6 14 10 20 12"/><path d="M28 40c-6-6-10-12-10-18M122 40c6-6 10-12 10-18"/></svg></div>`
      : "";
    const wrongIds = r.answers.filter((a) => !a.ok).map((a) => a.id);
    $("#result").innerHTML = `
      <div class="card score-card">
        ${hanamaru}
        <div class="score">${pct}<small>点</small></div>
        <p class="msg">${msg}</p>
        <div class="score-meta">
          <div><b>${r.score}</b>せいかい</div>
          <div><b>${r.total - r.score}</b>まちがい</div>
          <div><b>${MODES[r.mode].label}</b>形式</div>
        </div>
      </div>
      <div class="stack mt">
        ${wrongIds.length ? `<a class="btn btn-red btn-block btn-lg" href="test.html?ids=${wrongIds.join(",")}&mode=${r.mode}"><span data-icon="refresh"></span>まちがえた ${wrongIds.length}問だけ もう一度</a>` : ""}
        <div class="btn-row">
          <a class="btn btn-ghost" href="select.html">べつのテスト</a>
          <a class="btn btn-ghost" href="home.html">ホームへ</a>
        </div>
      </div>
      <h2 class="section-title"><span data-icon="list"></span>こたえあわせ</h2>
      <div class="answer-list">
        ${r.answers.map((a) => {
          const q = QUESTIONS[a.id];
          return `<div class="answer-item ${a.ok ? "ok" : "ng"}">
            <span class="res">${a.ok ? RES_OK : RES_NG}</span>
            <span class="kanji-big">${q.kanji}</span>
            <div class="body"><div class="s">${esc(q.before)}<b>${esc(q.word)}</b>${esc(q.after)}</div><div class="r">${esc(q.word)}（${esc(q.yomi)}）</div></div>
          </div>`;
        }).join("")}
      </div>`;
  },

  // ---------- 漢字表 ----------
  kanji() {
    const records = store.get("records", {});
    let filter = "all";
    let query = "";
    function draw() {
      const html = UNITS.map((u) => {
        if (filter !== "all" && filter !== "weak" && String(u.no) !== filter) return "";
        const qs = MAIN.filter((q) => q.unit === u.no)
          .filter((q) => filter !== "weak" || kanjiStatus(q.kanji, records) === "weak")
          .filter((q) => !query || examplesOf(q.kanji).some((e) => (e.kanji + e.word + e.yomi).includes(query)));
        if (!qs.length) return "";
        return `<div class="kanji-group-title">まとまり${u.no}<span>${esc(u.name)}</span></div>
          <div class="kanji-grid">${qs.map((q) => `<button class="kanji-tile ${kanjiStatus(q.kanji, records)}" data-k="${q.kanji}">${q.kanji}</button>`).join("")}</div>`;
      }).join("");
      $("#kanji-list").innerHTML = html || `<div class="empty"><span data-icon="search"></span><p>見つかりませんでした</p></div>`;
      injectIcons($("#kanji-list"));
      $$(".kanji-tile").forEach((b) => b.addEventListener("click", () => openKanji(b.dataset.k)));
    }
    function openKanji(k) {
      const q = byKanji(k);
      const r = records[k];
      const st = kanjiStatus(k, records);
      const stLabel = { good: "できた", weak: "にがて", none: "まだ" }[st];
      const bg = document.createElement("div");
      bg.className = "modal-bg";
      bg.innerHTML = `<div class="modal">
        <div class="modal-head">
          <div class="modal-kanji">${k}</div>
          <div><span class="pill ${st}">${stLabel}</span>
            <p style="margin-top:6px;font-size:14px">まとまり${q.unit}（${UNITS[q.unit - 1].month}ごろ）</p>
            <p class="muted small">${esc(UNITS[q.unit - 1].name)}</p></div>
        </div>
        <dl>
          <dt>ことば</dt><dd>${examplesOf(k).map((e) => `<span class="ex">${esc(e.word)}</span>（${esc(e.yomi)}）`).join("　")}</dd>
          <dt>例文</dt><dd>${examplesOf(k).map((e) => `<div class="ex">${esc(e.before)}<b>${esc(e.word)}</b>${esc(e.after)}</div>`).join("")}</dd>
          <dt>にている字</dt><dd><span class="ex">${(SIMILAR[k] || "").split("").join("・")}</span></dd>
          <dt>きろく</dt><dd>${r ? `○ ${r.ok}回　× ${r.ng}回` : "まだ テストしていません"}</dd>
        </dl>
        <div class="btn-row mt">
          <a class="btn btn-ghost" href="test.html?kanji=${encodeURIComponent(k)}&mode=read">読みを練習</a>
          <a class="btn" href="test.html?kanji=${encodeURIComponent(k)}&mode=write">書きを練習</a>
        </div>
        <button class="btn btn-ghost btn-block mt" data-close>とじる</button>
      </div>`;
      document.body.appendChild(bg);
      bg.addEventListener("click", (e) => { if (e.target === bg || e.target.hasAttribute("data-close")) bg.remove(); });
    }
    $("#filters").addEventListener("change", (e) => { filter = e.detail; draw(); });
    $("#search").addEventListener("input", (e) => { query = e.target.value.trim(); draw(); });
    draw();
  },

  // ---------- にがて ----------
  weak() {
    const records = store.get("records", {});
    const weak = MAIN.filter((q) => kanjiStatus(q.kanji, records) === "weak");
    if (!weak.length) {
      $("#weak").innerHTML = `<div class="card empty"><span data-icon="star"></span><p><b>にがてな漢字は ありません</b></p><p class="small">テストで まちがえた漢字が ここに たまります。</p><a class="btn mt" href="select.html">テストをする</a></div>`;
      return;
    }
    const ks = weak.map((q) => q.kanji).join("");
    $("#weak").innerHTML = `
      <div class="card" style="text-align:center">
        <p class="small muted">さいごに まちがえた漢字</p>
        <p style="font-size:40px;font-weight:700;color:var(--red);line-height:1.3">${weak.length}<small style="font-size:16px;color:var(--muted)">字</small></p>
        <div class="btn-row mt">
          <a class="btn btn-ghost" href="test.html?kanji=${encodeURIComponent(ks)}&mode=read">読みで練習</a>
          <a class="btn btn-red" href="test.html?kanji=${encodeURIComponent(ks)}&mode=write">手書きで練習</a>
        </div>
      </div>
      <h2 class="section-title"><span data-icon="flame"></span>にがてリスト</h2>
      <div class="answer-list">
        ${weak.map((q) => {
          const r = records[q.kanji];
          return `<div class="answer-item ng">
            <span class="kanji-big">${q.kanji}</span>
            <div class="body"><div class="s">${esc(q.before)}<b>${esc(q.word)}</b>${esc(q.after)}</div><div class="r">${esc(q.yomi)}　／　○${r.ok} ×${r.ng}</div></div>
            <a class="icon-btn" href="test.html?kanji=${encodeURIComponent(q.kanji)}&mode=write" aria-label="練習"><span data-icon="pencil"></span></a>
          </div>`;
        }).join("")}
      </div>`;
  },

  // ---------- きろく ----------
  history() {
    const hist = store.get("history", []);
    const s = summary();
    $("#stats").innerHTML = `
      <div class="quick-grid">
        <div class="quick green"><span class="q-icon"><span data-icon="check"></span></span><b>${s.good}字</b><span class="small">できた漢字</span></div>
        <div class="quick"><span class="q-icon"><span data-icon="pencil"></span></span><b>${hist.length}回</b><span class="small">テストした回数</span></div>
      </div>`;
    if (!hist.length) {
      $("#history").innerHTML = `<div class="empty"><span data-icon="clock"></span><p>まだ きろくが ありません</p><a class="btn mt" href="select.html">テストをする</a></div>`;
      return;
    }
    $("#history").innerHTML = hist.map((h) => {
      const pct = Math.round((h.score / h.total) * 100);
      const range = h.retry ? "やり直し" : `まとまり ${h.units.split(",").join("・")}`;
      return `<div class="list-item">
        <span class="li-icon"><span data-icon="${h.mode === "read" ? "eye" : h.mode === "write" ? "hand" : "grid"}"></span></span>
        <div class="li-body">
          <div class="li-title">${MODES[h.mode].long}</div>
          <div class="li-sub">${fmtDate(h.at)}　${esc(range)}　${h.score}/${h.total}問</div>
          ${h.wrong ? `<div class="li-sub">まちがい：<span style="font-family:var(--font-kanji);font-size:16px;color:var(--red)">${esc(h.wrong)}</span></div>` : ""}
        </div>
        <span class="li-score">${pct}<small>点</small></span>
      </div>`;
    }).join("");
  },

  // ---------- 先生：ダッシュボード ----------
  adminDashboard() {
    const d = classData();
    const avg = Math.round(d.students.reduce((a, s) => a + s.avg, 0) / d.students.length);
    const done = d.students.filter((s) => s.done).length;
    $("#kpis").innerHTML = `
      <div class="kpi"><div class="k-label">クラスの平均点</div><div class="k-value">${avg}<small>点</small></div><div class="k-sub">先週より +4点</div></div>
      <div class="kpi"><div class="k-label">配信中テストの提出</div><div class="k-value">${done}<small>/ ${d.students.length}人</small></div><div class="k-sub">しめきり 7/16（木）</div></div>
      <div class="kpi"><div class="k-label">1学期の漢字</div><div class="k-value">${ALL_KANJI.length}<small>字</small></div><div class="k-sub" style="color:var(--muted)">まとまり①〜⑦</div></div>
      <div class="kpi"><div class="k-label">にがてが多い児童</div><div class="k-value">${d.students.filter((s) => s.avg < 60).length}<small>人</small></div><div class="k-sub" style="color:var(--red)">平均60点未満</div></div>`;
    $("#unit-bars").innerHTML = UNITS.map((u) => {
      const ks = unitKanji(u.no);
      const rate = Math.round(ks.reduce((a, k) => a + d.rate[k], 0) / ks.length);
      return `<div class="hbar-row"><span class="lbl">まとまり${u.no}</span><div class="hbar"><i class="${rate < 70 ? "low" : ""}" style="width:${rate}%"></i></div><span class="val">${rate}%</span></div>`;
    }).join("");
    const worst = ALL_KANJI.slice().sort((a, b) => d.rate[a] - d.rate[b]).slice(0, 8);
    $("#weak-kanji").innerHTML = worst.map((k) => `<div><b>${k}</b><span>${d.rate[k]}%</span></div>`).join("");
    $("#recent").innerHTML = d.students.slice(0, 6).map((s) => `
      <tr class="clickable" onclick="location.href='student.html?id=${s.id}'">
        <td>${s.no}</td><td>${esc(s.name)}</td><td>${s.done ? '<span class="pill good">提出</span>' : '<span class="pill none">未提出</span>'}</td><td><b>${s.done ? s.last + "点" : "—"}</b></td>
      </tr>`).join("");
  },

  // ---------- 先生：児童一覧 ----------
  adminStudents() {
    const d = classData();
    const tbody = $("#students");
    tbody.innerHTML = d.students.map((s) => `
      <tr class="clickable" data-searchable data-name="${esc(s.name + s.kana)}" onclick="location.href='student.html?id=${s.id}'">
        <td>${s.no}</td><td><b>${esc(s.name)}</b><div class="muted" style="font-size:12px">${esc(s.kana)}</div></td>
        <td><span class="mini-bar"><i class="${s.avg < 60 ? "low" : ""}" style="width:${s.avg}%"></i></span>${s.avg}点</td>
        <td>${s.mastered} / ${ALL_KANJI.length}字</td>
        <td>${s.done ? '<span class="pill good">提出</span>' : '<span class="pill none">未提出</span>'}</td>
        <td style="font-family:var(--font-kanji);font-size:18px;color:var(--red)">${s.weak.join("")}</td>
      </tr>`).join("");
    $("#search").addEventListener("input", (e) => {
      const q = e.target.value.trim();
      $$("[data-searchable]").forEach((r) => r.classList.toggle("hidden", q && !r.dataset.name.includes(q)));
    });
  },

  // ---------- 先生：児童の詳細 ----------
  adminStudent() {
    const d = classData();
    const id = Number(new URLSearchParams(location.search).get("id") || 0);
    const s = d.students[id] || d.students[0];
    $("#s-name").textContent = `${s.no}番　${s.name}`;
    $("#s-kpis").innerHTML = `
      <div class="kpi"><div class="k-label">平均点</div><div class="k-value">${s.avg}<small>点</small></div></div>
      <div class="kpi"><div class="k-label">できた漢字</div><div class="k-value">${s.mastered}<small>/ ${ALL_KANJI.length}字</small></div></div>
      <div class="kpi"><div class="k-label">テスト回数</div><div class="k-value">${s.tests}<small>回</small></div></div>
      <div class="kpi"><div class="k-label">配信中テスト</div><div class="k-value" style="font-size:20px">${s.done ? "提出ずみ " + s.last + "点" : "未提出"}</div></div>`;
    $("#s-units").innerHTML = UNITS.map((u) => {
      const v = s.units[u.no - 1];
      return `<div class="hbar-row"><span class="lbl">まとまり${u.no}</span><div class="hbar"><i class="${v < 70 ? "low" : ""}" style="width:${v}%"></i></div><span class="val">${v}%</span></div>`;
    }).join("");
    $("#s-weak").innerHTML = s.weak.map((k) => {
      const q = byKanji(k);
      return `<div class="answer-item ng"><span class="kanji-big">${k}</span><div class="body"><div class="s">${esc(q.before)}<b>${esc(q.word)}</b>${esc(q.after)}</div><div class="r">${esc(q.yomi)}</div></div></div>`;
    }).join("");
  },

  // ---------- 先生：漢字別の正答率 ----------
  adminKanji() {
    const d = classData();
    let rows = MAIN.slice();
    const draw = () => {
      $("#kanji-rows").innerHTML = rows.map((q) => {
        const r = d.rate[q.kanji];
        return `<tr><td class="k">${q.kanji}</td><td>まとまり${q.unit}</td><td>${esc(q.word)}（${esc(q.yomi)}）</td>
          <td><span class="mini-bar"><i class="${r < 70 ? "low" : ""}" style="width:${r}%"></i></span><b>${r}%</b></td>
          <td style="font-family:var(--font-kanji);font-size:18px">${(SIMILAR[q.kanji] || "")[0]}</td></tr>`;
      }).join("");
    };
    $("#sort").addEventListener("change", (e) => {
      if (e.detail === "low") rows = MAIN.slice().sort((a, b) => d.rate[a.kanji] - d.rate[b.kanji]);
      else rows = MAIN.slice();
      draw();
    });
    draw();
  },

  // ---------- 先生：テスト配信 ----------
  adminAssign() {
    const box = $("#unit-checks");
    box.innerHTML = UNITS.map((u) => `
      <button type="button" class="unit-check${u.no >= 5 ? " on" : ""}" data-unit="${u.no}">
        <span class="box"><span data-icon="check"></span></span>
        <span class="unit-body"><span class="unit-name" style="display:block">${u.no}．${esc(u.name)}</span>
        <span class="unit-kanji" style="display:block">${unitKanji(u.no).join("")}</span></span>
        <span class="count">${unitKanji(u.no).length}字</span>
      </button>`).join("");
    injectIcons(box);
    const update = () => {
      const units = $$(".unit-check.on").map((b) => Number(b.dataset.unit));
      const count = units.reduce((a, u) => a + unitKanji(u).length, 0);
      $("#assign-summary").textContent = `${count}字が対象です`;
      $("#preview").href = `../user/test.html?units=${units.join(",")}&mode=read&n=100`;
    };
    $$(".unit-check").forEach((b) => b.addEventListener("click", () => { b.classList.toggle("on"); update(); }));
    update();
  },
};

// ---------------------------------------------------------------
// 先生画面用のサンプルデータ（毎回同じ値になるよう疑似乱数で生成）
// ---------------------------------------------------------------
function classData() {
  let seed = 20260709;
  const rnd = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  // まちがえやすい字は正答率を低めに
  const hard = "像象複復績険境際潔識属序志往演態圧肥謝暴";
  const rate = {};
  ALL_KANJI.forEach((k) => (rate[k] = Math.round((hard.includes(k) ? 48 : 72) + rnd() * 26)));
  const names = [
    ["青木 はると", "あおき はると"], ["石井 ゆい", "いしい ゆい"], ["上田 そうた", "うえだ そうた"], ["遠藤 さくら", "えんどう さくら"],
    ["大野 れん", "おおの れん"], ["加藤 ひなた", "かとう ひなた"], ["木村 あおい", "きむら あおい"], ["小林 ゆうと", "こばやし ゆうと"],
    ["近藤 めい", "こんどう めい"], ["斉藤 りく", "さいとう りく"], ["佐々木 こはる", "ささき こはる"], ["清水 たいち", "しみず たいち"],
    ["鈴木 みお", "すずき みお"], ["田中 かいと", "たなか かいと"], ["千葉 ゆな", "ちば ゆな"], ["中村 そら", "なかむら そら"],
    ["西田 あかり", "にしだ あかり"], ["野口 けんた", "のぐち けんた"], ["橋本 りこ", "はしもと りこ"], ["林 ゆうま", "はやし ゆうま"],
    ["藤田 ほのか", "ふじた ほのか"], ["前田 しょう", "まえだ しょう"], ["松本 えま", "まつもと えま"], ["宮本 だいき", "みやもと だいき"],
    ["村上 ことね", "むらかみ ことね"], ["森 はやと", "もり はやと"], ["山口 つむぎ", "やまぐち つむぎ"], ["渡辺 いつき", "わたなべ いつき"],
  ];
  const students = names.map(([name, kana], i) => {
    const skill = 0.55 + rnd() * 0.45;
    const units = UNITS.map(() => Math.min(100, Math.round(skill * 100 - rnd() * 18 + 6)));
    const avg = Math.round(units.reduce((a, b) => a + b, 0) / units.length);
    const weak = ALL_KANJI.filter((k) => rate[k] < 70).map((k) => [k, rnd()]).sort((a, b) => a[1] - b[1]).map((x) => x[0]).slice(0, Math.max(1, Math.round((1 - skill) * 10)));
    weak.sort((a, b) => ALL_KANJI.indexOf(a) - ALL_KANJI.indexOf(b));
    return {
      id: i, no: i + 1, name, kana, avg, units, weak,
      mastered: Math.round(ALL_KANJI.length * skill * (0.8 + rnd() * 0.2)),
      tests: 8 + Math.round(rnd() * 20),
      done: rnd() > 0.25,
      last: Math.min(100, Math.round((skill * 100 + rnd() * 10) / 10) * 10),
    };
  });
  return { rate, students };
}

common();
