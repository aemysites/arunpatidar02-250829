/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only run if element exists
  if (!element) return;

  // Table header row as specified
  const headerRow = ['Carousel (carousel44)'];
  const rows = [headerRow];

  // Get all slide image elements (in order)
  // The images are inside .swiper-container .swiper-slide
  const swiperContainer = element.querySelector('.swiper-container');
  const slideEls = swiperContainer ? swiperContainer.querySelectorAll('.swiper-slide') : [];

  // Get all info items (text content, in order)
  // The info items are inside .cmp-slider-product__slider-product-info > .cmp-slider-product__info-item
  const infoContainer = element.querySelector('.cmp-slider-product__slider-product-info');
  const infoItems = infoContainer ? infoContainer.querySelectorAll('.cmp-slider-product__info-item') : [];

  // Defensive: slides and infoItems should match in count
  const slideCount = Math.min(slideEls.length, infoItems.length);

  for (let i = 0; i < slideCount; i++) {
    // Get image element from slide
    let imgEl = null;
    const slideImgWrap = slideEls[i].querySelector('.cmp-slider-product__slide-image');
    if (slideImgWrap) {
      // Find the actual <img> inside
      imgEl = slideImgWrap.querySelector('img');
      // If the image is wrapped in a div.cmp-image, use the whole wrapper for better semantics
      const cmpImageDiv = slideImgWrap.querySelector('.cmp-image');
      if (cmpImageDiv) imgEl = cmpImageDiv;
    }

    // Get text content from info item
    let textContent = [];
    const infoItem = infoItems[i];
    if (infoItem) {
      // Title
      const titleDiv = infoItem.querySelector('.cmp-title');
      if (titleDiv) {
        // Use the <h4> directly for heading semantics
        const h4 = titleDiv.querySelector('h4');
        if (h4) textContent.push(h4);
      }
      // Description (ul list)
      const textDiv = infoItem.querySelector('.cmp-text');
      if (textDiv) {
        // Use the paragraph div or ul directly
        const paraDiv = textDiv.querySelector('.cmp-text__paragraph');
        if (paraDiv) {
          // If paraDiv contains a <ul>, use the <ul>
          const ul = paraDiv.querySelector('ul');
          if (ul) textContent.push(ul);
        }
      }
    }

    // Add row: [image, textContent]
    rows.push([
      imgEl,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
