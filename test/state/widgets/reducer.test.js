import reducer from 'state/widgets/reducer';
import {
  getWidgetList,
  setSelectedWidget,
  removeWidget,
  setWidgetsTotal,
  setWidgetInfo,
} from 'state/widgets/actions';
import { getSelectedWidget } from 'state/widgets/selectors';
import { WIDGET, WIDGET_LIST, WIDGET_INFO } from 'test/mocks/widgets';


const WIDGET_LIST_PAYLOAD = WIDGET_LIST.payload;
const REMOVE_WIDGET = 'login_form';

jest.mock('state/widgets/selectors', () => ({
  getSelectedWidget: jest.fn(),
}));

getSelectedWidget.mockReturnValue(WIDGET);

describe('state/widget-list/reducer', () => {
  let state;

  it('should return an object', () => {
    state = reducer();
    expect(state).toBeInstanceOf(Object);
    expect(state).toHaveProperty('list', []);
    expect(state).toHaveProperty('map', {});
    expect(state).toHaveProperty('selected', null);
    expect(state).toHaveProperty('total', 0);
    expect(state).toHaveProperty('info', {});
  });

  describe('after action SET_WIDGET_INFO', () => {
    beforeEach(() => {
      state = reducer({}, setWidgetInfo(WIDGET_INFO));
    });
    it('should define info', () => {
      expect(state.info).toBeDefined();
    });
  });

  describe('after action SET_WIDGETS_TOTAL', () => {
    it('should have the new total', () => {
      const newState = reducer({}, setWidgetsTotal(10));
      expect(newState).toHaveProperty('total', 10);
    });
  });

  describe('after action SET_WIDGET_LIST', () => {
    beforeEach(() => {
      state = reducer({}, getWidgetList(WIDGET_LIST_PAYLOAD));
    });
    it('should define tableRow', () => {
      expect(state.list).toBeDefined();
    });
  });

  describe('after action SET_SELECTED_WIDGET', () => {
    it('should define the new state', () => {
      state = reducer(state, setSelectedWidget('WDG'));
      expect(state.selected).toBe('WDG');
    });
  });

  describe('after action REMOVE_WIDGET', () => {
    it('should define the new state', () => {
      state = reducer(state);
      const newState = reducer(state, removeWidget(REMOVE_WIDGET));
      expect(newState.list).not.toEqual(expect.arrayContaining([REMOVE_WIDGET]));
      expect(newState.map).not.toEqual(expect.objectContaining({ REMOVE_WIDGET }));
      expect(newState.selected).toBe(null);
      expect(state).not.toBe(newState);
    });

    it('should selected not change your state', () => {
      state = reducer(state);
      getSelectedWidget.mockReturnValue('AAA');
      const newState = reducer(state, removeWidget(WIDGET_LIST));
      expect(newState.selected).not.toBe(null);
      expect(state).not.toBe(newState);
    });
  });
});
