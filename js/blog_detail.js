/**
 * ==============================================================================
 * 照覧舎 - ブログ個別記事ページ 共通レンダラー (js/blog_detail.js)
 * ==============================================================================
 * data/blog/[記事ID].js で定義された BLOG_POST オブジェクトを読み込み、
 * ページ全体を自動描画します。
 */

function initBlogDetail() {
  if (typeof BLOG_POST === 'undefined') {
    // もし手動読み込みスクリプトが指定されていない場合、HTMLファイル名と同名のJSを自動読み込み
    const pathParts = window.location.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1].replace(/\.html$/i, '');
    if (fileName && fileName !== 'template') {
      const script = document.createElement('script');
      script.src = `../data/blog/${fileName}.js`;
      script.onload = () => initBlogDetail();
      script.onerror = () => console.error(`Failed to load ../data/blog/${fileName}.js`);
      document.head.appendChild(script);
      return;
    }
    console.error('BLOG_POST is not defined.');
    return;
  }

  // 1. ページタイトルの自動設定
  document.title = `${BLOG_POST.title} - 照覧舎ブログ`;

  // 2. パンくずリスト
  const breadcrumbElem = document.getElementById('blog-breadcrumb-title');
  if (breadcrumbElem) {
    breadcrumbElem.textContent = BLOG_POST.title;
  }

  // 3. 記事タイトル
  const titleElem = document.getElementById('blog-post-title');
  if (titleElem) {
    titleElem.textContent = BLOG_POST.title;
  }

  // 4. メタ情報（文責・投稿日・カテゴリ）
  const metaElem = document.getElementById('blog-post-meta');
  if (metaElem) {
    const author = BLOG_POST.author || '弌鶴';
    const date = BLOG_POST.date || '';
    const category = BLOG_POST.category || '制作日誌';

    metaElem.innerHTML = `文責: ${author}　｜　投稿日: ${date}　｜　カテゴリ: ${category}`;
  }

  // 5. 本文
  const bodyElem = document.getElementById('blog-post-body');
  if (bodyElem && BLOG_POST.content) {
    bodyElem.innerHTML = BLOG_POST.content;
  }
}

document.addEventListener('DOMContentLoaded', initBlogDetail);
