import { cloneDeep } from 'lodash';
import reducer from 'state/labels/reducer';
import { setLabels, updateLabelSync, removeLabelSync, setLabelFilters, setSelectedLabel, setSearchTerm } from 'state/labels/actions';
import { LABELS_LIST } from 'test/mocks/labels';


describe('state/languages/reducer', () => {
  const INITIAL_STATE = reducer();

  it('should return an object', () => {
    expect(typeof INITIAL_STATE).toBe('object');
  });

  it('should define an empty map object', () => {
    expect(INITIAL_STATE.map).toEqual({});
  });

  it('should define an empty list array', () => {
    expect(INITIAL_STATE.list).toEqual([]);
  });

  it('should define filters property with null value', () => {
    expect(INITIAL_STATE.filters).toBe(null);
  });

  describe('after action SET_LABELS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, setLabels(LABELS_LIST));
    });

    it('should populate the list', () => {
      LABELS_LIST.forEach((lang, i) => {
        expect(newState.list[i]).toBe(lang.key);
      });
    });

    it('should populate the map', () => {
      LABELS_LIST.forEach((lang) => {
        expect(newState.map[lang.key]).toEqual(lang);
      });
    });
  });

  describe('after action SET_SELECTED_LABEL', () => {
    it('should successfully set selected label', () => {
      const label = { key: 'MOMO' };
      const state = reducer(INITIAL_STATE, setSelectedLabel(label));
      expect(state.selected).toBe(label);
    });
  });

  describe('after action SET_SEARCH_TERM', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(INITIAL_STATE, setSearchTerm('term'));
    });

    it('should populate the searchTerm', () => {
      expect(newState.searchTerm).toBe('term');
    });
  });

  describe('after action UPDATE_LABEL', () => {
    const STATE_WITH_LIST = reducer(INITIAL_STATE, setLabels(LABELS_LIST));

    it('should update the label', () => {
      const MOD_LABEL = cloneDeep(LABELS_LIST[0]);
      MOD_LABEL.titles.en = 'Hi';
      const newState = reducer(STATE_WITH_LIST, updateLabelSync(MOD_LABEL));
      expect(STATE_WITH_LIST.map).not.toBe(newState.map);
      expect(newState.map).toEqual({
        ...STATE_WITH_LIST.map,
        [MOD_LABEL.key]: MOD_LABEL,
      });
    });

    it('should add the label if the label is not mapped', () => {
      const NEW_LABEL = {
        key: 'NEW_LABEL',
        titles: {
          en: 'New Label',
          it: 'Nuova Etichetta',
        },
      };
      const newState = reducer(STATE_WITH_LIST, updateLabelSync(NEW_LABEL));
      expect(STATE_WITH_LIST.map).not.toBe(newState.map);
      expect(newState.map).toEqual({
        ...STATE_WITH_LIST.map,
        [NEW_LABEL.key]: NEW_LABEL,
      });
    });
  });

  describe('after action REMOVE_LABEL', () => {
    const LABEL_KEY = LABELS_LIST[0].key;
    const STATE_WITH_LIST = reducer(INITIAL_STATE, setLabels(LABELS_LIST));

    it('should remove the label from the map', () => {
      const newState = reducer(STATE_WITH_LIST, removeLabelSync(LABEL_KEY));
      expect(STATE_WITH_LIST.map).not.toBe(newState.map);
      expect(STATE_WITH_LIST.map[LABEL_KEY]).toEqual(LABELS_LIST[0]);
      expect(newState.map[LABEL_KEY]).toBeUndefined();
    });

    it('should remove the label from the list', () => {
      const newState = reducer(STATE_WITH_LIST, removeLabelSync(LABEL_KEY));
      expect(STATE_WITH_LIST.list).not.toBe(newState.list);
      expect(STATE_WITH_LIST.list.includes(LABEL_KEY)).toBe(true);
      expect(newState.list.includes(LABEL_KEY)).toBe(false);
    });
  });

  describe('after action SET_LABEL_FILTERS', () => {
    it('sets the filters with the provided value', () => {
      const newState = reducer(INITIAL_STATE, setLabelFilters({ keyword: 'testkey' }));
      expect(newState.filters).toEqual({ keyword: 'testkey' });
    });
  });
});
