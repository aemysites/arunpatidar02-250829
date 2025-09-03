/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Get tab labels from the tablist
  const tablist = element.querySelector('.cmp-tabs__tablist');
  const tabLabels = tablist ? Array.from(tablist.querySelectorAll('.cmp-tabs__tab')).map(tab => tab.textContent.trim()) : [];

  // 2. Get tab panels (content for each tab)
  const tabPanels = Array.from(element.querySelectorAll('[data-cmp-hook-tabs="tabpanel"]'));

  // Defensive: If no tabs or panels, do nothing
  if (!tabLabels.length || !tabPanels.length) return;

  // 3. Build rows: header first, then one row per tab (label, content)
  const rows = [];
  const headerRow = ['Tabs (tabs13)'];
  rows.push(headerRow);

  // For each tab, get label and content
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const panel = tabPanels[i];
    if (!panel) continue; // Defensive: skip if missing

    // Find the main content container inside the tabpanel
    // Usually it's the first .tab.container or .tab.container > div > .aem-Grid
    let tabContent = null;
    // Try to find the .tab.container
    tabContent = panel.querySelector('.tab.container');
    // If not found, fallback to the panel itself
    if (!tabContent) tabContent = panel;

    // Defensive: If tabContent is empty, skip
    if (!tabContent) continue;

    // Place label and content in the row
    rows.push([label, tabContent]);
  }

  // 4. Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
