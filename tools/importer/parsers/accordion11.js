/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the main accordion container
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');

  // Prepare table rows
  const rows = [];
  // Header row as specified
  rows.push(['Accordion (accordion11)']);

  items.forEach(item => {
    // Title cell: get the text from .cmp-accordion__title
    let title = '';
    const titleSpan = item.querySelector('.cmp-accordion__title');
    if (titleSpan) {
      title = titleSpan.textContent.trim();
    }

    // Content cell: get the panel content
    let contentCell = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Defensive: find the first container inside the panel
      // We'll include the entire container as content
      const container = panel.querySelector(':scope > .container, :scope > div');
      if (container) {
        contentCell = container;
      } else {
        // fallback: use the panel itself
        contentCell = panel;
      }
    }

    rows.push([title, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
