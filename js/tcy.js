/**
 * ==============================================================================
 * 照覧舎 - 縦中横 (Tate-chu-yoko) 自動適用スクリプト (js/tcy.js)
 * ==============================================================================
 * 縦書きレイアウト内で、2文字以内の半角数字（1〜99など）を自動検知し、
 * <span class="tcy">...</span> で囲んで縦中横（横書き正立）表示にします。
 * 3桁以上の数字（100以上、西暦など）は縦書きのまま保持されます。
 */

(function() {
  'use strict';

  let isTcyApplying = false;

  /**
   * 指定要素配下のテキストノードから2桁以内の半角数字を検索して縦中横spanでラップする
   */
  function applyTcyToElement(root) {
    if (!root) return;

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'input', 'textarea', 'pre', 'code'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          // 除外対象コンテナ
          if (
            parent.closest('.tcy') ||
            parent.closest('.retro-counter-container') ||
            parent.closest('.banner-preview-box') ||
            parent.closest('.header-logo-container') ||
            parent.closest('.nav-bar-container')
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          // 2文字以内の半角数字が含まれているか
          if (/(?<!\d)\d{1,2}(?!\d)/.test(node.nodeValue)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        }
      }
    );

    const textNodes = [];
    let n;
    while ((n = walker.nextNode())) {
      textNodes.push(n);
    }

    const regex = /(?<!\d)\d{1,2}(?!\d)/g;
    for (const textNode of textNodes) {
      const text = textNode.nodeValue;
      let match;
      let lastIndex = 0;
      const fragment = document.createDocumentFragment();
      let hasMatch = false;

      while ((match = regex.exec(text)) !== null) {
        hasMatch = true;
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const span = document.createElement('span');
        span.className = 'tcy';
        span.textContent = match[0];
        fragment.appendChild(span);
        lastIndex = regex.lastIndex;
      }

      if (hasMatch) {
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        if (textNode.parentNode) {
          textNode.parentNode.replaceChild(fragment, textNode);
        }
      }
    }
  }

  function applyTcy(root) {
    const target = root || document.querySelector('.content-wrapper') || document.body;
    if (isTcyApplying || !target) return;
    isTcyApplying = true;
    try {
      applyTcyToElement(target);
    } finally {
      isTcyApplying = false;
    }
  }

  function init() {
    const contentWrapper = document.querySelector('.content-wrapper') || document.body;
    if (!contentWrapper) return;

    // 初回適用
    applyTcy(contentWrapper);

    // 動的更新（タブ切り替え、「もっと見る」展開、データ遅延描画）を監視
    const observer = new MutationObserver((mutations) => {
      if (isTcyApplying) return;
      let needsUpdate = false;
      for (const m of mutations) {
        if (m.type === 'childList') {
          for (const node of m.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('tcy')) {
              needsUpdate = true;
              break;
            }
          }
        }
        if (needsUpdate) break;
      }
      if (needsUpdate) {
        applyTcy(contentWrapper);
      }
    });

    observer.observe(contentWrapper, { childList: true, subtree: true });

    // レンダリング遅延対策として短時間後にも再走査
    setTimeout(() => applyTcy(contentWrapper), 100);
    setTimeout(() => applyTcy(contentWrapper), 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // グローバル公開（手動呼び出しが必要な場合用）
  window.applyTcy = applyTcy;
})();
