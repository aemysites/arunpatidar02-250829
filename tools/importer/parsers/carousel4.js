/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the actual image element from a slide (handles lazyload)
  function getImage(slide) {
    // Find the image element
    const img = slide.querySelector('img');
    if (!img) return null;
    // If the image uses data-flickity-lazyload, set src accordingly
    if (img.hasAttribute('data-flickity-lazyload')) {
      const src = img.getAttribute('data-flickity-lazyload');
      if (src) img.setAttribute('src', src);
      img.removeAttribute('data-flickity-lazyload');
    }
    return img;
  }

  // Helper to get the text content (title, description, CTA) from a slide
  function getTextContent(slide) {
    const textDiv = slide.querySelector('.rad-carousel-image-and-text__slide-text');
    if (!textDiv) return null;
    const elements = [];
    // Title (h4)
    const title = textDiv.querySelector('.rad-carousel-image-and-text__slide-title');
    if (title) {
      // Convert h4 to h2 for semantic heading
      const h2 = document.createElement('h2');
      h2.innerHTML = title.innerHTML;
      elements.push(h2);
    }
    // Description (p)
    const desc = textDiv.querySelector('.rad-carousel-image-and-text__slide-body');
    if (desc) {
      elements.push(desc);
    }
    // CTA (link) if present (not in this example, but future-proof)
    const cta = textDiv.querySelector('a');
    if (cta) {
      elements.push(document.createElement('br'));
      elements.push(cta);
    }
    return elements.length ? elements : null;
  }

  // Find all slides
  const slides = Array.from(element.querySelectorAll('.rad-carousel-image-and-text__slide'));

  // Build the table rows
  const headerRow = ['Carousel (carousel4)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Image cell (first column)
    const img = getImage(slide);
    // Defensive: skip slide if no image
    if (!img) return;
    // Text cell (second column)
    const textContent = getTextContent(slide);
    rows.push([
      img,
      textContent || '',
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
