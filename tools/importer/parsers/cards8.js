/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a single card column
  function extractCard(cardColumn) {
    const card = cardColumn.querySelector('.cmp-related-article');
    if (!card) return [null, null];

    // Find the main link (wraps image, title, description)
    const mainLink = card.querySelector('a[href]:not(.cmp-link)');
    // Find the image (inside mainLink)
    let image = null;
    if (mainLink) {
      image = mainLink.querySelector('.cmp-image') || mainLink.querySelector('img');
    }

    // Compose the text cell by collecting all relevant content blocks
    const textCell = [];
    // Title (h4 inside .cmp-title)
    const titleDiv = card.querySelector('.cmp-title');
    if (titleDiv) {
      // Push the whole .cmp-title div to preserve heading and any extra content
      textCell.push(titleDiv);
    }
    // Description (all .cmp-text__paragraphs)
    const descDivs = card.querySelectorAll('.cmp-text__paragraph');
    descDivs.forEach(desc => textCell.push(desc));
    // CTA link (.cmp-link)
    const ctaLink = card.querySelector('a.cmp-link');
    if (ctaLink) {
      textCell.push(ctaLink);
    }

    // Defensive: If no text content found, fallback to all text within card
    if (textCell.length === 0) {
      // Get all text nodes inside card
      const allText = card.textContent.trim();
      if (allText) textCell.push(document.createTextNode(allText));
    }

    return [image, textCell];
  }

  // Get all direct card columns
  const cardColumns = element.querySelectorAll(':scope > .aem-GridColumn');
  const rows = [];
  for (const col of cardColumns) {
    const [img, text] = extractCard(col);
    // Only add row if at least one cell has content
    if (img || (Array.isArray(text) && text.length > 0)) {
      rows.push([img, text]);
    }
  }

  // Table header
  const headerRow = ['Cards (cards8)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
