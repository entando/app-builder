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

export const fetchDataModelListPaged = (page = 1, params) => (dispatch) => {
  dispatch(toggleLoading('dataModel'));
  return getDataModels(page, params).then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
      dispatch(toggleLoading('dataModel'));
    } else {
      dispatch(setDataModels(data.payload));
      dispatch(toggleLoading('dataModel'));
      dispatch(setPage(data.metaData));
    }
  });
};
