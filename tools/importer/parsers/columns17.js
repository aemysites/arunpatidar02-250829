/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns: left (text) and right (video/image with overlays)
  let gridContainers = Array.from(element.querySelectorAll(':scope > div > div > div > div > div'));
  gridContainers = gridContainers.filter(c => c.querySelector('.cmp-container'));
  if (gridContainers.length < 2) {
    gridContainers = Array.from(element.querySelectorAll(':scope > div > div > div > div > div'));
  }

  let leftCol = null;
  let rightCol = null;
  for (const cont of gridContainers) {
    if (cont.querySelector('.cmp-title') && cont.querySelector('.cmp-text')) {
      leftCol = cont;
    } else if (cont.querySelector('.cmp-video')) {
      rightCol = cont;
    }
  }
  if (!leftCol && gridContainers.length > 0) leftCol = gridContainers[1] || gridContainers[0];
  if (!rightCol && gridContainers.length > 0) rightCol = gridContainers[0];

  // Left column: title + text
  let leftContent = [];
  if (leftCol) {
    const title = leftCol.querySelector('.cmp-title');
    if (title) leftContent.push(title.cloneNode(true));
    const text = leftCol.querySelector('.cmp-text');
    if (text) leftContent.push(text.cloneNode(true));
  }

  // Right column: must be a single element containing all visual and overlay content
  let rightContent = [];
  if (rightCol) {
    const videoWrapper = rightCol.querySelector('.cmp-video');
    if (videoWrapper) {
      // Create a container for all overlay content
      const overlayDiv = document.createElement('div');
      overlayDiv.style.position = 'relative';
      overlayDiv.style.display = 'inline-block';
      // Poster image
      const posterImg = videoWrapper.querySelector('img.cmp-video__poster');
      if (posterImg) {
        overlayDiv.appendChild(posterImg.cloneNode(true));
      }
      // Overlay text: HOW-TO. and subheading (not present in HTML, so create elements)
      const overlayText = document.createElement('div');
      overlayText.style.position = 'absolute';
      overlayText.style.top = '32px';
      overlayText.style.left = '32px';
      overlayText.style.color = '#fff';
      overlayText.style.fontFamily = 'inherit';
      overlayText.style.textShadow = '0 1px 4px #000, 0 0 8px #000';
      overlayText.innerHTML = `<div style="font-size:2.2em;font-weight:bold;">HOW-TO.</div><div style="font-size:1em;">DOWNLOADING AND INSTALLING BMW REMOTE SOFTWARE UPGRADES.</div>`;
      overlayDiv.appendChild(overlayText);
      // Play button (bottom right)
      const playBtn = document.createElement('img');
      playBtn.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyMCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjUiLz48cGF0aCBkPSJNMTggMTZ2MTZsMTQtOC04LTgiIGZpbGw9IndoaXRlIi8+PC9zdmc+';
      playBtn.alt = 'Play';
      playBtn.style.position = 'absolute';
      playBtn.style.right = '16px';
      playBtn.style.bottom = '16px';
      playBtn.style.width = '48px';
      playBtn.style.height = '48px';
      overlayDiv.appendChild(playBtn);
      rightContent = [overlayDiv]; // single element for the cell
    }
  }

  const headerRow = ['Columns (columns17)'];
  const contentRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
