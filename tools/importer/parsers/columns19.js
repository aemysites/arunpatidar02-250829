/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the immediate swiper-slide children (columns)
  function getSlides(el) {
    // Find the swiper-wrapper
    const wrapper = el.querySelector('.swiper-wrapper');
    if (!wrapper) return [];
    return Array.from(wrapper.children).filter(child => child.classList.contains('swiper-slide'));
  }

  // Find the swiper-container inside the block
  const swiper = element.querySelector('.swiper-container');
  if (!swiper) return;

  const slides = getSlides(swiper);
  if (!slides.length) return;

  // Each slide is a column cell
  const columns = slides.map(slide => {
    // Defensive: find the main teaser content
    const teaser = slide.querySelector('.cmp-teaser');
    if (!teaser) return document.createTextNode('');
    return teaser;
  });

  // Build the table rows
  const headerRow = ['Columns (columns19)'];
  const columnsRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
