/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards5) block parser
  // Find the carousel content area containing all cards
  const carouselContent = element.querySelector('.cmp-carousel__content');
  if (!carouselContent) return;

  // Get all card slides
  const cardSlides = Array.from(carouselContent.querySelectorAll('[data-cmp-hook-carousel="item"]'));
  if (!cardSlides.length) return;

  // Prepare table rows
  const rows = [];
  // Header row as per block requirements
  rows.push(['Cards (cards5)']);

  // For each card slide, extract image, title, description, and CTA
  cardSlides.forEach((slide) => {
    // Image: find the first <img> inside the slide
    const img = slide.querySelector('img');
    // Defensive: if no image, skip this card
    if (!img) return;

    // Text content container: find the first container after the image
    // The image is usually inside a .image class, followed by a container with title/text/button
    // We'll find all direct children of the slide
    const containers = Array.from(slide.querySelectorAll(':scope > .container, :scope > div.container'));
    // Find the container that holds the title/text/button (usually the second one)
    let textContainer;
    if (containers.length > 1) {
      // The second container holds the text content
      textContainer = containers[1];
    } else {
      // Fallback: find the first container with a title or text
      textContainer = slide;
    }

    // Title: find the first .cmp-title__text inside textContainer
    const titleEl = textContainer.querySelector('.cmp-title__text');
    // Description: find the first .cmp-text__paragraph inside textContainer
    const descEl = textContainer.querySelector('.cmp-text__paragraph');
    // CTA: find the first .cmp-button inside textContainer
    const ctaEl = textContainer.querySelector('.cmp-button');

    // Compose text cell
    const textCell = [];
    if (titleEl) textCell.push(titleEl);
    if (descEl) textCell.push(descEl);
    if (ctaEl) textCell.push(ctaEl);

    rows.push([img, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
