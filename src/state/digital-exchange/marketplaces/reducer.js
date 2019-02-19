import { combineReducers } from 'redux';
import {
  SET_SELECTED_DE_MARKETPLACE,
  SET_DE_MARKETPLACES,
  REMOVE_DE_MARKETPLACE,
} from 'state/digital-exchange/marketplaces/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DE_MARKETPLACE: {
      return action.payload.digitalExchangeMarketplace;
    }
    case REMOVE_DE_MARKETPLACE: {
      return state.id === action.payload.marketplace ? {} : state;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DE_MARKETPLACES: {
      return action.payload.digitalExchangeMarketplaces;
    }
    case REMOVE_DE_MARKETPLACE: {
      const marketplaceIndex = state.findIndex(objectInArray => (
        objectInArray.id === action.payload.marketplace
      ));

      if (marketplaceIndex === -1) {
        return state;
      }
      const newState = state.slice();
      newState.splice(marketplaceIndex, 1);
      return newState;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
