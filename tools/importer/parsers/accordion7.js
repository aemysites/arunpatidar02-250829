/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the actual accordion root (may be nested in a cmp-container)
  let accordion = element.querySelector('.cmp-accordion');
  if (!accordion) {
    // fallback: maybe element itself is the accordion
    if (element.classList.contains('cmp-accordion')) {
      accordion = element;
    } else {
      // fallback: search deeper
      accordion = element.querySelector('[data-cmp-hook-accordion="item"]')?.parentElement;
    }
  }
  if (!accordion) return;

  // Build header row
  const headerRow = ['Accordion (accordion7)'];
  const rows = [headerRow];

  // Get all accordion items
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');
  items.forEach(item => {
    // Title cell: get the .cmp-accordion__title span text
    let title = '';
    const titleSpan = item.querySelector('.cmp-accordion__title');
    if (titleSpan) {
      title = titleSpan.textContent.trim();
    }

    // Content cell: get the panel content
    let contentCell = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Defensive: find the first non-empty content container inside the panel
      // Usually it's a .container or .download or .text-media, etc.
      // We'll grab all direct children of the panel except for empty divs
      // If only one main content block, use it directly
      // If multiple, put them in an array
      const contentBlocks = [];
      // Only consider direct children that are not empty
      Array.from(panel.children).forEach(child => {
        // If child is a known wrapper (container, responsivegrid, etc), go one level deeper
        if (
          child.classList.contains('container') ||
          child.classList.contains('responsivegrid') ||
          child.classList.contains('cmp-container') ||
          child.classList.contains('cmp-container-grid') ||
          child.classList.contains('aem-Grid') ||
          child.classList.contains('aem-GridColumn')
        ) {
          // Recursively collect non-empty descendants
          Array.from(child.querySelectorAll(':scope > *')).forEach(grandchild => {
            if (grandchild.textContent.trim() || grandchild.querySelector('a, img, video, iframe')) {
              contentBlocks.push(grandchild);
            }
          });
        } else if (child.textContent.trim() || child.querySelector('a, img, video, iframe')) {
          contentBlocks.push(child);
        }
      });
      // If nothing found, fallback to panel's innerHTML as a string
      if (contentBlocks.length === 0) {
        contentCell = panel.innerHTML.trim();
      } else if (contentBlocks.length === 1) {
        contentCell = contentBlocks[0];
      } else {
        contentCell = contentBlocks;
      }
    }
    rows.push([title, contentCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
