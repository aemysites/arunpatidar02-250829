/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container for the columns block
  const mainContainer = element.querySelector('.cmp-text-media__container');
  if (!mainContainer) return;

  // Get the two columns: text and image
  const mediaDiv = mainContainer.querySelector('.cmp-text-media__media');
  const contentDiv = mainContainer.querySelector('.cmp-text-media__content');

  // Defensive: Ensure both columns exist
  if (!mediaDiv || !contentDiv) return;

  // Table header row as per block guidelines
  const headerRow = ['Columns (columns67)'];
  // Table content row: [text column, image column]
  const contentRow = [contentDiv, mediaDiv];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
