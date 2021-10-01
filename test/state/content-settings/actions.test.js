import { createMockStore, mockApi } from 'test/testUtils';
import {
  setContentSettings,
  setEditorSettings,
  setMetadataMapping,
  fetchContentSettings,
  sendPostReloadReferences,
  sendPostReloadIndexes,
  sendPutEditorSettings,
  addCropRatio,
  removeCropRatio,
  updateCropRatio,
  sendPostMetadataMap,
  sendPutMetadataMap,
  checkAndPutMetadataMap,
  sendDeleteMetadataMap,
  wait,
} from 'state/content-settings/actions';
import {
  SET_CONTENT_SETTINGS,
  SET_EDITOR_SETTINGS,
  SET_CROP_RATIOS,
  SET_METADATA_MAPPING,
} from 'state/content-settings/types';
import * as selectors from 'state/content-settings/selectors';
import { TOGGLE_LOADING } from 'state/loading/types';
import { CONTENT_SETTINGS_OK } from 'test/mocks/contentSettings';

import {
  getContentSettings,
  postReloadReferences,
  postReloadIndexes,
  putEditorSettings,
  postCropRatio,
  deleteCropRatio,
  putCropRatio,
  postMetadataMap,
  putMetadataMap,
  deleteMetadataMap,
} from 'api/contentSettings';

const contSettings = CONTENT_SETTINGS_OK;

const CONTMODEL_SET_PARAMS = {
  type: SET_CONTENT_SETTINGS,
  payload: contSettings,
};

jest.mock('api/contentSettings', () => ({
  getContentSettings: jest.fn(mockApi({
    payload: {
      indexesLastReload: {
        date: 1569393692905,
        result: 1,
      },
      indexesStatus: 0,
      referencesStatus: 0,
      metadata: {
        legend: [],
        alt: [],
        description: [],
        title: [],
      },
      cropRatios: ['4:9'],
      editor: {
        label: 'CKEditor',
        key: 'fckeditor',
      },
    },
  })),
  postReloadReferences: jest.fn(mockApi({ payload: '' })),
  postReloadIndexes: jest.fn(mockApi({ payload: '' })),
  putEditorSettings: jest.fn(key => mockApi({ payload: key })()),
  postCropRatio: jest.fn(mockApi({})),
  deleteCropRatio: jest.fn(mockApi({})),
  putCropRatio: jest.fn(mockApi({})),
  postMetadataMap: jest.fn(({ key, mapping }) => mockApi({
    payload: {
      [key]: mapping,
      legend: [],
      alt: [],
      description: [],
      title: [],
    },
  })()),
  putMetadataMap: jest.fn((key, mapping) => mockApi({
    payload: {
      [key]: mapping,
      alt: [],
      description: [],
      title: [],
    },
  })()),
  deleteMetadataMap: jest.fn(() => mockApi({
    payload: {
      legend: [],
      alt: [],
      description: [],
      title: [],
    },
  })()),
}));

// eslint-disable-next-line no-import-assign
selectors.getCropRatios = jest.fn();

it('test setContentSettings action', () => {
  expect(setContentSettings(contSettings)).toEqual(CONTMODEL_SET_PARAMS);
});

it('test setEditorSettings action', () => {
  const payload = { key: 'ao' };
  expect(setEditorSettings(payload)).toEqual({
    type: SET_EDITOR_SETTINGS,
    payload,
  });
});

it('test setMetadataMapping action', () => {
  const payload = { key: 'oa' };
  expect(setMetadataMapping(payload)).toEqual({
    type: SET_METADATA_MAPPING,
    payload,
  });
});

it('test wait function', () => {
  expect(wait(2000)).toBeInstanceOf(Promise);
});

