import { connect } from 'react-redux';
import { reset, change } from 'redux-form';
import { getUsername } from '@entando/apimanager';

import { fetchMyUserProfile, updateMyUserProfile } from 'state/user-profile/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getDefaultLanguage, getActiveLanguages } from 'state/languages/selectors';
import { getSelectedProfileTypeAttributes } from 'state/profile-types/selectors';
import MyProfileEditForm from 'ui/users/my-profile/MyProfileEditForm';
import { getPayloadForForm } from 'helpers/entities';
import { getUserProfile, getUserEmail } from 'state/user-profile/selectors';
import { getUserProfileForm } from 'state/forms/selectors';

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
  userEmail: getUserEmail(state),
  userProfileForm: getUserProfileForm(state),
});

export const mapDispatchToProps = dispatch => ({
  onMount: () => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchMyUserProfile());
  },
  onSubmit: (userprofile) => {
    dispatch(updateMyUserProfile(userprofile, false));
  },
  onCancel: () => {
    dispatch(reset('UserProfile'));
  },
  onChangeProfilePicture: picture => dispatch(change('UserProfile', 'profilepicture', picture)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
  null, { pure: false },
)(MyProfileEditForm);
