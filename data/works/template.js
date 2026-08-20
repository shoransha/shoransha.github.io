/**
 * ==============================================================================
 * 作品詳細データ: ひな形・テンプレート (data/works/template.js)
 * ==============================================================================
 * このファイルをコピーして「作品ID.js」として保存し、各項目を書き換えてください。
 * 
 * 【画像フォルダの指定方法】
 * - 作品ごとに専用の画像フォルダを作りたい場合（例: picture/works/C108/ など）:
 *   下記の imageDir に "C108" または "picture/works/C108" を指定すると、
 *   coverImage や samples にはファイル名（"hyoushi.webp" 等）だけを書けば自動で読み込まれます。
 * - フォルダ指定を使わず直接パスを書くことも可能です（例: "C108/hyoushi.webp"）。
 */
const WORK_DETAIL = {
  // 作品タイトル
  title: "『作品タイトル』",

  // NEW! アイコンをつけるか (true / false)
  isNew: true,

  // 簡単なキャッチコピー・要約
  catch: "作品のキャッチコピーや簡単な紹介文をここに入力してください。",

  // 【新機能】この作品の専用画像フォルダ（省略・nullの場合はデフォルトの picture/works/ から読み込みます）
  imageDir: "C108", // 例: "C108", "picture/works/C108", "picture/C108_SyngUp" など自由

  // 表紙画像（imageDir 内のファイル名、または直接 "フォルダ/画像.webp"）
  coverImage: "hyoushi.webp",

  // スペック・仕様表（不要な項目は削除可能）
  spec: {
    "発行日": "2026年XX月XX日（イベント名）",
    "規格・仕様": "B5サイズ / 本文XXページ / 漫画",
    "頒布価格": "イベント頒布: 500円",
    "委託通販": '<a href="https://booth.pm" target="_blank" rel="noopener">BOOTH公式ショップ</a> ⧉'
  },

  // あらすじ・解説文（HTMLタグ使用可能）
  description: `
    <p style="margin-bottom: 10px;">
      作品の詳しいあらすじや紹介文をここに入力してください。<br>
      段落を分ける際は &lt;p&gt; タグ、改行は &lt;br&gt; を使用できます。
    </p>
  `,

  // サンプル画像一覧
  samples: [
    {
      image: "sample_01.webp",
      caption: "表紙イラスト"
    },
    {
      image: "sample_02.webp",
      caption: "本文サンプル 1"
    }
  ]
};
