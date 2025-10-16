/* global WebImporter */
export default function parse(element, { document }) {
  // --- HERO (hero19) PARSER ---
  // 1. Extract background image (reference existing <img> element)
  const imageEl = element.querySelector('img.cmp-image__image');

  // 2. Extract main heading (prefer h1/h2/h3 inside .cmp-title)
  let headingEl = element.querySelector('.cmp-title h1, .cmp-title h2, .cmp-title h3');

  // 3. Extract supporting paragraph (from .cmp-text)
  let paragraphEl = element.querySelector('.cmp-text p');

  // 4. Extract CTA (anchor) if present (not in this example, but robust)
  let ctaEl = element.querySelector('.cmp-title a, .cmp-text a');

  // 5. Compose text cell content, preserving heading hierarchy and paragraph
  const textCellContent = document.createElement('div');
  if (headingEl) {
    // Use the actual heading element (preserve level)
    textCellContent.appendChild(headingEl.cloneNode(true));
  }
  if (paragraphEl) {
    textCellContent.appendChild(paragraphEl.cloneNode(true));
  }
  if (ctaEl) {
    textCellContent.appendChild(ctaEl.cloneNode(true));
  }

  // 6. Build table rows as per block spec
  const headerRow = ['Hero (hero19)'];
  const imageRow = [imageEl ? imageEl : '']; // Reference, do not clone
  const textRow = [textCellContent.childNodes.length ? textCellContent : ''];

  // 7. Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow
  ], document);

  // 8. Replace the element with the new block table
  element.replaceWith(table);
}
