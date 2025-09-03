/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct teaser columns
  const grid = element.querySelector('.aem-Grid');
  if (!grid) return;

  // Get all direct children columns (each is a column)
  const columns = Array.from(grid.children).filter(col =>
    col.classList.contains('aem-GridColumn')
  );

  // Defensive: skip if no columns
  if (!columns.length) return;

  // For each column, get the teaser block (the whole block for resilience)
  const columnCells = columns.map(col => {
    // Find the teaser block inside the column
    const teaserBlock = col.querySelector('.cmp-teaser-block');
    // Defensive: fallback to the column itself if teaser block not found
    return teaserBlock || col;
  });

  // Build the table rows
  const headerRow = ['Columns (columns43)'];
  const contentRow = columnCells;
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
