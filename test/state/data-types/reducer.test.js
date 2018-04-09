import reducer from 'state/data-types/reducer';
import { setDataTypes, setDataTypeAttributes, setSelectedAttribute } from 'state/data-types/actions';
import { DATA_TYPES_OK_PAGE_1, DATA_TYPES_ATTRIBUTES, DATA_TYPE_ATTRIBUTE } from 'test/mocks/dataTypes';

const dataTypesList = ['ABC', 'DEF'];

describe('state/data-types/reducer', () => {
  const state = reducer();
  let newState;

  it('should return an object', () => {
    console.log(state);
    expect(typeof state).toBe('object');
  });

  describe('after action SET_DATA_TYPES', () => {
    beforeEach(() => {
      newState = reducer(state, setDataTypes(DATA_TYPES_OK_PAGE_1.payload));
    });

    it('should define the dataType payload', () => {
      expect(newState.list).toMatchObject(dataTypesList);
    });
  });

  describe('after action SET_ATTRIBUTES', () => {
    beforeEach(() => {
      newState = reducer(state, setDataTypeAttributes(DATA_TYPES_ATTRIBUTES));
    });

    it('should define the attributes payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.list');
      expect(newState.attributes.list).toMatchObject(DATA_TYPES_ATTRIBUTES);
    });
  });

  describe('after action SET_SELECTED', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedAttribute(DATA_TYPE_ATTRIBUTE));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.selected');
      expect(newState.attributes.selected).toMatchObject(DATA_TYPE_ATTRIBUTE);
    });
  });
});
