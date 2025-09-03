/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main image (background)
  let imageEl = element.querySelector('.cmp-teaser__image img');
  if (!imageEl) {
    // fallback: find any img
    imageEl = element.querySelector('img');
  }

  // Defensive: Find the main headline (styled as heading)
  let headlineEl = element.querySelector('.cmp-title h3, .cmp-title--h3 h3, h3');
  if (!headlineEl) {
    // fallback: find first h3
    headlineEl = element.querySelector('h3');
  }

  // Defensive: Find subheading/description
  let subheadingEl = element.querySelector('.cmp-teaser__description p');
  if (!subheadingEl) {
    // fallback: find first p after headline
    const allPs = element.querySelectorAll('p');
    if (allPs.length > 1) {
      subheadingEl = allPs[1];
    }
  }

  // Defensive: Find CTA button
  let ctaEl = element.querySelector('.cmp-teaser__action-container a, a.cmp-button');

  // Compose content cell for row 3
  const contentCell = [];
  if (headlineEl) {
    // If headline is a <h3> with a <p> inside, unwrap the <p>
    if (headlineEl.querySelector('p')) {
      const p = headlineEl.querySelector('p');
      const h3 = document.createElement('h3');
      h3.innerHTML = p.innerHTML;
      contentCell.push(h3);
    } else {
      contentCell.push(headlineEl);
    }
  }
  if (subheadingEl) {
    // Use as subheading, styled as <p>
    contentCell.push(subheadingEl);
  }
  if (ctaEl) {
    contentCell.push(ctaEl);
  }

  // Table rows
  const headerRow = ['Hero (hero30)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentCell];

  const cells = [headerRow, imageRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
