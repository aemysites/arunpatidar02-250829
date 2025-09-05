/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image URL from the inline style
  let bgUrl = '';
  const fullwidthBox = element.querySelector('.fusion-fullwidth');
  if (fullwidthBox) {
    const style = fullwidthBox.getAttribute('style') || '';
    const bgMatch = style.match(/background-image:\s*url\(("|')?(.*?)("|')?\)/);
    if (bgMatch && bgMatch[2]) {
      bgUrl = bgMatch[2];
    }
  }

  // Only create an image if we have a valid URL
  let imageEl = null;
  if (bgUrl) {
    imageEl = document.createElement('img');
    imageEl.src = bgUrl;
    imageEl.alt = '';
    imageEl.style.width = '100%';
    imageEl.style.display = 'block';
  }

  // Extract any text content from the element (flexible for future HTML changes)
  let textContent = '';
  // Try to find any text nodes inside the element
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node) {
      if (node.textContent && node.textContent.trim()) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    }
  });
  let node;
  while ((node = walker.nextNode())) {
    textContent += node.textContent.trim() + ' ';
  }
  textContent = textContent.trim();

  // Build table rows
  const headerRow = ['Columns (columns25)'];
  const contentRow = [];
  if (imageEl) contentRow.push(imageEl);
  if (textContent) contentRow.push(textContent);
  if (contentRow.length === 0) contentRow.push('');

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
