import {
  getVersionings,
  deleteVersion,
  getSingleVersioning,
  getContentDetails,
  postRecoverContentVersion,
  deleteResource,
  getResourceVersionings,
  getVersioningConfig,
  putVersioningConfig,
  recoverResource,
} from 'api/versioning';
import {
  setVersionings,
  setSelectedVersioningType,
  fetchVersionings,
  removeContentVersion,
  fetchSingleVersioningHistory,
  fetchContentDetails,
  setDetailedContentVersion,
  recoverContentVersion,
  sendRemoveResource,
  setResourceVersionings,
  fetchResourceVersionings,
  setVersioningConfig,
  fetchVersioningConfig,
  sendPutVersioningConfig,
  sendRecoverResource,
} from 'state/versioning/actions';
import {
  SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE,
  SET_SINGLE_CONTENT_VERSION_DETAILS, SET_RESOURCE_VERSIONINGS,
  SET_VERSIONING_CONFIG,
} from 'state/versioning/types';

import { createMockStore, mockApi } from 'test/testUtils';
import { TOGGLE_LOADING } from 'state/loading/types';
import { SET_PAGE } from 'state/pagination/types';

const ADD_ERRORS = 'errors/add-errors';

jest.mock('api/versioning', () => ({
  getVersionings: jest.fn(),
  deleteVersion: jest.fn(),
  getSingleVersioning: jest.fn(),
  getResourceVersionings: jest.fn(),
  getContentDetails: jest.fn(),
  postRecoverContentVersion: jest.fn(),
  deleteResource: jest.fn(),
  getVersioningConfig: jest.fn(),
  putVersioningConfig: jest.fn(),
  recoverResource: jest.fn(),
}));

