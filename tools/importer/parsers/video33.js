/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract YouTube video ID from iframe src
  function extractYouTubeId(src) {
    const match = src.match(/(?:youtube(?:-nocookie)?\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  // Find the iframe inside the video block
  const iframe = element.querySelector('iframe');
  let videoUrl = '';
  if (iframe) {
    const src = iframe.getAttribute('data-src') || iframe.getAttribute('src') || '';
    const ytId = extractYouTubeId(src);
    if (ytId) {
      videoUrl = `https://www.youtube.com/watch?v=${ytId}`;
    } else if (src) {
      videoUrl = src;
    }
  }

  // Collect all text content from the consent and info area, preserving links and structure
  const consentDiv = element.querySelector('.cmp-video__consent');
  let consentContent = [];
  if (consentDiv) {
    // Clone the consentDiv to preserve structure
    const clone = consentDiv.cloneNode(true);
    // Remove any script/style tags if present
    clone.querySelectorAll('script,style').forEach(e => e.remove());
    // Remove empty <br> tags
    clone.querySelectorAll('br').forEach(e => e.remove());
    // Remove icons
    clone.querySelectorAll('i').forEach(e => e.remove());
    // Remove empty spans
    clone.querySelectorAll('span').forEach(span => {
      if (!span.textContent.trim() && !span.querySelector('a')) span.remove();
    });
    // Remove classes for clean output
    clone.querySelectorAll('[class]').forEach(e => e.removeAttribute('class'));
    // Remove data-* attributes
    clone.querySelectorAll('*').forEach(e => {
      [...e.attributes].forEach(attr => {
        if (attr.name.startsWith('data-')) e.removeAttribute(attr.name);
      });
    });
    // Flatten unnecessary wrappers
    while (clone.childNodes.length === 1 && clone.firstChild.nodeType === 1) {
      clone.replaceWith(...clone.childNodes);
    }
    consentContent.push(clone);
  }

  // Build the video cell
  const cellContent = [];
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cellContent.push(link);
  }
  if (consentContent.length) {
    cellContent.push(...consentContent);
  }

  // Compose the table rows
  const headerRow = ['Video (video33)'];
  const contentRow = [cellContent.length ? cellContent : ''];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(block);
}
