/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Accordion header row as required
  const headerRow = ['Accordion (accordion42)'];
  const rows = [headerRow];

  // Find all accordion items (direct children of the accordion root)
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');

  items.forEach(item => {
    // Title cell: get the text from the button > span.cmp-accordion__title
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

    // Content cell: get the panel content
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell;
    if (panel) {
      // Defensive: if panel has only one child, use that, else use all children
      const panelChildren = Array.from(panel.children);
      if (panelChildren.length === 1) {
        contentCell = panelChildren[0];
      } else if (panelChildren.length > 1) {
        contentCell = panelChildren;
      } else {
        // fallback: use panel itself
        contentCell = panel;
      }
    } else {
      contentCell = '';
    }

    rows.push([title, contentCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
