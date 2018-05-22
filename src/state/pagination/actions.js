import { SET_PAGE } from 'state/pagination/types';

// eslint-disable-next-line
export const setPage = (page, namespace = 'global') => ({
  type: SET_PAGE,
  payload: {
    page,
    namespace,
  },
});
