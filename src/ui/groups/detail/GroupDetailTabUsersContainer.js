import { connect } from 'react-redux';
import { fetchReferences } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupUserReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import GroupDetailTabUsers from 'ui/groups/detail/GroupDetailTabUsers';
import { USER_REFERENCE_KEY } from 'ui/common/references/const';

export const mapStateToProps = state => ({
  userReferences: getSelectedGroupUserReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(fetchReferences(USER_REFERENCE_KEY, page));
  },
});

const GroupDetailTabUsersContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabUsers);
export default GroupDetailTabUsersContainer;
