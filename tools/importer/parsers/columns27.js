/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct columns
  const columns = element.querySelectorAll(':scope > .fusion-builder-row > .fusion-layout-column');
  if (!columns || columns.length < 2) return;

  // First column: quote, name/title, and accordion
  const leftCol = columns[0];
  const leftWrapper = leftCol.querySelector('.fusion-column-wrapper');

  // Gather all main content in left column
  const leftContent = [];
  // Icon (quote)
  const quoteIcon = leftWrapper.querySelector('i.fb-icon-element');
  if (quoteIcon) leftContent.push(quoteIcon.cloneNode(true));
  // Quote text (any .fusion-text)
  leftWrapper.querySelectorAll('.fusion-text').forEach((el) => {
    leftContent.push(el.cloneNode(true));
  });
  // Accordion (success story)
  const accordion = leftWrapper.querySelector('.fusion-accordian');
  if (accordion) leftContent.push(accordion.cloneNode(true));

  // Second column: image
  const rightCol = columns[1];
  const rightWrapper = rightCol.querySelector('.fusion-column-wrapper');
  // Get image
  const image = rightWrapper.querySelector('img');
  const rightContent = image ? [image.cloneNode(true)] : [];

  // Table header
  const headerRow = ['Columns (columns27)'];
  // Table content row: left column, right column
  const contentRow = [leftContent, rightContent];

  // Create table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
