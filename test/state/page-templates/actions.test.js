import { isFSA } from 'flux-standard-action';
import { initialize } from 'redux-form';
import { ADD_TOAST, ADD_ERRORS } from '@entando/messages';

import { mockApi } from 'test/testUtils';
import {
  setPageTemplates, setSelectedPageTemplate, fetchPageTemplates, removePageTemplate, loadSelectedPageTemplate,
  fetchPageTemplate, initPageTemplateForm, updatePageTemplate, createPageTemplate, setSelectedPageTemplatePageRefs,
  fetchCurrentReferencePages, setPageTemplatesTotal, fetchPageTemplatesTotal,
} from 'state/page-templates/actions';
import { getSelectedPageTemplate } from 'state/page-templates/selectors';
import {
  SET_PAGE_TEMPLATES,
  SET_SELECTED_PAGE_TEMPLATE,
  REMOVE_PAGE_TEMPLATE,
  SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS,
  SET_PAGE_TEMPLATES_TOTAL,
} from 'state/page-templates/types';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { PAGE_TEMPLATES_LIST, PAGE_REFS } from 'test/mocks/pageTemplates';
import { getPageTemplates, getPageTemplate, deletePageTemplate, putPageTemplate, postPageTemplate, getPageReferences } from 'api/pageTemplates';
import { history, ROUTE_PAGE_TEMPLATE_LIST } from 'app-init/router';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const PAGE_TEMPLATES = PAGE_TEMPLATES_LIST;
const PAGE_TEMPLATE = PAGE_TEMPLATES[0];
const PAGE_TEMPLATE_CODE = PAGE_TEMPLATE.code;
const mockStore = configureMockStore([thunk]);
const store = mockStore({});


jest.mock('state/page-templates/selectors', () => ({
  getSelectedPageTemplate: jest.fn(),
  getFormPageTemplate: jest.fn(),
}));

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
  store.clearActions();
});

