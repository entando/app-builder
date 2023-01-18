import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { addErrors } from '@entando/messages';
import { setPage } from 'state/pagination/actions';
import { NAMESPACE_CONTENT_TEMPLATES } from 'state/pagination/const';
import {
  SET_CONTENT_TEMPLATES,
  SET_CONTENT_TEMPLATE_FILTER,
  SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
} from 'state/content-template/types';

import { getContentTemplates } from 'api/contentTemplates';
import { getContentTemplateFilterProps } from 'state/content-template/selectors';
import { toggleLoading } from 'state/loading/actions';

export const setContentTemplateList = list => ({
  type: SET_CONTENT_TEMPLATES,
  payload: { list },
});

export const setListFilterProps = payload => ({
  type: SET_CONTENT_TEMPLATE_FILTER,
  payload,
});

export const setSearchKeyword = payload => ({
  type: SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
  payload,
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

export const fetchContentTemplateListPaged = (paginationMetadata = pageDefault) => (
  dispatch,
  getState,
) => {
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

export const fetchContentTemplatesByContentType = (
  contentType,
  paginationMetadata = pageDefault,
) => (
  applyContentTemplateFilter(contentType, 'contentType', paginationMetadata, FILTER_OPERATORS.EQUAL)
);
