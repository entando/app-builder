
import { getPages } from 'state/pages/selectors';


import { createSelector } from 'reselect';


export const getPageTree = state => state.pageTree;


// returns a sorted list of the page children
const getSortedChildren = (pages, parentPageCode) => pages
  .filter(page => (page.parentCode === parentPageCode))
  .sort((pageA, pageB) => (pageA.position - pageB.position));

// adds the item and its children in the correct order, in newPages
const addItemRecursive = (pages, newPages, page) => {
  newPages.push(page);
  if (page.children && page.expanded) {
    getSortedChildren(pages, page.code)
      .forEach((childPage) => {
        addItemRecursive(pages, newPages, childPage);
      });
  }
};


const getDepth = (pages, pageCode) => {
  let curPageCode = pageCode;
  let depth = 0;
  while (curPageCode !== 'homepage') {
    curPageCode = pages[curPageCode].parentCode;
    depth += 1;
  }
  return depth;
};

const PAGE_STATUS_DEFAULTS = {
  expanded: false,
  loading: false,
  loaded: false,
};

export const getPageTreePages = createSelector(
  [getPages, getPageTree],
  (pages, pageTreeStatus) => {
    const enhancedPages = Object.values(pages).map(page => ({
      ...page,
      ...PAGE_STATUS_DEFAULTS,
      ...pageTreeStatus[page.code],
      depth: getDepth(pages, page.code),
      isEmpty: !page.children || !page.children.length,
    }));
    const treePages = [];
    if (enhancedPages.length) {
      const homePage = enhancedPages.find(page => page.code === 'homepage');
      addItemRecursive(enhancedPages, treePages, homePage);
    }
    return treePages;
  },
);

