import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteRole } from 'state/roles/actions';
import DeleteRoleModal from 'ui/roles/common/DeleteRoleModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (roleCode) => {
    dispatch(sendDeleteRole(roleCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteRoleModalContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteRoleModal);

export default DeleteRoleModalContainer;
