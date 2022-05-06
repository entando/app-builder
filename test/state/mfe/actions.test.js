import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { config } from '@entando/apimanager';

import { mockApi } from 'test/testUtils';

import { ADD_TOAST } from '@entando/messages';


import { setMfeConfigList, addMfeConfig, updateMfeConfig, fetchMfeConfigList } from 'state/mfe/actions';
import { SET_MFE_CONFIG_LIST, ADD_MFE_CONFIG, UPDATE_MFE_CONFIG } from 'state/mfe/types';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';
import { getMfeConfigList } from 'api/mfe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

config(mockStore({ api: { useMocks: true }, currentUser: { token: 'asdf' } }));


const INITIAL_STATE = {
  mfe: {
    mfeConfigList: {},
  },
};

jest.mock('api/mfe');

describe('state/mfe/actions', () => {
  let store;
  let action;

  beforeEach(() => {
    store = mockStore(INITIAL_STATE);
    jest.clearAllMocks();
    store.clearActions();
  });

  describe('setMfeConfigList', () => {
    it('test setMfeConfigList action sets the correct type', () => {
      action = setMfeConfigList(LIST_MFE_RESPONSE_OK);
      expect(action).toHaveProperty('type', SET_MFE_CONFIG_LIST);
      expect(action.payload).toEqual(LIST_MFE_RESPONSE_OK);
    });
  });
  describe('addMfeConfig', () => {
    it('test addMfeConfig action sets the correct type', () => {
      const mfeConfig = { id: '1' };
      action = addMfeConfig(mfeConfig);
      expect(action).toHaveProperty('type', ADD_MFE_CONFIG);
      expect(action.payload).toEqual(mfeConfig);
    });
  });
  describe('updateMfeConfig', () => {
    it('test updateMfeConfig action sets the correct type', () => {
      const mfeConfig = { id: '1' };
      action = updateMfeConfig(mfeConfig);
      expect(action).toHaveProperty('type', UPDATE_MFE_CONFIG);
      expect(action.payload).toEqual(mfeConfig);
    });
  });

  describe('fetchMfeConfigList', () => {
    it('calls getMfeConfigList and appropriate actions', (done) => {
      getMfeConfigList.mockImplementationOnce(mockApi({
        ok: true,
        errors: false,
        payload: LIST_MFE_RESPONSE_OK,
      }));
      store.dispatch(fetchMfeConfigList()).then(() => {
        expect(getMfeConfigList).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_MFE_CONFIG_LIST);
        expect(actions[0].payload).toEqual(LIST_MFE_RESPONSE_OK);
        done();
      }).catch(done.fail);
    });

    it('should dispatch toastError when it errors', (done) => {
      getMfeConfigList.mockImplementationOnce(mockApi({ errors: ['error'], ok: false }));
      store.dispatch(fetchMfeConfigList()).then(() => {
        expect(getMfeConfigList).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });
  });
});
