/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the main tile content as a single cell
  function extractTileContent(tile) {
    // The tile content wrapper contains all relevant content
    const contentWrapper = tile.querySelector('.cmp-tiles__tile-content-wrapper');
    // Defensive: fallback to tile itself if not found
    return contentWrapper || tile;
  }

  // Find the grid container with the tiles
  const gridContainer = element.querySelector('.cmp-tiles__grid-container');
  if (!gridContainer) return;

  // Get all direct tile elements
  const tiles = Array.from(gridContainer.querySelectorAll(':scope > .cmp-tiles__tile'));
  if (tiles.length === 0) return;

  // Build the header row
  const headerRow = ['Columns (columns64)'];

  // Build the columns row: each cell is the full tile content
  const columnsRow = tiles.map(extractTileContent);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
