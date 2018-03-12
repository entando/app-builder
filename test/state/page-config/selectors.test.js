import { getGroupedWidgetList, filterWidgetList, getViewList, getSearchFilter, getPageConfig } from 'state/page-config/selectors';
import { WIDGET_LIST, WIDGET_ONE_ELEMENT, WIDGET_ONE_LIST } from 'test/mocks/widgetList';
import { getListWidget } from 'state/widgets/selectors';

const MOCK_DATA = {
  content: 'WIDGET_LIST',
  searchFilter: 'first',
  viewList: 'list',
};
const MOCK_STATE = {
  pageConfig: MOCK_DATA,
};

jest.mock('state/widgets/selectors', () => (
  {
    getListWidget: jest.fn(),
  }
));

getListWidget.mockReturnValue(WIDGET_LIST.payload);

describe('state/page-config/selectors', () => {
  it('getPageConfig(state) return a pageConfig object', () => {
    const pageConfig = getPageConfig(MOCK_STATE);
    expect(pageConfig).toMatchObject(MOCK_STATE.pageConfig);
  });
  it('verify getSearchFilter selector', () => {
    expect(getSearchFilter(MOCK_STATE)).toEqual(MOCK_DATA.searchFilter);
  });
  it('verify getViewList selector', () => {
    expect(getViewList(MOCK_STATE)).toEqual(MOCK_DATA.viewList);
  });
  it('verify filterWidgetList selector', () => {
    expect(filterWidgetList(MOCK_STATE)).toEqual([WIDGET_ONE_ELEMENT]);
  });
  it('verify getGroupedWidgetList selector', () => {
    expect(getGroupedWidgetList(MOCK_STATE)).toEqual(WIDGET_ONE_LIST);
  });
});
