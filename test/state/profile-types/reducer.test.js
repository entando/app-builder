import reducer from 'state/profile-types/reducer';
import { cloneDeep } from 'lodash';
import {
  setProfileTypes,
  removeProfileType,
  removeAttribute,
  setSelectedProfileType,
  setSelectedAttributeProfileType,
  moveAttributeUpSync,
  moveAttributeDownSync,
  setProfileTypeAttributes,
  setSelectedAttribute,
  setActionMode,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
  setNewAttributeComposite,
  setSelectedNestedAttribute,
} from 'state/profile-types/actions';
import {
  PROFILE_TYPES,
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_ATTRIBUTES,
  PROFILE_TYPE_ATTRIBUTE,
  ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'test/mocks/profileTypes';

const profileTypesList = ['ABC', 'DEF'];

const STATE_REMOVE_ATTRIBUTE = {
  code: 'AAA',
  attributes: [{ type: 'text', code: 'attrCode' }, { type: 'text', code: 'attrCode1' }],
};

describe('state/profile-types/reducer', () => {
  let state = reducer();
  let newState;

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_PROFILE_TYPES', () => {
    beforeEach(() => {
      newState = reducer(state, setProfileTypes(PROFILE_TYPES_OK_PAGE_1.payload));
    });

    it('should define the profileType payload', () => {
      expect(newState.list).toMatchObject(profileTypesList);
    });
  });

  describe('after action REMOVE_PROFILE_TYPE', () => {
    it('should define the new state', () => {
      state = { list: ['AAA'] };
      newState = reducer(state, removeProfileType('AAA'));
      expect(newState.list).toMatchObject([]);
    });
  });

  describe('after action REMOVE_ATTRIBUTE', () => {
    it('should define the new state', () => {
      newState = reducer(
        { selected: STATE_REMOVE_ATTRIBUTE },
        removeAttribute('AAA', 'attrCode'),
      );
      expect(newState.selected).toMatchObject({
        code: 'AAA',
        attributes: [{ type: 'text', code: 'attrCode1' }],
      });
    });
  });

  describe('after action SET_SELECTED_PROFILE_TYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedProfileType(PROFILE_TYPES));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('selected');
      expect(newState.selected).toBe(PROFILE_TYPES);
    });
  });

  describe('after action MOVE_ATTRIBUTE_UP', () => {
    beforeEach(() => {
      newState = reducer(
        {
          selected: {
            code: 'AAA',
            attributes: [...STATE_REMOVE_ATTRIBUTE.attributes],
          },
        },
        moveAttributeUpSync({ entityCode: 'AAA', attributeCode: 'attrCode1', attributeIndex: 1 }),
      );
    });

    it('should define the selected payload', () => {
      expect(newState.selected.attributes[0].code).toBe('attrCode1');
    });
  });

  describe('after action MOVE_ATTRIBUTE_DOWN', () => {
    beforeEach(() => {
      newState = reducer(
        {
          selected: {
            code: 'AAA',
            attributes: [...STATE_REMOVE_ATTRIBUTE.attributes],
          },
        },
        moveAttributeDownSync({ entityCode: 'AAA', attributeCode: 'attrCode', attributeIndex: 0 }),
      );
    });

    it('should define the selected payload', () => {
      expect(newState.selected.attributes[1].code).toBe('attrCode');
    });
  });

  describe('after action SET_ACTION_MODE', () => {
    beforeEach(() => {
      newState = reducer(
        {
          selected: {
            code: 'AAA',
            attributes: [...STATE_REMOVE_ATTRIBUTE.attributes],
          },
        },
        setActionMode('hello'),
      );
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('selected');
      expect(newState.selected.actionMode).toBe('hello');
    });
  });

  describe('after action REMOVE_ATTRIBUTE_FROM_COMPOSITE', () => {
    let STATE_HERE;
    beforeEach(() => {
      STATE_HERE = {
        selected: {
          code: 'AAA',
          attributes: [...STATE_REMOVE_ATTRIBUTE.attributes],
          attributeSelected: cloneDeep(ATTRIBUTE_MONOLIST_COMPOSITE),
        },
      };
    });

    it('should remove attribute properly for monolist composite', () => {
      newState = reducer(STATE_HERE, removeAttributeFromComposite('testo', true));
      expect(newState).toHaveProperty('selected');
      expect(newState.selected).toHaveProperty('attributeSelected');
      expect(newState.selected.attributeSelected.nestedAttribute.compositeAttributes[0].code)
        .toBe('number');
    });

    it('should remove attribute properly for non-composite monolist', () => {
      STATE_HERE.selected.attributeSelected.compositeAttributes
        = cloneDeep(STATE_HERE.selected.attributeSelected.nestedAttribute.compositeAttributes);
      newState = reducer(STATE_HERE, removeAttributeFromComposite('number', false));
      expect(newState.selected.attributeSelected.compositeAttributes[1].code).toBe('data');
    });
  });

  describe('after action MOVE_ATTRIBUTE_FROM_COMPOSITE', () => {
    let STATE_HERE;
    beforeEach(() => {
      STATE_HERE = {
        selected: {
          code: 'AAA',
          attributes: [...STATE_REMOVE_ATTRIBUTE.attributes],
          attributeSelected: cloneDeep(ATTRIBUTE_MONOLIST_COMPOSITE),
        },
      };
    });

    it('should move attribute properly for monolist composite', () => {
      newState = reducer(STATE_HERE, moveAttributeFromComposite(0, 1, true));
      expect(newState).toHaveProperty('selected');
      expect(newState.selected).toHaveProperty('attributeSelected');
      expect(newState.selected.attributeSelected.nestedAttribute.compositeAttributes[0].code).toBe('number');
    });

    it('should move attribute properly for non-composite monolist', () => {
      STATE_HERE.selected.attributeSelected.compositeAttributes
        = cloneDeep(STATE_HERE.selected.attributeSelected.nestedAttribute.compositeAttributes);
      newState = reducer(STATE_HERE, moveAttributeFromComposite(2, 0, false));
      expect(newState.selected.attributeSelected.compositeAttributes[2].code).toBe('testo');
    });
  });

  describe('after action SET_NEW_ATTRIBUTE_COMPOSITE', () => {
    let STATE_HERE;
    beforeEach(() => {
      STATE_HERE = {
        selected: {},
      };
    });

    it('should set newAttributeComposite', () => {
      newState = reducer(STATE_HERE, setNewAttributeComposite({ name: 'moi' }));
      expect(newState).toHaveProperty('selected');
      expect(newState.selected).toHaveProperty('newAttributeComposite');
      expect(newState.selected.newAttributeComposite).toEqual({ name: 'moi' });
    });
  });

  describe('after action SET_SELECTED_ATTRIBUTE_FOR_PROFILETYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedProfileType(PROFILE_TYPES));
    });

    it('should define the attributeSelected payload', () => {
      expect(newState).toHaveProperty('selected');
      newState = reducer(newState, setSelectedAttributeProfileType(PROFILE_TYPES.attributes[0]));
      expect(newState).toHaveProperty('selected.attributeSelected', PROFILE_TYPES.attributes[0]);
    });
  });

  describe('after action SET_ATTRIBUTES', () => {
    beforeEach(() => {
      newState = reducer(state, setProfileTypeAttributes(PROFILE_TYPES_ATTRIBUTES));
    });

    it('should define the attributes payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.list');
      expect(newState.attributes.list).toMatchObject(PROFILE_TYPES_ATTRIBUTES);
    });
  });

  describe('after action SET_SELECTED_ATTRIBUTE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedAttribute(PROFILE_TYPE_ATTRIBUTE));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.selected');
      expect(newState.attributes.selected).toMatchObject(PROFILE_TYPE_ATTRIBUTE);
    });
  });

  describe('after action SET_SELECTED_NESTED_ATTRIBUTE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedNestedAttribute(PROFILE_TYPE_ATTRIBUTE));
    });

    it('should define the selected nested payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.selectedNested');
      expect(newState.attributes.selectedNested).toMatchObject(PROFILE_TYPE_ATTRIBUTE);
    });
  });
});
