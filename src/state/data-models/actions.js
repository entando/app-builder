import { SET_DATA_MODELS_PAGED } from 'state/data-models/types';
import { getDataModelsPaged } from 'api/dataModels';
import { addErrors } from 'state/errors/actions';
import { setPage } from 'state/pagination/actions';

export const setDataModelsPaged = dataModelsPaged => ({
  type: SET_DATA_MODELS_PAGED,
  payload: {
    dataModelsPaged,
  },
});

export const fetchDataModelListPaged = (page = 1, params) => dispatch =>
  getDataModelsPaged(page, params).then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      dispatch(setDataModelsPaged(data.payload));
      dispatch(setPage(data.metaData));
    }
  });
