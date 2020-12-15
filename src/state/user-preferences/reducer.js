import { SET_USER_PREFERENCES } from 'state/user-preferences/types';

const initialState = {
  wizard: true,
  translationWarning: true,
  loadOnPageSelect: true,
  displayAttributes: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_PREFERENCES: {
      return { ...action.payload.preferences };
    }
    default: return state;
  }
};

export default reducer;
