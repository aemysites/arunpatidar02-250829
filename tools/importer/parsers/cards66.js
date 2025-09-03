/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing all cards
  const grid = element.querySelector('.cmp-related-articles');
  if (!grid) return;

  // Find all card columns (each card is inside a GridColumn)
  const cardColumns = grid.querySelectorAll(':scope > .aem-GridColumn');
  if (!cardColumns.length) return;

  // Table header row
  const headerRow = ['Cards (cards66)'];
  const rows = [headerRow];

  // Parse each card
  cardColumns.forEach((col) => {
    const card = col.querySelector('.cmp-related-article');
    if (!card) return;

    // --- IMAGE CELL ---
    // The image is inside a .cmp-image div, which contains an <img>
    let imageEl = card.querySelector('.cmp-image img');
    // Defensive: fallback to the .cmp-image div if no img
    if (!imageEl) {
      imageEl = card.querySelector('.cmp-image');
    }

    // --- TEXT CELL ---
    const textCellContent = [];

    // Title (h4)
    const titleDiv = card.querySelector('.cmp-title');
    if (titleDiv) {
      // Use the whole title block for resilience
      textCellContent.push(titleDiv);
    }

    // Description (paragraph)
    const descDiv = card.querySelector('.cmp-text__paragraph');
    if (descDiv) {
      textCellContent.push(descDiv);
    }

    // Call-to-action link ("Erfahre mehr")
    // Find the .cmp-link inside the card
    const ctaLink = card.querySelector('.cmp-link');
    if (ctaLink) {
      textCellContent.push(ctaLink);
    }

    // Add the row: [image, text content]
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
