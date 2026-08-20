/**
 * ==============================================================================
 * 照覧舎 公式Webサイト - メインスクリプト (js/main.js)
 * ==============================================================================
 */

// ブラウザのスクロール位置自動復元を無効化（常に最上部から表示）
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ==========================================
// タブ切り替え制御
// ==========================================
function switchTab(tabId, clickedElement) {
  // すべてのタブコンテンツを非表示
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  // 対象タブを表示
  const target = document.getElementById(tabId);
  if (target) {
    target.style.display = 'block';
  }

  // ナビゲーションのactiveクラス更新
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  if (clickedElement && clickedElement.classList.contains('nav-btn')) {
    clickedElement.classList.add('active');
  } else {
    // 該当するタブのボタンをactiveにする
    const tabMap = {
      'tab-top': 0,
      'tab-blog': 1,
      'tab-works': 2,
      'tab-about': 3
    };
    const index = tabMap[tabId] ?? 0;
    if (navBtns[index]) {
      navBtns[index].classList.add('active');
    }
  }

  // メインフレームを最上部へスクロール
  const mainFrame = document.getElementById('frame-bottom');
  if (mainFrame) {
    mainFrame.scrollTop = 0;
  }
  window.scrollTo(0, 0);
}

// ==========================================
// 各セクションの動的レンダリング & 初期化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderTicker();
  renderNews();
  renderEvents();
  renderUpdates();
  renderSNS();
  renderBlog();
  renderWorks();
  renderAbout();

  // リロード時または通常の訪問時は確実にTOPタブへ
  // （個別ページからの戻りリンク等で明示的に #blog, #works, #about が指定されている場合のみ該当タブを開く）
  const hash = window.location.hash ? window.location.hash.replace('#', '') : '';
  
  // リロード判定
  const isReload = (window.performance && window.performance.navigation && window.performance.navigation.type === 1) ||
                   (window.performance && window.performance.getEntriesByType('navigation').length > 0 && window.performance.getEntriesByType('navigation')[0].type === 'reload');

  if (isReload) {
    // リロードされた場合はハッシュをクリアしてTOPを確実に表示
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
    }
    switchTab('tab-top');
  } else if (hash && hash !== 'top') {
    const tabId = 'tab-' + hash;
    if (document.getElementById(tabId)) {
      switchTab(tabId);
    } else {
      switchTab('tab-top');
    }
  } else {
    switchTab('tab-top');
  }

  // スクロール位置を最上部に確実に固定
  const mainFrame = document.getElementById('frame-bottom');
  if (mainFrame) {
    mainFrame.scrollTop = 0;
  }
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  const mainFrame = document.getElementById('frame-bottom');
  if (mainFrame) {
    mainFrame.scrollTop = 0;
  }
  window.scrollTo(0, 0);
});

/**
 * 1. NEWSスライドテロップの描画 (data/ticker.js)
 */
function renderTicker() {
  const container = document.getElementById('ticker-content');
  if (!container || typeof TICKER_DATA === 'undefined') return;

  container.innerHTML = TICKER_DATA.map(text => `◆ ${text} `).join('');
}

/**
 * 2. ▼お知らせの描画 (data/news.js)
 */
