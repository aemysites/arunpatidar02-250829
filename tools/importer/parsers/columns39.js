/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid containing the columns
  const grid = element.querySelector('.aem-Grid');
  if (!grid) return;

  // Find the two main grid columns: left (links blocks) and right (contact)
  const gridColumns = grid.querySelectorAll(':scope > .aem-GridColumn');
  if (gridColumns.length < 2) return;

  // Left column: contains the links blocks (UNTERNEHMEN, SERVICE, SOCIAL MEDIA)
  const leftCol = gridColumns[0];
  // Defensive: find the block container
  const linksBlockContainer = leftCol.querySelector('.cmp-footer__links-block-container');
  if (!linksBlockContainer) return;

  // Each block is a column: get all blocks
  const blocks = Array.from(linksBlockContainer.querySelectorAll(':scope > .cmp-footer__links-block'));

  // Right column: contains the contact info
  const rightCol = gridColumns[1];
  // Defensive: find the contact block
  const contactBlock = rightCol.querySelector('.cmp-footer__contact');

  // Build the columns row
  const columnsRow = [];

  // Add each links block as a column
  blocks.forEach((block) => {
    columnsRow.push(block);
  });

  // Add the contact block as the last column
  if (contactBlock) {
    columnsRow.push(contactBlock);
  }

  // Table header
  const headerRow = ['Columns (columns39)'];

  // Build the table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
