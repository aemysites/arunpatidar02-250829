/* global WebImporter */
export default function parse(element, { document }) {
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');

  const headerRow = ['Accordion (accordion69)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell
    let title = '';
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }
    if (!title) title = 'Accordion Item';

    // Content cell: extract only meaningful content, remove empty grid columns
    let contentCell = '';
    const panel = item.querySelector('.cmp-accordion__panel');
    if (panel) {
      // Find the first .cmp-container inside the panel
      const cmpContainer = panel.querySelector('.cmp-container');
      if (cmpContainer) {
        // Remove all empty .aem-GridColumn elements
        cmpContainer.querySelectorAll('.aem-GridColumn').forEach((col) => {
          if (!col.textContent.trim() && !col.querySelector('a, img, ul, ol, p, span')) {
            col.remove();
          }
        });
        contentCell = cmpContainer.cloneNode(true);
      } else {
        // fallback: use the panel itself, but remove empty grid columns
        const panelClone = panel.cloneNode(true);
        panelClone.querySelectorAll('.aem-GridColumn').forEach((col) => {
          if (!col.textContent.trim() && !col.querySelector('a, img, ul, ol, p, span')) {
            col.remove();
          }
        });
        contentCell = panelClone;
      }
    }
    rows.push([title, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
