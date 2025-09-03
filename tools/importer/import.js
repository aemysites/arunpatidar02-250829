/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import cardsNoImages4Parser from './parsers/cardsNoImages4.js';
import columns10Parser from './parsers/columns10.js';
import accordion7Parser from './parsers/accordion7.js';
import columns12Parser from './parsers/columns12.js';
import carousel3Parser from './parsers/carousel3.js';
import columns5Parser from './parsers/columns5.js';
import columns9Parser from './parsers/columns9.js';
import carousel2Parser from './parsers/carousel2.js';
import columns14Parser from './parsers/columns14.js';
import cards1Parser from './parsers/cards1.js';
import columns16Parser from './parsers/columns16.js';
import accordion11Parser from './parsers/accordion11.js';
import cards8Parser from './parsers/cards8.js';
import tabs13Parser from './parsers/tabs13.js';
import hero6Parser from './parsers/hero6.js';
import columns23Parser from './parsers/columns23.js';
import columns19Parser from './parsers/columns19.js';
import columns18Parser from './parsers/columns18.js';
import columns21Parser from './parsers/columns21.js';
import columns22Parser from './parsers/columns22.js';
import columns20Parser from './parsers/columns20.js';
import columns27Parser from './parsers/columns27.js';
import columns28Parser from './parsers/columns28.js';
import cards17Parser from './parsers/cards17.js';
import hero30Parser from './parsers/hero30.js';
import accordion37Parser from './parsers/accordion37.js';
import video29Parser from './parsers/video29.js';
import tabs38Parser from './parsers/tabs38.js';
import accordion26Parser from './parsers/accordion26.js';
import tabs25Parser from './parsers/tabs25.js';
import cards32Parser from './parsers/cards32.js';
import video33Parser from './parsers/video33.js';
import columns39Parser from './parsers/columns39.js';
import columns36Parser from './parsers/columns36.js';
import columns43Parser from './parsers/columns43.js';
import table40Parser from './parsers/table40.js';
import accordion42Parser from './parsers/accordion42.js';
import carousel44Parser from './parsers/carousel44.js';
import hero31Parser from './parsers/hero31.js';
import cardsNoImages46Parser from './parsers/cardsNoImages46.js';
import columns47Parser from './parsers/columns47.js';
import columns49Parser from './parsers/columns49.js';
import columns52Parser from './parsers/columns52.js';
import columns53Parser from './parsers/columns53.js';
import accordion50Parser from './parsers/accordion50.js';
import columns56Parser from './parsers/columns56.js';
import columns57Parser from './parsers/columns57.js';
import cards41Parser from './parsers/cards41.js';
import cards54Parser from './parsers/cards54.js';
import columns55Parser from './parsers/columns55.js';
import cards58Parser from './parsers/cards58.js';
import accordion60Parser from './parsers/accordion60.js';
import cards59Parser from './parsers/cards59.js';
import columns64Parser from './parsers/columns64.js';
import hero61Parser from './parsers/hero61.js';
import accordion62Parser from './parsers/accordion62.js';
import columns51Parser from './parsers/columns51.js';
import columns65Parser from './parsers/columns65.js';
import columns67Parser from './parsers/columns67.js';
import columns68Parser from './parsers/columns68.js';
import cards63Parser from './parsers/cards63.js';
import cardsNoImages73Parser from './parsers/cardsNoImages73.js';
import hero48Parser from './parsers/hero48.js';
import cards66Parser from './parsers/cards66.js';
import accordion70Parser from './parsers/accordion70.js';
import accordion69Parser from './parsers/accordion69.js';
import carousel45Parser from './parsers/carousel45.js';
import carousel71Parser from './parsers/carousel71.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  cardsNoImages4: cardsNoImages4Parser,
  columns10: columns10Parser,
  accordion7: accordion7Parser,
  columns12: columns12Parser,
  carousel3: carousel3Parser,
  columns5: columns5Parser,
  columns9: columns9Parser,
  carousel2: carousel2Parser,
  columns14: columns14Parser,
  cards1: cards1Parser,
  columns16: columns16Parser,
  accordion11: accordion11Parser,
  cards8: cards8Parser,
  tabs13: tabs13Parser,
  hero6: hero6Parser,
  columns23: columns23Parser,
  columns19: columns19Parser,
  columns18: columns18Parser,
  columns21: columns21Parser,
  columns22: columns22Parser,
  columns20: columns20Parser,
  columns27: columns27Parser,
  columns28: columns28Parser,
  cards17: cards17Parser,
  hero30: hero30Parser,
  accordion37: accordion37Parser,
  video29: video29Parser,
  tabs38: tabs38Parser,
  accordion26: accordion26Parser,
  tabs25: tabs25Parser,
  cards32: cards32Parser,
  video33: video33Parser,
  columns39: columns39Parser,
  columns36: columns36Parser,
  columns43: columns43Parser,
  table40: table40Parser,
  accordion42: accordion42Parser,
  carousel44: carousel44Parser,
  hero31: hero31Parser,
  cardsNoImages46: cardsNoImages46Parser,
  columns47: columns47Parser,
  columns49: columns49Parser,
  columns52: columns52Parser,
  columns53: columns53Parser,
  accordion50: accordion50Parser,
  columns56: columns56Parser,
  columns57: columns57Parser,
  cards41: cards41Parser,
  cards54: cards54Parser,
  columns55: columns55Parser,
  cards58: cards58Parser,
  accordion60: accordion60Parser,
  cards59: cards59Parser,
  columns64: columns64Parser,
  hero61: hero61Parser,
  accordion62: accordion62Parser,
  columns51: columns51Parser,
  columns65: columns65Parser,
  columns67: columns67Parser,
  columns68: columns68Parser,
  cards63: cards63Parser,
  cardsNoImages73: cardsNoImages73Parser,
  hero48: hero48Parser,
  cards66: cards66Parser,
  accordion70: accordion70Parser,
  accordion69: accordion69Parser,
  carousel45: carousel45Parser,
  carousel71: carousel71Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
