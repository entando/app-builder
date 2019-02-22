import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import { setDigitalExchanges, fetchDigitalExchanges, setSelectedDigitalExchange } from 'state/digital-exchange/digital-exchanges/actions';
import { LIST_DIGITAL_EXCHANGES_OK, DIGITAL_EXCHANGE_OK } from 'test/mocks/digital-exchange/digitalExchanges';
import { getDigitalExchanges } from 'api/digital-exchange/digitalExchanges';
import { SET_DIGITAL_EXCHANGES, SET_SELECTED_DIGITAL_EXCHANGE } from 'state/digital-exchange/digital-exchanges/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_ERRORS } from '@entando/messages';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  digitalExchanges: {
    list: [],
  },
};

const GET_DIGITAL_EXCHANGE_PAYLOAD = DIGITAL_EXCHANGE_OK.payload;

jest.mock('api/digital-exchange/digitalExchanges');


describe('state/digital-exchange/digital-exchanges/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setDigitalExchanges', () => {
    it('test setDigitalExchanges action sets the correct type', () => {
      action = setDigitalExchanges(LIST_DIGITAL_EXCHANGES_OK);
      expect(action).toHaveProperty('type', SET_DIGITAL_EXCHANGES);
    });
  });

  describe('fetchDigitalExchanges', () => {
    beforeEach(() => {
      getDigitalExchanges.mockImplementation(mockApi({ payload: LIST_DIGITAL_EXCHANGES_OK }));
    });
    it('fetchDigitalExchanges calls setDigitalExchanges and setPage actions', (done) => {
      store.dispatch(fetchDigitalExchanges()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_DIGITAL_EXCHANGES);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[3]).toHaveProperty('type', SET_PAGE);
        done();
      }).catch(done.fail);
    });

    it('fetchDigitalExchanges as error and dispatch ADD_ERRORS ', (done) => {
      getDigitalExchanges.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchDigitalExchanges()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);

        done();
      }).catch(done.fail);
    });

    it('digital exchanges are defined and properly valued', (done) => {
      store.dispatch(fetchDigitalExchanges()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.digitalExchanges).toHaveLength(3);
        const digitalExchange = actionPayload.digitalExchanges[0];
        expect(digitalExchange.name).toBe('Entando');
        done();
      }).catch(done.fail);
    });

    describe('test sync actions', () => {
      describe('test s', () => {
        it('action payload contains selected digital exchange', () => {
          action = setSelectedDigitalExchange(GET_DIGITAL_EXCHANGE_PAYLOAD);
          expect(action).toHaveProperty('type', SET_SELECTED_DIGITAL_EXCHANGE);
          expect(action.payload).toHaveProperty('digitalExchange', GET_DIGITAL_EXCHANGE_PAYLOAD);
        });
      });
    });
  });
});
