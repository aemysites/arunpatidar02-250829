/* global WebImporter */
export default function parse(element, { document }) {
  // Find all top-level highlighted containers (each is a column)
  const containers = Array.from(element.querySelectorAll(':scope > .cmp-container-highlighted, :scope > div > .cmp-container-highlighted'));
  // Fallback: if not found, treat element itself as one column
  const columns = containers.length ? containers : [element];

  // Helper to extract column content
  function extractColumnContent(container) {
    // Find teaser-media-object (main block)
    const teaserMediaObject = container.querySelector('.cmp-teaser-media-object') || container;
    // Find image (first image in teaser)
    const imageWrap = teaserMediaObject.querySelector('.cmp-teaser__image .cmp-image');
    let image = null;
    if (imageWrap) {
      image = imageWrap.querySelector('img');
    }
    // Find content area
    const content = teaserMediaObject.querySelector('.cmp-teaser__content');
    let title = null;
    let description = null;
    let action = null;
    if (content) {
      title = content.querySelector('.cmp-title');
      description = content.querySelector('.cmp-teaser__description');
      action = content.querySelector('.cmp-teaser__action-container a, .cmp-teaser__action-container .cmp-button');
    }
    // Compose cell content
    const cellContent = [];
    if (image) cellContent.push(image);
    if (title) cellContent.push(title);
    if (description) cellContent.push(description);
    if (action) cellContent.push(action);
    return cellContent;
  }

  // Build table rows
  const headerRow = ['Columns (columns22)'];
  const contentRow = columns.map(extractColumnContent);

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
