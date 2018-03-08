import configureMockStore from 'redux-mock-store';

import { config, makeRequest } from 'api/ApiManager';

// jest.unmock('api/ApiManager');

const mockStore = configureMockStore([]);

const fetch = jest.spyOn(window, 'fetch').mockImplementation(() => {});

const MOCKED = {
  api: {
    useMocks: true,
  },
};

const REAL = {
  api: {
    useMocks: false,
  },
};

const validRequest = {
  uri: '/api/test',
  method: 'GET',
  mockResponse: {},
};

describe('ApiManager', () => {
  beforeEach(() => {
    config(mockStore(MOCKED));
  });

  it('cannot make a request if request is not an object', () => {
    expect(makeRequest).toThrowError('invalid request object');
  });

  it('cannot make a request if request is missing the uri', () => {
    const badRequest = () => { makeRequest({ method: 'GET', mockResponse: {} }); };
    expect(badRequest).toThrowError('invalid request object');
  });

  describe('method validation', () => {
    it('cannot make a request if request is missing the method', () => {
      const badRequest = () => { makeRequest({ uri: '/api/test', mockResponse: {} }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('cannot make a request if the request method is invalid', () => {
      const badRequest = () => { makeRequest({ method: 'LET', uri: '/api/test', mockResponse: {} }); };
      expect(badRequest).toThrowError('invalid request object');
    });
  });

  describe('mockResponse validation', () => {
    it('cannot make a request if request is missing the mockResponse', () => {
      const badRequest = () => { makeRequest({ method: 'GET', uri: '/api/test' }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('cannot make a request if the request mockResponse is not an object', () => {
      const badRequest = () => { makeRequest({ method: 'GET', uri: '/api/test', mockResponse: 's' }); };
      expect(badRequest).toThrowError('invalid request object');
    });
  });

  describe('mock request', () => {
    it('fetches from the mock when useMocks is true', () => {
      makeRequest(validRequest);
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('api request', () => {
    beforeEach(() => {
      config(mockStore(REAL));
    });

    it('fetches from the real api when useMocks is false', () => {
      makeRequest(validRequest);
      expect(fetch).toHaveBeenCalled();
    });
  });
});
