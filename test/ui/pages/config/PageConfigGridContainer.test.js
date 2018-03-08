
import { mapStateToProps } from 'ui/pages/config/PageConfigGridContainer';


jest.mock('state/pages/actions', () => ({
  fetchPageConfigData: jest.fn().mockReturnValue('fetchPageConfigData_result'),
}));

jest.mock('state/page-models/selectors', () => ({
  getPageModelStruct: jest.fn().mockReturnValue('getPageModelStruct_result'),
}));

describe('PageConfigGridContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });
    it('maps prop "pageModelStruct" with getPageModelStruct(state)', () => {
      expect(props.pageModelStruct).toBe('getPageModelStruct_result');
    });
  });
});
