/**
 * ==============================================================================
 * 照覧舎 - ▼更新情報 データ
 * ==============================================================================
 * サイトの更新履歴を登録します。
 * 
 * 【項目の説明】
 * - date: 更新日（例: "8月19日"）
 * - text: 更新内容のテキスト
 * - url: リンク先（リンクにしない場合は null）
 * - isExternal: 外部サイトの場合は true
 * - isNew: NEW! アイコン（new.gif）を付ける場合は true
 */
const UPDATES_DATA = [
  {
    date: "8月20日",
    text: "作品情報ページにC108新刊データを追加",
    url: "works/C108_SyngUp.html",
    isExternal: true,
    isNew: true
  },
  {
    date: "8月20日",
    text: "つぶやき：夏コミ御礼と冬コミに向けて 更新",
    url: "blog/20260819_summer_comiket.html",
    isExternal: true,
    isNew: true
  },
  {
    date: "8月20日",
    text: "照覧舎 公式Webサイト開設のお知らせ",
    url: "blog/20260820_website_open.html",
    isExternal: true,
    isNew: true
  },
  {
    date: "8月9日",
    text: "つぶやき：入稿完了！ 更新",
    url: null,
    isExternal: false,
    isNew: false
  }
];
