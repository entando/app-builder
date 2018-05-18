import { connect } from 'react-redux';

import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import GroupListTable from 'ui/groups/list/GroupListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { clearErrors } from 'state/errors/actions';
import { MODAL_ID } from 'ui/groups/common/DeleteGroupModal';


export const mapStateToProps = state => (
  {
    groups: getGroupsList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).groups,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchGroups(page));
    dispatch(clearErrors());
  },
  onClickDelete: ({ code }) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'group', code }));
  },
  // handle delete action
});

const GroupListTableContainer = connect(mapStateToProps, mapDispatchToProps)(GroupListTable);

export default GroupListTableContainer;
