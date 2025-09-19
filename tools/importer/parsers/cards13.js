/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image/icon from a card
  function getImageOrIcon(cardEl) {
    // Try image first
    const img = cardEl.querySelector('.rad-mosaic__image-card-image img');
    if (img) return img.cloneNode(true);
    // Fallback: any <img> inside card
    const anyImg = cardEl.querySelector('img');
    if (anyImg) return anyImg.cloneNode(true);
    // Fallback: SVG icon
    const svg = cardEl.querySelector('svg');
    if (svg) return svg.cloneNode(true);
    // If no image/icon, skip this card (do not add to table)
    return null;
  }

  // Helper to extract all text content from a card
  function getTextContent(cardEl) {
    const frag = document.createDocumentFragment();
    // Eyebrow (subtitle)
    const eyebrow = cardEl.querySelector('.rad-mosaic__card-description-eyebrow');
    if (eyebrow) {
      const eyebrowDiv = document.createElement('div');
      eyebrowDiv.textContent = eyebrow.textContent;
      frag.appendChild(eyebrowDiv);
    }
    // Title
    const title = cardEl.querySelector('.rad-mosaic__card-description-title');
    if (title) {
      const h = document.createElement('h4');
      h.textContent = title.textContent;
      frag.appendChild(h);
    }
    // Description: include all text nodes and <p> inside .rad-mosaic__card-description
    const descParent = cardEl.querySelector('.rad-mosaic__card-description');
    if (descParent) {
      descParent.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
          frag.appendChild(node.cloneNode(true));
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          frag.appendChild(document.createTextNode(node.textContent.trim()));
        }
      });
    }
    // Stat card: include stat value and detail if present
    const statFigure = cardEl.querySelector('.rad-mosaic__stat-card-stat-figure');
    const statText = cardEl.querySelector('.rad-mosaic__stat-card-stat-text');
    if (statFigure) {
      const statH = document.createElement('h4');
      statH.textContent = statFigure.textContent;
      frag.appendChild(statH);
    }
    if (statText) {
      const statDiv = document.createElement('div');
      statDiv.textContent = statText.textContent;
      frag.appendChild(statDiv);
    }
    // Call-to-Action (Read More)
    const ctaBtn = cardEl.querySelector('.rad-icon-button__text');
    if (ctaBtn && ctaBtn.textContent.trim()) {
      const cta = document.createElement('a');
      cta.textContent = ctaBtn.textContent.trim();
      let url = '';
      try {
        const dataLayer = cardEl.getAttribute('data-cmp-data-layer');
        if (dataLayer) {
          const obj = JSON.parse(dataLayer.replace(/&quot;/g, '"'));
          const key = Object.keys(obj)[0];
          url = obj[key]['xdm:linkURL'] || '';
        }
      } catch(e) {}
      if (url) cta.href = url;
      frag.appendChild(cta);
    }
    return frag;
  }

  const cards = Array.from(element.querySelectorAll(':scope > button.rad-mosaic__card'));
  const headerRow = ['Cards (cards13)'];
  const cells = [headerRow];

  cards.forEach((cardEl) => {
    const imageCell = getImageOrIcon(cardEl);
    if (!imageCell) return; // Only include cards with an image/icon
    const textCell = getTextContent(cardEl);
    cells.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
