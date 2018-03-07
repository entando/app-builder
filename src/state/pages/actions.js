import { initialize } from 'redux-form';
import { gotoRoute } from 'frontend-common-components';

import {
  fetchPage, fetchPageChildren, setPagePosition, postPage, getFreePages,
  getPageSettingsList, putPage,
} from 'api/pages';
import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED, TOGGLE_PAGE_EXPANDED, SET_PAGE_PARENT,
  MOVE_PAGE, SET_FREE_PAGES,
} from 'state/pages/types';
import { getStatusMap, getPagesMap, getChildrenMap } from 'state/pages/selectors';
import { addErrors } from 'state/errors/actions';
import { ROUTE_PAGE_TREE } from 'app-init/router';

const HOMEPAGE_CODE = 'homepage';
const noopPromise = arg => new Promise(resolve => resolve(arg));

export const addPages = pages => ({
  type: ADD_PAGES,
  payload: {
    pages,
  },
});

export const setPageLoading = pageCode => ({
  type: SET_PAGE_LOADING,
  payload: {
    pageCode,
  },
});

export const setPageLoaded = pageCode => ({
  type: SET_PAGE_LOADED,
  payload: {
    pageCode,
  },
});

export const togglePageExpanded = (pageCode, expanded) => ({
  type: TOGGLE_PAGE_EXPANDED,
  payload: {
    pageCode,
    expanded,
  },
});

export const movePageSync = (pageCode, oldParentCode, newParentCode, newPosition) => ({
  type: MOVE_PAGE,
  payload: {
    pageCode,
    oldParentCode,
    newParentCode,
    newPosition,
  },
});

export const setPageParentSync = (pageCode, oldParentCode, newParentCode) => ({
  type: SET_PAGE_PARENT,
  payload: {
    pageCode,
    oldParentCode,
    newParentCode,
  },
});

export const setFreePages = freePages => ({
  type: SET_FREE_PAGES,
  payload: {
    freePages,
  },
});


const fetchPageTree = (pageCode) => {
  if (pageCode === HOMEPAGE_CODE) {
    return Promise.all([
      fetchPage(pageCode),
      fetchPageChildren(pageCode),
    ])
      .then(responses => [responses[0].payload].concat(responses[1].payload));
  }
  return fetchPageChildren(pageCode)
    .then(response => response.payload);
};


/**
 * will call:
 * http://confluence.entando.org/display/E5/Page+Tree
 * /pages
 */
export const handleExpandPage = (pageCode = HOMEPAGE_CODE) => (dispatch, getState) => {
  const pageStatus = getStatusMap(getState())[pageCode];
  const toExpand = (!pageStatus || !pageStatus.expanded);
  const toLoad = (toExpand && (!pageStatus || !pageStatus.loaded));
  if (toLoad) {
    dispatch(setPageLoading(pageCode));
    return fetchPageTree(pageCode)
      .then((pages) => {
        dispatch(addPages(pages));
        dispatch(togglePageExpanded(pageCode, true));
        dispatch(setPageLoaded(pageCode));
      });
  }
  dispatch(togglePageExpanded(pageCode, toExpand));
  return noopPromise();
};


export const setPageParent = (pageCode, newParentCode) => (dispatch, getState) => {
  const state = getState();
  const page = getPagesMap(state)[pageCode];
  const oldParentCode = page.parentCode;
  if (newParentCode === oldParentCode) {
    return noopPromise();
  }
  const newChildren = getChildrenMap(state)[newParentCode];
  return setPagePosition(pageCode, newChildren.length + 1, newParentCode)
    .then(() => {
      dispatch(setPageParentSync(pageCode, oldParentCode, newParentCode));
    });
};


const movePage = (pageCode, siblingCode, moveAbove) => (dispatch, getState) => {
  if (pageCode === siblingCode) {
    return noopPromise();
  }
  const state = getState();
  const siblingPage = getPagesMap(state)[siblingCode];
  const page = getPagesMap(state)[pageCode];
  const oldParentCode = page.parentCode;
  const newParentCode = siblingPage.parentCode || HOMEPAGE_CODE;
  const newSiblingChildren = getChildrenMap(state)[newParentCode]
    .filter(code => code !== pageCode);
  const newSiblingIndex = newSiblingChildren.indexOf(siblingCode);
  const newPosition = (moveAbove ? newSiblingIndex : newSiblingIndex + 1) + 1;
  return setPagePosition(pageCode, newPosition, newParentCode)
    .then(() => {
      dispatch(movePageSync(pageCode, oldParentCode, newParentCode, newPosition));
    });
};

export const movePageAbove = (pageCode, siblingCode) => movePage(pageCode, siblingCode, true);
export const movePageBelow = (pageCode, siblingCode) => movePage(pageCode, siblingCode, false);

export const sendPostPage = pageData => dispatch => postPage(pageData)
  .then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      dispatch(addPages([data]));
      gotoRoute(ROUTE_PAGE_TREE);
    }
  });

export const fetchFreePages = () => dispatch => (
  getFreePages().then((freePages) => {
    dispatch(setFreePages(freePages));
  })
);

export const mapItem = param => (
  param.reduce((acc, item) => { acc[item.name] = item.value; return acc; }, {})
);
  // thunks
export const fetchPageSettings = () => dispatch => (
  getPageSettingsList().then((response) => {
    dispatch(initialize('settings', mapItem(response.param)));
  })
);

export const sendPutPage = pageData => dispatch => putPage(pageData)
  .then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      gotoRoute(ROUTE_PAGE_TREE);
    }
  });

export const fetchPageForm = pageCode => dispatch => fetchPage(pageCode)
  .then((response) => {
    if (response.errors && response.errors.length) {
      dispatch(addErrors(response.errors.map(err => err.message)));
    } else {
      dispatch(initialize('page', response.payload));
    }
  });
