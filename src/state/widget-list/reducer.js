import { SET_STATE } from 'state/widget-list/types';

const initialState = {
  tableRow: [],
};

const tableRowItems = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE: {
      return Object.assign({}, state, action.payload);
    }
    default: return state;
  }
};

export default tableRowItems;
