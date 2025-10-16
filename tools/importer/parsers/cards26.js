/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, header, each row = [image, text content]
  const headerRow = ['Cards (cards26)'];
  const cells = [headerRow];

  // Find the carousel content area (where cards are)
  const carouselContent = element.querySelector('.cmp-carousel__content');
  if (!carouselContent) return;

  // Each card is a .swiper-slide
  const slides = carouselContent.querySelectorAll('.swiper-slide');

  slides.forEach((slide) => {
    // Find the image (first image in card)
    const img = slide.querySelector('img');
    // Defensive: If there's a picture element, use it for full markup
    let imageCell = null;
    const picture = slide.querySelector('picture');
    if (picture) {
      imageCell = picture;
    } else if (img) {
      imageCell = img;
    } else {
      imageCell = document.createTextNode('');
    }

    // Find the title (first h3 in card)
    const title = slide.querySelector('h3');
    // Find description (first paragraph in card)
    const desc = slide.querySelector('p');
    // Find CTA (first link in card)
    const cta = slide.querySelector('a');

    // Compose text cell
    const textCell = document.createElement('div');
    if (title) textCell.appendChild(title);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);

    cells.push([imageCell, textCell]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
