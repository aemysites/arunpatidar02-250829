/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a grid column
  function extractCard(gridCol) {
    // Defensive: find the teaser image block
    const teaserImage = gridCol.querySelector('.cmp-teaser-image');
    if (!teaserImage) return null;

    // Find image element
    let img = teaserImage.querySelector('img');
    // Defensive: fallback if not found
    if (!img) {
      const imgDiv = teaserImage.querySelector('.cmp-teaser__image');
      img = imgDiv ? imgDiv.querySelector('img') : null;
    }

    // Find content block
    const content = teaserImage.querySelector('.cmp-teaser__content');
    let textContent = [];
    if (content) {
      // Title
      const title = content.querySelector('.cmp-title__text');
      if (title) textContent.push(title);
      // Description (none in this example, but future-proof)
      // const desc = content.querySelector('p');
      // if (desc) textContent.push(desc);
      // CTA
      const cta = content.querySelector('.cmp-teaser__action-container a');
      if (cta) textContent.push(cta);
    }
    // Defensive: if nothing found, fallback to gridCol
    if (!img && textContent.length === 0) return null;
    return [img, textContent];
  }

  // Get all immediate grid columns (each is a card)
  const grid = element.querySelector('.cmp-container-grid, .cmp-container');
  let cardColumns = [];
  if (grid) {
    cardColumns = Array.from(grid.querySelectorAll('.aem-GridColumn'));
  } else {
    // Fallback: try direct children
    cardColumns = Array.from(element.querySelectorAll(':scope > .aem-GridColumn'));
  }

  // Build rows for each card
  const rows = [];
  cardColumns.forEach((col) => {
    const card = extractCard(col);
    if (card) rows.push(card);
  });

  // Table header
  const headerRow = ['Cards (cards58)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
