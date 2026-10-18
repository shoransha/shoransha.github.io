/**
 * ==============================================================================
 * 照覧舎 - ▼更新情報 データ
 * ==============================================================================
 * サイトの更新履歴を登録します。
 * ※5件を超えると、古い項目は自動的に折り畳まれ「▼ もっと見る」から展開できるようになります。
 * 
 * 【項目の説明】
 * - date: 更新日（例: "令和8年10月16日", "10月16日"）
 * - text: 更新内容のテキスト
 * - url: リンク先（リンクにしない場合は null）
 * - isExternal: 外部サイトの場合は true
 * - isNew: NEW! アイコン（new.gif）を付ける場合は true
 */
const UPDATES_DATA = [
  {
    date: "令和8年10月16日",
    text: "『SyngUp!合宿篇』の本文pdfをアップロードしました！",
    url: "works/C108_SyngUp.html",
    isExternal: true,
    isNew: true
  },
  {
    date: "令和8年8月24日",
    text: "メインビジュアルを追加しました！",
    url: "blog/20260823_toppage.html",
    isExternal: true,
    isNew: true
  },
  {
    date: "令和8年8月20日",
    text: "作品情報ページにC108新刊データを追加",
    url: "works/C108_SyngUp.html",
    isExternal: true,
    isNew: false
  },
  {
    date: "令和8年8月20日",
    text: "つぶやき：夏コミ御礼と冬コミに向けて 更新",
    url: "blog/20260819_summer_comiket.html",
    isExternal: true,
    isNew: false
  },
  {
    date: "令和8年8月20日",
    text: "照覧舎 公式Webサイト開設のお知らせ",
    url: "blog/20260820_website_open.html",
    isExternal: true,
    isNew: false
  },
  {
    date: "令和8年8月9日",
    text: "つぶやき：入稿完了！ 更新",
    url: null,
    isExternal: false,
    isNew: false
  }
];
