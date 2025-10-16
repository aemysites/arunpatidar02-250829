/* global WebImporter */
export default function parse(element, { document }) {
  // Tabs (tabs14) block: extract tab labels only, since no tab content is present in source HTML

  // Header row as required
  const headerRow = ['Tabs (tabs14)'];

  // Find the tab navigation list
  const navList = element.querySelector('.cmp-contentnavigation__list');

  // Defensive: if no tabs found, remove element and exit
  if (!navList) {
    element.replaceWith(document.createElement('div'));
    return;
  }

  // Get all tab items (each <li> with a tab label <a>)
  const tabItems = Array.from(navList.querySelectorAll('.cmp-contentnavigation__list-item'));

  // Compose rows: for each tab, include label and empty content cell
  const rows = tabItems.map((li) => {
    const link = li.querySelector('a');
    let label = '';
    if (link) {
      label = link.textContent.trim();
    }
    // No tab content in source HTML, so leave content cell empty
    return [label, ''];
  });

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
