import { SET_API } from 'state/api/types';

// eslint-disable-next-line
export const setApi = api => ({
  type: SET_API,
  payload: {
    api,
  },
});
