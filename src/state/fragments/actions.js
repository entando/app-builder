import { initialize } from 'redux-form';

import { getFragment, getFragments, getWidgetTypes, getPlugins } from 'api/fragments';
import { SET_SELECTED, SET_WIDGET_TYPES, SET_PLUGINS, SET_FRAGMENTS } from 'state/fragments/types';
import { setPage } from 'state/pagination/actions';

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

export const fetchFragments = (page = 1, params) => dispatch =>
  getFragments(page, params).then((data) => {
    dispatch(setFragments(data.payload));
    dispatch(setPage(data.metaData));
  });

export const fetchWidgetTypes = () => dispatch => (
  getWidgetTypes().then((response) => {
    dispatch(setWidgetTypes(response));
  })
);

export const fetchPlugins = () => dispatch => (
  getPlugins().then((response) => {
    dispatch(setPlugins(response));
  })
);
