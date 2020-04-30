import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import { SET_APIS, SET_PLUGINS, SET_PAGE_STATUS } from 'state/dashboard/types';
import { getIntegration, getPageStatus } from 'api/dashboard';

export const setApis = apis => ({
  type: SET_APIS,
  payload: {
    apis,
  },
});

export const setPlugins = plugins => ({
  type: SET_PLUGINS,
  payload: {
    plugins,
  },
});

export const setPageStatus = pageStatus => ({
  type: SET_PAGE_STATUS,
  payload: {
    pageStatus,
  },
});

// thunks

export const fetchIntegration = () => dispatch => new Promise((resolve) => {
  getIntegration().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setApis(json.payload.apis));
        dispatch(setPlugins(json.payload.components));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});

export const fetchPageStatus = () => dispatch => new Promise((resolve) => {
  getPageStatus().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setPageStatus(json.payload));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
      resolve();
    });
  }).catch(() => {});
});
