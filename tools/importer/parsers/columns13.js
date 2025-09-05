/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract background image from style attribute
  function extractBgImage(el) {
    const style = el.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
    return match ? match[1] : null;
  }

  // Find the two main columns
  const columns = element.querySelectorAll(':scope > .fusion-builder-row > .fusion-layout-column');
  if (columns.length !== 2) return; // Defensive: only proceed if 2 columns

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  // The image is set as background-image on .fusion-column-wrapper
  const leftWrapper = leftCol.querySelector('.fusion-column-wrapper');
  const imgUrl = extractBgImage(leftWrapper);
  let imgEl = null;
  if (imgUrl) {
    imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imgEl.setAttribute('loading', 'lazy');
    imgEl.style.maxWidth = '100%';
    // Optionally, set width/height if known
  }

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  const rightWrapper = rightCol.querySelector('.fusion-column-wrapper');
  // Collect all content blocks in right column
  const rightContent = [];
  // Heading
  const heading = rightWrapper.querySelector('.fusion-text h3');
  if (heading) rightContent.push(heading);
  // Paragraph
  const para = rightWrapper.querySelector('.fusion-text p');
  if (para) rightContent.push(para);
  // Button
  const btn = rightWrapper.querySelector('a.fusion-button');
  if (btn) rightContent.push(btn);

  // --- TABLE STRUCTURE ---
  const headerRow = ['Columns (columns13)'];
  const contentRow = [imgEl, rightContent]; // 2 columns: image, content
  const cells = [headerRow, contentRow];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
