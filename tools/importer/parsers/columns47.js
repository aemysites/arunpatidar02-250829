/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main text-media block
  const textMedia = element.querySelector('.cmp-text-media');
  if (!textMedia) return;

  // Find the container with both columns
  const container = textMedia.querySelector('.cmp-text-media__container');
  if (!container) return;

  // Get left (content) and right (image) columns
  const contentCol = container.querySelector('.cmp-text-media__content');
  const mediaCol = container.querySelector('.cmp-text-media__media');
  if (!contentCol || !mediaCol) return;

  // Extract all children from contentCol (ul, p, etc)
  const leftCell = document.createElement('div');
  Array.from(contentCol.children).forEach(child => {
    leftCell.appendChild(child);
  });

  // Extract image from mediaCol
  const img = mediaCol.querySelector('img');
  let rightCell = '';
  if (img) {
    rightCell = img;
  }

  // Build table rows
  const headerRow = ['Columns (columns47)'];
  const secondRow = [leftCell, rightCell];
  const rows = [headerRow, secondRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
