import reducer from 'state/fragments/reducer';
import { setSelectedFragment, setWidgetTypes, setPlugins } from 'state/fragments/actions';
import { BODY_OK, WIDGET_TYPES_PAYLOAD, PLUGINS_PAYLOAD } from 'test/mocks/fragment';


describe('state/fragments/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_SELECTED', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedFragment(BODY_OK.payload));
    });
    it('should define the fragment payload', () => {
      expect(newState.selected).toEqual(BODY_OK.payload);
    });
  });

  describe('after action SET_WIDGET_TYPES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setWidgetTypes(WIDGET_TYPES_PAYLOAD));
    });
    it('should define the widgetTypes payload', () => {
      expect(newState.widgetTypes).toEqual(WIDGET_TYPES_PAYLOAD);
    });
  });
  describe('after action SET_PLUGINS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPlugins(PLUGINS_PAYLOAD));
    });
    it('should define the plugins payload', () => {
      expect(newState.plugins).toEqual(PLUGINS_PAYLOAD);
    });
  });
});
