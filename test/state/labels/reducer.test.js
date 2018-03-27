import { cloneDeep } from 'lodash';
import reducer from 'state/labels/reducer';
import { setLabels, updateLabelSync, removeLabelSync } from 'state/labels/actions';
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
});
