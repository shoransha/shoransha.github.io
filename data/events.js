/**
 * ==============================================================================
 * 照覧舎 - ▼イベント情報 データ
 * ==============================================================================
 * 同人即売会やイベント参加予定を登録します。
 * 
 * 【項目の説明】
 * - date: 開催日または告知日（例: "8月11日"）
 * - category: イベント名（例: "コミケ108", "コミティア"）
 * - text: 告知タイトルまたは詳細内容
 * - url: リンク先（ない場合は null または ""）
 * - isExternal: 外部サイトの場合は true
 * - isNew: NEW! アイコン（new.gif）を付ける場合は true
 */
const EVENTS_DATA = [
  {
    date: "8月18日",
    category: "コミケット",
    text: "C109出展申込完了しました！　かぐや様で新刊発行予定です。",
    url: "blog/20260820_C109.html",
    isExternal: true,
    isNew: true
  },
  {
    date: "8月16日",
    category: "コミケット",
    text: "C108参加しました！　弊サークルへ足を運んでくださったみなさん、ありがとうございました！",
    url: null,
    isExternal: false,
    isNew: true
  },
  {
    date: "6月5日",
    category: "コミケット",
    text: "C108にて照覧舎は、日曜日 東地区 東３ホール ヨ12a に配置されました。",
    url: "https://webcatalog.circle.ms/circle/23005951",
    isExternal: true,
    isNew: false
  },
  {
    date: "2月20日",
    category: "コミケット",
    text: "C108出展申込完了しました！　学マスで新刊発行予定です。",
    url: null,
    isExternal: false,
    isNew: false
  }
];
