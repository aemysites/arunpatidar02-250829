/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate columns
  const columns = Array.from(element.querySelectorAll(':scope > .fusion-builder-row > .fusion-layout-column'));

  // If columns not found, fallback to all direct children that look like columns
  const colEls = columns.length ? columns : Array.from(element.children);

  // Compose the second row for the columns block
  const contentRow = colEls.map((col) => {
    // Find the main wrapper inside each column
    const wrapper = col.querySelector('.fusion-column-wrapper') || col;
    // For robustness, collect all direct children of the wrapper
    const children = Array.from(wrapper.children);
    // If only one child, use it directly; if multiple, use all
    if (children.length === 1) {
      return children[0];
    }
    return children;
  });

  // Build the table rows
  const headerRow = ['Columns (columns4)'];
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
