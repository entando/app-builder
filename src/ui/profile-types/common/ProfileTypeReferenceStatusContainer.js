import { connect } from 'react-redux';
import ProfileTypeReferenceStatus from 'ui/profile-types/common/ProfileTypeReferenceStatus';
import { fetchProfileTypeReferenceStatus, sendPostProfileTypeReferenceStatus } from 'state/profile-types/actions';
import { getProfileTypeReferencesStatus } from 'state/profile-types/selectors';

export const mapStateToProps = (state) => {
  console.log(state.profileTypes);
  return {
    status: getProfileTypeReferencesStatus(state),
  };
};
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchProfileTypeReferenceStatus()),
  onReload: profileTypesCodes => (dispatch(sendPostProfileTypeReferenceStatus(profileTypesCodes))),
});

const ProfileTypeReferenceStatusContainer =
  connect(mapStateToProps, mapDispatchToProps)(ProfileTypeReferenceStatus);

export default ProfileTypeReferenceStatusContainer;
