import { connect } from 'react-redux';
import { fetchReferences } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getSelectedGroupResourceReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import GroupDetailTabResources from 'ui/groups/detail/GroupDetailTabResources';
import { RESOURCE_REFERENCE_KEY } from 'ui/common/references/const';

export const mapStateToProps = state => ({
  resourceReferences: getSelectedGroupResourceReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page) => {
    dispatch(fetchReferences(RESOURCE_REFERENCE_KEY, page));
  },
});

const GroupDetailTabResourcesContainer =
  connect(mapStateToProps, mapDispatchToProps)(GroupDetailTabResources);
export default GroupDetailTabResourcesContainer;
