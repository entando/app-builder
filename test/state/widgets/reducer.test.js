import reducer from 'state/widgets/reducer';
import { getWidgetList } from 'state/widgets/actions';
import { WIDGET_LIST } from 'test/mocks/widgetList';

const WIDGET_LIST_PAYLOAD = WIDGET_LIST.payload;

describe('state/widget-list/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('after action SET_WIDGET_LIST', () => {
    let state;
    beforeEach(() => {
      state = reducer({}, getWidgetList(WIDGET_LIST_PAYLOAD));
    });
    it('should define tableRow', () => {
      expect(state.list).toBeDefined();
    });
  });
});
