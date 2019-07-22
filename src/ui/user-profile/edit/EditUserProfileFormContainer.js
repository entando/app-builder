import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserProfile } from 'state/user-profile/selectors';
import { fetchUserProfile, updateUserProfile } from 'state/user-profile/actions';
import { getSelectedProfileTypeAttributes } from 'state/profile-types/selectors';
import { fetchLanguages } from 'state/languages/actions';
import UserProfileForm from 'ui/user-profile/common/UserProfileForm';
import { getDefaultLanguage, getActiveLanguages } from 'state/languages/selectors';

const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  username: params.username,
  userProfileAttributes: getUserProfile(state).attributes,
  profileTypesAttributes: getSelectedProfileTypeAttributes(state),
  defaultLanguage: getDefaultLanguage(state),
  languages: getActiveLanguages(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ username }) => {
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchUserProfile(username));
  },
  onSubmit: (userprofile) => {
    dispatch(updateUserProfile(userprofile));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfileForm));
