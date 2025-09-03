/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Columns (columns16)'];

  // Get all immediate child items (columns)
  const items = Array.from(element.querySelectorAll(':scope > .cmp-facts__item'));

  // Defensive: Only proceed if we have at least one item
  if (!items.length) return;

  // For each item, extract the content block (the .cmp-facts__content div)
  const columns = items.map(item => {
    // Find the content container
    const content = item.querySelector('.cmp-facts__content');
    // Defensive: fallback to item itself if not found
    return content || item;
  });

  // Build the table rows: header, then one row with all columns
  const tableRows = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
