import { SET_STATE } from './types';

const tableRowItems = (state = [], action = {}) => {
  switch (action.type) {
    case SET_STATE: {
      return action.payload.tableRow;
    }
    default: return state;
  }
};

export default tableRowItems;
