/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children with a selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find all accordion items
  const items = element.querySelectorAll('.cmp-accordion__item');

  // Prepare table rows
  const rows = [];

  // Header row as required
  rows.push(['Accordion (accordion70)']);

  items.forEach(item => {
    // Title cell: find the span with class cmp-accordion__title
    let titleSpan = item.querySelector('.cmp-accordion__title');
    let titleCell = titleSpan ? titleSpan : document.createTextNode('');

    // Content cell: find the panel
    let panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell;
    if (panel) {
      // Defensive: find the first .cmp-text__paragraph or fallback to all children
      let paragraph = panel.querySelector('.cmp-text__paragraph');
      if (paragraph) {
        contentCell = paragraph;
      } else {
        // Sometimes the content is nested deeper, so flatten all direct children
        const contentFragments = [];
        getDirectChildren(panel, 'div, p, ul, ol').forEach(child => {
          contentFragments.push(child);
        });
        // If nothing found, fallback to panel itself
        contentCell = contentFragments.length ? contentFragments : panel;
      }
    } else {
      contentCell = document.createTextNode('');
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
