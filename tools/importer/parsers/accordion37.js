/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element contains accordion items
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  // Table header row as required
  const headerRow = ['Accordion (accordion37)'];
  const rows = [headerRow];

  // Find all accordion items
  const items = accordion.querySelectorAll('.cmp-accordion__item');
  items.forEach((item) => {
    // Title cell: find the title span inside the button
    let titleCell = '';
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        // Use the span directly for semantic markup
        titleCell = titleSpan;
      } else {
        // Fallback: use button text
        titleCell = button.textContent.trim();
      }
    }

    // Content cell: find the panel and its content
    let contentCell = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Defensive: find the deepest content container
      // Usually a div.cmp-text__paragraph or similar
      // We'll include the entire panel content for resilience
      // Remove hidden class if present for import
      panel.classList.remove('cmp-accordion__panel--hidden');
      // Find the main content block inside panel
      const paragraphBlock = panel.querySelector('.cmp-text__paragraph');
      if (paragraphBlock) {
        contentCell = paragraphBlock;
      } else {
        // Fallback: use all children of panel
        contentCell = Array.from(panel.childNodes);
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
