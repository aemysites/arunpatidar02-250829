/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main text-media block
  const textMedia = element.querySelector('.cmp-text-media');
  if (!textMedia) return;

  // Find the media (image) column
  const mediaContainer = textMedia.querySelector('.cmp-text-media__media');
  let imageEl = null;
  if (mediaContainer) {
    imageEl = mediaContainer.querySelector('img');
  }

  // Find the content (text) column
  const contentContainer = textMedia.querySelector('.cmp-text-media__content');
  let textContent = null;
  if (contentContainer) {
    // Use the whole content block for resilience
    textContent = contentContainer;
  }

  // Build the table rows
  const headerRow = ['Columns (columns53)'];
  const columnsRow = [imageEl, textContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
