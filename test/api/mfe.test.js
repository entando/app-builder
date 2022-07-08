import 'test/enzyme-init';
import { getMfeConfigList } from 'api/mfe';
import { makeRequest, METHODS } from '@entando/apimanager';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

describe('api/mfe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMfeConfigList', () => {
    it('returns a promise', () => {
      expect(getMfeConfigList()).toBeInstanceOf(Promise);
    });

    it('makes the correct request', () => {
      getMfeConfigList();
      expect(makeRequest).toHaveBeenCalledWith({
        uri: '/bundles/all/widgets?filters[0].value=app-builder&filters[0].attribute=widgetType&filters[0].operator=eq',
        domain: '/digital-exchange',
        method: METHODS.GET,
        mockResponse: LIST_MFE_RESPONSE_OK,
        useAuthentication: true,
      });
    });
  });
});
