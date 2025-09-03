/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get tab labels and tab panels
  function getTabsAndPanels(root) {
    const tabLabels = [];
    const tabPanels = [];
    // Find the cmp-tabs block
    const tabsBlock = root.querySelector('.cmp-tabs');
    if (!tabsBlock) return { tabLabels, tabPanels };
    // Get tab labels
    const tabList = tabsBlock.querySelector('.cmp-tabs__tablist');
    if (tabList) {
      tabLabels.push(...Array.from(tabList.children).map(li => li.textContent.trim()));
    }
    // Get tab panels
    const panels = tabsBlock.querySelectorAll('.cmp-tabs__tabpanel');
    panels.forEach(panel => {
      tabPanels.push(panel);
    });
    return { tabLabels, tabPanels };
  }

  // Defensive: ensure we only parse the intended tabs block
  const { tabLabels, tabPanels } = getTabsAndPanels(element);
  if (!tabLabels.length || !tabPanels.length) return;

  // Table header
  const headerRow = ['Tabs (tabs38)'];
  const rows = [headerRow];

  // For each tab, add a row: [label, content]
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const panel = tabPanels[i];
    // Defensive: skip if panel missing
    if (!panel) continue;
    // Compose tab content: grab everything inside the tabpanel
    // Usually a single .tab.container.responsivegrid.cmp-component
    const tabContent = [];
    // Get all direct children of the tab panel
    const tabChildren = Array.from(panel.children);
    tabChildren.forEach(child => {
      tabContent.push(child);
    });
    // If no children, fallback to panel itself
    if (tabContent.length === 0) tabContent.push(panel);
    rows.push([label, tabContent]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
