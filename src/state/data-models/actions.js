import { SET_DATA_MODELS } from 'state/data-models/types';
import { getDataModels } from 'api/dataModels';
import { addErrors } from 'state/errors/actions';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';

export const setDataModels = dataModelsPaged => ({
  type: SET_DATA_MODELS,
  payload: {
    dataModelsPaged,
  },
});

export const fetchDataModelListPaged = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('dataModel'));
  getDataModels(page, params).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setDataModels(json.payload));
        dispatch(toggleLoading('dataModel'));
        dispatch(setPage(json.metaData));
        resolve();
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(toggleLoading('dataModel'));
        resolve();
      }
    });
  });
});
