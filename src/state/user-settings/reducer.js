import { SET_USER_SETTINGS } from 'state/user-settings/types';

const initialState = {
  restrictionsActive: null,
  enableGravatarIntegration: null,
  lastAccessPasswordExpirationMonths: null,
  maxMonthsPasswordValid: null,
  passwordAlwaysActive: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_SETTINGS: {
      return { ...action.payload.settings };
    }
    default: return state;
  }
};

export default reducer;
