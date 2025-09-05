/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Hero (hero18)'];

  // --- Background Image Extraction ---
  // Find the background image from the .parallax-inner div
  let bgImgUrl = '';
  const parallaxInner = element.querySelector('.parallax-inner');
  if (parallaxInner) {
    const style = parallaxInner.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
    if (match && match[1]) {
      bgImgUrl = match[1];
    }
  }
  let bgImgEl = null;
  if (bgImgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgImgUrl;
    bgImgEl.alt = '';
  }

  // --- Content Extraction ---
  // Find the right column with text and badge image
  let contentCellElements = [];
  // Find the fusion-row inside the main element
  const fusionRow = element.querySelector('.fusion-builder-row');
  if (fusionRow) {
    const fusionColumns = fusionRow.querySelectorAll(':scope > .fusion-layout-column');
    let contentColumn = null;
    if (fusionColumns.length > 1) {
      // The second column contains the content
      contentColumn = fusionColumns[1];
    }
    if (contentColumn) {
      // Get all direct children of the column wrapper
      const wrapper = contentColumn.querySelector('.fusion-column-wrapper');
      if (wrapper) {
        // Get heading
        const headingBlock = wrapper.querySelector('.fusion-text');
        if (headingBlock) {
          contentCellElements.push(headingBlock);
        }
        // Get badge image
        const badgeImgFrame = wrapper.querySelector('.fusion-imageframe');
        if (badgeImgFrame) {
          contentCellElements.push(badgeImgFrame);
        }
      }
    }
  }

  // --- Table Construction ---
  const cells = [
    headerRow,
    [bgImgEl ? bgImgEl : ''],
    [contentCellElements.length ? contentCellElements : '']
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