describe('contentSettings thunks', () => {
  let store;
  beforeEach(() => {
    store = createMockStore({
      loading: { legend: '' },
      apps: {
        cms: {
          contentSettings: {
            metadata: {},
          },
        },
      },
    });
  });
  it('fetchContentSettings', (done) => {
    store
      .dispatch(fetchContentSettings())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[0].payload.id).toEqual('getSettings');
        expect(actions[1]).toHaveProperty('type', SET_CONTENT_SETTINGS);
        expect(actions[1]).toHaveProperty('payload');
        expect(actions[1].payload).toEqual(contSettings);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2].payload.id).toEqual('getSettings');
        done();
      })
      .catch(done.fail);
  });

  it('fetchContentSettings error', (done) => {
    getContentSettings.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(fetchContentSettings())
      .then(() => {
        expect(getContentSettings).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', 'errors/clear-errors');
        expect(actions[3]).toHaveProperty('type', 'toasts/add-toast');
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostReloadReferences', (done) => {
    store
      .dispatch(sendPostReloadReferences())
      .then(() => {
        expect(postReloadReferences).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(2);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostReloadReferences error', (done) => {
    postReloadReferences.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(sendPostReloadReferences())
      .then(() => {
        expect(postReloadReferences).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', 'errors/clear-errors');
        expect(actions[3]).toHaveProperty('type', 'toasts/add-toast');
        expect(actions[4]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostReloadIndexes', (done) => {
    store
      .dispatch(sendPostReloadIndexes())
      .then(() => {
        expect(postReloadIndexes).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1].payload.id).toEqual('reloadIndexes');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2].payload.id).toEqual('getSettingsPoll');
        done();
      })
      .catch(done.fail);
  });

  it('sendPostReloadIndexes with un-finished status', (done) => {
    getContentSettings.mockImplementationOnce(mockApi({ payload: { indexesStatus: 1 } }));
    store
      .dispatch(sendPostReloadIndexes())
      .then(() => {
        expect(postReloadIndexes).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1].payload.id).toEqual('reloadIndexes');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2].payload.id).toEqual('getSettingsPoll');
        done();
      })
      .catch(done.fail);
  });

  it('sendPostReloadIndexes error', (done) => {
    postReloadIndexes.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(sendPostReloadIndexes())
      .then(() => {
        expect(postReloadIndexes).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions).toHaveLength(5);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[3]).toHaveProperty('type', 'errors/clear-errors');
        expect(actions[4]).toHaveProperty('type', 'toasts/add-toast');
        done();
      })
      .catch(done.fail);
  });

  it('sendPutEditorSettings', (done) => {
    const tosend = { key: 'yatch' };
    store
      .dispatch(sendPutEditorSettings(tosend))
      .then((res) => {
        expect(putEditorSettings).toHaveBeenCalledWith(tosend);
        expect(res).toHaveProperty('payload', tosend);
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_EDITOR_SETTINGS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPutEditorSettings error', (done) => {
    putEditorSettings.mockImplementationOnce(mockApi({ errors: true }));
    const tosend = { key: 'yatch' };
    store
      .dispatch(sendPutEditorSettings(tosend))
      .then((res) => {
        expect(putEditorSettings).toHaveBeenCalledWith(tosend);
        expect(res).toEqual(undefined);
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('addCropRatio', (done) => {
    const cropRatio = '4:9';
    store
      .dispatch(addCropRatio(cropRatio))
      .then(() => {
        expect(postCropRatio).toHaveBeenCalledWith(cropRatio);
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_CROP_RATIOS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostMetadataMap', (done) => {
    store
      .dispatch(sendPostMetadataMap('key', 1))
      .then(() => {
        expect(postMetadataMap).toHaveBeenCalledWith({ key: 'key', mapping: 1 });
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_METADATA_MAPPING);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2].payload.id).toEqual('postMetadataMap');
        done();
      })
      .catch(done.fail);
  });

  it('addCropRatio error', (done) => {
    postCropRatio.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(addCropRatio())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', 'toasts/add-toast');
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPostMetadataMap error', (done) => {
    postMetadataMap.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(sendPostMetadataMap('key', 2))
      .then(() => {
        expect(postMetadataMap).toHaveBeenCalledWith({ key: 'key', mapping: 2 });
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[0].payload.id).toEqual('postMetadataMap');
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPutMetadataMap', (done) => {
    const key = 'key';
    const mapping = 1;
    store
      .dispatch(sendPutMetadataMap(key, mapping))
      .then(() => {
        expect(putMetadataMap).toHaveBeenCalledWith(key, mapping);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', SET_METADATA_MAPPING);
        done();
      })
      .catch(done.fail);
  });

  it('sendPutMetadataMap error', (done) => {
    const key = 'key';
    const mapping = 2;
    putMetadataMap.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(sendPutMetadataMap(key, mapping))
      .then(() => {
        expect(putMetadataMap).toHaveBeenCalledWith(key, mapping);
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0]).toHaveProperty('type', 'errors/add-errors');
        done();
      })
      .catch(done.fail);
  });

  it('removeCropRatio', (done) => {
    selectors.getCropRatios.mockImplementation(() => ['4:9', '16:9']);
    const cropRatio = '4:9';
    store
      .dispatch(removeCropRatio(cropRatio))
      .then(() => {
        expect(deleteCropRatio).toHaveBeenCalledWith(cropRatio);
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_CROP_RATIOS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('checkAndPutMetadataMap', (done) => {
    const values = { legend: 'awt, two' };
    store
      .dispatch(checkAndPutMetadataMap(values))
      .then(() => {
        expect(putMetadataMap).toHaveBeenCalledWith('legend', 'awt, two');
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_METADATA_MAPPING);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2].payload.id).toEqual('legend');
        done();
      })
      .catch(done.fail);
  });

  it('removeCropRatio error', (done) => {
    deleteCropRatio.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(removeCropRatio())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', 'toasts/add-toast');
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('checkAndPutMetadataMap error', (done) => {
    const values = { legend: 'awt, three' };
    putMetadataMap.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(checkAndPutMetadataMap(values))
      .then(() => {
        expect(putMetadataMap).toHaveBeenCalledWith('legend', 'awt, three');
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('updateCropRatio', (done) => {
    const cropRatio = '4:9';
    const newValue = '5:3';
    store
      .dispatch(updateCropRatio(cropRatio, newValue))
      .then(() => {
        expect(putCropRatio).toHaveBeenCalledWith(cropRatio, newValue);
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_CROP_RATIOS);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendDeleteMetadataMap', (done) => {
    store
      .dispatch(sendDeleteMetadataMap('key'))
      .then(() => {
        expect(deleteMetadataMap).toHaveBeenCalledWith('key');
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', SET_METADATA_MAPPING);
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[2].payload.id).toEqual('deleteMetadataMap');
        done();
      })
      .catch(done.fail);
  });

  it('updateCropRatio error', (done) => {
    putCropRatio.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(updateCropRatio())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toHaveLength(4);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', 'toasts/add-toast');
        expect(actions[3]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });

  it('sendDeleteMetadataMap error', (done) => {
    deleteMetadataMap.mockImplementationOnce(mockApi({ errors: true }));
    store
      .dispatch(sendDeleteMetadataMap('key'))
      .then(() => {
        expect(deleteMetadataMap).toHaveBeenCalledWith('key');
        const actions = store.getActions();
        expect(actions).toHaveLength(3);
        expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
        expect(actions[0].payload.id).toEqual('deleteMetadataMap');
        expect(actions[1]).toHaveProperty('type', 'errors/add-errors');
        expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
        done();
      })
      .catch(done.fail);
  });
});
