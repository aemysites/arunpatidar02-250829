/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards20)'];
  const cells = [headerRow];

  // Defensive: get all immediate card columns
  const cardColumns = element.querySelectorAll(':scope > .fusion-builder-row > .fusion-layout-column');

  cardColumns.forEach((col) => {
    // Each card's wrapper
    const wrapper = col.querySelector('.fusion-column-wrapper');
    if (!wrapper) return;

    // Icon (first cell)
    const icon = wrapper.querySelector('i');
    // Defensive: if icon missing, skip
    if (!icon) return;

    // Text content (second cell)
    const textBlock = wrapper.querySelector('.fusion-text');
    // Defensive: if text missing, skip
    if (!textBlock) return;

    // CTA button (optional)
    const ctaWrapper = wrapper.querySelector('div[style*="text-align:center"]');
    let cta = null;
    if (ctaWrapper) {
      cta = ctaWrapper.querySelector('a');
    }

    // Compose second cell: text + CTA
    const textCellContent = [];
    textCellContent.push(textBlock);
    if (cta) textCellContent.push(cta);

    // Add row: [icon, text+cta]
    cells.push([
      icon,
      textCellContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
