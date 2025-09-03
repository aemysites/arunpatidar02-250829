/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a cmp-teaser-content block
  function extractCard(teaserContent) {
    // Defensive selectors
    const teaser = teaserContent.querySelector('.cmp-teaser');
    if (!teaser) return null;

    // Image: find .cmp-teaser__image img
    let imgEl = null;
    const imgContainer = teaser.querySelector('.cmp-teaser__image');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Text: title, description, CTA
    const content = teaser.querySelector('.cmp-teaser__content');
    let titleEl = null;
    let descEl = null;
    let ctaEl = null;
    if (content) {
      // Title
      const titleWrap = content.querySelector('.cmp-title');
      if (titleWrap) {
        titleEl = titleWrap.querySelector('h3, .cmp-title__text');
      }
      // Description
      descEl = content.querySelector('.cmp-teaser__description');
      // CTA (call-to-action)
      const actionContainer = content.querySelector('.cmp-teaser__action-container');
      if (actionContainer) {
        ctaEl = actionContainer.querySelector('a.cmp-link');
      }
    }

    // Compose text cell
    const textCell = [];
    if (titleEl) textCell.push(titleEl);
    if (descEl) textCell.push(descEl);
    if (ctaEl) textCell.push(ctaEl);

    // Compose row: [image, text]
    return [imgEl, textCell];
  }

  // Find all cmp-teaser-content blocks in the grid
  // Defensive: look for .cmp-teaser-content inside immediate grid columns
  let cardRows = [];
  // Always start with header
  const headerRow = ['Cards (cards1)'];

  // Find all grid columns in this block
  const grid = element.querySelector('.aem-Grid');
  if (grid) {
    const columns = grid.querySelectorAll(':scope > .aem-GridColumn');
    columns.forEach(col => {
      const teaserContent = col.querySelector('.cmp-teaser-content');
      if (teaserContent) {
        const card = extractCard(teaserContent);
        if (card) cardRows.push(card);
      }
    });
  }

  // If no grid, fallback: look for .cmp-teaser-content directly
  if (cardRows.length === 0) {
    const teasers = element.querySelectorAll('.cmp-teaser-content');
    teasers.forEach(teaserContent => {
      const card = extractCard(teaserContent);
      if (card) cardRows.push(card);
    });
  }

  // Build table
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
