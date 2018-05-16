import { connect } from 'react-redux';
import { fetchCurrentReferencePages } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getPageReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';

import GroupDetailTabPages from 'ui/groups/detail/GroupDetailTabPages';

export const mapStateToProps = state => ({
  pageReferences: getPageReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferencePages());
  },
});

const GroupDetailTabPagesContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabPages);
export default GroupDetailTabPagesContainer;
