/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the anchor links list
  const list = element.querySelector('.cmp-anchor-links__list');
  if (!list) return;

  // Get all anchor link elements (columns)
  const links = Array.from(list.children).filter((child) => child.tagName === 'A');
  if (links.length === 0) return;

  // Table header row
  const headerRow = ['Columns (columns12)'];

  // Each link is a column in the second row
  const columnsRow = links;

  // Build the table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
