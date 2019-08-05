import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGroups } from 'state/groups/actions';
import { getLoading } from 'state/loading/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getRolesList } from 'state/roles/selectors';
import { fetchRoles } from 'state/roles/actions';
import UserAuthorityPageForm from 'ui/users/common/UserAuthorityPageForm';
import { ACTION_UPDATE } from 'state/users/const';
import { fetchUserAuthorities, sendPostUserAuthorities, sendPutUserAuthorities, sendDeleteUserAuthorities } from 'state/users/actions';
import { getGroupRolesCombo, getSelectedUserActionAuthorities } from 'state/users/selectors';


export const mapStateToProps = state =>
  ({
    loading: getLoading(state).users,
    groups: getGroupsList(state),
    roles: getRolesList(state),
    groupRolesCombo: getGroupRolesCombo(state),
    actionOnSave: getSelectedUserActionAuthorities(state),
  });

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchGroups({ page: 1, pageSize: 0 }));
    dispatch(fetchRoles({ page: 1, pageSize: 0 }));
    dispatch(fetchUserAuthorities(params.username));
  },
  onSubmit: (authorities, action) => {
    const { groupRolesCombo } = authorities;
    if (action === ACTION_UPDATE) {
      if (groupRolesCombo.length > 0) {
        dispatch(sendPutUserAuthorities(groupRolesCombo, params.username));
      } else {
        dispatch(sendDeleteUserAuthorities(params.username));
      }
    } else {
      dispatch(sendPostUserAuthorities(groupRolesCombo, params.username));
    }
  },

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserAuthorityPageForm));
