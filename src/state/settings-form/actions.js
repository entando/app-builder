import { getPageSettingsListAPI } from 'api/pageSettings';
import { initialize } from 'redux-form';
import { GET_OPTIONS } from './types';

export const getOptions = options => ({
  type: GET_OPTIONS,
  payload: {
    options,
  },
});

// thunks

export const mapItem = param => (
  param.reduce((acc, item) => { acc[item.name] = item.value; return acc; }, {})
);

export const fetchPageSettings = () => dispatch => (
  getPageSettingsListAPI().then((response) => {
    dispatch(initialize('settings', mapItem(response.payload.param)));
  })
);
