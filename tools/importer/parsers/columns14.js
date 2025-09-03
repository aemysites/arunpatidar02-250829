/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the facts list container
  const factsList = element.querySelector('.cmp-facts__list');
  if (!factsList) return;

  // Get all fact items (columns)
  const factItems = Array.from(factsList.children).filter(
    el => el.classList.contains('cmp-facts__item')
  );

  // For each fact item, collect its content as a single block
  const columns = factItems.map(item => {
    // The content wrapper
    const content = item.querySelector('.cmp-facts__content');
    if (!content) return '';
    // Return the whole content block for resilience
    return content;
  });

  // Table header
  const headerRow = ['Columns (columns14)'];
  // Table body: one row, each cell is a column
  const bodyRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
