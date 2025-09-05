/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Hero (hero23)'];

  // Defensive: Find the main column wrapper
  const columnWrapper = element.querySelector('.fusion-column-wrapper');
  if (!columnWrapper) return;

  // Find the title (h2)
  const titleDiv = columnWrapper.querySelector('.fusion-title');
  let titleEl = null;
  if (titleDiv) {
    titleEl = titleDiv.querySelector('h2');
  }

  // Find the text content (fusion-text)
  const textDiv = columnWrapper.querySelector('.fusion-text');

  // Row 2: Background image (optional)
  // This HTML does not have a background image element, so leave empty
  const bgImageRow = [''];

  // Row 3: Content (title, paragraphs)
  // Compose all content elements into a single array
  const contentEls = [];
  if (titleEl) contentEls.push(titleEl);
  if (textDiv) {
    // Add all children of the textDiv (paragraphs, etc.)
    Array.from(textDiv.children).forEach(child => {
      contentEls.push(child);
    });
  }
  const contentRow = [contentEls];

  // Build the table
  const cells = [headerRow, bgImageRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
