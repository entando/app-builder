import { createMockStore, mockApi } from 'test/testUtils';
import {
  pageDefault,
  setContentTemplateList,
  setContentTemplate,
  clearContentTemplate,
  fetchContentTemplateList,
  fetchContentTemplateListPaged,
  filterContentTemplateBySearch,
  fetchContentTemplatesByContentType,
  fetchContentTemplate,
  fetchContentTemplateDictionary,
  clearContentTemplateDictionary,
  sendPostContentTemplate,
  sendPutContentTemplate,
  sendDeleteContentTemplate,
} from 'state/content-template/actions';
import {
  SET_CONTENT_TEMPLATES,
  SET_CONTENT_TEMPLATE_OPENED,
  CLEAR_CONTENT_TEMPLATE_OPENED,
  SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
  SET_CONTENT_TEMPLATE_FILTER,
  SET_CONTENT_TEMPLATE_DICTIONARY,
  CLEAR_CONTENT_TEMPLATE_DICTIONARY,
} from 'state/content-template/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK } from 'test/mocks/contentTemplate';
import {
  getContentTemplates,
  postContentTemplate,
  getContentTemplate,
  putContentTemplate,
  deleteContentTemplate,
  getContentTemplateDictionary,
} from 'api/contentTemplates';

const list = GET_CONTENT_TEMPLATES_RESPONSE_OK;

const CONTMODEL_SET_PARAMS = {
  type: SET_CONTENT_TEMPLATES,
  payload: {
    list,
  },
};

jest.mock('api/contentTemplates', () => ({
  getContentTemplates: jest.fn(mockApi({ payload: ['a', 'b'] })),
  postContentTemplate: jest.fn(res => mockApi({ payload: res })()),
  getContentTemplate: jest.fn(id => mockApi({ payload: { id, code: 'GUU', a: 'b' } })()),
  putContentTemplate: jest.fn(res => mockApi({ payload: res })()),
  deleteContentTemplate: jest.fn(id => mockApi({ payload: { id } })()),
  getContentTemplateDictionary: jest.fn(mockApi({ payload: ['a', 'b'] })),
}));

it('test setContentTemplateList action', () => {
  expect(setContentTemplateList(list)).toEqual(CONTMODEL_SET_PARAMS);
});

it('test setContentTemplate action', () => {
  expect(setContentTemplate(list[0])).toEqual({
    type: SET_CONTENT_TEMPLATE_OPENED,
    payload: list[0],
  });
});

it('test clearContentTemplate action', () => {
  expect(clearContentTemplate()).toEqual({
    type: CLEAR_CONTENT_TEMPLATE_OPENED,
  });
});

it('test clearContentTemplateDictionary action', () => {
  expect(clearContentTemplateDictionary()).toEqual({
    type: CLEAR_CONTENT_TEMPLATE_DICTIONARY,
  });
});

const DEFAULT_STATE = {
  apps: {
    cms: {
      contentTemplate: {
        list: [],
        opened: {},
        filters: {
          filterProps: {},
          attribute: 'descr',
        },
      },
      contentType: {
        list: ['GUU'],
        map: {
          GUU: {
            code: 'GUU',
            name: 'GuuGuu',
          },
        },
      },
    },
  },
};

