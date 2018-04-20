import { initialize } from 'redux-form';

import { getFragment, getFragments, getPlugins, getFragmentSettings, putFragmentSettings, deleteFragment } from 'api/fragments';
import { SET_SELECTED, SET_PLUGINS, SET_FRAGMENTS, REMOVE_FRAGMENT } from 'state/fragments/types';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { addAlert } from 'state/alerts/actions';

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
          dispatch(addAlert('fragmentSettings', 'success'));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addAlert('fragmentSettings', 'error'));
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
