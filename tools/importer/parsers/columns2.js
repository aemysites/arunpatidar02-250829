/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row as per block requirements
  const headerRow = ['Columns (columns2)'];

  // Title cell (first column)
  let titleCell = '';
  const titleDiv = element.querySelector('.rad-subnav-bar__title');
  if (titleDiv) {
    const anchor = titleDiv.querySelector('a');
    if (anchor) {
      titleCell = anchor;
    } else {
      titleCell = titleDiv.textContent.trim();
    }
  }

  // Get links from the first nav only (avoid duplicates)
  let columns = [];
  const itemsDiv = element.querySelector('.rad-subnav-bar__items');
  if (itemsDiv) {
    // Find the first nav with links (the visible one)
    const nav = itemsDiv.querySelector('nav.rad-subnav-bar__links');
    if (nav) {
      const links = Array.from(nav.querySelectorAll('a'));
      columns = links;
    }
  }

  // Compose the second row: title cell, then all link columns
  const secondRow = [titleCell, ...columns];

  // Table structure: header, then content row
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
