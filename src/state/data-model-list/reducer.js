import { combineReducers } from 'redux';
import { SET_DATA_MODELS, SET_DATA_MODELS_PAGED } from 'state/data-model-list/types';

export const getModelsList = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_MODELS: {
      return action.payload.dataModels;
    }
    default: return state;
  }
};

export const getModelsListPaged = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_MODELS_PAGED: {
      return action.payload.dataModelsPaged;
    }
    default: return state;
  }
};

export default combineReducers({
  list: getModelsList,
  pagedList: getModelsListPaged,
});