describe('versioning actions', () => {
  describe('setVersionings', () => {
    it('test setVersionings action sets versionings correctly', () => {
      const payload = [{ id: 1 }];
      const action = setVersionings(payload);
      expect(action).toHaveProperty('type', SET_VERSIONINGS);
      expect(action).toHaveProperty('payload');
      expect(action).toHaveProperty('payload.versionings', payload);
    });

    it('sets a selected versioning type', () => {
      const action = setSelectedVersioningType('contents');
      expect(action).toHaveProperty('type', SET_SELECTED_VERSIONING_TYPE);
      expect(action).toHaveProperty('payload', 'contents');
    });

    it('sets single content details', () => {
      const content = { id: 'ART1' };
      const action = setDetailedContentVersion(content);
      expect(action).toHaveProperty('type', SET_SINGLE_CONTENT_VERSION_DETAILS);
      expect(action).toHaveProperty('payload', content);
    });

    it('sets resource versioning list', () => {
      const payload = [{ id: 1 }];
      const action = setResourceVersionings(payload);
      expect(action).toHaveProperty('type', SET_RESOURCE_VERSIONINGS);
      expect(action).toHaveProperty('payload.versionings', payload);
    });

    it('sets versioning config', () => {
      const payload = [{ midVersion: true }];
      const action = setVersioningConfig(payload);
      expect(action).toHaveProperty('type', SET_VERSIONING_CONFIG);
      expect(action).toHaveProperty('payload', payload);
    });
  });

  describe('fetchVersionings', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          list: [],
          map: {},
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      getVersionings.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(fetchVersionings())
        .then(() => {
          expect(getVersionings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_VERSIONINGS);
          expect(actions[2]).toHaveProperty('type', SET_PAGE);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getVersionings.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchVersionings())
        .then(() => {
          expect(getVersionings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_VERSIONINGS);
          expect(actions[2]).toHaveProperty('type', ADD_ERRORS);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('removeVersion', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          list: [],
          map: {},
        },
        pagination: {
          global: {
            page: 1,
            pageSize: 10,
          },
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      deleteVersion.mockImplementationOnce(mockApi({ payload: [] }));
      getSingleVersioning.mockImplementationOnce(mockApi({ payload: [] }));

      store
        .dispatch(removeContentVersion())
        .then(() => {
          expect(deleteVersion).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(getSingleVersioning).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      deleteVersion.mockImplementationOnce(mockApi({ errors: true }));

      store
        .dispatch(removeContentVersion())
        .then(() => {
          expect(deleteVersion).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchSingleVersioningHistory', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          list: [],
          map: {},
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      getSingleVersioning.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(fetchSingleVersioningHistory())
        .then(() => {
          expect(getSingleVersioning).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_VERSIONINGS);
          expect(actions[2]).toHaveProperty('type', SET_PAGE);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getSingleVersioning.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchSingleVersioningHistory())
        .then(() => {
          expect(getSingleVersioning).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_VERSIONINGS);
          expect(actions[2]).toHaveProperty('type', ADD_ERRORS);
          done();
        })
        .catch(done.fail);
    });
  });


  describe('recoverContentVersion', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        pagination: {
          global: {
            page: 1,
            pageSize: 10,
          },
        },
        versioning: {
          list: [],
          map: {},
        },
      });
    });

    afterEach(() => jest.clearAllMocks());

    const MOCK_CONTENT_ID = 'content_id';
    const MOCK_VERSION = 'version';

    it('should dispatch correct actions when api call returns errors', (done) => {
      postRecoverContentVersion.mockImplementationOnce(mockApi({ errors: true }));
      getVersionings.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(recoverContentVersion(MOCK_CONTENT_ID, MOCK_VERSION))
        .then(() => {
          expect(postRecoverContentVersion).toHaveBeenCalledTimes(1);
          expect(postRecoverContentVersion).toHaveBeenCalledWith(MOCK_CONTENT_ID, MOCK_VERSION);
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchContentDetails', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          list: [],
          map: {},
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      getContentDetails.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(fetchContentDetails('ART1', 1))
        .then(() => {
          expect(getContentDetails).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_SINGLE_CONTENT_VERSION_DETAILS);
          expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getContentDetails.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchContentDetails('ART1', 1))
        .then(() => {
          expect(getContentDetails).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
          done();
        })
        .catch(done.fail);
    });
  });

  describe('sendRemoveResource', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          list: [],
          resourceList: [],
          map: {},
          resourceMap: {},
        },
        pagination: {
          global: {
            page: 1,
            pageSize: 10,
          },
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      deleteResource.mockImplementationOnce(mockApi({ payload: [] }));
      getResourceVersionings.mockImplementationOnce(mockApi({ payload: [] }));

      store
        .dispatch(sendRemoveResource())
        .then(() => {
          expect(deleteResource).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(1);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(getResourceVersionings).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      deleteResource.mockImplementationOnce(mockApi({ errors: true }));

      store
        .dispatch(sendRemoveResource())
        .then(() => {
          expect(deleteResource).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchResourceVersionings', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          list: [],
          resourceList: [],
          map: {},
          resourceMap: {},
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      getResourceVersionings.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(fetchResourceVersionings())
        .then(() => {
          expect(getResourceVersionings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_RESOURCE_VERSIONINGS);
          expect(actions[2]).toHaveProperty('type', SET_PAGE);
          expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getResourceVersionings.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchResourceVersionings())
        .then(() => {
          expect(getResourceVersionings).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_RESOURCE_VERSIONINGS);
          expect(actions[2]).toHaveProperty('type', ADD_ERRORS);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('fetchVersioningConfig', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          versioningConfig: {},
        },
      });
    });

    it('should dispatch correct actions when api call is successful', (done) => {
      getVersioningConfig.mockImplementationOnce(mockApi({
        payload: {
          contentsToIgnore: ['A', 'B'],
          contentTypesToIgnore: ['BB'],
        },
      }));
      store
        .dispatch(fetchVersioningConfig())
        .then(() => {
          expect(getVersioningConfig).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(4);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', SET_VERSIONING_CONFIG);
          expect(actions[1]).toHaveProperty('payload', { contentsToIgnore: 'A, B', contentTypesToIgnore: 'BB' });
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      getVersioningConfig.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(fetchVersioningConfig())
        .then(() => {
          expect(getVersioningConfig).toHaveBeenCalled();
          const actions = store.getActions();
          expect(actions).toHaveLength(5);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('sendPutVersioningConfig', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          versioningConfig: {},
        },
      });
    });

    const body = {
      contentsToIgnore: 'A, B',
      contentTypesToIgnore: 'BB',
    };

    const bodyParsed = {
      contentsToIgnore: ['A', 'B'],
      contentTypesToIgnore: ['BB'],
    };

    it('should dispatch correct actions when api call is successful', (done) => {
      putVersioningConfig.mockImplementationOnce(mockApi({ payload: { success: true } }));
      store
        .dispatch(sendPutVersioningConfig(body))
        .then(() => {
          expect(putVersioningConfig).toHaveBeenCalledWith(bodyParsed);
          const actions = store.getActions();
          expect(actions).toHaveLength(2);
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      putVersioningConfig.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(sendPutVersioningConfig(body))
        .then(() => {
          expect(putVersioningConfig).toHaveBeenCalledWith(bodyParsed);
          const actions = store.getActions();
          expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
          expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
          expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
          done();
        })
        .catch(done.fail);
    });
  });

  describe('sendRecoverResource', () => {
    let store;
    beforeEach(() => {
      store = createMockStore({
        versioning: {
          selected: 'image',
        },
      });
    });

    const resourceId = 1;

    it('should dispatch correct actions when api call is successful', (done) => {
      recoverResource.mockImplementationOnce(mockApi({ payload: { success: true } }));
      getResourceVersionings.mockImplementationOnce(mockApi({ payload: [] }));
      store
        .dispatch(sendRecoverResource(resourceId))
        .then(() => {
          expect(recoverResource).toHaveBeenCalledWith(resourceId);
          expect(getResourceVersionings).toHaveBeenCalled();
          done();
        })
        .catch(done.fail);
    });

    it('should dispatch correct actions when api call returns errors', (done) => {
      recoverResource.mockImplementationOnce(mockApi({ errors: true }));
      store
        .dispatch(sendRecoverResource(resourceId))
        .then(() => {
          expect(recoverResource).toHaveBeenCalledWith(resourceId);
          const actions = store.getActions();
          expect(actions).toHaveLength(3);
          expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
          done();
        })
        .catch(done.fail);
    });
  });
});
