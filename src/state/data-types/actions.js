import { SET_DATA_TYPES } from 'state/data-types/types';
import { getDataTypes } from 'api/dataTypes';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';


export const setDataTypes = dataTypes => ({
  type: SET_DATA_TYPES,
  payload: {
    dataTypes,
  },
});

// thunk
export const fetchDataTypes = (page = 1, params) => (dispatch) => {
  dispatch(toggleLoading('dataType'));
  return getDataTypes(page, params).then((data) => {
    dispatch(setDataTypes(data.payload));
    dispatch(toggleLoading('dataType'));
    dispatch(setPage(data.metaData));
  });
};
