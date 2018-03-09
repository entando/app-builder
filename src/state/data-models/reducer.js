import { combineReducers } from 'redux';
import { SET_DATA_MODELS_PAGED } from 'state/data-models/types';

export const getModelsListPaged = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_MODELS_PAGED: {
      return action.payload.dataModelsPaged;
    }
    default: return state;
  }
};

export default combineReducers({
  pagedList: getModelsListPaged,
});
