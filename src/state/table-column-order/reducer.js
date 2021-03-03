import { SET_COLUMN_ORDER } from 'state/table-column-order/types';

const initialState = {
  default: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_COLUMN_ORDER: {
      const { table, columns } = action.payload;
      return { ...state, [table]: [...columns] };
    }
    default: return state;
  }
};

export default reducer;
