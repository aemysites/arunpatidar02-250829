/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure the expected container structure
  const imageDiv = element.querySelector('.rad-banner-image-and-text__image');
  const textDiv = element.querySelector('.rad-banner-image-and-text__text');

  // Get image element (do not create new one)
  let imgEl = null;
  if (imageDiv) {
    imgEl = imageDiv.querySelector('img');
  }

  // Get text title and description
  let titleEl = null;
  let descEl = null;
  if (textDiv) {
    titleEl = textDiv.querySelector('.rad-banner-image-and-text__text-title');
    descEl = textDiv.querySelector('.rad-banner-image-and-text__text-description');
  }

  // Compose the text column
  const textColumnContent = [];
  if (titleEl) textColumnContent.push(titleEl);
  if (descEl) textColumnContent.push(descEl);

  // Build the table structure
  const headerRow = ['Columns (columns7)'];
  const columnsRow = [imgEl, textColumnContent];

  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
