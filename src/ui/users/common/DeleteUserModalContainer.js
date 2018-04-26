import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteUser } from 'state/users/actions';
import DeleteUserModal from 'ui/users/common/DeleteUserModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (username) => {
    dispatch(sendDeleteUser(username));
    dispatch(setVisibleModal(''));
  },
});

const DeleteRoleModalContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteUserModal);

export default DeleteRoleModalContainer;
