/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if this is a carousel block
  if (!element || !element.classList.contains('cmp-slider-product__swiper')) return;

  // Table header row
  const headerRow = ['Carousel (carousel2)'];
  const rows = [headerRow];

  // Find info items (text content)
  const infoItemsContainer = element.querySelector('.cmp-slider-product__slider-product-info');
  const infoItems = infoItemsContainer ? Array.from(infoItemsContainer.children) : [];

  // Find slide images (visuals)
  const swiperContainer = element.querySelector('.swiper-container');
  let slideImages = [];
  if (swiperContainer) {
    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
      // Only get direct children (slides)
      slideImages = Array.from(swiperWrapper.children);
    }
  }

  // Pair infoItems and slideImages by order
  const slideCount = Math.min(infoItems.length, slideImages.length);
  for (let i = 0; i < slideCount; i++) {
    // --- IMAGE CELL ---
    let imageCell = null;
    const slide = slideImages[i];
    if (slide) {
      // Find the image element inside the slide
      const imageWrapper = slide.querySelector('.cmp-slider-product__slide-image');
      if (imageWrapper) {
        const cmpImage = imageWrapper.querySelector('.cmp-image');
        if (cmpImage) {
          // Use the cmpImage element directly (contains the <img>)
          imageCell = cmpImage;
        }
      }
    }
    // Fallback: If no image found, leave cell empty
    if (!imageCell) imageCell = '';

    // --- TEXT CELL ---
    let textCell = [];
    const infoItem = infoItems[i];
    if (infoItem) {
      // Title (h4)
      const titleDiv = infoItem.querySelector('.cmp-title');
      if (titleDiv) {
        const h4 = titleDiv.querySelector('h4');
        if (h4) {
          // Use the h4 element directly
          textCell.push(h4);
        }
      }
      // Description (p)
      const paragraphDiv = infoItem.querySelector('.cmp-text__paragraph');
      if (paragraphDiv) {
        const p = paragraphDiv.querySelector('p');
        if (p) {
          textCell.push(p);
        }
      }
      // CTA link (a)
      const link = infoItem.querySelector('a.cmp-link');
      if (link) {
        textCell.push(link);
      }
    }
    // If no text, leave cell empty
    if (textCell.length === 0) textCell = '';

    // Add row: [image, text]
    rows.push([imageCell, textCell]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
