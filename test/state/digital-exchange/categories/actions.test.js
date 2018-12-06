import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import { setDECategories, fetchDECategories, setSelectedDECategory } from 'state/digital-exchange/categories/actions';
import { LIST_DE_CATEGORIES_OK, GET_DE_CATEGORY_OK } from 'test/mocks/digital-exchange/categories';
import { getDECategories } from 'api/digital-exchange/categories';
import { SET_DE_CATEGORIES, SET_SELECTED_DE_CATEGORY } from 'state/digital-exchange/categories/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { ADD_ERRORS } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  digitalExchangeCategories: {
    list: [],
  },
};

const GET_DE_CATEGORY_PAYLOAD = GET_DE_CATEGORY_OK.payload;

jest.mock('api/digital-exchange/categories');


describe('state/digital-exchange/categories/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setDECategories', () => {
    it('test setDECategories action sets the correct type', () => {
      action = setDECategories(LIST_DE_CATEGORIES_OK);
      expect(action).toHaveProperty('type', SET_DE_CATEGORIES);
    });
  });

  describe('fetchDECategories', () => {
    beforeEach(() => {
      getDECategories.mockImplementation(mockApi({ payload: LIST_DE_CATEGORIES_OK }));
    });
    it('fetchDECategories calls setDECategories and setPage actions', (done) => {
      store.dispatch(fetchDECategories()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_DE_CATEGORIES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('fetchDECategories as error and dispatch ADD_ERRORS ', (done) => {
      getDECategories.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchDECategories()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('categories is defined and properly valued', (done) => {
      store.dispatch(fetchDECategories()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.digitalExchangeCategories).toHaveLength(5);
        const digitalExchangeCategory = actionPayload.digitalExchangeCategories[0];
        expect(digitalExchangeCategory).toBe('Page Models');
        done();
      }).catch(done.fail);
    });

    describe('test sync actions', () => {
      describe('test s', () => {
        it('action payload contains selected category', () => {
          action = setSelectedDECategory(GET_DE_CATEGORY_PAYLOAD);
          expect(action).toHaveProperty('type', SET_SELECTED_DE_CATEGORY);
          expect(action.payload).toHaveProperty('category', GET_DE_CATEGORY_PAYLOAD);
        });
      });
    });
  });
});
