import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import { reloadConf } from 'api/reloadConfiguration';
import { SET_STATUS } from 'state/reload-configuration/types';
import { history, ROUTE_RELOAD_CONFIRM } from 'app-init/router';

export const setStatus = status => ({
  type: SET_STATUS,
  payload: {
    status,
  },
});

// thunk
export const sendReloadConf = () => dispatch =>
  new Promise((resolve) => {
    reloadConf().then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setStatus(data.payload));
          history.push(ROUTE_RELOAD_CONFIRM);
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  });
