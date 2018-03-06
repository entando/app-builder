import { ADD_GROUPS } from 'state/groups/types';

const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case ADD_GROUPS: {
      return action.payload.groups;
    }
    default: return state;
  }
};

export default reducer;
