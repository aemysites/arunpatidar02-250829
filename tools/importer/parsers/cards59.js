/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each column
  function extractCard(cardColumn) {
    // Defensive: find the teaser content
    const teaserContent = cardColumn.querySelector('.cmp-teaser-content');
    if (!teaserContent) return [document.createElement('div'), document.createElement('div')];

    // Image cell
    let imageEl = null;
    const imageWrap = teaserContent.querySelector('.cmp-image');
    if (imageWrap) {
      imageEl = imageWrap.querySelector('img');
    }
    // Defensive fallback
    if (!imageEl) {
      imageEl = document.createElement('div');
    }

    // Text cell
    const textCellContent = [];
    // Find the content wrapper
    const contentWrap = teaserContent.querySelector('.cmp-teaser__content');
    if (contentWrap) {
      // Pretitle (date/category)
      const pretitle = contentWrap.querySelector('.cmp-teaser__pretitle');
      if (pretitle) textCellContent.push(pretitle);
      // Title (h4)
      const title = contentWrap.querySelector('.cmp-title__text');
      if (title) textCellContent.push(title);
      // Description
      const desc = contentWrap.querySelector('.cmp-teaser__description');
      if (desc) textCellContent.push(desc);
      // CTA link ("ARTIKEL LESEN")
      const ctaLink = contentWrap.querySelector('.cmp-link');
      if (ctaLink) textCellContent.push(ctaLink);
    }
    // Defensive fallback
    if (textCellContent.length === 0) {
      textCellContent.push(document.createElement('div'));
    }
    return [imageEl, textCellContent];
  }

  // Get all direct card columns
  const cardColumns = element.querySelectorAll(':scope .aem-GridColumn');
  const rows = [];
  // Header row
  rows.push(['Cards (cards59)']);
  // Card rows
  cardColumns.forEach((col) => {
    rows.push(extractCard(col));
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
