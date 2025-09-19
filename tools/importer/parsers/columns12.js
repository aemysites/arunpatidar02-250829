/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child cards
  const cards = Array.from(element.querySelectorAll(':scope > .rad-absorb-stats__card'));

  // Each card becomes a column cell. We'll extract the stat and detail for each.
  const cells = [];
  const headerRow = ['Columns (columns12)'];

  // Compose the columns row
  const columnsRow = cards.map(card => {
    // Find stat and detail inside each card
    const stat = card.querySelector('.rad-absorb-stats__card-stat');
    const detail = card.querySelector('.rad-absorb-stats__card-detail');
    // Defensive: if either is missing, skip
    const cellContent = [];
    if (stat) cellContent.push(stat);
    if (detail) cellContent.push(detail);
    // If nothing found, fallback to card itself
    return cellContent.length ? cellContent : card;
  });

  cells.push(headerRow);
  cells.push(columnsRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
