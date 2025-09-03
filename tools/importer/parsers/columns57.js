/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container for the columns
  const container = element.querySelector('.cmp-text-media__container');
  if (!container) return;

  // Find the two main column elements: text and image
  const media = container.querySelector('.cmp-text-media__media');
  const content = container.querySelector('.cmp-text-media__content');

  // Defensive: ensure both columns exist
  if (!media || !content) return;

  // Table header row
  const headerRow = ['Columns (columns57)'];
  // Table content row: [left column, right column]
  // In this layout, text is left, image is right (media-right class)
  const row = [content, media];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  element.replaceWith(table);
}
