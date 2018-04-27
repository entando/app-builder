import {
  getListWidget,
  getWidgets,
  getTypologyWidgetList,
  getWidgetsTotal,
} from 'state/widgets/selectors';
import { WIDGET_LIST, LIST, WIDGETS_MAP } from 'test/mocks/widgets';


const MOCK_STATE = {
  widgets: {
    list: LIST,
    map: WIDGETS_MAP,
    total: 2,
  },
};

// console.log(MOCK_STATE);

describe('state/widgest/selectors', () => {
  it('getWidgets return the widgets state', () => {
    const result = getWidgets(MOCK_STATE);
    expect(result).toBe(MOCK_STATE.widgets);
  });

  it('getListWidget return array of widget', () => {
    const result = getListWidget(MOCK_STATE);
    expect(result).toEqual(WIDGET_LIST.payload);
  });

  it('getTypologyWidgetList selectors', () => {
    const result = getTypologyWidgetList(MOCK_STATE);
    expect(result).toHaveProperty('User Widget');
    expect(result['User Widget']).toHaveLength(3);
    expect(result).toHaveProperty('Custom Widget');
    expect(result['Custom Widget']).toHaveLength(2);
  });

  it('getWidgetsTotal returns the total number of widgets', () => {
    expect(getWidgetsTotal(MOCK_STATE)).toBe(2);
  });
});
