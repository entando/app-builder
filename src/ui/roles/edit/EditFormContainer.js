import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import { change, formValueSelector, submit } from 'redux-form';
import { sendPutRole, fetchRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_ROLE_LIST } from 'app-init/router';

import RoleForm from 'ui/roles/common/RoleForm';

export const EDIT_MODE = 'edit';

export const mapStateToProps = (state, { match: { params } }) => ({
  mode: EDIT_MODE,
  permissions: getPermissionsList(state),
  roleCode: params.roleCode,
  loading: getLoading(state).permissions,
  superuserToggled: formValueSelector('role')(state, 'permissions.superuser') || false,
});

export const mapDispatchToProps = (dispatch, { history }) => ({
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
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('role')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_ROLE_LIST)); },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(RoleForm));
