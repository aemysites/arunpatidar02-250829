/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns
  const columns = Array.from(element.querySelectorAll(':scope > div.fusion-layout-column'));
  if (columns.length < 2) return;

  // --- First column: Text content ---
  const col1 = columns[0];
  const col1Wrapper = col1.querySelector('.fusion-column-wrapper');
  const col1Content = [];
  if (col1Wrapper) {
    Array.from(col1Wrapper.children).forEach((child) => {
      if (child.textContent.trim() || child.querySelector('a')) {
        col1Content.push(child.cloneNode(true));
      }
    });
  }

  // --- Second column: Image ---
  const col2 = columns[1];
  const col2Wrapper = col2.querySelector('.fusion-column-wrapper');
  let imgEl = null;
  if (col2Wrapper) {
    let imgUrl = col2Wrapper.getAttribute('data-bg-url');
    if (!imgUrl && col2Wrapper.style.backgroundImage) {
      const match = col2Wrapper.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
      if (match) imgUrl = match[1];
    }
    if (imgUrl) {
      imgEl = document.createElement('img');
      imgEl.src = imgUrl;
      imgEl.alt = '';
      imgEl.style.maxWidth = '100%';
      imgEl.style.height = 'auto';
    }
  }

  // Build table rows
  const headerRow = ['Columns (columns5)'];
  const contentRow = [col1Content, imgEl ? [imgEl] : []];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  if (table && element.parentNode) {
    element.parentNode.replaceChild(table, element);
  }
}
