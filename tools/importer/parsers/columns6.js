/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column elements
  const columns = Array.from(element.querySelectorAll(':scope > .fusion-builder-row > .fusion-layout-column'));
  if (!columns.length) return;

  // For each column, extract its content wrapper (preserving all child nodes)
  const columnCells = columns.map(col => {
    const wrapper = col.querySelector('.fusion-column-wrapper');
    // Defensive: fallback to column itself if wrapper not found
    return wrapper || col;
  });

  // Table header must match block name exactly
  const headerRow = ['Columns (columns6)'];
  const contentRow = columnCells;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
