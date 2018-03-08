import { SET_API } from 'state/api/types';

const initialState = {
  useMocks: true,
  domain: null,
};

const isUseMockValid = useMocks => typeof useMocks === 'boolean';

const isDomainValid = (domain, useMocks) => (
  // eslint-disable-next-line no-useless-escape
  (useMocks && domain == null) || /^(http(s)?\:)?\/\/[a-z0-9][a-z0-9-]*(\.)?[a-z0-9-]*\.[a-z]{2,6}$/i.test(domain)
);

const isPayloadValid = (payload) => {
  if (!isUseMockValid(payload.useMocks) ||
    !isDomainValid(payload.domain, payload.useMocks)
  ) {
    return false;
  }
  return true;
};
//
// const castValues = page => (
//   {
//     useMocks: page,
//     pageSize: parseFloat(page.pageSize),
//     lastPage: parseFloat(page.lastPage),
//   }
// );

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_API: {
      return isPayloadValid(action.payload.api) ? action.payload.api : state;
    }
    default: return state;
  }
};

export default reducer;
