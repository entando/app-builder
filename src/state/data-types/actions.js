import { SET_DATA_TYPES } from 'state/data-types/types';
import { addErrors } from 'state/errors/actions';
import { getDataTypes } from 'api/dataTypes';
import { DATA_TYPES } from 'test/mocks/dataTypes';


export const setDataTypes = dataTypes => ({
  type: SET_DATA_TYPES,
  payload: {
    dataTypes,
  },
});

// thunk
export const fetchDataTypes = () => dispatch =>
  getDataTypes(DATA_TYPES).then((data) => {
    if (data.errors && data.errors.length) {
      dispatch(addErrors(data.errors.map(err => err.message)));
    } else {
      dispatch(setDataTypes(data));
    }
  });
