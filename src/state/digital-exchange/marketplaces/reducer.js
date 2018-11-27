import { combineReducers } from 'redux';
import { SET_SELECTED_DE_MARKETPLACE, SET_DE_MARKETPLACES } from 'state/digital-exchange/marketplaces/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DE_MARKETPLACE: {
      return action.payload.digitalExchangeMarketplace;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DE_MARKETPLACES: {
      return action.payload.digitalExchangeMarketplaces;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
