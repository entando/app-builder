import { connect } from 'react-redux';

import { fetchRoles } from 'state/roles/actions';
import { getRolesList } from 'state/roles/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import RoleListTable from 'ui/roles/list/RoleListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/roles/common/DeleteRoleModal';

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
    dispatch(fetchRoles(page));
  },
  onClickDelete: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'role', code }));
  },
});

const RoleListTableContainer = connect(mapStateToProps, mapDispatchToProps)(RoleListTable);

export default RoleListTableContainer;
