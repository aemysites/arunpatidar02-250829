/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the main inner container
  function getInnerContainer(el) {
    return el.querySelector('.cmp-text-media');
  }

  // Helper to extract columns (text, image) in correct order
  function extractColumns(el) {
    const container = el.querySelector('.cmp-text-media__container');
    if (!container) return [null, null];
    const media = container.querySelector('.cmp-text-media__media');
    const content = container.querySelector('.cmp-text-media__content');
    // Determine if media is left or right
    const isMediaLeft = el.classList.contains('cmp-text-media--media-left');
    // Always return [text, image] order
    return isMediaLeft ? [content, media] : [content, media];
  }

  // Find all sibling .text-media blocks
  let blocks = [];
  if (element.classList.contains('text-media')) {
    const parent = element.parentElement;
    if (parent) {
      blocks = Array.from(parent.children).filter(
        (child) => child.classList && child.classList.contains('text-media')
      );
    }
    if (!blocks.length) blocks = [element];
  } else {
    blocks = [element];
  }

  // For each block, extract [text, image] columns
  const rows = blocks.map((block) => {
    const inner = getInnerContainer(block) || block;
    const [content, media] = extractColumns(inner);
    // Always [text, image]
    return [content, media];
  });

  // Table header as per requirements
  const headerRow = ['Columns (columns5)'];
  const tableData = [headerRow, ...rows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace first block with table, remove the rest
  const firstBlock = blocks[0];
  firstBlock.replaceWith(table);
  for (let i = 1; i < blocks.length; i += 1) {
    blocks[i].remove();
  }
}
