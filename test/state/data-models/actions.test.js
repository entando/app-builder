import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from '@entando/router';

import { mockApi } from 'test/testUtils';
import {
  fetchDataModelListPaged,
  fetchDataModel,
  sendPostDataModel,
  sendPutDataModel,
  sendDeleteDataModel,
} from 'state/data-models/actions';
import { getDataModels, getDataModel, postDataModel, putDataModel, deleteDataModel } from 'api/dataModels';
import { SET_DATA_MODELS } from 'state/data-models/types';
import { ADD_ERRORS } from 'state/errors/types';
import { TOGGLE_LOADING } from 'state/loading/types';
import { DATA_MODELS } from 'test/mocks/dataModels';
import { SET_PAGE } from 'state/pagination/types';
import { ADD_TOAST } from 'state/toasts/types';
import { ROUTE_DATA_MODEL_LIST } from 'app-init/router';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DATA_MODELS_MOCK = DATA_MODELS.payload;

const DATA_MODELS_MOCK_INITIAL_STATE = {
  dataModelsPaged: [],
};

describe('state/data-models/actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(DATA_MODELS_MOCK_INITIAL_STATE);
  });

  describe('fetchDataModels', () => {
    it('fetchDataModels calls setDataModels and setPage actions ', (done) => {
      store.dispatch(fetchDataModelListPaged()).then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_DATA_MODELS);
        expect(actions[1]).toHaveProperty('payload', { dataModelsPaged: DATA_MODELS_MOCK });
        expect(actions[2]).toHaveProperty('type', SET_PAGE);
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });

    it('getDataModels is defined and properly valued', (done) => {
      store.dispatch(fetchDataModelListPaged()).then(() => {
        expect(getDataModels).toHaveBeenCalled();
        const actions = store.getActions();
        const actionPayload = actions[1].payload;
        expect(actionPayload.dataModelsPaged).toHaveLength(6);
        const dataModel = actionPayload.dataModelsPaged[0];
        expect(dataModel).toMatchObject(DATA_MODELS.payload[0]);
        done();
      }).catch(done.fail);
    });

    it('when getDataModels errors it should dispatch addErrors', (done) => {
      getDataModels.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchDataModelListPaged()).then(() => {
        expect(getDataModels).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      }).catch(done.fail);
    });
  });

  describe('fetchDataModel', () => {
    it('fetchDataModel calls initialize ', (done) => {
      store.dispatch(fetchDataModel(1)).then(() => {
        expect(getDataModel).toHaveBeenCalledWith(1);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', '@@redux-form/INITIALIZE');
        done();
      }).catch(done.fail);
    });

    it('when fetchDataModel errors it should dispatch addError', (done) => {
      getDataModel.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(fetchDataModel()).then(() => {
        expect(getDataModel).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendPostDataModel', () => {
    it('sendPostDataModel calls postDataModel, ADD_TOAST and gotoRoute actions ', (done) => {
      const data = { data: 1 };
      store.dispatch(sendPostDataModel(data)).then(() => {
        expect(postDataModel).toHaveBeenCalledWith(data);
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });

    it('when sendPostDataModel errors it should dispatch addError', (done) => {
      postDataModel.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPostDataModel()).then(() => {
        expect(postDataModel).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });

  describe('sendDeleteDataModel', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('sendDeleteDataModel calls deleteDataModel, gotoRoute and addToast', (done) => {
      store.dispatch(sendDeleteDataModel('modelId')).then(() => {
        expect(deleteDataModel).toHaveBeenCalledWith('modelId');
        expect(gotoRoute).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1].payload).toHaveProperty('message', 'dataModel.deleteDataModelSuccess');
        expect(actions[1].payload).toHaveProperty('type', 'success');
        done();
      }).catch(done.fail);
    });

    it('when deleteDataModel get error, should dispatch addErrors and addToast', async () => {
      deleteDataModel.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendDeleteDataModel('modelId')).catch((e) => {
        expect(deleteDataModel).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        expect(actions[1]).toHaveProperty('type', ADD_TOAST);
        expect(actions[1].payload).toHaveProperty('message', 'dataModel.deleteDataModelError');
        expect(actions[1].payload).toHaveProperty('type', 'error');
        expect(e).toHaveProperty('errors');
      });
    });
  });

  describe('sendPutDataModel', () => {
    it('sendPutDataModel calls postDataModel, ADD_TOAST and gotoRoute actions ', (done) => {
      const data = { modelId: 1 };
      store.dispatch(sendPutDataModel(data)).then(() => {
        expect(putDataModel).toHaveBeenCalledWith(data);
        expect(gotoRoute).toHaveBeenCalledWith(ROUTE_DATA_MODEL_LIST);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_TOAST);
        done();
      }).catch(done.fail);
    });

    it('when sendPutDataModel errors it should dispatch addError', (done) => {
      putDataModel.mockImplementationOnce(mockApi({ errors: true }));
      store.dispatch(sendPutDataModel()).then(() => {
        expect(putDataModel).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
        done();
      }).catch(done.fail);
    });
  });
});
