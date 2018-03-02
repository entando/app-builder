import 'test/enzyme-init';
import { getPageModels } from 'api/pageModels';
import { GET_LIST_RESPONSE } from 'test/mocks/pageModels';

jest.unmock('api/pageModels');
jest.useFakeTimers();

describe('api/pageModels', () => {
  afterEach(jest.runOnlyPendingTimers);

  describe('getPageModels()', () => {
    it('resolves with a mock page if present', () => {
      expect(getPageModels()).resolves.toEqual(GET_LIST_RESPONSE.payload);
    });
  });
});
