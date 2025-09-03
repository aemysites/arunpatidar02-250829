/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract content for a single card
  function extractCardContent(cardEl) {
    const content = [];
    // Heading (optional)
    const titleDiv = cardEl.querySelector('.cmp-title');
    if (titleDiv) {
      const h4 = titleDiv.querySelector('h4');
      if (h4) content.push(h4);
    }
    // Description (optional)
    const textDiv = cardEl.querySelector('.cmp-text');
    if (textDiv) {
      // Use all paragraphs inside cmp-text
      const paragraphs = textDiv.querySelectorAll('p');
      paragraphs.forEach(p => content.push(p));
    }
    // CTA link (optional)
    const link = cardEl.querySelector('a.cmp-link');
    if (link) content.push(link);
    return content;
  }

  // Find all card columns
  const grid = element.querySelector('.cmp-container-grid .aem-Grid');
  if (!grid) return;
  const cardColumns = grid.querySelectorAll(':scope > .cmp-teaser-snippet');
  if (!cardColumns.length) return;

  // Build rows: header + one per card
  const rows = [];
  const headerRow = ['Cards (cardsNoImages4)'];
  rows.push(headerRow);

  cardColumns.forEach(cardCol => {
    // The actual card content is inside the first child div
    const cardContentDiv = cardCol.querySelector(':scope > div');
    if (!cardContentDiv) return;
    const cardContent = extractCardContent(cardContentDiv);
    rows.push([cardContent]);
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
