/* global WebImporter */
export default function parse(element, { document }) {
  // Only process if this is the expected accordion block
  if (!element || !element.classList.contains('accordion')) return;

  const rows = [];
  const headerRow = ['Accordion (accordion26)'];
  rows.push(headerRow);

  // Get all accordion items
  const items = Array.from(element.querySelectorAll(':scope > .cmp-container > .cmp-accordion > .cmp-accordion__item, :scope > .cmp-accordion__item'));
  if (items.length === 0) {
    // fallback: try direct children
    const fallbackItems = Array.from(element.querySelectorAll(':scope > .cmp-accordion__item'));
    fallbackItems.forEach(item => items.push(item));
  }

  items.forEach(item => {
    // Title cell
    let title = '';
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }

    // Content cell
    let contentCell = null;
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Find the main content block inside the panel
      // For most years, it's a single container, for 2023 it's a responsivegrid with multiple awards
      // We'll grab all direct children of the panel and wrap them in a fragment
      const children = Array.from(panel.children);
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        const frag = document.createDocumentFragment();
        children.forEach(child => frag.appendChild(child));
        contentCell = frag;
      } else {
        contentCell = panel;
      }
    }
    // Only add row if title and contentCell are present
    if (title && contentCell) {
      rows.push([title, contentCell]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
