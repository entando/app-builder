import { connect } from 'react-redux';
import { change } from 'redux-form';
import { sendPostRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import RoleForm from 'ui/roles/common/RoleForm';

export const mapStateToProps = state => ({
  permissions: getPermissionsList(state),
  loading: getLoading(state).permissions,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchPermissions());
  },
  onSubmit: values => dispatch(sendPostRole(values)),
  onChangeName: name =>
    dispatch(change('role', 'code', name.replace(/\W/g, '_').toLowerCase())),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(RoleForm);
