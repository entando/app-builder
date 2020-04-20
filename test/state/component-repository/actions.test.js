import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import {
  navigateECRCategory,
  filterByECRCategories,
  filterByComponentRepositories,
  filterByRating,
  filterBySearch,
} from 'state/component-repository/actions';
import { SET_SELECTED_ECR_CATEGORY } from 'state/component-repository/categories/types';
import { SET_ECR_FILTER } from 'state/component-repository/components/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {
  componentRepositories: {
    list: [],
  },
  componentRepositoryCategories: {
    list: [],
    selected: {},
  },
  componentRepositoryComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};

describe('state/component-repository/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  it('navigateECRCategory should call proper actions', (done) => {
    store.dispatch(navigateECRCategory()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(6);
      expect(actions[0]).toHaveProperty('type', SET_SELECTED_ECR_CATEGORY);
      expect(actions[1]).toHaveProperty('type', SET_ECR_FILTER);
      done();
    }).catch(done.fail);
  });

  it('filterByECRCategories should call proper actions', (done) => {
    store.dispatch(filterByECRCategories()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_ECR_FILTER);
      done();
    }).catch(done.fail);
  });

  it('filterByComponentRepositories should call proper actions', (done) => {
    store.dispatch(filterByComponentRepositories()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_ECR_FILTER);
      done();
    }).catch(done.fail);
  });

  it('filterByRating should call proper actions', (done) => {
    store.dispatch(filterByRating()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_ECR_FILTER);
      done();
    }).catch(done.fail);
  });

  it('filterBySearch should call proper actions', (done) => {
    store.dispatch(filterBySearch()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_ECR_FILTER);
      done();
    }).catch(done.fail);
  });
});
