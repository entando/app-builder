import { getPageModels } from 'api/pageModels';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';

export const setPageModels = pageModels => ({
  type: SET_PAGE_MODELS,
  payload: {
    pageModels,
  },
});

export const setSelectedPageModel = pageModel => ({
  type: SET_SELECTED_PAGE_MODEL,
  payload: {
    pageModel,
  },
});


export const fetchPageModels = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('pageModels'));
    getPageModels(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPageModels(data.payload));
          dispatch(toggleLoading('pageModels'));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('pageModels'));
          resolve();
        }
      });
    });
  })
);
