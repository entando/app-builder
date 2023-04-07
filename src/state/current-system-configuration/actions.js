import { addToast, TOAST_ERROR } from '@entando/messages';

import { getCurrentSystemConfiguration } from 'api/currentSystemConfiguration';
import { SET_CURRENT_SYSTEM_CONFIGURATION } from 'state/current-system-configuration/types';

export const setCurrentSystemConfiguration = currentSystemConfiguration => ({
  type: SET_CURRENT_SYSTEM_CONFIGURATION,
  payload: currentSystemConfiguration,
});

export const fetchCurrentSystemConfiguration = () => async (dispatch) => {
  try {
    const response = await getCurrentSystemConfiguration();
    const json = await response.json();
    if (response.ok) {
      dispatch(setCurrentSystemConfiguration(json.payload));
    } else {
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    if (e && e.message) {
      dispatch(addToast(e.message, TOAST_ERROR));
    }
  }
};
