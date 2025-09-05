/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the two main column wrappers
  const columns = Array.from(element.querySelectorAll(':scope > div > div'));
  if (columns.length < 2) return;

  // First column: text content
  const leftCol = columns[0];
  let leftContent;
  // Find the deepest wrapper with actual text
  const leftWrapper = leftCol.querySelector('.fusion-column-wrapper');
  if (leftWrapper) {
    leftContent = leftWrapper;
  } else {
    leftContent = leftCol;
  }

  // Second column: background image
  const rightCol = columns[1];
  let rightContent;
  // Try to get the image URL from style or data-bg-url
  const rightWrapper = rightCol.querySelector('.fusion-column-wrapper');
  let imgUrl = '';
  if (rightWrapper) {
    imgUrl = rightWrapper.getAttribute('data-bg-url');
    if (!imgUrl) {
      // Try to extract from style
      const style = rightWrapper.getAttribute('style') || '';
      const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
      if (match) {
        imgUrl = match[1];
      }
    }
  }
  if (imgUrl) {
    // Create an image element
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = '';
    rightContent = img;
  } else {
    // fallback: use the wrapper itself
    rightContent = rightWrapper || rightCol;
  }

  // Build the table
  const headerRow = ['Columns (columns1)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
