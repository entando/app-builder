import { ADD_ROLES } from 'state/roles/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_ROLES: {
      return action.payload.roles;
    }
    default: return state;
  }
};

export default reducer;
