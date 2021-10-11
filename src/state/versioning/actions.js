import { addToast, addErrors, TOAST_ERROR, clearErrors } from '@entando/messages';
import { get } from 'lodash';

import {
  getVersionings, getSingleVersioning, getResourceVersionings, deleteResource,
  deleteVersion, getContentDetails, postRecoverContentVersion,
  getVersioningConfig, putVersioningConfig, recoverResource,
} from 'api/versioning';
import { setPage } from 'state/pagination/actions';
import { NAMESPACE_VERSIONING, NAMESPACE_VERSION_HISTORY } from 'state/pagination/const';
import { toggleLoading } from 'state/loading/actions';
import { getCurrentPage, getPageSize } from 'state/pagination/selectors';
import { initialize } from 'redux-form';

import {
  SET_VERSIONINGS, SET_SELECTED_VERSIONING_TYPE,
  SET_SINGLE_CONTENT_VERSION_DETAILS, SET_RESOURCE_VERSIONINGS,
  SET_VERSIONING_CONFIG,
} from 'state/versioning/types';
import { getSelectedVersioningType } from 'state/versioning/selectors';


export const setVersionings = versionings => ({
  type: SET_VERSIONINGS,
  payload: {
    versionings,
  },
});

export const setResourceVersionings = versionings => ({
  type: SET_RESOURCE_VERSIONINGS,
  payload: {
    versionings,
  },
});

export const setSelectedVersioningType = versioningType => ({
  type: SET_SELECTED_VERSIONING_TYPE,
  payload: versioningType,
});

export const setDetailedContentVersion = contentVersion => ({
  type: SET_SINGLE_CONTENT_VERSION_DETAILS,
  payload: contentVersion,
});

export const setVersioningConfig = payload => ({
  type: SET_VERSIONING_CONFIG,
  payload,
});

// thunks
export const fetchVersionings = (page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('versionings'));
    const state = getState();
    const selectedVersioningType = getSelectedVersioningType(state);
    getVersionings(selectedVersioningType, page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setVersionings(json.payload));
          dispatch(setPage(json.metaData, NAMESPACE_VERSIONING));
        } else {
          dispatch(setVersionings([]));
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('versionings'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchResourceVersionings = (page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('versionings'));
    const state = getState();
    const selectedVersioningType = getSelectedVersioningType(state);
    getResourceVersionings(selectedVersioningType, page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setResourceVersionings(json.payload));
          dispatch(setPage(json.metaData, NAMESPACE_VERSIONING));
        } else {
          dispatch(setResourceVersionings([]));
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('versionings'));
        resolve();
      });
    }).catch(() => {
      dispatch(toggleLoading('versionings'));
    });
  })
);

const omitNoContentVersionsError = errors => errors.filter(error => !error.message.match(/a content versions with \w+ code could not be found/i));

export const fetchSingleVersioningHistory = (id, page = { page: 1, pageSize: 10 }, params = '') => (dispatch, getState) => (
  new Promise((resolve) => {
    dispatch(toggleLoading('versionings'));
    const state = getState();
    const selectedVersioningType = getSelectedVersioningType(state);
    getSingleVersioning(selectedVersioningType, id, page, params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setVersionings(json.payload));
          dispatch(setPage(json.metaData, NAMESPACE_VERSION_HISTORY));
        } else {
          dispatch(setVersionings([]));
          const filteredErrors = omitNoContentVersionsError(json.errors);
          dispatch(addErrors(filteredErrors.map(err => err.message)));
          filteredErrors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('versionings'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const removeContentVersion = (contentId, versionId) => (dispatch, getState) => (
  new Promise((resolve) => {
    const state = getState();

    const page = getCurrentPage(state);
    const pageSize = getPageSize(state);

    deleteVersion('contents', contentId, versionId)
      .then(async (response) => {
        const json = await response.json();

        if (response.ok) {
          dispatch(fetchSingleVersioningHistory(contentId, { page, pageSize }));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        resolve();
      })
      .catch(() => {});
  })
);

export const sendRemoveResource = resourceId => (dispatch, getState) => (
  new Promise((resolve) => {
    const state = getState();

    const page = getCurrentPage(state);
    const pageSize = getPageSize(state);
    deleteResource(resourceId)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(fetchResourceVersionings({ page, pageSize }));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
            dispatch(clearErrors());
          }
          resolve();
        });
      })
      .catch(() => {});
  })
);

export const fetchContentDetails = (contentId, versionId) => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('contentVersionDetails'));
    getContentDetails(contentId, versionId).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDetailedContentVersion(json.payload || json));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        dispatch(toggleLoading('contentVersionDetails'));
        resolve();
      });
    }).catch(() => {});
  })
);

export const recoverContentVersion = (id, version) => (dispatch, getState) => (
  new Promise((resolve) => {
    const state = getState();

    const page = getCurrentPage(state);
    const pageSize = getPageSize(state);

    postRecoverContentVersion(id, version)
      .then(async (response) => {
        if (response.ok) {
          dispatch(fetchSingleVersioningHistory(id, { page, pageSize }));
        } else {
          const json = await response.json();
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(clearErrors());
        }
        resolve(response);
      });
  }).catch(() => {})
);

export const fetchVersioningConfig = () => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('versioningConfig'));
  getVersioningConfig()
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          const rawPayload = get(json, 'payload', json);
          const { contentsToIgnore, contentTypesToIgnore } = rawPayload;
          const payload = {
            ...rawPayload,
            contentsToIgnore: contentsToIgnore.join(', '),
            contentTypesToIgnore: contentTypesToIgnore.join(', '),
          };

          dispatch(setVersioningConfig(payload));
          dispatch(initialize('versionConfig', payload));
          resolve(payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
        dispatch(toggleLoading('versioningConfig'));
      });
    })
    .catch(() => {});
});

export const sendPutVersioningConfig = payload => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('versioningConfig'));
  const { contentsToIgnore, contentTypesToIgnore } = payload;
  const params = {
    ...payload,
    contentsToIgnore: contentsToIgnore.split(',').map(c => c.trim()),
    contentTypesToIgnore: contentTypesToIgnore.split(',').map(c => c.trim()),
  };
  putVersioningConfig(params)
    .then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(clearErrors());
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
        dispatch(toggleLoading('versioningConfig'));
      });
    })
    .catch(() => {});
});

export const sendRecoverResource = resourceId => dispatch => (
  new Promise((resolve) => {
    recoverResource(resourceId)
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(fetchResourceVersionings());
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
            dispatch(clearErrors());
          }
          resolve();
        });
      })
      .catch(() => {});
  })
);
