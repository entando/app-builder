import { SET_LANGUAGE } from 'state/locale/types';

const initialState = 'en';

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.payload.locale;
    default: return state;
  }
};

export default reducer;
