/* global WebImporter */
export default function parse(element, { document }) {
  // Find all carousel slides (cards)
  const slides = element.querySelectorAll('.cmp-carousel__content > .swiper-slide');
  const rows = [];

  // Table header row as required
  const headerRow = ['Cards (cards25)'];
  rows.push(headerRow);

  slides.forEach((slide) => {
    // --- IMAGE ---
    // Find the first image in the card
    let imageEl = null;
    const imageWrapper = slide.querySelector('.cmp-image__wrapper');
    if (imageWrapper) {
      imageEl = imageWrapper.querySelector('img');
    }

    // --- TEXT CONTENT ---
    // Find title, description, and CTAs
    // Defensive: find the deepest content container
    let titleEl = null;
    let descEl = null;
    let buttonEls = [];
    // Find all content containers that might hold title/desc/buttons
    const contentContainers = slide.querySelectorAll('.aem-GridColumn.aem-GridColumn--default--12');
    contentContainers.forEach((container) => {
      // Title (h3)
      if (!titleEl) {
        titleEl = container.querySelector('.cmp-title__text');
      }
      // Description (p)
      if (!descEl) {
        descEl = container.querySelector('.cmp-text__paragraph');
      }
      // Buttons (CTAs)
      const btns = container.querySelectorAll('.cmp-button');
      if (btns.length) {
        btns.forEach(btn => buttonEls.push(btn));
      }
    });

    // Compose the text cell
    const textCellContent = [];
    if (titleEl) textCellContent.push(titleEl);
    if (descEl) textCellContent.push(descEl);
    if (buttonEls.length) textCellContent.push(...buttonEls);

    // Add row: [image, text content]
    rows.push([
      imageEl || '',
      textCellContent
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
