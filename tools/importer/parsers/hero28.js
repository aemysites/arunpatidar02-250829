/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero28)'];

  // 2. Extract background image from style attribute
  let bgImageUrl = '';
  const style = element.getAttribute('style') || '';
  const bgMatch = style.match(/background-image:\s*url\(([^)]+)\)/i);
  if (bgMatch && bgMatch[1]) {
    bgImageUrl = bgMatch[1].replace(/&quot;/g, '').replace(/['"]/g, '');
  }

  // 3. Create image element if background image exists
  let imageRow;
  if (bgImageUrl) {
    const img = document.createElement('img');
    img.src = bgImageUrl;
    img.alt = '';
    imageRow = [img];
  } else {
    imageRow = [''];
  }

  // 4. Extract headline, subheading, CTA, and ALL visible text content
  let textContent = '';
  function getTextContent(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textContent += node.textContent.trim() + ' ';
    } else {
      node.childNodes.forEach(getTextContent);
    }
  }
  getTextContent(element);
  textContent = textContent.trim();

  // Only add the third row if there is actual content
  const cells = [
    headerRow,
    imageRow
  ];
  if (textContent) {
    cells.push([textContent]);
  }

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
