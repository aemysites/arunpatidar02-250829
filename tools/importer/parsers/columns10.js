/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main columns block
  // The block is the fusion-fullwidth fullwidth-box ... fusion-flex-container
  const block = element;

  // Find the inner row containing the columns
  const fusionRow = block.querySelector('.fusion-builder-row.fusion-row');
  if (!fusionRow) return;

  // Get all immediate column divs
  const columns = Array.from(fusionRow.children).filter(col => col.classList.contains('fusion-layout-column'));

  // Defensive: skip if no columns
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns (columns10)'];

  // Each column cell: grab the whole column wrapper (so we get heading + links)
  const columnCells = columns.map(col => {
    // The wrapper contains all content for this column
    const wrapper = col.querySelector('.fusion-column-wrapper');
    return wrapper || col;
  });

  // Build the table rows
  const cells = [
    headerRow,
    columnCells,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original block with the new table
  block.replaceWith(table);
}
