
import { mapDispatchToProps } from 'ui/pages/config/PageConfigPageContainer';

// mocked
import { setSelectedPageModel } from 'state/page-models/actions';


jest.mock('state/page-models/actions', () => ({
  setSelectedPageModel: jest.fn().mockReturnValue('setSelectedPageModel_result'),
}));

jest.mock('state/page-config/actions', () => ({
  initConfigPage: jest.fn().mockReturnValue('initConfigPage_result'),
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
      it('dispatch initConfigPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('initConfigPage_result');
      });
    });

    describe('prop onWillUnmount', () => {
      beforeEach(() => {
        props.onWillUnmount();
      });
      it('dispatch setSelectedPageModel(null)', () => {
        expect(dispatchMock).toHaveBeenCalledWith('setSelectedPageModel_result');
        expect(setSelectedPageModel).toHaveBeenCalledWith(null);
      });
    });
  });
});
