import { SET_PAGE } from 'state/pagination/types';
import { isInteger } from '@entando/utils';

const initialState = {
  global: {
    page: 1,
    pageSize: 10,
    lastPage: 1,
    totalItems: 0,
  },
};

const isPageValid = (page, lastPage, totalItems) => {
  if (
    !isInteger(page) ||
    (totalItems > 0 && page > lastPage) ||
    page < 1
  ) {
    return false;
  }
  return true;
};

const isPageSizeValid = (pageSize) => {
  if (!isInteger(pageSize) || pageSize < 0) {
    return false;
  }
  return true;
};

const isTotalItemsValid = totalItems => isInteger(totalItems) && totalItems >= 0;

const isLastPageValid = (lastPage) => {
  if (!isInteger(lastPage)) {
    return false;
  }
  return true;
};

const isPayloadValid = (payload) => {
  if (!isPageValid(payload.page, payload.lastPage, payload.totalItems) ||
    !isPageSizeValid(payload.pageSize) ||
    !isLastPageValid(payload.lastPage) ||
    !isTotalItemsValid(payload.totalItems)
  ) {
    return false;
  }
  return true;
};

const castValues = page => (
  {
    page: parseFloat(page.page),
    pageSize: parseFloat(page.pageSize),
    lastPage: parseFloat(page.lastPage),
    totalItems: parseFloat(page.totalItems),
  }
);

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PAGE: {
      return isPayloadValid(action.payload.page) ?
        { ...state, [action.payload.namespace]: castValues(action.payload.page) } :
        state;
    }
    default: return state;
  }
};

export default reducer;
