/* global WebImporter */
export default function parse(element, { document }) {
  // Find all the cards (columns)
  const cards = Array.from(element.querySelectorAll('.rad-text-block-with-icon__block'));

  // For each card, collect all its content as a single cell
  const columns = cards.map((card) => {
    const cellContent = [];

    // Pictogram (image)
    const pictogram = card.querySelector('.rad-text-block-with-icon__block-pictogram');
    if (pictogram) {
      // Reference the actual image element, not its URL
      const img = pictogram.querySelector('img');
      if (img) cellContent.push(img);
    }

    // Title
    const title = card.querySelector('.rad-text-block-with-icon__block-title');
    if (title) {
      // Reference the heading element
      const h3 = title.querySelector('h3');
      if (h3) cellContent.push(h3);
    }

    // Body
    const body = card.querySelector('.rad-text-block-with-icon__block-body');
    if (body) {
      // Reference the paragraph(s)
      Array.from(body.childNodes).forEach((node) => {
        if (node.nodeType === 1 || node.nodeType === 3) cellContent.push(node);
      });
    }

    // Button (CTA)
    const button = card.querySelector('a.rad-button');
    if (button) cellContent.push(button);

    // Defensive: If cell is empty, add an empty div
    if (cellContent.length === 0) {
      cellContent.push(document.createElement('div'));
    }

    return cellContent;
  });

  // Build the table
  const headerRow = ['Columns (columns8)'];
  const columnsRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
