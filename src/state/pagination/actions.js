import { SET_PAGE } from 'state/pagination/types';

// eslint-disable-next-line
export const setPage = page => ({
  type: SET_PAGE,
  payload: {
    page,
  },
});
