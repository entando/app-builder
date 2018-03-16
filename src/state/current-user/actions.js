import { SET_USER } from 'state/current-user/types';

// eslint-disable-next-line
export const setUser = user => ({
  type: SET_USER,
  payload: {
    user,
  },
});
