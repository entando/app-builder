import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { getUserProfile, putUserProfile, getMyUserProfile, putMyUserProfile } from 'api/userProfile';
import { SET_USER_PROFILE } from 'state/user-profile/types';
import { fetchProfileType, fetchMyProfileType } from 'state/profile-types/actions';
import { getPayloadForApi } from 'helpers/entities';
import { getSelectedProfileTypeAttributes } from 'state/profile-types/selectors';
import { getDefaultLanguage, getActiveLanguages } from 'state/languages/selectors';

import { history, ROUTE_USER_LIST } from 'app-init/router';

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: {
    profile,
  },
});

export const fetchUserProfile = username => dispatch => new Promise((resolve) => {
  getUserProfile(username).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserProfile(json.payload));
        dispatch(fetchProfileType(json.payload.typeCode)).then(() => {
          resolve();
        });
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        resolve();
      }
    });
  });
});

export const updateUserProfile = (profile, successRedirect = true) =>
  (dispatch, getState) => new Promise((resolve) => {
    const selectedProfile = getSelectedProfileTypeAttributes(getState());
    putUserProfile(profile.id, getPayloadForApi(
      profile,
      selectedProfile,
      getDefaultLanguage(getState()),
      getActiveLanguages(getState()),
    )).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setUserProfile(json.payload));
          dispatch(addToast(
            { id: 'userprofile.edit.success' },
            TOAST_SUCCESS,
          ));
          if (successRedirect) {
            history.push(ROUTE_USER_LIST);
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        }
        resolve();
      });
    });
  });


export const fetchMyUserProfile = () => dispatch => new Promise((resolve) => {
  getMyUserProfile().then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserProfile(json.payload));
        dispatch(fetchMyProfileType(json.payload.typeCode)).then(() => {
          resolve();
        });
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        resolve();
      }
    });
  });
});

export const updateMyUserProfile = (profile, successRedirect = true) =>
  (dispatch, getState) => new Promise((resolve) => {
    const selectedProfile = getSelectedProfileTypeAttributes(getState());
    putMyUserProfile(profile.id, getPayloadForApi(
      profile,
      selectedProfile,
      getDefaultLanguage(getState()),
      getActiveLanguages(getState()),
    )).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setUserProfile(json.payload));
          dispatch(addToast(
            { id: 'userprofile.edit.success' },
            TOAST_SUCCESS,
          ));
          if (successRedirect) {
            history.push(ROUTE_USER_LIST);
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        }
        resolve();
      });
    });
  });
