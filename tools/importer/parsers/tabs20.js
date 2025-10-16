/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab navigation list
  const navList = element.querySelector('.cmp-contentnavigation__list--primary');
  if (!navList) return;
  const tabItems = Array.from(navList.querySelectorAll('.cmp-contentnavigation__list-item'));
  if (!tabItems.length) return;

  // Always use the required header row
  const headerRow = ['Tabs (tabs20)'];
  const rows = [headerRow];

  tabItems.forEach((item) => {
    // Tab label: get text from anchor, fallback to button/span
    let tabLabel = '';
    const link = item.querySelector('a');
    if (link) {
      tabLabel = link.textContent.trim();
    } else {
      const btn = item.querySelector('button, span');
      tabLabel = btn ? btn.textContent.trim() : '';
    }
    // No content panels in source HTML, so leave content cell empty
    rows.push([tabLabel, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
