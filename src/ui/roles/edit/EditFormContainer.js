import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { change, formValueSelector } from 'redux-form';
import { sendPutRole, fetchRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import RoleForm from 'ui/roles/common/RoleForm';

export const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  permissions: getPermissionsList(state),
  roleCode: params.roleCode,
  loading: getLoading(state).permissions,
  superuserToggled: formValueSelector('role')(state, 'permissions.superuser') || false,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ roleCode }) => {
    dispatch(fetchPermissions());
    dispatch(fetchRole(roleCode));
  },
  onToggleSuperuser: ({ superuserToggled, permissions }) => {
    if (superuserToggled) {
      permissions.forEach((permission) => {
        if (permission.code !== 'superuser') {
          dispatch(change('role', `permissions.${permission.code}`, true));
        }
      });
    }
  },
  onSubmit: values => dispatch(sendPutRole(values)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(RoleForm));
