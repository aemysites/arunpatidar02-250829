/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main experience fragment container
  const fragment = element.querySelector('.cmp-experiencefragment') || element;
  // Find the teaser block
  const teaser = fragment.querySelector('.cmp-teaser');
  if (!teaser) return;

  // --- COLUMN 1: IMAGE ---
  // Get the image element (not the blurred face)
  let imageCell = null;
  const imageWrapper = teaser.querySelector('.cmp-teaser__image');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // --- COLUMN 2: TEXT CONTENT ---
  // Get the content wrapper
  const contentWrapper = teaser.querySelector('.cmp-teaser__content');
  let contentCell = document.createElement('div');
  if (contentWrapper) {
    // Title (h3)
    const title = contentWrapper.querySelector('.cmp-title__text');
    if (title) contentCell.appendChild(title);
    // Subtitle (pretitle)
    const pretitle = contentWrapper.querySelector('.cmp-teaser__pretitle');
    if (pretitle) contentCell.appendChild(pretitle);
    // Contact list (ul)
    const contactList = contentWrapper.querySelector('.cmp-teaser__list');
    if (contactList) contentCell.appendChild(contactList);
  }

  // Build table rows
  const headerRow = ['Columns (columns49)'];
  const contentRow = [imageCell, contentCell];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
