/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards16) block: 2 columns, header row, each card is a row
  // Each card: icon (first cell), title+description (second cell)

  // Helper to extract cards from the source HTML
  function extractCards(root) {
    const cards = [];
    // Find all card containers (each card is a pair of icon + text)
    // The repeating pattern is: two adjacent containers, one with icon, one with text
    // We'll look for deepest aem-Grid with aem-Grid--2, then its children
    const cardGrids = Array.from(root.querySelectorAll('.aem-Grid.aem-Grid--2'));
    for (const grid of cardGrids) {
      // Icon cell: find .icon .cmp-icon or similar
      const iconCol = grid.querySelector('.icon .cmp-icon, .icon');
      let iconElem = null;
      if (iconCol) {
        // Use the icon element itself (usually contains <i> with data-icon)
        iconElem = iconCol;
      }
      // Title and description cell: find .title and .text
      const titleCol = grid.querySelector('.title');
      const textCol = grid.querySelector('.text');
      let textElems = [];
      if (titleCol) {
        // Find the heading (usually <p> inside .cmp-title)
        const heading = titleCol.querySelector('.cmp-title__text');
        if (heading) textElems.push(heading);
      }
      if (textCol) {
        // Find the paragraph (usually <p> inside .cmp-text)
        const para = textCol.querySelector('.cmp-text__paragraph');
        if (para) textElems.push(para);
      }
      // Defensive: only add if we have at least icon and some text
      if (iconElem && textElems.length) {
        // For the text cell, create a fragment to preserve structure
        const frag = document.createDocumentFragment();
        textElems.forEach((el, idx) => {
          if (idx > 0) frag.appendChild(document.createElement('br'));
          frag.appendChild(el);
        });
        cards.push([iconElem, frag]);
      }
    }
    return cards;
  }

  // Find the main container holding all cards
  // The cards are nested deeply, so start from element and search for all card grids
  const cards = extractCards(element);

  // Compose table rows
  const headerRow = ['Cards (cards16)'];
  const tableRows = [headerRow];
  for (const card of cards) {
    tableRows.push(card);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(block);
}
