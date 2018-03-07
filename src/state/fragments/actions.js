import { initialize } from 'redux-form';
import { SET_SELECTED, SET_WIDGET_TYPES, SET_PLUGINS } from 'state/fragments/types';
import { getFragment, getWidgetTypes, getPlugins } from 'api/fragment';

export const setSelectedFragment = fragment => ({
  type: SET_SELECTED,
  payload: {
    fragment,
  },
});

export const setWidgetTypes = widgetTypes => ({
  type: SET_WIDGET_TYPES,
  payload: {
    widgetTypes,
  },
});

export const setPlugin = plugins => ({
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

export const fetchWidgetTypes = () => dispatch => (
  getWidgetTypes().then((response) => {
    dispatch(setWidgetTypes(response));
  })
);

export const fetchPlugins = () => dispatch => (
  getPlugins().then((response) => {
    dispatch(setPlugin(response));
  })
);
