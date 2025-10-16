/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Video (video8) block
  const headerRow = ['Video (video8)'];

  // Find poster image
  const posterImgEl = element.querySelector('.cmp-video__poster');
  // Find video source URL
  const videoPlayer = element.querySelector('.cmp-video__video-player');
  let videoUrl = '';
  if (videoPlayer) {
    videoUrl = videoPlayer.getAttribute('data-src-large') || videoPlayer.getAttribute('src') || '';
  }

  // Find visible timestamp (duration)
  let timestamp = '';
  const currentTimeEl = element.querySelector('.cmp-duration__current-time');
  const totalTimeEl = element.querySelector('.cmp-duration__total-time');
  if (currentTimeEl && totalTimeEl) {
    timestamp = `${currentTimeEl.textContent.trim()} / ${totalTimeEl.textContent.trim()}`;
  }

  // Extract aria-label and aria-description from the video element if present
  let videoLabel = '';
  let videoDesc = '';
  if (videoPlayer) {
    videoLabel = videoPlayer.getAttribute('aria-label') || '';
    videoDesc = videoPlayer.getAttribute('aria-description') || '';
  }

  // Compose cell contents with clear separation
  const cellContents = [];
  if (posterImgEl) cellContents.push(posterImgEl);
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cellContents.push(link);
  }
  if (timestamp) {
    const tsDiv = document.createElement('div');
    tsDiv.textContent = timestamp;
    cellContents.push(tsDiv);
  }
  if (videoLabel) {
    const labelDiv = document.createElement('div');
    labelDiv.textContent = videoLabel;
    cellContents.push(labelDiv);
  }
  if (videoDesc && videoDesc !== videoLabel) {
    const descDiv = document.createElement('div');
    descDiv.textContent = videoDesc;
    cellContents.push(descDiv);
  }

  // If nothing found, fallback to the whole element
  if (cellContents.length === 0) {
    cellContents.push(element);
  }

  // Build the table
  const rows = [
    headerRow,
    [cellContents]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
