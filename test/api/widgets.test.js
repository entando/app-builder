import 'test/enzyme-init';
import { getWidget } from 'api/widgets';
import { makeRequest, METHODS } from 'api/apiManager';


const WIDGET_CODE = 'test_widget';

jest.unmock('api/widgets');

jest.mock('api/apiManager', () => {
  const makeMockRequest = jest.fn(() => new Promise(resolve => resolve({})));
  return {
    makeRequest: makeMockRequest,
    makeMockRequest,
    METHODS: require.requireActual('api/apiManager').METHODS,
  };
});

beforeEach(jest.clearAllMocks);

describe('getWidget()', () => {
  it('returns a promise', () => {
    expect(getWidget(WIDGET_CODE)).toBeInstanceOf(Promise);
  });

  it('makes the correct request', () => {
    getWidget(WIDGET_CODE);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      uri: `/api/widgets/${WIDGET_CODE}`,
      method: METHODS.GET,
      useAuthentication: true,
    }));
  });
});
