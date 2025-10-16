/* global WebImporter */
export default function parse(element, { document }) {
  // --- HERO (hero11) BLOCK PARSER ---
  // Helper: Find the main background image (img)
  let imageEl = null;
  const imgCandidates = element.querySelectorAll('img.cmp-image__image');
  if (imgCandidates.length > 0) {
    imageEl = imgCandidates[0]; // Reference the actual image element
  }

  // Helper: Find the main heading (h1/h2/h3)
  let headingEl = null;
  const headingCandidates = element.querySelectorAll('h1, h2, h3');
  if (headingCandidates.length > 0) {
    headingEl = headingCandidates[0]; // Use the first heading
  }

  // Helper: Find the subheading/paragraph (first p after heading)
  let paragraphEl = null;
  if (headingEl) {
    // Try to find a paragraph in the same parent or nearby
    let parent = headingEl.parentElement;
    paragraphEl = parent.querySelector('p');
    // Defensive: If not found, search the block
    if (!paragraphEl) {
      const pCandidates = element.querySelectorAll('p');
      if (pCandidates.length > 0) {
        paragraphEl = pCandidates[0];
      }
    }
  } else {
    // If no heading, just grab first paragraph
    const pCandidates = element.querySelectorAll('p');
    if (pCandidates.length > 0) {
      paragraphEl = pCandidates[0];
    }
  }

  // Helper: Find CTA link (anchor)
  let ctaEl = null;
  const linkCandidates = element.querySelectorAll('a[href]');
  if (linkCandidates.length > 0) {
    ctaEl = linkCandidates[0]; // Use first link as CTA if present
  }

  // Compose the table rows
  const headerRow = ['Hero (hero11)']; // CRITICAL: Use block name as header
  const imageRow = [imageEl ? imageEl : '']; // Reference image element if present

  // Compose text content row
  const textContent = [];
  if (headingEl) textContent.push(headingEl);
  if (paragraphEl) textContent.push(paragraphEl);
  if (ctaEl) textContent.push(ctaEl);
  const textRow = [textContent.length > 0 ? textContent : ''];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  // No Section Metadata block required (per example)
  // No markdown formatting, only HTML elements
  // All content referenced from source, not cloned
  // No new image elements created
  // All text content included
  // Semantic meaning preserved

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
