/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate child containers (columns)
  const topContainers = Array.from(element.querySelectorAll(':scope > div > div > div > div > div > div > div'));

  // Defensive: Find main column containers (the two columns)
  let leftCol, rightCol;
  if (topContainers.length >= 2) {
    leftCol = topContainers[0];
    rightCol = topContainers[1];
  } else {
    // Fallback: try to find columns
    const candidates = Array.from(element.querySelectorAll(':scope > div > div > div > div > div > div'));
    leftCol = candidates[0];
    rightCol = candidates[1];
  }

  // --- LEFT COLUMN (Image) ---
  let imageEl = null;
  if (leftCol) {
    // Find first <img> inside leftCol
    imageEl = leftCol.querySelector('img');
    if (imageEl) {
      // Use the parent wrapper for better resilience
      const imgWrapper = imageEl.closest('.cmp-image') || imageEl.closest('picture') || imageEl;
      imageEl = imgWrapper;
    }
  }

  // --- RIGHT COLUMN (Title, Text, Button) ---
  let rightContentEls = [];
  if (rightCol) {
    // Title
    const title = rightCol.querySelector('.cmp-title__text');
    if (title) rightContentEls.push(title);
    // Text
    const text = rightCol.querySelector('.cmp-text__paragraph');
    if (text) rightContentEls.push(text);
    // Button
    const button = rightCol.querySelector('a.cmp-button');
    if (button) rightContentEls.push(button);
  }

  // --- Disclaimer (below columns, single cell spanning both columns) ---
  let disclaimer = null;
  disclaimer = element.querySelector('.style-text--disclaimer-1 .cmp-text__paragraph');

  // --- Table Construction ---
  const headerRow = ['Columns (columns10)'];
  const contentRow = [imageEl, rightContentEls];
  const rows = [headerRow, contentRow];

  // Disclaimer row: two columns, disclaimer in first, empty string in second
  if (disclaimer) {
    rows.push([disclaimer.cloneNode(true), '']);
  }

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
