import { SET_CURRENT_COLUMNS_SHOW } from 'state/table-columns/types';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_COLUMNS_SHOW: {
      return {
        ...state,
        currentColumnsShow: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
