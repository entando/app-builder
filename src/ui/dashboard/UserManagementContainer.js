import { connect } from 'react-redux';

import { getUsersTotal } from 'state/users/selectors';
import { getGroupsTotal } from 'state/groups/selectors';
import { fetchUsersTotal } from 'state/users/actions';
import { fetchGroupsTotal } from 'state/groups/actions';
import { withPermissionValues } from 'ui/auth/withPermissions';
import UserManagement from 'ui/dashboard/UserManagement';

export const mapStateToProps = state => ({
  users: getUsersTotal(state),
  groups: getGroupsTotal(state),
});

export const mapDispatchToProps = (dispatch, { isSuperuser }) => ({
  onDidMount: () => {
    dispatch(fetchUsersTotal());
    if (isSuperuser) {
      dispatch(fetchGroupsTotal());
    }
  },
});

const UserManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagement);

export default withPermissionValues(UserManagementContainer);
