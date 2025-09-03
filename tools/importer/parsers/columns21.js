/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process <ol> with certificate items
  if (!element || !element.matches('ol.cmp-certificate-feed__result-list')) return;

  // Table header row as required
  const headerRow = ['Columns (columns21)'];
  const rows = [headerRow];

  // Get all certificate items
  const items = element.querySelectorAll(':scope > li.cmp-certificate-feed__result-item');

  items.forEach((item) => {
    // Each column: title, type, date, downloads
    // Defensive: fallback to empty string if not found
    let title = item.querySelector('.cmp-certificate-feed__result-title');
    let type = item.querySelector('.cmp-certificate-feed__result-type');
    let date = item.querySelector('.cmp-certificate-feed__result-date');
    let downloads = item.querySelector('.cmp-certificate-feed__result-download');

    // For downloads, combine all download links into a fragment
    let downloadLinks = [];
    if (downloads) {
      const spans = downloads.querySelectorAll('.cmp-certificate-feed__result-download-item');
      spans.forEach((span) => {
        // Use the span directly for icon + link text
        downloadLinks.push(span);
      });
    }

    // Compose the row: 4 columns
    const row = [
      title || '',
      type || '',
      date || '',
      downloadLinks.length > 0 ? downloadLinks : '',
    ];
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
