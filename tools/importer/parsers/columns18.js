/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container (should be two columns)
  const cols = element.querySelectorAll(':scope > div > div');
  if (cols.length < 2) return;

  // First column: image
  const img = cols[0].querySelector('img');
  let imageCell = img ? img : cols[0];

  // Second column: accordion (include the whole accordion block)
  const accordion = cols[1].querySelector('.cmp-accordion');
  let accordionCell = accordion ? accordion : cols[1];

  // Build table
  const headerRow = ['Columns (columns18)'];
  const contentRow = [imageCell, accordionCell];
  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  if (table) element.replaceWith(table);
}
