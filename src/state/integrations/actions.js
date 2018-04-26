import { SET_APIS, SET_PLUGINS } from 'state/integrations/types';

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
