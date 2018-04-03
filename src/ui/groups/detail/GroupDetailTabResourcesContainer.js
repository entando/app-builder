import { connect } from 'react-redux';
import { fetchCurrentReferenceResources } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupResourceReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';

import GroupDetailTabResources from 'ui/groups/detail/GroupDetailTabResources';

export const mapStateToProps = state => ({
  pageReferences: getSelectedGroupResourceReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferenceResources());
  },
});

const GroupDetailTabResourcesContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabResources);
export default GroupDetailTabResourcesContainer;
