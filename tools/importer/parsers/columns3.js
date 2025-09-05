/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Header row as per block requirements
  const headerRow = ['Columns (columns3)'];

  // Get all immediate child columns (should be two for this block)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: ensure we have at least two columns
  if (columns.length < 2) return;

  // For each column, find the main content wrapper (usually a div with class 'fusion-column-wrapper')
  const cells = columns.map((col) => {
    // Find the wrapper (should be the first child)
    const wrapper = col.querySelector(':scope > .fusion-column-wrapper');
    // Defensive: fallback to the column itself if wrapper not found
    return wrapper || col;
  });

  // Build the table rows: header, then one row with both columns
  const tableRows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
