import { connect } from 'react-redux';

import { fetchUsers } from 'state/users/actions';
import { getUserList, getUserSearchTerm } from 'state/users/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import UserListTable from 'ui/users/list/UserListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/users/common/DeleteUserModal';
import { withPermissionValues } from 'ui/auth/withPermissions';

export const mapStateToProps = state => ({
  users: getUserList(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).users,
  userSearchTerm: getUserSearchTerm(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }, params) => {
    dispatch(fetchUsers(page, params));
  },
  onClickDelete: (user) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'user', code: user.username }));
  },
});

const UserListTableContainer = connect(
  mapStateToProps, mapDispatchToProps, null,
  {
    pure: false,
  },
)(UserListTable);

export default withPermissionValues(UserListTableContainer);
