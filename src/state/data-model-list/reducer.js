import { SET_DATA_MODELS } from './types';

const initialState = {
  tableRow: [],
};

const tableRowItems = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_DATA_MODELS: {
      return Object.assign({}, state, action.payload);
    }
    default: return state;
  }
};

export default tableRowItems;
