/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cardsNoImages5)'];
  const rows = [headerRow];

  // Get all immediate card wrappers
  const cardWrappers = element.querySelectorAll(':scope > .cmp-floating-awards-card');

  cardWrappers.forEach((cardWrapper) => {
    // Defensive: find the card element inside the wrapper
    const card = cardWrapper.querySelector('.rad-awards-card');
    if (!card) return;

    // Try to get the card's main heading (button text is visible, h3 is aria-hidden)
    let headingText = '';
    const button = card.querySelector('.rad-awards-card__toggle');
    if (button && button.textContent.trim()) {
      headingText = button.textContent.trim();
    }

    // Try to get the subheader (optional)
    let subheaderText = '';
    const subheader = card.querySelector('.rad-awards-card__subheader');
    if (subheader && subheader.textContent.trim()) {
      subheaderText = subheader.textContent.trim();
    }

    // Try to get the description (optional)
    let descriptionNodes = [];
    const rte = card.querySelector('.rad-awards-card__rte');
    if (rte) {
      // Get all <p> elements that have non-empty text
      descriptionNodes = Array.from(rte.querySelectorAll('p'))
        .filter(p => p.textContent.trim() && p.textContent.replace(/\u00a0/g, '').trim())
        .map(p => p.cloneNode(true));
    }

    // Compose the cell content
    const cellContent = [];
    if (headingText) {
      const h3 = document.createElement('h3');
      h3.textContent = headingText;
      cellContent.push(h3);
    }
    if (subheaderText) {
      const h4 = document.createElement('h4');
      h4.textContent = subheaderText;
      cellContent.push(h4);
    }
    if (descriptionNodes.length) {
      cellContent.push(...descriptionNodes);
    }

    // If no description, try to get a fallback description from the card (for robustness)
    if (!descriptionNodes.length) {
      // Try to get the .rad-awards-card__description div's text (excluding subheader)
      const descDiv = card.querySelector('.rad-awards-card__description');
      if (descDiv) {
        // Remove subheader if present
        const descClone = descDiv.cloneNode(true);
        const h4Clone = descClone.querySelector('h4');
        if (h4Clone) h4Clone.remove();
        const descText = descClone.textContent.trim();
        if (descText) {
          const p = document.createElement('p');
          p.textContent = descText;
          cellContent.push(p);
        }
      }
    }

    // Add the row if we have at least a heading or description
    if (cellContent.length) {
      rows.push([cellContent]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
