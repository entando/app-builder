import { SET_CURRENT_USER_AUTH, CLEAR_CURRENT_USER_AUTH } from 'state/current-user-auth/types';
import { get, flatten } from 'lodash';

const stringToArr = val => (
  Array.isArray(val) ? val : [val]
);

const initialState = {
  auth: [],
  roles: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER_AUTH: {
      const authMaps = action.payload.map(auths => (
        stringToArr(auths.permissions ? auths.permissions : get(auths, 'role', []))
      ));
      const roles = Array.from(new Set(flatten(authMaps)));
      return { ...state, auth: [...action.payload], roles };
    }
    case CLEAR_CURRENT_USER_AUTH:
      return { ...state, ...initialState };
    default: return state;
  }
};

export default reducer;
