/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get absolute image src
  function getAbsoluteSrc(src) {
    if (!src) return '';
    if (src.startsWith('http')) return src;
    if (src.startsWith('//')) return window.location.protocol + src;
    return src;
  }

  // Find the Revolution Slider module
  const sliderWrap = element.querySelector('.fusion-slider-revolution rs-module-wrap, .fusion-slider-revolution rs-module');
  if (!sliderWrap) return;

  // Find the rs-module (may be the sliderWrap itself)
  let rsModule = sliderWrap.querySelector('rs-module');
  if (!rsModule && sliderWrap.tagName && sliderWrap.tagName.toLowerCase() === 'rs-module') {
    rsModule = sliderWrap;
  }
  if (!rsModule) return;

  // Find all slides
  const slides = rsModule.querySelectorAll('rs-slide');
  if (!slides.length) return;

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Carousel (carousel9)']);

  slides.forEach((slide) => {
    // --- IMAGE CELL ---
    // Find the image inside the slide
    let imgEl = null;
    // Look for rs-layer[data-type="image"]
    const imgLayer = slide.querySelector('rs-layer[data-type="image"] img');
    if (imgLayer) {
      // Create a new <img> with absolute src
      const src = getAbsoluteSrc(imgLayer.getAttribute('src'));
      imgEl = document.createElement('img');
      imgEl.src = src;
      imgEl.alt = imgLayer.alt || '';
      if (imgLayer.hasAttribute('width')) imgEl.setAttribute('width', imgLayer.getAttribute('width'));
      if (imgLayer.hasAttribute('height')) imgEl.setAttribute('height', imgLayer.getAttribute('height'));
      imgEl.style.borderRadius = '50%';
      imgEl.style.width = '100%';
      imgEl.style.maxWidth = '323px';
      imgEl.style.height = 'auto';
    }

    // --- TEXT CELL ---
    // Find the main text layer (usually rs-layer[data-type="text"] with a long text)
    let textLayer = null;
    const textLayers = slide.querySelectorAll('rs-layer[data-type="text"]');
    // Heuristic: pick the one with the most textContent
    let maxLen = 0;
    textLayers.forEach((layer) => {
      const len = (layer.textContent || '').length;
      if (len > maxLen) {
        maxLen = len;
        textLayer = layer;
      }
    });

    // Compose the text cell
    const textCell = document.createElement('div');
    textCell.style.display = 'flex';
    textCell.style.flexDirection = 'column';
    textCell.style.justifyContent = 'center';
    textCell.style.height = '100%';
    // Add quote icon if present
    const quoteLayer = slide.querySelector('rs-layer i.fa-quote-right');
    if (quoteLayer) {
      const quoteIcon = quoteLayer.cloneNode(true);
      quoteIcon.style.color = '#0063be';
      quoteIcon.style.fontSize = '2em';
      quoteIcon.style.marginBottom = '0.5em';
      textCell.appendChild(quoteIcon);
    }
    // Add main text
    if (textLayer) {
      // Split out the name/title if it's in a <span> at the end
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = textLayer.innerHTML;
      // Remove empty <br>s at the end
      while (tempDiv.lastChild && tempDiv.lastChild.nodeName === 'BR') {
        tempDiv.removeChild(tempDiv.lastChild);
      }
      // Find the last <span> for name/title
      const spans = tempDiv.querySelectorAll('span');
      let nameSpan = null;
      if (spans.length) {
        nameSpan = spans[spans.length - 1];
        nameSpan.style.fontWeight = 'bold';
        nameSpan.style.display = 'block';
        nameSpan.style.marginTop = '1em';
      }
      // Remove the name span from the main text
      if (nameSpan) nameSpan.parentNode.removeChild(nameSpan);
      // Main text (description)
      const descDiv = document.createElement('div');
      descDiv.innerHTML = tempDiv.innerHTML;
      descDiv.style.marginBottom = '0.5em';
      textCell.appendChild(descDiv);
      // Name/title
      if (nameSpan) {
        textCell.appendChild(nameSpan);
      }
    }

    rows.push([
      imgEl || '',
      textCell
    ]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
