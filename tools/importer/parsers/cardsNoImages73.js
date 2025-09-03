/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cardsNoImages73)'];
  const rows = [headerRow];

  // Defensive: find the grid containing the cards
  // The cards are direct children of aem-Grid inside cmp-container-grid
  let grid = element.querySelector('.cmp-container-grid .aem-Grid');
  if (!grid) {
    // fallback: maybe the element itself is the grid
    grid = element;
  }

  // Select all direct card columns
  const cardColumns = grid.querySelectorAll(':scope > .cmp-teaser-snippet');

  cardColumns.forEach((cardCol) => {
    // Each cardCol contains a card
    // Defensive: find the inner card wrapper (first child)
    const card = cardCol.firstElementChild || cardCol;
    const cardContent = [];

    // Heading (optional)
    const titleDiv = card.querySelector('.cmp-title');
    if (titleDiv) {
      // Use the heading element (h4)
      const heading = titleDiv.querySelector('h4');
      if (heading) cardContent.push(heading);
    }

    // Description (optional)
    const textDiv = card.querySelector('.cmp-text');
    if (textDiv) {
      // Use the paragraph element(s)
      const paraDiv = textDiv.querySelector('.cmp-text__paragraph');
      if (paraDiv) {
        // If there are multiple paragraphs, include all
        const paragraphs = paraDiv.querySelectorAll('p');
        paragraphs.forEach((p) => cardContent.push(p));
      }
    }

    // CTA link (optional)
    const link = card.querySelector('.cmp-link');
    if (link) {
      cardContent.push(link);
    }

    // Add the card row (single cell)
    rows.push([cardContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
