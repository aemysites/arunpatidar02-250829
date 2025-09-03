/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for text and media
  const mainContainer = element.querySelector('.cmp-text-media__container');
  if (!mainContainer) return;

  // Find media (image)
  const mediaCol = mainContainer.querySelector('.cmp-text-media__media');
  let imageEl = null;
  if (mediaCol) {
    imageEl = mediaCol.querySelector('img');
  }

  // Find text content
  const contentCol = mainContainer.querySelector('.cmp-text-media__content');
  let textContent = null;
  if (contentCol) {
    // Use the whole content column (contains list and links)
    textContent = contentCol;
  }

  // Build table rows
  const headerRow = ['Columns (columns55)'];
  // Second row: left column is text, right column is image
  const contentRow = [textContent, imageEl];

  // Create block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
