/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Columns (columns22)'];

  // 2. Find the fusion-row (the flex row containing all columns)
  const fusionRow = element.querySelector('.fusion-builder-row.fusion-row');
  if (!fusionRow) return;

  // 3. Get all immediate fusion-layout-column children (these are the columns)
  const columnDivs = Array.from(fusionRow.children).filter(child => child.classList.contains('fusion-layout-column'));
  if (columnDivs.length < 5) return;

  // 4. Extract the header/title (first column, first child)
  const titleColumn = columnDivs[0];
  let titleContent = null;
  const titleWrapper = titleColumn.querySelector('.fusion-title');
  if (titleWrapper) {
    titleContent = titleWrapper;
  }

  // 5. Extract the three icon+text columns (columns 2, 3, 4)
  const iconColumns = columnDivs.slice(1, 4);
  const iconCells = iconColumns.map(col => {
    const wrapper = col.querySelector('.fusion-column-wrapper');
    const children = [];
    const imgSpan = wrapper ? wrapper.querySelector('span.fusion-imageframe') : null;
    if (imgSpan) children.push(imgSpan);
    const textDiv = wrapper ? wrapper.querySelector('.fusion-text') : null;
    if (textDiv) children.push(textDiv);
    return children;
  });

  // 6. Extract the bottom text (last column)
  const bottomColumn = columnDivs[4];
  let bottomText = null;
  const bottomWrapper = bottomColumn.querySelector('.fusion-column-wrapper');
  if (bottomWrapper) {
    const fusionText = bottomWrapper.querySelector('.fusion-text');
    if (fusionText) bottomText = fusionText;
  }

  // 7. Build the table rows
  // Second row: three columns (icon+text)
  const secondRow = iconCells;
  // Third row: single cell containing the bottom text (no unnecessary empty columns)
  const thirdRow = [bottomText];
  // Title row: single cell
  const titleRow = [titleContent];

  // Compose the cells array
  const cells = [
    headerRow,
    titleRow,
    secondRow,
    thirdRow
  ];

  // 8. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
