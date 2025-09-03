/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the content container
  const content = element.querySelector('.cmp-quick-access__content');
  if (!content) return;

  // Get the list of links (column 1)
  const list = content.querySelector('.cmp-quick-access__list');
  // Get the button area (column 2)
  const button = content.querySelector('.cmp-quick-access__button');

  // Defensive: Only proceed if both columns exist
  if (!list || !button) return;

  // Table header
  const headerRow = ['Columns (columns36)'];

  // Table row: two columns, left is list, right is button
  const row = [list, button];

  // Build table
  const cells = [headerRow, row];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
