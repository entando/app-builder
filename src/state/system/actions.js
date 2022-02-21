import { addToast, TOAST_ERROR } from '@entando/messages';

import { SET_SYSTEM_REPORT } from 'state/system/types';
import { getSystemReport } from 'api/system';

export const setSystemReport = systemReport => ({
  type: SET_SYSTEM_REPORT,
  payload: systemReport,
});

export const fetchSystemReport = () => async (dispatch) => {
  try {
    const response = await getSystemReport();
    const json = await response.json();
    if (response.ok) {
      dispatch(setSystemReport(json.payload));
    } else {
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing...
  }
};
