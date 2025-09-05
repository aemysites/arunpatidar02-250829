/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate column elements
  const row = element.querySelector('.fusion-builder-row');
  let columns = [];
  if (row) {
    columns = Array.from(row.querySelectorAll(':scope > .fusion-layout-column'));
  } else {
    // fallback: try direct children
    columns = Array.from(element.querySelectorAll(':scope > .fusion-layout-column'));
  }

  // For each column, extract all content (not just images)
  const cells = columns.map(col => {
    const wrapper = col.querySelector('.fusion-column-wrapper') || col;
    // Collect all direct children of the wrapper
    const cellContent = Array.from(wrapper.childNodes).filter(node => {
      // Exclude empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    // If only one element, return it directly, else return array
    if (cellContent.length === 1) return cellContent[0];
    if (cellContent.length > 1) return cellContent;
    // fallback: return wrapper itself if empty
    return wrapper;
  });

  // Only build the block if we have at least one cell
  if (cells.length === 0) return;

  // Build the table rows
  const headerRow = ['Columns (columns29)'];
  const contentRow = cells;

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
