/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main results container
  const results = element.querySelector('.cmp-resource-feed__results');
  if (!results) return;

  // Table header row
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  // Each card is a .cmp-resource-feed__result-item
  const items = results.querySelectorAll(':scope > .cmp-resource-feed__result-item');

  items.forEach((item) => {
    // --- Image cell ---
    let imageCell = '';
    const img = item.querySelector('.cmp-teaser__image img');
    if (img) imageCell = img;

    // --- Text cell ---
    const textCellContent = [];
    // Date/category (pretitle)
    const pretitle = item.querySelector('.cmp-teaser__pretitle');
    if (pretitle) textCellContent.push(pretitle);
    // Title
    const h3 = item.querySelector('.cmp-title__text');
    if (h3) textCellContent.push(h3);
    // Description
    const desc = item.querySelector('.cmp-teaser__description p');
    if (desc) textCellContent.push(desc);
    // CTA link
    const cta = item.querySelector('.cmp-teaser__action-container a.cmp-link');
    if (cta) textCellContent.push(cta);
    // Defensive: if no text, fallback to empty string
    if (textCellContent.length === 0) textCellContent.push('');

    rows.push([imageCell, textCellContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
