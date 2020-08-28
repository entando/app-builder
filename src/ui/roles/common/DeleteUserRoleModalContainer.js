import { connect } from 'react-redux';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteRole, fetchUserRefs } from 'state/roles/actions';
import { getLoading } from 'state/loading/selectors';
import { getUserRefs } from 'state/roles/selectors';
import { getPagination } from 'state/pagination/selectors';

import DeleteUserRoleModal from 'ui/roles/common/DeleteUserRoleModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
  loading: getLoading(state).references,
  userReferences: getUserRefs(state),
  pagination: getPagination(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchRoleReferences: (roleCode) => {
    dispatch(fetchUserRefs(roleCode));
  },
  onConfirmDelete: (roleCode) => {
    dispatch(sendDeleteRole(roleCode));
    dispatch(setVisibleModal(''));
  },
  onCloseModal: () => dispatch(setInfo({})),
  onPageChange: (roleCode, page) => dispatch(fetchUserRefs(roleCode, page)),
});

const DeleteUserRoleModalContainer =
connect(mapStateToProps, mapDispatchToProps)(DeleteUserRoleModal);

export default DeleteUserRoleModalContainer;
