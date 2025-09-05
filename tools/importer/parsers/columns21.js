/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main wrapper for the columns content
  const wrapper = element.querySelector('.fusion-column-wrapper') || element;

  // Find the list of steps (columns)
  const ul = wrapper.querySelector('ul.bewerbung');
  if (!ul) return;

  // Get all <li> elements (each is a column)
  const lis = Array.from(ul.querySelectorAll(':scope > li'));
  if (lis.length === 0) return;

  // For each column, build a cell with its content
  const columns = lis.map((li) => {
    // Each li contains:
    // - a <div> with the number
    // - a <span> with a <h5> and description
    // We'll combine all content for resilience
    const parts = [];
    // Number circle
    const numDiv = li.querySelector('div');
    if (numDiv) parts.push(numDiv);
    // Title and description
    const span = li.querySelector('span');
    if (span) parts.push(span);
    return parts;
  });

  // Build the table rows
  const headerRow = ['Columns (columns21)'];
  const contentRow = columns;

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
