/* global WebImporter */
export default function parse(element, { document }) {
  // Find the swiper container with slides
  const swiper = element.querySelector('.swiper-container');
  if (!swiper) return;

  // Get all swiper-slide elements (each is a card)
  const slides = swiper.querySelectorAll('.swiper-slide');
  if (!slides.length) return;

  // Table header: must match block name exactly
  const headerRow = ['Cards (cards41)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Find the teaser block inside the slide
    const teaser = slide.querySelector('.cmp-teaser');
    if (!teaser) return;

    // --- Image cell ---
    // Find the image container
    const imageContainer = teaser.querySelector('.cmp-image');
    let imageCell = null;
    if (imageContainer) {
      // Use the <img> element directly, wrapped in its link if present
      const img = imageContainer.querySelector('img');
      const link = imageContainer.querySelector('a');
      if (img && link) {
        imageCell = link;
      } else if (img) {
        imageCell = img;
      }
    }

    // --- Text cell ---
    const content = teaser.querySelector('.cmp-teaser__content');
    const textCellContent = [];
    if (content) {
      // Title (prefer desktop version)
      let titleEl = content.querySelector('.cmp-teaser__container .cmp-title .cmp-title__text');
      if (!titleEl) {
        // Fallback: mobile title
        titleEl = content.querySelector('.cmp-teaser__container--mobile .cmp-title .cmp-title__text');
      }
      if (titleEl) {
        textCellContent.push(titleEl);
      }
      // Description: try to find additional text below the title
      // Look for any text nodes or elements after the title in the container
      const desktopContainer = content.querySelector('.cmp-teaser__container');
      if (desktopContainer && titleEl) {
        let foundTitle = false;
        Array.from(desktopContainer.childNodes).forEach((node) => {
          if (node.contains && node.contains(titleEl)) {
            foundTitle = true;
          } else if (foundTitle && node.nodeType === Node.ELEMENT_NODE) {
            // If it's a link, skip (already handled as CTA)
            if (!node.classList.contains('cmp-teaser__link') && !node.classList.contains('cmp-teaser__action-container')) {
              textCellContent.push(node);
            }
          } else if (foundTitle && node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textCellContent.push(document.createTextNode(node.textContent.trim()));
          }
        });
      }
      // CTA: Desktop link (prefer)
      let ctaEl = content.querySelector('.cmp-teaser__action-container .cmp-link');
      if (!ctaEl) {
        // Fallback: mobile CTA
        ctaEl = content.querySelector('.cmp-teaser__container--mobile .cmp-link');
      }
      if (ctaEl) {
        textCellContent.push(ctaEl);
      }
    }

    // Only add row if image and text are present
    if (imageCell && textCellContent.length) {
      rows.push([imageCell, textCellContent]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
