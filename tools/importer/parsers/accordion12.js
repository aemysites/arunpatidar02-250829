/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion container
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  // Get all accordion items
  const items = Array.from(accordion.querySelectorAll('.cmp-accordion__item'));

  // Prepare the header row (single cell, per guidelines)
  const headerRow = ['Accordion (accordion12)'];
  const rows = [headerRow];

  // For each item, extract title and content
  items.forEach(item => {
    // Title: find the button and its title span
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
    // Create a title element for the cell
    const titleEl = document.createElement('div');
    titleEl.textContent = title;

    // Content: find the panel and grab its inner content
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentEl = document.createElement('div');
    if (panel) {
      // Defensive: find the first child with class 'cmp-text', or use all children
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        // Clone all children of cmpText into contentEl
        Array.from(cmpText.childNodes).forEach(node => {
          contentEl.appendChild(node.cloneNode(true));
        });
      } else {
        // fallback: clone all panel children into contentEl
        Array.from(panel.childNodes).forEach(node => {
          contentEl.appendChild(node.cloneNode(true));
        });
      }
    }
    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Fix: ensure the header row is a single cell row, not a <th> in a table with two columns
  if (block && block.querySelector('tr') && block.querySelector('tr').children.length === 1) {
    block.querySelector('tr').children[0].setAttribute('colspan', '2');
  }
  // Replace the original element
  element.replaceWith(block);
}
