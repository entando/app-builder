import { combineReducers } from 'redux';
import { SET_DATA_MODELS } from 'state/data-models/types';

export const getModelsList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_MODELS: {
      return action.payload.dataModelsPaged;
    }
    default: return state;
  }
};

export default combineReducers({
  pagedList: getModelsList,
});
