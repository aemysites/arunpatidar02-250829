/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as specified
  const headerRow = ['Carousel (carousel14)'];
  const rows = [headerRow];

  // Defensive: get all immediate carousel cards (slides)
  // The structure is: element > .flickity-viewport > .flickity-slider > .rad-icon-text-carousel-tier-1__carousel-card
  const viewport = element.querySelector('.flickity-viewport');
  if (!viewport) return;
  const slider = viewport.querySelector('.flickity-slider');
  if (!slider) return;
  const cards = slider.querySelectorAll('.rad-icon-text-carousel-tier-1__carousel-card');

  cards.forEach((card) => {
    // Get the logo image (mandatory)
    const img = card.querySelector('img');
    // Get the description paragraph (optional)
    const desc = card.querySelector('p');

    // Defensive: Only add row if image exists
    if (img) {
      // First cell: image only
      // Second cell: text content (if any)
      let textCell = '';
      if (desc) {
        textCell = desc;
      }
      rows.push([img, textCell]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
