import { connect } from 'react-redux';
import { fetchCurrentReferenceContents } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupContentReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';

import GroupDetailTabContents from 'ui/groups/detail/GroupDetailTabContents';

export const mapStateToProps = state => ({
  pageReferences: getSelectedGroupContentReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferenceContents());
  },
});

const GroupDetailTabContentsContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabContents);
export default GroupDetailTabContentsContainer;
