/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content block inside the experiencefragment
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // Get the image column (left)
  let imageCol = null;
  const teaserImage = teaser.querySelector('.cmp-teaser__image');
  if (teaserImage) {
    // Only include the image element itself (not the blurred face overlay)
    const img = teaserImage.querySelector('img');
    if (img) {
      imageCol = document.createElement('div');
      imageCol.appendChild(img);
    }
  }

  // Get the content column (right)
  let contentCol = null;
  const teaserContent = teaser.querySelector('.cmp-teaser__content');
  if (teaserContent) {
    // We'll include the whole content block (name, title, contact list)
    contentCol = teaserContent;
  }

  // Build the columns row
  const columnsRow = [imageCol, contentCol];

  // Table header as per spec
  const headerRow = ['Columns (columns65)'];

  // Compose table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
