import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { getRolesList } from 'state/roles/selectors';
import { fetchRoles } from 'state/roles/actions';
import UserAuthorityPageForm from 'ui/users/common/UserAuthorityPageForm';

export const mapStateToProps = state =>
  ({
    groups: getGroupsList(state),
    roles: getRolesList(state),
    groupRolesCombo: formValueSelector('autorityForm')(state, 'groupRolesCombo'),
  });

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchGroups());
    dispatch(fetchRoles());
  },
  onSubmit: (values) => {
    // call post
    // eslint-disable-next-line
    console.log(values);
  },

});

const UserAuthorityPageFormContainer =
connect(mapStateToProps, mapDispatchToProps)(UserAuthorityPageForm);
export default UserAuthorityPageFormContainer;
