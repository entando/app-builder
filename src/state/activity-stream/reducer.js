import { CLOSE_NOTIFICATION_DRAWER } from './types';

const initialState = {
  notificationDrawerIsHide: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLOSE_NOTIFICATION_DRAWER: {
      return Object.assign(
        {},
        state,
        { notificationDrawerIsHide: !state.notificationDrawerIsHide },
      );
    }
    default: return state;
  }
};

export default reducer;
