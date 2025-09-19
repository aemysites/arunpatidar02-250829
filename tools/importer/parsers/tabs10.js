/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab links from the main nav (not dropdown)
  const nav = element.querySelector('.rad-subnav-bar__links');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a.subnav-bar__link--anchor'));

  // Defensive: If no links, nothing to do
  if (!links.length) return;

  // Header row as required
  const headerRow = ['Tabs (tabs10)'];

  // Use the nav bar title as the content for each tab (the only visible block-level text)
  const title = element.querySelector('.rad-subnav-bar__title');
  const tabContent = title ? title.textContent.trim() : '';

  // Each row: [tab label, tab content]
  const cells = [headerRow];
  links.forEach(link => {
    const label = link.querySelector('.rad-subnav-bar__link-text')?.textContent.trim() || link.textContent.trim();
    cells.push([label, tabContent]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
