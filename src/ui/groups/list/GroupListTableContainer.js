import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';

import GroupListTable from 'ui/groups/list/GroupListTable';
import { fetchAllGroupEntries } from 'state/groups/actions';
import { getGroupEntries } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/groups/common/DeleteGroupModal';


export const mapStateToProps = state => (
  {
    groups: getGroupEntries(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).groups,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(clearErrors());
    dispatch(fetchAllGroupEntries(page, '?sort=name'));
  },
  onClickDelete: ({ code }) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'group', code }));
  },
  // handle delete action
});

const GroupListTableContainer = connect(mapStateToProps, mapDispatchToProps)(GroupListTable);

export default GroupListTableContainer;
