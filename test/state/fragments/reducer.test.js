import reducer from 'state/fragments/reducer';
import {
  setSelectedFragment,
  setFragments,
  setWidgetTypes,
  setPlugins,
  removeFragment,
} from 'state/fragments/actions';
import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK as FRAGMENT_PAYLOAD,
  WIDGET_TYPES_OK,
  PLUGINS_OK,
} from 'test/mocks/fragments';

const WIDGET_TYPES_PAYLOAD = WIDGET_TYPES_OK.payload;
const PLUGINS_PAYLOAD = PLUGINS_OK.payload;


describe('fragments/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_SELECTED', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedFragment(GET_FRAGMENT_OK));
    });

    it('should define the fragment payload', () => {
      expect(newState.selected).toEqual(GET_FRAGMENT_OK);
    });
  });

  describe('list reducer', () => {
    it('should return an object', () => {
      expect(typeof state.list).toBe('object');
      expect(state.list instanceof Array).toBe(true);
    });

    describe('after action SET_FRAGMENTS', () => {
      it('should define fragmentList', () => {
        const newState = reducer({}, setFragments(FRAGMENT_PAYLOAD));
        expect(newState.list).toHaveLength(7);
      });
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

  describe('after action REMOVE_FRAGMENT', () => {
    let newState;
    beforeEach(() => {
      newState = reducer({ list: ['AAA', 'BBB'] });
    });
    it('should define new state if fragmentCode is present', () => {
      newState = reducer(newState, removeFragment('AAA'));
      expect(newState.list).not.toEqual(expect.arrayContaining(['AAA']));
    });
    it('should no changes if fragmentCode is not present', () => {
      const elementsBefore = newState.list.length;
      newState = reducer(newState, removeFragment('CCC'));
      expect(elementsBefore).toBe(newState.list.length);
      expect(newState.list).toEqual(expect.arrayContaining(['AAA', 'BBB']));
    });
  });
});
