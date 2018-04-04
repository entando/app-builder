import { getPageModels, getPageModel } from 'api/pageModels';
import { SET_PAGE_MODELS, SET_SELECTED_PAGE_MODEL } from 'state/page-models/types';
import { getSelectedPageModel } from 'state/page-models/selectors';
import { addErrors } from 'state/errors/actions';

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
  new Promise((resolve) => {
    getPageModels().then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          dispatch(setPageModels(data));
          resolve();
        });
      } else {
        resolve();
      }
    });
  });


export const loadSelectedPageModel = pageCode => (dispatch, getState) => {
  const selectedPage = getSelectedPageModel(getState());
  if (selectedPage && selectedPage.code === pageCode) {
    return new Promise(r => r(selectedPage));
  }
  return getPageModel(pageCode)
    .then(response => response.json()
      .then((json) => {
        if (response.ok) {
          const pageObject = json.payload;
          dispatch(setSelectedPageModel(pageObject));
          return pageObject;
        }
        dispatch(addErrors(json.errors.map(e => e.message)));
        return null;
      }));
};
