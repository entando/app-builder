import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { DE_COMPONENTS_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/const';


import { setDEExtraFilters, fetchDEExtraFilters } from 'state/digital-exchange/extra-filters/actions';
import { SET_DE_EXTRA_FILTERS } from 'state/digital-exchange/extra-filters/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  digitalExchangeExtraFilters: {
    list: [],
  },
};

const EXTRA_FILTERS = Object.keys(DE_COMPONENTS_EXTRA_FILTERS);

describe('state/digital-exchange/extra-filters/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setDEExtraFilters', () => {
    it('test setDEExtraFilters action sets the correct type', () => {
      action = setDEExtraFilters(EXTRA_FILTERS);
      expect(action).toHaveProperty('type', SET_DE_EXTRA_FILTERS);
    });
  });


  it('extra filters is defined and properly valued', (done) => {
    store.dispatch(fetchDEExtraFilters()).then(() => {
      const digitalExchangeExtraFilter =
            store.getActions()[0].payload.digitalExchangeExtraFilters[0];
      expect(digitalExchangeExtraFilter).toBe('explore');
      done();
    }).catch(done.fail);
  });
});
