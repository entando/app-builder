import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import { getSMTPServerSettings } from 'api/emailConfig';

// eslint-disable-next-line import/prefer-default-export
export const fetchSMTPServerSettings = () => async (dispatch) => {
  try {
    const response = await getSMTPServerSettings();
    const json = await response.json();
    if (response.ok) {
      const smtpServerSettings = json.payload;
      dispatch(initialize('emailConfig', smtpServerSettings));
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};
