/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element is an OL with the right class
  if (!element || !element.matches('ol.cmp-certificate-feed__result-list')) return;

  // Table header as required
  const headerRow = ['Table (table40)'];
  const rows = [headerRow];

  // Get all certificate rows (LI elements)
  const items = element.querySelectorAll(':scope > li.cmp-certificate-feed__result-item');

  items.forEach((li) => {
    // Defensive: Get all relevant columns
    // 1. Title
    let title = '';
    const titleDiv = li.querySelector('.cmp-certificate-feed__result-title');
    if (titleDiv) {
      const p = titleDiv.querySelector('p');
      if (p) title = p.textContent.trim();
    }

    // 2. Type
    let type = '';
    const typeDiv = li.querySelector('.cmp-certificate-feed__result-type');
    if (typeDiv) {
      const p = typeDiv.querySelector('p');
      if (p) type = p.textContent.trim();
    }

    // 3. Date
    let date = '';
    const dateDiv = li.querySelector('.cmp-certificate-feed__result-date');
    if (dateDiv) {
      const p = dateDiv.querySelector('p');
      if (p) date = p.textContent.trim();
    }

    // 4. Downloads (can be multiple)
    const downloadDiv = li.querySelector('.cmp-certificate-feed__result-download');
    let downloads = [];
    if (downloadDiv) {
      // Each download is a span.cmp-certificate-feed__result-download-item
      const downloadItems = downloadDiv.querySelectorAll('.cmp-certificate-feed__result-download-item');
      downloads = Array.from(downloadItems).map((span) => {
        // Use the <a> directly (do not clone)
        const a = span.querySelector('a');
        return a ? a : null;
      }).filter(Boolean);
    }
    // If only one download, just use the element, else array
    let downloadCell = downloads.length === 1 ? downloads[0] : downloads;
    // If no downloads, use empty string
    if (downloads.length === 0) downloadCell = '';

    // Compose row
    rows.push([
      title,
      type,
      date,
      downloadCell
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
