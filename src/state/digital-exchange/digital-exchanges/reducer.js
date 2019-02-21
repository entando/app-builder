import { combineReducers } from 'redux';
import { SET_SELECTED_DIGITAL_EXCHANGE, SET_DIGITAL_EXCHANGES } from 'state/digital-exchange/digital-exchanges/types';


const selected = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_DIGITAL_EXCHANGE: {
      return action.payload.digitalExchange;
    }
    default: return state;
  }
};

const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DIGITAL_EXCHANGES: {
      return action.payload.digitalExchanges;
    }
    default: return state;
  }
};

export default combineReducers({
  selected,
  list,
});
