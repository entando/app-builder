import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchFragment, fetchFragmentDetail, setFragments, fetchFragments } from 'state/fragments/actions';
import { GET_FRAGMENT_OK, LIST_FRAGMENTS_OK_PAGE_1 } from 'test/mocks/fragments';
import { SET_FRAGMENTS } from 'state/fragments/types';
import { SET_PAGE } from 'state/pagination/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const FRAGMENT_MOCK = GET_FRAGMENT_OK.payload;

const FRAGMENT_CODE = 'myCode';

const INITIAL_STATE = {
  form: {},
  fragments: [],
};

describe('fragment actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
  });

  describe('fetchFragment', () => {
    it('action payload contains fragment information', (done) => {
      store.dispatch(fetchFragment(FRAGMENT_CODE)).then(() => {
        const actions = store.getActions();
        expect(actions[0].payload).toEqual(FRAGMENT_MOCK);
        done();
      });
    });

    it('action payload contains fragment information', (done) => {
      store.dispatch(fetchFragmentDetail(FRAGMENT_CODE)).then(() => {
        const actions = store.getActions();
        expect(actions[0].payload.fragment).toEqual(FRAGMENT_MOCK);
        done();
      });
    });
  });

  describe('setFragments', () => {
    it('test setFragments action sets the correct type', () => {
      const action = setFragments(LIST_FRAGMENTS_OK_PAGE_1.payload);
      expect(action.type).toEqual(SET_FRAGMENTS);
    });
  });

  describe('fetchFragments', () => {
    it('fetchFragments calls setFragments and setPage actions', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0].type).toEqual(SET_FRAGMENTS);
        expect(actions[1].type).toEqual(SET_PAGE);
        done();
      });
    });

    it('fragments is defined and properly valued', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.fragments).toHaveLength(2);
        const fragment = actionPayload.fragments[0];
        expect(fragment).toHaveProperty('code', 'myCode');
        expect(fragment).toHaveProperty('isLocked');
        expect(fragment).toHaveProperty('widgetType');
        expect(fragment).toHaveProperty('pluginCode');
        done();
      });
    });

    it('fragments page two is retrieved correctly and properly valued', (done) => {
      store.dispatch(fetchFragments(2)).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload.fragments).toHaveLength(2);
        expect(actionPayload.fragments[0]).toHaveProperty('code', 'myCode3');
        expect(actionPayload.fragments[1]).toHaveProperty('code', 'myCode4');
        done();
      });
    });

    it('page is defined and properly valued', (done) => {
      store.dispatch(fetchFragments()).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 1);
        expect(actionPayload).toHaveProperty('pageSize', 2);
        expect(actionPayload).toHaveProperty('lastPage', 3);
        done();
      });
    });

    it('page 2 is defined and properly valued', (done) => {
      store.dispatch(fetchFragments(2)).then(() => {
        const actionPayload = store.getActions()[1].payload.page;
        expect(actionPayload).toHaveProperty('page', 2);
        expect(actionPayload).toHaveProperty('pageSize', 2);
        expect(actionPayload).toHaveProperty('lastPage', 3);
        done();
      });
    });
  });
});
