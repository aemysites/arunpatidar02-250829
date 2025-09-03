/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the content for each card
  function extractCardContent(card) {
    // Find the title (h4)
    const titleDiv = card.querySelector('.cmp-title');
    let title = null;
    if (titleDiv) {
      title = titleDiv.querySelector('h4');
    }
    // Find the description (paragraph)
    const descDiv = card.querySelector('.cmp-text__paragraph');
    let desc = null;
    if (descDiv) {
      desc = descDiv.querySelector('p');
    }
    // Find the CTA link (a)
    const cta = card.querySelector('a.cmp-link');
    // Compose the cell content
    const cellContent = [];
    if (title) cellContent.push(title);
    if (desc) cellContent.push(desc);
    if (cta) cellContent.push(cta);
    return cellContent;
  }

  // Find all card columns
  const grid = element.querySelector('.cmp-container-grid .aem-Grid');
  if (!grid) return;
  const cardColumns = Array.from(grid.children).filter(child => child.classList.contains('cmp-teaser-snippet'));

  // Build the table rows
  const headerRow = ['Cards (cardsNoImages46)'];
  const rows = [headerRow];
  cardColumns.forEach(cardCol => {
    // The card content is inside the first child div
    const cardContentDiv = cardCol.querySelector('div');
    if (cardContentDiv) {
      const cellContent = extractCardContent(cardContentDiv);
      rows.push([cellContent]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
