/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract background image from style attribute
  function getBgImageUrl(style) {
    if (!style) return null;
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
    return match ? match[1] : null;
  }

  // Get the two main columns
  const columns = Array.from(element.querySelectorAll(':scope > div > div'));
  if (columns.length < 2) return; // Defensive: must have at least 2 columns

  // --- Column 1: Image ---
  let imageCell;
  const col1 = columns[0];
  // Find the wrapper with background-image
  const wrapper1 = col1.querySelector('.fusion-column-wrapper');
  const bgUrl = getBgImageUrl(wrapper1?.getAttribute('style')) || wrapper1?.dataset.bgUrl;
  if (bgUrl) {
    const img = document.createElement('img');
    img.src = bgUrl;
    img.alt = '';
    imageCell = img;
  } else {
    imageCell = wrapper1 || col1;
  }

  // --- Column 2: Text ---
  let textCell;
  const col2 = columns[1];
  // Find the deepest fusion-text block
  const fusionText = col2.querySelector('.fusion-text');
  if (fusionText) {
    textCell = fusionText;
  } else {
    textCell = col2;
  }

  // Build the table
  const headerRow = ['Columns (columns11)'];
  const contentRow = [imageCell, textCell];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
