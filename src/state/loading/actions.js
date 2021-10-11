import { TOGGLE_LOADING, SET_LOADING, TOGGLE_GROUP_ITEM_LOADING } from 'state/loading/types';

export const toggleLoading = id => ({
  type: TOGGLE_LOADING,
  payload: {
    id,
  },
});

export const setLoading = (id, value) => ({
  type: SET_LOADING,
  payload: {
    id,
    value,
  },
});

export const toggleGroupItemLoading = (id, group) => ({
  type: TOGGLE_GROUP_ITEM_LOADING,
  payload: {
    id,
    group,
  },
});

export default toggleLoading;
