import { connect } from 'react-redux';
import { fetchGroups } from 'state/groups/actions';
import { getLoading } from 'state/loading/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getRolesList } from 'state/roles/selectors';
import { fetchRoles } from 'state/roles/actions';
import UserAuthorityPageForm from 'ui/users/common/UserAuthorityPageForm';
import { ACTION_UPDATE } from 'state/users/const';
import { fetchUserAuthorities, sendPostUserAuthorities, sendPutUserAuthorities } from 'state/users/actions';
import { getGroupRolesCombo, getSelectedUserActionAuthorities } from 'state/users/selectors';


export const mapStateToProps = state =>
  ({
    loading: getLoading(state).users,
    groups: getGroupsList(state),
    roles: getRolesList(state),
    groupRolesCombo: getGroupRolesCombo(state),
    actionOnSave: getSelectedUserActionAuthorities(state),
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchRoles({ page: 1, pageSize: 0 }));
    dispatch(fetchUserAuthorities({ page: 1, pageSize: 0 }));
  },
  onSubmit: (authorities, action) => {
    if (action === ACTION_UPDATE) {
      dispatch(sendPutUserAuthorities(authorities.groupRolesCombo));
    } else {
      dispatch(sendPostUserAuthorities(authorities.groupRolesCombo));
    }
  },

});

const UserAuthorityPageFormContainer =
connect(mapStateToProps, mapDispatchToProps)(UserAuthorityPageForm);
export default UserAuthorityPageFormContainer;
