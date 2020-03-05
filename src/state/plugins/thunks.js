import { getDomain } from '@entando/apimanager';
import { addToast, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';
import { getPlugins, getPlugin, putPluginConfig } from 'api/plugins';
import { setPlugins, setSelectedPlugin } from 'state/plugins/actions';
import { getPluginMap } from 'state/plugins/selectors';

const serverErrorMessageId = 'app.serverError';

const getErrorMessage = (obj) => {
  if (!obj) {
    return serverErrorMessageId;
  }
  if (typeof obj === 'string') {
    return obj;
  }
  if (Array.isArray(obj.errors) && obj.errors.length) {
    return obj.errors.join('\n');
  }
  if (obj.message) {
    return obj.message;
  }
  return obj.defaultMessage;
};

const handleError = error => (dispatch, getState) => {
  const domain = getDomain(getState());
  const errorMessage = getErrorMessage(error);
  const values = errorMessage === serverErrorMessageId ? { domain } : null;
  dispatch(addToast(
    { id: error.message, values },
    TOAST_ERROR,
  ));
};

export const fetchPlugins = (params = '') => dispatch => (
  new Promise((resolve) => {
    const feature = 'plugins';
    dispatch(toggleLoading(feature));

    getPlugins(params).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setPlugins(json.payload));
        } else {
          dispatch(handleError(json.errors));
        }
        dispatch(toggleLoading(feature));
        resolve();
      });
    }).catch((error) => {
      dispatch(handleError(error));
      dispatch(toggleLoading(feature));
    });
  })
);

const fetchPlugin = id => dispatch => (
  new Promise((resolve) => {
    getPlugin(id).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedPlugin(json.payload));
        } else {
          dispatch(handleError(json.errors));
        }
        resolve();
      });
    }).catch((error) => {
      dispatch(handleError(error));
    });
  })
);

export const getOrFetchPlugin = id => (dispatch, getState) => {
  const state = getState();
  return new Promise((resolve) => {
    const pluginMap = getPluginMap(state);
    const plugin = pluginMap[id];
    if (plugin) {
      dispatch(setSelectedPlugin(plugin));
      resolve();
    }
    dispatch(fetchPlugin(id)).then(() => resolve());
  });
};

export const savePluginConfig = plugin => dispatch => (
  new Promise((resolve) => {
    putPluginConfig(plugin).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(addToast(
            'Configuration successfully saved',
            TOAST_SUCCESS,
          ));
        } else {
          dispatch(handleError(json.errors));
        }
        resolve();
      });
    }).catch((error) => {
      dispatch(handleError(error));
    });
  })
);
