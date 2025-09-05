/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract background image from style attribute
  function extractBgImageUrl(style) {
    if (!style) return null;
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/i);
    return match ? match[1] : null;
  }

  // Find all fusion-fullwidth rows that represent a row in the columns block
  const rows = Array.from(element.querySelectorAll('.fusion-fullwidth.fullwidth-box'));
  if (!rows.length) return;

  // We'll build a table with the header and then each row as a table row
  const table = [];
  // Header row as per requirements
  table.push(['Columns (columns12)']);

  // For each fusion-fullwidth row, extract the two columns
  rows.forEach((row) => {
    // Each row contains a .fusion-builder-row, which contains two .fusion-layout-column
    const builderRow = row.querySelector('.fusion-builder-row');
    if (!builderRow) return;
    const columns = Array.from(builderRow.querySelectorAll(':scope > .fusion-layout-column'));
    if (columns.length !== 2) return; // Defensive: only process rows with exactly 2 columns

    // For each column, extract either the background image or the content
    const cells = columns.map((col) => {
      const wrapper = col.querySelector('.fusion-column-wrapper');
      if (!wrapper) return '';
      // Check for background image
      const bgUrl = extractBgImageUrl(wrapper.getAttribute('style')) || wrapper.getAttribute('data-bg-url');
      if (bgUrl) {
        // Create an <img> element for the background image
        const img = document.createElement('img');
        img.src = bgUrl;
        img.loading = 'lazy';
        img.style.width = '100%';
        return img;
      }
      // Otherwise, grab all content inside the wrapper
      // We'll collect all direct children except empty .fusion-text
      const content = [];
      Array.from(wrapper.childNodes).forEach((node) => {
        if (node.nodeType === 1) { // element
          // Skip empty .fusion-text
          if (node.classList.contains('fusion-text') && !node.textContent.trim()) return;
          content.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) {
          // Text node
          const span = document.createElement('span');
          span.textContent = node.textContent;
          content.push(span);
        }
      });
      return content.length === 1 ? content[0] : content;
    });
    table.push(cells);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
