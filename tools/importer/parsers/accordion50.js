/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract title and content from each accordion item
  function getAccordionRows(accordionEl) {
    const rows = [];
    // Select all immediate accordion items
    const items = accordionEl.querySelectorAll(':scope > .cmp-accordion__item');
    items.forEach((item) => {
      // Title: find the button with the title span
      let titleText = '';
      const button = item.querySelector('.cmp-accordion__button');
      if (button) {
        const titleSpan = button.querySelector('.cmp-accordion__title');
        if (titleSpan) {
          titleText = titleSpan.textContent.trim();
        }
      }
      // Content: find the panel
      let contentCell = null;
      const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
      if (panel) {
        // Defensive: sometimes the content is deeply nested, so grab all children
        // We'll use the panel's children, but if only one child, use that directly
        // If panel has only one child, use that; else, use all children in an array
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
        // fallback: empty cell
        contentCell = document.createElement('div');
      }
      rows.push([titleText, contentCell]);
    });
    return rows;
  }

  // Find the accordion block inside the given element
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) {
    // Defensive: if not found, do nothing
    return;
  }

  // Build the table cells
  const headerRow = ['Accordion (accordion50)'];
  const contentRows = getAccordionRows(accordion);
  const cells = [headerRow, ...contentRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
