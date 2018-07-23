import { SET_USER_PROFILE } from 'state/user-profile/types';

const initialState = {
  id: null,
  typeCode: null,
  typeDescription: null,
  attributes: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return { ...action.payload.profile };
    }
    default: return state;
  }
};

export default reducer;
