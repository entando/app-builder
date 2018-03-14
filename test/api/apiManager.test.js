import configureMockStore from 'redux-mock-store';

import { config, makeRequest, METHODS } from 'api/apiManager';

const mockStore = configureMockStore([]);

const MOCKED_GOOD_RESPONSE = { code: 12 };
const REAL_GOOD_RESPONSE = { payload: { code: 30 } };

const fetch = jest.spyOn(window, 'fetch').mockImplementation(() => (
  new Promise((resolve) => {
    resolve(REAL_GOOD_RESPONSE);
  })
));

const MOCKED = {
  api: {
    useMocks: true,
  },
};

const REAL = {
  api: {
    useMocks: false,
    domain: '//google.com',
  },
};

const validRequest = {
  uri: '/api/test',
  method: METHODS.GET,
  mockResponse: MOCKED_GOOD_RESPONSE,
};

describe('apiManager', () => {
  beforeEach(() => {
    config(mockStore(MOCKED));
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
  });
});
