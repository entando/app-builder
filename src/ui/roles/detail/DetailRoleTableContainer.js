import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DetailRoleTable from 'ui/roles/detail/DetailRoleTable';
import { fetchRoleDetail } from 'state/roles/actions';
import { getSelectedRole, getSelectedRolePermissionsList } from 'state/roles/selectors';
import { fetchPermissions } from 'state/permissions/actions';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = (state, { match: { params } }) => ({
  role: getSelectedRole(state),
  rolePermissions: getSelectedRolePermissionsList(state),
  roleCode: params.roleCode,
  loading: getLoading(state).permissions,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ roleCode }) => {
    dispatch(fetchPermissions());
    dispatch(fetchRoleDetail(roleCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailRoleTable));
