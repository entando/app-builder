import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';

import {
  getPageTemplates, getPageTemplate, deletePageTemplate, postPageTemplate, putPageTemplate,
  getPageReferences,
} from 'api/pageTemplates';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { getSelectedPageTemplate } from 'state/page-templates/selectors';
import { FORM_MODE_EDIT, FORM_MODE_CLONE, CONTINUE_SAVE_TYPE } from 'state/page-templates/const';
import {
  SET_PAGE_TEMPLATES, SET_SELECTED_PAGE_TEMPLATE, REMOVE_PAGE_TEMPLATE,
  SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS, SET_PAGE_TEMPLATES_TOTAL,
} from 'state/page-templates/types';
import { history, ROUTE_PAGE_TEMPLATE_LIST } from 'app-init/router';


export const setPageTemplates = pageTemplates => ({
  type: SET_PAGE_TEMPLATES,
  payload: {
    pageTemplates,
  },
});

export const setPageTemplatesTotal = pageTemplatesTotal => ({
  type: SET_PAGE_TEMPLATES_TOTAL,
  payload: {
    pageTemplatesTotal,
  },
});

export const setSelectedPageTemplate = pageTemplate => ({
  type: SET_SELECTED_PAGE_TEMPLATE,
  payload: {
    pageTemplate,
  },
});

export const removePageTemplateSync = pageTemplateCode => ({
  type: REMOVE_PAGE_TEMPLATE,
  payload: {
    pageTemplateCode,
  },
});

export const setSelectedPageTemplatePageRefs = references => ({
  type: SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS,
  payload: {
    references,
  },
});


export const fetchPageTemplates = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('pageTemplates'));
    getPageTemplates(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPageTemplates(data.payload));
          dispatch(toggleLoading('pageTemplates'));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(toggleLoading('pageTemplates'));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const fetchPageTemplatesTotal = () => dispatch => (
  new Promise((resolve) => {
    getPageTemplates({ page: 1, pageSize: 1 }).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPageTemplatesTotal(data.metaData.totalItems));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const removePageTemplate = pageTemplateCode => dispatch => (
  new Promise((resolve) => {
    deletePageTemplate(pageTemplateCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removePageTemplateSync(pageTemplateCode));
          dispatch(addToast(
            { id: 'app.deleted', values: { type: 'page template', code: pageTemplateCode } },
            TOAST_SUCCESS,
          ));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(addToast(data.errors[0].message, TOAST_ERROR));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const fetchPageTemplate = pageTemplateCode => dispatch => (
  new Promise((resolve, reject) => {
    dispatch(toggleLoading('pageTemplate'));
    getPageTemplate(pageTemplateCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          resolve(data);
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          reject(data);
        }
        dispatch(toggleLoading('pageTemplate'));
      });
    }).catch(() => {});
  })
);

export const loadSelectedPageTemplate = pageTemplateCode => (dispatch, getState) => {
  const selectedPage = getSelectedPageTemplate(getState());
  if (selectedPage && selectedPage.code === pageTemplateCode) {
    return new Promise(r => r(selectedPage));
  }
  return fetchPageTemplate(pageTemplateCode)(dispatch)
    .then((json) => {
      const pageObject = json.payload;
      dispatch(setSelectedPageTemplate(pageObject));
      return pageObject;
    }).catch(() => {});
};

export const initPageTemplateForm = (pageTemplateCode, mode = FORM_MODE_EDIT) => dispatch => (
  fetchPageTemplate(pageTemplateCode)(dispatch).then((json) => {
    const pageTemplate = {
      ...json.payload,
      ...(mode === FORM_MODE_CLONE ? {
        code: '',
        descr: '',
      } : {}),
    };
    pageTemplate.configuration = JSON.stringify(pageTemplate.configuration, null, 2);
    dispatch(initialize('pageTemplate', pageTemplate));
  }).catch(() => {})
);

export const updatePageTemplate = (pageTemplate, saveType) => dispatch => new Promise((resolve) => {
  putPageTemplate(pageTemplate).then((response) => {
    if (!response.ok) {
      response.json().then((data) => {
        dispatch(addErrors(data.errors.map(err => err.message)));
        data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        resolve();
      });
    } else {
      dispatch(addToast(
        { id: 'app.updated', values: { type: 'page template', code: pageTemplate.code } },
        TOAST_SUCCESS,
      ));
      dispatch(setSelectedPageTemplate(pageTemplate));
      if (saveType !== CONTINUE_SAVE_TYPE) history.push(ROUTE_PAGE_TEMPLATE_LIST);
      resolve();
    }
  }).catch(() => {});
});

export const createPageTemplate = (pageTemplate, saveType) => dispatch => new Promise((resolve) => {
  postPageTemplate(pageTemplate).then((response) => {
    if (!response.ok) {
      response.json().then((data) => {
        dispatch(addErrors(data.errors.map(err => err.message)));
        data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        resolve();
      });
    } else {
      dispatch(addToast(
        { id: 'app.created', values: { type: 'page template', code: pageTemplate.code } },
        TOAST_SUCCESS,
      ));
      if (saveType !== CONTINUE_SAVE_TYPE) history.push(ROUTE_PAGE_TEMPLATE_LIST);
      resolve();
    }
  }).catch(() => {});
});

const fetchCurrentReference = (getApiCall, setActionCreator) =>
  (pageTemplateCode, page = { page: 1, pageSize: 10 }) => dispatch =>
    new Promise((resolve) => {
      dispatch(toggleLoading('references'));
      getApiCall(pageTemplateCode, page).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setActionCreator(json.payload));
            dispatch(setPage(json.metaData));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          }
          dispatch(toggleLoading('references'));
          resolve();
        });
      }).catch(() => {});
    });

export const fetchCurrentReferencePages =
  fetchCurrentReference(getPageReferences, setSelectedPageTemplatePageRefs);
