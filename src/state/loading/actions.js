import { TOGGLE_LOADING } from 'state/loading/types';

export const toggleLoading = id => ({
  type: TOGGLE_LOADING,
  payload: {
    id,
  },
});

export default toggleLoading;
