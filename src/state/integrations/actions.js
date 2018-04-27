import { SET_APIS, SET_PLUGINS } from 'state/integrations/types';
import { getIntegration } from 'api/dashboard';
import { addErrors } from 'state/errors/actions';

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

// thunks

export const fetchIntegration = () => dispatch => new Promise((resolve) => {
  getIntegration().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setApis(json.payload.apis));
        dispatch(setPlugins(json.payload.components));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
      }
      resolve();
    });
  });
});
