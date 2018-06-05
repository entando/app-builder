import { initialize } from 'redux-form';
import { gotoRoute } from '@entando/router';
import { formattedText } from '@entando/utils';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';


import {
  getFragment,
  getFragments,
  getPlugins,
  getFragmentSettings,
  putFragmentSettings,
  deleteFragment,
  postFragment,
  putFragment,
} from 'api/fragments';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';
import { SET_SELECTED, SET_PLUGINS, SET_FRAGMENTS, REMOVE_FRAGMENT } from 'state/fragments/types';

export const setSelectedFragment = fragment => ({
  type: SET_SELECTED,
  payload: {
    fragment,
  },
});

export const setFragments = fragments => ({
  type: SET_FRAGMENTS,
  payload: {
    fragments,
  },
});

export const setPlugins = plugins => ({
  type: SET_PLUGINS,
  payload: {
    plugins,
  },
});

export const removeFragment = fragmentCode => ({
  type: REMOVE_FRAGMENT,
  payload: {
    fragmentCode,
  },
});

// thunks
export const fetchFragment = fragmentCode => dispatch =>
  new Promise((resolve) => {
    getFragment(fragmentCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(initialize('fragment', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });


export const fetchFragmentDetail = fragmentCode => dispatch => (
  new Promise((resolve) => {
    getFragment(fragmentCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedFragment(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const fetchFragments = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('fragments'));
    getFragments(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setFragments(data.payload));
          dispatch(toggleLoading('fragments'));
          dispatch(setPage(data.metaData));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('fragments'));
        }
        resolve();
      });
    });
  })
);

export const fetchPlugins = () => dispatch => (
  getPlugins().then((response) => {
    dispatch(setPlugins(response.payload));
  })
);

export const fetchFragmentSettings = () => dispatch =>
  new Promise((resolve) => {
    getFragmentSettings().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(initialize('fragmentSettings', json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const updateFragmentSettings = settings => dispatch =>
  new Promise((resolve) => {
    putFragmentSettings(settings).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(initialize('fragmentSettings', json.payload));
          dispatch(addToast(
            formattedText('fragment.settings.alert.success'),
            TOAST_SUCCESS,
          ));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(
            formattedText('fragment.settings.alert.error'),
            TOAST_ERROR,
          ));
        }
        resolve();
      });
    });
  });

export const sendDeleteFragment = fragmentCode => dispatch =>
  new Promise((resolve) => {
    deleteFragment(fragmentCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(removeFragment(fragmentCode));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });

export const sendPostFragment = fragment => async (dispatch) => {
  const response = await postFragment(fragment);
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      gotoRoute(ROUTE_FRAGMENT_LIST);
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};

export const sendPutFragment = fragment => async (dispatch) => {
  const response = await putFragment(fragment);
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      gotoRoute(ROUTE_FRAGMENT_LIST);
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};
