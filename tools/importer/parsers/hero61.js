/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main teaser block
  const teaserBlock = element.querySelector('.cmp-teaser-block');
  if (!teaserBlock) return;

  // Find the image (background)
  let imageEl = null;
  const teaserImageWrap = teaserBlock.querySelector('.cmp-teaser__image');
  if (teaserImageWrap) {
    imageEl = teaserImageWrap.querySelector('img');
  }

  // Find the content area
  const teaserContent = teaserBlock.querySelector('.cmp-teaser__content');
  let titleEl = null;
  let descEl = null;
  let ctaEl = null;
  if (teaserContent) {
    // Title (h2)
    const titleWrap = teaserContent.querySelector('.cmp-title');
    if (titleWrap) {
      titleEl = titleWrap.querySelector('h2');
    }
    // Description (paragraph)
    const descWrap = teaserContent.querySelector('.cmp-teaser__description');
    if (descWrap) {
      descEl = descWrap.querySelector('p');
    }
    // CTA (button/link)
    const actionWrap = teaserContent.querySelector('.cmp-teaser__action-container');
    if (actionWrap) {
      ctaEl = actionWrap.querySelector('a');
    }
  }

  // Build table rows
  const headerRow = ['Hero (hero61)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [
    [
      titleEl ? titleEl : '',
      descEl ? descEl : '',
      ctaEl ? ctaEl : ''
    ].filter(Boolean)
  ];

  // Create the block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
