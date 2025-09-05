/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column divs (should be two: image, content)
  const columns = element.querySelectorAll(':scope > div > div');
  if (columns.length < 2) return;

  // First column: image
  let imgEl = null;
  const imgWrapper = columns[0].querySelector('.fusion-imageframe img');
  if (imgWrapper) {
    imgEl = imgWrapper;
  }

  // Second column: content (icon, quote, name/title, button)
  const contentCol = columns[1];
  const contentParts = [];

  // Icon (quote)
  const icon = contentCol.querySelector('i.fb-icon-element');
  if (icon) contentParts.push(icon.cloneNode(true));

  // Quote text (get all .fusion-text, not just -4)
  const quoteText = contentCol.querySelector('.fusion-text-8');
  if (quoteText) contentParts.push(quoteText.cloneNode(true));

  // Name and title
  const nameTitle = contentCol.querySelector('.fusion-text-9');
  if (nameTitle) contentParts.push(nameTitle.cloneNode(true));

  // Button: find the accordian heading (the visible button)
  const accordian = contentCol.querySelector('.accordian');
  if (accordian) {
    const panelHeading = accordian.querySelector('.panel-heading');
    if (panelHeading) {
      contentParts.push(panelHeading.cloneNode(true));
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns8)'];
  const contentRow = [
    imgEl,
    contentParts
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