describe('state/page-templates/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPageTemplates.mockImplementation(mockApi({ payload: [] }));
  });

  describe('setPageTemplates', () => {
    let action;
    beforeEach(() => {
      action = setPageTemplates(PAGE_TEMPLATES_LIST);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_PAGE_TEMPLATES', () => {
      expect(action.type).toBe(SET_PAGE_TEMPLATES);
    });

    it('defines the "pageTemplates" property', () => {
      expect(action.payload.pageTemplates).toEqual(PAGE_TEMPLATES_LIST);
    });
  });

  describe('setPageTemplatesTotal', () => {
    let action;
    beforeEach(() => {
      action = setPageTemplatesTotal(12);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_PAGE_TEMPLATES', () => {
      expect(action).toHaveProperty('type', SET_PAGE_TEMPLATES_TOTAL);
    });

    it('defines the "pageTemplatesTotal" property', () => {
      expect(action).toHaveProperty('payload.pageTemplatesTotal', 12);
    });
  });

  describe('setSelectedPageTemplate', () => {
    let action;
    beforeEach(() => {
      action = setSelectedPageTemplate(PAGE_TEMPLATE);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_SELECTED_PAGE_TEMPLATE', () => {
      expect(action.type).toBe(SET_SELECTED_PAGE_TEMPLATE);
    });

    it('defines the "pageTemplate" property', () => {
      expect(action.payload.pageTemplate).toEqual(PAGE_TEMPLATE);
    });
  });

  describe('setSelectedPageTemplatePageRefs', () => {
    let action;
    beforeEach(() => {
      action = setSelectedPageTemplatePageRefs(PAGE_REFS);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS', () => {
      expect(action.type).toBe(SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS);
    });

    it('defines the "references" property', () => {
      expect(action.payload).toHaveProperty('references', PAGE_REFS);
    });
  });

  describe('fetchPageTemplates', () => {
    it('if API response is ok, calls the right action sequence', (done) => {
      store.dispatch(fetchPageTemplates()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_PAGE_TEMPLATES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('if getPageTemplates API returns ok, set page templates', (done) => {
      getPageTemplates.mockImplementationOnce(mockApi({ payload: PAGE_TEMPLATES_LIST }));
      store.dispatch(fetchPageTemplates()).then(() => {
        expect(getPageTemplates).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_PAGE_TEMPLATES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, calls ADD_ERRORS', (done) => {
      getPageTemplates.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchPageTemplates()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('if getPageTemplates API returns error, do not set page templates', (done) => {
      getPageTemplates.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchPageTemplates()).then(() => {
        expect(getPageTemplates).toHaveBeenCalled();
        expect(store.getActions().find(act => act.type === SET_PAGE_TEMPLATES)).toBeFalsy();
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchPageTemplatesTotal', () => {
    it('if API response is ok, calls the right action sequence', (done) => {
      store.dispatch(fetchPageTemplatesTotal()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_PAGE_TEMPLATES_TOTAL);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, calls ADD_ERRORS', (done) => {
      getPageTemplates.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchPageTemplatesTotal()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });

  describe('removePageTemplate', () => {
    it('if API response is ok, calls the right action sequence', (done) => {
      store.dispatch(removePageTemplate(PAGE_TEMPLATE.code)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', REMOVE_PAGE_TEMPLATE);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, calls ADD_ERRORS', (done) => {
      deletePageTemplate.mockImplementation(mockApi({ errors: true }));
      store.dispatch(removePageTemplate(PAGE_TEMPLATE.code)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });

  describe('loadSelectedPageTemplate', () => {
    it('if there is the same page template selected, does nothing', (done) => {
      getSelectedPageTemplate.mockReturnValue(PAGE_TEMPLATE);
      store.dispatch(loadSelectedPageTemplate(PAGE_TEMPLATE.code)).then(() => {
        expect(getPageTemplate).not.toHaveBeenCalled();
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if there is another the page template selected, fetch the new one', (done) => {
      getSelectedPageTemplate.mockReturnValue(PAGE_TEMPLATE);
      getPageTemplate.mockImplementation(mockApi({ payload: PAGE_TEMPLATE }));
      store.dispatch(loadSelectedPageTemplate('some_random_code')).then(() => {
        expect(getPageTemplate).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_SELECTED_PAGE_TEMPLATE);
        done();
      }).catch(done.fail);
    });

    it('if there is no page template selected, fetch the new one', (done) => {
      getSelectedPageTemplate.mockReturnValue(null);
      getPageTemplate.mockImplementation(mockApi({ payload: PAGE_TEMPLATE }));
      store.dispatch(loadSelectedPageTemplate('some_random_code')).then(() => {
        expect(getPageTemplate).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', SET_SELECTED_PAGE_TEMPLATE);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, calls ADD_ERRORS', (done) => {
      getPageTemplate.mockImplementation(mockApi({ errors: true }));
      store.dispatch(loadSelectedPageTemplate(PAGE_TEMPLATE.code)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchPageTemplate', () => {
    it('if API response is ok, resolves with the response', (done) => {
      getPageTemplate.mockImplementation(mockApi({ payload: PAGE_TEMPLATE }));
      store.dispatch(fetchPageTemplate(PAGE_TEMPLATE_CODE)).then((data) => {
        expect(getPageTemplate).toHaveBeenCalled();
        expect(data).toEqual(expect.objectContaining({
          payload: PAGE_TEMPLATE,
        }));
        done();
      }).catch(done.fail);
    });

    it('if getPageTemplates API is not ok, dispatch ADD_ERRORS and reject the promise', (done) => {
      getPageTemplate.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageTemplate(PAGE_TEMPLATE_CODE)).then(() => {
        done.fail('Promise was expected to be rejected');
      }).catch(() => {
        expect(getPageTemplate).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });
  });

  describe('initPageTemplateForm', () => {
    it('if API response is ok, initializes the page template form', (done) => {
      getPageTemplate.mockImplementation(mockApi({ payload: PAGE_TEMPLATE }));
      store.dispatch(initPageTemplateForm(PAGE_TEMPLATE_CODE)).then(() => {
        expect(getPageTemplate).toHaveBeenCalled();
        expect(initialize).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', '@@redux-form/INITIALIZE');
        done();
      }).catch(done.fail);
    });

    it('if getPageTemplates API is not ok, reject the promise', (done) => {
      getPageTemplate.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchPageTemplate(PAGE_TEMPLATE_CODE)).then(() => {
        done.fail('Promise was expected to be rejected');
      }).catch(() => {
        expect(getPageTemplate).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      });
    });
  });

  describe('updatePageTemplate', () => {
    it('if a page template is passed, calls putPageTemplate with that page template', (done) => {
      store.dispatch(updatePageTemplate(PAGE_TEMPLATE)).then(() => {
        expect(putPageTemplate).toHaveBeenCalledWith(PAGE_TEMPLATE);
        done();
      }).catch(done.fail);
    });

    it('if api response is ok, does not dispatch ADD_ERRORS', (done) => {
      putPageTemplate.mockImplementation(mockApi({ payload: PAGE_TEMPLATE }));
      store.dispatch(updatePageTemplate(PAGE_TEMPLATE)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1]).toHaveProperty('type', SET_SELECTED_PAGE_TEMPLATE);
        expect(actions[1]).toHaveProperty('payload.pageTemplate', PAGE_TEMPLATE);
        expect(history.push).toHaveBeenCalledWith(ROUTE_PAGE_TEMPLATE_LIST);
        done();
      }).catch(done.fail);
    });

    it('if api response is not ok, dispatch ADD_ERRORS', (done) => {
      putPageTemplate.mockImplementation(mockApi({ errors: true }));
      store.dispatch(updatePageTemplate(PAGE_TEMPLATE)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });

  describe('createPageTemplate', () => {
    it('if a page template is passed, calls putPageTemplate with that page template', (done) => {
      store.dispatch(createPageTemplate(PAGE_TEMPLATE)).then(() => {
        expect(postPageTemplate).toHaveBeenCalledWith(PAGE_TEMPLATE);
        done();
      }).catch(done.fail);
    });

    it('if api response is ok, does not dispatch ADD_ERRORS', (done) => {
      postPageTemplate.mockImplementation(mockApi({ payload: PAGE_TEMPLATE }));
      store.dispatch(createPageTemplate(PAGE_TEMPLATE)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(history.push).toHaveBeenCalledWith(ROUTE_PAGE_TEMPLATE_LIST);
        done();
      }).catch(done.fail);
    });

    it('if api response is not ok, dispatch ADD_ERRORS', (done) => {
      postPageTemplate.mockImplementation(mockApi({ errors: true }));
      store.dispatch(createPageTemplate(PAGE_TEMPLATE)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchCurrentReferencePages', () => {
    it('calls getPageReferences with the pageTemplateCode route parameter', (done) => {
      store.dispatch(fetchCurrentReferencePages(PAGE_TEMPLATE_CODE)).then(() => {
        expect(getPageReferences).toHaveBeenCalledWith(
          PAGE_TEMPLATE_CODE,
          { page: 1, pageSize: 10 },
        );
        done();
      }).catch(done.fail);
    });

    it('if API returns ok, dispatch the right action sequence', (done) => {
      store.dispatch(fetchCurrentReferencePages()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_SELECTED_PAGE_TEMPLATE_PAGE_REFS);
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('if API returns error, dispatch the right action sequence', (done) => {
      getPageReferences.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchCurrentReferencePages()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });
});
