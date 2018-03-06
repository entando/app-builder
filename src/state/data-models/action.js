import { initialize } from 'redux-form';
import { SET_DATA_MODELS } from 'state/data-models/types';
import { addErrors } from 'state/errors/actions';
import { getDataModels } from 'api/dataModels';
import { DATA_MODELS } from 'test/mocks/dataModels';


export const setDataModels = dataModels => ({
  type: SET_DATA_MODELS,
  payload: {
    dataModels,
  },
});

// thunk
export const fetchDataModels = () => (dispatch, getState) =>
  getDataModels(DATA_MODELS).then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      dispatch(setDataModels(data));
      dispatch(initialize('dataModel', getState().dataModels.map));
    }
  });
