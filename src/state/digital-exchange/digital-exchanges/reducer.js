import { combineReducers } from 'redux';
import {
  SET_SELECTED_DIGITAL_EXCHANGE,
  SET_DIGITAL_EXCHANGES,
  REMOVE_DIGITAL_EXCHANGE,
} from 'state/digital-exchange/digital-exchanges/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DIGITAL_EXCHANGE: {
      return action.payload.digitalExchange;
    }
    case REMOVE_DIGITAL_EXCHANGE: {
      return state.id === action.payload.digitalExchange ? {} : state;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DIGITAL_EXCHANGES: {
      return action.payload.digitalExchanges;
    }
    case REMOVE_DIGITAL_EXCHANGE: {
      const marketplaceIndex = state.findIndex(objectInArray => (
        objectInArray.id === action.payload.digitalExchange
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
