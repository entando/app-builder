import {
  SET_CONTENT_SETTINGS,
  SET_EDITOR_SETTINGS,
  SET_CROP_RATIOS,
  SET_METADATA_MAPPING,
} from 'state/content-settings/types';
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
import { getCropRatios, getMetadataMappingFormData } from 'state/content-settings/selectors';
import { toggleLoading } from 'state/loading/actions';
import {
  addErrors, addToast, clearErrors, TOAST_ERROR,
} from '@entando/messages';

export const setContentSettings = payload => ({
  type: SET_CONTENT_SETTINGS,
  payload,
});

export const setEditorSettings = payload => ({
  type: SET_EDITOR_SETTINGS,
  payload,
});

export const setCropRatios = payload => ({
  type: SET_CROP_RATIOS,
  payload,
});

export const setMetadataMapping = payload => ({
  type: SET_METADATA_MAPPING,
  payload,
});

export const wait = ms => new Promise(r => setTimeout(r, ms));

// thunks

export const fetchContentSettings = (toggleName = 'getSettings') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading(toggleName));
  getContentSettings()
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setContentSettings(json.payload));
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
        dispatch(toggleLoading(toggleName));
      });
    })
    .catch(() => {});
});

export const sendPostReloadReferences = () => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('reloadReferences'));
  postReloadReferences().then((response) => {
    response.json().then((json) => {
      if (!response.ok) {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(clearErrors());
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      dispatch(toggleLoading('reloadReferences'));
      resolve();
    });
  });
});

export const sendPostReloadIndexes = () => dispatch => new Promise(async (resolve) => {
  try {
    dispatch(toggleLoading('reloadIndexes'));
    const response = await postReloadIndexes();
    const json = await response.json();
    dispatch(toggleLoading('reloadIndexes'));
    if (response.ok) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        await wait(200);
        // eslint-disable-next-line no-await-in-loop
        const res = await dispatch(fetchContentSettings('getSettingsPoll'));
        const status = res.indexesStatus;
        if (status !== 1) { resolve(); break; }
      }
    } else {
      dispatch(addErrors(json.errors.map(err => err.message)));
      dispatch(clearErrors());
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
    resolve();
  } catch (error) {
    dispatch(toggleLoading('reloadIndexes'));
    resolve();
  }
});

export const sendPutEditorSettings = editor => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('putEditorSettings'));
  putEditorSettings(editor)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setEditorSettings(json.payload));
          resolve(json);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve();
        }
        dispatch(toggleLoading('putEditorSettings'));
      });
    })
    .catch(() => {});
});

export const addCropRatio = cropRatio => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('addCropRatio'));

  postCropRatio(cropRatio)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setCropRatios(json.payload));
          resolve(json);
        } else {
          const errorMsgs = json.errors.map(err => err.message);
          dispatch(addErrors(errorMsgs));
          errorMsgs.forEach(errMsg => dispatch(addToast(errMsg, TOAST_ERROR)));
          resolve();
        }

        dispatch(toggleLoading('addCropRatio'));
      });
    })
    .catch(() => {});
});

export const sendPostMetadataMap = (key, mapping) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('postMetadataMap'));
  postMetadataMap({ key, mapping })
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setMetadataMapping(json.payload));
          resolve(json);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve();
        }
        dispatch(toggleLoading('postMetadataMap'));
      });
    })
    .catch(() => {});
});

export const removeCropRatio = cropRatio => (dispatch, getState) => new Promise((resolve) => {
  dispatch(toggleLoading('removeCropRatio'));

  deleteCropRatio(cropRatio)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const cropRatios = getCropRatios(getState());
          dispatch(setCropRatios(cropRatios.filter(ratio => ratio !== cropRatio)));
          resolve(json);
        } else {
          const errorMsgs = json.errors.map(err => err.message);
          dispatch(addErrors(errorMsgs));
          errorMsgs.forEach(errMsg => dispatch(addToast(errMsg, TOAST_ERROR)));
          resolve();
        }

        dispatch(toggleLoading('removeCropRatio'));
      });
    })
    .catch(() => {});
});

export const updateCropRatio = (cropRatio, newValue) => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('updateCropRatio'));

  putCropRatio(cropRatio, newValue)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setCropRatios(json.payload));
          resolve(json);
        } else {
          const errorMsgs = json.errors.map(err => err.message);
          dispatch(addErrors(errorMsgs));
          errorMsgs.forEach(errMsg => dispatch(addToast(errMsg, TOAST_ERROR)));
          resolve();
        }

        dispatch(toggleLoading('updateCropRatio'));
      });
    })
    .catch();
});

export const sendPutMetadataMap = (key, mapping) => dispatch => new Promise((resolve) => {
  putMetadataMap(key, mapping)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setMetadataMapping(json.payload));
          resolve({ key, json });
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve({ key });
        }
      });
    })
    .catch(() => {});
});

export const checkAndPutMetadataMap = values => (dispatch, getState) => new Promise((resolve) => {
  const prevValues = getMetadataMappingFormData(getState());
  const proms = [];
  Object.entries(values).forEach(([key, mapping]) => {
    if (prevValues[key] !== mapping) {
      dispatch(toggleLoading(key));
      proms.push(
        dispatch(sendPutMetadataMap(key, mapping)).then((res) => {
          dispatch(toggleLoading(res.key));
          return res.json || null;
        }),
      );
    }
  });
  Promise.all(proms).then(payloads => resolve(payloads));
});

export const sendDeleteMetadataMap = key => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('deleteMetadataMap'));
  deleteMetadataMap(key)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setMetadataMapping(json.payload));
          resolve(json);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve();
        }
        dispatch(toggleLoading('deleteMetadataMap'));
      });
    })
    .catch(() => {});
});
