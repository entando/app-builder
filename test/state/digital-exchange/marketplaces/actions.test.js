import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import { setDEMarketplaces, fetchDEMarketplaces, setSelectedDEMarketplace } from 'state/digital-exchange/marketplaces/actions';
import { LIST_DE_MARKETPLACES_OK, GET_DE_MARKETPLACE_OK } from 'test/mocks/digital-exchange/marketplaces';
import { getDEMarketplaces } from 'api/digital-exchange/marketplaces';
import { SET_DE_MARKETPLACES, SET_SELECTED_DE_MARKETPLACE } from 'state/digital-exchange/marketplaces/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  digitalExchangeMarketplaces: {
    list: [],
  },
};

const GET_DE_MARKETPLACE_PAYLOAD = GET_DE_MARKETPLACE_OK.payload;

jest.mock('api/digital-exchange/marketplaces');


describe('state/digital-exchange/marketplaces/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setDEMarketplaces', () => {
    it('test setDEMarketplaces action sets the correct type', () => {
      action = setDEMarketplaces(LIST_DE_MARKETPLACES_OK);
      expect(action).toHaveProperty('type', SET_DE_MARKETPLACES);
    });
  });

  describe('fetchDEMarketplaces', () => {
    beforeEach(() => {
      getDEMarketplaces.mockImplementation(mockApi({ payload: LIST_DE_MARKETPLACES_OK }));
    });
    it('fetchDEMarketplaces calls setDEMarketplaces and setPage actions', (done) => {
      store.dispatch(fetchDEMarketplaces()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_DE_MARKETPLACES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('fetchDEMarketplaces as error and dispatch ADD_ERRORS ', (done) => {
      getDEMarketplaces.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchDEMarketplaces()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);

        done();
      }).catch(done.fail);
    });

    it('marketplaces is defined and properly valued', (done) => {
      store.dispatch(fetchDEMarketplaces()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.digitalExchangeMarketplaces).toHaveLength(3);
        const digitalExchangeMarketplace = actionPayload.digitalExchangeMarketplaces[0];
        expect(digitalExchangeMarketplace).toBe('Entando');
        done();
      }).catch(done.fail);
    });

    describe('test sync actions', () => {
      describe('test s', () => {
        it('action payload contains selected marketplace', () => {
          action = setSelectedDEMarketplace(GET_DE_MARKETPLACE_PAYLOAD);
          expect(action).toHaveProperty('type', SET_SELECTED_DE_MARKETPLACE);
          expect(action.payload).toHaveProperty('marketplace', GET_DE_MARKETPLACE_PAYLOAD);
        });
      });
    });
  });
});
