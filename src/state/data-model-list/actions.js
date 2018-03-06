import { getApiDataModelList } from 'api/dataModels';
import { SET_STATE } from './types';

// eslinter-disable-next-line
export const getDataModelRow = tableRow => ({
  type: SET_STATE,
  payload: {
    tableRow,
  },
});

export const fetchDataModelListRow = () => dispatch => getApiDataModelList().then((data) => {
  dispatch(getDataModelRow(data.payload.tableRow));
});
