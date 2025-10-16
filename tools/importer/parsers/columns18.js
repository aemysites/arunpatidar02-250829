/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the block
  const mainGrid = element.querySelector('.aem-Grid');
  if (!mainGrid) return;

  // Get all immediate children of the main grid
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 2) return;

  // Identify image and text columns
  let imageColumn = null, textColumn = null;
  gridChildren.forEach((col) => {
    if (!imageColumn && col.querySelector('picture, img')) {
      imageColumn = col;
    }
    if (!textColumn && (col.querySelector('.cmp-title__text') || col.querySelector('.cmp-text__paragraph') || col.querySelector('.cmp-button'))) {
      textColumn = col;
    }
  });
  // Fallback if not found
  if (!textColumn) textColumn = gridChildren[0];
  if (!imageColumn) imageColumn = gridChildren[1];

  // Extract image (prefer <picture>, fallback to <img>)
  const picture = imageColumn.querySelector('picture');
  const img = imageColumn.querySelector('img');
  const imageCellContent = picture || img;

  // Extract all text content for left column
  const leftCellContent = [];
  const heading = textColumn.querySelector('.cmp-title__text');
  if (heading) leftCellContent.push(heading);
  const paragraph = textColumn.querySelector('.cmp-text__paragraph');
  if (paragraph) leftCellContent.push(paragraph);
  const button = textColumn.querySelector('.cmp-button');
  if (button) leftCellContent.push(button);

  // Table rows
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftCellContent, imageCellContent];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
