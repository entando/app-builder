import configureMockStore from 'redux-mock-store';
import { gotoRoute } from 'frontend-common-components';

import { config, makeRequest, METHODS } from 'api/apiManager';
import { ROUTE_HOME } from 'app-init/router';
import { UNSET_USER } from 'state/current-user/types';

const mockStore = configureMockStore([]);

const MOCKED_GOOD_RESPONSE = { code: 12 };
const REAL_GOOD_RESPONSE = { payload: { code: 30 } };

const MOCKED = {
  api: {
    useMocks: true,
  },
  currentUser: {
    token: null,
  },
};

const REAL = {
  api: {
    useMocks: false,
    domain: '//google.com',
  },
  currentUser: {
    token: null,
  },
};

const validRequest = {
  uri: '/api/test',
  method: METHODS.GET,
  mockResponse: MOCKED_GOOD_RESPONSE,
};

const fetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
  new Promise((resolve) => {
    resolve(REAL_GOOD_RESPONSE);
  })
));

describe('apiManager', () => {
  beforeEach(() => {
    config(mockStore(MOCKED));
    jest.clearAllMocks();
  });

  it('cannot make a request if request is not an object', () => {
    expect(makeRequest).toThrowError('invalid request object');
  });

  it('cannot make a request if request is missing the uri', () => {
    const badRequest = () => { makeRequest({ method: METHODS.GET, mockResponse: {} }); };
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
      const badRequest = () => { makeRequest({ method: METHODS.GET, uri: '/api/test' }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('cannot make a request if the request mockResponse is not an object', () => {
      const badRequest = () => { makeRequest({ method: METHODS.GET, uri: '/api/test', mockResponse: 's' }); };
      expect(badRequest).toThrowError('invalid request object');
    });
  });

  describe('body validation', () => {
    it('can be not defined if the request is get', () => {
      const request = () => { makeRequest({ uri: '/api/test', mockResponse: {}, method: METHODS.GET }); };
      expect(request).not.toThrowError('invalid request object');
    });

    it('has to be defined if the request is POST', () => {
      const badRequest = () => { makeRequest({ uri: '/api/test', mockResponse: {}, method: METHODS.POST }); };
      expect(badRequest).toThrowError('invalid request object');
    });

    it('has to be defined if the request is PUT', () => {
      const badRequest = () => { makeRequest({ uri: '/api/test', mockResponse: {}, method: METHODS.PUT }); };
      expect(badRequest).toThrowError('invalid request object');
    });
  });

  describe('mock request', () => {
    it('fetches from the mock when useMocks is true', (done) => {
      const result = makeRequest(validRequest);
      expect(fetch).not.toHaveBeenCalled();
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toBeInstanceOf(Response);
        expect(data).toHaveProperty('ok', true);
        return data.json();
      }).then((json) => {
        expect(json).toMatchObject({ payload: MOCKED_GOOD_RESPONSE });
        done();
      });
    });

    describe('errors handling', () => {
      it('returns an error if the errors callback is returning an array', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: () => ['test'],
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', false);
          expect(data).toHaveProperty('status', 400);
          return data.json();
        }).then((json) => {
          expect(json).toHaveProperty('payload', {});
          expect(json).toHaveProperty('errors', ['test']);
          done();
        });
      });

      it('does not return an error if the errors callback is not a function', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: 12,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', true);
          done();
        });
      });

      it('does not return an error if the errors callback is not returning an array', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: () => 12,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', true);
          done();
        });
      });

      it('does not return an error if the errors callback is returning an empty array', (done) => {
        const result = makeRequest({
          ...validRequest,
          errors: () => [],
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', true);
          done();
        });
      });
    });

    describe('authentication', () => {
      it('returns 403 if the request requires authentication and no token was found', (done) => {
        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toBeInstanceOf(Response);
          expect(data).toHaveProperty('ok', false);
          expect(data).toHaveProperty('status', 401);
          data.json().then((json) => {
            expect(json).toHaveProperty('payload', {});
            expect(json.errors).toHaveLength(1);
            expect(json.errors).toContainEqual({ code: 120, message: 'authorization required' });
            expect(gotoRoute).toHaveBeenCalledWith(ROUTE_HOME);
            done();
          });
        });
      });
    });
  });

  describe('api request', () => {
    beforeEach(() => {
      config(mockStore(REAL));
    });

    it('fetches from the real api when useMocks is false', (done) => {
      const result = makeRequest(validRequest);
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test',
        {
          method: validRequest.method,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      });
    });

    it('appends the page to the uri when there is no query string', () => {
      makeRequest(validRequest, { page: 1, pageSize: 10 });
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test?page=1&pageSize=10',
        {
          method: validRequest.method,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('appends the page to the uri when there is a query string', () => {
      makeRequest({
        ...validRequest,
        uri: '/api/test?my=var',
      }, { page: 1, pageSize: 10 });
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test?my=var&page=1&pageSize=10',
        {
          method: validRequest.method,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });

    it('sends the body when the request is post', (done) => {
      const result = makeRequest({
        uri: '/api/test',
        method: METHODS.POST,
        mockResponse: MOCKED_GOOD_RESPONSE,
        body: {
          username: 'test',
          password: 'test',
        },
      });
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test',
        {
          method: METHODS.POST,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            username: 'test',
            password: 'test',
          },
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      });
    });

    it('sends the body as x-www-form-urlencoded', (done) => {
      const result = makeRequest({
        uri: '/api/test',
        method: METHODS.POST,
        mockResponse: MOCKED_GOOD_RESPONSE,
        contentType: 'application/x-www-form-urlencoded',
        body: {
          username: 'test',
          password: 'test',
        },
      });
      expect(fetch).toHaveBeenCalledWith(
        '//google.com/api/test',
        {
          method: METHODS.POST,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'username=test&password=test',
        },
      );
      expect(result).toBeInstanceOf(Promise);
      result.then((data) => {
        expect(data).toMatchObject(REAL_GOOD_RESPONSE);
        done();
      });
    });

    describe('authentication', () => {
      it('returns 403 if the request requires authentication and no token was found', (done) => {
        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(fetch).not.toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toHaveProperty('ok', false);
          expect(data).toHaveProperty('status', 401);
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_HOME);
          done();
        });
      });

      it('sends the bearer token if the authentication is necessary and the token is found', (done) => {
        config(mockStore({
          ...REAL,
          currentUser: { token: '395d491d59fba6c5d3a371c9549d7015' },
        }));
        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(fetch).toHaveBeenCalledWith(
          '//google.com/api/test',
          {
            method: validRequest.method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer 395d491d59fba6c5d3a371c9549d7015',
            },
          },
        );
        expect(result).toBeInstanceOf(Promise);
        result.then((data) => {
          expect(data).toMatchObject(REAL_GOOD_RESPONSE);
          done();
        });
      });

      it('redirects and unset the user if fetch returns a 401', (done) => {
        const customFetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
          new Promise((resolve) => {
            resolve({ ok: false, status: 401 });
          })
        ));

        const store = mockStore({
          ...REAL,
          currentUser: { token: '395d491d59fba6c5d3a371c9549d7015' },
        });

        config(store);

        const result = makeRequest({
          ...validRequest,
          useAuthentication: true,
        });
        expect(customFetch).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Promise);
        result.then(() => {
          expect(gotoRoute).toHaveBeenCalledWith(ROUTE_HOME);
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', UNSET_USER);
          done();
        });

        customFetch.mockReset();
        customFetch.mockRestore();
      });
    });
  });
});
