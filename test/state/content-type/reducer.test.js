import reducer from 'state/content-type/reducer';
import { cloneDeep } from 'lodash';
import {
  setContentTypeList,
  removeContentType,
  removeAttribute,
  setSelectedContentType,
  setSelectedContentTypeAttribute,
  setContentTypeAttributes,
  setSelectedAttributeRef,
  setContentTypeReferenceStatus,
  moveAttributeUpSync,
  moveAttributeDownSync,
  setActionMode,
  removeAttributeFromComposite,
  moveAttributeFromComposite,
  setNewAttributeComposite,
  setSelectedNestedAttribute,
} from 'state/content-type/actions';
import {
  GET_CONTENT_TYPE_RESPONSE_OK,
  CONTENT_TYPES_OK_PAGE,
  CONTENT_TYPES_ATTRIBUTES,
  CONTENT_TYPE_ATTRIBUTE,
  CONTENT_TYPE_REFERENCES_STATUS,
  ATTRIBUTE_MONOLIST_COMPOSITE,
} from 'test/mocks/contentType';

const contentTypesList = ['ABC', 'DEF'];

const STATE_REMOVE_ATTRIBUTE = {
  code: 'AAA',
  attributes: [{ type: 'text', code: 'attrCode' }, { type: 'text', code: 'attrCode1' }],
};

describe('state/content-type/reducer', () => {
  let state = reducer();
  let newState;

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_CONTENT_TYPES', () => {
    beforeEach(() => {
      newState = reducer(state, setContentTypeList(CONTENT_TYPES_OK_PAGE.payload));
    });

    it('should define the ContentType payload', () => {
      expect(newState.list).toMatchObject(contentTypesList);
    });
  });

  describe('afert action REMOVE_CONTENT_TYPE', () => {
    it('should define the new state', () => {
      state = { list: ['AAA'] };
      newState = reducer(state, removeContentType('AAA'));
      expect(newState.list).toMatchObject([]);
    });
  });

  describe('after action REMOVE_ATTRIBUTE', () => {
    it('should define the new state', () => {
      newState = reducer({ selected: STATE_REMOVE_ATTRIBUTE }, removeAttribute('AAA', 'attrCode'));
      expect(newState.selected).toMatchObject({
        code: 'AAA',
        attributes: [{ type: 'text', code: 'attrCode1' }],
      });
    });
  });

  describe('after action SET_SELECTED_CONTENT_TYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedContentType(GET_CONTENT_TYPE_RESPONSE_OK));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('selected');
      expect(newState.selected).toBe(GET_CONTENT_TYPE_RESPONSE_OK);
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

  describe('after action SET_SELECTED_ATTRIBUTE_FOR_CONTENTTYPE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedContentType(GET_CONTENT_TYPE_RESPONSE_OK));
    });

    it('should define the attributeSelected payload', () => {
      expect(newState).toHaveProperty('selected');
      newState = reducer(
        newState,
        setSelectedContentTypeAttribute(GET_CONTENT_TYPE_RESPONSE_OK.attributes[0]),
      );
      expect(newState).toHaveProperty(
        'selected.attributeSelected',
        GET_CONTENT_TYPE_RESPONSE_OK.attributes[0],
      );
    });
  });

  describe('after action SET_ATTRIBUTES', () => {
    beforeEach(() => {
      newState = reducer(state, setContentTypeAttributes(CONTENT_TYPES_ATTRIBUTES));
    });

    it('should define the attributes payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.list');
      expect(newState.attributes.list).toMatchObject(CONTENT_TYPES_ATTRIBUTES);
    });
  });

  describe('after action SET_SELECTED_ATTRIBUTE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedAttributeRef(CONTENT_TYPE_ATTRIBUTE));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.selected');
      expect(newState.attributes.selected).toMatchObject(CONTENT_TYPE_ATTRIBUTE);
    });
  });

  describe('after action SET_SELECTED_NESTED_ATTRIBUTE', () => {
    beforeEach(() => {
      newState = reducer(state, setSelectedNestedAttribute(CONTENT_TYPE_ATTRIBUTE));
    });

    it('should define the selected nested payload', () => {
      expect(newState).toHaveProperty('attributes');
      expect(newState).toHaveProperty('attributes.selectedNested');
      expect(newState.attributes.selectedNested).toMatchObject(CONTENT_TYPE_ATTRIBUTE);
    });
  });

  describe('after action SET_CONTENT_TYPE_REFERENCE_STATUS', () => {
    beforeEach(() => {
      newState = reducer(state, setContentTypeReferenceStatus(CONTENT_TYPE_REFERENCES_STATUS));
    });

    it('should define the references.status payload', () => {
      expect(newState).toHaveProperty('references');
      expect(newState).toHaveProperty('references.status');
      expect(newState.references.status).toMatchObject(CONTENT_TYPE_REFERENCES_STATUS);
    });
  });
});
