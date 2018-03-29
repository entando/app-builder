import { connect } from 'react-redux';

import { fetchUsers } from 'state/users/actions';
import { getUserList } from 'state/users/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import UserListTable from 'ui/users/list/UserListTable';

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
  onWillMount: (page) => {
    dispatch(fetchUsers(page));
  },
});

const UserListTableContainer = connect(mapStateToProps, mapDispatchToProps)(UserListTable);

export default UserListTableContainer;
