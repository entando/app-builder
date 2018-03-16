import { SET_DATA_MODELS } from 'state/data-models/types';
import { getDataModels } from 'api/dataModels';
import { addErrors } from 'state/errors/actions';
import { setPage } from 'state/pagination/actions';

export const setDataModels = dataModelsPaged => ({
  type: SET_DATA_MODELS,
  payload: {
    dataModelsPaged,
  },
});

export const fetchDataModelListPaged = (page = 1, params) => dispatch =>
  getDataModels(page, params).then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      dispatch(setDataModels(data.payload));
      dispatch(setPage(data.metaData));
    }
  });
