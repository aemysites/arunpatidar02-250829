/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the two main columns
  // Left: date info (cmp-event-date)
  // Right: details (cmp-event-feed__result-item-details)
  const leftCol = element.querySelector('.cmp-event-date');
  const rightCol = element.querySelector('.cmp-event-feed__result-item-details');

  // Header row as specified
  const headerRow = ['Columns (columns23)'];

  // Second row: two columns, left and right
  // Defensive: if not found, use empty div
  const leftCell = leftCol || document.createElement('div');
  const rightCell = rightCol || document.createElement('div');

  const tableRows = [
    headerRow,
    [leftCell, rightCell],
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
