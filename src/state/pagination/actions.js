import { SET_PAGE } from 'state/pagination/types';
import { NAMESPACE_GLOBAL } from 'state/pagination/const';

// eslint-disable-next-line import/prefer-default-export
export const setPage = (page, namespace = NAMESPACE_GLOBAL) => ({
  type: SET_PAGE,
  payload: {
    page,
    namespace,
  },
});
