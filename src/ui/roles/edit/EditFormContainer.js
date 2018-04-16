import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';
import { sendPutRole, fetchRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import RoleForm from 'ui/roles/common/RoleForm';

export const EDIT_MODE = 'edit';

export const mapStateToProps = state => ({
  mode: EDIT_MODE,
  permissions: getPermissionsList(state),
  roleCode: getParams(state).roleCode,
  loading: getLoading(state).permissions,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ roleCode }) => {
    dispatch(fetchPermissions());
    dispatch(fetchRole(roleCode));
  },
  onSubmit: values => dispatch(sendPutRole(values)),
});

const EditFormContainer = connect(mapStateToProps, mapDispatchToProps)(RoleForm);
export default EditFormContainer;
