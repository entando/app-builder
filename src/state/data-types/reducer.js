import { SET_DATA_TYPES } from 'state/data-types/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_TYPES: {
      return action.payload.dataModels;
    }
    default: return state;
  }
};

export default reducer;
