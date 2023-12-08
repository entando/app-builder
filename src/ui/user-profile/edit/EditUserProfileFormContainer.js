import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserProfile } from 'state/user-profile/selectors';
import { fetchLanguages } from 'state/languages/actions';
import { fetchProfileTypes, fetchProfileType, setSelectedProfileType } from 'state/profile-types/actions';
import { fetchUserProfile, updateUserProfile } from 'state/user-profile/actions';
import { getSelectedProfileTypeAttributes, getProfileTypesOptions } from 'state/profile-types/selectors';
import { getDefaultLanguage, getActiveLanguages } from 'state/languages/selectors';
import UserProfileForm from 'ui/user-profile/common/UserProfileForm';
import { getPayloadForForm } from 'helpers/formikEntities';

const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  username: params.username,
  userProfileAttributes: getUserProfile(state).attributes,
  userCurrentProfileType: getUserProfile(state).typeCode,
  profileTypesAttributes: getSelectedProfileTypeAttributes(state),
  defaultLanguage: getDefaultLanguage(state),
  languages: getActiveLanguages(state),
  profileTypes: getProfileTypesOptions(state),
  initialValues: getPayloadForForm(
    params.username, getUserProfile(state),
    getSelectedProfileTypeAttributes(state),
    getDefaultLanguage(state),
    getActiveLanguages(state),
  ),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: ({ username }) => {
    dispatch(fetchProfileTypes({ page: 1, pageSize: 0 }));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
    dispatch(fetchUserProfile(username));
  },
  onSubmit: (userprofile) => {
    if (userprofile.typeCode && userprofile.typeCode.length > 0) {
      dispatch(updateUserProfile(userprofile));
    }
  },
  onProfileTypeChange: (newTypeCode, profileTypes, setFieldValue) => {
    const profileType = profileTypes.filter(profile => profile.value === newTypeCode)[0] || {};
    if (profileType.value && profileType.value.length > 0) {
      dispatch(fetchProfileType(profileType.value)).then(() => {
        setFieldValue('typeCode', profileType.value);
        setFieldValue('typeDescription', profileType.text);
      });
    } else {
      setFieldValue('typeCode', '');
      setFieldValue('typeDescription', '');
      dispatch(setSelectedProfileType({ code: '', attributes: [] }));
    }
  },
});

// eslint-disable-next-line function-paren-newline
const EditUserProfileFormContainer = withRouter(connect(
  mapStateToProps, mapDispatchToProps, null, { pure: false })(UserProfileForm));

EditUserProfileFormContainer.displayName = 'EditUserProfileFormContainer';

export default EditUserProfileFormContainer;
