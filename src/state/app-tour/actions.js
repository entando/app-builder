import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import {
  SET_APP_TOUR_PROGRESS, SET_APP_TOUR_LAST_STEP,
  CLEAR_APP_TOUR_PROGRESS, SET_TOUR_CREATED_PAGE,
  SET_PUBLISH_STATUS, SET_WIZARD_ENABLED,
  SET_EXISTING_PAGES,
} from 'state/app-tour/types';
import { getWizardEnabled } from 'state/app-tour/selectors';
import { getUserPreferences } from 'api/userPreferences';

export const setAppTourProgress = progressStatus => ({
  type: SET_APP_TOUR_PROGRESS,
  payload: progressStatus,
});

export const setExistingPages = pages => ({
  type: SET_EXISTING_PAGES,
  payload: pages,
});

export const setAppTourLastStep = lastStep => ({
  type: SET_APP_TOUR_LAST_STEP,
  payload: lastStep,
});

export const setTourCreatedPage = page => ({
  type: SET_TOUR_CREATED_PAGE,
  payload: page,
});

export const clearAppTourProgress = () => ({
  type: CLEAR_APP_TOUR_PROGRESS,
});

export const setPublishStatus = status => ({
  type: SET_PUBLISH_STATUS,
  payload: status,
});

export const setWizardEnabled = enabled => ({
  type: SET_WIZARD_ENABLED,
  payload: enabled,
});

export const fetchWizardEnabled = username => (dispatch, getState) => (
  new Promise((resolve) => {
    const wizardEnabled = getWizardEnabled(getState());
    if (wizardEnabled !== null && wizardEnabled !== undefined) {
      resolve();
    } else {
      getUserPreferences(username).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setWizardEnabled((json.payload || {}).wizard));
          } else if (json && json.errors) {
            dispatch(addErrors(json.errors.map(err => err.message)));
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          }
          resolve();
        });
      }).catch(() => {});
    }
  })
);
