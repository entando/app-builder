import { SET_DATA_TYPES } from 'state/data-types/types';
import { getDataTypes } from 'api/dataTypes';
import { setPage } from 'state/pagination/actions';


export const setDataTypes = dataTypes => ({
  type: SET_DATA_TYPES,
  payload: {
    dataTypes,
  },
});

// thunk
export const fetchDataTypes = (page = 1, params) => dispatch =>
  getDataTypes(page, params).then((data) => {
    dispatch(setDataTypes(data.payload));
    dispatch(setPage(data.metaData));
  });
