/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct child by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList && el.classList.contains(className));
  }

  // Header row for the block
  const headerRow = ['Cards (cards6)'];

  // Find the main card container
  const banner = getChildByClass(element, 'rad-banner-image-and-text') || element;

  // Extract image (first cell)
  let imageEl = null;
  const container = getChildByClass(banner, 'rad-banner-image-and-text__container');
  if (container) {
    const imageDiv = getChildByClass(container, 'rad-banner-image-and-text__image');
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }
  }

  // Extract all text content for the second cell
  // Collect all relevant blocks: header headline/subheadline, text title, description
  const textCellContent = [];
  // 1. Header headline and subheadline
  const headerDiv = getChildByClass(banner, 'rad-banner-image-and-text__header');
  if (headerDiv) {
    const h3 = headerDiv.querySelector('h3');
    if (h3) {
      const strong = document.createElement('strong');
      strong.textContent = h3.textContent.trim();
      textCellContent.push(strong);
    }
    const p = headerDiv.querySelector('p');
    if (p) {
      textCellContent.push(document.createElement('br'));
      textCellContent.push(p.cloneNode(true));
    }
  }
  // 2. Text title and description
  if (container) {
    const textDiv = getChildByClass(container, 'rad-banner-image-and-text__text');
    if (textDiv) {
      const titleDiv = getChildByClass(textDiv, 'rad-banner-image-and-text__text-title');
      if (titleDiv) {
        textCellContent.push(document.createElement('br'));
        const strong2 = document.createElement('strong');
        strong2.textContent = titleDiv.textContent.trim();
        textCellContent.push(strong2);
      }
      const descDiv = getChildByClass(textDiv, 'rad-banner-image-and-text__text-description');
      if (descDiv) {
        const descP = descDiv.querySelector('p');
        if (descP) {
          textCellContent.push(document.createElement('br'));
          textCellContent.push(descP.cloneNode(true));
        } else {
          textCellContent.push(document.createElement('br'));
          textCellContent.push(descDiv.cloneNode(true));
        }
      }
    }
  }

  // Remove leading <br> if present
  while (textCellContent[0] && textCellContent[0].tagName === 'BR') textCellContent.shift();

  // Build the table rows
  const rows = [headerRow];
  rows.push([
    imageEl || '',
    textCellContent.length ? textCellContent : '',
  ]);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
