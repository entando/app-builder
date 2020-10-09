import {
  SET_APP_TOUR_PROGRESS, SET_APP_TOUR_LAST_STEP,
  CLEAR_APP_TOUR_PROGRESS, SET_TOUR_CREATED_PAGE,
  SET_PUBLISH_STATUS,
} from 'state/app-tour/types';

export const setAppTourProgress = progressStatus => ({
  type: SET_APP_TOUR_PROGRESS,
  payload: progressStatus,
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
