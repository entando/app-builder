import { SET_PAGE } from 'state/pagination/types';

const isAttributeANumber = attribute => (
  !Number.isNaN(parseFloat(attribute)) && Number.isInteger(parseFloat(attribute))
);

const isPageValid = (page, lastPage) => {
  if (!isAttributeANumber(page) ||
    page < 1 ||
    page > lastPage
  ) {
    return false;
  }
  return true;
};

const isPageSizeValid = (pageSize) => {
  if (!isAttributeANumber(pageSize) || pageSize < 0) {
    return false;
  }
  return true;
};

const isLastPageValid = (lastPage) => {
  if (!isAttributeANumber(lastPage)) {
    return false;
  }
  return true;
};

const isPayloadValid = (payload) => {
  if (!isPageValid(payload.page, payload.lastPage) ||
    !isPageSizeValid(payload.pageSize) ||
    !isLastPageValid(payload.lastPage)
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
  }
);

const reducer = (state = { page: null, pageSize: null, lastPage: null }, action = {}) => {
  switch (action.type) {
    case SET_PAGE: {
      return isPayloadValid(action.payload.page) ? castValues(action.payload.page) : state;
    }
    default: return state;
  }
};

export default reducer;
