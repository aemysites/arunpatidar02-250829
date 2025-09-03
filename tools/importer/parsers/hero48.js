/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the video src (as background asset)
  function getBackgroundAsset(el) {
    const video = el.querySelector('video[src]');
    if (video && video.getAttribute('src')) {
      // Accept video as background asset if no image is present
      const link = document.createElement('a');
      link.href = video.getAttribute('src');
      link.textContent = video.getAttribute('src');
      return link;
    }
    return '';
  }

  // Helper to extract all visible text content (title, subheading, etc.)
  function getTextContent(el) {
    // Use less specific selectors to capture all text
    // Try to find any text nodes inside the main content area
    let text = '';
    // Get all elements that could contain text
    const candidates = el.querySelectorAll('.cmp-stage-fullscreen__container, .cmp-stage-fullscreen__content, .cmp-container');
    candidates.forEach((container) => {
      // Get all text nodes inside this container
      container.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
          text += child.textContent.trim() + '\n';
        }
        if (child.nodeType === Node.ELEMENT_NODE) {
          const subText = child.textContent.trim();
          if (subText) text += subText + '\n';
        }
      });
    });
    return text.trim();
  }

  // 1. Header row
  const headerRow = ['Hero (hero48)'];

  // 2. Background asset row
  const backgroundAsset = getBackgroundAsset(element);
  const backgroundRow = [backgroundAsset];

  // 3. Content row (title, subheading, CTA)
  const textContent = getTextContent(element);
  // Only include the third row if there is actual content
  const contentRow = textContent ? [textContent] : null;

  // Always output three rows: header, background, content (empty if no content)
  const cells = [
    headerRow,
    backgroundRow,
    contentRow || ['']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
