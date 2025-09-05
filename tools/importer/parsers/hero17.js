/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract background image from .parallax-inner
  const bgDiv = element.querySelector('.parallax-inner');
  let bgImgEl = '';
  if (bgDiv) {
    const bgUrl = bgDiv.style.backgroundImage;
    if (bgUrl && bgUrl.includes('url(')) {
      const urlMatch = bgUrl.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = '';
        bgImgEl = img;
      }
    }
  }

  // 2. Extract content column (text + CTA)
  // Find the first .fusion-layout-column inside .fusion-builder-row
  let contentCol = element.querySelector('.fusion-builder-row .fusion-layout-column');

  // 3. Extract heading (h2)
  let heading = '';
  if (contentCol) {
    const h2 = contentCol.querySelector('h2');
    if (h2) {
      // Preserve line breaks and strong styling
      heading = h2.cloneNode(true);
    }
  }

  // 4. Extract CTA button (a)
  let cta = '';
  if (contentCol) {
    const a = contentCol.querySelector('a');
    if (a) {
      cta = a.cloneNode(true);
    }
  }

  // 5. Compose content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (cta) contentCell.push(cta);

  // 6. Build table rows
  const headerRow = ['Hero (hero17)'];
  const bgRow = [bgImgEl ? bgImgEl : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
