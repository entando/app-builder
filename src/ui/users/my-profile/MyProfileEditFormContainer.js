import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { getUsername } from '@entando/apimanager';

import { deleteProfilePicture, fetchUserProfile, updateUserProfile, uploadProfilePicture } from 'state/user-profile/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getDefaultLanguage, getActiveLanguages } from 'state/languages/selectors';
import { getSelectedProfileTypeAttributes } from 'state/profile-types/selectors';
import { getLoading } from 'state/loading/selectors';
import MyProfileEditForm from 'ui/users/my-profile/MyProfileEditForm';
import { getPayloadForForm } from 'helpers/entities';
import { getUserProfile, getUserProfilePicture } from 'state/user-profile/selectors';

export const mapStateToProps = state => ({
  username: getUsername(state),
  profileTypesAttributes: getSelectedProfileTypeAttributes(state),
  defaultLanguage: getDefaultLanguage(state),
  languages: getActiveLanguages(state),
  initialValues: getPayloadForForm(
    getUsername(state), getUserProfile(state),
    getSelectedProfileTypeAttributes(state),
    getDefaultLanguage(state),
    getActiveLanguages(state),
  ),
  profilePicture: getUserProfilePicture(state),
  pictureIsLoading: getLoading('myProfilePicture'),
});

export const mapDispatchToProps = dispatch => ({
  onMount: (username) => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchUserProfile(username));
  },
  onSubmit: (userprofile) => {
    dispatch(updateUserProfile(userprofile, false));
  },
  onCancel: () => {
    dispatch(reset('UserProfile'));
  },
  onUploadProfilePicture: (username, picture) => {
    dispatch(uploadProfilePicture(username, picture));
  },
  onDeleteProfilePicture: (username) => {
    dispatch(deleteProfilePicture(username));
  },
});

export default connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(MyProfileEditForm);
