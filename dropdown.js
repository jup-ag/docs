(function () {
  'use strict';

  const VISIBLE_ITEMS = 3;
  const DESKTOP_BREAKPOINT = 768; /* match style.css @media (min-width: 768px) */
  const ITEM_HIDDEN_CLASS = 'dropdown-item-hidden';
  const SHOW_MORE_ATTR = 'data-dropdown-show-more';
  const SEPARATOR_ATTR = 'data-dropdown-separator';
  const COLLAPSED_ATTR = 'data-dropdown-collapsed';
  const EXPANDED_ATTR = 'data-dropdown-expanded';
  const CONTENT_SELECTOR = '[data-radix-menu-content]';
  const ITEMS_SELECTOR = '> *';

  function isDesktop() {
    return typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT;
  }

  function getItems(content) {
    return Array.from(content.querySelectorAll(':scope ' + ITEMS_SELECTOR)).filter(
      function (el) {
        return !el.hasAttribute(SHOW_MORE_ATTR) && !el.hasAttribute(SEPARATOR_ATTR);
      }
    );
  }

  function applyCollapsedState(content) {
    if (!isDesktop()) {
      expandContent(content);
      content.removeAttribute(EXPANDED_ATTR);
      return;
    }
    if (content.hasAttribute(EXPANDED_ATTR)) return;
    if (content.hasAttribute(COLLAPSED_ATTR)) return;

    var items = getItems(content);
    if (items.length <= VISIBLE_ITEMS) return;

    for (var i = VISIBLE_ITEMS; i < items.length; i++) {
      items[i].classList.add(ITEM_HIDDEN_CLASS);
    }

    var separator = document.createElement('div');
    separator.setAttribute(SEPARATOR_ATTR, '');
    separator.className = 'dropdown-separator';

    var showMore = document.createElement('button');
    showMore.type = 'button';
    showMore.setAttribute(SHOW_MORE_ATTR, '');
    showMore.className = 'link nav-dropdown-item rounded-xl text-gray-600 hover:text-gray-800 px-2.5 py-2 dark:text-gray-400 dark:hover:text-gray-300 flex group items-center gap-2 hover:bg-gray-600/5 dark:hover:bg-gray-200/5 w-full text-left';
    var svg = document.createElement('svg');
    svg.className = 'h-4 w-4 shrink-0 bg-gray-600 dark:bg-gray-400';
    svg.setAttribute('style', 'mask-image: url("https://d3gk2c5xim1je2.cloudfront.net/v7.1.0/regular/chevron-down.svg"); -webkit-mask-image: url("https://d3gk2c5xim1je2.cloudfront.net/v7.1.0/regular/chevron-down.svg"); mask-repeat: no-repeat; mask-position: center center; -webkit-mask-repeat: no-repeat; -webkit-mask-position: center center;');
    var inner = document.createElement('div');
    inner.className = 'flex flex-col min-w-0 grow';
    var span = document.createElement('span');
    span.className = 'text-sm font-medium whitespace-nowrap';
    span.textContent = 'Show more';
    inner.appendChild(span);
    showMore.appendChild(svg);
    showMore.appendChild(inner);
    content.appendChild(separator);
    content.appendChild(showMore);
    content.setAttribute(COLLAPSED_ATTR, 'true');
  }

  function expandContent(content) {
    var items = getItems(content);
    items.forEach(function (el) { el.classList.remove(ITEM_HIDDEN_CLASS); });

    var sep = content.querySelector('[' + SEPARATOR_ATTR + ']');
    if (sep) sep.remove();
    var showMore = content.querySelector('[' + SHOW_MORE_ATTR + ']');
    if (showMore) showMore.remove();

    content.removeAttribute(COLLAPSED_ATTR);
    content.setAttribute(EXPANDED_ATTR, 'true');
  }

  function processContent(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.matches && node.matches(CONTENT_SELECTOR)) {
      applyCollapsedState(node);
      return;
    }
    if (node.querySelectorAll) {
      var contents = node.querySelectorAll(CONTENT_SELECTOR);
      for (var i = 0; i < contents.length; i++) {
        applyCollapsedState(contents[i]);
      }
    }
  }

  var observer = new MutationObserver(function (mutations) {
    for (var m = 0; m < mutations.length; m++) {
      var list = mutations[m].addedNodes;
      for (var i = 0; i < list.length; i++) {
        processContent(list[i]);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest && e.target.closest('[' + SHOW_MORE_ATTR + ']');
    if (!btn) return;
    var content = btn.closest(CONTENT_SELECTOR);
    if (content) expandContent(content);
  });

  var existing = document.querySelectorAll(CONTENT_SELECTOR);
  for (var j = 0; j < existing.length; j++) {
    applyCollapsedState(existing[j]);
  }

  window.addEventListener('resize', function () {
    var contents = document.querySelectorAll(CONTENT_SELECTOR);
    for (var k = 0; k < contents.length; k++) {
      applyCollapsedState(contents[k]);
    }
  });
})();
