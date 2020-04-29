import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import { setECRCategories, fetchECRCategories, setSelectedECRCategory } from 'state/component-repository/categories/actions';
import { LIST_ECR_CATEGORIES_OK, GET_ECR_CATEGORY_OK } from 'test/mocks/component-repository/categories';
import { getECRCategories } from 'api/component-repository/categories';
import { SET_ECR_CATEGORIES, SET_SELECTED_ECR_CATEGORY } from 'state/component-repository/categories/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { ADD_ERRORS, ADD_TOAST } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  componentRepositoryCategories: {
    list: [],
  },
};

const GET_ECR_CATEGORY_PAYLOAD = GET_ECR_CATEGORY_OK.payload;

jest.mock('api/component-repository/categories');


describe('state/component-repository/categories/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setECRCategories', () => {
    it('test setECRCategories action sets the correct type', () => {
      action = setECRCategories(LIST_ECR_CATEGORIES_OK);
      expect(action).toHaveProperty('type', SET_ECR_CATEGORIES);
    });
  });

  describe('fetchECRCategories', () => {
    beforeEach(() => {
      getECRCategories.mockImplementation(mockApi({ payload: LIST_ECR_CATEGORIES_OK }));
    });
    it('fetchECRCategories calls setECRCategories and setPage actions', (done) => {
      store.dispatch(fetchECRCategories()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_ECR_CATEGORIES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('fetchECRCategories as error and dispatch ADD_ERRORS ', (done) => {
      getECRCategories.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchECRCategories()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('categories is defined and properly valued', (done) => {
      store.dispatch(fetchECRCategories()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.componentRepositoryCategories).toHaveLength(7);
        const componentRepositoryCategory = actionPayload.componentRepositoryCategories[0];
        expect(componentRepositoryCategory).toBe('widget');
        done();
      }).catch(done.fail);
    });

    describe('test sync actions', () => {
      describe('test s', () => {
        it('action payload contains selected category', () => {
          action = setSelectedECRCategory(GET_ECR_CATEGORY_PAYLOAD);
          expect(action).toHaveProperty('type', SET_SELECTED_ECR_CATEGORY);
          expect(action.payload).toHaveProperty('category', GET_ECR_CATEGORY_PAYLOAD);
        });
      });
    });
  });
});
