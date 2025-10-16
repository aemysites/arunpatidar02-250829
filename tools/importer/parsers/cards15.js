/* global WebImporter */
export default function parse(element, { document }) {
  // Find all carousel slides (each is a card)
  const carousel = element.querySelector('.cmp-carousel__content');
  const slides = carousel ? carousel.querySelectorAll('.swiper-slide') : [];

  // Build table rows
  const rows = [];
  const headerRow = ['Cards (cards15)']; // CRITICAL: block name and variant
  rows.push(headerRow);

  slides.forEach((slide) => {
    // Visual: Prefer .cmp-image__image, fallback to .cmp-video__poster
    let visual = slide.querySelector('img.cmp-image__image');
    if (!visual) {
      visual = slide.querySelector('img.cmp-video__poster');
    }
    // Defensive fallback: any img
    if (!visual) {
      visual = slide.querySelector('img');
    }
    // Always reference the actual element from the DOM

    // Text content: Title and Description
    const textFragments = [];
    const title = slide.querySelector('.cmp-title__text');
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title.textContent.trim();
      textFragments.push(h);
    }
    const desc = slide.querySelector('.cmp-text__paragraph');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textFragments.push(p);
    }
    // Edge case: If both are missing, skip the card
    if (!visual && textFragments.length === 0) return;
    rows.push([visual, textFragments]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
