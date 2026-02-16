import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import { reloadConf, getReloadStatus } from 'api/reloadConfiguration';
import { SET_STATUS, SET_RELOAD_INFO, SET_LOADING } from 'state/reload-configuration/types';
import { history, ROUTE_RELOAD_CONFIRM } from 'app-init/router';

const POLLING_INTERVAL = 500; // Poll every 2 seconds

export const setStatus = status => ({
  type: SET_STATUS,
  payload: {
    status,
  },
});

export const setReloadInfo = (percentage, info) => ({
  type: SET_RELOAD_INFO,
  payload: {
    percentage,
    info,
  },
});

export const setLoading = loading => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

// Poll the reload status
const pollReloadStatus = (dispatch) => {
  const poll = () => {
    getReloadStatus().then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          const { status, percentage, info } = data.payload;
          dispatch(setStatus(status));
          dispatch(setReloadInfo(percentage, info));

          // Continue polling if still in progress
          if (status === 'progress') {
            setTimeout(poll, POLLING_INTERVAL);
          } else {
            // Reload complete - stop loading
            dispatch(setLoading(false));
          }
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(setLoading(false));
        }
      });
    }).catch(() => {
      dispatch(setLoading(false));
    });
  };

  // Start polling
  poll();
};

// thunk
export const sendReloadConf = () => dispatch =>
  new Promise((resolve) => {
    // Set initial loading state and status
    dispatch(setLoading(true));
    dispatch(setStatus('progress'));
    dispatch(setReloadInfo(0, null));

    reloadConf().then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          const { status, percentage, info } = data.payload;
          dispatch(setStatus(status));
          dispatch(setReloadInfo(percentage, info));

          // Navigate to confirm page
          history.push(ROUTE_RELOAD_CONFIRM);

          // Always start polling to get the latest status
          // This ensures we show progress even if reload is very fast
          pollReloadStatus(dispatch);

          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          dispatch(setLoading(false));
          resolve();
        }
      });
    }).catch(() => {
      dispatch(setLoading(false));
    });
  });
