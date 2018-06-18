import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/detail/DetailWidgetPageContainer';

import { fetchWidgetInfo } from 'state/widgets/actions';

jest.mock('state/widgets/actions', () => ({
  fetchWidgetInfo: jest.fn(),
}));

jest.mock('state/widgets/selectors', () => ({
  getWidgetInfo: jest.fn(),
}));

const dispatchMock = jest.fn();
describe('ui/widgets/detail/DetailWidgetPageContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('verify that onWillMount is defined', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchWidgetInfo).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps widgetList property from state', () => {
      expect(props).toHaveProperty('widgetInfo');
    });
  });
});
