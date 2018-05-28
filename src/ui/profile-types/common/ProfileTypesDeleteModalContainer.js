import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteProfileType } from 'state/profile-types/actions';
import ProfileTypesDeleteModal from 'ui/profile-types/common/ProfileTypesDeleteModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (profileType) => {
    dispatch(sendDeleteProfileType(profileType));
    dispatch(setVisibleModal(''));
  },
});

const ProfileTypesDeleteModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(ProfileTypesDeleteModal);

ProfileTypesDeleteModalContainer.displayName = 'ProfileTypesDeleteModalContainer';

export default ProfileTypesDeleteModalContainer;
