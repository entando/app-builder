import { TOGGLE_NOTIFICATION_DRAWER } from './types';

const initialState = {
  hidden: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_DRAWER: {
      return Object.assign(
        {},
        state,
        { hidden: !state.hidden },
      );
    }
    default: return state;
  }
};

export default reducer;
