import { formattedText } from '@entando/utils';
import { addToast, addErrors, TOAST_ERROR, TOAST_SUCCESS } from '@entando/messages';
import { initialize } from 'redux-form';
import { getUserProfile, putUserProfile } from 'api/userProfile';
import { SET_USER_PROFILE } from 'state/user-profile/types';
import { fetchProfileType } from 'state/profile-types/actions';
import { getPayloadForForm, getPayloadForApi } from 'helpers/entities';
import { getSelectedProfileTypeAttributes } from 'state/profile-types/selectors';
import { getDefaultLanguage, getActiveLanguages } from 'state/languages/selectors';

export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: {
    profile,
  },
});

export const fetchUserProfile = username => (dispatch, getState) => new Promise((resolve) => {
  getUserProfile(username).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserProfile(json.payload));
        dispatch(fetchProfileType(json.payload.typeCode)).then(() => {
          dispatch(initialize('UserProfile', getPayloadForForm(
            username, json.payload,
            getSelectedProfileTypeAttributes(getState()),
            getDefaultLanguage(getState()),
            getActiveLanguages(getState()),
          )));
        });
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
      }
      resolve();
    });
  });
});

export const updateUserProfile = profile => (dispatch, getState) => new Promise((resolve) => {
  const selectedProfile = getSelectedProfileTypeAttributes(getState());
  putUserProfile(profile.id, getPayloadForApi(
    profile,
    selectedProfile,
    getDefaultLanguage(getState()),
    getActiveLanguages(getState()),
  )).then((response) => {
    response.json().then((json) => {
      if (response.ok) {
        dispatch(setUserProfile(profile));
        dispatch(addToast(
          formattedText('userprofile.edit.success'),
          TOAST_SUCCESS,
        ));
      } else {
        dispatch(addErrors(json.errors.map(err => err.message)));
        dispatch(addToast(json.errors[0].message, TOAST_ERROR));
      }
      resolve();
    });
  });
});
