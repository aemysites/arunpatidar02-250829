/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two top-level columns
  const columns = Array.from(element.querySelectorAll(':scope > .fusion-builder-row > .fusion-layout-column'));
  if (columns.length !== 2) return; // Defensive: expect 2 columns

  // LEFT COLUMN: find the main content wrapper
  const leftColWrapper = columns[0].querySelector(':scope > .fusion-column-wrapper');
  const leftContent = leftColWrapper || columns[0];

  // RIGHT COLUMN: get the background image from the wrapper's style
  const rightColWrapper = columns[1].querySelector(':scope > .fusion-column-wrapper');
  let rightContent;
  if (rightColWrapper && rightColWrapper.style.backgroundImage) {
    const bgUrlMatch = rightColWrapper.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (bgUrlMatch && bgUrlMatch[1]) {
      const img = document.createElement('img');
      img.src = bgUrlMatch[1];
      rightContent = img;
    }
  }
  if (!rightContent) {
    rightContent = document.createElement('div');
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns14)'];
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
