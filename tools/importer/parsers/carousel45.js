/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel slides container
  const swiperContainer = element.querySelector('.swiper-container');
  if (!swiperContainer) return;

  // Find all direct slide elements (ignore duplicates)
  const slides = Array.from(swiperContainer.querySelectorAll('.swiper-slide'))
    .filter(slide => !slide.classList.contains('swiper-slide-duplicate'));

  // Table header row
  const headerRow = ['Carousel (carousel45)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Get image element
    const cmpImage = slide.querySelector('.cmp-image img');
    if (!cmpImage) return;
    const img = cmpImage.cloneNode(true);

    // Get text content (if any) from .cmp-slider__content
    let textCell = '';
    const content = slide.querySelector('.cmp-slider__content');
    if (content && content.textContent.trim()) {
      // If there is any non-empty text or elements, clone them
      const fragment = document.createDocumentFragment();
      Array.from(content.childNodes).forEach(node => {
        if (
          (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) ||
          (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        ) {
          fragment.appendChild(node.cloneNode(true));
        }
      });
      if (fragment.childNodes.length > 0) {
        textCell = fragment;
      }
    }
    // Always push two columns: image and text (empty if none)
    rows.push([img, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
