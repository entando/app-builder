import 'test/enzyme-init';
import { getWidget, getWidgets, postWidgets, putWidgets, deleteWidgets } from 'api/widgets';
import { makeRequest, METHODS } from 'api/apiManager';
import { BODY_OK, WIDGET_LIST, WIDGET_POST_PUT } from 'test/mocks/widgets';

const correctRequest = {
  uri: '/api/widgets',
  method: METHODS.GET,
  mockResponse: WIDGET_LIST.payload,
  useAuthentication: true,
};

const correctRequestWidget = {
  uri: '/api/widgets',
  method: METHODS.GET,
  mockResponse: BODY_OK,
  useAuthentication: true,
  errors: expect.any(Function),
};


jest.unmock('api/widgets');
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE',
  },
}));

describe('api/widgets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getWidget', () => {
    it('returns a promise', () => {
      expect(getWidget()).toBeInstanceOf(Promise);
    });
    it('returns a widget', () => {
      expect(getWidget('test'));
      expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
        ...correctRequestWidget,
        uri: '/api/widgets/test',
      }));
    });
  });

  describe('getWidgets', () => {
    it('returns a promise', () => {
      expect(getWidgets()).toBeInstanceOf(Promise);
    });

    it('get getWidgetList page 1 by default', () => {
      getWidgets({ page: 1, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining(correctRequest),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });

    it('request page 2', () => {
      getWidgets({ page: 2, pageSize: 10 });
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining(correctRequest),
        {
          page: 2,
          pageSize: 10,
        },
      );
    });

    it('request different page size', () => {
      getWidgets({ page: 1, pageSize: 5 });
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining(correctRequest),
        {
          page: 1,
          pageSize: 5,
        },
      );
    });

    it('makes the request with additional params', () => {
      getWidgets({ page: 1, pageSize: 10 }, '?param=true');
      expect(makeRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          ...correctRequest,
          uri: '/api/widgets?param=true',
        }),
        {
          page: 1,
          pageSize: 10,
        },
      );
    });
  });

  describe('postWidgets', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(postWidgets()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      postWidgets(WIDGET_POST_PUT);
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: '/api/widgets',
        method: 'POST',
        body: WIDGET_POST_PUT,
        mockResponse: WIDGET_POST_PUT,
      });
    });
  });

  describe('putWidgets', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(putWidgets()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      putWidgets('AAA', WIDGET_POST_PUT);
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: '/api/widgets/AAA',
        method: 'PUT',
        body: WIDGET_POST_PUT,
        mockResponse: WIDGET_POST_PUT,
      });
    });
  });

  describe('deleteWidgets', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns a promise', () => {
      expect(deleteWidgets()).toBeInstanceOf(Promise);
    });

    it('if successful, returns a mock ok response', () => {
      deleteWidgets('AAA');
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequest,
        uri: '/api/widgets/AAA',
        method: 'DELETE',
        mockResponse: { code: 'AAA' },
      });
    });
  });
});
