import reducer from 'state/widgets/reducer';
import { getWidgetList, setSelectedWidget, removeWidget } from 'state/widgets/actions';
import { getSelectedWidget } from 'state/widgets/selectors';
import { WIDGET, WIDGET_LIST } from 'test/mocks/widgets';


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
