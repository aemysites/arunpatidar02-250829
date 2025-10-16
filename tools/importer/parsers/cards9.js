/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel content area
  const carouselContent = element.querySelector('.cmp-carousel__content');
  if (!carouselContent) return;

  // Find all slides (cards)
  const cardEls = carouselContent.querySelectorAll('[data-cmp-hook-carousel="item"]');
  if (!cardEls.length) return;

  // Build table rows
  const rows = [];
  // Header row as required
  rows.push(['Cards (cards9)']);

  cardEls.forEach(cardEl => {
    // Image: find the first .cmp-image__image inside the card
    const img = cardEl.querySelector('.cmp-image__image');
    // Title: first h3 inside the card
    const title = cardEl.querySelector('h3');
    // Description: first p inside the card
    const desc = cardEl.querySelector('p');

    // Compose text cell: title (if exists), then description (if exists)
    const textCell = document.createElement('div');
    if (title) textCell.appendChild(title.cloneNode(true));
    if (desc) textCell.appendChild(desc.cloneNode(true));

    // Reference the actual image element from the DOM, do not clone
    rows.push([img, textCell]);
  });

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
