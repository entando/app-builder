import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';
import { sendPostRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import RoleForm from 'ui/roles/common/RoleForm';

export const mapStateToProps = state => ({
  permissions: getPermissionsList(state),
  loading: getLoading(state).permissions,
  superuserToggled: formValueSelector('role')(state, 'permissions.superuser') || false,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchPermissions());
  },
  onSubmit: values => dispatch(sendPostRole(values)),
  onToggleSuperuser: ({ superuserToggled, permissions }) => {
    if (superuserToggled) {
      permissions.forEach((permission) => {
        if (permission.code !== 'superuser') {
          dispatch(change('role', `permissions.${permission.code}`, true));
        }
      });
    }
  },
  onChangeName: name =>
    dispatch(change('role', 'code', name.replace(/\W/g, '_').toLowerCase())),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(RoleForm);
