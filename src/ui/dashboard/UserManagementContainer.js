import { connect } from 'react-redux';

import { getUsersTotal } from 'state/users/selectors';
import { getGroupsTotal } from 'state/groups/selectors';
import { fetchUsersTotal } from 'state/users/actions';
import { fetchGroupsTotal } from 'state/groups/actions';
import { getLoggedUserPermissions } from 'state/permissions/selectors';
import UserManagement from 'ui/dashboard/UserManagement';

export const mapStateToProps = state => ({
  users: getUsersTotal(state),
  groups: getGroupsTotal(state),
  userPermissions: getLoggedUserPermissions(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchUsersTotal());
    dispatch(fetchGroupsTotal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagement);
