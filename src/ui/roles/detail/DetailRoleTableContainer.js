import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import DetailRoleTable from 'ui/roles/detail/DetailRoleTable';
import { fetchRoleDetail } from 'state/roles/actions';
import { getSelectedRole, getSelectedRolePermissionsList } from 'state/roles/selectors';
import { fetchPermissions } from 'state/permissions/actions';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  role: getSelectedRole(state),
  rolePermissions: getSelectedRolePermissionsList(state),
  roleCode: getParams(state).roleCode,
  loading: getLoading(state).permissions,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ roleCode }) => {
    dispatch(fetchPermissions());
    dispatch(fetchRoleDetail(roleCode));
  },
});

const DetailRoleTableContainer = connect(mapStateToProps, mapDispatchToProps)(DetailRoleTable);
export default DetailRoleTableContainer;
