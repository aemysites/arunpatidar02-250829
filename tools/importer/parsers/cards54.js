/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all card columns (non-empty)
  const cardColumns = Array.from(
    element.querySelectorAll(':scope .aem-GridColumn')
  ).filter(col => col.querySelector('.cmp-teaser-content'));

  // Table header
  const headerRow = ['Cards (cards54)'];
  const rows = [headerRow];

  cardColumns.forEach(col => {
    const teaserContent = col.querySelector('.cmp-teaser-content');
    if (!teaserContent) return;
    const teaser = teaserContent.querySelector('.cmp-teaser');
    if (!teaser) return;

    // Image cell
    let imageCell = null;
    const teaserImageDiv = teaser.querySelector('.cmp-teaser__image');
    if (teaserImageDiv) {
      // Find the actual image element
      const img = teaserImageDiv.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }

    // Text cell
    const textContent = [];
    // Title (h3)
    const titleDiv = teaser.querySelector('.cmp-title');
    if (titleDiv) {
      const h3 = titleDiv.querySelector('h3');
      if (h3) textContent.push(h3);
    }
    // Description (p)
    const descDiv = teaser.querySelector('.cmp-teaser__description');
    if (descDiv) {
      const p = descDiv.querySelector('p');
      if (p) textContent.push(p);
    }
    // CTA link
    const actionContainer = teaser.querySelector('.cmp-teaser__action-container');
    if (actionContainer) {
      const link = actionContainer.querySelector('a.cmp-link');
      if (link) textContent.push(link);
    }

    rows.push([
      imageCell,
      textContent
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
