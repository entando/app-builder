import { addErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { toggleLoading } from 'state/loading/actions';
import { getPlugins, getPlugin, putPluginConfig } from 'api/plugins';
import { setPlugins, setSelectedPlugin } from 'state/plugins/actions';
import { getPluginMap, getPluginIdByParams } from 'state/plugins/selectors';

export const fetchPlugins = (params = '') => dispatch => (
  new Promise((resolve) => {
    const feature = 'plugins';
    dispatch(toggleLoading(feature));
    getPlugins(params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPlugins(data.payload));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        dispatch(toggleLoading(feature));
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchPlugin = id => dispatch => (
  new Promise((resolve) => {
    getPlugin(id).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedPlugin(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchSelectedPluginIfNotCached = () => (dispatch, getState) => {
  const state = getState();
  const id = getPluginIdByParams(state);
  return new Promise((resolve) => {
    const pluginMap = getPluginMap(state);
    const plugin = pluginMap[id];
    if (!plugin) {
      dispatch(fetchPlugin(id));
    } else {
      setSelectedPlugin(plugin);
      resolve();
    }
  });
};

export const savePluginConfig = plugin => dispatch => (
  putPluginConfig(plugin).then(() => {
    dispatch(addToast(
      'Configuration successfully saved',
      TOAST_SUCCESS,
    ));
  }).catch(() => {})
);
