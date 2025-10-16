/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block: 2 columns, first col image/icon, second col text (title, desc, cta)
  const headerRow = ['Cards (cards4)'];
  const rows = [];

  // Find the carousel content area (contains the cards)
  const carouselContent = element.querySelector('.cmp-carousel__content');
  if (!carouselContent) return;

  // Each card is a .swiper-slide
  const slides = carouselContent.querySelectorAll('.swiper-slide');

  slides.forEach((slide) => {
    // --- IMAGE CELL ---
    // Find the first image in the card
    const img = slide.querySelector('img');
    let imageEl = null;
    if (img) {
      imageEl = img;
    }

    // --- TEXT CELL ---
    // Find the title (look for .cmp-title__text)
    const title = slide.querySelector('.cmp-title__text');
    // Find the description (look for .cmp-text__paragraph)
    const desc = slide.querySelector('.cmp-text__paragraph');
    // Compose the text cell content
    const textCell = [];
    if (title) {
      // Use a <strong> for the heading (matches visual style)
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCell.push(strong);
    }
    if (desc) {
      // Add a <p> for the description
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textCell.push(p);
    }

    rows.push([imageEl, textCell]);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
