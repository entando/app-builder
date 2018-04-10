import { ADD_ALERT, CLEAR_ALERT } from 'state/alerts/types';

export const addAlert = (id, type) => ({
  type: ADD_ALERT,
  payload: {
    id,
    type,
  },
});

export const clearAlert = id => ({
  type: CLEAR_ALERT,
  payload: {
    id,
  },
});
