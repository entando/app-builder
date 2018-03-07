import { SET_DATA_MODELS } from 'state/data-model-list/types';
import { getDataModels } from 'api/dataModels';
import { DATA_MODELS } from 'test/mocks/dataModels';
import { addErrors } from 'state/errors/actions';

export const setDataModels = dataModels => ({
  type: SET_DATA_MODELS,
  payload: {
    dataModels,
  },
});

export const fetchDataModelList = () => dispatch =>
  getDataModels(DATA_MODELS).then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      dispatch(setDataModels(data));
    }
  });
