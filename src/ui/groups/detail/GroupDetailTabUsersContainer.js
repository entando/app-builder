import { connect } from 'react-redux';
import { fetchCurrentReferenceUsers } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupUserReferences } from 'state/groups/selectors';

import GroupDetailTabUsers from 'ui/groups/detail/GroupDetailTabUsers';

export const mapStateToProps = state => ({
  pageReferences: getSelectedGroupUserReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferenceUsers());
  },
});

const GroupDetailTabUsersContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabUsers);
export default GroupDetailTabUsersContainer;
