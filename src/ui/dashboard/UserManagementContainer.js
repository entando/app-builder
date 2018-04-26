import { connect } from 'react-redux';

import { getUsersTotal } from 'state/users/selectors';
import { getGroupsTotal } from 'state/groups/selectors';
import { fetchUsersTotal } from 'state/users/actions';
import { fetchGroupsTotal } from 'state/groups/actions';
import UserManagement from 'ui/dashboard/UserManagement';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchUsersTotal());
    dispatch(fetchGroupsTotal());
  },
});

export const mapStateToProps = state => (
  {
    users: getUsersTotal(state),
    groups: getGroupsTotal(state),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserManagement);
