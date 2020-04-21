
import {
  setPageTemplates,
  setSelectedPageTemplate,
  removePageTemplateSync,
  setSelectedPageTemplatePageRefs,
  setPageTemplatesTotal,
} from 'state/page-templates/actions';
import { PAGE_TEMPLATES_LIST, PAGE_TEMPLATES_ID_LIST, PAGE_TEMPLATES_MAP, PAGE_REFS_MAP } from 'test/mocks/pageTemplates';
import reducer from 'state/page-templates/reducer';


const PAGE_TEMPLATE = PAGE_TEMPLATES_LIST[0];
const PAGE_TEMPLATE_CODE = PAGE_TEMPLATE.code;

const MOCK_STATE = {
  idList: PAGE_TEMPLATES_ID_LIST,
  map: PAGE_TEMPLATES_MAP,
  selected: PAGE_TEMPLATE,
};

describe('state/page-templates/reducer', () => {
  let state;
  beforeEach(() => {
    state = reducer();
  });

  describe('default state', () => {
    it('should define a "idList" array', () => {
      expect(state).toHaveProperty('idList', []);
    });

    it('should define a "map" array', () => {
      expect(state).toHaveProperty('map', {});
    });

    it('should define a "selected" object', () => {
      expect(state).toHaveProperty('selected', null);
    });

    it('should define a "total" integer', () => {
      expect(state).toHaveProperty('total', 0);
    });
  });

  describe('on action SET_PAGE_TEMPLATES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPageTemplates(PAGE_TEMPLATES_LIST));
    });

    it('state.idList should be equal to the added page templates', () => {
      expect(newState.idList).toEqual(PAGE_TEMPLATES_ID_LIST);
    });
  });

  describe('on action SET_PAGE_TEMPLATES_TOTAL', () => {
    it('state.idList should be equal to the added page templates', () => {
      const newState = reducer(state, setPageTemplatesTotal(12));
      expect(newState).toHaveProperty('total', 12);
    });
  });

  describe('on action SET_SELECTED_PAGE_TEMPLATE', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedPageTemplate(PAGE_TEMPLATE));
    });

    it('state.selected should be equal to the selected page template', () => {
      expect(newState.selected).toEqual(PAGE_TEMPLATE);
    });
  });

  describe('after action REMOVE_PAGE_TEMPLATE (present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer(MOCK_STATE);
      newState = reducer(state, removePageTemplateSync(PAGE_TEMPLATE_CODE));
    });

    it('should return a new state', () => {
      expect(newState).not.toBe(state);
    });

    it('state.idList should have the page template code removed', () => {
      const expected = PAGE_TEMPLATES_ID_LIST.filter(code => code !== PAGE_TEMPLATE_CODE);
      expect(newState.idList).toEqual(expected);
    });

    it('state.map should have the page template removed', () => {
      const expected = { ...PAGE_TEMPLATES_MAP };
      delete expected[PAGE_TEMPLATE_CODE];
      expect(newState.map).toEqual(expected);
    });
  });

  describe('after action REMOVE_PAGE_TEMPLATE (non present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer(MOCK_STATE);
      newState = reducer(state, removePageTemplateSync('blah blah'));
    });

    it('should return the old state', () => {
      expect(newState).toBe(state);
    });

    it('state.idList should be unchanged', () => {
      expect(newState.idList).toBe(state.idList);
    });

    it('state.map should be unchanged', () => {
      expect(newState.map).toBe(state.map);
    });
  });

  describe('after action SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS (non present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer();
      newState = reducer(state, setSelectedPageTemplatePageRefs(PAGE_REFS_MAP.homepage));
    });

    it('should return a new state', () => {
      expect(newState).not.toBe(state);
    });

    it('state.selected should be changed', () => {
      expect(newState.selected).not.toBe(state.selected);
    });

    it('state.selected should contain pageReferences', () => {
      expect(newState.selected.pageReferences).toBe(PAGE_REFS_MAP.homepage);
    });
  });

  describe('after action SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS (present item)', () => {
    let newState;
    beforeEach(() => {
      state = reducer({
        selected: PAGE_TEMPLATE,
      });
      newState = reducer(state, setSelectedPageTemplatePageRefs(PAGE_REFS_MAP.homepage));
    });

    it('should return a new state', () => {
      expect(newState).not.toBe(state);
    });

    it('state.selected should be changed', () => {
      expect(newState.selected).not.toBe(state.selected);
    });

    it('state.selected should contain pageReferences', () => {
      expect(newState.selected.pageReferences).toBe(PAGE_REFS_MAP.homepage);
    });
  });
});
