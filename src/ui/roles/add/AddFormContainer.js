import { connect } from 'react-redux';
import { change } from 'redux-form';
import { sendPostRole } from 'state/roles/actions';
import { fetchPermissions } from 'state/permissions/actions';
import { getPermissionsList } from 'state/permissions/selectors';
import { getLoading } from 'state/loading/selectors';
import { toggleLoading } from 'state/loading/actions';
import RoleForm from 'ui/roles/common/RoleForm';

export const mapStateToProps = state => ({
  permissions: getPermissionsList(state),
  loading: getLoading(state).permissions,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(toggleLoading('permissions'));
    dispatch(fetchPermissions());
  },
  onSubmit: values => dispatch(sendPostRole(values)),
  onChangeName: name =>
    dispatch(change('role', 'code', name.replace(/\W/g, '_').toLowerCase())),
});

const AddFormContainer = connect(mapStateToProps, mapDispatchToProps)(RoleForm);
export default AddFormContainer;
