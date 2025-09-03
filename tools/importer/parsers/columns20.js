/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the two main columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;

  // First column: image and caption
  const mediaCol = columns[0];
  // Find the image block (should be a .cmp-image)
  const imageBlock = mediaCol.querySelector('.cmp-image');
  let imageEl = null;
  let captionEl = null;
  if (imageBlock) {
    imageEl = imageBlock.querySelector('img');
    captionEl = imageBlock.querySelector('.cmp-image__title');
  }
  // Compose media cell content
  const mediaCell = [];
  if (imageEl) mediaCell.push(imageEl);
  if (captionEl) mediaCell.push(document.createElement('br'), captionEl);

  // Second column: text content
  const contentCol = columns[1];
  // Grab all paragraphs inside cmp-text__paragraph
  const textParagraphs = contentCol.querySelectorAll('.cmp-text__paragraph > p');
  const textCell = Array.from(textParagraphs);

  // Compose the table
  const headerRow = ['Columns (columns20)'];
  const contentRow = [mediaCell, textCell];
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the table with two columns
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
