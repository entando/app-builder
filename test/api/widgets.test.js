import 'test/enzyme-init';
import { getWidget, getWidgets } from 'api/widgets';
import { makeRequest, METHODS } from 'api/apiManager';
import { BODY_OK, WIDGET_LIST } from 'test/mocks/widgets';

const correctRequest = {
  uri: '/api/widgets',
  method: METHODS.GET,
  mockResponse: WIDGET_LIST.payload,
  useAuthentication: true,
};

const correctRequestWidget = {
  uri: '/api/widgets',
  method: METHODS.GET,
  mockResponse: BODY_OK.payload,
  useAuthentication: true,
  errors: expect.any(Function),
};


jest.unmock('api/widgets');
jest.mock('api/apiManager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: { GET: 'GET', POST: 'POST', PUT: 'PUT' },
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
      expect(makeRequest).toHaveBeenCalledWith({
        ...correctRequestWidget,
        uri: '/api/widgets/test',
      });
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
});
