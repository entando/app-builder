import { SET_PAGE_STATUS } from 'state/dashboard/types';

const defaultState = {
  draft: 0,
  published: 0,
  unpublished: 0,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_PAGE_STATUS:
      return { ...action.payload.pageStatus };
    default:
      return state;
  }
};

export default reducer;
