/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all direct accordion items
  const items = Array.from(element.querySelectorAll(':scope .cmp-accordion__item'));

  // Table header as per block requirements
  const headerRow = ['Accordion (accordion60)'];
  const rows = [headerRow];

  items.forEach(item => {
    // Title cell: find the button title span
    let titleEl = item.querySelector('.cmp-accordion__title');
    // Defensive: fallback to button text if span missing
    if (!titleEl) {
      const btn = item.querySelector('button');
      if (btn) {
        titleEl = document.createElement('span');
        titleEl.textContent = btn.textContent.trim();
      }
    }

    // Content cell: find the panel
    let panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    // Defensive: fallback to empty div if missing
    if (!panel) {
      panel = document.createElement('div');
    }

    // Add row: [title, content]
    rows.push([titleEl, panel]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
