
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/PageConfigPageContainer';


jest.mock('state/pages/actions', () => ({
  fetchPageConfigData: jest.fn().mockReturnValue('fetchPageConfigData_result'),
}));

jest.mock('state/page-models/selectors', () => ({
  getPageModelStruct: jest.fn().mockReturnValue('getPageModelStruct_result'),
}));

describe('PageConfigPageContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    describe('prop onWillMount', () => {
      beforeEach(() => {
        props.onWillMount();
      });
      it('dispatch fetchPageConfigData', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchPageConfigData_result');
      });
    });
  });
});
