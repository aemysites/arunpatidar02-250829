/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the content for each tile column
  function getTileContent(tile) {
    // The tile content wrapper contains all relevant content
    const contentWrapper = tile.querySelector('.cmp-tiles__tile-content-wrapper');
    if (!contentWrapper) return tile; // fallback: use the tile itself
    return contentWrapper;
  }

  // Get all immediate tile children (columns)
  const tiles = Array.from(element.querySelectorAll(':scope > .cmp-tiles__tile'));
  if (!tiles.length) return;

  // Header row as per spec
  const headerRow = ['Columns (columns27)'];

  // Second row: one cell per column, each with the tile's content
  const columnsRow = tiles.map(getTileContent);

  // Build table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
