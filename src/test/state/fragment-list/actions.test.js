
import { setFragments, fetchFragments } from 'state/fragment-list/actions';
import { SET_FRAGMENTS } from 'state/fragment-list/types';
import { SET_PAGE } from 'state/pagination/types';
import { LIST_FRAGMENTS_OK_PAGE_1 } from 'test/mocks/fragments';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const INITIAL_STATE = {
  fragments: [],
  page: {
    page: null,
    pageSize: null,
    lastPage: null,
  },
};

describe('fragment-list actions', () => {
  describe('setFragments', () => {
    it('test setFragments action sets the correct type', () => {
      const action = setFragments(LIST_FRAGMENTS_OK_PAGE_1.payload);
      expect(action.type).toEqual(SET_FRAGMENTS);
    });
  });

  describe('fetchFragments', () => {
    let store;

    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

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
