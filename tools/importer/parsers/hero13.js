/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero13)'];

  // 2. Find the background image (prefer <img> inside .cmp-video__poster)
  let bgImage = null;
  const posterImg = element.querySelector('.cmp-video__poster');
  if (posterImg) {
    bgImage = posterImg;
  } else {
    // Fallback: look for any <img> inside a .backgroundmedia or .cmp-backgroundmedia
    bgImage = element.querySelector('.backgroundmedia img, .cmp-backgroundmedia img');
  }

  // 3. Find the main heading and subheading
  // Main heading: <h1> inside .cmp-title (headline)
  let heading = null;
  const headlineTitle = element.querySelector('.title.style-title--headline-1 .cmp-title__text');
  if (headlineTitle) {
    heading = headlineTitle;
  } else {
    // Fallback: any <h1>
    heading = element.querySelector('h1');
  }

  // Subheading: <p> inside .cmp-title--branding or subsection title
  let subheading = null;
  const subTitle = element.querySelector('.title.style-title--subsection-1 .cmp-title__text, .cmp-title--branding .cmp-title__text');
  if (subTitle) {
    subheading = subTitle;
  } else {
    // Fallback: any <p> after heading
    if (heading && heading.parentElement) {
      const nextP = heading.parentElement.querySelector('p');
      if (nextP) {
        subheading = nextP;
      }
    }
  }

  // 4. Find CTA (call-to-action) if present (look for <a> or <button> in text area)
  let cta = null;
  // Search inside the text area containers
  const textContainers = Array.from(element.querySelectorAll('.title, .cmp-title'));
  for (const container of textContainers) {
    cta = container.querySelector('a, button');
    if (cta) break;
  }

  // 5. Compose the text cell
  const textCellContent = [];
  if (heading) textCellContent.push(heading);
  if (subheading) textCellContent.push(subheading);
  if (cta) textCellContent.push(cta);

  // 6. Table rows
  const rows = [
    headerRow,
    [bgImage ? bgImage : ''],
    [textCellContent.length ? textCellContent : ''],
  ];

  // 7. Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
