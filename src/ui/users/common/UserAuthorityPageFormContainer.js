import { connect } from 'react-redux';
import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { getRolesList } from 'state/roles/selectors';
import { fetchRoles } from 'state/roles/actions';
import UserAuthorityPageForm from 'ui/users/common/UserAuthorityPageForm';
import { fetchUserAuthorities } from 'state/users/actions';
import { getGroupRolesCombo, getSelectedUserActionAuthorities } from 'state/users/selectors';

export const mapStateToProps = state =>
  ({
    groups: getGroupsList(state),
    roles: getRolesList(state),
    groupRolesCombo: getGroupRolesCombo(state),
    actionOnSave: getSelectedUserActionAuthorities(state),
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchGroups()).then(() => {
      dispatch(fetchRoles()).then(() => {
        dispatch(fetchUserAuthorities());
      });
    });
  },
  onSubmit: (authorities, action) => {
    console.log('action', action);
    console.log(authorities);
    // dispatch(sendPostUserAuthorities(authorities.groupRolesCombo));
  },

});

const UserAuthorityPageFormContainer =
connect(mapStateToProps, mapDispatchToProps)(UserAuthorityPageForm);
export default UserAuthorityPageFormContainer;
