/**
 * ==============================================================================
 * 照覧舎 - ブログ個別記事ページ 共通レンダラー (js/blog_detail.js)
 * ==============================================================================
 * data/blog/[記事ID].js で定義された BLOG_POST オブジェクトを読み込み、
 * ページ全体を自動描画します。
 */

/**
 * ブログ用画像タグ生成ヘルパー関数
 * - 記事本文データ内で `${blogImg('picture/blog/sample.webp', '画像キャプション')}` のように呼び出せます。
 */
function blogImg(src, caption) {
  if (!src) return '';
  let imgPath = src.trim();
  if (/^(https?:\/\/|data:)/i.test(imgPath) || imgPath.startsWith('../')) {
    // そのまま
  } else if (imgPath.startsWith('picture/')) {
    imgPath = `../${imgPath}`;
  } else if (imgPath.startsWith('blog/') || imgPath.startsWith('works/')) {
    imgPath = `../picture/${imgPath}`;
  } else {
    imgPath = `../picture/blog/${imgPath}`;
  }

  const captionHtml = caption ? `<div class="blog-image-caption">${caption}</div>` : '';

  return `
    <div class="blog-image-center">
      <div class="blog-image-box">
        <img src="${imgPath}" alt="${caption || 'ブログ画像'}" onerror="this.outerHTML='<div class=\\'sample-item-placeholder\\'>IMAGE NOT FOUND</div>';">
        ${captionHtml}
      </div>
    </div>
  `;
}

function initBlogDetail() {
  // もし BLOG_POST が未定義、または template 用ダミーのままの場合はファイル名と同名のJSを自動読み込み
  const pathParts = window.location.pathname.split('/');
  const fileName = pathParts[pathParts.length - 1].replace(/\.html$/i, '');

  if (typeof BLOG_POST === 'undefined' || (fileName && fileName !== 'template' && document.getElementById('blog-post-title') && document.getElementById('blog-post-title').textContent === '')) {
    if (fileName && fileName !== 'template') {
      // 既存の BLOG_POST をリセットして個別記事用JSを優先ロード
      const existingScript = document.getElementById('blog-data-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'blog-data-script';
        script.src = `../data/blog/${fileName}.js`;
        script.onload = () => initBlogDetail();
        script.onerror = () => console.error(`Failed to load ../data/blog/${fileName}.js`);
        document.head.appendChild(script);
        return;
      }
    }
  }

  if (typeof BLOG_POST === 'undefined') {
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

  // 5. 本文 (あらゆる画像パス記法を完全自動補正)
  const bodyElem = document.getElementById('blog-post-body');
  if (bodyElem && BLOG_POST.content) {
    let contentHtml = typeof BLOG_POST.content === 'function' ? BLOG_POST.content() : BLOG_POST.content;

    // img タグの src パスを賢く自動補正
    contentHtml = contentHtml.replace(/src=["']([^"']+)["']/gi, (match, srcPath) => {
      let p = srcPath.trim();
      if (/^(https?:\/\/|data:)/i.test(p) || p.startsWith('../')) {
        return `src="${p}"`;
      }
      if (p.startsWith('picture/')) {
        return `src="../${p}"`;
      }
      if (p.startsWith('blog/') || p.startsWith('works/')) {
        return `src="../picture/${p}"`;
      }
      return `src="../picture/blog/${p}"`;
    });

    bodyElem.innerHTML = contentHtml;
  }
}

document.addEventListener('DOMContentLoaded', initBlogDetail);
