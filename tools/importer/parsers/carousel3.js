/* global WebImporter */
export default function parse(element, { document }) {
  // Only process the carousel controls wrapper
  if (!element.classList.contains('rad-carousel-image-and-text__custom-controls-wrapper')) {
    return;
  }

  // Always create header row as required
  const headerRow = ['Carousel (carousel3)'];
  let cells = [headerRow];

  // Try to find the main carousel element (slides container)
  // Look for a sibling or parent with slides
  let carouselSlides = null;
  let parent = element.parentElement;
  while (parent && !carouselSlides) {
    carouselSlides = parent.querySelector('.rad-carousel-image-and-text__carousel');
    parent = parent.parentElement;
  }
  if (!carouselSlides) {
    carouselSlides = document.querySelector('.rad-carousel-image-and-text__carousel');
  }

  // If we found the slides container, extract each slide
  if (carouselSlides) {
    const slides = carouselSlides.querySelectorAll('.rad-carousel-image-and-text__slide');
    slides.forEach((slide) => {
      // Get the image (mandatory)
      const img = slide.querySelector('img');
      // Get the text content (optional)
      let text = '';
      const textBlock = slide.querySelector('.rad-carousel-image-and-text__text-wrapper');
      if (textBlock) {
        text = textBlock.innerText.trim();
      }
      if (img) {
        cells.push([img, text]);
      }
    });
  }

  // Only create the table if there is at least one slide row
  if (cells.length > 1) {
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
