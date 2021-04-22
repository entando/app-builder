import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';

import { setPage } from 'state/pagination/actions';
import {
  getPage, getPageChildren, setPagePosition, postPage, deletePage, getFreePages,
  getPageSettings, putPage, putPageStatus, getSearchPages,
  putPageSettings, patchPage, getPageSEO, postPageSEO, putPageSEO,
} from 'api/pages';
import { getStatusMap, getPagesMap, getChildrenMap, getSelectedPage } from 'state/pages/selectors';
import { makeGetSelectedPageConfig } from 'state/page-config/selectors';
import { setPublishedPageConfig } from 'state/page-config/actions';
import {
  ADD_PAGES, SET_PAGE_LOADING, SET_PAGE_LOADED, SET_PAGE_EXPANDED, SET_PAGE_PARENT,
  MOVE_PAGE, SET_FREE_PAGES, SET_SELECTED_PAGE, REMOVE_PAGE, UPDATE_PAGE, SEARCH_PAGES,
  CLEAR_SEARCH, SET_REFERENCES_SELECTED_PAGE, CLEAR_TREE, BATCH_TOGGLE_EXPANDED, COLLAPSE_ALL,
} from 'state/pages/types';
import { HOMEPAGE_CODE, PAGE_STATUS_DRAFT, PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED, SEO_ENABLED } from 'state/pages/const';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CLONE, ROUTE_PAGE_ADD } from 'app-init/router';
import { generateJsonPatch } from 'helpers/jsonPatch';
import getSearchParam from 'helpers/getSearchParam';
import { toggleLoading } from 'state/loading/actions';

import { APP_TOUR_CANCELLED, APP_TOUR_STARTED, APP_TOUR_HOMEPAGE_CODEREF } from 'state/app-tour/const';
import { setExistingPages } from 'state/app-tour/actions';
import { getAppTourProgress } from 'state/app-tour/selectors';

const RESET_FOR_CLONE = {
  code: '',
  titles: '',
  parentCode: '',
  fullTitles: '',
  fullPath: '',
  status: '',
  references: {},
};

const noopPromise = arg => new Promise(resolve => resolve(arg));

export const addPages = pages => ({
  type: ADD_PAGES,
  payload: {
    pages,
  },
});

