import reducer from 'state/data-types/reducer';
import {
  setDataTypes,
  removeDataType,
  removeAttribute,
  setSelectedDataType,
  setSelectedAttributeDataType,
  setDataTypeAttributes,
  setSelectedAttribute,
  setDataTypeReferenceStatus,
} from 'state/data-types/actions';
import {
  DATA_TYPES,
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_ATTRIBUTES,
  DATA_TYPE_ATTRIBUTE,
  DATA_TYPE_REFERENCES_STATUS,
} from 'test/mocks/dataTypes';

const dataTypesList = ['ABC', 'DEF'];

const STATE_REMOVE_ATTRIBUTE = {
  code: 'AAA',
  attributes: [{ type: 'text', code: 'attrCode' }, { type: 'text', code: 'attrCode1' }],
};

describe('state/data-types/reducer', () => {
  let state = reducer();
  let newState;

  it('should return an object', () => {
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

  describe('afert action REMOVE_DATA_TYPE', () => {
    it('should define the new state', () => {
      state = { list: ['AAA'] };
      newState = reducer(state, removeDataType('AAA'));
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

  describe('after action SET_SELECTED_DATA_TYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedDataType(DATA_TYPES));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('selected');
      expect(newState.selected).toBe(DATA_TYPES);
    });
  });

  describe('after action SET_SELECTED_ATTRIBUTE_FOR_DATATYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedDataType(DATA_TYPES));
    });

    it('should define the attributeSelected payload', () => {
      expect(newState).toHaveProperty('selected');
      newState = reducer(newState, setSelectedAttributeDataType(DATA_TYPES.attributes[0]));
      expect(newState).toHaveProperty('selected.attributeSelected', DATA_TYPES.attributes[0]);
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

  describe('after action SET_SELECTED_ATTRIBUTE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedAttribute(DATA_TYPE_ATTRIBUTE));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.selected');
      expect(newState.attributes.selected).toMatchObject(DATA_TYPE_ATTRIBUTE);
    });
  });

  describe('after action SET_DATA_TYPE_REFERENCE_STATUS', () => {
    beforeEach(() => {
      newState = reducer(state, setDataTypeReferenceStatus(DATA_TYPE_REFERENCES_STATUS));
    });

    it('should define the references.status payload', () => {
      expect(newState).toHaveProperty('references');
      expect(newState).toHaveProperty('references.status');
      expect(newState.references.status).toMatchObject(DATA_TYPE_REFERENCES_STATUS);
    });
  });
});
