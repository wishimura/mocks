// レジペアーズ 顧客・物件管理 — デモ用サンプルデータ（すべて架空）
// 日付は「デモを開いた日」を基準に相対で生成する（今日の対応・期限切れが自然に見えるように）。
window.RP_SEED = function () {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const day = (off) => { const d = new Date(base); d.setDate(d.getDate() + off); return ymd(d); };
  const at = (off, hm) => `${day(off)}T${hm}`;

  const staff = [
    { id: "s1", name: "中村", full: "中村 健" },
    { id: "s2", name: "高橋", full: "高橋 美咲" },
  ];

  // rating: good=おすすめ / ok=条件次第 / ng=見送り推奨（会社としての評価。顧客の反応とは別管理）
  const properties = [
    {
      id: "p1", label: "物件A", name: "メゾン池上ノース 205号室", area: "大田区池上",
      line: "東急池上線", station: "池上", walk: 4, price: 4780, layout: "2LDK", size: 58.2,
      floor: "2階 / 7階建", built: 1999, direction: "北東", mgmtFee: 12800, repairFee: 14500,
      repairNote: "2024年に改定済み", bigRepair: "2019年 大規模修繕実施", pet: "小型犬・猫 1匹まで",
      sales: "販売中", rating: "good",
      ratingReason: "駅徒歩4分で商店街も近く、再販しやすい立地。管理状態も良好。北東向きのため、日当たりを重視する方には合わない場合がある。",
      ratingBy: "s1", ratingAt: day(-30), folder: "良い物件", addedAt: day(-32),
      features: ["駅徒歩4分", "商店街が近い", "2019年 大規模修繕済み"],
    },
    {
      id: "p2", label: "物件B", name: "池上テラスレジデンス 502号室", area: "大田区池上",
      line: "東急池上線", station: "池上", walk: 9, price: 4950, layout: "2LDK+S", size: 64.5,
      floor: "5階 / 8階建", built: 2006, direction: "南", mgmtFee: 15600, repairFee: 11200,
      repairNote: "2027年に改定予定（改定後の金額は管理会社へ確認中）", bigRepair: "2022年 大規模修繕実施", pet: "可（規約あり）",
      sales: "販売中", rating: "good",
      ratingReason: "南向き・2LDK+Sで在宅勤務にも対応しやすい。築年数のわりに共用部の状態が良い。修繕積立金の改定予定は要確認。",
      ratingBy: "s1", ratingAt: day(-9), folder: "良い物件", addedAt: day(-10),
      features: ["南向き", "サービスルーム付き", "5階・眺望良好"],
    },
    {
      id: "p3", label: "", name: "千鳥町パークハイツ 302号室", area: "大田区千鳥",
      line: "東急池上線", station: "千鳥町", walk: 6, price: 4380, layout: "3LDK", size: 68.0,
      floor: "3階 / 6階建", built: 1995, direction: "南西", mgmtFee: 13200, repairFee: 16800,
      repairNote: "2023年に改定済み", bigRepair: "2021年 大規模修繕実施", pet: "不可",
      sales: "申込あり", rating: "good",
      ratingReason: "3LDKで価格が相場より抑えめ。ファミリー向けに紹介しやすい。",
      ratingBy: "s2", ratingAt: day(-40), folder: "良い物件", addedAt: day(-45),
      features: ["3LDK", "相場より割安", "小学校が近い"],
    },
    {
      id: "p4", label: "", name: "久が原ヒルサイド 103号室", area: "大田区久が原",
      line: "東急池上線", station: "久が原", walk: 7, price: 5280, layout: "3LDK", size: 72.4,
      floor: "1階 / 4階建", built: 2003, direction: "南", mgmtFee: 16400, repairFee: 13900,
      repairNote: "改定予定なし", bigRepair: "2018年 大規模修繕実施", pet: "可",
      sales: "成約済み", rating: "good",
      ratingReason: "専用庭付きで住環境が静か。低層の落ち着いた住宅街。",
      ratingBy: "s2", ratingAt: day(-70), folder: "良い物件", addedAt: day(-75),
      features: ["専用庭付き", "閑静な住宅街", "南向き"],
    },
    {
      id: "p5", label: "", name: "蓮沼ステーションハイム 401号室", area: "大田区西蒲田",
      line: "東急池上線", station: "蓮沼", walk: 3, price: 3680, layout: "2DK", size: 45.1,
      floor: "4階 / 5階建", built: 1980, direction: "東", mgmtFee: 9800, repairFee: 7200,
      repairNote: "積立金残高が少なく、一時金徴収の可能性あり", bigRepair: "2008年以降 実施なし", pet: "不可",
      sales: "販売中", rating: "ng",
      ratingReason: "旧耐震基準（1980年築）。修繕積立金の残高が少なく、大規模修繕の見通しが立っていない。住宅ローン控除の条件も要確認。",
      ratingBy: "s1", ratingAt: day(-25), folder: "ダメな物件", addedAt: day(-26),
      features: ["駅徒歩3分", "価格は手頃"],
    },
    {
      id: "p6", label: "", name: "雪が谷大塚レジデンス 601号室", area: "大田区南雪谷",
      line: "東急池上線", station: "雪が谷大塚", walk: 8, price: 5480, layout: "3LDK", size: 70.3,
      floor: "6階 / 7階建", built: 2001, direction: "南東", mgmtFee: 17100, repairFee: 15400,
      repairNote: "改定予定なし", bigRepair: "2020年 大規模修繕実施", pet: "可",
      sales: "販売中", rating: "ok",
      ratingReason: "眺望・日当たりは良いが、相場より200万円ほど高め。価格交渉の余地があれば紹介したい。",
      ratingBy: "s2", ratingAt: day(-20), folder: "良い物件", addedAt: day(-22),
      features: ["南東角部屋", "眺望良好", "6階"],
    },
    {
      id: "p7", label: "", name: "池上本門寺通りマンション 201号室", area: "大田区池上",
      line: "東急池上線", station: "池上", walk: 12, price: 3980, layout: "2LDK", size: 55.8,
      floor: "2階 / 5階建", built: 1990, direction: "南", mgmtFee: 11000, repairFee: 13000,
      repairNote: "2025年に改定済み", bigRepair: "2016年 大規模修繕実施", pet: "不可",
      sales: "販売中", rating: "ok",
      ratingReason: "価格は手頃。駅からやや遠く、1階が店舗のため時間帯によって音が気になる可能性あり。",
      ratingBy: "s1", ratingAt: day(-35), folder: "良い物件", addedAt: day(-36),
      features: ["価格が手頃", "南向き", "本門寺が近い"],
    },
    {
      id: "p8", label: "", name: "長原サニーコート 703号室", area: "大田区上池台",
      line: "東急池上線", station: "長原", walk: 5, price: 4890, layout: "2LDK", size: 60.1,
      floor: "7階 / 8階建", built: 1998, direction: "南東", mgmtFee: 14200, repairFee: 12600,
      repairNote: "改定予定なし", bigRepair: "2025年 大規模修繕実施", pet: "小型犬・猫 1匹まで",
      sales: "販売中", rating: "good",
      ratingReason: "南東の角部屋で日当たり・通風が良い。2025年に大規模修繕済みで当面の負担が少ない。",
      ratingBy: "s2", ratingAt: day(-4), folder: "良い物件", addedAt: day(-4),
      features: ["南東角部屋", "日当たり良好", "2025年 大規模修繕済み"],
    },
  ];

  const customers = [
    {
      id: "c1", name: "佐藤 健一", kana: "さとう けんいち", type: "buy", staff: "s1", status: "viewing",
      phone: "090-0000-1234", email: "k.sato@example.com", line: "公式LINE 友だち登録済み",
      household: "ご夫婦2名（ご主人は週2日在宅勤務）", firstSource: "form", createdAt: day(-21),
      wants: {
        area: "池上周辺（池上線沿線）", budget: 5000, layout: "2LDK以上", size: 55, walk: 10,
        priorities: ["日当たり（駅からの距離より優先）", "2LDK以上の広さ"],
        other: "来年春までに住み替えたい。ローン事前審査は未実施。",
      },
      next: { text: "物件Bの管理費と修繕積立金を確認し、お客様へ連絡する", due: day(0), staff: "s1" },
      history: [
        { id: "h101", at: at(-21, "10:12"), source: "form", staff: "s1", title: "ホームページのお問い合わせフォーム",
          body: "池上駅の周辺で中古マンションを探しています。予算は5,000万円くらい、2LDK以上を希望します。夫婦2人で、来年の春までに住み替えたいと考えています。" },
        { id: "h102", at: at(-20, "18:05"), source: "line", staff: "s1", title: "公式LINE",
          body: "公式LINEに友だち登録あり。お問い合わせのお礼と、面談の予約ページをご案内。" },
        { id: "h103", at: at(-19, "21:30"), source: "reserve", staff: "s1", title: "予約ページから面談予約",
          body: "2日後の11:00〜 事務所での面談をご予約（ご夫婦で来店予定）。" },
        { id: "h104", at: at(-17, "11:00"), source: "meeting", staff: "s1", title: "面談（事務所）",
          body: "希望条件をヒアリング。池上周辺、予算5,000万円、2LDK以上、駅徒歩10分以内。ご主人は週2日在宅勤務。ローンの事前審査はまだ。まずは物件Aの資料を送ることに。" },
        { id: "h105", at: at(-15, "14:20"), source: "mail", staff: "s1", title: "メール送信",
          body: "物件A（メゾン池上ノース）の販売図面と周辺環境メモをメールで送付。", propertyId: "p1" },
        { id: "h106", at: at(-12, "20:45"), source: "line", staff: "s1", title: "公式LINE",
          body: "物件Aを見てみたい、週末に内見できますかとご連絡。土曜10時で調整。", propertyId: "p1" },
        { id: "h107", at: at(-6, "10:00"), source: "viewing", staff: "s1", title: "内見：メゾン池上ノース",
          body: "立地はとても好評。駅も商店街も近くて便利とのこと。北東向きで午後のリビングが暗く、日当たりが気になる様子。", propertyId: "p1" },
        { id: "h108", at: at(-5, "19:10"), source: "line", staff: "s1", title: "公式LINE",
          body: "夫婦で話し合い、物件Aは見送りたいとご連絡。やはり日当たりを重視したいとのこと。", propertyId: "p1" },
        { id: "h109", at: at(-3, "19:00"), source: "meeting", staff: "s2", title: "面談（オンライン）",
          body: "条件を再確認。駅からの距離より、日当たりを優先したい。徒歩10分を少し超えても、明るい部屋なら検討したい。物件Bの資料を送ることに。",
          applied: ["重視する点に「日当たり（駅からの距離より優先）」を追加"] },
        { id: "h110", at: at(-2, "13:30"), source: "mail", staff: "s1", title: "メール送信",
          body: "物件B（池上テラスレジデンス）の販売図面と管理に関する資料をメールで送付。", propertyId: "p2" },
        { id: "h111", at: at(-1, "21:15"), source: "line", staff: "s1", title: "公式LINE",
          body: "物件B、南向きで良さそう。前向きに検討したいので、管理費と修繕積立金がいくらか、今後上がる予定があるか知りたいとのこと。", propertyId: "p2" },
      ],
    },
    {
      id: "c2", name: "鈴木 美和", kana: "すずき みわ", type: "buy", staff: "s2", status: "inquiry",
      phone: "080-0000-5678", email: "miwa.s@example.com", line: "公式LINE 友だち登録済み",
      household: "ご本人＋お子さま1名", firstSource: "line", createdAt: day(-2),
      wants: {
        area: "池上・千鳥町", budget: 4200, layout: "2LDK", size: 50, walk: 10,
        priorities: ["小学校が近い"], other: "面談前のため仮の条件（LINEでの聞き取り）。",
      },
      next: { text: "初回面談の日程を調整する（LINEで候補日を送る）", due: day(0), staff: "s2" },
      history: [
        { id: "h201", at: at(-2, "22:40"), source: "line", staff: "s2", title: "公式LINE",
          body: "子どもの小学校入学までに、池上か千鳥町あたりで2LDKを買いたい。予算は4,000万円台前半。一度相談したいとのこと。" },
        { id: "h202", at: at(-1, "09:30"), source: "line", staff: "s2", title: "公式LINE",
          body: "ご連絡のお礼と、面談（事務所／オンライン）の選択肢をご案内。返信待ち。" },
      ],
    },
    {
      id: "c3", name: "田中 浩二", kana: "たなか こうじ", type: "buy", staff: "s1", status: "application",
      phone: "090-0000-9012", email: "tanaka.k@example.com", line: "未登録",
      household: "ご夫婦＋お子さま2名", firstSource: "reserve", createdAt: day(-50),
      wants: {
        area: "池上線沿線", budget: 4500, layout: "3LDK", size: 65, walk: 10,
        priorities: ["3LDK", "学区"], other: "",
      },
      next: { text: "住宅ローン本審査の必要書類を回収する", due: day(-2), staff: "s1" },
      history: [
        { id: "h301", at: at(-50, "12:00"), source: "reserve", staff: "s1", title: "予約ページから面談予約", body: "3LDKを探している。土曜午前に来店希望。" },
        { id: "h302", at: at(-47, "10:00"), source: "meeting", staff: "s1", title: "面談（事務所）", body: "予算4,500万円、3LDK、学区重視。事前審査は通過済み。" },
        { id: "h303", at: at(-35, "11:00"), source: "viewing", staff: "s1", title: "内見：雪が谷大塚レジデンス", body: "眺望は気に入ったが予算オーバー。", propertyId: "p6" },
        { id: "h304", at: at(-20, "10:30"), source: "viewing", staff: "s1", title: "内見：千鳥町パークハイツ", body: "広さと価格に満足。小学校が近いのも良い。", propertyId: "p3" },
        { id: "h305", at: at(-12, "15:00"), source: "meeting", staff: "s1", title: "面談（事務所）", body: "千鳥町パークハイツに購入申込。ローン本審査へ。", propertyId: "p3" },
        { id: "h306", at: at(-6, "18:20"), source: "mail", staff: "s1", title: "メール送信", body: "本審査の必要書類一覧を送付。" },
      ],
    },
    {
      id: "c4", name: "山本 恵子", kana: "やまもと けいこ", type: "buy", staff: "s2", status: "contract",
      phone: "080-0000-3456", email: "keiko.y@example.com", line: "公式LINE 友だち登録済み",
      household: "ご夫婦＋お子さま1名", firstSource: "form", createdAt: day(-90),
      wants: {
        area: "久が原・池上", budget: 5500, layout: "3LDK", size: 70, walk: 10,
        priorities: ["静かな環境", "専用庭またはルーフバルコニー"], other: "",
      },
      next: { text: "引き渡し日の最終確認と、鍵の受け渡し段取りを連絡する", due: day(10), staff: "s2" },
      history: [
        { id: "h401", at: at(-90, "16:00"), source: "form", staff: "s2", title: "ホームページのお問い合わせフォーム", body: "久が原周辺で3LDKを探しています。" },
        { id: "h402", at: at(-85, "10:00"), source: "meeting", staff: "s2", title: "面談（オンライン）", body: "静かな環境を最優先。予算5,500万円まで。" },
        { id: "h403", at: at(-70, "11:00"), source: "viewing", staff: "s2", title: "内見：メゾン池上ノース", body: "便利だが3LDKでないと厳しい。", propertyId: "p1" },
        { id: "h404", at: at(-60, "14:00"), source: "viewing", staff: "s2", title: "内見：久が原ヒルサイド", body: "専用庭を大変気に入られた。", propertyId: "p4" },
        { id: "h405", at: at(-30, "13:00"), source: "meeting", staff: "s2", title: "ご契約（事務所）", body: "売買契約締結。引き渡しは来月予定。", propertyId: "p4" },
      ],
    },
    {
      id: "c5", name: "伊藤 正和", kana: "いとう まさかず", type: "sell", staff: "s1", status: "meeting",
      phone: "090-0000-7890", email: "m.ito@example.com", line: "公式LINE 友だち登録済み",
      household: "ご夫婦2名", firstSource: "form", createdAt: day(-9),
      sale: {
        name: "池上ステージ 805号室（ご自宅）", address: "大田区池上", layout: "3LDK", size: 75.3, built: 1997,
        floor: "8階 / 10階建", desiredPrice: 6200, timing: "来年3月までに売却したい",
        reason: "住み替え（戸建ての購入を検討中）", loan: "残債 約1,200万円", occupancy: "居住中（売却後に退去）",
      },
      next: { text: "訪問査定の結果をまとめ、査定書を送付する", due: day(-1), staff: "s1" },
      history: [
        { id: "h501", at: at(-9, "09:50"), source: "form", staff: "s1", title: "ホームページのお問い合わせフォーム", body: "自宅マンションの売却を考えています。いくらくらいで売れるか知りたいです。" },
        { id: "h502", at: at(-8, "13:00"), source: "phone", staff: "s1", title: "電話", body: "住み替えのため売却を検討。訪問査定の日程を決定。" },
        { id: "h503", at: at(-4, "15:00"), source: "meeting", staff: "s1", title: "面談・訪問査定（ご自宅）", body: "室内は丁寧に使われている。南向き8階、眺望良好。希望は6,200万円。来年3月までに売りたい。残債約1,200万円。" },
      ],
    },
    {
      id: "c6", name: "渡辺 由香", kana: "わたなべ ゆか", type: "buy", staff: "s2", status: "hold",
      phone: "080-0000-2468", email: "yuka.w@example.com", line: "公式LINE 友だち登録済み",
      household: "ご本人のみ", firstSource: "line", createdAt: day(-60),
      wants: {
        area: "池上・長原", budget: 4000, layout: "1LDK〜2LDK", size: 45, walk: 12,
        priorities: ["静かさ", "ペット可（猫）"], other: "転勤の可能性があり、いったん保留。",
      },
      next: { text: "転勤の有無を確認し、検討再開の意向を伺う", due: day(25), staff: "s2" },
      history: [
        { id: "h601", at: at(-60, "20:00"), source: "line", staff: "s2", title: "公式LINE", body: "猫と暮らせる2LDKを探している。" },
        { id: "h602", at: at(-55, "11:00"), source: "meeting", staff: "s2", title: "面談（オンライン）", body: "予算4,000万円前後。静かな環境、ペット可が必須。" },
        { id: "h603", at: at(-40, "10:00"), source: "viewing", staff: "s2", title: "内見：池上本門寺通りマンション", body: "1階店舗の音が気になる。ペット不可も×。", propertyId: "p7" },
        { id: "h604", at: at(-14, "19:30"), source: "line", staff: "s2", title: "公式LINE", body: "転勤の可能性が出てきたので、いったん保留にしたいとのこと。" },
      ],
    },
    {
      id: "c7", name: "小林 誠", kana: "こばやし まこと", type: "sell", staff: "s2", status: "inquiry",
      phone: "090-0000-1357", email: "kobayashi.m@example.com", line: "未登録",
      household: "ご本人のみ（相続物件）", firstSource: "mail", createdAt: day(-1),
      sale: {
        name: "千鳥町コーポ 204号室（相続物件）", address: "大田区千鳥", layout: "2DK", size: 48.6, built: 1984,
        floor: "2階 / 4階建", desiredPrice: null, timing: "未定（年内に方針を決めたい）",
        reason: "相続した物件の整理", loan: "なし", occupancy: "空室",
      },
      next: { text: "お電話で状況を伺い、査定の進め方をご案内する", due: day(0), staff: "s2" },
      history: [
        { id: "h701", at: at(-1, "17:45"), source: "mail", staff: "s2", title: "メール受信",
          body: "親から相続したマンションを売るか貸すか迷っています。相談にのっていただけますか。" },
      ],
    },
  ];

  // 顧客ごとの紹介物件と反応（物件の会社評価とは別の情報）
  // status: sent=資料送付済み / scheduled=内見予定 / viewed=内見済み / considering=検討中 / declined=見送り / applied=申し込み / contracted=成約
  const proposals = [
    { id: "r1", customerId: "c1", propertyId: "p1", date: day(-15), status: "declined",
      liked: "駅から近く、商店街も近くて便利。立地はとても好評。", concerns: "北東向きで、午後のリビングが暗い。日当たりが気になる。",
      reason: "日当たり（リビングの明るさ）を優先したいため", updatedAt: day(-5) },
    { id: "r2", customerId: "c1", propertyId: "p2", date: day(-2), status: "considering",
      liked: "南向き。2LDK+Sで広さも十分。", concerns: "管理費と修繕積立金の金額、今後の値上がり予定を確認したい。",
      reason: "", updatedAt: day(-1) },
    { id: "r3", customerId: "c3", propertyId: "p6", date: day(-38), status: "declined",
      liked: "眺望と日当たり。", concerns: "価格が予算を約1,000万円オーバー。", reason: "予算オーバー", updatedAt: day(-35) },
    { id: "r4", customerId: "c3", propertyId: "p3", date: day(-25), status: "applied",
      liked: "3LDKで広く、価格も予算内。小学校が近い。", concerns: "築年数（1995年）。", reason: "", updatedAt: day(-12) },
    { id: "r5", customerId: "c4", propertyId: "p1", date: day(-72), status: "declined",
      liked: "立地が便利。", concerns: "2LDKでは部屋数が足りない。", reason: "3LDKが必要なため", updatedAt: day(-70) },
    { id: "r6", customerId: "c4", propertyId: "p4", date: day(-62), status: "contracted",
      liked: "専用庭、静かな住宅街。", concerns: "1階の防犯面（面格子あり）。", reason: "", updatedAt: day(-30) },
    { id: "r7", customerId: "c6", propertyId: "p7", date: day(-42), status: "declined",
      liked: "価格が手頃。", concerns: "1階店舗の音。ペット不可。", reason: "ペット不可・騒音が気になるため", updatedAt: day(-40) },
    { id: "r8", customerId: "c6", propertyId: "p8", date: day(-3), status: "sent",
      liked: "", concerns: "", reason: "", updatedAt: day(-3) },
  ];

  return { version: 1, baseDate: day(0), staff, properties, customers, proposals, seq: 1000 };
};
