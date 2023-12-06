import { isFSA } from 'flux-standard-action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ADD_ERRORS } from '@entando/messages';

import {
  setLabels, updateLabelSync, fetchLabels, updateLabel, createLabel,
  removeLabelSync, removeLabel, fetchLabel, setLabelFilters, setSearchTerm,
} from 'state/labels/actions';
import { SET_LABELS, UPDATE_LABEL, REMOVE_LABEL, SET_LABEL_FILTERS, SET_SELECTED_LABEL, SET_SEARCH_TERM } from 'state/labels/types';
import { getLabelsMap } from 'state/labels/selectors';
import { SET_PAGE } from 'state/pagination/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { getLabels, getLabel, putLabel, postLabel, deleteLabel } from 'api/labels';

import { LABELS_LIST } from 'test/mocks/labels';


const mockStore = configureMockStore([thunk]);

const HELLO_LABEL = {
  key: 'HELLO',
  titles: {
    en: 'Hello',
    it: 'Ciao',
  },
};

const INITIAL_STATE = {
  labels: {
    map: {
      HELLO: HELLO_LABEL,
      GOODBYE: {
        key: 'GOODBYE',
        titles: {
          en: 'Goodbye',
          it: 'Addio',
        },
      },
    },
    list: ['HELLO', 'GOODBYE'],
    filters: null,
  },
};
const PAGE = { page: 1, pageSize: 10 };
const ERRORS = [{ code: 1, message: 'Error message' }];

const mockApi = ({
  ok, payload, metaData, errors,
}) =>
  () => new Promise(resolve => resolve({
    ok,
    json: () => new Promise(resolveJson => resolveJson({
      payload,
      metaData,
      errors,
    })),
  }));

jest.mock('api/labels', () => ({
  getLabels: jest.fn(),
  getLabel: jest.fn(),
  putLabel: jest.fn(),
  postLabel: jest.fn(),
  deleteLabel: jest.fn(),
}));

jest.mock('state/labels/selectors', () => ({
  getLabelsMap: jest.fn(),
  getLabelFilters: jest.fn(),
}));

