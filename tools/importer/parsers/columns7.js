/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main rows (each with two columns)
  const rowContainers = Array.from(element.querySelectorAll('.style-common--cmp-spacing-top-16'));
  if (rowContainers.length < 2) return;

  // Helper to extract all text (heading + paragraph) from a column
  function extractText(col) {
    if (!col) return '';
    // Find all possible text blocks (title and paragraphs)
    const frag = document.createDocumentFragment();
    // Find all headings (prefer h3, fallback to any heading)
    const headings = col.querySelectorAll('.cmp-title__text, h1, h2, h3, h4, h5, h6');
    headings.forEach(h => {
      const h3 = document.createElement('h3');
      h3.textContent = h.textContent;
      frag.appendChild(h3);
    });
    // Find all paragraphs
    const paras = col.querySelectorAll('.cmp-text__paragraph, p');
    paras.forEach(p => {
      const para = document.createElement('p');
      para.textContent = p.textContent;
      frag.appendChild(para);
    });
    // If nothing found, fallback to all text content
    if (frag.childNodes.length === 0) {
      const text = col.textContent.trim();
      if (text) {
        const para = document.createElement('p');
        para.textContent = text;
        frag.appendChild(para);
      }
    }
    return frag.childNodes.length ? frag : '';
  }

  // Helper to extract video poster image from a column
  function extractVideo(col) {
    if (!col) return '';
    // Find the poster image in the video column
    const img = col.querySelector('img.cmp-video__poster');
    if (img) {
      const wrapper = document.createElement('div');
      wrapper.appendChild(img.cloneNode(true));
      // Try to include play button overlay if present
      const playBtn = col.querySelector('.cmp-progressiveplaybutton');
      if (playBtn) {
        wrapper.appendChild(playBtn.cloneNode(true));
      }
      return wrapper.childNodes.length ? wrapper : '';
    }
    return '';
  }

  // For each row, find the two main columns (7 and 5)
  function getColumns(rowEl) {
    if (!rowEl) return [null, null];
    // Use all columns that match either 7 or 5 (order matters)
    const cols = Array.from(rowEl.querySelectorAll('.aem-GridColumn--default--7, .aem-GridColumn--default--5'));
    return cols.length >= 2 ? [cols[0], cols[1]] : [null, null];
  }

  // First row: left is text, right is video
  const [row1Col1, row1Col2] = getColumns(rowContainers[0]);
  // Second row: left is video, right is text
  const [row2Col1, row2Col2] = getColumns(rowContainers[1]);

  const headerRow = ['Columns (columns7)'];
  const cells = [
    headerRow,
    [extractText(row1Col1), extractVideo(row1Col2)],
    [extractVideo(row2Col1), extractText(row2Col2)],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
