import { connect } from 'react-redux';
import { fetchCurrentReferencePages } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupPageReferences, getReferencesLoading } from 'state/groups/selectors';

import GroupDetailTabPages from 'ui/groups/detail/GroupDetailTabPages';

export const mapStateToProps = state => ({
  pageReferences: getSelectedGroupPageReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getReferencesLoading(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferencePages());
  },
});

const GroupDetailTabPagesContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabPages);
export default GroupDetailTabPagesContainer;
