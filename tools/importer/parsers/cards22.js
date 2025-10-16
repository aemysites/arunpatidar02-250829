/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main heading (first h2 in the block)
  let heading = element.querySelector('h2');
  if (!heading) {
    heading = element.querySelector('h1, h2, h3');
  }

  // Find the multicontent gallery block
  const gallery = element.querySelector('.multicontentgallery .cmp-multi-content');
  if (!gallery) return;

  // Get all image slides and content slides
  const mediaSwiper = gallery.querySelector('.cmp-multi-content__slider--media');
  const contentSwiper = gallery.querySelector('.cmp-multi-content__slider--content');
  if (!mediaSwiper || !contentSwiper) return;

  const mediaSlides = Array.from(mediaSwiper.querySelectorAll('swiper-slide'));
  const contentSlides = Array.from(contentSwiper.querySelectorAll('swiper-slide'));

  // Defensive: Ensure same number of slides
  const numCards = Math.min(mediaSlides.length, contentSlides.length);

  // Table header
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // For each card, build a row: [image, text content]
  for (let i = 0; i < numCards; i++) {
    // --- IMAGE CELL ---
    const mediaSlide = mediaSlides[i];
    const img = mediaSlide.querySelector('img');
    let imageCell = img ? img : '';

    // --- TEXT CELL ---
    const contentSlide = contentSlides[i];
    let cardTitle = contentSlide.querySelector('.cmp-title__text');
    if (!cardTitle) {
      const btnSpan = contentSlide.querySelector('.cmp-multi-content-item__expand-title');
      if (btnSpan) {
        cardTitle = document.createElement('p');
        cardTitle.textContent = btnSpan.textContent;
      }
    }
    let cardDesc = contentSlide.querySelector('.cmp-text__paragraph');
    if (!cardDesc) {
      cardDesc = contentSlide.querySelector('.cmp-multi-content-item__text p');
    }
    const textCellContents = [];
    if (cardTitle) {
      const titleEl = document.createElement('strong');
      titleEl.append(cardTitle.textContent);
      textCellContents.push(titleEl);
    }
    if (cardDesc) {
      textCellContents.push(document.createElement('br'));
      textCellContents.push(cardDesc);
    }
    const ctaBtn = contentSlide.querySelector('.cmp-multi-content-item__content-toggle');
    if (ctaBtn) {
      textCellContents.push(document.createElement('br'));
      const ctaText = ctaBtn.getAttribute('data-text-more') || ctaBtn.textContent;
      if (ctaText) {
        const ctaEl = document.createElement('span');
        ctaEl.textContent = ctaText + ' ▼'; // Add chevron to represent the icon
        textCellContents.push(ctaEl);
      }
    }
    if (textCellContents.length === 0) {
      textCellContents.push(contentSlide.textContent.trim());
    }
    rows.push([imageCell, textCellContents]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Insert heading above the table if present
  if (heading) {
    element.parentNode.insertBefore(heading, element);
  }

  // Replace the original element with the block table
  element.replaceWith(table);
}
