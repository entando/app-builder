import reducer from 'state/profile-types/reducer';
import {
  setProfileTypes,
  removeProfileType,
  removeAttribute,
  setSelectedProfileType,
  setSelectedAttributeProfileType,
  setProfileTypeAttributes,
  setSelectedAttribute,
} from 'state/profile-types/actions';
import {
  PROFILE_TYPES,
  PROFILE_TYPES_OK_PAGE_1,
  PROFILE_TYPES_ATTRIBUTES,
  PROFILE_TYPE_ATTRIBUTE,
} from 'test/mocks/profileTypes';

const profileTypesList = ['ABC', 'DEF'];

const STATE_REMOVE_ATTRIBUTE = {
  AAA: { attributes: [{ type: 'text', code: 'attrCode' }, { type: 'text', code: 'attrCode1' }] },
  BBB: { attributes: [{ type: 'text', code: 'attrCode' }, { type: 'text', code: 'attrCode1' }] },
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

  describe('afert action REMOVE_PROFILE_TYPE', () => {
    it('should define the new state', () => {
      state = { list: ['AAA'] };
      newState = reducer(state, removeProfileType('AAA'));
      expect(newState.list).toMatchObject([]);
    });
  });

  describe('after action REMOVE_ATTRIBUTE', () => {
    it('should define the new state', () => {
      newState = reducer({ map: STATE_REMOVE_ATTRIBUTE }, removeAttribute('AAA', 'attrCode'));
      expect(newState.map).toMatchObject({
        AAA: { attributes: [{ type: 'text', code: 'attrCode1' }] },
        BBB: { attributes: [{ type: 'text', code: 'attrCode' }, { type: 'text', code: 'attrCode1' }] },
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
});
