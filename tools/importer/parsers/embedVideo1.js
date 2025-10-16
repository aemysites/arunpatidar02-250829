/* global WebImporter */
export default function parse(element, { document }) {
  // Embed (embedVideo1) block always has a header row
  const headerRow = ['Embed (embedVideo1)'];

  // The source HTML is completely empty (no iframe, no image, no link, no content)
  // The block should have a second row with an empty cell
  const contentRow = [''];

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
