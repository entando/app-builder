import { createSelector } from 'reselect';

import { getLocale } from 'state/locale/selectors';
import { HOMEPAGE_CODE, PAGE_STATUS_PUBLISHED } from 'state/pages/const';
import { getDomain } from '@entando/apimanager';
import { PREVIEW_NAMESPACE } from 'ui/pages/config/const';
import { get } from 'lodash';
import { getDefaultLanguage } from 'state/languages/selectors';

export const getPages = state => state.pages;
export const getPagesMap = state => state.pages.map;
export const getChildrenMap = state => state.pages.childrenMap;
export const getStatusMap = state => state.pages.statusMap;
export const getTitlesMap = state => state.pages.titlesMap;
export const getViewPages = state => state.pages.viewPages;
export const getSelectedPage = state => state.pages.selected;
export const getSearchPagesRaw = state => state.pages.search;
export const getDashboardPages = state => state.pages.dashboard;
export const getIsVirtualRootOn = state => state.pages.virtualRoot;
export const getEditPage = state => state.pages.editPage;

export const getSearchPages = createSelector(
  [getSearchPagesRaw],
  (pages) => {
    if (!pages) return pages;
    return pages.map(page => ({
      ...page,
      isEmpty: page.children.length === 0,
    }));
  },
);

export const getFreePages = createSelector(
  getPages,
  getLocale,
  (pages, locale) => pages.freePages.map(page => ({
    ...page,
    titles: page.titles[locale],
    fullTitles: page.fullTitles[locale],
  })),
);


// relies on the children map order
const getPagesOrder = (pagesChildren) => {
  const fifo = [HOMEPAGE_CODE];
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
    while (curPageCode !== HOMEPAGE_CODE) {
      if (pages[curPageCode].parentCode) {
        curPageCode = pages[curPageCode].parentCode;
        if (pagesStatus[curPageCode] && !pagesStatus[curPageCode].expanded) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
};

const getDepth = (pages, pageCode) => {
  let curPageCode = pageCode;
  let depth = 0;
  if (pages[curPageCode]) {
    while (curPageCode !== HOMEPAGE_CODE) {
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
  [getPagesMap, getChildrenMap, getStatusMap, getTitlesMap, getLocale, getDefaultLanguage,
    getIsVirtualRootOn],
  (pages, pageChildren, pagesStatus, pagesTitles, locale, defaultLang, virtualRootOn) => (
    getPagesOrder(pageChildren)
      .filter(pageCode => isVisible(pageCode, pages, pagesStatus))
      .map((pageCode) => {
        const isEmpty = !(pageChildren[pageCode] && pageChildren[pageCode].length);
        let hasPublishedChildren = false;
        const { parentCode } = pages[pageCode];
        const parentStatus = get(pages, `${parentCode}.status`);
        if (!isEmpty) {
          hasPublishedChildren = pageChildren[pageCode]
            .some(el => pages[el] && pages[el].status === PAGE_STATUS_PUBLISHED);
        }

        let title = pagesTitles[pageCode][locale]
          || pagesTitles[pageCode][defaultLang]
          || pagesTitles[pageCode][
            Object.keys(pagesTitles[pageCode]).find(langCode => pagesTitles[pageCode][langCode])
          ];

        if (pageCode === HOMEPAGE_CODE && virtualRootOn) {
          title = 'Root';
        }

        return ({
          ...pages[pageCode],
          ...PAGE_STATUS_DEFAULTS,
          ...pagesStatus[pageCode],
          depth: getDepth(pages, pageCode),
          isEmpty,
          hasPublishedChildren,
          parentStatus,
          title,
        });
      })),
);

export const getAllPageTreeLoadedStatus = createSelector(
  [getChildrenMap, getStatusMap],
  (childPages, pageStatuses) => (
    Object.keys(childPages).reduce((acc, curr) => {
      const { expanded, loaded } = get(pageStatuses, curr, {});
      return !expanded && !loaded ? [...acc, curr] : acc;
    }, [])
  ),
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

export const getReferencesFromSelectedPage = createSelector([getSelectedPage], (selectedPage) => {
  if (selectedPage && selectedPage.references) {
    return Object.keys(selectedPage.references).filter(key => selectedPage.references[key]);
  }
  return [];
});


export const getSelectedPageLocaleTitle = createSelector(
  [getSelectedPage, getLocale],
  (selectedPage, locale) => {
    if (selectedPage) {
      return selectedPage.titles[locale] || selectedPage.titles.en;
    }
    return '';
  },
);

export const getSelectedPagePreviewURI = createSelector(
  getSelectedPage, getDomain,
  (selectedPage, domain) => (
    `${domain}/${PREVIEW_NAMESPACE}?pageCode=${selectedPage.code}&token=${selectedPage.token}`
  ),
);

export const getSelectedPublishedPageURI = createSelector(
  getSelectedPage, getDomain, getLocale, getDefaultLanguage,
  (selectedPage, domain, locale, defaultLang) => (
    `${domain}/${defaultLang || locale}/${selectedPage.code}.page`
  ),
);