describe('state/labels/actions', () => {
  beforeEach(jest.clearAllMocks);

  describe('setSearchTerm', () => {
    it('test setGroups action sets the correct type', () => {
      const action = setSearchTerm('term');
      expect(action).toHaveProperty('type', SET_SEARCH_TERM);
      expect(action).toHaveProperty('payload', { searchTerm: 'term' });
    });
  });

  describe('setLabels', () => {
    let action;
    beforeEach(() => {
      action = setLabels(LABELS_LIST);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type SET_LABELS', () => {
      expect(action.type).toBe(SET_LABELS);
    });

    it('defines the "labels" payload property', () => {
      expect(action.payload.labels).toBe(LABELS_LIST);
    });
  });

  describe('updateLabelSync', () => {
    let action;
    beforeEach(() => {
      action = updateLabelSync(HELLO_LABEL);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type UPDATE_LABEL', () => {
      expect(action.type).toBe(UPDATE_LABEL);
    });

    it('defines the "label" payload property', () => {
      expect(action.payload.label).toBe(HELLO_LABEL);
    });
  });

  describe('removeLabelSync', () => {
    let action;
    beforeEach(() => {
      action = removeLabelSync(HELLO_LABEL.key);
    });

    it('is FSA compliant', () => {
      expect(isFSA(action)).toBe(true);
    });

    it('is of type UPDATE_LABEL', () => {
      expect(action.type).toBe(REMOVE_LABEL);
    });

    it('defines the "labelCode" payload property', () => {
      expect(action.payload.labelCode).toBe(HELLO_LABEL.key);
    });
  });

  describe('setLabelFilters', () => {
    it('returns an action object with the correct type and payload', () => {
      const action = setLabelFilters({ keyword: 'foo' });
      expect(action).toEqual({ type: SET_LABEL_FILTERS, payload: { keyword: 'foo' } });
    });
  });

  describe('fetchLabels', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('if API response is ok, dispatch SET_LABELS and SET_PAGE', (done) => {
      getLabels.mockImplementation(mockApi({
        ok: true,
        payload: LABELS_LIST,
        metaData: PAGE,
      }));
      store.dispatch(fetchLabels()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(TOGGLE_LOADING);
        expect(actions[1].payload.labels).toEqual(LABELS_LIST);
        expect(actions[1].type).toBe(SET_LABELS);
        expect(actions[2].type).toBe(TOGGLE_LOADING);
        expect(actions[3].payload.page).toEqual(PAGE);
        expect(actions[3].type).toBe(SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      getLabels.mockImplementation(mockApi({
        ok: false,
      }));
      store.dispatch(fetchLabels()).then(() => {
        expect(store.getActions()).toHaveLength(1);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok and has errors, dispatch ADD_ERRORS', (done) => {
      getLabels.mockImplementation(mockApi({
        ok: false,
        errors: ERRORS,
      }));
      store.dispatch(fetchLabels()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(TOGGLE_LOADING);
        expect(actions[1].type).toBe(ADD_ERRORS);
        expect(actions[1].payload.errors).toEqual(ERRORS.map(e => e.message));
        done();
      }).catch(done.fail);
    });
  });

  describe('updateLabel', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
      getLabelsMap.mockReturnValue(INITIAL_STATE.labels.map);
      putLabel.mockImplementation(mockApi({
        ok: true,
        payload: LABELS_LIST,
        metaData: PAGE,
      }));
    });

    it('if API response is ok, dispatch UPDATE_LABEL', (done) => {
      store.dispatch(updateLabel(HELLO_LABEL)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(UPDATE_LABEL);
        expect(actions[0].payload.label).toBe(HELLO_LABEL);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      putLabel.mockImplementation(mockApi({
        ok: false,
      }));
      store.dispatch(updateLabel(HELLO_LABEL)).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok and has errors, dispatch ADD_ERRORS', (done) => {
      putLabel.mockImplementation(mockApi({
        ok: false,
        errors: ERRORS,
      }));
      store.dispatch(updateLabel(HELLO_LABEL)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(ADD_ERRORS);
        expect(actions[0].payload.errors).toEqual(ERRORS.map(e => e.message));
        done();
      }).catch(done.fail);
    });

    it('if there is no mapped label, dispatch UPDATE_LABEL to add it', (done) => {
      getLabelsMap.mockReturnValue({});
      store.dispatch(updateLabel(HELLO_LABEL)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(UPDATE_LABEL);
        expect(actions[0].payload.label).toBe(HELLO_LABEL);
        done();
      }).catch(done.fail);
    });
  });

  describe('createLabel', () => {
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
      getLabelsMap.mockReturnValue(INITIAL_STATE.labels.map);
      postLabel.mockImplementation(mockApi({
        ok: true,
        payload: LABELS_LIST,
        metaData: PAGE,
      }));
    });

    it('if API response is ok, dispatch UPDATE_LABEL', (done) => {
      store.dispatch(createLabel(HELLO_LABEL)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(UPDATE_LABEL);
        expect(actions[0].payload.label).toBe(HELLO_LABEL);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      postLabel.mockImplementation(mockApi({
        ok: false,
      }));
      store.dispatch(createLabel(HELLO_LABEL)).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok and has errors, dispatch ADD_ERRORS', (done) => {
      postLabel.mockImplementation(mockApi({
        ok: false,
        errors: ERRORS,
      }));
      store.dispatch(createLabel(HELLO_LABEL)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(ADD_ERRORS);
        expect(actions[0].payload.errors).toEqual(ERRORS.map(e => e.message));
        done();
      }).catch(done.fail);
    });

    it('if there is no mapped label, dispatch UPDATE_LABEL to add it', (done) => {
      getLabelsMap.mockReturnValue({});
      store.dispatch(createLabel(HELLO_LABEL)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(UPDATE_LABEL);
        expect(actions[0].payload.label).toBe(HELLO_LABEL);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchLabel()', () => {
    const LABEL_KEY = HELLO_LABEL.key;
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    it('when fetchLabel succeeds should call "initialize" action', (done) => {
      getLabel.mockImplementation(mockApi({ ok: true, payload: HELLO_LABEL }));
      store.dispatch(fetchLabel(HELLO_LABEL.key)).then(() => {
        expect(getLabel).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_LABEL);
        expect(actions[0]).toHaveProperty('payload', HELLO_LABEL);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      getLabel.mockImplementation(mockApi({
        ok: false,
      }));
      store.dispatch(fetchLabel(LABEL_KEY)).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok and has errors, dispatch ADD_ERRORS', (done) => {
      getLabel.mockImplementation(mockApi({
        ok: false,
        errors: ERRORS,
      }));
      store.dispatch(fetchLabel(LABEL_KEY)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(ADD_ERRORS);
        expect(actions[0].payload.errors).toEqual(ERRORS.map(e => e.message));
        done();
      }).catch(done.fail);
    });
  });

  describe('removeLabel', () => {
    const LABEL_KEY = HELLO_LABEL.key;
    let store;
    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
      deleteLabel.mockImplementation(mockApi({
        ok: true,
      }));
    });

    it('if API response is ok, dispatch REMOVE_LABEL', (done) => {
      store.dispatch(removeLabel(LABEL_KEY)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(REMOVE_LABEL);
        expect(actions[0].payload.labelCode).toBe(LABEL_KEY);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok, dispatch nothing', (done) => {
      deleteLabel.mockImplementation(mockApi({
        ok: false,
      }));
      store.dispatch(removeLabel(LABEL_KEY)).then(() => {
        expect(store.getActions()).toHaveLength(0);
        done();
      }).catch(done.fail);
    });

    it('if API response is not ok and has errors, dispatch ADD_ERRORS', (done) => {
      deleteLabel.mockImplementation(mockApi({
        ok: false,
        errors: ERRORS,
      }));
      store.dispatch(removeLabel(LABEL_KEY)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(ADD_ERRORS);
        expect(actions[0].payload.errors).toEqual(ERRORS.map(e => e.message));
        done();
      }).catch(done.fail);
    });
  });
});
