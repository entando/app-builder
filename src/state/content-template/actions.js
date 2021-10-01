import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';
import { initialize } from 'redux-form';
import { setPage } from 'state/pagination/actions';
import { NAMESPACE_CONTENT_TEMPLATES } from 'state/pagination/const';
import {
  SET_CONTENT_TEMPLATES,
  SET_CONTENT_TEMPLATE_OPENED,
  CLEAR_CONTENT_TEMPLATE_OPENED,
  SET_CONTENT_TEMPLATE_FILTER,
  SET_CONTENT_TEMPLATE_SEARCH_ATTRIBUTE,
  SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
  SET_CONTENT_TEMPLATE_DICTIONARY,
  CLEAR_CONTENT_TEMPLATE_DICTIONARY,
} from 'state/content-template/types';

import {
  getContentTemplates,
  postContentTemplate,
  getContentTemplate,
  getContentTemplateDictionary,
  putContentTemplate,
  deleteContentTemplate,
} from 'api/contentTemplates';
import { getContentTemplateFilterProps, getContentTemplateSearchAttribute } from 'state/content-template/selectors';
import { toggleLoading } from 'state/loading/actions';

export const setContentTemplateList = list => ({
  type: SET_CONTENT_TEMPLATES,
  payload: { list },
});

export const setContentTemplate = payload => ({
  type: SET_CONTENT_TEMPLATE_OPENED,
  payload,
});

export const clearContentTemplate = () => ({
  type: CLEAR_CONTENT_TEMPLATE_OPENED,
});

export const setListFilterProps = payload => ({
  type: SET_CONTENT_TEMPLATE_FILTER,
  payload,
});

export const setSearchAttribute = payload => ({
  type: SET_CONTENT_TEMPLATE_SEARCH_ATTRIBUTE,
  payload,
});

export const setSearchKeyword = payload => ({
  type: SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
  payload,
});

export const setContentTemplateDictionary = payload => ({
  type: SET_CONTENT_TEMPLATE_DICTIONARY,
  payload,
});

export const clearContentTemplateDictionary = () => ({
  type: CLEAR_CONTENT_TEMPLATE_DICTIONARY,
});

export const pageDefault = { page: 1, pageSize: 10 };

// thunks

export const fetchContentTemplateList = (page = pageDefault, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentTemplateList'));
  getContentTemplates(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentTemplateList(json.payload));
        dispatch(setPage(json.metaData, NAMESPACE_CONTENT_TEMPLATES));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('contentTemplateList'));
      resolve();
    });
  }).catch(() => {});
});

export const fetchContentTemplateListPaged = (
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const filters = getContentTemplateFilterProps(getState());
  return dispatch(fetchContentTemplateList(paginationMetadata, convertToQueryString(filters)));
};

const applyContentTemplateFilter = (
  keyword,
  field = 'descr',
  paginationMetadata = pageDefault,
  operator = FILTER_OPERATORS.LIKE,
) => (dispatch) => {
  let filter = {};
  if (keyword) {
    filter = {
      formValues: { [field]: keyword },
      operators: { [field]: operator },
    };
  }
  dispatch(setSearchKeyword(keyword));
  dispatch(setListFilterProps(filter));
  return dispatch(fetchContentTemplateListPaged(paginationMetadata));
};

export const filterContentTemplateBySearch = (
  keyword,
  paginationMetadata = pageDefault,
) => (dispatch, getState) => {
  const field = getContentTemplateSearchAttribute(getState());
  return dispatch(applyContentTemplateFilter(keyword, field, paginationMetadata));
};

export const fetchContentTemplatesByContentType = (
  contentType,
  paginationMetadata = pageDefault,
) => (
  applyContentTemplateFilter(contentType, 'contentType', paginationMetadata, FILTER_OPERATORS.EQUAL)
);

export const sendPostContentTemplate = contModelObject => dispatch => new Promise(resolve => (
  postContentTemplate(contModelObject).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        resolve(json.payload);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(clearErrors());
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        resolve();
      }
    });
  }).catch(() => {})
));

export const fetchContentTemplate = id => dispatch => new Promise(resolve => (
  getContentTemplate(id).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentTemplate(json.payload));
        dispatch(initialize('contenttemplateform', json.payload));
        resolve(json.payload);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(clearErrors());
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        resolve();
      }
    });
  }).catch(() => {})
));

export const fetchContentTemplateDictionary = () => dispatch => new Promise(resolve => (
  getContentTemplateDictionary().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentTemplateDictionary(json.payload));
        resolve(json.payload);
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(clearErrors());
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        resolve();
      }
    });
  })
    .catch(() => {})));

export const sendPutContentTemplate = contModelObject => dispatch => new Promise(
  resolve => putContentTemplate(contModelObject)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {}),
);

export const sendDeleteContentTemplate = id => dispatch => new Promise(
  resolve => deleteContentTemplate(id)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
          dispatch(fetchContentTemplateListPaged());
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    })
    .catch(() => {}),
);
