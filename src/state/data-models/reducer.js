import { combineReducers } from 'redux';
import { SET_DATA_MODELS } from 'state/data-models/types';


const toMap = (array, id) => array.reduce((acc, item) => {
  acc[item[id]] = item;
  return acc;
}, {});

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATA_MODELS: {
      return toMap(action.payload.dataModels, 'modelId');
    }
    default: return state;
  }
};

export default combineReducers({
  map: reducer,
});
