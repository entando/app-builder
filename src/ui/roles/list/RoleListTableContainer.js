import { connect } from 'react-redux';

import { fetchRoles } from 'state/roles/actions';
import { getRolesList } from 'state/roles/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import RoleListTable from 'ui/roles/list/RoleListTable';
import { toggleLoading } from 'state/loading/actions';

export const mapStateToProps = state => (
  {
    roles: getRolesList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).roles,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(toggleLoading('roles'));
    dispatch(fetchRoles(page));
  },
});

const RoleListTableContainer = connect(mapStateToProps, mapDispatchToProps)(RoleListTable);

export default RoleListTableContainer;
