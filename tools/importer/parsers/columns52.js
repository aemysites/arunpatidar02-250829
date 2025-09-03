/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the left (image) and right (content) columns
  const media = element.querySelector('.cmp-text-media__media');
  const content = element.querySelector('.cmp-text-media__content');

  // Defensive: get the image element from media
  let imageEl = null;
  if (media) {
    imageEl = media.querySelector('img');
  }

  // Defensive: get the text paragraphs and link-list from content
  let textBlock = null;
  let linkList = null;
  if (content) {
    textBlock = content.querySelector('.cmp-text');
    linkList = content.querySelector('.cmp-text-media__link-list');
  }

  // Compose the right column: text + link-list
  const rightColumnContent = [];
  if (textBlock) rightColumnContent.push(textBlock);
  if (linkList) rightColumnContent.push(linkList);

  // Table header
  const headerRow = ['Columns (columns52)'];
  // Table columns: left (image), right (text + link)
  const columnsRow = [imageEl, rightColumnContent];

  // Build the table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
