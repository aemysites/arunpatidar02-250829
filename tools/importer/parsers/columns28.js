/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column contains a filter group, which is the full content for that column
  const cellsRow = columns.map((col) => {
    // Find the filter group inside the column
    const filterGroup = col.querySelector('.cmp-generic-finder__filter-group');
    // Defensive: fallback to the column itself if not found
    return filterGroup || col;
  });
  // Table header row as per block requirements
  const headerRow = ['Columns (columns28)'];
  // Table cells row: one cell per column
  const tableRows = [headerRow, cellsRow];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
