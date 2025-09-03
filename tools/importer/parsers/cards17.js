/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create the text cell for each card
  function createTextCell(tileInfo) {
    const fragments = [];
    // Title (logo image as heading)
    const logoImg = tileInfo.querySelector('.cmp-tiles__tile-logo');
    if (logoImg) {
      const heading = document.createElement('strong');
      heading.appendChild(logoImg);
      fragments.push(heading);
    }
    // Description
    const desc = tileInfo.querySelector('.cmp-tiles__tile-description');
    if (desc) {
      fragments.push(document.createElement('br'));
      fragments.push(desc);
    }
    // CTA link
    const cta = tileInfo.querySelector('a.cmp-link');
    if (cta) {
      fragments.push(document.createElement('br'));
      fragments.push(cta);
    }
    return fragments;
  }

  // Find all tiles in order
  const tiles = [];
  // Each .cmp-tiles__grid-container contains 2 tiles
  element.querySelectorAll('.cmp-tiles__grid-container').forEach((row) => {
    row.querySelectorAll('.cmp-tiles__tile').forEach((tile) => {
      tiles.push(tile);
    });
  });

  const rows = [
    ['Cards (cards17)'],
  ];

  tiles.forEach((tile) => {
    // Get tile content wrapper
    const contentWrapper = tile.querySelector('.cmp-tiles__tile-content-wrapper');
    if (!contentWrapper) return;
    // Get info (text) and background image
    const tileInfo = contentWrapper.querySelector('.cmp-tiles__tile-information');
    const bgImg = contentWrapper.querySelector('.cmp-tiles__tile-background');
    // Defensive: skip if missing required parts
    if (!tileInfo || !bgImg) return;
    // First cell: image
    const imageCell = bgImg;
    // Second cell: text content
    const textCell = createTextCell(tileInfo);
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
