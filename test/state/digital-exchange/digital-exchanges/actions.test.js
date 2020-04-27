import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import {
  setDigitalExchanges,
  setSelectedDigitalExchange,
  removeDigitalExchange,
  fetchDigitalExchanges,
  fetchDigitalExchange,
  sendPostDigitalExchange,
  sendPutDigitalExchange,
  sendDeleteDigitalExchange,
} from 'state/digital-exchange/digital-exchanges/actions';
import { LIST_DIGITAL_EXCHANGES_OK, DIGITAL_EXCHANGE_OK } from 'test/mocks/digital-exchange/digitalExchanges';
import {
  getDigitalExchanges,
  getDigitalExchange,
  postDigitalExchange,
  putDigitalExchange,
  deleteDigitalExchange,
} from 'api/digital-exchange/digitalExchanges';
import {
  SET_DIGITAL_EXCHANGES,
  SET_SELECTED_DIGITAL_EXCHANGE,
  REMOVE_DIGITAL_EXCHANGE,
} from 'state/digital-exchange/digital-exchanges/types';


import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_TOAST, ADD_ERRORS, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { history, ROUTE_DE_CONFIG_LIST } from 'app-init/router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  digitalExchanges: {
    list: [],
  },
};

const DIGITAL_EXCHANGE_PAYLOAD = DIGITAL_EXCHANGE_OK.payload;

jest.mock('api/digital-exchange/digitalExchanges');

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));


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

  describe('setSelectedDigitalExchange', () => {
    it('action payload contains selected digital exchange', () => {
      action = setSelectedDigitalExchange(DIGITAL_EXCHANGE_PAYLOAD);
      expect(action).toHaveProperty('type', SET_SELECTED_DIGITAL_EXCHANGE);
      expect(action.payload).toHaveProperty('digitalExchange', DIGITAL_EXCHANGE_PAYLOAD);
    });
  });

  describe('removeDigitalExchange', () => {
    it('action payload contains digital exchange id', () => {
      action = removeDigitalExchange(12);
      expect(action).toHaveProperty('type', REMOVE_DIGITAL_EXCHANGE);
      expect(action.payload).toHaveProperty('digitalExchange', 12);
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
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('fetchDigitalExchanges errors and dispatch ADD_ERRORS ', (done) => {
      getDigitalExchanges.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchDigitalExchanges()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', ADD_TOAST);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);

        done();
      }).catch(done.fail);
    });

    it('digitalExchanges is defined and properly valued', (done) => {
      store.dispatch(fetchDigitalExchanges()).then(() => {
        const actionPayload = store.getActions()[1].payload;
        expect(actionPayload.digitalExchanges).toHaveLength(3);
        const digitalExchange = actionPayload.digitalExchanges[0];
        expect(digitalExchange.name).toBe('Entando');
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchDigitalExchange', () => {
    beforeEach(() => {
      getDigitalExchange.mockImplementation(mockApi({ payload: DIGITAL_EXCHANGE_OK }));
    });

    it('fetchDigitalExchange calls setSelectedDigitalExchange', (done) => {
      store.dispatch(fetchDigitalExchange(12)).then(() => {
        expect(getDigitalExchange).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_DIGITAL_EXCHANGE);
        done();
      }).catch(done.fail);
    });

    it('prepopulates the form if initForm is true', (done) => {
      store.dispatch(fetchDigitalExchange(12, true)).then(() => {
        expect(getDigitalExchange).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_DIGITAL_EXCHANGE);
        expect(actions[1]).toHaveProperty('type', '@@redux-form/INITIALIZE');
        expect(actions[1]).toHaveProperty('meta.form', 'deSettings');
        done();
      }).catch(done.fail);
    });

    it('fetchDigitalExchange errors and dispatch ADD_ERRORS ', (done) => {
      getDigitalExchange.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchDigitalExchange(12)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);

        done();
      }).catch(done.fail);
    });

    it('digitalExchanges is defined and properly valued', (done) => {
      store.dispatch(fetchDigitalExchange(12)).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload).toHaveProperty('digitalExchange.name', 'Entando');
        done();
      }).catch(done.fail);
    });
  });

  describe('sendDeleteDigitalExchange', () => {
    it('calls deleteDigitalExchange, ADD_TOAST and removeDigitalExchange actions', (done) => {
      deleteDigitalExchange.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendDeleteDigitalExchange(12)).then(() => {
        expect(deleteDigitalExchange).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', REMOVE_DIGITAL_EXCHANGE);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.digitalExchange', 12);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1]).toHaveProperty('payload');
        expect(actions[1]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      deleteDigitalExchange.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteDigitalExchange(12)).then(() => {
        expect(deleteDigitalExchange).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostDigitalExchange', () => {
    it('calls postDigitalExchange, ADD_TOAST and router actions ', (done) => {
      const data = { data: 1 };
      postDigitalExchange.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendPostDigitalExchange(data)).then(() => {
        expect(postDigitalExchange).toHaveBeenCalledWith(data);
        expect(history.push).toHaveBeenCalledWith(ROUTE_DE_CONFIG_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      postDigitalExchange.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPostDigitalExchange()).then(() => {
        expect(postDigitalExchange).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPutDigitalExchange', () => {
    it('calls putDigitalExchange, ADD_TOAST and router actions ', (done) => {
      const data = { id: 12, data: 1 };
      putDigitalExchange.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendPutDigitalExchange(data)).then(() => {
        expect(putDigitalExchange).toHaveBeenCalledWith(data);
        expect(history.push).toHaveBeenCalledWith(ROUTE_DE_CONFIG_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      putDigitalExchange.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPutDigitalExchange()).then(() => {
        expect(putDigitalExchange).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });
});
