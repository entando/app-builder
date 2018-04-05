import { initialize } from 'redux-form';

import { getFragment, getFragments, getWidgetTypes, getPlugins, putFragmentSettings } from 'api/fragments';
import { SET_SELECTED, SET_WIDGET_TYPES, SET_PLUGINS, SET_FRAGMENTS } from 'state/fragments/types';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';

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

export const setWidgetTypes = widgetTypes => ({
  type: SET_WIDGET_TYPES,
  payload: {
    widgetTypes,
  },
});

export const setPlugins = plugins => ({
  type: SET_PLUGINS,
  payload: {
    plugins,
  },
});

// thunks
export const fetchFragment = fragmentCode => dispatch => (
  getFragment(fragmentCode).then((response) => {
    dispatch(initialize('fragment', response.payload));
  })
);

export const fetchFragmentDetail = fragmentCode => dispatch => (
  getFragment(fragmentCode).then((response) => {
    dispatch(setSelectedFragment(response.payload));
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
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('fragments'));
          resolve();
        }
      });
    });
  })
);

export const fetchWidgetTypes = () => dispatch => (
  getWidgetTypes().then((response) => {
    dispatch(setWidgetTypes(response.payload));
  })
);

export const fetchPlugins = () => dispatch => (
  getPlugins().then((response) => {
    dispatch(setPlugins(response.payload));
  })
);

export const updateFragmentSettings = settings => dispatch =>
  new Promise((resolve) => {
    putFragmentSettings(settings).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(initialize('fragmentSettings', response.payload));
        } else if (json && json.errors) {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  });
