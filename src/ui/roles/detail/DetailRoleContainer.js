import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';
import DetailUserTable from 'ui/roles/detail/DetailRole';
import { fetchRoleDetail } from 'state/roles/actions';
import { getSelectedRole } from 'state/roles/selectors';

export const mapStateToProps = state => ({
  role: getSelectedRole(state),
  roleCode: getParams(state).roleCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ roleCode }) => {
    dispatch(fetchRoleDetail(roleCode));
  },
});

const DetailUserTableContainer = connect(mapStateToProps, mapDispatchToProps)(DetailUserTable);
export default DetailUserTableContainer;
