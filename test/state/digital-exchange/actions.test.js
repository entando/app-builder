import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';
import {
  navigateDECategory,
  filterByDECategories,
  filterByDigitalExchanges,
  filterByRating,
} from 'state/digital-exchange/actions';
import { SET_SELECTED_DE_CATEGORY } from 'state/digital-exchange/categories/types';
import { SET_DE_FILTER } from 'state/digital-exchange/components/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));

const INITIAL_STATE = {
  digitalExchanges: {
    list: [],
  },
  digitalExchangeCategories: {
    list: [],
    selected: {},
  },
  digitalExchangeComponents: {
    list: [],
    selected: {},
    componentListViewMode: '',
    filters: {},
  },
};

describe('state/digital-exchange/actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  it('navigateDECategory should call proper actions', (done) => {
    store.dispatch(navigateDECategory()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(6);
      expect(actions[0]).toHaveProperty('type', SET_SELECTED_DE_CATEGORY);
      expect(actions[1]).toHaveProperty('type', SET_DE_FILTER);
      done();
    }).catch(done.fail);
  });

  it('filterByDECategories should call proper actions', (done) => {
    store.dispatch(filterByDECategories()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_DE_FILTER);
      done();
    }).catch(done.fail);
  });

  it('filterByDigitalExchanges should call proper actions', (done) => {
    store.dispatch(filterByDigitalExchanges()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_DE_FILTER);
      done();
    }).catch(done.fail);
  });

  it('filterByRating should call proper actions', (done) => {
    store.dispatch(filterByRating()).then(() => {
      const actions = store.getActions();
      expect(actions).toHaveLength(5);
      expect(actions[0]).toHaveProperty('type', SET_DE_FILTER);
      done();
    }).catch(done.fail);
  });
});
