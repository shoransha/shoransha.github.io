/**
 * ==============================================================================
 * 照覧舎 - 照覧舎について（サークル概要 / 友人サークル紹介 / リンクバナー）データ
 * ==============================================================================
 * サークル情報、友人サークルリンク集、リンク用バナー設定を管理します。
 */
const ABOUT_DATA = {
  // 1. サークルプロフィール
  profile: [
    {
      label: "サークル名",
      value: "照覧舎（しょうらんしゃ / Shoransha）"
    },
    {
      label: "サークル主",
      value: "弌鶴（いっかく）"
    },
    {
      label: "仲間たち",
      value: "棚山（たなやま）"
    },
    {
      label: "主な活動",
      value: "アイマスやアニメ・漫画などといったジャンルでの二次創作、コミケット等の即売会での同人誌の頒布。\nアイマスに関しては「照覧舎｜P@STEL COLOR」名義で活動。"
    },
    {
      label: "連絡先",
      value: "shoransha☆hotmail.com \n ※☆に関しては@に置換をしてください。"
    },
    {
      label: "著作権",
      value: "弊サークル自身の一次創作物に関してのみ、クリエイティブ・コモンズ 表示 4.0 国際 ライセンス（<a href=\"https://creativecommons.org/licenses/by/4.0/deed.ja\" target=\"_blank\" rel=\"noopener\">CC BY 4.0</a>）に準拠します。<br>※弊サークルによる二次創作に関して各原作作品の著作権・知的財産権はそれぞれの原著作者・公式権利者様に帰属します。転載・利用をする際には常識の範囲内でお願いいたします。\nまた、弊サークルの方針として頒布した同人誌に関しては頒布後二か月程度を目安として当サイト上にて公開を行っております。"
    }
  ],

  // 2. 他サークル紹介
  // 友人・知人のサークルやおすすめのサイトをここに追加してください。
  friends: [
    {
      name: "ドライブマニア",
      url: "https://x.com/koro_loli",
      banner: null, // バナー画像がある場合は "picture/banner_friend01.gif" など。ない場合は null
      description: "白楼軒と照覧舎による合同サークル（という体）。評論・情報に関してはこちら名義で活動。"
    },
    {
      name: "白楼軒",
      url: "https://hakuroken.net/",
      banner: "picture/about_us/hakuroken.png", // バナー画像がある場合は "picture/banner_friend01.gif" など。ない場合は null
      description: "友人のサークル。東方や艦これを中心に漫画本を出しているらしい。"
    },
    {
      name: "喧屋",
      url: "https://x.com/KaBoiiiii",
      banner: null, // バナー画像がある場合は "picture/banner_friend01.gif" など。ない場合は null
      description: "後輩のサークル。ゼンゼロ本を出しているらしい。"
    },
    {
      name: "パラクパニール",
      url: "https://x.com/naan_and_curry",
      banner: null, // バナー画像がある場合は "picture/banner_friend01.gif" など。ない場合は null
      description: "友人のサークル。学〼で篠澤英語本を出しているらしい。"
    }
  ],

  // 3. 自サークルのリンクバナー情報
  banner: {
    description: "当サイトはリンクフリーです。リンクの際はトップページ（https://shoransha.github.io/）にお願いいたします。<br>必要であれば下記のバナーをコピーしてご利用ください。",
    image: "picture/banner.png",
    code: '<a href="https://shoransha.github.io/"><img src="https://shoransha.github.io/picture/banner.png" alt="照覧舎" width="200" height="40"></a>'
  },

  // 4. 左サイドバー（バナースペース）
  // 「照覧舎について」タブの左側に縦に並ぶバナーエリアを設定します。
  // バナー画像ファイルは「picture/about_us」フォルダに格納してください（サイズは自動で200×40ピクセル固定となります）。
  // 
  // 【各項目の説明】
  // - title: 見出しバーのテキスト（例: "▼オリジナル作品", "▼制作作品", "▼おすすめリンク"）
  // - banners: その見出しの下に並べるバナーの一覧（配列）
  //     - image: バナー画像ファイル名（"picture/about_us/" フォルダ内のファイル名）
  //              ※ファイル名単体（"banner_sample.png"）でも、パス（"picture/about_us/banner_sample.png"）でもOK
  //     - url: クリックしたときのリンク先URL（リンクなしの場合は null または ""）
  //     - text: バナーの下に表示するテキスト（不要な場合は null または ""）
  //     - isExternal: 外部サイトとして別タブで開く場合は true（⧉ アイコンが自動で付きます）
  sidebar: [
    {
      title: "▼公式サイト集",
      banners: [
        {
          image: "bn01_haruka.jpg",
          url: "http://www.idolmaster-anime.jp/",
          text: "無印アニメ公式サイト ⧉",
          isExternal: true
        },
        // {
        //   image: "imas_sc.png",
        //   url: "https://shinycolors.idolmaster.jp/",
        //   text: "シャニマス公式サイト ⧉",
        //   isExternal: true
        // }
      ]
    },
    {
      title: "▼他サークル集",
      banners: [
        {
          image: "hakuroken.png",
          url: "https://hakuroken.net/",
          text: null,
          isExternal: false
        }
      ]
    }
  ]
};
