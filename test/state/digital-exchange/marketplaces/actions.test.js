import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import {
  setDEMarketplaces,
  setSelectedDEMarketplace,
  removeDEMarketplace,
  fetchDEMarketplaces,
  fetchDEMarketplace,
  sendPostDEMarketplaces,
  sendPutDEMarketplaces,
  sendDeleteDEMarketplaces,
} from 'state/digital-exchange/marketplaces/actions';
import { LIST_DE_MARKETPLACES_OK, GET_DE_MARKETPLACE_OK } from 'test/mocks/digital-exchange/marketplaces';
import {
  getDEMarketplaces,
  getDEMarketplace,
  postDEMarketplaces,
  putDEMarketplaces,
  deleteDEMarketplace,
} from 'api/digital-exchange/marketplaces';
import {
  SET_DE_MARKETPLACES,
  SET_SELECTED_DE_MARKETPLACE,
  REMOVE_DE_MARKETPLACE,
} from 'state/digital-exchange/marketplaces/types';

import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_TOAST, ADD_ERRORS, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { gotoRoute } from '@entando/router';
import { ROUTE_DE_CONFIG_LIST } from 'app-init/router';

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

  describe('setSelectedDEMarketplace', () => {
    it('action payload contains selected marketplace', () => {
      action = setSelectedDEMarketplace(GET_DE_MARKETPLACE_PAYLOAD);
      expect(action).toHaveProperty('type', SET_SELECTED_DE_MARKETPLACE);
      expect(action.payload).toHaveProperty('marketplace', GET_DE_MARKETPLACE_PAYLOAD);
    });
  });

  describe('removeDEMarketplace', () => {
    it('action payload contains marketplace id', () => {
      action = removeDEMarketplace(12);
      expect(action).toHaveProperty('type', REMOVE_DE_MARKETPLACE);
      expect(action.payload).toHaveProperty('marketplace', 12);
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
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('fetchDEMarketplaces errors and dispatch ADD_ERRORS ', (done) => {
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
        expect(digitalExchangeMarketplace.name).toBe('Entando');
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchDEMarketplace', () => {
    beforeEach(() => {
      getDEMarketplace.mockImplementation(mockApi({ payload: GET_DE_MARKETPLACE_OK }));
    });

    it('fetchDEMarketplace calls setSelectedDEMarketplace', (done) => {
      store.dispatch(fetchDEMarketplace(12)).then(() => {
        expect(getDEMarketplace).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_DE_MARKETPLACE);
        done();
      }).catch(done.fail);
    });

    it('prepopulates the form if initForm is true', (done) => {
      store.dispatch(fetchDEMarketplace(12, true)).then(() => {
        expect(getDEMarketplace).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', SET_SELECTED_DE_MARKETPLACE);
        expect(actions[1]).toHaveProperty('type', '@@redux-form/INITIALIZE');
        expect(actions[1]).toHaveProperty('meta.form', 'deSettings');
        done();
      }).catch(done.fail);
    });

    it('fetchDEMarketplace errors and dispatch ADD_ERRORS ', (done) => {
      getDEMarketplace.mockImplementation(mockApi({ errors: true }));
      store.dispatch(fetchDEMarketplace(12)).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);

        done();
      }).catch(done.fail);
    });

    it('marketplace is defined and properly valued', (done) => {
      store.dispatch(fetchDEMarketplace(12)).then(() => {
        const actionPayload = store.getActions()[0].payload;
        expect(actionPayload).toHaveProperty('digitalExchangeMarketplace.name', 'Entando');
        done();
      }).catch(done.fail);
    });
  });

  describe('sendDeleteDEMarketplaces', () => {
    it('calls deleteDEMarketplace, ADD_TOAST and removeDEMarketplace actions', (done) => {
      deleteDEMarketplace.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendDeleteDEMarketplaces(12)).then(() => {
        expect(deleteDEMarketplace).toHaveBeenCalledWith(12);
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', REMOVE_DE_MARKETPLACE);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.marketplace', 12);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1]).toHaveProperty('payload');
        expect(actions[1]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      deleteDEMarketplace.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteDEMarketplaces(12)).then(() => {
        expect(deleteDEMarketplace).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostDEMarketplaces', () => {
    it('calls postDEMarketplaces, ADD_TOAST and gotoRoute actions ', (done) => {
      const data = { data: 1 };
      postDEMarketplaces.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendPostDEMarketplaces(data)).then(() => {
        expect(postDEMarketplaces).toHaveBeenCalledWith(data);
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DE_CONFIG_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      postDEMarketplaces.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPostDEMarketplaces()).then(() => {
        expect(postDEMarketplaces).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0].payload).toHaveProperty('message', 'Error!');
        expect(actions[0].payload).toHaveProperty('type', TOAST_ERROR);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPutDEMarketplaces', () => {
    it('calls putDEMarketplaces, ADD_TOAST and gotoRoute actions ', (done) => {
      const data = { id: 12, data: 1 };
      putDEMarketplaces.mockImplementationOnce(mockApi({ errors: false }));
      store.dispatch(sendPutDEMarketplaces(data)).then(() => {
        expect(putDEMarketplaces).toHaveBeenCalledWith(data);
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DE_CONFIG_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        expect(actions[0]).toHaveProperty('payload');
        expect(actions[0]).toHaveProperty('payload.type', TOAST_SUCCESS);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      putDEMarketplaces.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPutDEMarketplaces()).then(() => {
        expect(putDEMarketplaces).toHaveBeenCalled();
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
