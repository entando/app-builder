import reducer from 'state/widget-list/reducer';
import { getWidgetRow } from 'state/widget-list/actions';
import { WIDGETTABLEROW } from 'test/mocks/widgetList';

const WIDGET_LIST_PAYLOAD = WIDGETTABLEROW.payload;

describe('state/widget-list/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_STATE', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, getWidgetRow(WIDGET_LIST_PAYLOAD.tableRow));
    });
    it('should define tableRow', () => {
      expect(state.tableRow).toBeDefined();
    });
  });
});
