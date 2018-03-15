import { SET_API } from 'state/api/types';

const initialState = {
  useMocks: true,
  domain: null,
};

const isUseMockValid = useMocks => typeof useMocks === 'boolean';

const isDomainValid = (domain, useMocks) => (
  // eslint-disable-next-line no-useless-escape
  (useMocks && domain == null) || /^(http(s)?\:)?\/\/[a-z0-9][a-z0-9-]+(\.)?[a-z0-9-]*\.[a-z]{2,6}(\/[a-zA-Z0-9-_]+)?$/i.test(domain)
);

const isPayloadValid = payload => (isUseMockValid(payload.useMocks) &&
  isDomainValid(payload.domain, payload.useMocks));

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_API: {
      return isPayloadValid(action.payload.api) ? action.payload.api : state;
    }
    default: return state;
  }
};

export default reducer;
