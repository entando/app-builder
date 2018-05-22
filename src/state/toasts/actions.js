import { ADD_TOAST, REMOVE_TOAST } from 'state/toasts/types';

export const addToast = (message, type) => ({
  type: ADD_TOAST,
  payload: {
    message,
    type,
  },
});

export const removeToast = id => ({
  type: REMOVE_TOAST,
  payload: {
    id,
  },
});