describe('contentTemplate thunks', () => {
  let store;

  beforeEach(() => {
    jest.unmock('api/contentTemplates');
    const STATE = { ...DEFAULT_STATE };
    store = createMockStore(STATE);
  });

  it('fetchContentTemplateList', (done) => {
    store.dispatch(fetchContentTemplateList()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[0].payload.id).toEqual('contentTemplateList');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_TEMPLATES);
      expect(actions[1].payload.list).toEqual(['a', 'b']);
      done();
    }).catch(done.fail);
  });

  it('fetchContentTemplateListPaged', (done) => {
    store
      .dispatch(fetchContentTemplateListPaged())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[0].payload.id).toEqual('contentTemplateList');
        expect(actions[1]).toHaveProperty('type', SET_CONTENT_TEMPLATES);
        expect(actions[1].payload.list).toEqual(['a', 'b']);
        done();
      })
      .catch(done.fail);
  });

  it('fetchContentTemplateListPaged error', (done) => {
    getContentTemplates.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContentTemplateListPaged())
      .then(() => {
        expect(getContentTemplates).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        done();
      })
      .catch(done.fail);
  });

  it('filterContentTemplateBySearch', (done) => {
    const STATE = {
      apps: {
        cms: {
          contentTemplate: {
            list: [],
            opened: {},
            filters: {
              filterProps: {
                formValues: { descr: 'boger' },
                operators: { descr: 'like' },
              },
              attribute: 'descr',
            },
          },
          contentType: {
            list: ['GUU'],
            map: {
              GUU: {
                code: 'GUU',
                name: 'GuuGuu',
              },
            },
          },
        },
      },
    };
    store = createMockStore(STATE);

    store.dispatch(filterContentTemplateBySearch('boger')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_TEMPLATE_SEARCH_KEYWORD);
      expect(actions[0].payload).toEqual('boger');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_TEMPLATE_FILTER);
      expect(actions[1].payload).toHaveProperty('formValues');
      expect(actions[1].payload.formValues).toEqual({ descr: 'boger' });
      expect(actions[1].payload).toHaveProperty('operators');
      expect(actions[1].payload.operators).toEqual({ descr: 'like' });
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[2].payload.id).toEqual('contentTemplateList');
      expect(actions[3]).toHaveProperty('type', SET_CONTENT_TEMPLATES);
      expect(getContentTemplates).toHaveBeenCalledWith(pageDefault, '?filters[0].attribute=descr&filters[0].operator=like&filters[0].value=boger');
      done();
    }).catch(done.fail);
  });

  it('fetchContentTemplatesByContentType', (done) => {
    const STATE = {
      apps: {
        cms: {
          contentTemplate: {
            list: [],
            opened: {},
            filters: {
              filterProps: {
                formValues: { contentType: 'GUU' },
                operators: { contentType: 'eq' },
              },
              attribute: 'descr',
            },
          },
          contentType: {
            list: ['GUU'],
            map: {
              GUU: {
                code: 'GUU',
                name: 'GuuGuu',
              },
            },
          },
        },
      },
    };
    store = createMockStore(STATE);

    store.dispatch(fetchContentTemplatesByContentType('GUU')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_TEMPLATE_SEARCH_KEYWORD);
      expect(actions[0].payload).toEqual('GUU');
      expect(actions[1]).toHaveProperty('type', SET_CONTENT_TEMPLATE_FILTER);
      expect(actions[1].payload).toHaveProperty('formValues');
      expect(actions[1].payload.formValues).toEqual({ contentType: 'GUU' });
      expect(actions[1].payload).toHaveProperty('operators');
      expect(actions[1].payload.operators).toEqual({ contentType: 'eq' });
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[2].payload.id).toEqual('contentTemplateList');
      expect(actions[3]).toHaveProperty('type', SET_CONTENT_TEMPLATES);
      expect(getContentTemplates).toHaveBeenCalledWith(pageDefault, '?filters[0].attribute=contentType&filters[0].operator=eq&filters[0].value=GUU');
      done();
    }).catch(done.fail);
  });

  it('sendPostContentTemplate', (done) => {
    const tosend = { a: 1, contentType: 'YO' };
    store
      .dispatch(sendPostContentTemplate(tosend))
      .then((res) => {
        expect(postContentTemplate).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(tosend);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostContentTemplate error', (done) => {
    postContentTemplate.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { a: 1, contentType: 'YO' };
    store
      .dispatch(sendPostContentTemplate(tosend))
      .then((res) => {
        expect(postContentTemplate).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });

  it('fetchContentTemplate', (done) => {
    const idopen = 1;
    store.dispatch(fetchContentTemplate(idopen)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_TEMPLATE_OPENED);
      expect(actions[0].payload).toEqual({ id: 1, code: 'GUU', a: 'b' });
      done();
    }).catch(done.fail);
  });

  it('fetchContentTemplate error', (done) => {
    getContentTemplate.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContentTemplate(1))
      .then(() => {
        expect(getContentTemplate).toHaveBeenCalledWith(1);
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[1]).toHaveProperty('type', 'errors/clear-errors');
        done();
      })
      .catch(done.fail);
  });

  it('fetchContentTemplateDictionary', (done) => {
    store.dispatch(fetchContentTemplateDictionary()).then(() => {
      expect(getContentTemplateDictionary).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', SET_CONTENT_TEMPLATE_DICTIONARY);
      expect(actions[0].payload).toEqual(['a', 'b']);
      done();
    }).catch(done.fail);
  });

  it('fetchContentTemplateDictionary error', (done) => {
    getContentTemplateDictionary.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(fetchContentTemplateDictionary()).then(() => {
      expect(getContentTemplateDictionary).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
      expect(actions[1]).toHaveProperty('type', 'errors/clear-errors');
      done();
    }).catch(done.fail);
  });

  it('sendPutContentTemplate', (done) => {
    const tosend = { id: 1, contentType: 'YO' };
    store
      .dispatch(sendPutContentTemplate(tosend))
      .then((res) => {
        expect(putContentTemplate).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(tosend);
        done();
      })
      .catch(done.fail);
  });

  it('sendPutContentTemplate error', (done) => {
    putContentTemplate.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { id: 1, contentType: 'YO' };
    store
      .dispatch(sendPutContentTemplate(tosend))
      .then((res) => {
        expect(putContentTemplate).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });

  it('sendDeleteContentTemplate', (done) => {
    const tosend = 1;
    store
      .dispatch(sendDeleteContentTemplate(tosend))
      .then((res) => {
        expect(deleteContentTemplate).toHaveBeenCalledWith(tosend);
        expect(res).toEqual({ id: tosend });
        done();
      })
      .catch(done.fail);
  });

  it('sendDeleteContentTemplate error', (done) => {
    deleteContentTemplate.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(sendDeleteContentTemplate(1))
      .then((res) => {
        expect(deleteContentTemplate).toHaveBeenCalledWith(1);
        expect(res).toEqual(undefined);
        done();
      })
      .catch(done.fail);
  });
});
