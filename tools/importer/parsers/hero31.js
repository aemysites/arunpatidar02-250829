/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block guidelines
  const headerRow = ['Hero (hero31)'];

  // Always include the image row (empty if no image)
  let imageRow = [''];
  const img = element.querySelector('img');
  if (img) {
    imageRow = [img];
  }

  // Content row: headline, subheading, CTA (all optional)
  const content = [];
  // Headline (h2)
  const h2 = element.querySelector('h2.cmp-title__text');
  if (h2) content.push(h2);
  // Subheading (none in provided HTML, but code is flexible)
  const subheading = element.querySelector('h3, h4, .subheading');
  if (subheading) content.push(subheading);
  // CTA (link)
  const cta = element.querySelector('a');
  if (cta) content.push(cta);
  const contentRow = [content.length ? content : ''];

  // Compose the table rows: always header, always image (even if empty), then content
  const cells = [headerRow, imageRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
