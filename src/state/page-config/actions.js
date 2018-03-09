import { getParams } from 'frontend-common-components';

import { addErrors } from 'state/errors/actions';
import { setSelectedPageModel } from 'state/page-models/actions';
import { fetchPage } from 'api/pages';
import { getPageModel } from 'api/pageModels';

// dispatch an action to populate errors
const handleResponseErrors = dispatch => (payload) => {
  if (payload.errors && payload.errors.length) {
    const action = addErrors(payload.errors.map(err => err.message));
    dispatch(action);
    throw action;
  }
  return payload;
};

// eslint-disable-next-line import/prefer-default-export
export const initConfigPage = () => (dispatch, getState) => {
  const { pageCode } = getParams(getState());
  return fetchPage(pageCode)
    .then(handleResponseErrors(dispatch))
    .then((response) => {
      const pageModelCode = response.payload.pageModel;
      return getPageModel(pageModelCode)
        .then(handleResponseErrors(dispatch))
        .then((pmResp) => {
          dispatch(setSelectedPageModel(pmResp.payload));
        });
    })
    .catch(() => {});
};
