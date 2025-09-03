/* global WebImporter */
export default function parse(element, { document }) {
  // Only proceed if element is an <ol> with role="tablist"
  if (!element || element.tagName !== 'OL' || element.getAttribute('role') !== 'tablist') {
    return;
  }

  // Table header row as per block requirements (must be one column)
  const headerRow = ['Tabs (tabs25)'];

  // Each <li> is a tab label; content is not present in this element, so use empty string for content
  const tabRows = Array.from(element.children)
    .filter((li) => li.tagName === 'LI')
    .map((li) => [li.textContent.trim(), '']);

  // Compose table cells (header + two columns per tab row)
  const cells = [headerRow, ...tabRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
