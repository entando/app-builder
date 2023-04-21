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
        uri: '/bundles/all/widgets?filters%5B0%5D.value=app-builder&filters%5B0%5D.attribute=widgetType&filters%5B0%5D.operator=eq',
        domain: '/digital-exchange',
        method: METHODS.GET,
        mockResponse: LIST_MFE_RESPONSE_OK,
        useAuthentication: true,
      });
    });
  });
});
