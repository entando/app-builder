import { SET_USER_PROFILE, SET_USER_PROFILE_PICTURE } from 'state/user-profile/types';

const initialState = {
  id: null,
  typeCode: null,
  typeDescription: null,
  attributes: [],
  profilePicture: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_PROFILE: {
      return { ...action.payload.profile };
    }
    case SET_USER_PROFILE_PICTURE: {
      return {
        ...state,
        profilePicture: action.payload.versions,
      };
    }
    default: return state;
  }
};

export default reducer;
