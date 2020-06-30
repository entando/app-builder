import { TOGGLE_LOADING, SET_LOADING } from 'state/loading/types';

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

export default toggleLoading;
