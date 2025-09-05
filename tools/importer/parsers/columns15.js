/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList && child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Columns (columns15)'];

  // 2. Find the main row containing columns
  const fusionRow = element.querySelector('.fusion-builder-row.fusion-row');
  if (!fusionRow) return;

  // 3. Find all direct column wrappers (should be 3: title, col1, col2)
  const columns = Array.from(fusionRow.children);
  if (columns.length < 3) return;

  // 4. First column: Title (spans all columns visually)
  const titleCol = columns[0];
  const titleWrapper = getDirectChildByClass(titleCol, 'fusion-column-wrapper');
  let titleBlock = null;
  if (titleWrapper) {
    // Find the .fusion-title inside
    const fusionTitle = titleWrapper.querySelector('.fusion-title');
    if (fusionTitle) {
      titleBlock = fusionTitle;
    }
  }

  // 5. Next two columns: the actual content columns
  function extractColumnContent(col) {
    const colWrapper = getDirectChildByClass(col, 'fusion-column-wrapper');
    if (!colWrapper) return document.createElement('div');
    // We'll collect all children of the wrapper as the column content
    // (excluding empty text nodes)
    const content = Array.from(colWrapper.childNodes).filter(
      node => !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim())
    );
    // If only one element, return it directly, else wrap in a div
    if (content.length === 1) return content[0];
    const div = document.createElement('div');
    content.forEach(el => div.appendChild(el));
    return div;
  }

  const col1 = columns[1];
  const col2 = columns[2];
  const col1Content = extractColumnContent(col1);
  const col2Content = extractColumnContent(col2);

  // 6. Build the table rows
  // First row: header
  // Second row: title spanning all columns (single cell)
  // Third row: two columns (Graz, Linz)
  const tableRows = [
    headerRow,
    [titleBlock],
    [col1Content, col2Content],
  ];

  // 7. Create table and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
