/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion6) block parsing
  // Header row as per guidelines
  const headerRow = ['Accordion (accordion6)'];
  const rows = [headerRow];

  // Find the accordion container
  // Defensive: find the first .cmp-accordion inside the element
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  // Find all accordion items
  const items = accordion.querySelectorAll('.cmp-accordion__item');

  items.forEach((item) => {
    // Title cell: find the button and its title span
    const button = item.querySelector('.cmp-accordion__button');
    let title = null;
    if (button) {
      // Defensive: find the title span inside button
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        title = titleSpan;
      } else {
        // fallback: use button text
        title = document.createElement('span');
        title.textContent = button.textContent.trim();
      }
    } else {
      // fallback: use first heading
      const heading = item.querySelector('h3, h2, h4, h5, h6');
      if (heading) {
        title = heading;
      }
    }

    // Content cell: find the panel
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let content = null;
    if (panel) {
      // Defensive: use the full panel content
      // Usually the text is inside .cmp-text, but we want all content
      // Remove hidden attributes/classes for import
      panel.removeAttribute('aria-hidden');
      panel.classList.remove('cmp-accordion__panel--hidden');
      content = panel;
    } else {
      // fallback: empty cell
      content = document.createElement('div');
    }

    rows.push([title, content]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
