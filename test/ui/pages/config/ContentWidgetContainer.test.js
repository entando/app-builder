
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/ContentWidgetContainer';
import { WIDGET_LIST, WIDGET_ONE_LIST } from 'test/mocks/widgetList';
import { getGroupedWidgetList, getViewList } from 'state/page-config/selectors';

const TEST_STATE = {
  widgets: {
    list: WIDGET_LIST.payload,
  },
  pageConfig: {
    viewList: 'list',
  },
};

jest.mock('state/page-config/selectors', () => (
  {
    getGroupedWidgetList: jest.fn(),
    getViewList: jest.fn(),
  }
));

getGroupedWidgetList.mockReturnValue(WIDGET_ONE_LIST);
getViewList.mockReturnValue('list');
const dispatchMock = jest.fn();

describe('ContentWidgetContainer', () => {
  it('mapStateToProps props are correctly defined ', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      widgetList: getGroupedWidgetList(TEST_STATE),
      viewList: getViewList(TEST_STATE),
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.filterWidget).toBeDefined();
      expect(props.changeViewList).toBeDefined();
    });

    it('should dispatch an action if filterWidget is called', () => {
      props.filterWidget({});
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch an action if changeViewList is called', () => {
      props.changeViewList({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
