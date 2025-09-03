/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the form inside the container
  const form = element.querySelector('form');
  if (!form) return;

  // Helper to get all direct children of form that are grid columns
  const gridChildren = Array.from(form.querySelectorAll(':scope > div'));

  // We'll build two columns: left and right, based on the visual layout
  // Left column: Anrede, Vorname, Unternehmen, Telefon, Ort, Geschäftsbereich
  // Right column: Nachname, E-Mail, PLZ, Land/Provinz, Marke
  // The rest (Womit helfen, Anfrage, Datenschutz, Button) are full-width below

  // Find each fieldset or block by order
  // 0: Anrede (radio)
  // 1: Vorname
  // 2: Nachname
  // 3: Unternehmen
  // 4: E-Mail
  // 5: Telefon
  // 6: PLZ
  // 7: Ort
  // 8: Land/Provinz
  // 9: Geschäftsbereich
  // 10: Marke
  // 11: Womit helfen
  // 12: Anfrage
  // 13: Datenschutz
  // 14: Captcha
  // 15: Button

  // Defensive: filter only grid columns that contain a fieldset or cmp-container
  const fieldBlocks = gridChildren.filter(div =>
    div.querySelector('fieldset') || div.querySelector('.cmp-container') || div.querySelector('button')
  );

  // Left column blocks
  const leftBlocks = [];
  // Right column blocks
  const rightBlocks = [];

  // Map fields visually
  // Anrede (radio)
  leftBlocks.push(fieldBlocks[0]);
  // Vorname
  leftBlocks.push(fieldBlocks[1]);
  // Unternehmen
  leftBlocks.push(fieldBlocks[3]);
  // Telefon
  leftBlocks.push(fieldBlocks[5]);
  // Ort
  leftBlocks.push(fieldBlocks[7]);
  // Geschäftsbereich
  leftBlocks.push(fieldBlocks[9]);

  // Nachname
  rightBlocks.push(fieldBlocks[2]);
  // E-Mail
  rightBlocks.push(fieldBlocks[4]);
  // PLZ
  rightBlocks.push(fieldBlocks[6]);
  // Land/Provinz
  rightBlocks.push(fieldBlocks[8]);
  // Marke
  rightBlocks.push(fieldBlocks[10]);

  // Compose left and right columns as arrays of elements
  const leftCol = leftBlocks;
  const rightCol = rightBlocks;

  // Full-width blocks below columns
  // Womit helfen
  const helpBlock = fieldBlocks[11];
  // Anfrage (textarea)
  const requestBlock = fieldBlocks[12];
  // Datenschutz info (cmp-container)
  // Find the cmp-text inside cmp-container
  let privacyBlock = null;
  if (fieldBlocks[13]) {
    const cmpText = fieldBlocks[13].querySelector('.cmp-text');
    privacyBlock = cmpText ? cmpText : fieldBlocks[13];
  }
  // Button
  const buttonBlock = fieldBlocks[15] || form.querySelector('button');

  // Compose table rows
  const headerRow = ['Columns (columns9)'];
  const columnsRow = [leftCol, rightCol];
  const helpRow = [helpBlock, ''];
  const requestRow = [requestBlock, ''];
  const privacyRow = [privacyBlock, ''];
  const buttonRow = [buttonBlock, ''];

  // Build the table
  const cells = [
    headerRow,
    columnsRow,
    helpRow,
    requestRow,
    privacyRow,
    buttonRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
