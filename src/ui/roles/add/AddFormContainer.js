import { connect } from 'react-redux';
import { change, formValueSelector, submit } from 'redux-form';
import { routeConverter } from '@entando/utils';
import { withRouter } from 'react-router-dom';

import { sendPostRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { ROUTE_ROLE_LIST } from 'app-init/router';

import RoleForm from 'ui/roles/common/RoleForm';


export const mapStateToProps = state => ({
  permissions: getPermissionsList(state),
  loading: getLoading(state).permissions,
  superuserToggled: formValueSelector('role')(state, 'permissions.superuser') || false,
});

export const mapDispatchToProps = (dispatch, { history }) => ({
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
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('role')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_ROLE_LIST)); },
});

const AddFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(RoleForm);

export default withRouter(AddFormContainer);
