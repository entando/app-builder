import { TOGGLE_LOADING, SET_LOADING, TOGGLE_GROUP_ITEM_LOADING } from 'state/loading/types';

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case TOGGLE_LOADING: {
      const { id } = action.payload;
      return { ...state, [id]: !state[id] };
    }

    case SET_LOADING: {
      const { id, value } = action.payload;
      return { ...state, [id]: value };
    }

    case TOGGLE_GROUP_ITEM_LOADING: {
      const { group, id } = action.payload;

      const groupNameTaken = (state[group] && typeof state[group] !== 'object');
      if (!groupNameTaken) {
        const groupExists = (state[group] && typeof state[group] === 'object');
        return {
          ...state,
          [group]: {
            ...state[group],
            [id]: groupExists ? !state[group][id] : true,
          },
        };
      }
      return state;
    }

    default: return state;
  }
};

export default reducer;
