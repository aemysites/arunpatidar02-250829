/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a tile element
  function extractCard(tile) {
    // Get the logo (icon) image
    const logo = tile.querySelector('.cmp-tiles__tile-logo');
    // Get the background image
    const bgImg = tile.querySelector('.cmp-tiles__tile-background');
    // Get the info wrapper
    const info = tile.querySelector('.cmp-tiles__tile-information');
    if (!info) return null;

    // Get description
    const desc = info.querySelector('.cmp-tiles__tile-description');
    // Get CTA link
    const cta = info.querySelector('a.cmp-link');
    // Get logo alt or fallback to link text for heading
    let headingText = '';
    if (logo && logo.getAttribute('alt')) {
      headingText = logo.getAttribute('alt');
    } else if (cta) {
      headingText = cta.textContent.trim();
    }
    // Compose heading element if headingText exists
    let headingEl = null;
    if (headingText) {
      headingEl = document.createElement('strong');
      headingEl.textContent = headingText;
    }

    // Compose text cell: heading, description, CTA
    const textCell = document.createElement('div');
    if (headingEl) textCell.appendChild(headingEl);
    if (desc) {
      if (headingEl) textCell.appendChild(document.createElement('br'));
      textCell.appendChild(desc);
    }
    if (cta) {
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(cta);
    }

    // Compose image/icon cell: logo (icon) or background image
    let imageCell = null;
    if (logo) {
      imageCell = logo;
    } else if (bgImg) {
      imageCell = bgImg;
    }
    // Defensive: fallback if neither logo nor bgImg
    if (!imageCell && bgImg) imageCell = bgImg;
    if (!imageCell && logo) imageCell = logo;

    return [imageCell, textCell];
  }

  // Get all immediate tile children
  const tiles = element.querySelectorAll(':scope > .cmp-tiles__tile');
  const rows = [];
  // Header row
  rows.push(['Cards (cards63)']);
  // Each card row
  tiles.forEach(tile => {
    const card = extractCard(tile);
    if (card) rows.push(card);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
