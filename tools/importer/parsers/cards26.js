/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card columns (skip the first two columns: title & intro)
  const cardColumns = Array.from(element.querySelectorAll(':scope .fusion-layout-column'));

  // The first column is the section title, the second is the intro text. Cards start from index 2.
  const cardCols = cardColumns.slice(2);

  // Header row
  const headerRow = ['Cards (cards26)'];

  // For each card column, extract image and text
  const rows = cardCols.map(col => {
    // Find image (icon)
    const img = col.querySelector('img');
    // Find text block
    const textBlock = col.querySelector('.fusion-text');
    let textContent = '';
    if (textBlock) {
      // Get all text content, including <br> and strong/b tags
      textContent = Array.from(textBlock.querySelectorAll('p')).map(p => {
        // Replace <br> with newlines for markdown-like output
        let html = p.innerHTML.replace(/<br\s*\/?>(\s*)?/gi, '\n');
        // Remove all tags except <strong> and <b>
        html = html.replace(/<(?!strong|b)[^>]+>/gi, '');
        return html.trim();
      }).filter(Boolean).join('\n');
    }
    // Create a div for text content to preserve formatting
    const textDiv = document.createElement('div');
    textDiv.innerHTML = textContent;
    return [img, textDiv];
  });

  // Compose table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
