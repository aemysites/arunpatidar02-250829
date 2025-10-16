/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate child divs
  // Find the background image: look for .cmp-image inside .backgroundmedia
  let bgImg = null;
  const bgImgDiv = element.querySelector('.backgroundmedia .cmp-image');
  if (bgImgDiv) {
    const img = bgImgDiv.querySelector('img');
    if (img) {
      bgImg = img;
    }
  }

  // Find the overlay container with text and CTA
  let overlayContainer = element.querySelector('.cmp-backgroundmedia__overlay');

  // Defensive: If overlay not found, fallback to searching for .cmp-title
  let title = null, subheading = null, cta = null;
  if (overlayContainer) {
    // Find main heading (h1)
    const h1 = overlayContainer.querySelector('h1');
    if (h1) title = h1;
    // Find subheading (p inside .cmp-title--branding)
    const branding = overlayContainer.querySelector('.cmp-title--branding p');
    if (branding) subheading = branding;
    // Find CTA button (a.cmp-button)
    const button = overlayContainer.querySelector('a.cmp-button');
    if (button) cta = button;
  } else {
    // Fallback: search whole element
    const h1 = element.querySelector('h1');
    if (h1) title = h1;
    const branding = element.querySelector('.cmp-title--branding p');
    if (branding) subheading = branding;
    const button = element.querySelector('a.cmp-button');
    if (button) cta = button;
  }

  // Compose the text block (title, subheading, CTA)
  const textBlock = [];
  if (title) textBlock.push(title);
  if (subheading) textBlock.push(subheading);
  if (cta) textBlock.push(cta);

  // Table rows
  const headerRow = ['Hero (hero23)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [textBlock.length ? textBlock : ''];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
