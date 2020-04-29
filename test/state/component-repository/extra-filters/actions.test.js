import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { ECR_COMPONENTS_EXTRA_FILTERS } from 'state/component-repository/extra-filters/const';


import { setECRExtraFilters, fetchECRExtraFilters } from 'state/component-repository/extra-filters/actions';
import { SET_ECR_EXTRA_FILTERS } from 'state/component-repository/extra-filters/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  componentRepositoryExtraFilters: {
    list: [],
  },
};

const EXTRA_FILTERS = Object.keys(ECR_COMPONENTS_EXTRA_FILTERS);

describe('state/component-repository/extra-filters/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setECRExtraFilters', () => {
    it('test setECRExtraFilters action sets the correct type', () => {
      action = setECRExtraFilters(EXTRA_FILTERS);
      expect(action).toHaveProperty('type', SET_ECR_EXTRA_FILTERS);
    });
  });


  it('extra filters is defined and properly valued', (done) => {
    store.dispatch(fetchECRExtraFilters()).then(() => {
      const ComponentRepositoryExtraFilter =
            store.getActions()[0].payload.componentRepositoryExtraFilters[0];
      expect(ComponentRepositoryExtraFilter).toBe('explore');
      done();
    }).catch(done.fail);
  });
});
