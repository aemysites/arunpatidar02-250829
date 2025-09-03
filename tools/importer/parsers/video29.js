/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the video element inside the block
  const video = element.querySelector('video');
  let videoSrc = '';
  if (video) {
    // Prefer data-g-binding-video-src, fallback to src
    videoSrc = video.getAttribute('data-g-binding-video-src') || video.getAttribute('src') || '';
  }

  // Collect all text content from the block
  let textContent = '';
  // Get all text nodes inside the element (excluding script/style)
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (!node.parentElement || ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.textContent.trim()) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    }
  });
  let node;
  while ((node = walker.nextNode())) {
    textContent += node.textContent.trim() + ' ';
  }
  textContent = textContent.trim();

  // Create a link to the video file if a src is available
  let videoLink = null;
  if (videoSrc) {
    videoLink = document.createElement('a');
    videoLink.href = videoSrc;
    videoLink.textContent = videoSrc;
  }

  // Compose the table rows
  const headerRow = ['Video (video29)'];
  // Include both the video link and any text content
  const cellContent = [];
  if (videoLink) cellContent.push(videoLink);
  if (textContent) cellContent.push(textContent);
  const contentRow = [cellContent.length ? cellContent : ''];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
