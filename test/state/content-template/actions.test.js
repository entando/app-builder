import { createMockStore, mockApi } from 'test/testUtils';
import {
  pageDefault,
  setContentTemplateList,
  fetchContentTemplateList,
  fetchContentTemplateListPaged,
  fetchContentTemplatesByContentType,
} from 'state/content-template/actions';
import {
  SET_CONTENT_TEMPLATES,
  SET_CONTENT_TEMPLATE_SEARCH_KEYWORD,
  SET_CONTENT_TEMPLATE_FILTER,
} from 'state/content-template/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { GET_CONTENT_TEMPLATES_RESPONSE_OK } from 'test/mocks/contentTemplate';
import { getContentTemplates } from 'api/contentTemplates';

const list = GET_CONTENT_TEMPLATES_RESPONSE_OK;

const CONTMODEL_SET_PARAMS = {
  type: SET_CONTENT_TEMPLATES,
  payload: {
    list,
  },
};

jest.mock('api/contentTemplates', () => ({
  getContentTemplates: jest.fn(mockApi({ payload: ['a', 'b'] })),
}));

it('test setContentTemplateList action', () => {
  expect(setContentTemplateList(list)).toEqual(CONTMODEL_SET_PARAMS);
});

const DEFAULT_STATE = {
  contentTemplate: {
    list: [],
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

  it('fetchContentTemplatesByContentType', (done) => {
    const STATE = {
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
});
