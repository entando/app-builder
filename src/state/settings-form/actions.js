import { getPageSettingsListAPI } from 'api/pageSettings';
import { initialize } from 'redux-form';

// thunks
// eslint-disable-next-line


export const mapItem = param => (
  param.reduce((acc, item) => { acc[item.name] = item.value; return acc; }, {})
);

export const fetchPageSettings = () => dispatch => (
  getPageSettingsListAPI().then((response) => {
    dispatch(initialize('settings', mapItem(response.payload.param)));
  })
);
