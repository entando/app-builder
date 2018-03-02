import { getPageModels } from 'api/pageModels';
import { SET_PAGE_MODELS } from 'state/page-models/types';

export const setPageModels = pageModels => ({
  type: SET_PAGE_MODELS,
  payload: {
    pageModels,
  },
});

// thunk
export const fetchPageModels = () => dispatch =>
  getPageModels().then((data) => {
    dispatch(setPageModels(data));
  });