function renderNews() {
  const container = document.getElementById('news-list-container');
  if (!container || typeof NEWS_DATA === 'undefined') return;

  container.innerHTML = NEWS_DATA.map(item => {
    // リンク先処理（#works, #blog, 外部リンクなど）
    let linkHtml = '';
    const newBadge = item.isNew ? '<img src="picture/new.gif" alt="NEW!" class="new-gif-icon">' : '';
    const extIcon = item.isExternal ? '<span class="external-link-icon">⧉</span>' : '';
    const noteHtml = item.note ? `<div class="note-red">${item.note}</div>` : '';

    if (item.url) {
      if (item.url.startsWith('#')) {
        const tabName = 'tab-' + item.url.replace('#', '');
        linkHtml = `<a href="${item.url}" onclick="switchTab('${tabName}'); return false;">${item.text}</a>`;
      } else {
        linkHtml = `<a href="${item.url}" target="_blank" rel="noopener">${item.text}</a>`;
      }
    } else {
      linkHtml = `<span>${item.text}</span>`;
    }

    return `
      <div class="list-row">
        <div class="list-date">■${item.date}</div>
        <div class="list-category">【${item.category}】</div>
        <div class="list-body">
          ${linkHtml}
          ${extIcon}
          ${newBadge}
          ${noteHtml}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 3. ▼イベント情報の描画 (data/events.js)
 */
function renderEvents() {
  const container = document.getElementById('events-list-container');
  if (!container || typeof EVENTS_DATA === 'undefined') return;

  container.innerHTML = EVENTS_DATA.map(item => {
    let linkHtml = '';
    const newBadge = item.isNew ? '<img src="picture/new.gif" alt="NEW!" class="new-gif-icon">' : '';
    const extIcon = item.isExternal ? '<span class="external-link-icon">⧉</span>' : '';

    if (item.url) {
      if (item.url.startsWith('#')) {
        const tabName = 'tab-' + item.url.replace('#', '');
        linkHtml = `<a href="${item.url}" onclick="switchTab('${tabName}'); return false;">${item.text}</a>`;
      } else {
        linkHtml = `<a href="${item.url}" target="_blank" rel="noopener">${item.text}</a>`;
      }
    } else {
      linkHtml = `<span>${item.text}</span>`;
    }

    return `
      <div class="list-row">
        <div class="list-date">■${item.date}</div>
        <div class="list-category">【${item.category}】</div>
        <div class="list-body">
          ${linkHtml}
          ${extIcon}
          ${newBadge}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 4. ▼更新情報の描画 (data/updates.js)
 */
function renderUpdates() {
  const container = document.getElementById('updates-list-container');
  if (!container || typeof UPDATES_DATA === 'undefined') return;

  container.innerHTML = UPDATES_DATA.map(item => {
    let linkHtml = '';
    const newBadge = item.isNew ? '<img src="picture/new.gif" alt="NEW!" class="new-gif-icon">' : '';
    const extIcon = item.isExternal ? '<span class="external-link-icon">⧉</span>' : '';

    if (item.url) {
      if (item.url.startsWith('#')) {
        const tabName = 'tab-' + item.url.replace('#', '');
        linkHtml = `<a href="${item.url}" onclick="switchTab('${tabName}'); return false;">${item.text}</a>`;
      } else {
        linkHtml = `<a href="${item.url}" target="_blank" rel="noopener">${item.text}</a>`;
      }
    } else {
      linkHtml = `<span>${item.text}</span>`;
    }

    return `
      <div class="list-row">
        <div class="list-date">■${item.date}</div>
        <div class="list-body">
          ${linkHtml}
          ${extIcon}
          ${newBadge}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 4.5. ▼SNSリンク集の描画 (data/sns.js)
 */
function renderSNS() {
  const container = document.getElementById('sns-list-container');
  if (!container || typeof SNS_DATA === 'undefined') return;

  container.innerHTML = SNS_DATA.map(item => {
    const descHtml = item.description ? ` <span style="font-size:11px; color:#000000;">（${item.description}）</span>` : '';

    return `
      <div class="list-row">
        <div class="list-date">■${item.service}</div>
        <div class="list-body">
          <a href="${item.url}" target="_blank" rel="noopener">${item.name}</a>
          <span class="external-link-icon">⧉</span>
          ${descHtml}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 5. ブログ・つぶやきの描画 (data/blog.js)
 */
function renderBlog() {
  const container = document.getElementById('blog-list-container');
  if (!container || typeof BLOG_DATA === 'undefined') return;

  container.innerHTML = BLOG_DATA.map(item => {
    const newBadge = item.isNew ? '<img src="picture/new.gif" alt="NEW!" class="new-gif-icon">' : '';
    const linkUrl = item.url ? item.url : '#';
    const author = item.author ? item.author : '弌鶴';

    return `
      <div class="blog-preview-card">
        <div class="blog-preview-title">
          ■ 文責: ${author}　${item.date}　<a href="${linkUrl}">${item.title}</a> ${newBadge}
        </div>
        <div class="blog-preview-body">
          ${item.body}
        </div>
        <div>
          <a href="${linkUrl}" class="blog-read-more">本文を読む &gt;&gt;</a>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * TOPページ用 画像パス解決ヘルパー
 */
function resolveTopWorkImagePath(imgStr) {
  if (!imgStr || typeof imgStr !== 'string') return null;
  const trimmed = imgStr.trim();
  if (trimmed === '') return null;

  if (/^(https?:\/\/|data:)/i.test(trimmed)) {
    return trimmed;
  }

  const clean = trimmed.replace(/^\.\.\//, '');
  if (clean.startsWith('picture/')) {
    return clean;
  }

  return `picture/works/${clean}`;
}

/**
 * 6. 作品情報・発行物一覧の描画 (data/works.js)
 */
function renderWorks() {
  const container = document.getElementById('works-list-container');
  if (!container || typeof WORKS_DATA === 'undefined') return;

  container.innerHTML = `
    <table class="works-table">
      <tbody>
        ${WORKS_DATA.map(work => {
          const newBadge = work.isNew ? '<img src="picture/new.gif" alt="NEW!" class="new-gif-icon">' : '';
          const noteHtml = work.note ? `<div class="note-red">${work.note}</div>` : '';
          const detailUrl = work.url ? work.url : '#';
          
          // 柔軟な画像パス解決（別フォルダ指定対応）
          const imgPath = resolveTopWorkImagePath(work.image);

          const thumbHtml = imgPath 
            ? `<a href="${detailUrl}"><img src="${imgPath}" alt="${work.title}" class="works-thumb-img" onerror="this.outerHTML='<div class=\\'works-thumb\\'>COVER<br>IMAGE</div>';"></a>` 
            : `<a href="${detailUrl}" style="text-decoration:none;"><div class="works-thumb">COVER<br>IMAGE</div></a>`;

          return `
            <tr>
              <td style="width: 95px;">
                ${thumbHtml}
              </td>
              <td>
                <div class="works-title">
                  <a href="${detailUrl}">${work.title}</a> ${newBadge}
                </div>
                <div style="font-size: 12px; color: #000000;">
                  ${work.description}
                </div>
                <div class="works-spec">
                  ${work.spec}
                </div>
                <div style="margin-top: 4px;">
                  <a href="${detailUrl}" style="font-size: 11px; font-weight: bold;">詳細・サンプル画像を見る &gt;&gt;</a>
                </div>
                ${noteHtml}
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

/**
 * 7. 照覧舎について (data/about.js)
 */
function renderAbout() {
  const profileContainer = document.getElementById('about-profile-container');
  const bannerContainer = document.getElementById('about-banner-container');
  if (typeof ABOUT_DATA === 'undefined') return;

  if (profileContainer && ABOUT_DATA.profile) {
    profileContainer.innerHTML = `
      <table class="about-table">
        <tbody>
          ${ABOUT_DATA.profile.map(row => `
            <tr>
              <th>${row.label}</th>
              <td>${row.value.replace(/\n/g, '<br>')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // 友人サークル紹介の描画
  const friendsContainer = document.getElementById('about-friends-container');
  if (friendsContainer && ABOUT_DATA.friends && ABOUT_DATA.friends.length > 0) {
    friendsContainer.innerHTML = `
      <table class="about-table">
        <tbody>
          ${ABOUT_DATA.friends.map(friend => {
            const masterHtml = friend.master ? `<div style="font-size: 11px; font-weight: normal; color: #000000; margin-top: 2px;">（主宰: ${friend.master}）</div>` : '';
            const bannerHtml = friend.banner ? `<div style="margin-bottom: 4px;"><a href="${friend.url}" target="_blank" rel="noopener"><img src="${friend.banner}" alt="${friend.name}" style="max-height: 40px; border: 1px solid #ff85b6;"></a></div>` : '';

            return `
              <tr>
                <th style="width: 140px; text-align: left; vertical-align: top;">
                  ${bannerHtml}
                  <a href="${friend.url}" target="_blank" rel="noopener" style="font-weight: bold;">${friend.name}</a> <span class="external-link-icon">⧉</span>
                  ${masterHtml}
                </th>
                <td style="vertical-align: middle;">
                  ${friend.description ? friend.description.replace(/\n/g, '<br>') : ''}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  if (bannerContainer && ABOUT_DATA.banner) {
    bannerContainer.innerHTML = `
      <p>${ABOUT_DATA.banner.description}</p>
      <div style="margin-top: 6px;">
        <input type="text" class="banner-code" readonly value="${ABOUT_DATA.banner.code.replace(/"/g, '&quot;')}">
      </div>
    `;
  }
}
