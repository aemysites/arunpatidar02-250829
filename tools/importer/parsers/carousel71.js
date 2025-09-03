/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row as required
  const headerRow = ['Carousel (carousel71)'];
  const rows = [headerRow];

  // Find all info items (slide text content)
  const infoItems = Array.from(element.querySelectorAll('.cmp-slider-product__slider-product-info > .cmp-slider-product__info-item'));
  // Find all slide image containers (slide images)
  const slideImages = Array.from(element.querySelectorAll('.swiper-slide'));

  // Defensive: Only process as many slides as both arrays have
  const slideCount = Math.min(infoItems.length, slideImages.length);

  for (let i = 0; i < slideCount; i++) {
    const infoItem = infoItems[i];
    const slideImage = slideImages[i];

    // Find image element inside slideImage
    let imgEl = null;
    const imgContainer = slideImage.querySelector('.cmp-slider-product__slide-image');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }
    // Defensive: If no image found, skip this slide
    if (!imgEl) continue;

    // Compose text cell
    const textCellContent = [];
    // Title (h4)
    const titleEl = infoItem.querySelector('.cmp-title__text');
    if (titleEl) {
      // Wrap in heading if not already
      if (titleEl.tagName.toLowerCase() === 'h4') {
        textCellContent.push(titleEl);
      } else {
        const heading = document.createElement('h4');
        heading.textContent = titleEl.textContent;
        textCellContent.push(heading);
      }
    }
    // Description (p)
    const descEl = infoItem.querySelector('.cmp-text__paragraph p');
    if (descEl) {
      textCellContent.push(descEl);
    }
    // CTA link
    const linkEl = infoItem.querySelector('a.cmp-link');
    if (linkEl) {
      textCellContent.push(linkEl);
    }

    // Add row: [image, text cell]
    rows.push([
      imgEl,
      textCellContent.length > 0 ? textCellContent : ''
    ]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
