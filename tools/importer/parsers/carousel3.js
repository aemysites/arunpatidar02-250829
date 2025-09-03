/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the carousel root
  const container = element.querySelector('.cmp-slider-promotion__swiper, .swiper-container');
  if (!container) return;

  // Find all unique slides (ignore duplicates)
  const wrapper = container.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  // Only keep slides that are not duplicates
  const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'))
    .filter(slide => !slide.classList.contains('swiper-slide-duplicate'));

  // Build table rows
  const rows = [];
  // Header row as per spec
  const headerRow = ['Carousel (carousel3)'];
  rows.push(headerRow);

  slides.forEach(slide => {
    // Each slide: image in first cell, text in second cell
    const content = slide.querySelector('.cmp-slider-promotion__content');
    if (!content) return;

    // Image cell: find the image inside .cmp-slider-promotion__content-image
    let imageCell = '';
    const imageContainer = content.querySelector('.cmp-slider-promotion__content-image');
    if (imageContainer) {
      // Use the .cmp-image element directly if possible
      const cmpImage = imageContainer.querySelector('.cmp-image');
      if (cmpImage) {
        imageCell = cmpImage;
      } else {
        // fallback: any img
        const img = imageContainer.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text cell: collect all text content from .cmp-title__text and any other text blocks
    let textCell = document.createElement('div');
    // Title
    const title = content.querySelector('.cmp-title__text');
    if (title) {
      // Use the full block, not just text
      textCell.appendChild(title.cloneNode(true));
    }
    // Any additional description or CTA (if present)
    // If there are other elements in content besides .cmp-title__text and image, add them
    Array.from(content.children).forEach(child => {
      if (
        !child.classList.contains('cmp-slider-promotion__content-image') &&
        !child.classList.contains('cmp-title')
      ) {
        textCell.appendChild(child.cloneNode(true));
      }
    });
    // If nothing was appended, set to empty string
    if (!textCell.hasChildNodes()) textCell = '';

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
