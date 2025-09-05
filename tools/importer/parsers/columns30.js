/* global WebImporter */
export default function parse(element, { document }) {
  // Find the fusion-row containing columns
  const fusionRow = element.querySelector('.fusion-builder-row');
  if (!fusionRow) return;

  // Get all direct fusion-layout-column children
  const columns = Array.from(fusionRow.children).filter(col => col.classList.contains('fusion-layout-column'));
  if (columns.length === 0) return;

  // For each column, extract its main content wrapper
  const cells = columns.map(col => {
    const wrapper = col.querySelector('.fusion-column-wrapper') || col;
    return wrapper;
  });

  // Build the table rows
  const tableRows = [
    ['Columns (columns30)'], // Header row must match block name exactly
    cells
  ];

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
