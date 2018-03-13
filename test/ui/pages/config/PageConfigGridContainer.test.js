
import { mapStateToProps } from 'ui/pages/config/PageConfigGridContainer';

// mocked
import { getPageModelStruct } from 'state/page-models/selectors';
import { getCurrentPageWidgets } from 'state/pages/selectors';


jest.mock('state/pages/actions', () => ({
  fetchPageConfigData: jest.fn().mockReturnValue('fetchPageConfigData_result'),
}));

jest.mock('state/page-models/selectors', () => ({
  getPageModelStruct: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getCurrentPageWidgets: jest.fn(),
}));


describe('PageConfigGridContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    const getPageModelStructResult = 'getPageModelStruct_result';
    const getCurrentPageWidgetsResult = 'getCurrentPageWidgets_result';
    let props;
    beforeEach(() => {
      getPageModelStruct.mockReturnValue(getPageModelStructResult);
      getCurrentPageWidgets.mockReturnValue(getCurrentPageWidgetsResult);
      props = mapStateToProps({});
    });

    it('maps prop "pageModelStruct" with getPageModelStruct(state)', () => {
      expect(props.pageModelStruct).toBe(getPageModelStructResult);
    });

    it('maps prop "pageModelStruct" with getPageModelStruct(state)', () => {
      expect(props.pageModelStruct).toBe(getPageModelStructResult);
    });
  });
});
