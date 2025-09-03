/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordions in all tabs
  function getAllAccordions(root) {
    // Find all accordions in all tabs
    return Array.from(root.querySelectorAll('.cmp-accordion'));
  }

  // Helper to extract accordion items from a cmp-accordion
  function extractAccordionItems(accordion) {
    const items = Array.from(accordion.querySelectorAll(':scope > .cmp-accordion__item'));
    return items.map(item => {
      // Title: find the .cmp-accordion__title span inside the button
      const button = item.querySelector('.cmp-accordion__button');
      let title = '';
      if (button) {
        const titleSpan = button.querySelector('.cmp-accordion__title');
        if (titleSpan) {
          title = titleSpan.textContent.trim();
        } else {
          title = button.textContent.trim();
        }
      }
      // Content: the panel, which may contain a lot of markup
      const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
      let content = '';
      if (panel) {
        // Defensive: find the first child that is not visually hidden
        // But in this markup, the panel contains the content directly
        // We'll just use the panel's children
        // To keep structure, wrap content in a div if needed
        const contentDiv = document.createElement('div');
        Array.from(panel.childNodes).forEach(node => {
          contentDiv.appendChild(node.cloneNode(true));
        });
        content = contentDiv;
      }
      return [title, content];
    });
  }

  // Find all accordions in the element (could be multiple tabs)
  const accordions = getAllAccordions(element);
  if (!accordions.length) return;

  // Compose all rows for all accordions (in order)
  const rows = [];
  accordions.forEach(accordion => {
    const items = extractAccordionItems(accordion);
    rows.push(...items);
  });

  // Table header as required
  const headerRow = ['Accordion (accordion62)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
