/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card column
  function getImage(card) {
    return card.querySelector('.cmp-image__image');
  }

  // Helper to extract all text content (title, description, CTA) from a card column
  function getTextContent(card) {
    const fragment = document.createElement('div');
    const title = card.querySelector('.cmp-title__text');
    if (title) fragment.appendChild(title.cloneNode(true));
    const desc = card.querySelector('.cmp-text__paragraph');
    if (desc) fragment.appendChild(desc.cloneNode(true));
    const cta = card.querySelector('.cmp-button');
    if (cta) fragment.appendChild(cta.cloneNode(true));
    return fragment.childNodes.length ? fragment : '';
  }

  // Find all card containers: only direct children of the main grid
  const grid = element.querySelector('.aem-Grid');
  const cardContainers = grid ? Array.from(grid.children).filter(
    (child) => child.classList.contains('container') && child.classList.contains('responsivegrid')
  ) : [];

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);

  // For each card, extract image and all text content into a single row
  cardContainers.forEach((card) => {
    const img = getImage(card);
    const textContent = getTextContent(card);
    if (img || textContent) {
      rows.push([
        img || '',
        textContent || '',
      ]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
