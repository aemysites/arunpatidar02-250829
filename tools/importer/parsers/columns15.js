/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main footer block
  const footerBlock = element.querySelector('.rad-footer');
  let leftCol = null;
  let centerCol = null;
  let rightCol = null;

  if (footerBlock) {
    // Left column: Title
    leftCol = footerBlock.querySelector('.rad-footer__title');
    // Center column: Links
    const linksContainer = footerBlock.querySelector('.rad-footer__links-container');
    if (linksContainer) {
      // Get both columns of links as an array
      const columns = Array.from(linksContainer.querySelectorAll('.rad-footer__links-column'));
      centerCol = columns.length === 2 ? columns : columns.length === 1 ? [columns[0]] : [];
    }
    // Right column: Copyright + image
    const copyright = footerBlock.querySelector('.rad-footer__copyright');
    const lottie = footerBlock.querySelector('.rad-footer__lottie-positioner img');
    // Compose right column: copyright + image
    const rightColContent = document.createElement('div');
    if (copyright) rightColContent.appendChild(copyright.cloneNode(true));
    if (lottie) rightColContent.appendChild(lottie.cloneNode(true));
    rightCol = rightColContent.childNodes.length ? rightColContent : '';
  }

  // Compose the columns for the block
  const columns = [leftCol, ...centerCol, rightCol].filter(Boolean);

  // Table header row
  const headerRow = ['Columns (columns15)'];
  const contentRow = columns;
  const rows = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
