/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block container
  const stage = element.querySelector('.cmp-stage-fullscreen');
  if (!stage) return;

  // --- 1. HEADER ROW ---
  const headerRow = ['Hero (hero6)'];

  // --- 2. IMAGE/VIDEO ROW ---
  let mediaCell = '';
  const mediaSection = stage.querySelector('.cmp-stage-fullscreen__media');
  if (mediaSection) {
    // Try image first
    const img = mediaSection.querySelector('img');
    if (img) {
      mediaCell = img;
    } else {
      // Try video
      const video = mediaSection.querySelector('video');
      if (video && video.src) {
        // Use video poster if available, else video src
        const poster = video.getAttribute('poster');
        if (poster) {
          const imgEl = document.createElement('img');
          imgEl.src = poster;
          mediaCell = imgEl;
        } else {
          // Use video src as a link
          const videoLink = document.createElement('a');
          videoLink.href = video.src;
          videoLink.textContent = video.src;
          mediaCell = videoLink;
        }
      }
    }
  }

  // --- 3. CONTENT ROW ---
  const contentSection = stage.querySelector('.cmp-stage-fullscreen__container .cmp-container .cmp-stage-fullscreen__content');
  let contentCell = document.createElement('div');
  if (contentSection) {
    // Title (h1)
    const h1 = contentSection.querySelector('h1');
    if (h1) {
      contentCell.appendChild(h1.cloneNode(true));
    }
    // Subheading (paragraph)
    const paragraphs = contentSection.querySelectorAll('.cmp-text p');
    paragraphs.forEach(p => {
      contentCell.appendChild(p.cloneNode(true));
    });
    // CTA (button/link)
    const cta = contentSection.querySelector('.cmp-button');
    if (cta) {
      contentCell.appendChild(cta.cloneNode(true));
    }
  }
  // If nothing found, fallback to empty string
  if (!contentCell.hasChildNodes()) contentCell = '';

  // --- Build Table ---
  const cells = [
    headerRow,
    [mediaCell],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
