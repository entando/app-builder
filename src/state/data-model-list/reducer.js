import { combineReducers } from 'redux';
import { SET_DATA_MODELS } from 'state/data-model-list/types';

export const getModelsList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_MODELS: {
      return action.payload.dataModels;
    }
    default: return state;
  }
};

export default combineReducers({
  list: getModelsList,
});
