import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { fetchAllGroupEntries } from 'state/groups/actions';
import { getLoading } from 'state/loading/selectors';
import { getGroupsList, getGroupsMap } from 'state/groups/selectors';
import { getRolesList, getRolesMap } from 'state/roles/selectors';
import { fetchRoles } from 'state/roles/actions';
import UserAuthorityPageForm from 'ui/users/common/UserAuthorityPageForm';
import { ACTION_UPDATE } from 'state/users/const';
import { fetchUserAuthorities, sendPostUserAuthorities, sendPutUserAuthorities, sendDeleteUserAuthorities } from 'state/users/actions';
import { getSelectedUserActionAuthorities, getSelectedUserAuthoritiesList } from 'state/users/selectors';
import { setVisibleModal } from 'state/modal/actions';


export const mapStateToProps = state => ({
  loading: getLoading(state).users,
  groups: getGroupsList(state),
  roles: getRolesList(state),
  groupsMap: getGroupsMap(state),
  rolesMap: getRolesMap(state),
  initialValues: { groupRolesCombo: getSelectedUserAuthoritiesList(state) },
  actionOnSave: getSelectedUserActionAuthorities(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: () => {
    dispatch(fetchAllGroupEntries({ page: 1, pageSize: 0 }));
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
  onAddNewClicked: () => dispatch(setVisibleModal('AddAuthorityModal')),
  onNewAuthAdded: ({ group, role }) => {
    dispatch(addToast(
      { id: 'user.authority.added', values: { groupname: group, rolename: role } },
      TOAST_SUCCESS,
    ));
  },
  onCloseModal: () => dispatch(setVisibleModal('')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(UserAuthorityPageForm));
