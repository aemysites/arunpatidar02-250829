/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns (row-reverse: image first, then text)
  const grid = element.querySelector('.aem-Grid');
  if (!grid) return;
  const columns = Array.from(grid.children).filter(div => div.matches('.container.responsivegrid'));
  if (columns.length < 2) return;

  // Identify image and text columns
  let imageCol = columns.find(col => col.querySelector('img'));
  let textCol = columns.find(col => !col.querySelector('img'));

  // --- Image Cell ---
  let imageCell = null;
  if (imageCol) {
    // Use <picture> for responsive image if available
    const picture = imageCol.querySelector('picture');
    if (picture) {
      imageCell = picture;
    } else {
      const img = imageCol.querySelector('img');
      if (img) imageCell = img;
    }
  }

  // --- Text Cell ---
  let textCell = document.createElement('div');
  if (textCol) {
    // Find heading and paragraph
    const heading = textCol.querySelector('h3');
    const paragraph = textCol.querySelector('p');
    if (heading) textCell.appendChild(heading);
    if (paragraph) textCell.appendChild(paragraph);
  }
  // If textCell is empty, set to null
  if (!textCell.hasChildNodes()) textCell = null;

  // --- Table Construction ---
  const headerRow = ['Columns (columns21)'];
  const contentRow = [textCell, imageCell].filter(Boolean);
  const tableRows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
