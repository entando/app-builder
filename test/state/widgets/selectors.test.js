import {
  getListWidget,
  getWidgets,
  getGroupedWidgets,
  getWidgetGroupingList,
  getWidgetsTotal,
  getWidgetInfo,
  getWidgetIcon,
} from 'state/widgets/selectors';
import { WIDGET_LIST, LIST, WIDGETS_MAP, WIDGET_INFO } from 'test/mocks/widgets';
import { set } from 'lodash';


const MOCK_STATE = {
  widgets: {
    list: LIST,
    map: WIDGETS_MAP,
    total: 2,
    info: WIDGET_INFO,
  },
};

describe('state/widgest/selectors', () => {
  it('getWidgets return the widgets state', () => {
    const result = getWidgets(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.widgets);
  });

  it('getListWidget return array of widget', () => {
    const result = getListWidget(MOCK_STATE);
    expect(result).toEqual(WIDGET_LIST.payload);
  });

  it('getGroupedWidgets selector', () => {
    const result = getGroupedWidgets(MOCK_STATE);
    expect(result).toHaveProperty('User Widget');
    expect(result['User Widget']).toHaveLength(3);
    expect(result).toHaveProperty('Custom Widget');
    expect(result['Custom Widget']).toHaveLength(2);
  });

  it('getWidgetGroupingList selector', () => {
    const result = getWidgetGroupingList(MOCK_STATE);
    expect(result).toHaveLength(3);
    expect(result).toEqual(['Custom Widget', 'Entando Redhat BPM connector', 'User Widget']);
  });

  it('getWidgetsTotal returns the total number of widgets', () => {
    expect(getWidgetsTotal(MOCK_STATE)).toBe(2);
  });

  it('getWidgetInfo return the information of widget', () => {
    const result = getWidgetInfo(MOCK_STATE);
    expect(result).toHaveProperty('code', WIDGET_INFO.code);
    expect(result).toHaveProperty('titles', WIDGET_INFO.titles);
    expect(result).toHaveProperty('data');
  });

  it('getWidgetIcon return the widget icon', () => {
    const result = getWidgetIcon('login_form')(MOCK_STATE);
    expect(result).toBe('asset:my_asset');
  });

  it('getWidgetIcon return puzzle icon if not defined', () => {
    set(MOCK_STATE, 'widgets.map.login_form.icon', undefined);
    const result = getWidgetIcon('login_form')(MOCK_STATE);
    expect(result).toBe('font-awesome:fa-puzzle-piece');
  });
});
