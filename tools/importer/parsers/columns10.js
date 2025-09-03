/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content container
  const expFrag = element.querySelector('.cmp-experiencefragment');
  if (!expFrag) return;
  const container = expFrag.querySelector('.cmp-container');
  if (!container) return;
  const teaser = container.querySelector('.cmp-teaser-contact');
  if (!teaser) return;

  // Column 1: Image
  let imageCol = null;
  const teaserImageWrap = teaser.querySelector('.cmp-teaser__image');
  if (teaserImageWrap) {
    const cmpImage = teaserImageWrap.querySelector('.cmp-image');
    if (cmpImage) {
      // Defensive: Find the actual image element
      const img = cmpImage.querySelector('img');
      if (img) {
        // Use the image element directly
        imageCol = img;
      }
    }
  }

  // Column 2: Content (title, subtitle, links)
  const teaserContent = teaser.querySelector('.cmp-teaser__content');
  let contentCol = document.createElement('div');
  if (teaserContent) {
    // Title
    const titleWrap = teaserContent.querySelector('.cmp-title');
    if (titleWrap) {
      const h3 = titleWrap.querySelector('h3');
      if (h3) contentCol.appendChild(h3);
    }
    // Subtitle
    const subtitle = teaserContent.querySelector('.cmp-teaser__pretitle');
    if (subtitle) contentCol.appendChild(subtitle);
    // Links (email, phone)
    const list = teaserContent.querySelector('.cmp-teaser__list');
    if (list) {
      // Only include the links (not icons)
      list.querySelectorAll('a').forEach(a => {
        contentCol.appendChild(a);
      });
    }
  }

  // Build the table
  const headerRow = ['Columns (columns10)'];
  const contentRow = [imageCol, contentCol];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
