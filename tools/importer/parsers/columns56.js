/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for the contact block
  const teaser = element.querySelector('.cmp-teaser-contact');
  if (!teaser) return;

  // Get the image column (left)
  let imageCol = null;
  const teaserImage = teaser.querySelector('.cmp-teaser__image');
  if (teaserImage) {
    // Use the image container as-is (contains the image)
    imageCol = teaserImage;
  } else {
    // fallback: empty div
    imageCol = document.createElement('div');
  }

  // Get the content column (right)
  let contentCol = document.createElement('div');
  const teaserContent = teaser.querySelector('.cmp-teaser__content');
  if (teaserContent) {
    // Move all children into the new contentCol
    Array.from(teaserContent.childNodes).forEach((node) => {
      contentCol.appendChild(node.cloneNode(true));
    });
  }

  // Build the table structure
  const headerRow = ['Columns (columns56)'];
  const contentRow = [imageCol, contentCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
