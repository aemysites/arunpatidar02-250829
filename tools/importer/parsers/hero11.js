/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main hero image container
  const heroImageRoot = element.querySelector('.rad-hero-image');
  if (!heroImageRoot) return;

  // --- Row 2: Background Image ---
  // Find image container and image element
  let imageEl = null;
  const photoDiv = heroImageRoot.querySelector('.rad-hero-image__photo');
  if (photoDiv) {
    const cmpImageDiv = photoDiv.querySelector('[data-cmp-is="image"]');
    if (cmpImageDiv) {
      imageEl = cmpImageDiv.querySelector('img');
    }
  }

  // --- Row 3: Headline, Subheading, CTA ---
  // Find content container
  const contentDiv = heroImageRoot.querySelector('.rad-hero-image__content');
  let headlineEl = null;
  let subheadingEl = null;
  let ctaEl = null;
  if (contentDiv) {
    headlineEl = contentDiv.querySelector('.rad-hero-image__headline'); // h1
    subheadingEl = contentDiv.querySelector('.rad-hero-image__body'); // h2
    // No CTA in this example, but if present, look for a link or button
    ctaEl = contentDiv.querySelector('a, button');
  }

  // Compose row 3 content
  const row3Content = [];
  if (headlineEl) row3Content.push(headlineEl);
  if (subheadingEl) row3Content.push(subheadingEl);
  if (ctaEl) row3Content.push(ctaEl);

  // Table rows
  const headerRow = ['Hero (hero11)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [row3Content.length ? row3Content : ''];

  // Create table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
