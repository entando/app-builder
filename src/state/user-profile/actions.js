import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { initialize } from 'redux-form';

import {
  getUserProfile, putUserProfile, getUserProfilePicture,
  deleteUserProfilePicture, postUserProfilePicture,
} from 'api/userProfile';
import { toggleLoading } from 'state/loading/actions';
import { SET_USER_PROFILE, SET_USER_PROFILE_PICTURE } from 'state/user-profile/types';
import { fetchProfileType } from 'state/profile-types/actions';
import { getPayloadForForm, getPayloadForApi } from 'helpers/entities';
import { getSelectedProfileTypeAttributes } from 'state/profile-types/selectors';
import { getDefaultLanguage, getActiveLanguages } from 'state/languages/selectors';

import { history, ROUTE_USER_LIST } from 'app-init/router';

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: {
    profile,
  },
});

export const setUserProfilePicture = versions => ({
  type: SET_USER_PROFILE_PICTURE,
  payload: {
    versions,
  },
});

export const fetchProfilePicture = username => dispatch =>
  new Promise((resolve) => {
    getUserProfilePicture(username).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          if (json.payload) {
            dispatch(setUserProfilePicture(json.payload.versions));
          }
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          dispatch(addToast(json.errors[0].message, TOAST_ERROR));
        }
        resolve();
      });
    });
  });

export const deleteProfilePicture = username => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('myProfilePicture'));
  deleteUserProfilePicture(username).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserProfilePicture(null));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
      }
      dispatch(toggleLoading('myProfilePicture'));
      resolve();
    });
  });
});

export const uploadProfilePicture = (username, picture) => dispatch =>
  new Promise((resolve) => {
    const formData = new FormData();
    formData.append('file', picture[0]);

    dispatch(toggleLoading('myProfilePicture'));

    postUserProfilePicture(username, formData)
      .then(response =>
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setUserProfilePicture(json.payload.versions));
          } else {
            dispatch(addToast(json.errors[0].message, TOAST_ERROR));
          }
        }))
      .catch(response =>
        dispatch(addToast(response.details[0].message, TOAST_ERROR)))
      .finally(() => {
        dispatch(toggleLoading('myProfilePicture'));
        resolve();
      });
  });

export const fetchUserProfile = username => (dispatch, getState) => new Promise((resolve) => {
  getUserProfile(username).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserProfile(json.payload));
        dispatch(fetchProfileType(json.payload.typeCode)).then(() => {
          const state = getState();
          dispatch(initialize('UserProfile', getPayloadForForm(
            username, json.payload,
            getSelectedProfileTypeAttributes(state),
            getDefaultLanguage(state),
            getActiveLanguages(state),
          )));
          dispatch(fetchProfilePicture(username)).then(resolve);
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
