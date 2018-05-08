import { connect } from 'react-redux';

import { fetchUsers } from 'state/users/actions';
import { getUserList } from 'state/users/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import UserListTable from 'ui/users/list/UserListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/users/common/DeleteUserModal';

export const mapStateToProps = state => (
  {
    users: getUserList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).users,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchUsers(page));
  },
  onClickDelete: (user) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'user', code: user.username }));
  },
});

const UserListTableContainer = connect(mapStateToProps, mapDispatchToProps)(UserListTable);

export default UserListTableContainer;
