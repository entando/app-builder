import { connect } from 'react-redux';

import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import GroupListTable from 'ui/groups/list/GroupListTable';

export const mapStateToProps = state => (
  {
    groups: getGroupsList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(fetchGroups(page));
  },
});

const GroupListTableContainer = connect(mapStateToProps, mapDispatchToProps)(GroupListTable);

export default GroupListTableContainer;
