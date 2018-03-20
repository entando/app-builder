import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { fetchGroups } from 'state/groups/actions';
import { getGroups } from 'state/groups/selectors';
import { fetchRoles } from 'state/roles/actions';
import { getRoles } from 'state/roles/selectors';
import UserAuthorityPageForm from 'ui/users/authority/UserAuthorityPageForm';

// import { sendPostPage } from 'state/pages/actions';

export const mapStateToProps = state =>
  // console.log('STATO', state);
  // console.log('STATO formValueSelector',
  // formValueSelector('autorityForm')(state, 'groups', 'roles'));
  ({
    groups: getGroups(state),
    roles: getRoles(state),
    selectedJoinValues: formValueSelector('autorityForm')(state, 'groups', 'roles') || [],

  });

// export const mapDispatchToProps = dispatch => ({
//   onSubmit: data => dispatch(sendPostPage(data)),
// });


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
