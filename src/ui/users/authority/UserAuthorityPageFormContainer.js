import { connect } from 'react-redux';
import { fetchGroups } from 'state/groups/actions';
import { getGroups } from 'state/groups/selectors';
import { fetchRoles } from 'state/roles/actions';
import { getRoles } from 'state/roles/selectors';
import UserAuthorityPageForm from 'ui/users/authority/UserAuthorityPageForm';

export const mapStateToProps = state => ({
  groups: getGroups(state),
  roles: getRoles(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchGroups());
    dispatch(fetchRoles());
  },
  onSubmit: (values) => {
    // call post
    console.log(values);
  },

});

const UserAuthorityPageFormContainer =
connect(mapStateToProps, mapDispatchToProps)(UserAuthorityPageForm);
export default UserAuthorityPageFormContainer;
