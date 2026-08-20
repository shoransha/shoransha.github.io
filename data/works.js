/**
 * ==============================================================================
 * 照覧舎 - 作品情報・発行物 データ
 * ==============================================================================
 * 同人誌・イラスト集・CD・グッズなどの作品を登録します。
 * 
 * 【画像の指定方法】
 * picture/works フォルダに画像（例: yuunagi.webp や cover.jpg）を置き、
 * 下記の image 項目にファイル名（例: image: "yuunagi.webp"）を書くだけで表示されます。
 * ※画像がない場合は null にすると自動で「COVER IMAGE」のプレースホルダーが表示されます。
 * 
 * 【項目の説明】
 * - title: 作品名（例: "『夕凪の照覧録 -壱-』"）
 * - url: 個別詳細ページのパス（例: "works/yuunagi_01.html"）
 * - image: 画像ファイル名（例: "yuunagi.webp" または null）
 * - description: 作品のあらすじ・解説文（一覧プレビュー用）
 * - spec: 発行日、サイズ、ページ数、価格などのスペック情報
 * - note: 赤字注記（委託先情報など。ない場合は null または ""）
 * - isNew: NEW! アイコン（new.gif）を付ける場合は true
 */
const WORKS_DATA = [
  {
    title: "『SyngUp!合宿篇』",
    url: "works/C108_SyngUp.html",
    image: "picture/works/C108_SyngUp/C108_hyoushi.webp", // picture/works/yuunagi.webp 等
    description: "中等部時代のSyngUpが合宿へと行く話です。",
    spec: "発行日: 令和8年8月16日 / B5 / 28P / 漫画 / 頒布価格: 500円",
    note: null,
    isNew: true
  }
];
