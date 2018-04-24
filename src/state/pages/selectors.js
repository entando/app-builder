import { createSelector } from 'reselect';

import { getLocale } from 'state/locale/selectors';
import { PAGE_STATUS_PUBLISHED } from 'state/pages/const';


export const getPages = state => state.pages;
export const getPagesMap = state => state.pages.map;
export const getChildrenMap = state => state.pages.childrenMap;
export const getStatusMap = state => state.pages.statusMap;
export const getTitlesMap = state => state.pages.titlesMap;
export const getFreePages = state => state.pages.freePages;
export const getSelectedPage = state => state.pages.selected;
export const getSearchPages = state => state.pages.search;


// relies on the children map order
const getPagesOrder = (pagesChildren) => {
  const fifo = ['homepage'];
  const sorted = [];
  while (fifo.length) {
    const curPageCode = fifo.pop();
    sorted.push(curPageCode);
    if (pagesChildren[curPageCode]) {
      pagesChildren[curPageCode].slice().reverse().forEach((code) => {
        fifo.push(code);
      });
    }
  }
  return sorted;
};

const isVisible = (pageCode, pages, pagesStatus) => {
  let curPageCode = pageCode;
  if (pages[curPageCode]) {
    while (curPageCode !== 'homepage') {
      if (pages[curPageCode].parentCode) {
        curPageCode = pages[curPageCode].parentCode;
        if (pagesStatus[curPageCode] && !pagesStatus[curPageCode].expanded) {
          return false; // false
        }
      }
    }
    return true;
  }
  return false; // false
};

const getDepth = (pages, pageCode) => {
  let curPageCode = pageCode;
  let depth = 0;
  if (pages[curPageCode]) {
    while (curPageCode !== 'homepage') {
      curPageCode = pages[curPageCode].parentCode;
      depth += 1;
    }
  }
  return depth;
};

// calculates the position map based on children map
export const getPositionMap = createSelector(
  [getChildrenMap],
  childrenMap => Object.keys(childrenMap).reduce((acc, pageCode) => {
    const children = childrenMap[pageCode];
    children.forEach((childCode, i) => {
      acc[childCode] = i + 1;
    });
    return acc;
  }, { homepage: 1 }),
);


const PAGE_STATUS_DEFAULTS = {
  expanded: false,
  loading: false,
  loaded: false,
};

export const getPageTreePages = createSelector(
  [getPagesMap, getChildrenMap, getStatusMap, getTitlesMap, getLocale],
  (pages, pageChildren, pagesStatus, pagesTitles, locale) => (
    getPagesOrder(pageChildren)
      .filter(pageCode => isVisible(pageCode, pages, pagesStatus))
      .map(pageCode => ({
        ...pages[pageCode],
        ...PAGE_STATUS_DEFAULTS,
        ...pagesStatus[pageCode],
        depth: getDepth(pages, pageCode),
        isEmpty: !(pageChildren[pageCode] && pageChildren[pageCode].length),
        title: pagesTitles[pageCode][locale],
      }))),
);

export const getCharsets = () => ([
  'iso-8859-1',
  'utf-8',
]);

export const getContentTypes = () => ([
  'application/json',
  'application/xhtml+xml',
  'application/xml',
  'text/html',
  'text/xml',
]);

export const getSelectedPageIsPublished = createSelector(
  [getSelectedPage],
  selectedPage => !!(selectedPage && selectedPage.status === PAGE_STATUS_PUBLISHED),
);
