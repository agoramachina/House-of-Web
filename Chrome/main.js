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
      if (!regex.test(node.nodeValue)) return;

      const spanWrapper = document.createElement('span');
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

let scheduled = false;
const houseWords = ['house', 'maison', 'haus', 'casa', 'domus', 'Дом', '家'];
const minotaurWords = ['ミーノータウロス', 'ミノタウロス', 'minotaure', 'minotauro', 'minotauros', 'minotaurus', 'Минотавр', 'minotaur']

highlightWordInTextNodes(
  document.body,
  houseWords,
  'color:#0047bb; font-family:Courier, monospace',
  'highlighted-house'
);
highlightWordInTextNodes(
    document.body,
    minotaurWords,
    'color:red; font-family:Courier, monospace; text-decoration: line-through;',
    'highlighted-minotaur'
);

const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;

  setTimeout(() => {
    highlightWordInTextNodes(
      document.body,
      houseWords,
      'color:#0047bb; font-family:Courier, monospace',
      'highlighted-house'
    );
    highlightWordInTextNodes(
        document.body,
        minotaurWords,
        'color:red; font-family:Courier, monospace; text-decoration: line-through;',
        'highlighted-minotaur'
    );
    scheduled = false;
  }, 250);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

