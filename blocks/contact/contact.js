import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const title = rows[0];
  const imageRow = rows[1];
  const descriptionRow = rows[2];
  const link = rows[3];

  const fragment = document.createDocumentFragment();
  block.textContent = '';

  if (title) {
    title.className = 'contact-title';
    fragment.append(title);
  }

  if (imageRow) {
    imageRow.className = 'contact-icon';
    const imgs = imageRow.querySelectorAll('picture > img');
    imgs.forEach((img) => {
      const optimized = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(img, optimized.querySelector('img'));
      img.closest('picture').replaceWith(optimized);
    });
    fragment.append(imageRow);
  }

  if (descriptionRow) {
    descriptionRow.className = 'contact-description';
    fragment.append(descriptionRow);
  }

  if (link) {
    link.className = 'contact-link';
    fragment.append(link);
  }

  block.append(fragment);
}
