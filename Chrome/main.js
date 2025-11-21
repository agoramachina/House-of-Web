function highlightWordInTextNodes(rootNode, words, style, className) {
  const pattern = words.join('|');
  const regex = new RegExp(pattern, 'gi');
  const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'];

  function isInsideHighlight(node) {
    while (node) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node.classList.contains(className) || node.getAttribute('data-highlighted') === 'true')
      ) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  function walk(node) {
    if (skipTags.includes(node.nodeName)) return;

    if (node.nodeType === Node.TEXT_NODE) {
      if (isInsideHighlight(node)) return;
      // Reset regex lastIndex to avoid issues with global flag
      regex.lastIndex = 0;
      if (!regex.test(node.nodeValue)) return;

      const spanWrapper = document.createElement('span');
      regex.lastIndex = 0;
      spanWrapper.innerHTML = node.nodeValue.replace(regex, match =>
        `<span class="${className}" style="${style}" data-highlighted="true">${match}</span>`
      );

      while (spanWrapper.firstChild) {
        node.parentNode.insertBefore(spanWrapper.firstChild, node);
      }
      node.parentNode.removeChild(node);
    } else if (!isInsideHighlight(node)) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        walk(node.childNodes[i]);
      }
    }
  }

  walk(rootNode);
}

// House in: English, French, German, Spanish, Latin, Russian, Japanese, Greek
const houseWords = ['house', 'maison', 'haus', 'casa', 'domus', 'Дом', '家', 'σπίτι'];
// Minotaur in: English, French, Spanish/Italian, Greek, Latin, Russian, Japanese
const minotaurWords = ['minotaur', 'minotaure', 'minotauro', 'minotauros', 'minotaurus', 'Минотавр', 'ミノタウロス', 'ミーノータウロス'];

const houseStyle = 'color:#0047bb; font-family:Courier, monospace';
const minotaurStyle = 'color:red; font-family:Courier, monospace; text-decoration: line-through;';

function applyHighlighting(rootNode) {
  highlightWordInTextNodes(rootNode, houseWords, houseStyle, 'highlighted-house');
  highlightWordInTextNodes(rootNode, minotaurWords, minotaurStyle, 'highlighted-minotaur');
}

// Initial highlighting
applyHighlighting(document.body);

// Set up observer for dynamic content
let scheduled = false;
let pendingNodes = new Set();

const observer = new MutationObserver((mutations) => {
  // Collect only the added nodes, skip if they're our own highlights
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip nodes we created (our highlight spans)
        if (node.getAttribute && node.getAttribute('data-highlighted') === 'true') {
          continue;
        }
        pendingNodes.add(node);
      } else if (node.nodeType === Node.TEXT_NODE) {
        // For text nodes, we'll process the parent
        if (node.parentNode && !node.parentNode.getAttribute?.('data-highlighted')) {
          pendingNodes.add(node.parentNode);
        }
      }
    }
  }

  if (pendingNodes.size === 0) return;
  if (scheduled) return;
  scheduled = true;

  setTimeout(() => {
    // Disconnect observer while we make changes to avoid feedback loop
    observer.disconnect();

    for (const node of pendingNodes) {
      // Make sure node is still in the document
      if (document.contains(node)) {
        applyHighlighting(node);
      }
    }
    pendingNodes.clear();
    scheduled = false;

    // Reconnect observer
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }, 250);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
