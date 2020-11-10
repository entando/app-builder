import { mapDispatchToProps } from 'ui/pages/config/WidgetGroupingsContainer';
import { getViewList } from 'state/page-config/selectors';

jest.mock('state/page-config/selectors', () => (
  {
    getGroupedWidgetList: jest.fn(),
    getViewList: jest.fn(),
  }
));

getViewList.mockReturnValue('list');
const dispatchMock = jest.fn();

describe('WidgetGroupingsContainer', () => {
  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.filterWidget).toBeDefined();
    });

    it('should dispatch an action if filterWidget is called', () => {
      props.filterWidget({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
