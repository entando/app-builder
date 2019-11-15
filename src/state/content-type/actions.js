import { addErrors } from '@entando/messages';
import { setPage } from 'state/pagination/actions';
import { SET_CONTENT_TYPES } from 'state/content-type/types';
import { toggleLoading } from 'state/loading/actions';

import { getContentTypes } from 'api/contentTypes';

export const setContentTypeList = list => ({
  type: SET_CONTENT_TYPES,
  payload: { list },
});

// thunks
export const fetchContentTypeListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('contentTypeList'));
  getContentTypes(page, params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContentTypeList(json.payload));
          dispatch(setPage(json.metaData));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        dispatch(toggleLoading('contentTypeList'));
        resolve();
      });
    })
    .catch(() => {});
});
