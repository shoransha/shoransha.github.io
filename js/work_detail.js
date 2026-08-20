/**
 * ==============================================================================
 * 照覧舎 - 作品詳細ページ 共通レンダラー (js/work_detail.js)
 * ==============================================================================
 * data/works/[作品ID].js で定義された WORK_DETAIL オブジェクトを読み込み、
 * ページ全体を自動描画します。
 */

/**
 * 画像パスを柔軟に解決するヘルパー関数
 * - 作品個別ページ（works/ 配下）から画像ファイルへの相対パスを自動補完します。
 * - フォルダ指定（例: "C108/sample.webp" や "picture/works/C108/sample.webp"）や
 *   imageDir オプション（例: imageDir: "C108"）に対応しています。
 */
function resolveWorkImagePath(imgStr, baseDir) {
  if (!imgStr || typeof imgStr !== 'string') return null;
  const trimmed = imgStr.trim();
  if (trimmed === '') return null;

  // 完全なURL（http://, https://, data:）
  if (/^(https?:\/\/|data:)/i.test(trimmed)) {
    return trimmed;
  }

  // 既に ../ で始まっている場合
  if (trimmed.startsWith('../')) {
    return trimmed;
  }

  // picture/ から始まっている場合（例: "picture/works/C108/sample.webp"）
  if (trimmed.startsWith('picture/')) {
    return `../${trimmed}`;
  }

  // baseDir（imageDir）が指定されている場合
  if (baseDir && typeof baseDir === 'string' && baseDir.trim() !== '') {
    let cleanDir = baseDir.trim().replace(/^\.\.\//, '').replace(/\/+$/, '');
    if (!cleanDir.startsWith('picture/')) {
      cleanDir = `picture/works/${cleanDir}`;
    }
    return `../${cleanDir}/${trimmed}`;
  }

  // スラッシュを含む場合（例: "C108/sample.webp" -> "../picture/works/C108/sample.webp"）
  if (trimmed.includes('/')) {
    return `../picture/works/${trimmed}`;
  }

  // ファイル名単体の場合（例: "sample.webp" -> "../picture/works/sample.webp"）
  return `../picture/works/${trimmed}`;
}

// ページの初期化処理
function initWorkDetail() {
  if (typeof WORK_DETAIL === 'undefined') {
    // もし手動読み込みスクリプトが指定されていない場合、HTMLファイル名と同名のJSを自動読み込み
    const pathParts = window.location.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1].replace(/\.html$/i, '');
    if (fileName && fileName !== 'template') {
      const script = document.createElement('script');
      script.src = `../data/works/${fileName}.js`;
      script.onload = () => initWorkDetail();
      script.onerror = () => console.error(`Failed to load ../data/works/${fileName}.js`);
      document.head.appendChild(script);
      return;
    }
    console.error('WORK_DETAIL is not defined.');
    return;
  }

  const baseDir = WORK_DETAIL.imageDir || null;

  // 1. ページタイトルの自動設定
  document.title = `${WORK_DETAIL.title} 作品詳細・サンプル - 照覧舎`;

  // 2. パンくずリスト
  const breadcrumbElem = document.getElementById('work-breadcrumb-title');
  if (breadcrumbElem) {
    breadcrumbElem.textContent = WORK_DETAIL.title;
  }

  // 3. 表紙画像
  const coverImg = document.getElementById('work-cover-img');
  const coverPlaceholder = document.getElementById('work-cover-placeholder');
  if (coverImg && coverPlaceholder) {
    const imgPath = resolveWorkImagePath(WORK_DETAIL.coverImage, baseDir);
    if (imgPath) {
      coverImg.src = imgPath;
      coverImg.alt = `${WORK_DETAIL.title} 表紙`;
      coverImg.style.display = 'block';
      coverPlaceholder.style.display = 'none';
    } else {
      coverImg.style.display = 'none';
      coverPlaceholder.style.display = 'flex';
    }
  }

  // 4. タイトル & キャッチコピー
  const titleContainer = document.getElementById('work-title-area');
  if (titleContainer) {
    const newBadge = WORK_DETAIL.isNew ? '<img src="../picture/new.gif" alt="NEW!" class="new-gif-icon">' : '';
    titleContainer.innerHTML = `
      <h1 class="post-title" style="font-size: 20px; margin-bottom: 8px;">
        ${WORK_DETAIL.title} ${newBadge}
      </h1>
      ${WORK_DETAIL.catch ? `<p style="font-size: 12px; color: #000000; line-height: 1.6; margin-bottom: 8px;">${WORK_DETAIL.catch}</p>` : ''}
    `;
  }

  // 5. 仕様表 (スペック)
  const specTableContainer = document.getElementById('work-spec-table');
  if (specTableContainer && WORK_DETAIL.spec) {
    const rowsHtml = Object.entries(WORK_DETAIL.spec).map(([key, val]) => `
      <tr>
        <th>${key}</th>
        <td>${val}</td>
      </tr>
    `).join('');

    specTableContainer.innerHTML = `
      <table class="work-detail-table">
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  }

  // 6. あらすじ・解説
  const descContainer = document.getElementById('work-description-area');
  if (descContainer && WORK_DETAIL.description) {
    descContainer.innerHTML = WORK_DETAIL.description;
  }

  // 7. トラックリスト (音楽作品等で存在する場合)
  const trackContainer = document.getElementById('work-tracklist-area');
  const trackSection = document.getElementById('work-tracklist-section');
  if (trackContainer && trackSection) {
    if (WORK_DETAIL.tracks && WORK_DETAIL.tracks.length > 0) {
      trackSection.style.display = 'block';
      trackContainer.innerHTML = `
        <ol style="margin-left: 20px;">
          ${WORK_DETAIL.tracks.map(t => `<li>${t}</li>`).join('')}
        </ol>
      `;
    } else {
      trackSection.style.display = 'none';
    }
  }

  // 8. サンプル画像ギャラリー
  const sampleGrid = document.getElementById('work-samples-grid');
  if (sampleGrid && WORK_DETAIL.samples && WORK_DETAIL.samples.length > 0) {
    sampleGrid.innerHTML = WORK_DETAIL.samples.map((sample, idx) => {
      const imgPath = resolveWorkImagePath(sample.image, baseDir);
      return `
        <div class="sample-item">
          <img 
            src="${imgPath}" 
            alt="${sample.caption || `サンプル ${idx + 1}`}" 
            class="sample-item-img"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          >
          <div class="sample-item-placeholder" style="display: none;">
            SAMPLE<br>IMAGE ${idx + 1}
          </div>
          <div class="sample-item-caption">${sample.caption || `サンプル ${idx + 1}`}</div>
        </div>
      `;
    }).join('');
  }
}

document.addEventListener('DOMContentLoaded', initWorkDetail);
