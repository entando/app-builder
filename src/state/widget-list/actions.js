import { getApiWidgetList } from 'api/widgetList';
import { SET_STATE } from './types';

// eslinter-disable-next-line
export const getWidgetRow = tableRow => ({
  type: SET_STATE,
  payload: {
    tableRow,
  },
});

export const fetchWidgetListRow = () => (dispatch) => {
  getApiWidgetList().then((data) => {
    console.log('data actions', data.payload.tableRow);
    dispatch(getWidgetRow(data.payload.tableRow));
  });
};
