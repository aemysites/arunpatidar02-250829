/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero19)'];

  // Defensive: Find the background image from .parallax-inner's style
  let bgImgUrl = '';
  const parallaxInner = element.querySelector('.parallax-inner');
  if (parallaxInner && parallaxInner.style.backgroundImage) {
    // Extract url from style.backgroundImage: url("...")
    const match = parallaxInner.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) {
      bgImgUrl = match[1];
    }
  }

  // Create image element if background image exists
  let bgImgEl = null;
  if (bgImgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgImgUrl;
    bgImgEl.setAttribute('loading', 'lazy');
    bgImgEl.style.maxWidth = '100%';
    bgImgEl.style.height = 'auto';
  }

  // Row 2: Background image (optional)
  const bgRow = [bgImgEl ? bgImgEl : ''];

  // Row 3: Headline, subheading, CTA (none present in source)
  // For this HTML, there is no text content in .fusion-builder-row, so try to get any visible text from the element
  let contentCell = '';
  // Try to get any text content from the element except script/style
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'img') return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let textContent = '';
  let n;
  while ((n = walker.nextNode())) {
    if (n.nodeType === Node.TEXT_NODE) {
      const t = n.textContent.trim();
      if (t) textContent += (textContent ? ' ' : '') + t;
    }
  }
  if (textContent) {
    contentCell = textContent;
  }

  const contentRow = [contentCell];

  // Compose table rows
  const cells = [
    headerRow,
    bgRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
