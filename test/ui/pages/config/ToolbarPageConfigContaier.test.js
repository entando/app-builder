import { mapDispatchToProps } from 'ui/pages/config/ToolbarPageConfigContainer';

jest.mock('state/widgets/actions', () => ({
  fetchWidgetList: jest.fn().mockReturnValue('widgetList'),
}));

describe('ToolbarPageConfigContainer', () => {
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
      it('dispatch fetchWidgetList', () => {
        expect(dispatchMock).toHaveBeenCalledWith('widgetList');
      });
    });
  });
});
