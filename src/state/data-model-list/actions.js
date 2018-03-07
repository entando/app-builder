import { getDataModels } from 'api/dataModels';
import { SET_DATA_MODELS } from './types';

// eslinter-disable-next-line
export const setDataModels = tableRow => ({
  type: SET_DATA_MODELS,
  payload: {
    tableRow,
  },
});

export const fetchDataModelListRow = () => dispatch =>
  getDataModels().then((data) => {
    dispatch(setDataModels(data.payload.tableRow));
  });