export const setSearchPages = pages => ({
  type: SEARCH_PAGES,
  payload: {
    pages,
  },
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const removePage = page => ({
  type: REMOVE_PAGE,
  payload: {
    page,
  },
});

export const setSelectedPage = page => ({
  type: SET_SELECTED_PAGE,
  payload: {
    page,
  },
});

export const setReferenceSelectedPage = references => ({
  type: SET_REFERENCES_SELECTED_PAGE,
  payload: {
    references,
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

export const setPageExpanded = (pageCode, expanded) => ({
  type: SET_PAGE_EXPANDED,
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

export const updatePage = page => ({
  type: UPDATE_PAGE,
  payload: {
    page,
  },
});

export const clearTree = () => ({
  type: CLEAR_TREE,
});

export const setBatchExpanded = pageCodes => ({
  type: BATCH_TOGGLE_EXPANDED,
  payload: pageCodes,
});

export const collapseAll = () => ({
  type: COLLAPSE_ALL,
});

const wrapApiCall = apiFunc => (...args) => async (dispatch) => {
  const response = await apiFunc(...args);
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  dispatch(addErrors(json.errors.map(e => e.message)));
  if (json.errors && json.errors[0]) {
    dispatch(addToast(json.errors[0].message, TOAST_ERROR));
  }
  throw json;
};


export const fetchPage = wrapApiCall(getPage);
export const fetchPageInfo = wrapApiCall(SEO_ENABLED ? getPageSEO : getPage);
export const fetchPageChildren = wrapApiCall(getPageChildren);

export const sendDeletePage = (page, successRedirect = true) => async (dispatch) => {
  try {
    const response = await deletePage(page);
    const json = await response.json();
    if (response.ok) {
      dispatch(removePage(page));
      if (page.tourProgress === APP_TOUR_CANCELLED) return;
      if (page.tourProgress !== APP_TOUR_STARTED && successRedirect) {
        history.push(ROUTE_PAGE_TREE);
      }
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
    }
  } catch (e) {
    // do nothing
  }
};

export const fetchPageTree = pageCode => async (dispatch) => {
  if (pageCode === HOMEPAGE_CODE) {
    const responses = await Promise.all([
      fetchPage(pageCode)(dispatch),
      fetchPageChildren(pageCode)(dispatch),
    ]);
    return [responses[0].payload].concat(responses[1].payload);
  }
  const response = await fetchPageChildren(pageCode)(dispatch);
  return response.payload;
};

/**
 * will call:
 * http://confluence.entando.org/display/E5/Page+Tree
 * /pages
 */
export const handleExpandPage = (pageCode = HOMEPAGE_CODE, alwaysExpand) => (
  (dispatch, getState) => {
    const state = getState();
    const pageStatus = getStatusMap(state)[pageCode];
    const toExpand = (!pageStatus || !pageStatus.expanded);
    const toLoad = (toExpand && (!pageStatus || !pageStatus.loaded));
    if (toLoad) {
      dispatch(setPageLoading(pageCode));
      return fetchPageTree(pageCode)(dispatch)
        .then((pages) => {
          dispatch(addPages(pages));
          dispatch(setPageExpanded(pageCode, true));
          dispatch(setPageLoaded(pageCode));
          if (pageCode === APP_TOUR_HOMEPAGE_CODEREF && getAppTourProgress(state) === APP_TOUR_STARTED) {
            dispatch(setExistingPages(pages));
          }
        }).catch(() => {});
    }
    dispatch(setPageExpanded(
      pageCode,
      alwaysExpand !== undefined ? alwaysExpand : toExpand,
    ));
    return noopPromise();
  }
);

export const setPageParent = (pageCode, newParentCode) => (dispatch, getState) => {
  const state = getState();
  const page = getPagesMap(state)[pageCode];
  const oldParentCode = page.parentCode;
  if (newParentCode === oldParentCode) {
    return noopPromise();
  }
  const newChildren = getChildrenMap(state)[newParentCode];
  dispatch(setPageLoading(page.code));
  return setPagePosition(pageCode, newChildren.length + 1, newParentCode)
    .then((response) => {
      if (response.ok) {
        dispatch(setPageParentSync(pageCode, oldParentCode, newParentCode));
      } else {
        response.json().then((json) => {
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        });
      }
      dispatch(setPageLoaded(page.code));
    }).catch(() => {});
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
  dispatch(setPageLoading(page.code));
  return setPagePosition(pageCode, newPosition, newParentCode)
    .then(() => {
      dispatch(movePageSync(pageCode, oldParentCode, newParentCode, newPosition));
      dispatch(setPageLoaded(page.code));
    }).catch(() => {});
};

export const movePageAbove = (pageCode, siblingCode) => movePage(pageCode, siblingCode, true);
export const movePageBelow = (pageCode, siblingCode) => movePage(pageCode, siblingCode, false);

export const sendPostPage = pageData => dispatch => new Promise(async (resolve) => {
  try {
    const { seoData, seo } = pageData;
    const seoPayload = seoData ? {
      seoData: {
        ...seoData,
        useExtraTitles: seo,
      },
    } : {};
    const postPageCall = SEO_ENABLED ? postPageSEO : postPage;
    const response = await postPageCall({
      ...pageData,
      ...seoPayload,
    });
    const json = await response.json();
    if (response.ok) {
      dispatch(addToast({ id: 'pages.created' }, TOAST_SUCCESS));
      dispatch(addPages([json.payload]));
      resolve(response);
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      resolve();
    }
  } catch (e) {
    const { details, defaultMessage } = e;
    const detailMessage = details.map(er => er.message).join('; ');
    const combinedErrors = [defaultMessage, detailMessage].join(' - ');
    dispatch(addErrors([combinedErrors]));
    dispatch(addToast(combinedErrors, TOAST_ERROR));
    resolve();
  }
});

export const fetchFreePages = () => async (dispatch) => {
  try {
    const response = await getFreePages();
    const json = await response.json();
    if (response.ok) {
      dispatch(setFreePages(json.payload));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const clonePage = (page, redirectTo = null) => async (dispatch) => {
  try {
    const json = await fetchPage(page.code)(dispatch);
    dispatch(initialize('page', {
      ...json.payload,
      ...RESET_FOR_CLONE,
    }));
    let pageCloneUrl = ROUTE_PAGE_CLONE;
    if (redirectTo) {
      pageCloneUrl += `?redirectTo=${redirectTo}`;
    }
    history.push(pageCloneUrl);
  } catch (e) {
    // do nothing
  }
};

export const fetchPageSettings = () => async (dispatch) => {
  try {
    dispatch(toggleLoading('pageSettings'));
    const response = await getPageSettings();
    const json = await response.json();
    dispatch(toggleLoading('pageSettings'));
    if (response.ok) {
      dispatch(initialize('settings', json.payload));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
    dispatch(toggleLoading('pageSettings'));
  }
};

export const sendPutPageSettings = pageSettings => async (dispatch) => {
  try {
    const response = await putPageSettings(pageSettings);
    const json = await response.json();
    if (response.ok) {
      dispatch(addToast(
        { id: 'pageSettings.success' },
        TOAST_SUCCESS,
      ));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const sendPutPage = pageData => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const { seoData, seo } = pageData;
      const putPageFunc = SEO_ENABLED ? putPageSEO : putPage;
      const seoPayload = seoData ? {
        seoData: {
          ...seoData,
          useExtraTitles: seo,
        },
      } : {};
      const response = await putPageFunc({
        ...pageData,
        ...seoPayload,
      });
      const json = await response.json();
      if (response.ok) {
        dispatch(addToast({ id: 'pages.updated' }, TOAST_SUCCESS));
        dispatch(updatePage(json.payload));
        dispatch(initialize('pageEdit', json.payload));
        resolve();
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        reject(json.errors);
      }
    } catch (e) {
      const { details, defaultMessage } = e;
      const detailMessage = details.map(er => er.message).join('; ');
      dispatch(addErrors([[defaultMessage, detailMessage].join(' - ')]));
      reject(e);
    }
  });

export const sendPatchPage = pageData => async (dispatch, getState) => {
  try {
    const initialPageData = getSelectedPage(getState());
    const patch = generateJsonPatch(initialPageData, pageData);
    if (!patch.length) {
      return;
    }
    const response = await patchPage(patch, pageData.code);
    const json = await response.json();
    if (response.ok) {
      const page = json.payload;
      dispatch(setSelectedPage(page));
      dispatch(updatePage(page));
      dispatch(addToast(
        { id: 'singlePageSettings.updateSuccess' },
        TOAST_SUCCESS,
      ));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const fetchPageForm = pageCode => dispatch => fetchPageInfo(pageCode)(dispatch)
  .then(response => dispatch(initialize('pageEdit', response.payload)))
  .catch(() => {});

export const loadSelectedPage = pageCode => dispatch =>
  fetchPage(pageCode || getSearchParam('parentCode') || HOMEPAGE_CODE)(dispatch)
    .then((response) => {
      dispatch(setSelectedPage(response.payload));
      return response.payload;
    })
    .catch(() => {});

const putSelectedPageStatus = status => (dispatch, getState) =>
  new Promise((resolve) => {
    const page = getSelectedPage(getState());
    if (!page) {
      resolve();
    }
    const newPage = {
      ...page,
      status: status === PAGE_STATUS_DRAFT ? PAGE_STATUS_UNPUBLISHED : status,
    };
    dispatch(setPageLoading(page.code));
    putPageStatus(page.code, status).then((response) => {
      if (response.ok) {
        dispatch(setSelectedPage(newPage));
        dispatch(updatePage(newPage));
        if (status === PAGE_STATUS_PUBLISHED) {
          const draftConfig = makeGetSelectedPageConfig(page.code)(getState());
          dispatch(setPublishedPageConfig(newPage.code, draftConfig));
        } else {
          dispatch(setPublishedPageConfig(newPage.code, null));
        }
      } else {
        response.json().then((json) => {
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        });
      }
      dispatch(setPageLoaded(page.code));
      resolve();
    }).catch(() => {});
  });

export const publishSelectedPage = () => (dispatch, getState) =>
  putSelectedPageStatus(PAGE_STATUS_PUBLISHED)(dispatch, getState);

export const unpublishSelectedPage = () => (dispatch, getState) =>
  putSelectedPageStatus(PAGE_STATUS_DRAFT)(dispatch, getState);

export const fetchSearchPages = (page = { page: 1, pageSize: 10 }, params = '') => async (dispatch) => {
  try {
    const response = await getSearchPages(page, params);
    const json = await response.json();
    if (response.ok) {
      dispatch(setSearchPages(json.payload));
      dispatch(setPage(json.metaData));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};

export const clearSearchPage = () => (dispatch) => {
  dispatch(clearSearch());
  dispatch(initialize('pageSearch', {}));
};

export const initPageForm = (pageData, redirectTo = null) => (dispatch) => {
  dispatch(initialize('page', pageData));
  let pageAddUrl = `${ROUTE_PAGE_ADD}?parentCode=${pageData.parentCode}`;
  if (redirectTo) {
    pageAddUrl += `&redirectTo=${redirectTo}`;
  }
  history.push(pageAddUrl);
};

export const fetchPageTreeAll = () => (dispatch, getState) => {
  const pages = getChildrenMap(getState());
  Object.keys(pages).forEach((page) => {
    dispatch(handleExpandPage(page, true));
  });
};
