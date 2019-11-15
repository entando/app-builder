import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { addErrors } from '@entando/messages';
import { setPage } from 'state/pagination/actions';
import {
  SET_CONTENT_MODELS,
  SET_CONTENT_MODEL_FILTER,
  SET_CONTENT_MODEL_SEARCH_KEYWORD,
} from 'state/content-model/types';

import { getContentModels } from 'api/contentModels';
import { getContentModelFilterProps } from 'state/content-model/selectors';
import { toggleLoading } from 'state/loading/actions';

export const setContentModelList = list => ({
  type: SET_CONTENT_MODELS,
  payload: { list },
});

export const setListFilterProps = payload => ({
  type: SET_CONTENT_MODEL_FILTER,
  payload,
});

export const setSearchKeyword = payload => ({
  type: SET_CONTENT_MODEL_SEARCH_KEYWORD,
  payload,
});

export const pageDefault = { page: 1, pageSize: 10 };

// thunks

export const fetchContentModelList = (page = pageDefault, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentModelList'));
  getContentModels(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setContentModelList(json.payload));
        dispatch(setPage(json.metaData));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      dispatch(toggleLoading('contentModelList'));
      resolve();
    });
  }).catch(() => {});
});

export const fetchContentModelListPaged = (paginationMetadata = pageDefault) =>
  (dispatch, getState) => {
    const filters = getContentModelFilterProps(getState());
    return dispatch(fetchContentModelList(paginationMetadata, convertToQueryString(filters)));
  };

const applyContentModelFilter = (
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
  return dispatch(fetchContentModelListPaged(paginationMetadata));
};

export const fetchContentModelsByContentType = (contentType, paginationMetadata = pageDefault) => (
  applyContentModelFilter(contentType, 'contentType', paginationMetadata, FILTER_OPERATORS.EQUAL)
);
