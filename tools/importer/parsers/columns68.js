/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for the block
  const main = element;

  // Find the two main columns: image and content
  // The structure is: .cmp-text-media__media (image), .cmp-text-media__content (text)
  const mediaCol = main.querySelector('.cmp-text-media__media');
  const contentCol = main.querySelector('.cmp-text-media__content');

  // Defensive fallback if not found
  if (!mediaCol || !contentCol) return;

  // Header row
  const headerRow = ['Columns (columns68)'];

  // Second row: two columns, left is image, right is text content
  // Use the entire mediaCol and contentCol blocks as cells
  const secondRow = [mediaCol, contentCol];

  // Build the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
