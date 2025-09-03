/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cmp-text-media__container (the main content area)
  const container = element.querySelector('.cmp-text-media__container');
  if (!container) return;

  // Find the content area (all text and link)
  const content = container.querySelector('.cmp-text-media__content');
  if (!content) return;

  // Find the link (if present)
  const link = container.querySelector('.cmp-text-media__link-list');

  // Each column should be a separate cell: one for text, one for link
  const cells = [content.cloneNode(true), link ? link.cloneNode(true) : ''];

  // Compose table: header, then one row with two columns (text, link)
  const headerRow = ['Columns (columns51)'];
  const tableRows = [cells];
  const table = WebImporter.DOMUtils.createTable([headerRow, ...tableRows], document);

  element.replaceWith(table);
}
