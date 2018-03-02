
import { ADD_ERRORS, CLEAR_ERRORS } from 'state/errors/types';

export const addErrors = errors => ({
  type: ADD_ERRORS,
  payload: {
    errors,
  },
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

