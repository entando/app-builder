import { getPageModels } from 'api/pageModels';
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


// thunk
export const fetchPageModels = () => dispatch =>
  getPageModels().then((data) => {
    dispatch(setPageModels(data));
  });

