/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Hero (hero16)'];

  // Extract background image URL from inline style
  let bgUrl = '';
  const style = element.getAttribute('style') || '';
  const bgMatch = style.match(/background-image:\s*url\(("|')?(.*?)("|')?\)/i);
  if (bgMatch && bgMatch[2]) {
    bgUrl = bgMatch[2];
  }

  // Create an image element for the background image if present
  let bgImgEl = null;
  if (bgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgUrl;
    bgImgEl.alt = '';
    bgImgEl.width = 720;
    bgImgEl.height = 200;
  }

  // Second row: background image (optional)
  const imageRow = [bgImgEl ? bgImgEl : ''];

  // Third row: always present, even if empty
  const innerDiv = element.querySelector('.fusion-builder-row');
  let textContent = '';
  if (innerDiv) {
    textContent = innerDiv.textContent.trim();
  }
  const textRow = [textContent ? textContent : ''];

  // Compose table rows: always 3 rows
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
